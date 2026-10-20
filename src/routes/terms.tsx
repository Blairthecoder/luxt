import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/LegalPage'
import { SITE } from '@/config/site'
import { TERMS } from '@/content/legal'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/terms')({
  head: () =>
    pageHead({
      title: `${TERMS.metaTitle} | ${SITE.shortName}`,
      description: TERMS.description,
      path: '/terms',
    }),
  component: () => <LegalPage doc={TERMS} />,
})
