#!/usr/bin/env node
// Builds the Lovense part of the catalog from lovense.com product pages.
// Item names and affiliate links come from src/data/lovense-affiliate-links.json
// (exported from the Lovense affiliate dashboard). Prices, availability, images
// and categories are read from each product page's schema.org Product data.
//
// Writes:
//   src/data/lovense.json        products in the shared catalog shape
//   src/data/lovense-links.json  { handle: affiliate link } used by /go/<handle>
//
// Never fails a build: on any error the existing files are kept.
//
// Usage: node scripts/sync-lovense.mjs

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const LINKS_IN = path.join(ROOT, 'src/data/lovense-affiliate-links.json')
const CATALOG_OUT = path.join(ROOT, 'src/data/lovense.json')
const LINKS_OUT = path.join(ROOT, 'src/data/lovense-links.json')
const HUB_RULES = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/hub-rules.json'), 'utf8'))

const SOURCE = 'https://www.lovense.com'
const SITEMAP = `${SOURCE}/sitemaps/products-en.xml.gz`
const PROGRAM = 'lovense'
const UA = 'Mozilla/5.0 (compatible; NightstandSupplyCatalogSync/1.0)'

// Products LuxuryToyX also lists under these handles. Reusing the handle keeps
// existing product copy and guide picks, now linked to Lovense directly.
const HANDLE_ALIASES = {
  'lush 4': 'lovense-lush-4',
  'lush mini': 'lovense-lush-mini',
  'lush anal': 'lovense-lush-anal-app-controlled-vibrating-plug-light-up-silicone-remote-toy',
  spinel: 'lovense-spinel-app-controlled-thrusting-vibrating-heating-dildo',
  fizz: 'lovense-fizz-dual-head-clitoral-vibrator',
  velvo: 'lovense-velvo-rotating-rabbit-vibrator-app-controlled-silicone-dual-stimulator',
  harness: 'lovense-strapless-harness-for-lapis-adjustable-o-ring-support-harness',
}

// Pages that publish no category.
const CATEGORY_FALLBACKS = {
  'gush 2 motion': 'Masturbators',
  'toy cleaner': 'Toy Cleaner',
  'webcam 2': 'Webcam',
  'domi domi 2 male attachment': 'Accessory',
}

// Cleaner titles where the store description would read awkwardly after the name.
const TITLE_OVERRIDES = {
  'personal lubricant jelly': 'Lovense Personal Lubricant Jelly, Water-Based',
  'toy cleaner': 'Lovense Toy Cleaner Spray',
  'webcam 2': 'Lovense Webcam 2 for Cam Models and Live Streaming',
}

// Items with no store listing card, read from their own page instead.
const PAGE_FALLBACKS = {
  'water based lubricant': { path: '/water-based-lubricant', title: 'Lovense Water-Based Lubricant, 100 ml', category: 'Lubricant' },
  glint: { path: '/glint-touch-responsive-vibrating-small-butt-plug', title: 'Lovense Glint App-Controlled Touch-Responsive Vibrating Butt Plug', category: 'Vibrating Butt Plugs' },
}

const SMALL_WORDS = new Set(['a', 'and', 'for', 'of', 'the', 'with', 'to', 'in'])
const titleCase = (s) =>
  s.replace(/(^|[\s(/-])([a-z])([a-z']*)/g, (m, lead, a, rest, offset) =>
    offset > 0 && SMALL_WORDS.has(a + rest) ? m : lead + a.toUpperCase() + rest
  )

const rules = HUB_RULES.rules.map((r) => ({ hub: r.hub, re: new RegExp(r.pattern, 'i') }))

function assignHub(primary, title) {
  for (const { hub, re } of rules) if (re.test(primary)) return hub
  for (const { hub, re } of rules) if (re.test(title)) return hub
  return HUB_RULES.fallback
}

const slug = (s) =>
  String(s)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const norm = (s) =>
  String(s)
    .toLowerCase()
    .replace(/^lovense\s+/, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

async function get(url, binary = false) {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000), redirect: 'follow' })
  if (!res.ok) throw new Error(`${url} returned ${res.status}`)
  return binary ? Buffer.from(await res.arrayBuffer()) : res.text()
}

function productJsonLd(html) {
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1])
      const list = Array.isArray(data) ? data : [data]
      const found = list.find((d) => d && d['@type'] === 'Product')
      if (found) return found
    } catch {
      // ignore malformed blocks
    }
  }
  return null
}

function priceOf(offers) {
  const o = Array.isArray(offers) ? offers[0] : offers
  if (!o) return 0
  const n = Number.parseFloat(o.price ?? o.lowPrice)
  return Number.isFinite(n) && n > 0 ? n : 0
}

