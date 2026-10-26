import { createFileRoute } from '@tanstack/react-router'
import { InfoPage } from '@/components/InfoPage'
import { SITE } from '@/config/site'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/editorial-policy')({
  head: () =>
    pageHead({
      title: `Editorial Policy | ${SITE.shortName}`,
      description: `How ${SITE.name} researches, writes and updates its adult toy guides, keeps affiliate links separate from recommendations, and handles corrections.`,
      path: '/editorial-policy',
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Editorial Policy', path: '/editorial-policy' },
        ]),
      ],
    }),
  component: () => (
    <InfoPage
      eyebrow="Standards"
      title="Editorial Policy"
      intro="What readers and partners can expect from everything we publish."
      sections={[
        {
          heading: 'Independence',
          body: [
            'Affiliate commissions never decide what we recommend or how we rank it. We will name a cheaper option, a competing brand or a reason not to buy when that serves the reader. Merchants do not review or approve our copy.',
          ],
        },
        {
          heading: 'Original Content',
          body: [
            'Guides and product summaries are written by our editorial team in our own words. We do not paste or lightly reword merchant descriptions, and a product page stays out of search indexes until it has original copy.',
          ],
        },
        {
          heading: 'How We Choose Products',
          bullets: [
            'Body-safe materials and clear care instructions come first.',
            'Reputable brands with working warranties and support are preferred.',
            'Picks are grouped by who they suit: beginners, couples, quiet use, travel, budget and splurge.',
            'We state trade-offs, such as noise, battery life, size or learning curve.',
          ],
        },
        {
          heading: 'Types of Content',
          bullets: [
            'Educational articles answer a real question about bodies, relationships or comfort. They are general information, not professional advice.',
            'Buying guides and comparisons are research-based: we use manufacturer specifications, manuals and retailer information. We do not claim hands-on testing unless a page says so.',
            'Hands-on reviews are labeled as such, and only when we actually used the product.',
            'Sources for factual or health-related claims are cited where we can, and sensitive health topics carry a not-medical-advice note.',
          ],
        },
        {
          heading: 'How We Review',
          body: [
            'Every product review answers the same questions in the same order: who the toy is best for, what we like, what to keep in mind and how to use it. Reviews draw on the manufacturer’s specifications and manuals, published material information, app features and how the toy compares with others in its category.',
            'We do not award star ratings or scores, and we never accept payment for a review or a higher placement. Buying guides name a best overall pick, a budget pick and the trade-offs. Comparisons put two products side by side on feel, noise, build, app and price, then say which one we would choose and who should pick the other.',
          ],
        },
        {
          heading: 'Prices, Sales and Availability',
          body: [
            'Prices, availability and sale markdowns are read from the retailer’s product feed, not typed by hand. We show a sale price only when the retailer lists a higher compare-at price, and we use a best-seller label only when the retailer tags products that way. The retailer’s checkout page always has the final price.',
          ],
        },
        {
          heading: 'Health and Safety Content',
          body: [
            'Guides about bodies, comfort and safety are general information, not medical advice. Where a topic involves health risk, we say so and point readers to a qualified professional.',
          ],
        },
        {
          heading: 'Corrections and Updates',
          body: [
            'Guides carry published and updated dates and are revised as products and prices change. If you spot an error, email us and we will review it and correct it.',
          ],
        },
      ]}
    />
  ),
})
