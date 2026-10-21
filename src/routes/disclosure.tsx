import { Link, createFileRoute } from '@tanstack/react-router'
import { SITE } from '@/config/site'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/disclosure')({
  head: () =>
    pageHead({
      title: `Affiliate Disclosure | ${SITE.shortName}`,
      description: `How ${SITE.name} makes money, and how we choose the products we feature.`,
      path: '/disclosure',
    }),
  component: DisclosurePage,
})

function DisclosurePage() {
  return (
    <article className="wrap py-20 sm:py-32">
      <div className="max-w-3xl space-y-6 text-[1.0625rem] text-[#3a3a3c] leading-relaxed">
        <p className="eyebrow text-graphite">Transparency</p>
        <h1 className="display-l text-ink !mt-3 pb-6">Affiliate Disclosure</h1>
        <p>
          {SITE.name} is reader-supported. When you click a buy button and make a purchase, we may earn a
          commission from the retailer. The price you pay is the same as going to the retailer directly.
        </p>
        <p>
          We do not sell products ourselves. Orders are placed on our retail partner's website, and they handle
          payment, shipping, returns and customer service.
        </p>
        <p>
          Commissions never decide what we recommend. Our guides and buying tips are written to help you choose
          the right product for you, including when that means a cheaper option.
        </p>
        <p>
          In line with the FTC's endorsement guidance, buy links are marked as sponsored, and we place a short
          disclosure near them. We only call a product a best seller, or show a sale price, when the retailer's own
          data says so.
        </p>
        <p>
          Read how we choose and write about products in our{' '}
          <Link to="/editorial-policy" className="text-ink underline underline-offset-2">
            editorial policy
          </Link>
          .
        </p>
        <p>Every product on this site is intended for adults 18 and older.</p>
      </div>
    </article>
  )
}
