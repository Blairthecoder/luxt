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
        'Adult gift ideas sorted by who you are buying for and what you want to spend: gift guides, gift sets, stocking stuffers and luxury picks with current prices.',
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
    <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
      <header className="pt-10 pb-14 border-b border-line">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Gifts', path: '/gifts' },
          ]}
        />
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="eyebrow text-gold">The Gift Shop</p>
          <h1 className="mt-4 text-5xl sm:text-6xl text-ivory leading-[1.05]">Gifts Worth Unwrapping in Private</h1>
          <p className="mt-6 text-muted leading-relaxed">
            Start with who you are buying for, or with what you want to spend. Every guide gives you a safe bet and a
            bolder pick, with current prices.
          </p>
        </div>
      </header>

      <section className="py-14">
        <p className="eyebrow text-gold text-center">Shop by Recipient</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border-y border-line">
          {BY_RECIPIENT.map(({ label, guide }) => {
            const post = POSTS_BY_SLUG[guide]
            return (
              <Link key={guide} to="/blog/$slug" params={{ slug: guide }} className="group bg-ink px-8 py-12">
                <h2 className="text-4xl text-ivory group-hover:text-gold transition-colors">{label}</h2>
                <p className="mt-4 text-sm text-muted leading-relaxed">{post?.excerpt}</p>
                <span className="mt-6 inline-block eyebrow text-gold-deep group-hover:text-gold">Read the Guide</span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="py-14 border-t border-line">
        <p className="eyebrow text-gold text-center">Shop by Budget</p>
        <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-12 border-t border-line">
          {BY_BUDGET.map((slug) => {
            const c = COLLECTIONS_BY_SLUG[slug]
            const from = fromPrices[slug]
            return (
              <li key={slug} className="border-b border-line">
                <Link to="/shop/$slug" params={{ slug }} className="group flex items-baseline justify-between py-5">
                  <span className="font-display text-2xl text-ivory group-hover:text-gold transition-colors">
                    {c.name}
                  </span>
                  {from !== undefined && <span className="text-xs text-faint">From {formatPrice(from)}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {giftSets.length > 0 && (
        <section className="py-14 border-t border-line">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow text-gold">Ready to Give</p>
              <h2 className="mt-3 text-4xl text-ivory">Gift Sets & Kits</h2>
            </div>
            <Link
              to="/shop/$slug"
              params={{ slug: 'sex-toy-gift-sets' }}
              className="eyebrow text-muted hover:text-gold whitespace-nowrap"
            >
              View All
            </Link>
          </div>
          <ProductGrid products={giftSets} />
        </section>
      )}

      <section className="py-14 border-t border-line text-center">
        <p className="eyebrow text-gold">For Two</p>
        <h2 className="mt-3 text-4xl text-ivory">Gifts for the Relationship</h2>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {['couples-sex-toys', 'remote-control-vibrators', 'bondage-kits', 'sex-swings'].map((slug) => (
            <li key={slug}>
              <Link to="/shop/$slug" params={{ slug }} className="btn-line">
                {COLLECTIONS_BY_SLUG[slug].name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <AffiliateNotice className="text-center pt-6" />
    </div>
  )
}