// Store listing pages show the price shoppers actually pay and cover items that
// have no product page of their own (accessories, lube, some toys).
const STORE_PAGES = [
  'best-selling-sex-toys',
  'sex-accessories',
  'webcams',
  'anal-lube',
  'female-anal-toys',
  'male-anal-toys',
  'butt-plugs',
  'masturbators',
  'wand-vibrators',
  'clitoral-vibrators',
  'g-spot-vibrators',
  'rabbit-vibrators',
  'dildos',
  'sex-machines',
  'bundles-sex-toys',
  'sex-toys-for-women',
]

const lastMatch = (text, re) => {
  const all = [...text.matchAll(re)]
  return all.length ? all[all.length - 1][1] : undefined
}

/** Cards from the store listings: { code, name, desc, href, img, price } keyed by product code. */
async function loadStoreCards() {
  const cards = new Map()
  for (const page of STORE_PAGES) {
    let html
    try {
      html = await get(`${SOURCE}/store/${page}`)
    } catch (err) {
      console.warn(`[lovense] store page ${page} skipped: ${err.message}`)
      continue
    }
    let i = -1
    while ((i = html.indexOf('<p class="toy_price">', i + 1)) >= 0) {
      const before = html.slice(Math.max(0, i - 4000), i)
      const priceHtml = html.slice(i, i + 700).split('</p>')[0].replace(/<[^>]+>/g, ' ')
      // The first price is what shoppers pay; a second one is a struck-through list price.
      const price = Number.parseFloat((priceHtml.match(/\$(\d+(?:\.\d\d)?)/) ?? [])[1])
      const code = lastMatch(before, /data-product-code="([^"]*)"/g)
      if (!code || !(price > 0) || cards.has(code)) continue
      const name = lastMatch(before, /<p class="toy_name">([^<]*)<\/p>/g)?.replace(/\s+/g, ' ').trim()
      const desc = lastMatch(before, /<p class="toy_desc"[^>]*>([^<]*)<\/p>/g)?.replace(/&amp;/g, '&').trim()
      const href = lastMatch(before, /href="(\/[^"]+)"/g)
      const img = lastMatch(before, /(?:data-original|data-src|src)="(https:\/\/cdn\.lovense\.com\/[^"]+\.(?:png|jpg|webp)[^"]*)"/g)
      cards.set(code, { code, name, desc, href: href?.split('?')[0], img: img?.replace(/\?v=\d+$/, ''), price })
    }
  }
  return cards
}

