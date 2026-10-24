import { createServerFn } from '@tanstack/react-start'
import type { ProductCopy } from '@/types/catalog'
import type { ListingFilters } from '@/lib/listing'

export const getHomeData = createServerFn({ method: 'GET' }).handler(async () => {
  const store = await import('@/server/catalog-store')
  const { toSummary } = await import('@/server/listing')
  const { pickSection } = await import('@/server/home-picks')
  const { PRODUCT_COPY } = await import('@/content/product-copy')
  const { productHighlights } = await import('@/lib/product-highlights')
  const { buildTiles } = await import('@/server/tiles')
  const { HOME_SHORTCUTS, FEATURED_HUBS } = await import('@/content/shortcuts')
  const { POPULAR_TAG } = await import('@/server/merchandising')
  const products = store.allProducts()
  const used = new Set<string>()
  // First Picks choose first: the least intimidating first purchases, three small
  // gender-neutral vibrators plus one lube, shown cheapest first.
  const neutral = /stroker|masturbat|sleeve|cock|penis|prostate|plug|egg|thrust|rabbit|dual|g-?spot/i
  const firstToys = pickSection(products, { maxPrice: 50, hubs: ['vibrators', 'couples'], exclude: neutral }, used, 3)
  const firstLube = pickSection(products, { maxPrice: 30, hubs: ['lubricants'] }, used, 1)
  const firstPicks = [...firstToys, ...firstLube].sort((a, b) => a.price - b.price)
  // The gendered sections choose next so their lineups stay distinct.
  const forHer = pickSection(products, { hubs: ['vibrators', 'lubricants'], tags: ['female'], audience: 'female' }, used, 4)
  const forHim = pickSection(products, { hubs: ['strokers', 'prostate-massagers', 'penis-rings'], tags: ['male'], audience: 'male' }, used, 4)
  const forCouples = pickSection(products, { hubs: ['couples', 'vibrators', 'penis-rings'], title: /couple|partner|app|remote|wearable/i }, used, 4)
  const splurge = pickSection(products, { minPrice: 150, hubs: ['vibrators', 'couples', 'prostate-massagers', 'strokers'] }, used, 3)
  // Best Sellers only carries that name when the merchant itself tags enough products as best sellers.
  const popular = pickSection(products, { where: (p) => p.tags.some((t) => POPULAR_TAG.test(t)) }, used, 8)
  const popularLabelled = popular.length >= 4
  const topPicks = popularLabelled ? popular : [...popular, ...pickSection(products, {}, used, 8 - popular.length)]
  // Real markdowns only: compareAtPrice comes from the merchant feed.
  const onSale = pickSection(products, { where: (p) => !!p.compareAtPrice && p.compareAtPrice > p.price }, used, 8)
  const tileImages = new Set<string>()
  return {
    hubCounts: store.hubCounts(),
    shortcuts: buildTiles(HOME_SHORTCUTS, tileImages),
    promoTiles: buildTiles(
      [
        { kind: 'shop', slug: 'remote-control-vibrators' },
        { kind: 'shop', slug: 'sex-toys-for-beginners' },
        { kind: 'shop', slug: 'quiet-vibrators' },
        { kind: 'shop', slug: 'app-controlled-sex-toys' },
      ],
      tileImages
    ),
    categoryTiles: buildTiles(FEATURED_HUBS.map((slug) => ({ kind: 'hub' as const, slug })), tileImages),
    topPicks: topPicks.map(toSummary),
    topPicksLabel: popularLabelled ? 'Best Sellers' : 'Our Top Picks',
    onSale: onSale.length >= 4 ? onSale.map(toSummary) : [],
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
    return {
      ...buildListing(store.productsInHub(data.slug), data.filters),
      extra: LISTING_EXTRAS[`hub:${data.slug}`] ?? null,
      subcats: (await import('@/server/tiles')).subcategoryTiles(`hub:${data.slug}`),
    }
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
      subcats: (await import('@/server/tiles')).subcategoryTiles(`shop:${collection.slug}`),
    }
  })

export const getProductData = createServerFn({ method: 'GET' })
  .validator((handle: string) => handle)
  .handler(async ({ data: handle }) => {
    const store = await import('@/server/catalog-store')
    const { toSummary } = await import('@/server/listing')
    const { PRODUCT_COPY } = await import('@/content/product-copy')
    const { HOW_TO_USE } = await import('@/content/how-to-use')
    const { HOW_TO_USE_2 } = await import('@/content/how-to-use-2')
    const product = store.findProduct(handle)
    const { LOVENSE_HANDLE_ALIASES, LOVENSE_COPY_CARRYOVER } = await import('@/content/retired')
    if (!product) {
      // LuxuryToyX listings of Lovense toys move to the Lovense listing.
      const alias = LOVENSE_HANDLE_ALIASES[handle]
      if (alias && store.findProduct(alias)) return { redirectTo: `/products/${alias}` }
      // Other products dropped with the LuxuryToyX feed send visitors to the closest live category.
      const hub = store.retiredProductHub(handle)
      if (!hub) return null
      const { hubPath } = await import('@/content/retired')
      const { HUBS } = await import('@/content/hubs')
      const path = hubPath(hub)
      return { redirectTo: path.startsWith('/category/') && !HUBS.some((h) => `/category/${h.slug}` === path) ? '/' : path }
    }
    const copy: ProductCopy | null = PRODUCT_COPY[handle] ?? null
    const legacyHowTo = (h: string) => {
      const old = LOVENSE_COPY_CARRYOVER.find((k) => LOVENSE_HANDLE_ALIASES[k] === h)
      return old ? (HOW_TO_USE[old] ?? HOW_TO_USE_2[old] ?? null) : null
    }
    return {
      product,
      copy,
      howTo: copy ? (HOW_TO_USE[handle] ?? HOW_TO_USE_2[handle] ?? legacyHowTo(handle)) : null,
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
  for (const slug of ['stocking-stuffers', 'sex-toys-under-50', 'sex-toys-under-100', 'luxury-sex-toys']) {
    const prices = inStock(slug).map((p) => p.price)
    if (prices.length) fromPrices[slug] = Math.min(...prices)
  }
  return {
    giftSets: inStock('lovense-bundles').slice(0, 8).map(toSummary),
    fromPrices,
  }
})

/** Live site totals for the Partners page, counted from the catalog and content files. */
export const getSiteStats = createServerFn({ method: 'GET' }).handler(async () => {
  const store = await import('@/server/catalog-store')
  const { POSTS } = await import('@/content/posts')
  const { COLLECTIONS } = await import('@/content/collections')
  const { HUBS } = await import('@/content/hubs')
  const products = store.allProducts()
  const counts = store.hubCounts()
  return {
    products: products.length,
    brands: new Set(products.map((p) => p.brand).filter(Boolean)).size,
    categories: HUBS.filter((h) => counts[h.slug]).length,
    guides: POSTS.length,
    collections: COLLECTIONS.length,
  }
})

export const searchCatalog = createServerFn({ method: 'GET' })
  .validator((query: string) => query)
  .handler(async ({ data: query }) => {
    const { searchSite } = await import('@/server/search')
    return searchSite(query)
  })
