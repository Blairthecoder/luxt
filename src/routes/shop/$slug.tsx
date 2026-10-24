import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { RETIRED_COLLECTIONS } from '@/content/retired'
import { ListingPage } from '@/components/ListingPage'
import { COLLECTIONS, COLLECTIONS_BY_SLUG } from '@/content/collections'
import { POSTS_BY_SLUG } from '@/content/posts'
import { SITE, absoluteUrl } from '@/config/site'
import { getCollectionListing } from '@/lib/catalog'
import { parseListingSearch } from '@/lib/listing'
import { listingIndexing } from '@/lib/listing-head'
import { breadcrumbJsonLd, faqJsonLd, pageHead } from '@/lib/seo'
import { hasActiveFilters } from '@/lib/listing'

// Collections with fewer products than this stay out of the index.
const MIN_INDEXABLE = 6

export const Route = createFileRoute('/shop/$slug')({
  validateSearch: parseListingSearch,
  loaderDeps: ({ search }) => search,
  loader: async ({ params, deps }) => {
    const retired = RETIRED_COLLECTIONS[params.slug]
    if (retired) throw redirect({ href: retired, statusCode: 301 })
    const collection = COLLECTIONS_BY_SLUG[params.slug]
    if (!collection) throw notFound()
    const result = await getCollectionListing({ data: { slug: collection.slug, filters: deps } })
    if (!result) throw notFound()
    return { collection, result, filters: deps }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { collection, result, filters } = loaderData
    const basePath = `/shop/${collection.slug}`
    const indexing = listingIndexing(basePath, filters, result.total)
    const pageSuffix = result.page > 1 ? ` | Page ${result.page}` : ''
    return pageHead({
      title: `${collection.metaTitle}${pageSuffix} | ${SITE.shortName}`,
      description: collection.metaDescription,
      path: indexing.path,
      noindex: indexing.noindex || result.total < MIN_INDEXABLE,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: collection.name, path: basePath },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: collection.name,
          itemListElement: result.products.map((p, i) => ({
            '@type': 'ListItem',
            position: (result.page - 1) * 48 + i + 1,
            url: absoluteUrl(`/products/${p.handle}`),
            name: p.title,
          })),
        },
        // Copy and FAQs render on the clean first page only, so paginated and filtered views don't duplicate them.
        ...(result.extra?.faqs.length && result.page === 1 && !hasActiveFilters(filters) ? [faqJsonLd(result.extra.faqs)] : []),
      ],
    })
  },
  component: CollectionPage,
})

function CollectionPage() {
  const { collection, result, filters } = Route.useLoaderData()
  const guides = [collection.guide, ...(collection.guides ?? [])]
    .map((slug) => (slug ? POSTS_BY_SLUG[slug] : undefined))
    .filter((post): post is NonNullable<typeof post> => Boolean(post))
  const otherBrands =
    collection.group === 'By Brand'
      ? COLLECTIONS.filter((c) => c.group === 'By Brand' && c.slug !== collection.slug).map((c) => ({ slug: c.slug, name: c.name }))
      : []
  return (
    <ListingPage
      eyebrow={collection.group}
      title={result.extra?.h1 ?? collection.name}
      extra={result.page === 1 && !hasActiveFilters(filters) ? result.extra : null}
      extraName={collection.name}
      intro={collection.intro}
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: collection.name, path: `/shop/${collection.slug}` },
      ]}
      result={result}
      filters={filters}
      subcats={result.subcats}
      more={result.page === 1 && !hasActiveFilters(filters) ? result.more : []}
      guides={guides}
      otherBrands={otherBrands}
    />
  )
}
