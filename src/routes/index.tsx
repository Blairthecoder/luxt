import { Link, createFileRoute } from '@tanstack/react-router'
import { ProductGrid } from '@/components/ProductCard'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { HUBS } from '@/content/hubs'
import { POSTS } from '@/content/posts'
import { SITE } from '@/config/site'
import { getHomeData } from '@/lib/catalog'
import type { ProductSummary } from '@/lib/listing'
import { organizationJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/')({
  loader: () => getHomeData(),
  head: () =>
    pageHead({
      title: `${SITE.name} | Luxury Adult Toys, Honestly Explained`,
      description: SITE.description,
      path: '/',
      jsonLd: [
        organizationJsonLd(),
        { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url },
      ],
    }),
  component: HomePage,
})

const NEEDS = [
  {
    slug: 'sex-toys-for-women',
    label: 'For Her',
    line: 'Vibrators, wands and air-pulse toys chosen for real pleasure.',
  },
  {
    slug: 'sex-toys-for-men',
    label: 'For Him',
    line: 'Strokers, rings and prostate toys, from first-time to expert.',
  },
  {
    slug: 'couples-sex-toys',
    label: 'For Couples',
    line: 'Wearables and app-controlled toys made to be shared.',
  },
] as const

const PROMISES = [
  ['Straight Answers', 'Plain-English guidance on sizing, materials and where to start. No judgment.'],
  ['Real Comparisons', 'Specs, prices and options side by side, so you can choose with confidence.'],
  ['Discreet Delivery', 'Every order ships in plain packaging from our trusted retail partner.'],
] as const

function Row({
  eyebrow,
  title,
  slug,
  products,
}: {
  eyebrow: string
  title: string
  slug: string
  products: ProductSummary[]
}) {
  if (!products.length) return null
  return (
    <section className="py-16 border-t border-line">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h2 className="mt-3 text-4xl text-ivory">{title}</h2>
        </div>
        <Link to="/shop/$slug" params={{ slug }} className="eyebrow text-muted hover:text-gold whitespace-nowrap">
          View All
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  )
}

function HomePage() {
  const { hubCounts, luxury, forHim, forHer } = Route.useLoaderData()
  const hubs = HUBS.filter((hub) => (hubCounts[hub.slug] ?? 0) > 0)
  const [lead] = POSTS

  return (
    <div>
      <section className="relative border-b border-line overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(198,164,105,0.12),transparent_60%)]"
        />
        <div className="relative max-w-4xl mx-auto px-5 py-28 sm:py-36 text-center">
          <p className="eyebrow text-gold">Est. 2026 · Curated Pleasure</p>
          <h1 className="mt-8 text-6xl sm:text-7xl lg:text-8xl text-ivory leading-[0.98]">
            Pleasure, <em className="text-gold not-italic font-display italic">Explained.</em>
          </h1>
          <p className="mt-8 text-lg text-muted max-w-xl mx-auto leading-relaxed">
            The world's best adult toys, chosen with care and explained without the blush. Compare honestly, then
            buy discreetly.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#shop-by-need" className="btn-gold">
              Begin Shopping
            </a>
            <Link to="/blog" className="btn-line">
              Read {SITE.guidesName}
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <section id="shop-by-need" className="my-16 grid md:grid-cols-3 gap-px bg-line border-y border-line">
          {NEEDS.map((need) => (
            <Link
              key={need.slug}
              to="/shop/$slug"
              params={{ slug: need.slug }}
              className="group bg-ink px-8 py-14 text-center"
            >
              <h2 className="text-5xl text-ivory group-hover:text-gold transition-colors">{need.label}</h2>
              <p className="mt-4 text-sm text-muted max-w-xs mx-auto leading-relaxed">{need.line}</p>
              <span className="mt-8 inline-block eyebrow text-gold-deep group-hover:text-gold">Explore</span>
            </Link>
          ))}
        </section>

        <Row eyebrow="The Investment Pieces" title="Luxury Picks" slug="luxury-sex-toys" products={luxury} />
        <Row eyebrow="Chosen for Her" title="Her Favorites" slug="sex-toys-for-women" products={forHer} />
        <Row eyebrow="Chosen for Him" title="His Favorites" slug="sex-toys-for-men" products={forHim} />

        <section className="py-16 border-t border-line grid lg:grid-cols-[1fr_2fr] gap-12">
          <div>
            <p className="eyebrow text-gold">The Collection</p>
            <h2 className="mt-3 text-4xl text-ivory">Shop by Category</h2>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-12 border-t border-line">
            {hubs.map((hub) => (
              <li key={hub.slug} className="border-b border-line">
                <Link
                  to="/category/$slug"
                  params={{ slug: hub.slug }}
                  className="group flex items-baseline justify-between py-4"
                >
                  <span className="font-display text-2xl text-ivory group-hover:text-gold transition-colors">
                    {hub.name}
                  </span>
                  <span className="text-xs text-faint">{hubCounts[hub.slug].toLocaleString()}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {lead && (
          <section className="py-20 border-t border-line text-center max-w-3xl mx-auto">
            <p className="eyebrow text-gold">From {SITE.guidesName}</p>
            <h2 className="mt-5 text-4xl sm:text-5xl text-ivory leading-tight">{lead.title}</h2>
            <p className="mt-5 text-muted leading-relaxed">{lead.excerpt}</p>
            <Link to="/blog/$slug" params={{ slug: lead.slug }} className="mt-10 btn-line">
              Read the Guide
            </Link>
          </section>
        )}

        <section className="py-16 border-t border-line grid md:grid-cols-3 gap-12">
          {PROMISES.map(([title, body], i) => (
            <div key={title}>
              <span className="font-display text-3xl text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="mt-3 text-2xl text-ivory">{title}</h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </section>

        <AffiliateNotice className="text-center pt-6" />
      </div>
    </div>
  )
}
