import { createFileRoute } from '@tanstack/react-router'
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
    <article className="max-w-2xl mx-auto px-5 py-20 space-y-6 text-muted leading-relaxed">
      <p className="eyebrow text-gold">Transparency</p>
      <h1 className="text-5xl text-ivory">Affiliate Disclosure</h1>
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
      <p>Every product on this site is intended for adults 18 and older.</p>
    </article>
  )
}
