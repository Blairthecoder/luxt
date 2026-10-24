import { createFileRoute } from '@tanstack/react-router'
import { InfoPage } from '@/components/InfoPage'
import { SITE } from '@/config/site'
import { breadcrumbJsonLd, organizationJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/about')({
  head: () =>
    pageHead({
      title: `About ${SITE.shortName} | Adult Toy Buying Guides`,
      description: `${SITE.name} is an independent adult toy buying guide: original product copy, plain-language advice and honest affiliate links to our retail partners.`,
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
      intro="We help adults choose body-safe toys with confidence: friendly guides, clear comparisons and honest picks, without the awkwardness."
      sections={[
        {
          heading: 'What We Do',
          body: [
            `${SITE.name} is an independent buying guide for adult toys. We organize a large catalog into categories, collections and plain-language guides so readers can find the right product for their body, budget and comfort level.`,
            `Our editorial section, ${SITE.guidesName}, covers choosing, using and caring for toys, solo or with a partner. Product pages carry our own written summary, who the product suits and its trade-offs.`,
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
            'We do not sell anything ourselves. Buy buttons send readers to our retail partners (currently Lovense) through affiliate links, and we may earn a commission on qualifying purchases at no extra cost to the reader. Pages that link out carry a disclosure, and our full policy is on the affiliate disclosure page.',
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
