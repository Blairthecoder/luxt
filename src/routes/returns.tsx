import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { RETURNS } from '@/content/legal'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/returns')({
  head: () =>
    pageHead({
      title: `${RETURNS.metaTitle} | ${SITE.shortName}`,
      description: RETURNS.description,
      path: '/returns',
    }),
  component: () => <LegalPage doc={RETURNS} />,
})
