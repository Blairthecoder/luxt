import { createFileRoute } from '@tanstack/react-router'
import { SiteHubPage, hubJsonLd } from '@/components/SiteHubPage'
import { EXPLORE_HUB } from '@/content/site-hubs'
import { SITE } from '@/config/site'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/explore')({
  head: () =>
    pageHead({
      title: `${EXPLORE_HUB.metaTitle} | ${SITE.shortName}`,
      description: EXPLORE_HUB.metaDescription,
      path: EXPLORE_HUB.path,
      jsonLd: hubJsonLd(EXPLORE_HUB),
    }),
  component: () => <SiteHubPage hub={EXPLORE_HUB} />,
})
