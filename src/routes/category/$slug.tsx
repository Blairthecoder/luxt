import { createFileRoute, notFound } from '@tanstack/react-router'
import { CheckCircle2 } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { HUBS_BY_SLUG } from '@/content/hubs'
import { SITE, absoluteUrl } from '@/config/site'
import { getHubData } from '@/lib/catalog'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/category/$slug')({
  loader: async ({ params }) => {
    const hub = HUBS_BY_SLUG[params.slug]
    if (!hub) throw notFound()
    const { products } = await getHubData({ data: hub.slug })
    return { hub, products }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { hub, products } = loaderData
    const path = `/category/${hub.slug}`
    return pageHead({
      title: `${hub.metaTitle} | ${SITE.shortName}`,
      description: hub.metaDescription,
      path,
      noindex: products.length === 0,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: hub.name, path },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: hub.name,
          itemListElement: products.slice(0, 30).map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: absoluteUrl(`/products/${p.handle}`),
            name: p.title,
          })),
        },
      ],
    })
  },
  component: CategoryPage,
})

function CategoryPage() {
  const { hub, products } = Route.useLoaderData()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <header className="space-y-4 max-w-3xl">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: hub.name, path: `/category/${hub.slug}` },
          ]}
        />
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">{hub.name}</h1>
        <p className="text-slate-300 leading-relaxed">{hub.intro}</p>
        <AffiliateNotice />
      </header>

      <section aria-labelledby="tips" className="rounded-3xl bg-[#10121B] border border-[#212332] p-6 max-w-3xl">
        <h2 id="tips" className="text-lg font-serif font-bold text-white mb-3">
          What to know before you buy
        </h2>
        <ul className="space-y-2">
          {hub.buyingTips.map((tip) => (
            <li key={tip} className="flex gap-2 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="products">
        <h2 id="products" className="text-xl font-serif font-bold text-white mb-5">
          {products.length} {hub.name.toLowerCase()} to compare
        </h2>
        {products.length === 0 ? (
          <p className="text-slate-400">New products are on the way. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.handle} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
