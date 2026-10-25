import { createServerFn } from '@tanstack/react-start'

/** Renders an Erotica entry's Markdown on the server so `marked` stays out of the client bundle. */
export const getEroticaHtml = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { EROTICA_BY_SLUG } = await import('@/content/erotica')
    const { marked } = await import('marked')
    const entry = EROTICA_BY_SLUG[slug]
    if (!entry) return null
    return { html: await marked.parse(entry.body) }
  })
