import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { RETIRED_HUBS } from '@/content/retired'
import { ListingPage } from '@/components/ListingPage'
import { HUBS_BY_SLUG } from '@/content/hubs'
import { postsForHub } from '@/content/posts'
import { SITE, absoluteUrl } from '@/config/site'
import { getHubListing } from '@/lib/catalog'
import { parseListingSearch } from '@/lib/listing'
import { listingIndexing } from '@/lib/listing-head'
import { breadcrumbJsonLd, faqJsonLd, pageHead } from '@/lib/seo'
import { hasActiveFilters } from '@/lib/listing'

export const Route = createFileRoute('/category/$slug')({
  validateSearch: parseListingSearch,
  loaderDeps: ({ search }) => search,
  loader: async ({ params, deps }) => {
    const retired = RETIRED_HUBS[params.slug]
    if (retired) throw redirect({ href: retired, statusCode: 301 })
    const hub = HUBS_BY_SLUG[params.slug]
    if (!hub) throw notFound()
    const result = await getHubListing({ data: { slug: hub.slug, filters: deps } })
    return { hub, result, filters: deps }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { hub, result, filters } = loaderData
    const basePath = `/category/${hub.slug}`
    const { path, noindex } = listingIndexing(basePath, filters, result.total)
    const pageSuffix = result.page > 1 ? ` | Page ${result.page}` : ''
    return pageHead({
      title: `${hub.metaTitle}${pageSuffix} | ${SITE.shortName}`,
      description: hub.metaDescription,
      path,
      noindex,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: hub.name, path: basePath },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: hub.name,
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
  component: CategoryPage,
})

function CategoryPage() {
  const { hub, result, filters } = Route.useLoaderData()
  return (
    <ListingPage
      eyebrow="Category"
      title={result.extra?.h1 ?? hub.name}
      extra={result.page === 1 && !hasActiveFilters(filters) ? result.extra : null}
      extraName={hub.name}
      intro={hub.intro}
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: hub.name, path: `/category/${hub.slug}` },
      ]}
      result={result}
      filters={filters}
      subcats={result.subcats}
      more={result.page === 1 && !hasActiveFilters(filters) ? result.more : []}
      tips={hub.buyingTips}
      guides={postsForHub(hub.slug)}
    />
  )
}
