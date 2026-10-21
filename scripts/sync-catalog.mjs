#!/usr/bin/env node
// Pulls the LuxuryToyX Shopify catalog into src/data/catalog.json.
// Runs before every Netlify build. Each page is retried with backoff. On
// Netlify (or with --strict) a failed or implausibly small sync fails the
// build, so the last good deploy stays live instead of an empty store going out.
// Locally the existing catalog.json is kept on failure.
//
// Usage:
//   node scripts/sync-catalog.mjs                 # fetch live catalog
//   node scripts/sync-catalog.mjs --from-file x   # normalize a saved products.json
//   node scripts/sync-catalog.mjs --strict        # exit 1 on failure

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'src/data/catalog.json')
const HUB_RULES = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/hub-rules.json'), 'utf8'))

const SOURCE = 'https://www.luxurytoyx.com'
const PROGRAM = 'luxurytoyx'
const PAGE_SIZE = 250
const MAX_PAGES = 60

const args = process.argv.slice(2)
// Netlify sets NETLIFY=true during builds; never ship a build with a broken catalog.
const strict = args.includes('--strict') || process.env.NETLIFY === 'true'
const MIN_PRODUCTS = Number(process.env.MIN_CATALOG_PRODUCTS ?? 1000)
const RETRIES = 6
const fromFileIdx = args.indexOf('--from-file')
const fromFile = fromFileIdx >= 0 ? args[fromFileIdx + 1] : null

const rules = HUB_RULES.rules.map((r) => ({ hub: r.hub, re: new RegExp(r.pattern, 'i') }))

function assignHub(productType, tags, title) {
  const primary = `${productType} | ${tags.join(' | ')}`
  for (const { hub, re } of rules) if (re.test(primary)) return hub
  for (const { hub, re } of rules) if (re.test(title)) return hub
  return HUB_RULES.fallback
}

function toNumber(value) {
  const n = Number.parseFloat(value)
  return Number.isFinite(n) && n > 0 ? n : undefined
}

// Some feed titles arrive as the bare handle ("svakom-plume-rechargeable-...")
// or repeat the vendor ("Lelo LELO SMART WAND 2"). Clean both before display.
function cleanTitle(rawTitle, handle, brand) {
  let title = String(rawTitle ?? '').trim().replace(/\s+/g, ' ')
  if (!title || /^[a-z0-9]+(-[a-z0-9]+)+$/.test(title) || title === handle) {
    title = String(handle ?? title)
      .split('-')
      .map((w) => (w.length <= 2 && /\d/.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
      .join(' ')
  }
  const b = String(brand ?? '').trim()
  if (b) {
    const esc = b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    title = title.replace(new RegExp(`^${esc}\\s+(?=${esc}\\b)`, 'i'), '')
  }
  return title
}

function normalize(raw) {
  const tags = Array.isArray(raw.tags)
    ? raw.tags
    : String(raw.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean)
  const variants = (raw.variants ?? []).map((v) => {
    const price = toNumber(v.price) ?? 0
    const compareAt = toNumber(v.compare_at_price)
    return {
      id: v.id,
      title: v.title,
      price,
      compareAtPrice: compareAt && compareAt > price ? compareAt : undefined,
      available: v.available ?? true,
    }
  })
  const lowest = variants.reduce((min, v) => (min && min.price <= v.price ? min : v), null)
  const title = cleanTitle(raw.title, raw.handle, raw.vendor)
  return {
    handle: raw.handle,
    title,
    brand: String(raw.vendor ?? '').trim(),
    productType: String(raw.product_type ?? '').trim(),
    tags,
    hub: assignHub(raw.product_type ?? '', tags, title),
    price: lowest?.price ?? 0,
    compareAtPrice: lowest?.compareAtPrice,
    available: variants.some((v) => v.available),
    images: (raw.images ?? []).slice(0, 8).map((img) => ({
      src: img.src,
      width: img.width,
      height: img.height,
    })),
    variants,
    program: PROGRAM,
    updatedAt: raw.updated_at,
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchPage(url) {
  let lastError
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    let wait = attempt * 2000
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'NightstandSupplyCatalogSync/1.0', Accept: 'application/json' },
        signal: AbortSignal.timeout(30000),
      })
      if (res.ok) return await res.json()
      lastError = new Error(`${url} returned ${res.status}`)
      if (res.status !== 429 && res.status < 500) throw lastError
      const retryAfter = Number(res.headers.get('retry-after'))
      if (retryAfter > 0) wait = retryAfter * 1000
    } catch (err) {
      lastError = err
    }
    if (attempt < RETRIES) await sleep(wait)
  }
  throw lastError
}

async function fetchAll() {
  const all = []
  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = `${SOURCE}/products.json?limit=${PAGE_SIZE}&page=${page}`
    const body = await fetchPage(url)
    const batch = Array.isArray(body.products) ? body.products : []
    all.push(...batch)
    if (batch.length < PAGE_SIZE) break
  }
  return all
}

async function main() {
  const raw = fromFile
    ? (() => {
        const body = JSON.parse(fs.readFileSync(fromFile, 'utf8'))
        return body.products ?? (body.product ? [body.product] : [])
      })()
    : await fetchAll()

  const seen = new Set()
  const products = raw
    .filter((p) => p && p.handle && !seen.has(p.handle) && seen.add(p.handle))
    .map(normalize)
    .filter((p) => p.price > 0 && p.images.length > 0)

  if (products.length === 0) throw new Error('No products returned')
  if (!fromFile && products.length < MIN_PRODUCTS) {
    throw new Error(`Only ${products.length} products returned (expected at least ${MIN_PRODUCTS})`)
  }

  fs.writeFileSync(
    OUT,
    JSON.stringify({ syncedAt: new Date().toISOString(), source: SOURCE, products }, null, 2) + '\n'
  )

  const byHub = {}
  for (const p of products) byHub[p.hub] = (byHub[p.hub] ?? 0) + 1
  console.log(`[catalog] ${products.length} products written to src/data/catalog.json`)
  console.log('[catalog] by hub:', JSON.stringify(byHub))
}

main().catch((err) => {
  console.error(`[catalog] sync failed${strict ? ', failing the build' : ', keeping existing catalog'}: ${err.message}`)
  process.exit(strict ? 1 : 0)
})
