import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { POSTS_BY_SLUG, relatedPosts } from '@/content/posts'
import { HUBS_BY_SLUG } from '@/content/hubs'
import { TOPICS_BY_SLUG } from '@/content/topics'
import { SITE, absoluteUrl } from '@/config/site'
import { getPostHtml } from '@/lib/catalog'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const post = POSTS_BY_SLUG[params.slug]
    if (!post) throw notFound()
    const rendered = await getPostHtml({ data: post.slug })
    if (!rendered) throw notFound()
    // The body is already rendered to html; keep the Markdown out of the page payload.
    const { body: _body, picks: _picks, ...meta } = post
    return { post: { ...meta, body: '' }, html: rendered.html, hasPicks: Boolean(_picks) }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { post } = loaderData
    const path = `/blog/${post.slug}`
    return pageHead({
      title: `${post.metaTitle} | ${SITE.shortName}`,
      description: post.metaDescription,
      path,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: SITE.guidesName, path: '/blog' },
          { name: post.title, path },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          mainEntityOfPage: absoluteUrl(path),
          author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
          publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        },
        ...(post.faqs?.length
          ? [
              {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: post.faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ]
          : []),
      ],
    })
  },
  component: PostPage,
})

function PostPage() {
  const { post, html, hasPicks } = Route.useLoaderData()
  const more = relatedPosts(post, 2)
  const hubs = post.hubs.map((h) => HUBS_BY_SLUG[h]).filter(Boolean)
  const topics = post.topics.map((t) => TOPICS_BY_SLUG[t]).filter(Boolean)

  return (
    <article className="max-w-[1400px] mx-auto px-5 sm:px-8">
      <header className="pt-10 pb-14 border-b border-line">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: SITE.guidesName, path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />
        <div className="mt-14 max-w-3xl mx-auto text-center">
          <p className="eyebrow text-gold">
            {formatDate(post.updatedAt ?? post.publishedAt)} · {post.readMinutes} Minute Read
          </p>
          <h1 className="mt-5 text-5xl sm:text-6xl text-ivory leading-[1.08]">{post.title}</h1>
          <p className="mt-6 text-lg text-muted leading-relaxed">{post.excerpt}</p>
          {topics.length > 0 && (
            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {topics.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    to="/blog/topic/$topic"
                    params={{ topic: topic.slug }}
                    className="eyebrow text-gold-deep hover:text-gold"
                  >
                    {topic.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto py-14">
        {hasPicks && <AffiliateNotice className="mb-10 pb-6 border-b border-line" />}
        <div className="prose-notes" dangerouslySetInnerHTML={{ __html: html }} />
        {post.faqs?.length ? (
          <section className="mt-14 pt-10 border-t border-line">
            <p className="eyebrow text-gold">Questions</p>
            <h2 className="mt-3 text-3xl text-ivory">Frequently Asked</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {post.faqs.map((faq) => (
                <div key={faq.q} className="py-5">
                  <dt className="font-display text-xl text-ivory">{faq.q}</dt>
                  <dd className="mt-2 text-muted leading-relaxed">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
        <AffiliateNotice className="mt-12 pt-6 border-t border-line" />
      </div>

      {hubs.length > 0 && (
        <section className="max-w-2xl mx-auto border-t border-line pt-10">
          <p className="eyebrow text-gold-deep mb-4">Shop This Guide</p>
          <div className="flex flex-wrap gap-3">
            {hubs.map((hub) => (
              <Link key={hub.slug} to="/category/$slug" params={{ slug: hub.slug }} className="btn-line">
                {hub.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="mt-20 border-t border-line pt-14">
          <p className="eyebrow text-gold text-center">Keep Reading</p>
          <div className="mt-8 grid md:grid-cols-2 gap-px bg-line border-y border-line">
            {more.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group bg-ink p-10">
                <h2 className="text-3xl text-ivory group-hover:text-gold transition-colors leading-snug">
                  {p.title}
                </h2>
                <p className="mt-3 text-muted">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
