import { Link, createFileRoute } from '@tanstack/react-router'
import { MerchantPicksSection } from '@/components/MerchantPicks'
import { SiteHubPage, hubJsonLd } from '@/components/SiteHubPage'
import { PICKS_HUB } from '@/content/site-hubs'
import { SITE } from '@/config/site'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/shop/')({
  head: () =>
    pageHead({
      title: `${PICKS_HUB.metaTitle} | ${SITE.shortName}`,
      description: PICKS_HUB.metaDescription,
      path: PICKS_HUB.path,
      jsonLd: hubJsonLd(PICKS_HUB),
    }),
  component: () => (
    <SiteHubPage
      hub={PICKS_HUB}
      monetized
      extra={
        <div className="wrap mt-16 space-y-16 sm:mt-24 sm:space-y-24">
          <div className="max-w-2xl">
            <p className="eyebrow text-graphite">Selected Retailer Picks</p>
            <h2 className="mt-2 display-m">Products We Selected From Luxury Toy X</h2>
            <p className="mt-3 text-graphite">
              Grouped by what you are shopping for. Each card says who it suits and why it is here, and links to the
              retailer.{' '}
              <Link to="/brands/luxury-toy-x" className="text-ink underline underline-offset-4">
                Read our Luxury Toy X guide
              </Link>{' '}
              for shipping and return details.
            </p>
          </div>
          <MerchantPicksSection intent="beginners" context="shop_hub" headingLevel={3} />
          <MerchantPicksSection intent="couples" context="shop_hub" headingLevel={3} />
          <MerchantPicksSection intent="under-50" context="shop_hub" headingLevel={3} />
          <MerchantPicksSection intent="premium" context="shop_hub" headingLevel={3} />
          <MerchantPicksSection intent="care" context="shop_hub" headingLevel={3} />
        </div>
      }
    />
  ),
})
