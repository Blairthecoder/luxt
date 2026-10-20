import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { postsForTopic } from '@/content/posts'
import { TOPICS, TOPICS_BY_SLUG } from '@/content/topics'
import { COLLECTIONS_BY_SLUG } from '@/content/collections'
import { SITE, absoluteUrl } from '@/config/site'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/blog/topic/$topic')({
  loader: ({ params }) => {
    const topic = TOPICS_BY_SLUG[params.topic]
    if (!topic) throw notFound()
    return { topic }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { topic } = loaderData
    const path = `/blog/topic/${topic.slug}`
    const posts = postsForTopic(topic.slug)
    return pageHead({
      title: `${topic.metaTitle} | ${SITE.shortName}`,
      description: topic.metaDescription,
      path,
      noindex: posts.length === 0,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: SITE.guidesName, path: '/blog' },
          { name: topic.name, path },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: topic.name,
          description: topic.metaDescription,
          url: absoluteUrl(path),
          hasPart: posts.map((p) => ({
            '@type': 'Article',
            headline: p.title,
            url: absoluteUrl(`/blog/${p.slug}`),
          })),
        },
      ],
    })
  },
  component: TopicPage,
})

function TopicPage() {
  const { topic } = Route.useLoaderData()
  const posts = postsForTopic(topic.slug)
  const collections = topic.collections.map((slug) => COLLECTIONS_BY_SLUG[slug]).filter(Boolean)
  const others = TOPICS.filter((t) => t.slug !== topic.slug)

  return (
    <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
      <header className="pt-10 pb-14 border-b border-line">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: SITE.guidesName, path: '/blog' },
            { name: topic.name, path: `/blog/topic/${topic.slug}` },
          ]}
        />
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="eyebrow text-gold">{SITE.guidesName}</p>
          <h1 className="mt-4 text-5xl sm:text-6xl text-ivory leading-[1.05]">{topic.name}</h1>
          <p className="mt-6 text-muted leading-relaxed">{topic.intro}</p>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-px bg-line border-b border-line">
        {posts.map((post) => (
          <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className="group bg-ink p-10 sm:p-14">
            <p className="eyebrow text-gold-deep">{post.readMinutes} Minute Read</p>
            <h2 className="mt-4 text-3xl text-ivory group-hover:text-gold transition-colors leading-snug">
              {post.title}
            </h2>
            <p className="mt-4 text-muted leading-relaxed">{post.excerpt}</p>
          </Link>
        ))}
      </div>

      {collections.length > 0 && (
        <section className="py-14 border-b border-line">
          <p className="eyebrow text-gold text-center">Shop the Topic</p>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link to="/shop/$slug" params={{ slug: c.slug }} className="btn-line">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="More topics" className="py-14 text-center">
        <p className="eyebrow text-faint">More Topics</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {others.map((t) => (
            <li key={t.slug}>
              <Link
                to="/blog/topic/$topic"
                params={{ topic: t.slug }}
                className="font-display text-2xl text-ivory hover:text-gold transition-colors"
              >
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
