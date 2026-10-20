import { createServerFn } from '@tanstack/react-start'
import type { ProductCopy } from '@/types/catalog'
import type { ListingFilters } from '@/lib/listing'

export const getHomeData = createServerFn({ method: 'GET' }).handler(async () => {
  const store = await import('@/server/catalog-store')
  const { toSummary } = await import('@/server/listing')
  const { pickSection } = await import('@/server/home-picks')
  const products = store.allProducts()
  const used = new Set<string>()
  // Order matters: the gendered sections choose first so their lineups stay distinct.
  const forHer = pickSection(products, { hubs: ['vibrators', 'lubricants'], tags: ['female'], audience: 'female' }, used, 3)
  const forHim = pickSection(products, { hubs: ['strokers', 'prostate-massagers', 'penis-rings'], tags: ['male'], audience: 'male' }, used, 3)
  const forCouples = pickSection(products, { hubs: ['couples', 'vibrators', 'penis-rings'], title: /couple|partner|app|remote|wearable/i }, used, 3)
  const firstPicks = pickSection(products, { maxPrice: 60, hubs: ['vibrators', 'strokers', 'lubricants', 'penis-rings', 'couples'] }, used, 4)
  const splurge = pickSection(products, { minPrice: 150, hubs: ['vibrators', 'couples', 'prostate-massagers', 'strokers'] }, used, 3)
  return {
    hubCounts: store.hubCounts(),
    firstPicks: firstPicks.map(toSummary),
    forHer: forHer.map(toSummary),
    forHim: forHim.map(toSummary),
    forCouples: forCouples.map(toSummary),
    splurge: splurge.map(toSummary),
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
    const { COLLECTION_FOCUS } = await import('@/server/merchandising')
    return buildListing(
      store.productsMatchingRule(collection.slug, collection.rule),
      data.filters,
      COLLECTION_FOCUS[collection.slug]
    )
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
