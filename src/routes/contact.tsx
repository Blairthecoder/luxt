import { createFileRoute } from '@tanstack/react-router'
import { InfoPage } from '@/components/InfoPage'
import { SITE } from '@/config/site'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/contact')({
  head: () =>
    pageHead({
      title: `Contact | ${SITE.shortName}`,
      description: `Contact ${SITE.name} about a lingerie order, sizing, returns, corrections, press, or partnership and affiliate inquiries.`,
      path: '/contact',
    }),
  component: () => (
    <InfoPage
      eyebrow="Contact"
      title="Contact Us"
      intro="Order help, sizing questions, corrections, press or partnerships: we read everything and reply within two business days."
      sections={[
        {
          heading: 'Lingerie Orders',
          body: [
            `Lingerie is sold by ${SITE.name} through our Shopify checkout, so write to us about those orders. Include your order number and we will help with tracking, address changes, sizing, returns and refunds.`,
            'Before you write, our Shipping, Returns and Size Guide pages answer the most common questions.',
          ],
        },
        {
          heading: 'Toys and Other Retailers',
          body: [
            'Toys and other products in our reviews are sold by independent retailers such as Lovense. Payment, shipping, returns and warranty for those orders are handled by the retailer, so please contact them directly. We are happy to help if you have a question about one of our reviews.',
          ],
        },
        {
          heading: 'Everything Else',
          bullets: [
            'Corrections to a guide or product page.',
            'Brand, affiliate program or network partnership inquiries.',
            'Questions about how we make money or choose products.',
            'Privacy requests, such as asking what we hold about you or to delete it.',
          ],
        },
      ]}
    />
  ),
})
