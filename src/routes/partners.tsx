import { createFileRoute } from '@tanstack/react-router'
import { InfoPage } from '@/components/InfoPage'
import { SITE } from '@/config/site'
import { getSiteStats } from '@/lib/catalog'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/partners')({
  head: () =>
    pageHead({
      title: `Partners & Affiliate Programs | ${SITE.shortName}`,
      description: `A factual overview of ${SITE.name} for affiliate managers and brands: audience, content, promotional methods, tracking and compliance.`,
      path: '/partners',
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Partners', path: '/partners' },
        ]),
      ],
    }),
  loader: () => getSiteStats(),
  component: PartnersPage,
})

function PartnersPage() {
  const stats = Route.useLoaderData()
  const items = [
    { value: stats.products, label: 'Products featured' },
    { value: stats.brands, label: 'Brands' },
    { value: stats.categories, label: 'Category hubs' },
    { value: stats.collections, label: 'Search-led collections' },
    { value: stats.guides, label: 'Original guides' },
  ]
  return (
    <InfoPage
      eyebrow="For Partners"
      title="Partner With Nightstand Supply"
      intro="A content-led adult toy publisher built for qualified, high-intent shoppers. This page is written for affiliate managers, networks and brands reviewing our application."
      top={
        <dl className="grid grid-cols-2 sm:grid-cols-5 gap-3 !mt-8">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col rounded-2xl bg-mist p-4">
              <dt className="order-2 mt-1 text-xs text-graphite">{item.label}</dt>
              <dd className="order-1 font-display text-3xl font-semibold tracking-[-0.02em] text-ink">
                {item.value.toLocaleString('en-US')}
              </dd>
            </div>
          ))}
        </dl>
      }
      sections={[
        {
          heading: 'Site Overview',
          body: [
            `${SITE.name} (${SITE.url.replace('https://', '')}) is an independent buying guide for adult toys. Readers browse category hubs and collections, read our guides, then click a buy button to complete the purchase on the merchant’s own site. There is no cart or checkout here.`,
            'The counts above are calculated live from the product catalog and our content files each time this page loads.',
          ],
        },
        {
          heading: 'Audience',
          body: [
            'Adults 18 and over researching a purchase: first-time buyers, couples, gift shoppers and experienced buyers comparing brands. Our content is comparison-led and answers the questions people ask before they buy, such as what suits a beginner, which toys are quiet, how materials differ and how discreet shipping works.',
          ],
        },
        {
          heading: 'Content and Traffic Sources',
          bullets: [
            `Search-led guides and comparisons in ${SITE.guidesName}.`,
            'Category hubs, price and use-case collections, and a gift shop.',
            'Original product summaries with who each product suits, pros and cons, and how to use it.',
            'An email list for readers who opt in to new guides and deals.',
            'Organic search is our primary channel. We do not buy traffic from adult ad networks or pop-unders.',
          ],
        },
        {
          heading: 'How Links Are Tracked',
          bullets: [
            'Every buy button points to our own /go/ address, which issues a 302 redirect to the merchant’s tracked affiliate link.',
            'Links carry rel="sponsored nofollow", and the redirect is excluded from search indexes with noindex.',
            'Affiliate URLs are generated in one place in our code, never typed into page content, so a program change updates every link at once.',
            'We record buy-button clicks in analytics to see which pages help readers decide.',
          ],
        },
        {
          heading: 'Promotional Methods and Standards',
          bullets: [
            'No incentivized, cashback or loyalty-style traffic, and no coupon or deal-code distribution beyond what the merchant publishes.',
            'No paid search bidding on merchant brand names, trademarks or URLs without written approval.',
            'No misleading claims, fake reviews, fake urgency or sale prices the merchant does not list.',
            'No cookie stuffing, forced clicks, toolbars or hidden redirects. Every outbound click is a deliberate reader click.',
            'Merchant descriptions and images are never republished as our own text. Copy is original.',
          ],
        },
        {
          heading: 'Compliance and Trust',
          bullets: [
            'An 18+ confirmation is shown to every new visitor before browsing.',
            'A clear affiliate disclosure appears near buy buttons and in the footer, in line with FTC endorsement guidance.',
            'Published privacy policy, terms of use and editorial policy.',
            'No user accounts, orders or payment data are collected on this site.',
          ],
        },
        {
          heading: 'Requesting Performance Data',
          body: [
            'We are happy to share traffic and engagement data from our analytics for your review during the application. Email us to request it.',
          ],
        },
      ]}
    />
  )
}
