// Server-only: images for shortcut and sub-category tiles. Each tile shows the
// top discreet product on the page it links to, and no two tiles in a set
// share an image. A page with no discreet product falls back to its top
// product, so every live category keeps a cover.
import { COLLECTIONS_BY_SLUG } from '@/content/collections'
import { HUBS_BY_SLUG } from '@/content/hubs'
import { COLLECTION_LINES, RELATED_HUBS, SUBCATEGORIES, type TileTarget } from '@/content/shortcuts'
import { allProducts, productsInHub, productsMatchingRule } from '@/server/catalog-store'
import { COLLECTION_FOCUS, isDiscreet, merchandise } from '@/server/merchandising'
import type { CatalogProduct } from '@/types/catalog'

export interface Tile extends TileTarget {
  /** Short label from the shortcut list, when it has one. */
  label?: string
  name: string
  line: string
  image: string | null
  count: number
}

function source(t: TileTarget): CatalogProduct[] {
  if (t.kind === 'hub') return productsInHub(t.slug)
  const c = COLLECTIONS_BY_SLUG[t.slug]
  return c ? productsMatchingRule(c.slug, c.rule) : []
}

/** Tiles for the given targets, skipping any that are missing or empty. `used` keeps images unique across calls. */
export function buildTiles(targets: (TileTarget & { label?: string })[], used = new Set<string>()): Tile[] {
  const out: Tile[] = []
  for (const t of targets) {
    const name = t.kind === 'hub' ? HUBS_BY_SLUG[t.slug]?.name : COLLECTIONS_BY_SLUG[t.slug]?.name
    const products = source(t)
    if (!name || products.length === 0) continue
    const pictured = products.filter((p) => p.available && p.images.length > 0)
    const discreet = pictured.filter(isDiscreet)
    const ranked = merchandise(discreet.length ? discreet : pictured, t.kind === 'shop' ? COLLECTION_FOCUS[t.slug] : undefined)
    const pick = ranked.find((p) => !used.has(p.handle)) ?? ranked[0]
    if (pick) used.add(pick.handle)
    out.push({
      ...t,
      name,
      line: COLLECTION_LINES[t.slug] ?? '',
      image: pick?.images[0]?.src ?? null,
      count: products.length,
    })
  }
  return out
}

/** Sub-category tiles for a listing, keyed `hub:<slug>` or `shop:<slug>`. */
export function subcategoryTiles(key: string): Tile[] {
  const self = key.split(':')[1]
  return buildTiles((SUBCATEGORIES[key] ?? []).filter((slug) => slug !== self).map((slug) => ({ kind: 'shop' as const, slug })))
}

/** First title words that describe a toy rather than name its model. */
const GENERIC_WORDS = /^(app|mini|remote|personal|water|toy|vibrating|bluetooth)|-/i

/**
 * Products for the "More to Explore" row under listings too small to fill a
 * row of four on their own: bundles and sets that include a listed toy first,
 * then related hubs, the listing's sub-category pages and its own hub.
 */
export function moreToExplore(key: string, listed: CatalogProduct[], n = 4): CatalogProduct[] {
  if (listed.length >= n) return []
  const seen = new Set(listed.map((p) => p.handle))
  const take = (products: CatalogProduct[]) => {
    const fresh = products.filter((p) => !seen.has(p.handle) && p.available && p.images.length > 0)
    fresh.forEach((p) => seen.add(p.handle))
    return merchandise(fresh)
  }
  // Model names of the listed toys, e.g. "Gemini" from "Lovense Gemini ...".
  const models = listed.map((p) => p.title.replace(new RegExp(`^${p.brand}\\s+`, 'i'), '').split(/\s+/)[0]).filter((m) => m.length > 2 && !GENERIC_WORDS.test(m))
  const sets = take(allProducts().filter((p) => models.some((m) => new RegExp(`\\b${m}\\b`, 'i').test(p.title))))
  const hubs = take((RELATED_HUBS[key] ?? []).flatMap((hub) => productsInHub(hub)))
  const related = take((SUBCATEGORIES[key] ?? []).flatMap((slug) => source({ kind: 'shop', slug })))
  const sameHub = take([...new Set(listed.map((p) => p.hub))].flatMap((hub) => productsInHub(hub)))
  return [...sets, ...hubs, ...related, ...sameHub].slice(0, n)
}
