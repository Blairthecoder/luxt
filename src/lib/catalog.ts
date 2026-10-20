import { createServerFn } from '@tanstack/react-start'
import type { ProductCopy } from '@/types/catalog'
import type { ListingFilters } from '@/lib/listing'

export const getHomeData = createServerFn({ method: 'GET' }).handler(async () => {
  const store = await import('@/server/catalog-store')
  const { toSummary } = await import('@/server/listing')
  const { pickSection } = await import('@/server/home-picks')
  const { PRODUCT_COPY } = await import('@/content/product-copy')
  const { productHighlights } = await import('@/lib/product-highlights')
  const products = store.allProducts()
  const used = new Set<string>()
  // First Picks choose first: the least intimidating first purchases, three small
  // gender-neutral vibrators plus one lube, shown cheapest first.
  const neutral = /stroker|masturbat|sleeve|cock|penis|prostate|plug|egg|thrust|rabbit|dual|g-?spot/i
  const firstToys = pickSection(products, { maxPrice: 50, hubs: ['vibrators', 'couples'], exclude: neutral }, used, 3)
  const firstLube = pickSection(products, { maxPrice: 30, hubs: ['lubricants'] }, used, 1)
  const firstPicks = [...firstToys, ...firstLube].sort((a, b) => a.price - b.price)
  // The gendered sections choose next so their lineups stay distinct.
  const forHer = pickSection(products, { hubs: ['vibrators', 'lubricants'], tags: ['female'], audience: 'female' }, used, 3)
  const forHim = pickSection(products, { hubs: ['strokers', 'prostate-massagers', 'penis-rings'], tags: ['male'], audience: 'male' }, used, 3)
  const forCouples = pickSection(products, { hubs: ['couples', 'vibrators', 'penis-rings'], title: /couple|partner|app|remote|wearable/i }, used, 3)
  const splurge = pickSection(products, { minPrice: 150, hubs: ['vibrators', 'couples', 'prostate-massagers', 'strokers'] }, used, 3)
  return {
    hubCounts: store.hubCounts(),
    firstPicks: firstPicks.map(toSummary),
    forHer: forHer.map(toSummary),
    forHim: forHim.map(toSummary),
    forCouples: forCouples.map(toSummary),
    // A one-line reason each splurge earns its price.
    splurge: splurge.map((p) => ({
      ...toSummary(p),
      why: PRODUCT_COPY[p.handle]?.bestFor ?? productHighlights(p).slice(0, 2).join('. ') ?? '',
    })),
  }
})

export const getHubListing = createServerFn({ method: 'GET' })
  .validator((input: { slug: string; filters: ListingFilters }) => input)
  .handler(async ({ data }) => {
    const store = await import('@/server/catalog-store')
    const { buildListing } = await import('@/server/listing')
    const { LISTING_EXTRAS } = await import('@/content/listing-extras')
    return { ...buildListing(store.productsInHub(data.slug), data.filters), extra: LISTING_EXTRAS[`hub:${data.slug}`] ?? null }
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
    const { LISTING_EXTRAS } = await import('@/content/listing-extras')
    return {
      ...buildListing(store.productsMatchingRule(collection.slug, collection.rule), data.filters, COLLECTION_FOCUS[collection.slug]),
      extra: LISTING_EXTRAS[`shop:${collection.slug}`] ?? null,
    }
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
    return renderPostHtml(post)
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
