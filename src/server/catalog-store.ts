// Server-only catalog access. Imported dynamically from server functions and
// server routes so the full catalog never ships in the client bundle.
import catalogData from '@/data/catalog.json'
import lovenseData from '@/data/lovense.json'
import { PRODUCT_COPY } from '@/content/product-copy'
import type { Catalog, CatalogProduct } from '@/types/catalog'
import type { CollectionRule } from '@/content/collections'
import { merchandise } from '@/server/merchandising'

// The store lists Lovense only. Lovense is a direct affiliate program with its
// own product pages. The LuxuryToyX feed is still synced, but only to send old
// product URLs to the closest live category (see retiredProductHub).
const lovenseProducts = (lovenseData as Catalog).products
const lovenseHandles = new Set(lovenseProducts.map((p) => p.handle))
const retiredCatalog = catalogData as Catalog
const catalog: Catalog = {
  syncedAt: (lovenseData as Catalog).syncedAt ?? retiredCatalog.syncedAt,
  source: (lovenseData as Catalog).source,
  products: lovenseProducts,
}

const retiredHubs = new Map<string, string>(
  retiredCatalog.products.filter((p) => !lovenseHandles.has(p.handle)).map((p) => [p.handle, p.hub])
)

/** Hub of a product that was removed with the LuxuryToyX feed, if the handle was ever listed. */
export function retiredProductHub(handle: string): string | undefined {
  return retiredHubs.get(handle)
}

const byHandle = new Map<string, CatalogProduct>(
  catalog.products.map((p) => [p.handle, p])
)

export function allProducts(): CatalogProduct[] {
  return catalog.products
}

export function findProduct(handle: string): CatalogProduct | undefined {
  return byHandle.get(handle)
}

export function productsInHub(hub: string): CatalogProduct[] {
  return catalog.products.filter((p) => p.hub === hub)
}

export function hubCounts(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const p of catalog.products) counts[p.hub] = (counts[p.hub] ?? 0) + 1
  return counts
}

/** Similar products from the same hub: at most one from the same brand, the rest spread across other brands. */
export function relatedProducts(product: CatalogProduct, limit = 4): CatalogProduct[] {
  const ranked = merchandise(productsInHub(product.hub).filter((p) => p.handle !== product.handle && p.available))
  const same = ranked.find((p) => p.brand === product.brand)
  const others = ranked.filter((p) => p.brand !== product.brand)
  return [...(same ? [same] : []), ...others].slice(0, limit)
}

export function hasCopy(handle: string): boolean {
  return handle in PRODUCT_COPY
}

export function catalogSyncedAt(): string | null {
  return catalog.syncedAt
}

const ruleCache = new Map<string, CatalogProduct[]>()

export function productsMatchingRule(slug: string, rule: CollectionRule): CatalogProduct[] {
  const cached = ruleCache.get(slug)
  if (cached) return cached
  const titleRe = rule.title ? new RegExp(rule.title, 'i') : null
  const excludeRe = rule.excludeTitle ? new RegExp(rule.excludeTitle, 'i') : null
  const textRe = rule.text ? new RegExp(rule.text, 'i') : null
  const tags = rule.tags?.map((t) => t.toLowerCase())
  const brands = rule.brands?.map((b) => b.toLowerCase())
  const result = catalog.products.filter((p) => {
    if (rule.hubs && !rule.hubs.includes(p.hub)) return false
    if (tags && !p.tags.some((t) => tags.includes(t.trim().toLowerCase()))) return false
    if (titleRe && !titleRe.test(p.title)) return false
    if (excludeRe && excludeRe.test(p.title)) return false
    if (textRe && !textRe.test(p.title) && !p.tags.some((t) => textRe.test(t))) return false
    if (brands && !brands.includes(p.brand.toLowerCase())) return false
    if (rule.minPrice !== undefined && p.price < rule.minPrice) return false
    if (rule.maxPrice !== undefined && p.price >= rule.maxPrice) return false
    if (rule.onSale && !(p.compareAtPrice !== undefined && p.compareAtPrice > p.price)) return false
    return true
  })
  ruleCache.set(slug, result)
  return result
}
