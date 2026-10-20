// Server-only: keyword search over products, guides, collections, categories
// and glossary terms. Every query word must match somewhere (AND), with simple
// plural folding so "vibrators" finds "vibrator".
import type { CatalogProduct } from '@/types/catalog'
import { allProducts } from '@/server/catalog-store'
import { merchScore } from '@/server/merchandising'
import { toSummary } from '@/server/listing'
import { POSTS } from '@/content/posts'
import { COLLECTIONS } from '@/content/collections'
import { HUBS } from '@/content/hubs'
import { GLOSSARY } from '@/content/glossary'
import type { SearchResults } from '@/lib/search'

const MAX_PRODUCTS = 48
const MAX_OTHER = 8

export function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .split(/\s+/)
    .map((t) => t.replace(/^['-]+|['-]+$/g, ''))
    .filter((t) => t.length > 1)
    .slice(0, 8)
}

/** Folds a plural to its stem so "vibrators", "toys" and "strokers" match their singular. */
function stem(t: string): string {
  if (t.length > 4 && t.endsWith('ies')) return `${t.slice(0, -3)}y`
  if (t.length > 3 && t.endsWith('s') && !t.endsWith('ss')) return t.slice(0, -1)
  return t
}

function fold(text: string): string {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map(stem)
    .join(' ')
}

/** Score for one field: a whole word beats a word prefix ("vib" finds "vibrator"). Mid-word hits don't count. */
function fieldScore(haystack: string, token: string, weight: number): number {
  if (!haystack) return 0
  if ((` ${haystack} `).includes(` ${token} `)) return weight
  return (` ${haystack}`).includes(` ${token}`) ? weight * 0.6 : 0
}

interface Indexed<T> {
  item: T
  fields: [string, number][]
}

function rank<T>(entries: Indexed<T>[], tokens: string[]): { item: T; score: number }[] {
  const out: { item: T; score: number }[] = []
  for (const { item, fields } of entries) {
    let total = 0
    let ok = true
    for (const token of tokens) {
      let best = 0
      let sum = 0
      for (const [text, weight] of fields) {
        const s = fieldScore(text, token, weight)
        sum += s
        if (s > best) best = s
      }
      if (best === 0) {
        ok = false
        break
      }
      total += best + (sum - best) * 0.25
    }
    if (ok) out.push({ item, score: total })
  }
  return out.sort((a, b) => b.score - a.score)
}

let productIndex: Indexed<CatalogProduct>[] | null = null
function products(): Indexed<CatalogProduct>[] {
  if (!productIndex) {
    productIndex = allProducts().map((p) => ({
      item: p,
      fields: [
        [fold(p.title), 6],
        [fold(p.brand), 4],
        [fold(p.productType), 3],
        [fold(HUBS.find((h) => h.slug === p.hub)?.name ?? p.hub), 3],
        [fold(p.tags.join(' ')), 2],
      ],
    }))
  }
  return productIndex
}

const guides: Indexed<(typeof POSTS)[number]>[] = POSTS.map((p) => ({
  item: p,
  fields: [
    [fold(p.title), 6],
    [fold(p.slug.replace(/-/g, ' ')), 4],
    [fold(p.excerpt), 2],
    [fold(p.metaDescription), 1],
  ],
}))

const collections: Indexed<(typeof COLLECTIONS)[number]>[] = COLLECTIONS.map((c) => ({
  item: c,
  fields: [
    [fold(c.name), 6],
    [fold(c.slug.replace(/-/g, ' ')), 4],
    [fold(c.metaDescription), 1],
  ],
}))

const hubs: Indexed<(typeof HUBS)[number]>[] = HUBS.map((h) => ({
  item: h,
  fields: [
    [fold(h.name), 6],
    [fold(h.singular), 5],
    [fold(h.metaDescription), 1],
  ],
}))

const terms: Indexed<(typeof GLOSSARY)[number]>[] = GLOSSARY.map((t) => ({
  item: t,
  fields: [
    [fold(t.term), 6],
    [fold(t.definition), 1],
  ],
}))

export function searchSite(q: string): SearchResults {
  const tokens = tokenize(q).map(stem)
  const empty: SearchResults = { q, products: [], total: 0, guides: [], collections: [], categories: [], terms: [] }
  if (!tokens.length) return empty

  const matched = rank(products(), tokens)
    // Relevance first; ties and near-ties go to the shop-window ranking, with sold-out items last.
    .map(({ item, score }) => ({ item, rank: score + merchScore(item) * 0.15 }))
    .sort((a, b) => b.rank - a.rank)

  return {
    q,
    products: matched.slice(0, MAX_PRODUCTS).map(({ item }) => toSummary(item)),
    total: matched.length,
    guides: rank(guides, tokens)
      .slice(0, MAX_OTHER)
      .map(({ item }) => ({ slug: item.slug, title: item.title, excerpt: item.excerpt, readMinutes: item.readMinutes })),
    collections: rank(collections, tokens)
      .slice(0, MAX_OTHER)
      .map(({ item }) => ({ slug: item.slug, name: item.name })),
    categories: rank(hubs, tokens)
      .slice(0, MAX_OTHER)
      .map(({ item }) => ({ slug: item.slug, name: item.name })),
    terms: rank(terms, tokens)
      .slice(0, 4)
      .map(({ item }) => ({ slug: item.slug, term: item.term, definition: item.definition })),
  }
}