async function main() {
  const cards = await loadStoreCards()
  const affiliateLinks = JSON.parse(fs.readFileSync(LINKS_IN, 'utf8'))
  const byName = new Map(Object.entries(affiliateLinks).map(([name, link]) => [norm(name), { name, link }]))

  const xml = zlib.gunzipSync(await get(SITEMAP, true)).toString('utf8')
  const urls = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].split('?')[0].replace(/\/$/, '')))]
    .filter((u) => !/\/sem$/.test(u))

  const products = []
  const links = {}
  const matched = new Set()
  const handles = new Set()

  for (const url of urls) {
    let ld
    try {
      ld = productJsonLd(await get(url))
    } catch (err) {
      console.warn(`[lovense] skipped ${url}: ${err.message}`)
      continue
    }
    if (!ld) continue
    const candidates = [ld.alternateName, ld.name].filter(Boolean)
    const hit = candidates.map((c) => byName.get(norm(c))).find(Boolean)
    if (!hit || matched.has(hit.name)) continue
    // Prefer the price on the store listing; the cheapest listing wins where a page
    // sells several pack sizes (Kraken single vs 6 pack).
    const path = url.replace(SOURCE, '')
    const listed = [...cards.values()].filter((c) => c.href === path).map((c) => c.price)
    const structured = priceOf(ld.offers)
    const price = listed.length ? Math.min(...listed) : structured
    if (listed.length && price !== structured) {
      console.warn(`[lovense] ${hit.name}: store price $${price} used instead of page data $${structured}`)
    }
    const images = (Array.isArray(ld.image) ? ld.image : [ld.image]).filter(Boolean)
    if (!price || images.length === 0) {
      console.warn(`[lovense] ${hit.name}: missing price or image, skipped`)
      continue
    }
    matched.add(hit.name)

    const key = norm(hit.name)
    const handle = HANDLE_ALIASES[key] ?? `lovense-${slug(ld.alternateName || hit.name)}`.replace(/^lovense-lovense-/, 'lovense-')
    if (handles.has(handle)) continue
    handles.add(handle)

    const name = String(ld.name).replace(/\s+/g, ' ').trim()
    // Brand first, then the model name when the page title leaves it out.
    const model = String(ld.alternateName ?? '').replace(/^lovense\s+/i, '').trim()
    const title = /^lovense\b/i.test(name)
      ? name
      : titleCase(`Lovense ${model && !name.toLowerCase().includes(model.toLowerCase()) ? `${model} ` : ''}${name}`)
    const category = String(ld.category ?? CATEGORY_FALLBACKS[key] ?? '').trim()
    // Kraken is a plain pocket masturbator; every other toy here pairs with the Lovense Remote app.
    const tags = (key === 'kraken' ? [category] : [category, 'App Controlled', 'Remote Control']).filter(Boolean)
    const offer = Array.isArray(ld.offers) ? ld.offers[0] : ld.offers
    const available = !/OutOfStock|SoldOut|Discontinued/i.test(String(offer?.availability ?? ''))

    products.push({
      handle,
      title,
      brand: 'Lovense',
      productType: category,
      tags,
      hub: assignHub(`${category} | ${tags.join(' | ')}`, title),
      price,
      available,
      images: images.slice(0, 4).map((src) => ({ src: src.replace(/\?v=\d+$/, '') })),
      variants: [{ title: 'Default Title', price, available }],
      program: PROGRAM,
    })
    links[handle] = hit.link
  }

  // Items with no product page: build them from their store listing card.
  for (const item of byName.values()) {
    if (matched.has(item.name)) continue
    const card = [...cards.values()].find((c) => c.name && norm(c.name) === norm(item.name))
    if (!card || !card.img) continue
    matched.add(item.name)
    const key = norm(item.name)
    const handle = HANDLE_ALIASES[key] ?? `lovense-${slug(item.name)}`.replace(/^lovense-lovense-/, 'lovense-')
    if (handles.has(handle)) continue
    handles.add(handle)

    const desc = card.desc ?? ''
    const base = /^lovense\b/i.test(card.name) ? card.name : `Lovense ${card.name}`
    // Descriptions that restate the name add nothing.
    const title =
      TITLE_OVERRIDES[key] ?? titleCase(desc && !desc.toLowerCase().includes(norm(card.name)) ? `${base} ${desc}` : base)
    const category = CATEGORY_FALLBACKS[key] ?? ''
    products.push({
      handle,
      title,
      brand: 'Lovense',
      productType: category,
      tags: [category].filter(Boolean),
      hub: assignHub(`${category} | ${desc}`, title),
      price: card.price,
      available: true,
      images: [{ src: card.img }],
      variants: [{ title: 'Default Title', price: card.price, available: true }],
      program: PROGRAM,
    })
    links[handle] = item.link
  }

  for (const item of byName.values()) {
    const fb = PAGE_FALLBACKS[norm(item.name)]
    if (matched.has(item.name) || !fb) continue
    try {
      const html = await get(SOURCE + fb.path)
      const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')
      const price = Number.parseFloat((text.match(/\$(\d+(?:\.\d\d)?)/) ?? [])[1])
      const img = (html.match(/og:image" content="([^"]+)"/) ?? [])[1]
      if (!(price > 0) || !img) throw new Error('no price or image')
      const handle = `lovense-${slug(item.name)}`.replace(/^lovense-lovense-/, 'lovense-')
      matched.add(item.name)
      handles.add(handle)
      products.push({
        handle,
        title: fb.title,
        brand: 'Lovense',
        productType: fb.category,
        tags: [fb.category],
        hub: assignHub(fb.category, fb.title),
        price,
        available: true,
        images: [{ src: img.replace(/\?v=\d+$/, '') }],
        variants: [{ title: 'Default Title', price, available: true }],
        program: PROGRAM,
      })
      links[handle] = item.link
    } catch (err) {
      console.warn(`[lovense] ${item.name}: ${fb.path} skipped: ${err.message}`)
    }
  }

  const missing = [...byName.values()].filter((v) => !matched.has(v.name)).map((v) => v.name)
  if (products.length === 0) throw new Error('No Lovense products matched')
  if (missing.length) console.warn(`[lovense] no product page found for: ${missing.join(', ')}`)

  products.sort((a, b) => a.handle.localeCompare(b.handle))
  fs.writeFileSync(CATALOG_OUT, JSON.stringify({ syncedAt: new Date().toISOString(), source: SOURCE, products }, null, 2) + '\n')
  fs.writeFileSync(LINKS_OUT, JSON.stringify(Object.fromEntries(Object.entries(links).sort()), null, 2) + '\n')

  const byHub = {}
  for (const p of products) byHub[p.hub] = (byHub[p.hub] ?? 0) + 1
  console.log(`[lovense] ${products.length} products written to src/data/lovense.json`)
  console.log('[lovense] by hub:', JSON.stringify(byHub))
}

main().catch((err) => {
  console.error(`[lovense] sync failed, keeping existing files: ${err.message}`)
  process.exit(0)
})
