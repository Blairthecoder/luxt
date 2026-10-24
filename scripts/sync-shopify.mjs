#!/usr/bin/env node
// Builds the lingerie part of the catalog from our own Shopify store through
// the Storefront API. Checkout stays on Shopify: buy buttons go through
// /go/<handle> to the product page on the store.
//
// Env (set in Netlify, never committed):
//   SHOPIFY_STORE_DOMAIN       your-store.myshopify.com
//   SHOPIFY_STOREFRONT_TOKEN   Storefront API public access token
//   SHOPIFY_COLLECTION         collection handle to list (default: lingerie);
//                              falls back to every product if it does not exist
//   SHOPIFY_HUB                site hub the products go in (default: lingerie)
//
// Writes:
//   src/data/shopify.json        products in the shared catalog shape
//   src/data/shopify-links.json  { handle: store product URL } used by /go/<handle>
//   src/data/shopify-meta.json   shop name, store URL and product count per hub
//
// Never fails a build: without credentials or on any error the existing files are kept.
//
// Usage: node scripts/sync-shopify.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CATALOG_OUT = path.join(ROOT, 'src/data/shopify.json')
const LINKS_OUT = path.join(ROOT, 'src/data/shopify-links.json')
const META_OUT = path.join(ROOT, 'src/data/shopify-meta.json')
const LOVENSE = path.join(ROOT, 'src/data/lovense.json')

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/+$/, '')
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN
const COLLECTION = process.env.SHOPIFY_COLLECTION || 'lingerie'
const HUB = process.env.SHOPIFY_HUB || 'lingerie'
const API_VERSION = '2025-07'
const PROGRAM = 'shopify'
const UTM = 'utm_source=nightstandsupply&utm_medium=referral&utm_campaign=lingerie'

const PRODUCT_FIELDS = `
  handle title vendor productType tags updatedAt onlineStoreUrl availableForSale
  priceRange { minVariantPrice { amount } }
  compareAtPriceRange { minVariantPrice { amount } }
  images(first: 8) { nodes { url width height } }
  variants(first: 100) { nodes { id title availableForSale price { amount } compareAtPrice { amount } } }
`

const COLLECTION_QUERY = `query ($handle: String!, $after: String) {
  shop { name primaryDomain { url } }
  collection(handle: $handle) {
    products(first: 100, after: $after) { pageInfo { hasNextPage endCursor } nodes { ${PRODUCT_FIELDS} } }
  }
}`

const ALL_QUERY = `query ($after: String) {
  shop { name primaryDomain { url } }
  products(first: 100, after: $after) { pageInfo { hasNextPage endCursor } nodes { ${PRODUCT_FIELDS} } }
}`

async function storefront(query, variables) {
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': TOKEN },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) throw new Error(`Storefront API ${res.status}`)
  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '))
  return json.data
}

async function fetchProducts() {
  let shop
  let nodes = []
  let after = null
  let useCollection = true
  for (;;) {
    const data = useCollection
      ? await storefront(COLLECTION_QUERY, { handle: COLLECTION, after })
      : await storefront(ALL_QUERY, { after })
    shop = data.shop
    const conn = useCollection ? data.collection?.products : data.products
    if (!conn) {
      console.log(`[sync-shopify] No "${COLLECTION}" collection; listing every product.`)
      useCollection = false
      continue
    }
    nodes = nodes.concat(conn.nodes)
    if (!conn.pageInfo.hasNextPage) break
    after = conn.pageInfo.endCursor
  }
  return { shop, nodes }
}

const money = (m) => (m?.amount !== undefined ? Math.round(Number(m.amount) * 100) / 100 : undefined)
const variantId = (gid) => Number(String(gid).split('/').pop()) || undefined

function withUtm(url) {
  return `${url}${url.includes('?') ? '&' : '?'}${UTM}`
}

function toProduct(node) {
  const price = money(node.priceRange.minVariantPrice) ?? 0
  const compareAt = money(node.compareAtPriceRange?.minVariantPrice)
  return {
    handle: node.handle,
    title: node.title,
    brand: node.vendor || 'Nightstand Supply',
    productType: node.productType || 'Lingerie',
    tags: node.tags ?? [],
    hub: HUB,
    price,
    ...(compareAt && compareAt > price ? { compareAtPrice: compareAt } : {}),
    available: node.availableForSale,
    images: node.images.nodes.map((img) => ({ src: img.url, width: img.width, height: img.height })),
    variants: node.variants.nodes.map((v) => {
      const vPrice = money(v.price) ?? price
      const vCompare = money(v.compareAtPrice)
      return {
        id: variantId(v.id),
        title: v.title,
        price: vPrice,
        ...(vCompare && vCompare > vPrice ? { compareAtPrice: vCompare } : {}),
        available: v.availableForSale,
      }
    }),
    program: PROGRAM,
    updatedAt: node.updatedAt,
  }
}

function writeJson(file, data) {
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`)
}

async function main() {
  if (!DOMAIN || !TOKEN) {
    console.log('[sync-shopify] SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_TOKEN not set; keeping existing files.')
    return
  }
  const { shop, nodes } = await fetchProducts()
  const storeUrl = (shop.primaryDomain?.url || `https://${DOMAIN}`).replace(/\/+$/, '')
  // Lovense handles win on a clash so existing pages, copy and links stay put.
  const taken = new Set(JSON.parse(fs.readFileSync(LOVENSE, 'utf8')).products.map((p) => p.handle))
  const products = []
  const links = {}
  for (const node of nodes) {
    if (taken.has(node.handle)) {
      console.warn(`[sync-shopify] Skipped ${node.handle}: handle already used by a Lovense product.`)
      continue
    }
    products.push(toProduct(node))
    links[node.handle] = withUtm(node.onlineStoreUrl || `${storeUrl}/products/${node.handle}`)
  }
  const syncedAt = new Date().toISOString()
  const hubs = {}
  for (const p of products) hubs[p.hub] = (hubs[p.hub] ?? 0) + 1
  writeJson(CATALOG_OUT, { syncedAt, source: storeUrl, products })
  writeJson(LINKS_OUT, links)
  writeJson(META_OUT, { syncedAt, shopName: shop.name, storeUrl, hubs })
  console.log(`[sync-shopify] ${products.length} products from ${shop.name}.`)
}

main().catch((err) => {
  console.warn(`[sync-shopify] ${err.message}; keeping existing files.`)
})
