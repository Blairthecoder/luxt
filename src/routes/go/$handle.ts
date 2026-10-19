import { createFileRoute } from '@tanstack/react-router'
import { buildAffiliateUrl, isValidHandle } from '@/lib/affiliate'

// Outbound affiliate redirect. Every buy button points here so tracking links
// live in one place. Kept out of the index via header and robots.txt.
export const Route = createFileRoute('/go/$handle')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const handle = params.handle.toLowerCase()
        if (!isValidHandle(handle)) {
          return new Response('Not found', {
            status: 404,
            headers: { 'X-Robots-Tag': 'noindex, nofollow' },
          })
        }
        const { findProduct } = await import('@/server/catalog-store')
        const program = findProduct(handle)?.program
        return new Response(null, {
          status: 302,
          headers: {
            Location: buildAffiliateUrl(handle, program),
            'X-Robots-Tag': 'noindex, nofollow',
            'Cache-Control': 'no-store',
            'Referrer-Policy': 'no-referrer-when-downgrade',
          },
        })
      },
    },
  },
})
