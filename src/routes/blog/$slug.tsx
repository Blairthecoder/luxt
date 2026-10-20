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
    <article>
      <header className="wrap pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: SITE.guidesName, path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />
        <div className="mt-16 sm:mt-24 max-w-5xl">
          <p className="text-sm text-graphite rise">
            <span className="text-signal font-semibold">{SITE.guidesName}</span>
            <span className="mx-2 text-silver">·</span>
            {formatDate(post.updatedAt ?? post.publishedAt)}
            <span className="mx-2 text-silver">·</span>
            {post.readMinutes} min read
          </p>
          <h1 className="mt-5 display-l rise">{post.title}</h1>
          <p className="mt-8 lede text-graphite max-w-3xl rise-delay">{post.excerpt}</p>
          {topics.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2 rise-delay">
              {topics.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    to="/blog/topic/$topic"
                    params={{ topic: topic.slug }}
                    className="inline-flex items-center h-8 px-4 rounded-full bg-mist text-[0.8125rem] font-medium hover:bg-line transition-colors"
                  >
                    {topic.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="wrap mt-14 sm:mt-20">
        <div className="border-t border-ink" />
      </div>

      <div className="wrap">
        <div className="max-w-[46rem] mx-auto py-14 sm:py-20">
          {hasPicks && <AffiliateNotice className="mb-12 pb-6 border-b border-line" />}
          <div className="prose-notes" dangerouslySetInnerHTML={{ __html: html }} />
          {post.faqs?.length ? (
            <section className="mt-20 pt-12 border-t border-ink">
              <h2 className="display-m">Frequently Asked.</h2>
              <dl className="mt-8 border-t border-line">
                {post.faqs.map((faq) => (
                  <div key={faq.q} className="py-6 border-b border-line">
                    <dt className="font-display text-xl font-semibold tracking-[-0.02em]">{faq.q}</dt>
                    <dd className="mt-2 text-graphite text-[1.0625rem] leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
          <AffiliateNotice className="mt-12 pt-6 border-t border-line" />

          {hubs.length > 0 && (
            <section className="mt-14">
              <h2 className="font-sans text-[0.9375rem] font-semibold tracking-[-0.01em] mb-4">Shop This Guide</h2>
              <div className="flex flex-wrap gap-2">
                {hubs.map((hub) => (
                  <Link key={hub.slug} to="/category/$slug" params={{ slug: hub.slug }} className="btn-ghost">
                    {hub.name}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {more.length > 0 && (
        <section className="wrap mt-16 sm:mt-24 reveal">
          <h2 className="display-m mb-8">Keep Reading.</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {more.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group bg-mist p-8 sm:p-12 flex flex-col justify-between min-h-[22rem]"
              >
                <div>
                  <p className="text-sm text-graphite">{p.readMinutes} min read</p>
                  <h3 className="mt-4 font-display text-[1.875rem] sm:text-[2.25rem] font-bold tracking-[-0.035em] leading-[1.05]">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-graphite leading-relaxed max-w-md">{p.excerpt}</p>
                </div>
                <span className="mt-8 more">Read the Guide</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
