import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { PRIVACY } from '@/content/legal'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/privacy')({
  head: () =>
    pageHead({
      title: `${PRIVACY.metaTitle} | ${SITE.shortName}`,
      description: PRIVACY.description,
      path: '/privacy',
    }),
  component: () => <LegalPage doc={PRIVACY} />,
})
