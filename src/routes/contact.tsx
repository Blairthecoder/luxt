import { createFileRoute } from '@tanstack/react-router'
import { InfoPage } from '@/components/InfoPage'
import { SITE } from '@/config/site'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/contact')({
  head: () =>
    pageHead({
      title: `Contact | ${SITE.shortName}`,
      description: `Contact ${SITE.name} about corrections, reader questions, press, or partnership and affiliate inquiries.`,
      path: '/contact',
    }),
  component: () => (
    <InfoPage
      eyebrow="Contact"
      title="Contact Us"
      intro="Reader questions, corrections, press or partnerships: we read everything."
      sections={[
        {
          heading: 'What to Write Us About',
          bullets: [
            'Corrections to a guide or product page.',
            'Brand, affiliate program or network partnership inquiries.',
            'Questions about how we make money or choose products.',
            'Privacy requests, such as asking what we hold about you.',
          ],
        },
        {
          heading: 'Orders and Shipping',
          body: [
            'Lingerie is sold and shipped by Nightstand Supply Shop through Shopify checkout, so write to us about those orders. For everything else, payment, shipping, returns and customer service are handled by the retailer you buy from, so please contact them directly.',
          ],
        },
      ]}
    />
  ),
})
