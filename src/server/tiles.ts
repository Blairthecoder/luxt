// Server-only: images for shortcut and sub-category tiles. Each tile shows the
// top discreet product on the page it links to, and no two tiles in a set
// share an image.
import { COLLECTIONS_BY_SLUG } from '@/content/collections'
import { HUBS_BY_SLUG } from '@/content/hubs'
import { COLLECTION_LINES, SUBCATEGORIES, type TileTarget } from '@/content/shortcuts'
import { productsInHub, productsMatchingRule } from '@/server/catalog-store'
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
    const ranked = merchandise(
      products.filter((p) => p.available && p.images.length > 0 && isDiscreet(p)),
      t.kind === 'shop' ? COLLECTION_FOCUS[t.slug] : undefined
    )
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
