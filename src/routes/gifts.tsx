import { Link, createFileRoute } from '@tanstack/react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { ProductGrid } from '@/components/ProductCard'
import { POSTS_BY_SLUG } from '@/content/posts'
import { COLLECTIONS_BY_SLUG } from '@/content/collections'
import { SITE } from '@/config/site'
import { getGiftData } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

const BY_RECIPIENT = [
  { label: 'For Her', guide: 'sex-toy-gifts-for-her' },
  { label: 'For Him', guide: 'sex-toy-gifts-for-him' },
  { label: 'For Couples', guide: 'best-couples-sex-toys' },
  { label: 'For an Anniversary', guide: 'anniversary-sex-toy-gifts' },
] as const

const BY_BUDGET = ['stocking-stuffers', 'sex-toys-under-50', 'sex-toys-under-100', 'luxury-sex-toys'] as const

export const Route = createFileRoute('/gifts')({
  loader: () => getGiftData(),
  head: () =>
    pageHead({
      title: `Sex Toy Gift Ideas for Her, Him & Couples | ${SITE.shortName}`,
      description:
        'Adult gift ideas that help someone feel cared for, sorted by who it is for and what you want to spend: gift guides, gift sets and stocking stuffers.',
      path: '/gifts',
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Gifts', path: '/gifts' },
        ]),
      ],
    }),
  component: GiftsPage,
})

function GiftsPage() {
  const { giftSets, fromPrices } = Route.useLoaderData()

  return (
    <div>
      <header className="wrap pt-6 pb-16 sm:pb-24">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Gifts', path: '/gifts' },
          ]}
        />
        <div className="mt-14 sm:mt-20 max-w-5xl">
          <p className="eyebrow text-signal rise">The Gift Shop</p>
          <h1 className="mt-3 display-l rise">Gifts Worth Unwrapping in Private</h1>
          <p className="mt-8 lede text-graphite max-w-2xl rise-delay">
            A thoughtful toy says you care about how someone feels. Start with who it is for or what you want to
            spend, and every guide gives you a gentle first pick and a bolder one.
          </p>
        </div>
      </header>

      <section className="wrap">
        <h2 className="display-m mb-8">
          Shop by Recipient. <span className="text-graphite">Pick who it is for.</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BY_RECIPIENT.map(({ label, guide }) => {
            const post = POSTS_BY_SLUG[guide]
            return (
              <Link
                key={guide}
                to="/blog/$slug"
                params={{ slug: guide }}
                className="group bg-mist p-8 flex flex-col justify-between min-h-[20rem] reveal"
              >
                <div>
                  <h3 className="font-display text-[2rem] font-bold tracking-[-0.04em] leading-none">{label}</h3>
                  <p className="mt-4 text-[0.9375rem] text-graphite leading-relaxed">{post?.excerpt}</p>
                </div>
                <span className="mt-8 more">Read the Guide</span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mt-28 sm:mt-36 bg-night text-canvas">
        <div className="wrap py-24 sm:py-32 grid lg:grid-cols-12 gap-12">
          <h2 className="lg:col-span-4 display-l reveal">
            Shop by{' '}
            <br />
            Budget.
          </h2>
          <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-x-12 border-t border-night-line reveal">
            {BY_BUDGET.map((slug) => {
              const c = COLLECTIONS_BY_SLUG[slug]
              const from = fromPrices[slug]
              return (
                <li key={slug} className="border-b border-night-line">
                  <Link to="/shop/$slug" params={{ slug }} className="group flex items-baseline justify-between gap-4 py-6">
                    <span className="font-display text-2xl sm:text-[1.75rem] font-semibold tracking-[-0.03em] text-canvas/85 group-hover:text-canvas transition-colors">
                      {c.name}
                    </span>
                    {from !== undefined && (
                      <span className="text-xs text-[#86868b] whitespace-nowrap">From {formatPrice(from)}</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {giftSets.length > 0 && (
        <section className="wrap pt-24 sm:pt-32 reveal">
          <div className="flex items-end justify-between gap-6 mb-8 sm:mb-10">
            <h2 className="display-m">
              Gift Sets & Kits. <span className="text-graphite">Ready to give.</span>
            </h2>
            <Link to="/shop/$slug" params={{ slug: 'sex-toy-gift-sets' }} className="more">
              View All
            </Link>
          </div>
          <ProductGrid products={giftSets} context="gift_card" />
        </section>
      )}

      <section className="wrap pt-24 sm:pt-32 reveal">
        <h2 className="display-m">
          Gifts for the Relationship. <span className="text-graphite">For two.</span>
        </h2>
        <ul className="mt-8 flex flex-wrap gap-2">
          {['couples-sex-toys', 'remote-control-vibrators', 'bondage-kits', 'sex-swings'].map((slug) => (
            <li key={slug}>
              <Link to="/shop/$slug" params={{ slug }} className="btn-ghost">
                {COLLECTIONS_BY_SLUG[slug].name}
              </Link>
            </li>
          ))}
        </ul>
        <AffiliateNotice className="pt-16" />
      </section>
    </div>
  )
}
