import { createServerFn } from '@tanstack/react-start'
import type { ProductCopy } from '@/types/catalog'
import type { ListingFilters } from '@/lib/listing'

export const getHomeData = createServerFn({ method: 'GET' }).handler(async () => {
  const store = await import('@/server/catalog-store')
  const { toSummary } = await import('@/server/listing')
  const { COLLECTIONS } = await import('@/content/collections')
  const pick = (slug: string, n: number) => {
    const c = COLLECTIONS.find((x) => x.slug === slug)
    return c
      ? store
          .productsMatchingRule(c.slug, c.rule)
          .filter((p) => p.available && p.images.length > 0)
          .slice(0, n)
          .map(toSummary)
      : []
  }
  return {
    hubCounts: store.hubCounts(),
    luxury: pick('luxury-sex-toys', 4),
    forHim: pick('sex-toys-for-men', 4),
    forHer: pick('sex-toys-for-women', 4),
    forCouples: pick('couples-sex-toys', 1),
  }
})

export const getHubListing = createServerFn({ method: 'GET' })
  .validator((input: { slug: string; filters: ListingFilters }) => input)
  .handler(async ({ data }) => {
    const store = await import('@/server/catalog-store')
    const { buildListing } = await import('@/server/listing')
    return buildListing(store.productsInHub(data.slug), data.filters)
  })

export const getCollectionListing = createServerFn({ method: 'GET' })
  .validator((input: { slug: string; filters: ListingFilters }) => input)
  .handler(async ({ data }) => {
    const store = await import('@/server/catalog-store')
    const { buildListing } = await import('@/server/listing')
    const { COLLECTIONS_BY_SLUG } = await import('@/content/collections')
    const collection = COLLECTIONS_BY_SLUG[data.slug]
    if (!collection) return null
    return buildListing(store.productsMatchingRule(collection.slug, collection.rule), data.filters)
  })

export const getProductData = createServerFn({ method: 'GET' })
  .validator((handle: string) => handle)
  .handler(async ({ data: handle }) => {
    const store = await import('@/server/catalog-store')
    const { toSummary } = await import('@/server/listing')
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

export const getPostHtml = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { POSTS_BY_SLUG } = await import('@/content/posts')
    const { renderPostHtml } = await import('@/server/post-html')
    const post = POSTS_BY_SLUG[slug]
    if (!post) return null
    return { html: await renderPostHtml(post) }
  })

export const getGiftData = createServerFn({ method: 'GET' }).handler(async () => {
  const store = await import('@/server/catalog-store')
  const { toSummary } = await import('@/server/listing')
  const { COLLECTIONS_BY_SLUG } = await import('@/content/collections')
  const inStock = (slug: string) => {
    const c = COLLECTIONS_BY_SLUG[slug]
    return c ? store.productsMatchingRule(c.slug, c.rule).filter((p) => p.available && p.images.length > 0) : []
  }
  const fromPrices: Record<string, number> = {}
  for (const slug of ['stocking-stuffers', 'sex-toys-under-50', 'sex-toys-under-100', 'luxury-sex-toys', 'sex-toy-gift-sets']) {
    const prices = inStock(slug).map((p) => p.price)
    if (prices.length) fromPrices[slug] = Math.min(...prices)
  }
  return {
    giftSets: inStock('sex-toy-gift-sets').slice(0, 8).map(toSummary),
    fromPrices,
  }
})
