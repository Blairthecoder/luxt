#!/usr/bin/env node
// Refreshes the feed-derived fields (title, price, availability, image) of the curated
// Luxury Toy X picks in src/data/luxurytoyx-picks.json from the retailer's public
// product feed. Editorial fields are never touched.
//
// A product is marked unavailable only when it is missing from the full feed or sold
// out. Rate limits and server errors are retried; if they persist the script aborts
// and writes nothing, so a flaky network can never hide the picks.
//
// Usage: node scripts/refresh-luxurytoyx-picks.mjs
// Not part of the Netlify build: run it, review the diff, commit.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const FILE = path.join(ROOT, 'src/data/luxurytoyx-picks.json')
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'))

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function fetchPage(page) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(`https://www.luxurytoyx.com/products.json?limit=250&page=${page}`, { signal: AbortSignal.timeout(30000) })
    if (res.ok) return (await res.json()).products
    await sleep(2000 * (attempt + 1))
  }
  throw new Error(`feed page ${page} still failing after retries; nothing was written`)
}

// The single-product JSON endpoint omits variant availability, so read the full feed.
const feedByHandle = new Map()
for (let page = 1; page <= 60; page++) {
  const products = await fetchPage(page)
  for (const p of products) feedByHandle.set(p.handle, p)
  if (products.length < 250) break
  await sleep(3000)
}

let changed = 0
const next = structuredClone(data)
for (const pick of next.picks) {
  const product = feedByHandle.get(pick.handle)
  if (!product) {
    console.warn(`${pick.handle}: not in the feed, marking unavailable`)
    pick.feed.available = false
    changed++
    continue
  }
  const open = product.variants.filter((v) => v.available)
  const img = product.images?.[0]
  const feed = {
    title: product.title,
    vendor: product.vendor,
    productType: product.product_type,
    price: open.length ? Math.min(...open.map((v) => Number(v.price))) : pick.feed.price,
    available: open.length > 0 && Boolean(img),
    image: img?.src ?? pick.feed.image,
    imageWidth: img?.width ?? pick.feed.imageWidth,
    imageHeight: img?.height ?? pick.feed.imageHeight,
  }
  if (JSON.stringify(feed) !== JSON.stringify(pick.feed)) {
    console.log(`${pick.handle}: updated`)
    pick.feed = feed
    changed++
  }
}
next.checkedAt = new Date().toISOString().slice(0, 10)
fs.writeFileSync(FILE, JSON.stringify(next, null, 2) + '\n')
console.log(`${next.picks.length} picks checked, ${changed} changed, checkedAt ${next.checkedAt}`)
