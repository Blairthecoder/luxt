import { createFileRoute } from '@tanstack/react-router'
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
  component: () => <SiteHubPage hub={PICKS_HUB} monetized />,
})
