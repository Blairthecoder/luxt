import { createFileRoute } from '@tanstack/react-router'
import { absoluteUrl } from '@/config/site'
import { HUBS } from '@/content/hubs'
import { COLLECTIONS } from '@/content/collections'
import { POSTS, postsForTopic } from '@/content/posts'
import { TOPICS } from '@/content/topics'

// Lists only indexable URLs: home, category hubs and collections with products,
// guides, and product
// pages that have original copy. /go/ redirects are never included.
export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const store = await import('@/server/catalog-store')
        const counts = store.hubCounts()
        const lastmod = store.catalogSyncedAt()?.slice(0, 10)

        const urls: { loc: string; lastmod?: string }[] = [{ loc: absoluteUrl('/'), lastmod }]
        for (const hub of HUBS) {
          if (counts[hub.slug]) urls.push({ loc: absoluteUrl(`/category/${hub.slug}`), lastmod })
        }
        for (const c of COLLECTIONS) {
          if (store.productsMatchingRule(c.slug, c.rule).length >= 6) {
            urls.push({ loc: absoluteUrl(`/shop/${c.slug}`), lastmod })
          }
        }
        urls.push({ loc: absoluteUrl('/gifts'), lastmod })
        urls.push({ loc: absoluteUrl('/reviews'), lastmod })
        for (const path of ['/about', '/editorial-policy', '/disclosure', '/partners', '/contact']) {
          urls.push({ loc: absoluteUrl(path) })
        }
        urls.push({ loc: absoluteUrl('/blog') })
        for (const topic of TOPICS) {
          if (postsForTopic(topic.slug).length) urls.push({ loc: absoluteUrl(`/blog/topic/${topic.slug}`) })
        }
        for (const post of POSTS) {
          urls.push({ loc: absoluteUrl(`/blog/${post.slug}`), lastmod: post.updatedAt ?? post.publishedAt })
        }
        for (const p of store.allProducts()) {
          if (store.hasCopy(p.handle)) {
            urls.push({ loc: absoluteUrl(`/products/${p.handle}`), lastmod: p.updatedAt?.slice(0, 10) })
          }
        }

        const body =
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          urls
            .map(
              (u) =>
                `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`
            )
            .join('\n') +
          '\n</urlset>\n'

        return new Response(body, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
