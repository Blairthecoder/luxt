import { Link, createFileRoute } from '@tanstack/react-router'
import { ProductRail } from '@/components/ProductCard'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { HUBS } from '@/content/hubs'
import { POSTS } from '@/content/posts'
import { SITE } from '@/config/site'
import { getHomeData } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'
import { getOptimizedImageUrl } from '@/lib/image'
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
      <ProductRail products={products} />
      <Link to="/shop/$slug" params={{ slug }} className="more mt-8 sm:hidden">
        View All
      </Link>
    </section>
  )
}

function HomePage() {
  const { hubCounts, luxury, forHim, forHer, forCouples } = Route.useLoaderData()
  const hubs = HUBS.filter((hub) => (hubCounts[hub.slug] ?? 0) > 0)
  const [lead] = POSTS
  const hero = luxury[0]
  const tileProducts: Record<string, ProductSummary | undefined> = {
    'sex-toys-for-women': forHer[0],
    'sex-toys-for-men': forHim[0],
    'couples-sex-toys': forCouples[0],
  }

  return (
    <div>
      <section className="bg-mist overflow-hidden">
        <div className="wrap grid lg:grid-cols-12 gap-10 lg:gap-6 items-center min-h-[min(86vh,880px)] pt-16 pb-12 lg:py-20">
          <div className="lg:col-span-6 relative z-10">
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
          {hero && (
            <Link
              to="/products/$productId"
              params={{ productId: hero.handle }}
              className="group lg:col-span-6 block"
            >
              <div className="relative aspect-square">
                <img
                  src={getOptimizedImageUrl(hero.image, 1200)}
                  alt={`${hero.title} by ${hero.brand}`}
                  width={1200}
                  height={1200}
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-4 text-sm text-graphite">
                <span className="text-ink font-medium">{hero.title}</span> · {formatPrice(hero.price)}
              </p>
            </Link>
          )}
        </div>
      </section>

      <section id="shop-by-need" className="wrap pt-3 grid md:grid-cols-3 gap-3 scroll-mt-24">
        {NEEDS.map((need) => {
          const product = tileProducts[need.slug]
          return (
            <Link
              key={need.slug}
              to="/shop/$slug"
              params={{ slug: need.slug }}
              className="group relative block aspect-[4/5] bg-mist overflow-hidden"
            >
              {product && (
                <img
                  src={getOptimizedImageUrl(product.image, 900)}
                  alt=""
                  loading="lazy"
                  width={900}
                  height={1125}
                  className="absolute inset-0 w-full h-full object-contain p-[16%] pb-[30%] mix-blend-multiply transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h2 className="display-m">{need.label}</h2>
                <p className="mt-2 text-[0.9375rem] text-graphite max-w-xs leading-snug">{need.line}</p>
                <span className="mt-5 btn min-h-10 px-5 text-sm">Shop</span>
              </div>
            </Link>
          )
        })}
      </section>

      <Row title="Luxury Picks" kicker="The investment pieces" slug="luxury-sex-toys" products={luxury} />
      <Row title="Her Favorites" kicker="Chosen for her" slug="sex-toys-for-women" products={forHer} />
      <Row title="His Favorites" kicker="Chosen for him" slug="sex-toys-for-men" products={forHim} />

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

      <section className="wrap pt-24 sm:pt-36">
        <div className="grid md:grid-cols-3 gap-12 md:gap-10 border-t border-ink pt-10 reveal">
          {PROMISES.map(([title, body], i) => (
            <div key={title}>
              <span className="text-sm font-semibold text-graphite tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="mt-4 font-display text-[1.75rem] font-semibold tracking-[-0.03em] leading-tight">{title}</h2>
              <p className="mt-3 text-graphite leading-relaxed max-w-sm">{body}</p>
            </div>
          ))}
        </div>
        <AffiliateNotice className="pt-16" />
      </section>
    </div>
  )
}
