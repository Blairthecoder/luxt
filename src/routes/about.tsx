import { createFileRoute } from '@tanstack/react-router'
import { InfoPage } from '@/components/InfoPage'
import { SITE } from '@/config/site'
import { breadcrumbJsonLd, organizationJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/about')({
  head: () =>
    pageHead({
      title: `About ${SITE.shortName}: Our Mission and Standards`,
      description: `${SITE.name} is an independent affiliate publisher for intimacy, body confidence and sexual wellness education, with clearly disclosed affiliate links and a published editorial policy.`,
      path: '/about',
      jsonLd: [
        organizationJsonLd(),
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]),
      ],
    }),
  component: () => (
    <InfoPage
      eyebrow="About"
      title={`About ${SITE.name}`}
      intro={SITE.tagline + ' We help women and couples feel more comfortable, connected and confident through practical guidance and thoughtfully chosen products.'}
      sections={[
        {
          heading: 'What We Do',
          body: [
            `${SITE.name} is an independent affiliate publisher. We publish education on intimacy, body confidence and sexual wellness, plus buying guides, comparisons and product reviews, so readers can find the right guidance and the right products for their body, budget and comfort level.`,
            `Our editorial section, ${SITE.guidesName}, covers confidence, relationships, and choosing, using and caring for products, solo or with a partner. Our editorial policy explains how we research and how we separate education, research-based guides and reviews.`,
          ],
        },
        {
          heading: 'Who We Write For',
          body: [
            'Adults 18 and older who are shopping for themselves, a partner or a gift. Many are first-time buyers who want reassurance and a clear starting point, so we favor beginner-friendly explanations, discreet-shipping advice and realistic expectations over hype.',
          ],
        },
        {
          heading: 'How We Make Money',
          body: [
            'Lingerie is sold by us through our own Shopify store. Everything else is sold by retail partners (currently Lovense): Check Price buttons send readers to them through affiliate links, and we may earn a commission on qualifying purchases at no extra cost to the reader. Pages that link out carry a disclosure, and our full policy is on the affiliate disclosure page.',
          ],
        },
        {
          heading: 'How We Keep Things Responsible',
          bullets: [
            'An 18+ confirmation appears before the site loads for each new visitor.',
            'Outbound buy links are marked sponsored and nofollow, and the redirect is blocked from search indexes.',
            'We never copy merchant descriptions. Product copy is written by us.',
            'We only call something a best seller or a sale when the retailer’s own data says so.',
            'We do not collect accounts, orders or payment details, and we publish a privacy policy and terms of use.',
          ],
        },
        {
          heading: 'Work With Us',
          body: [
            'Brands, affiliate managers and networks reviewing this site can find a factual overview and our promotional methods on the partners page.',
          ],
        },
      ]}
    />
  ),
})
