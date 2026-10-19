import { createServerFn } from '@tanstack/react-start'
import type { CatalogProduct, ProductCopy } from '@/types/catalog'

/** Card-sized product data for grids. */
export type ProductSummary = Pick<
  CatalogProduct,
  'handle' | 'title' | 'brand' | 'hub' | 'price' | 'compareAtPrice' | 'available'
> & { image?: string }

function toSummary(p: CatalogProduct): ProductSummary {
  return {
    handle: p.handle,
    title: p.title,
    brand: p.brand,
    hub: p.hub,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    available: p.available,
    image: p.images[0]?.src,
  }
}

export const getHomeData = createServerFn({ method: 'GET' }).handler(async () => {
  const store = await import('@/server/catalog-store')
  const featured = store
    .allProducts()
    .filter((p) => p.available)
    .slice(0, 12)
    .map(toSummary)
  return { featured, hubCounts: store.hubCounts() }
})

export const getHubData = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const store = await import('@/server/catalog-store')
    const products = store
      .productsInHub(slug)
      .sort((a, b) => Number(b.available) - Number(a.available))
      .map(toSummary)
    return { products }
  })

export const getProductData = createServerFn({ method: 'GET' })
  .validator((handle: string) => handle)
  .handler(async ({ data: handle }) => {
    const store = await import('@/server/catalog-store')
    const { PRODUCT_COPY } = await import('@/content/product-copy')
    const product = store.findProduct(handle)
    if (!product) return null
    const copy: ProductCopy | null = PRODUCT_COPY[handle] ?? null
    return {
      product,
      copy,
      related: store.relatedProducts(product).map(toSummary),
    }
  })
