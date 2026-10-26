import { Link, createFileRoute } from '@tanstack/react-router'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { MerchantBadge, MerchantPicksSection } from '@/components/MerchantPicks'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { MERCHANTS } from '@/content/merchants'
import { POSTS_BY_SLUG } from '@/content/posts'
import { SITE, absoluteUrl } from '@/config/site'
import { ALL_MERCHANT_PICKS } from '@/lib/merchant-picks'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

const M = MERCHANTS.luxurytoyx
const PATH = '/brands/luxury-toy-x'
const TITLE = 'Luxury Toy X: Product Guide, Features & Shopping Recommendations'
const DESCRIPTION =
  'A shopper’s guide to Luxury Toy X: what the retailer sells, who its products suit, its verified shipping and return terms, and the products we selected, with alternatives.'

const FAQS = [
  {
    q: 'Does Nightstand Supply sell Luxury Toy X products?',
    a: 'No. Luxury Toy X sells and ships its own products. We choose products to feature and link to the retailer, and we may earn a commission on qualifying purchases at no extra cost to you.',
  },
  {
    q: 'Does Luxury Toy X ship discreetly?',
    a: `According to the retailer's shipping policy (read ${M.verifiedAt}), orders always ship in plain packaging and labeling, and Luxury Toy X will not appear on bank or card statements. Shipping to the 48 contiguous states is free; other destinations see rates at checkout.`,
  },
  {
    q: 'What is the return policy?',
    a: `The retailer's refund policy (read ${M.verifiedAt}) allows returns within 30 days of the delivered date for unused, unopened items. A $15 return shipping charge and a 20% restocking fee apply, and intimate apparel such as thongs, teddies and bras is not returnable. Read the full policy before buying, because the retailer can change it.`,
  },
  {
    q: 'Are the prices on this page current?',
    a: 'They are the retailer’s list prices on the date shown on each card. Prices and stock change, so the retailer’s checkout always shows the final price.',
  },
  {
    q: 'Which of these products are quiet?',
    a: 'The retailer does not publish noise levels for the products we selected, so we do not claim any. If quiet operation matters most, start with our quiet vibrator picks and check each product page.',
  },
]

export const Route = createFileRoute('/brands/luxury-toy-x')({
  head: () =>
    pageHead({
      title: TITLE,
      description: DESCRIPTION,
      path: PATH,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Shop Our Picks', path: '/shop' },
          { name: 'Luxury Toy X', path: PATH },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: TITLE,
          description: DESCRIPTION,
          url: absoluteUrl(PATH),
          about: { '@type': 'Organization', name: M.name, url: M.website },
          publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
          dateModified: M.verifiedAt,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Products we selected from Luxury Toy X',
          itemListElement: ALL_MERCHANT_PICKS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title })),
        },
      ],
    }),
  component: LuxuryToyXPage,
})

const guideLink = (slug: string) => POSTS_BY_SLUG[slug]

function LuxuryToyXPage() {
  const alternatives = ['lovense-vs-we-vibe', 'sex-toys-for-beginners', 'best-lube-for-sex-toys']
    .map(guideLink)
    .filter(Boolean)
  return (
    <article>
      <header className="wrap pt-6 pb-10 sm:pb-14">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Shop Our Picks', path: '/shop' },
            { name: 'Luxury Toy X', path: PATH },
          ]}
        />
        <div className="mt-12 flex flex-wrap items-center gap-3 sm:mt-16">
          <p className="eyebrow text-graphite">Retailer Guide</p>
          <MerchantBadge merchant="luxurytoyx" />
        </div>
        <h1 className="mt-3 max-w-4xl font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem]">{TITLE}</h1>
        <p className="mt-6 lede max-w-2xl text-graphite">{M.editorialDescription}</p>
        <AffiliateNotice className="mt-5 max-w-2xl" />
      </header>

      <div className="wrap grid gap-16 sm:gap-24">
        <section aria-labelledby="categories-title" className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="categories-title" className="display-m">
              What It Sells
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-graphite leading-relaxed">
              Luxury Toy X organizes its catalog by product type. The main categories are:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {M.categories.map((c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-display text-xl font-semibold tracking-[-0.02em]">Who it may suit</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-graphite marker:text-mauve">
              <li>Shoppers who want to compare several brands in one store before choosing.</li>
              <li>Couples looking for products with remotes or app control (see the couples picks below).</li>
              <li>Beginners who prefer small, simple products and a store that publishes its shipping and return terms.</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="considerations-title" className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="considerations-title" className="display-m">
              Shipping &amp; Returns
            </h2>
            <p className="mt-3 text-sm text-graphite">
              Read from the retailer&rsquo;s own policy pages on {M.verifiedAt}. Policies can change, so check them before you
              buy.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            <div>
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">Shipping</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-graphite marker:text-mauve">
                {M.shipping.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">Returns</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-graphite marker:text-mauve">
                {M.returns.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-graphite sm:col-span-2">
              Sources:{' '}
              {M.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && ' · '}
                  <a href={s.url} rel="nofollow noopener" target="_blank" className="text-ink underline underline-offset-4">
                    {s.label}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </section>

        <div className="space-y-16">
          <div className="max-w-2xl">
            <h2 className="display-m">Products We Selected</h2>
            <p className="mt-3 text-graphite">
              A short, curated list rather than the whole catalog. Each pick says who it suits and why it is here. We have not
              hands-on tested these products; our notes come from the retailer&rsquo;s listings.
            </p>
          </div>
          <MerchantPicksSection intent="beginners" context="brand_ltx" headingLevel={3} />
          <MerchantPicksSection intent="couples" context="brand_ltx" headingLevel={3} />
          <MerchantPicksSection intent="premium" context="brand_ltx" headingLevel={3} />
          <MerchantPicksSection intent="care" context="brand_ltx" headingLevel={3} />
        </div>

        <section aria-labelledby="alternatives-title" className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="alternatives-title" className="display-m">
              Alternatives
            </h2>
            <p className="mt-3 text-graphite">Other ways to shop, from the retailers and brands we also cover.</p>
          </div>
          <ul className="border-t border-ink lg:col-span-8">
            <li className="border-b border-line">
              <Link to="/reviews" className="group block py-4">
                <span className="font-display text-lg font-semibold tracking-[-0.02em] group-hover:underline underline-offset-4">
                  Lovense toy reviews
                </span>
                <span className="mt-1 block text-sm text-graphite">App-controlled toys sold directly by Lovense.</span>
              </Link>
            </li>
            {alternatives.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block py-4">
                  <span className="font-display text-lg font-semibold tracking-[-0.02em] group-hover:underline underline-offset-4">
                    {p.title}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-sm text-graphite">{p.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq-title">
          <h2 id="faq-title" className="display-m">
            Shopping FAQ
          </h2>
          <dl className="mt-8 border-t border-line">
            {FAQS.map((f) => (
              <div key={f.q} className="border-b border-line py-6">
                <dt className="font-display text-xl font-semibold tracking-[-0.02em]">{f.q}</dt>
                <dd className="mt-2 max-w-3xl leading-relaxed text-graphite">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="max-w-3xl">
          <NewsletterSignup source="brand:luxury-toy-x" />
          <AffiliateNotice className="mt-8 border-t border-line pt-6" />
        </div>
      </div>
    </article>
  )
}
