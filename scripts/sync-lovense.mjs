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
}

// Pages that publish no category.
const CATEGORY_FALLBACKS = { 'gush 2 motion': 'Masturbators' }

const SMALL_WORDS = new Set(['a', 'and', 'for', 'of', 'the', 'with', 'to', 'in'])
const titleCase = (s) =>
  s.replace(/\b([a-z])([a-z]*)/g, (m, a, rest, offset) =>
    offset > 0 && SMALL_WORDS.has(m) ? m : a.toUpperCase() + rest
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

async function main() {
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
    const price = priceOf(ld.offers)
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
    const tags = [category, 'App Controlled', 'Remote Control'].filter(Boolean)
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
