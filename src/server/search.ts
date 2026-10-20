// Server-only site search over products, category hubs, collections and guides.
import { allProducts } from '@/server/catalog-store'
import { HUBS } from '@/content/hubs'
import { COLLECTIONS } from '@/content/collections'
import { POSTS } from '@/content/posts'
import { PRODUCT_COPY } from '@/content/product-copy'

export interface SearchProduct {
  handle: string
  title: string
  brand: string
  price: number
  compareAtPrice?: number
  available: boolean
  image?: string
}

export interface SearchLink {
  slug: string
  name: string
  note?: string
}

export interface SearchResults {
  products: SearchProduct[]
  hubs: SearchLink[]
  collections: SearchLink[]
  guides: SearchLink[]
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const compact = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '')

interface Indexed {
  title: string
  brand: string
  words: string
  flat: string
  index: number
}

let productIndex: Indexed[] | null = null

function buildIndex(): Indexed[] {
  const products = allProducts()
  return products.map((p, index) => {
    const text = `${p.title} ${p.brand} ${p.hub.replace(/-/g, ' ')} ${p.tags.join(' ')}`
    return { title: norm(p.title), brand: norm(p.brand), words: ` ${norm(text)} `, flat: compact(text), index }
  })
}

function scoreText(text: string, tokens: string[], flatQuery: string, flat: string): number {
  let score = 0
  for (const t of tokens) {
    if (text.includes(` ${t}`)) score += 2
    else if (t.length >= 3 && text.includes(t)) score += 1
    else if (flatQuery.length < 3 || !flat.includes(flatQuery)) return 0
  }
  return score || (flatQuery.length >= 3 && flat.includes(flatQuery) ? 1 : 0)
}

function searchProducts(tokens: string[], flatQuery: string, limit: number): SearchProduct[] {
  productIndex ??= buildIndex()
  const products = allProducts()
  const scored: { score: number; index: number }[] = []
  for (const entry of productIndex) {
    const base = scoreText(entry.words, tokens, flatQuery, entry.flat)
    if (!base) continue
    let score = base
    if (entry.title.startsWith(tokens[0])) score += 4
    if (entry.brand === tokens.join(' ') || tokens.every((t) => entry.brand.includes(t))) score += 3
    const p = products[entry.index]
    if (p.available) score += 2
    if (p.handle in PRODUCT_COPY) score += 1
    scored.push({ score, index: entry.index })
  }
  scored.sort((a, b) => b.score - a.score || products[a.index].title.localeCompare(products[b.index].title))
  return scored.slice(0, limit).map(({ index }) => {
    const p = products[index]
    return {
      handle: p.handle,
      title: p.title,
      brand: p.brand,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      available: p.available,
      image: p.images[0]?.src,
    }
  })
}

function searchLinks<T>(items: T[], pick: (item: T) => { slug: string; name: string; note?: string; text: string }, tokens: string[], flatQuery: string, limit: number): SearchLink[] {
  const out: { score: number; link: SearchLink }[] = []
  for (const item of items) {
    const { slug, name, note, text } = pick(item)
    const words = ` ${norm(`${name} ${text}`)} `
    const flat = compact(`${name} ${text}`)
    let score = scoreText(words, tokens, flatQuery, flat)
    if (!score) continue
    if (norm(name).includes(tokens.join(' '))) score += 4
    out.push({ score, link: { slug, name, note } })
  }
  return out.sort((a, b) => b.score - a.score).slice(0, limit).map((o) => o.link)
}

export function searchSite(query: string): SearchResults {
  const q = norm(query).slice(0, 80)
  const tokens = q.split(' ').filter(Boolean)
  if (!tokens.length || q.length < 2) return { products: [], hubs: [], collections: [], guides: [] }
  const flatQuery = tokens.join('')
  return {
    products: searchProducts(tokens, flatQuery, 8),
    hubs: searchLinks(HUBS, (h) => ({ slug: h.slug, name: h.name, text: h.singular }), tokens, flatQuery, 3),
    collections: searchLinks(
      COLLECTIONS,
      (c) => ({ slug: c.slug, name: c.name, note: c.group, text: `${c.group} ${c.metaTitle}` }),
      tokens,
      flatQuery,
      4
    ),
    guides: searchLinks(
      POSTS,
      (p) => ({ slug: p.slug, name: p.title, note: `${p.readMinutes} min read`, text: `${p.excerpt} ${p.topics.join(' ')}` }),
      tokens,
      flatQuery,
      3
    ),
  }
}
