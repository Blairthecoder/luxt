import { createFileRoute } from '@tanstack/react-router'
import { SiteHubPage, hubJsonLd } from '@/components/SiteHubPage'
import { COUPLES_HUB } from '@/content/site-hubs'
import { SITE } from '@/config/site'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/for-couples')({
  head: () =>
    pageHead({
      title: `${COUPLES_HUB.metaTitle} | ${SITE.shortName}`,
      description: COUPLES_HUB.metaDescription,
      path: COUPLES_HUB.path,
      jsonLd: hubJsonLd(COUPLES_HUB),
    }),
  component: () => <SiteHubPage hub={COUPLES_HUB} />,
})
