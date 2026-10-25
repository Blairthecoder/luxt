import { Link, createFileRoute } from '@tanstack/react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { FaqAccordion } from '@/components/FaqAccordion'
import { ProductGrid } from '@/components/ProductCard'
import { SITE } from '@/config/site'
import { getDealsData } from '@/lib/catalog'
import { breadcrumbJsonLd, faqJsonLd, pageHead } from '@/lib/seo'

const FAQS = [
  {
    q: 'Are these Black Friday prices real?',
    a: 'Every price on this page comes from the live product listing. A struck-through price only appears when the seller has marked the product below its usual price, and we never type sale prices into this page.',
  },
  {
    q: 'Why do the lingerie bundles ship in one parcel?',
    a: 'Each bundle pairs two pieces from the same maker, so they are packed and shipped together. That also keeps returns simple: one parcel, one process.',
  },
  {
    q: 'Where do I buy the Lovense toys?',
    a: 'Check Price takes you to the product on Lovense.com, where you order and pay. Any sale Lovense runs shows there, and we may earn a commission at no cost to you.',
  },
  {
    q: 'When should I order holiday gifts?',
    a: 'Earlier than you think. Parcels slow down from late November, so order gifts by early December and check the shipping estimate at checkout.',
  },
]

export const Route = createFileRoute('/deals')({
  loader: () => getDealsData(),
  head: () =>
    pageHead({
      title: `Black Friday Lingerie & Lovense Deals | ${SITE.shortName}`,
      description:
        'Black Friday lingerie gift bundles shipped in one parcel, lingerie markdowns and Lovense sale prices, all at live prices. No made-up discounts.',
      path: '/deals',
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Gifts', path: '/gifts' },
          { name: 'Deals', path: '/deals' },
        ]),
        faqJsonLd(FAQS),
      ],
    }),
  component: DealsPage,
})

function DealsPage() {
  const { lingerieBundles, lingerieSale, lovenseSale, lovenseBundles, lovenseWatch } = Route.useLoaderData()
  const lovenseToys = lovenseSale.length > 0 ? lovenseSale : lovenseWatch

  return (
    <div>
      <header className="wrap pt-6 pb-12 sm:pb-16">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Gifts', path: '/gifts' },
            { name: 'Deals', path: '/deals' },
          ]}
        />
        <div className="mt-14 sm:mt-20 max-w-5xl">
          <p className="eyebrow text-signal rise">Black Friday & Holiday</p>
          <h1 className="mt-3 display-l rise">Black Friday Lingerie and Lovense Deals</h1>
          <p className="mt-8 lede text-graphite max-w-2xl rise-delay">
            Lingerie bundles from our own shop and Lovense toys at their live prices. If something is marked down, you
            see the usual price struck through beside it. If it is not, we do not pretend it is.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {lingerieBundles.length > 0 && (
              <li>
                <a href="#lingerie-bundles" className="chip">
                  Lingerie Bundles
                </a>
              </li>
            )}
            {lingerieSale.length > 0 && (
              <li>
                <a href="#lingerie-deals" className="chip">
                  Lingerie Deals
                </a>
              </li>
            )}
            <li>
              <a href="#lovense-deals" className="chip">
                Lovense Deals
              </a>
            </li>
          </ul>
        </div>
      </header>

      {lingerieBundles.length > 0 && (
        <section id="lingerie-bundles" className="wrap pt-6 reveal scroll-mt-24">
          <div className="section-head">
            <div>
              <h2 className="display-m">
                Lingerie Gift Bundles. <span className="text-graphite">Two pieces, one parcel.</span>
              </h2>
              <p className="mt-2 text-graphite max-w-2xl">
                Each bundle pairs two wire-free pieces from the same maker, so they ship together. You choose the size for
                each piece separately.
              </p>
            </div>
            <Link to="/shop/$slug" params={{ slug: 'lingerie-gift-bundles' }} className="more hidden sm:inline-flex">
              All Bundles
            </Link>
          </div>
          <ProductGrid products={lingerieBundles} context="deals_card" />
        </section>
      )}

      {lingerieSale.length > 0 && (
        <section id="lingerie-deals" className="wrap pt-14 sm:pt-24 reveal scroll-mt-24">
          <div className="section-head">
            <div>
              <h2 className="display-m">
                Lingerie Deals. <span className="text-graphite">Marked down in our shop.</span>
              </h2>
              <p className="mt-2 text-graphite max-w-2xl">Shown at the current price, deepest markdown first.</p>
            </div>
            <Link to="/category/$slug" params={{ slug: 'lingerie' }} className="more hidden sm:inline-flex">
              All Lingerie
            </Link>
          </div>
          <ProductGrid products={lingerieSale} context="deals_card" />
          <p className="mt-6 text-sm text-graphite">
            Buying for someone else?{' '}
            <Link to="/shop/$slug" params={{ slug: 'lingerie-gifts-for-her' }} className="text-ink underline underline-offset-4">
              Lingerie gifts for her
            </Link>{' '}
            and{' '}
            <Link to="/blog/$slug" params={{ slug: 'how-to-feel-confident-in-lingerie' }} className="text-ink underline underline-offset-4">
              how to feel confident in lingerie
            </Link>
            .
          </p>
        </section>
      )}

      <section id="lovense-deals" className="wrap pt-14 sm:pt-24 reveal scroll-mt-24">
        <div className="rounded-3xl bg-blush p-7 sm:p-12">
          <p className="eyebrow text-graphite">Lovense</p>
          <h2 className="mt-3 display-m">{lovenseSale.length > 0 ? 'Lovense Toys on Sale Now' : 'Lovense Toys to Watch This Sale'}</h2>
          <p className="mt-4 text-graphite leading-relaxed max-w-2xl">
            {lovenseSale.length > 0
              ? 'These Lovense toys are currently marked below their usual price. Check Price opens the product on Lovense.com, where the final price shows at checkout.'
              : 'Nothing from Lovense is marked down in our latest price check. These are the toys where a sale saves the most, shown at today’s price. Check Price opens Lovense.com, where any current sale price shows.'}
          </p>
        </div>
        {lovenseToys.length > 0 && (
          <div className="mt-8">
            <ProductGrid products={lovenseToys} context="deals_card" />
          </div>
        )}
      </section>

      {lovenseBundles.length > 0 && (
        <section className="wrap pt-14 sm:pt-24 reveal">
          <div className="section-head">
            <div>
              <h2 className="display-m">
                Lovense Bundles. <span className="text-graphite">Two toys, one gift.</span>
              </h2>
            </div>
            <Link to="/shop/$slug" params={{ slug: 'lovense-bundles' }} className="more hidden sm:inline-flex">
              View All
            </Link>
          </div>
          <ProductGrid products={lovenseBundles} context="deals_card" />
        </section>
      )}

      <section className="wrap pt-14 sm:pt-24 grid lg:grid-cols-12 gap-10 reveal">
        <div className="lg:col-span-4">
          <h2 className="display-m">Shop the Sales Well</h2>
          <p className="mt-4 text-graphite leading-relaxed">
            How to tell a genuine markdown, what is worth buying on sale and how to time holiday gifts.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/blog/$slug" params={{ slug: 'black-friday-sex-toy-deals' }} className="btn">
              Read the Deals Guide
            </Link>
            <Link to="/gifts" className="btn-ghost">
              Gift Shop
            </Link>
          </div>
        </div>
        <div className="lg:col-span-8">
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      <AffiliateNotice className="wrap pt-16" />
    </div>
  )
}
