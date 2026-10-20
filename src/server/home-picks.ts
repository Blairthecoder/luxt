// Server-only: picks the homepage sections. The homepage is the shop window, so
// it only shows products that photograph discreetly, ranks them with the same
// merchandising rules as listing pages, and never repeats a product.
import type { CatalogProduct } from '@/types/catalog'
import { isDiscreet, merchandise, type MerchFocus } from '@/server/merchandising'

export type HomeSection = MerchFocus & {
  tags?: string[]
  title?: RegExp
  exclude?: RegExp
  minPrice?: number
  maxPrice?: number
  where?: (p: CatalogProduct) => boolean
}

function eligible(p: CatalogProduct, section: HomeSection): boolean {
  if (!p.available || !p.images.length || p.price <= 0) return false
  if (section.hubs && !section.hubs.includes(p.hub)) return false
  if (section.minPrice !== undefined && p.price < section.minPrice) return false
  if (section.maxPrice !== undefined && p.price > section.maxPrice) return false
  if (section.tags && !p.tags.some((t) => section.tags!.includes(t.trim().toLowerCase()))) return false
  if (section.title && !section.title.test(p.title)) return false
  if (section.exclude && section.exclude.test(p.title)) return false
  if (section.where && !section.where(p)) return false
  return isDiscreet(p)
}

/** Up to `n` products for a section; picks are added to `used`. */
export function pickSection(products: CatalogProduct[], section: HomeSection, used: Set<string>, n: number) {
  const picks = merchandise(
    products.filter((p) => !used.has(p.handle) && eligible(p, section)),
    section
  ).slice(0, n)
  picks.forEach((p) => used.add(p.handle))
  return picks
}
