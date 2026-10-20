import { Link, createFileRoute } from '@tanstack/react-router'
import { ProductRail } from '@/components/ProductCard'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { HUBS } from '@/content/hubs'
import { COLLECTIONS_BY_SLUG } from '@/content/collections'
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
    tone: 'bg-sand text-ink',
    links: ['clitoral-vibrators', 'wand-vibrators', 'rabbit-vibrators'],
  },
  {
    slug: 'sex-toys-for-men',
    label: 'For Him',
    line: 'Strokers, rings and prostate toys, from first-time to expert.',
    tone: 'bg-[#d6d0c6] text-ink',
    links: ['automatic-strokers', 'prostate-vibrators', 'tenga'],
  },
  {
    slug: 'couples-sex-toys',
    label: 'For Couples',
    line: 'Wearables and app-controlled toys made to be shared.',
    tone: 'bg-[#1d1d1f] text-canvas',
    links: ['app-controlled-sex-toys', 'remote-control-vibrators', 'vibrating-cock-rings'],
  },
] as const

const PROMISES = [
  ['Straight Answers', 'Plain-English guidance on sizing, materials and where to start. No judgment.'],
  ['Real Comparisons', 'Specs, prices and options side by side, so you can choose with confidence.'],
  ['Discreet Delivery', 'Every order ships in plain packaging from our trusted retail partner.'],
] as const

function Row({
  title,
  kicker,
  slug,
  products,
}: {
  title: string
  kicker: string
  slug: string
  products: ProductSummary[]
}) {
  if (!products.length) return null
  return (
    <section className="wrap pt-24 sm:pt-32 reveal">
      <div className="flex items-end justify-between gap-6 mb-8 sm:mb-10">
        <h2 className="display-m max-w-3xl">
          {title}. <span className="text-graphite">{kicker}.</span>
        </h2>
        <Link to="/shop/$slug" params={{ slug }} className="more hidden sm:inline-flex">
          View All
        </Link>
      </div>
      <ProductRail products={products} size="small" />
      <Link to="/shop/$slug" params={{ slug }} className="more mt-8 sm:hidden">
        View All
      </Link>
    </section>
  )
}

function HomePage() {
  const { hubCounts, luxury, forHim, forHer } = Route.useLoaderData()
  const hubs = HUBS.filter((hub) => (hubCounts[hub.slug] ?? 0) > 0)
  const [lead] = POSTS

  return (
    <div>
      <section className="bg-stone">
        <div className="wrap grid lg:grid-cols-12 gap-14 lg:gap-10 items-end pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div className="lg:col-span-8">
            <p className="eyebrow text-graphite rise">Curated Pleasure. Est. 2026.</p>
            <h1 className="mt-5 display-xl rise">
              Pleasure,{' '}
              <br />
              Explained.
            </h1>
            <p className="mt-8 lede text-graphite max-w-lg rise-delay">
              The world's best adult toys, chosen with care and explained without the blush. Compare honestly, then
              buy discreetly.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 rise-delay">
              <a href="#shop-by-need" className="btn">
                Begin Shopping
              </a>
              <Link to="/blog" className="more">
                Read {SITE.guidesName}
              </Link>
            </div>
          </div>
          <ul className="lg:col-span-4 border-t border-ink/15 rise-delay">
            {PROMISES.map(([title, body], i) => (
              <li key={title} className="grid grid-cols-[2rem_1fr] gap-3 py-5 border-b border-ink/15">
                <span className="text-xs font-semibold text-graphite tabular-nums pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="font-sans text-[0.9375rem] font-semibold tracking-[-0.01em]">{title}</h2>
                  <p className="mt-1 text-sm text-graphite leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="shop-by-need" className="wrap pt-3 grid md:grid-cols-3 gap-3 scroll-mt-24">
        {NEEDS.map((need, i) => (
          <div key={need.slug} className={`group relative flex flex-col justify-between min-h-[24rem] sm:min-h-[30rem] p-7 sm:p-10 ${need.tone}`}>
            <div>
              <span className="text-xs font-semibold tabular-nums opacity-60">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="mt-6 display-m !text-[clamp(2.25rem,3.6vw,3.25rem)]">
                <Link to="/shop/$slug" params={{ slug: need.slug }} className="after:absolute after:inset-0">
                  {need.label}
                </Link>
              </h2>
            </div>
            <div>
              <p className="text-[0.9375rem] opacity-70 max-w-xs leading-relaxed">{need.line}</p>
              <ul className="relative z-10 mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
                {need.links.map((slug) => (
                  <li key={slug}>
                    <Link
                      to="/shop/$slug"
                      params={{ slug }}
                      className="underline underline-offset-4 decoration-1 opacity-80 hover:opacity-100 transition-opacity"
                    >
                      {COLLECTIONS_BY_SLUG[slug]?.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <span className="mt-8 more">Shop {need.label}</span>
            </div>
          </div>
        ))}
      </section>

      <Row title="Her Favorites" kicker="Chosen for her" slug="sex-toys-for-women" products={forHer} />
      <Row title="His Favorites" kicker="Chosen for him" slug="sex-toys-for-men" products={forHim} />
      <Row title="Luxury Picks" kicker="The investment pieces" slug="luxury-sex-toys" products={luxury} />

      <section className="mt-28 sm:mt-36 bg-night text-canvas">
        <div className="wrap py-24 sm:py-32 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 reveal">
            <h2 className="display-l">
              Shop by{' '}
              <br />
              Category.
            </h2>
            <p className="mt-6 text-[#a1a1a6] max-w-xs leading-relaxed">
              Every category, sorted by what it does and who it is for.
            </p>
          </div>
          <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-x-12 border-t border-night-line reveal">
            {hubs.map((hub) => (
              <li key={hub.slug} className="border-b border-night-line">
                <Link
                  to="/category/$slug"
                  params={{ slug: hub.slug }}
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <span className="font-display text-2xl sm:text-[1.75rem] font-semibold tracking-[-0.03em] text-canvas/85 group-hover:text-canvas transition-colors">
                    {hub.name}
                  </span>
                  <span className="text-xs text-[#86868b] tabular-nums">{hubCounts[hub.slug].toLocaleString()}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {lead && (
        <section className="wrap pt-24 sm:pt-36 reveal">
          <Link to="/blog/$slug" params={{ slug: lead.slug }} className="group block max-w-5xl">
            <p className="eyebrow text-signal">From {SITE.guidesName}</p>
            <h2 className="mt-4 display-l group-hover:text-graphite transition-colors">{lead.title}</h2>
            <p className="mt-6 lede text-graphite max-w-2xl">{lead.excerpt}</p>
            <span className="mt-8 more">Read the Guide</span>
          </Link>
        </section>
      )}

      <section className="wrap pt-16">
        <AffiliateNotice />
      </section>
    </div>
  )
}
