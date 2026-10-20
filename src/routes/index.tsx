import { Link, createFileRoute } from '@tanstack/react-router'
import { ProductCard } from '@/components/ProductCard'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { HUBS } from '@/content/hubs'
import { COLLECTIONS_BY_SLUG } from '@/content/collections'
import { POSTS } from '@/content/posts'
import { SITE } from '@/config/site'
import { getHomeData } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'
import { getOptimizedImageUrl } from '@/lib/image'
import type { ProductSummary } from '@/lib/listing'
import { organizationJsonLd, pageHead } from '@/lib/seo'
import { absoluteUrl } from '@/config/site'

function itemList(name: string, products: ProductSummary[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/products/${p.handle}`),
      name: p.title,
    })),
  }
}

/** Shown first in Shop by Category; the rest follow as a quieter line of links. */
const FEATURED_HUBS = ['vibrators', 'couples', 'lubricants', 'strokers', 'penis-rings', 'prostate-massagers', 'lingerie', 'anal-toys']

export const Route = createFileRoute('/')({
  loader: () => getHomeData(),
  head: ({ loaderData }) => {
    const from = loaderData?.firstPicks.length ? Math.min(...loaderData.firstPicks.map((p) => p.price)) : null
    return pageHead({
      title: `${SITE.name} | Luxury Adult Toys, Honestly Explained`,
      description: from
        ? `Luxury vibrators, couples toys and more from ${formatPrice(from)}. Compare LELO, Womanizer and We-Vibe with plain-English guides and real specs. Ships discreetly.`
        : SITE.description,
      path: '/',
      jsonLd: [
        organizationJsonLd(),
        { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url },
        ...(loaderData
          ? [
              itemList('Easy First Picks', loaderData.firstPicks),
              itemList('For Her', loaderData.forHer),
              itemList('For Him', loaderData.forHim),
              itemList('For Couples', loaderData.forCouples),
            ].filter((l) => l.itemListElement.length > 0)
          : []),
      ],
    })
  },
  component: HomePage,
})

const AUDIENCES = [
  {
    key: 'forHer',
    slug: 'sex-toys-for-women',
    label: 'For Her',
    line: 'Vibrators, wands and air-pulse toys chosen for real pleasure. Start small and quiet, or go straight to the cult favorites.',
    links: ['clitoral-vibrators', 'wand-vibrators', 'rabbit-vibrators', 'bullet-vibrators'],
  },
  {
    key: 'forHim',
    slug: 'sex-toys-for-men',
    label: 'For Him',
    line: 'Strokers, rings and prostate toys, from first-time to expert. Most of the best ones cost less than a nice dinner.',
    links: ['automatic-strokers', 'prostate-vibrators', 'vibrating-cock-rings', 'tenga'],
  },
  {
    key: 'forCouples',
    slug: 'couples-sex-toys',
    label: 'For Couples',
    line: 'Wearables and app-controlled toys made to be shared, in the same room or across the country.',
    links: ['app-controlled-sex-toys', 'remote-control-vibrators', 'we-vibe', 'lovense'],
  },
] as const

const PROMISES = [
  ['Straight Answers', 'Plain-English guidance on sizing, materials and where to start. No judgment.'],
  ['Real Comparisons', 'Specs, prices and options side by side, so you can choose with confidence.'],
  ['Discreet Delivery', 'Every order ships in plain packaging from our trusted retail partner.'],
] as const

function ProductRow({ products, cols = 3 }: { products: ProductSummary[]; cols?: 3 | 4 }) {
  return (
    <div className={`rail ${cols === 3 ? 'lg:!grid-cols-3' : ''}`}>
      {products.map((product) => (
        <ProductCard key={product.handle} product={product} size="small" context="home_card" />
      ))}
    </div>
  )
}

function HomePage() {
  const data = Route.useLoaderData()
  const { hubCounts, firstPicks, splurge } = data
  const hubs = HUBS.filter((hub) => (hubCounts[hub.slug] ?? 0) > 0)
  const featuredHubs = FEATURED_HUBS.map((slug) => hubs.find((h) => h.slug === slug)).filter((h) => h !== undefined)
  const otherHubs = hubs.filter((h) => !FEATURED_HUBS.includes(h.slug))
  const [lead] = POSTS

  return (
    <div>
      <section className="bg-stone">
        <div className="wrap pt-20 sm:pt-32 pb-12">
          <p className="eyebrow text-graphite rise">Curated Pleasure. Est. 2026.</p>
          <h1 className="mt-5 display-xl rise">
            Luxury Adult Toys,{' '}
            <br />
            Explained.
          </h1>
          <div className="mt-12 grid lg:grid-cols-12 gap-10 items-end rise-delay">
            <p className="lg:col-span-5 lede text-graphite">
              The world's best adult toys, chosen with care and explained without the blush. Compare honestly, then
              buy discreetly.{' '}
              <Link to="/shop/$slug" params={{ slug: 'sex-toys-under-50' }} className="text-ink underline underline-offset-4">
                Most first picks are under $50.
              </Link>
            </p>
            <p className="lg:col-span-6 lg:col-start-7 font-display text-[1.625rem] sm:text-[2.125rem] font-semibold tracking-[-0.03em] leading-[1.2]">
              Shop{' '}
              <a href="#for-her" className="underline decoration-1 underline-offset-[6px] hover:text-graphite">
                for her
              </a>
              ,{' '}
              <a href="#for-him" className="underline decoration-1 underline-offset-[6px] hover:text-graphite">
                for him
              </a>{' '}
              or{' '}
              <a href="#for-couples" className="underline decoration-1 underline-offset-[6px] hover:text-graphite">
                for the two of you
              </a>
              .
            </p>
          </div>
          <ul className="mt-20 sm:mt-28 grid sm:grid-cols-3 gap-x-10 border-t border-ink/15">
            {PROMISES.map(([title, body]) => (
              <li key={title} className="pt-5 pb-2">
                <p className="text-sm font-semibold tracking-[-0.01em]">{title}</p>
                <p className="mt-1 text-sm text-graphite leading-relaxed max-w-xs">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {firstPicks.length > 0 && (
        <section className="wrap pt-24 sm:pt-32 reveal">
          <div className="grid lg:grid-cols-12 gap-6 items-end mb-10">
            <h2 className="lg:col-span-7 display-m">Easy First Picks</h2>
            <p className="lg:col-span-4 lg:col-start-9 text-graphite leading-relaxed">
              Well made, easy to use and under $50. The ones we point friends to first.{' '}
              <Link to="/shop/$slug" params={{ slug: 'sex-toys-under-50' }} className="text-ink underline underline-offset-4">
                Shop under $50
              </Link>
            </p>
          </div>
          <ProductRow products={firstPicks} cols={4} />
        </section>
      )}

      {AUDIENCES.map((a, i) => {
        const products = data[a.key]
        const flip = i % 2 === 1
        return (
          <section
            key={a.slug}
            id={a.key === 'forHer' ? 'for-her' : a.key === 'forHim' ? 'for-him' : 'for-couples'}
            className={`scroll-mt-24 ${flip ? 'bg-stone mt-24 sm:mt-32 py-20 sm:py-28' : 'pt-24 sm:pt-32'}`}
          >
            <div className="wrap grid lg:grid-cols-12 gap-10 lg:gap-14 reveal">
              <div className={`lg:col-span-4 ${flip ? 'lg:order-2 lg:col-start-9' : ''}`}>
                <h2 className="display-l">{a.label}</h2>
                <p className="mt-5 text-[1.0625rem] text-graphite leading-relaxed max-w-sm">{a.line}</p>
                <ul className="mt-8 border-t border-ink/15 max-w-sm">
                  {a.links.map((slug) => (
                    <li key={slug} className="border-b border-ink/15">
                      <Link
                        to="/shop/$slug"
                        params={{ slug }}
                        className="group flex items-center justify-between py-3 text-[0.9375rem] font-medium"
                      >
                        {COLLECTIONS_BY_SLUG[slug]?.name}
                        <span aria-hidden="true" className="text-graphite transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to="/shop/$slug" params={{ slug: a.slug }} className="mt-8 more">
                  Shop All {a.label}
                </Link>
              </div>
              <div className={`lg:col-span-8 ${flip ? 'lg:order-1 [&_.bg-stone]:bg-canvas' : ''}`}>
                {products.length > 0 && <ProductRow products={products} />}
              </div>
            </div>
          </section>
        )
      })}

      {splurge.length > 0 && (
        <section className="wrap pt-24 sm:pt-36 grid lg:grid-cols-12 gap-10 reveal">
          <div className="lg:col-span-4">
            <h2 className="display-m">Worth the Splurge</h2>
            <p className="mt-4 text-graphite leading-relaxed max-w-xs">
              Stronger, quieter motors and better materials. Three we think earn the price.
            </p>
            <Link to="/shop/$slug" params={{ slug: 'luxury-sex-toys' }} className="mt-6 more">
              Shop Luxury
            </Link>
          </div>
          <ul className="lg:col-span-8 border-t border-ink">
            {splurge.map((p) => (
              <li key={p.handle} className="border-b border-line">
                <Link
                  to="/products/$productId"
                  params={{ productId: p.handle }}
                  className="group grid grid-cols-[4.5rem_1fr_auto] sm:grid-cols-[6rem_1fr_auto] items-center gap-5 py-4"
                >
                  <span className="relative block aspect-square bg-stone overflow-hidden">
                    <img
                      src={getOptimizedImageUrl(p.image, 240)}
                      alt={`${p.title} by ${p.brand}`}
                      loading="lazy"
                      width={240}
                      height={240}
                      className="absolute inset-0 w-full h-full object-contain p-[14%] mix-blend-multiply saturate-[0.85]"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg sm:text-xl font-semibold tracking-[-0.02em] leading-snug group-hover:underline underline-offset-4 decoration-1">
                      {p.title}
                    </span>
                    <span className="block mt-0.5 text-sm text-graphite">
                      {p.brand}
                      {p.why && <span className="hidden sm:inline"> · {p.why}</span>}
                    </span>
                  </span>
                  <span className="text-[0.9375rem] font-medium tabular-nums">{formatPrice(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

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
            {featuredHubs.map((hub) => (
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
            {otherHubs.length > 0 && (
              <li className="sm:col-span-2 pt-6 text-sm text-[#86868b] leading-relaxed">
                Also browse{' '}
                {otherHubs.map((hub, i) => (
                  <span key={hub.slug}>
                    {i > 0 && (i === otherHubs.length - 1 ? ' and ' : ', ')}
                    <Link to="/category/$slug" params={{ slug: hub.slug }} className="text-canvas/70 hover:text-canvas underline underline-offset-4 decoration-night-line">
                      {hub.name}
                    </Link>
                  </span>
                ))}
                .
              </li>
            )}
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
