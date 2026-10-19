// Server-only catalog access. Imported dynamically from server functions and
// server routes so the full catalog never ships in the client bundle.
import catalogData from '@/data/catalog.json'
import { PRODUCT_COPY } from '@/content/product-copy'
import type { Catalog, CatalogProduct } from '@/types/catalog'

const catalog = catalogData as Catalog

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

export function relatedProducts(product: CatalogProduct, limit = 4): CatalogProduct[] {
  const sameBrand = (p: CatalogProduct) => (p.brand === product.brand ? 0 : 1)
  return productsInHub(product.hub)
    .filter((p) => p.handle !== product.handle && p.available)
    .sort((a, b) => sameBrand(a) - sameBrand(b))
    .slice(0, limit)
}

export function hasCopy(handle: string): boolean {
  return handle in PRODUCT_COPY
}

export function catalogSyncedAt(): string | null {
  return catalog.syncedAt
}
