import { createFileRoute } from '@tanstack/react-router'
import { InfoPage } from '@/components/InfoPage'
import { SITE } from '@/config/site'
import { breadcrumbJsonLd, organizationJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/about')({
  head: () =>
    pageHead({
      title: `About ${SITE.shortName} | Independent Sex Toy Reviews`,
      description: `${SITE.name} is an independent sex toy review site: original reviews, buying guides and comparisons, with clearly disclosed affiliate links.`,
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
      intro="We help adults choose body-safe toys with confidence: independent reviews, friendly guides and clear comparisons, without the awkwardness."
      sections={[
        {
          heading: 'What We Do',
          body: [
            `${SITE.name} is an independent review site for adult toys. We publish product reviews, best-of buying guides, head-to-head comparisons and plain-language how-tos so readers can find the right toy for their body, budget and comfort level.`,
            `Our editorial section, ${SITE.guidesName}, covers choosing, using and caring for toys, solo or with a partner. Every review carries our own written verdict, who the product suits and its trade-offs. Our editorial policy explains how we review.`,
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
            'We do not sell anything ourselves. Check Price buttons send readers to our retail partners (currently Lovense) through affiliate links, and we may earn a commission on qualifying purchases at no extra cost to the reader. Pages that link out carry a disclosure, and our full policy is on the affiliate disclosure page.',
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
