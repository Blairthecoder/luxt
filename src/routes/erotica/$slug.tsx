import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { EroticaGrid, EroticaMeta } from '@/components/EroticaCard'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { ShopTheGuide } from '@/components/ShopTheGuide'
import { EROTICA, EROTICA_BY_SLUG } from '@/content/erotica'
import { POSTS_BY_SLUG } from '@/content/posts'
import { COLLECTIONS_BY_SLUG } from '@/content/collections'
import { SITE, absoluteUrl } from '@/config/site'
import { getEroticaHtml } from '@/lib/erotica'
import { formatPostDate } from '@/lib/format'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/erotica/$slug')({
  loader: async ({ params }) => {
    const entry = EROTICA_BY_SLUG[params.slug]
    if (!entry) throw notFound()
    const rendered = await getEroticaHtml({ data: entry.slug })
    if (!rendered) throw notFound()
    return { entry: { ...entry, body: '' }, html: rendered.html, products: rendered.products }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { entry } = loaderData
    const path = `/erotica/${entry.slug}`
    return pageHead({
      title: `${entry.metaTitle} | ${SITE.shortName}`,
      description: entry.metaDescription,
      path,
      type: 'article',
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Erotica', path: '/erotica' },
          { name: entry.title, path },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': entry.kind === 'story' ? 'ShortStory' : 'Article',
          headline: entry.title,
          description: entry.metaDescription,
          datePublished: entry.publishedAt,
          dateModified: entry.updatedAt ?? entry.publishedAt,
          mainEntityOfPage: absoluteUrl(path),
          ...(entry.kind === 'story' ? { genre: 'Romance', isFamilyFriendly: false } : {}),
          audience: { '@type': 'PeopleAudience', suggestedMinAge: 18 },
          author: { '@type': 'Organization', name: SITE.editorialTeam, url: absoluteUrl('/about') },
          publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        },
      ],
    })
  },
  component: EroticaPage,
})

function EroticaPage() {
  const { entry, html, products } = Route.useLoaderData()
  const guides = entry.guides.map((slug) => POSTS_BY_SLUG[slug]).filter((p) => p !== undefined)
  const collections = (entry.collections ?? []).map((slug) => COLLECTIONS_BY_SLUG[slug]).filter((c) => c !== undefined)
  // Same kind first, so a story leads to more stories.
  const more = EROTICA.filter((e) => e.slug !== entry.slug)
    .sort((a, b) => Number(b.kind === entry.kind) - Number(a.kind === entry.kind))
    .slice(0, 3)

  return (
    <article>
      <header className="wrap pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Erotica', path: '/erotica' },
            { name: entry.title, path: `/erotica/${entry.slug}` },
          ]}
        />
        <div className="mt-16 sm:mt-24 max-w-4xl">
          <EroticaMeta entry={entry} className="rise" />
          <p className="mt-2 text-sm text-graphite rise">
            By {SITE.editorialTeam}
            <span className="mx-2 text-silver">·</span>
            <time dateTime={entry.publishedAt}>{formatPostDate(entry.publishedAt)}</time>
          </p>
          <h1 className="mt-5 display-l rise">{entry.title}</h1>
          <p className="mt-8 lede text-graphite max-w-3xl rise-delay">{entry.excerpt}</p>
        </div>
      </header>

      <div className="wrap mt-14 sm:mt-20">
        <div className="border-t border-ink" />
      </div>

      <div className="wrap">
        <div className="max-w-[42rem] mx-auto py-14 sm:py-20">
          <div className="prose-notes" dangerouslySetInnerHTML={{ __html: html }} />
          <aside aria-label="About this piece" className="mt-12 p-5 sm:p-6 bg-mist rounded-2xl text-[0.9375rem] text-graphite leading-relaxed">
            <span className="font-semibold text-ink">For adults 18+.</span> Our erotica is original, romantic and
            non-explicit. Every character is an adult, and every story is about consent, confidence and connection.
          </aside>

          {(guides.length > 0 || collections.length > 0) && (
            <section className="mt-14">
              <h2 className="font-sans text-[0.9375rem] font-semibold tracking-[-0.01em] mb-4">If This Story Spoke to You</h2>
              <ul className="border-t border-line">
                {guides.map((post) => (
                  <li key={post.slug} className="border-b border-line">
                    <Link to="/blog/$slug" params={{ slug: post.slug }} className="block py-4 font-display text-lg font-semibold tracking-[-0.02em] hover:underline underline-offset-4">
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {collections.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {collections.map((c) => (
                    <Link key={c.slug} to="/shop/$slug" params={{ slug: c.slug }} className="btn-ghost">
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          )}
          <ShopTheGuide
            products={products}
            title="Set the Mood"
            context="erotica_products"
            className="mt-14 pt-12 border-t border-line"
          />
          <NewsletterSignup source={`erotica:${entry.slug}`} className="mt-14" />
        </div>
      </div>

      {more.length > 0 && (
        <section className="wrap mt-8 sm:mt-16 reveal">
          <div className="section-head">
            <h2 className="display-m">More Erotica</h2>
            <Link to="/erotica" className="more hidden sm:inline-flex">
              All Erotica
            </Link>
          </div>
          <EroticaGrid entries={more} />
        </section>
      )}
    </article>
  )
}
