import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, MessageCircle, Scale, Truck } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { HUBS } from '@/content/hubs'
import { SITE } from '@/config/site'
import { getHomeData } from '@/lib/catalog'
import { organizationJsonLd, pageHead } from '@/lib/seo'
import { getOptimizedImageUrl } from '@/lib/image'

export const Route = createFileRoute('/')({
  loader: () => getHomeData(),
  head: () =>
    pageHead({
      title: `${SITE.name} | Adult Toys, Explained`,
      description: SITE.description,
      path: '/',
      jsonLd: [
        organizationJsonLd(),
        { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url },
      ],
    }),
  component: HomePage,
})

const PROMISES = [
  {
    icon: MessageCircle,
    title: 'Straight answers',
    body: 'Plain-English guidance on sizing, materials and what to try first, with no judgment.',
  },
  {
    icon: Scale,
    title: 'Real comparisons',
    body: 'Specs, prices and options side by side so you can pick with confidence.',
  },
  {
    icon: Truck,
    title: 'Discreet delivery',
    body: 'Orders ship in plain packaging from our trusted retail partner.',
  },
]

function HomePage() {
  const { featured, hubCounts } = Route.useLoaderData()
  const hubs = HUBS.filter((hub) => (hubCounts[hub.slug] ?? 0) > 0)

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[#1F212D]">
        <img
          src={getOptimizedImageUrl('/img/hero-banner.png', 1600)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-200/80 mb-4">{SITE.name}</p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight">
            Adult toys, explained. The right pick, without the guesswork.
          </h1>
          <p className="mt-5 text-base text-slate-300 leading-relaxed max-w-xl">{SITE.tagline}</p>
          <a
            href="#categories"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#9B2C68] to-[#C88A58] text-white text-sm font-semibold"
          >
            Shop by category <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid sm:grid-cols-3 gap-6">
        {PROMISES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">{title}</h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </section>

      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-serif font-bold text-white mb-6">Shop by category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {hubs.map((hub) => (
            <Link
              key={hub.slug}
              to="/category/$slug"
              params={{ slug: hub.slug }}
              className="p-5 rounded-2xl bg-[#12131C] border border-[#232535] hover:border-[#4B3D55] transition-colors"
            >
              <span className="block text-base font-serif font-bold text-white">{hub.name}</span>
              <span className="block text-xs text-slate-400 mt-1">{hubCounts[hub.slug]} products</span>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-serif font-bold text-white mb-6">Popular right now</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.handle} product={product} />
            ))}
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <AffiliateNotice />
      </div>
    </div>
  )
}
