import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { postsForTopic } from '@/content/posts'
import { TOPICS, TOPICS_BY_SLUG } from '@/content/topics'
import { COLLECTIONS_BY_SLUG } from '@/content/collections'
import { SITE, absoluteUrl } from '@/config/site'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'
import { PostGrid } from '@/components/PostGrid'

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
    <div className="wrap">
      <header className="pt-6 pb-12 sm:pb-16">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: SITE.guidesName, path: '/blog' },
            { name: topic.name, path: `/blog/topic/${topic.slug}` },
          ]}
        />
        <div className="mt-14 sm:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 rise">
            <p className="eyebrow text-graphite">{SITE.guidesName}</p>
            <h1 className="mt-3 display-l">{topic.name}</h1>
          </div>
          <p className="lg:col-span-5 text-[1.0625rem] leading-relaxed text-graphite rise-delay">{topic.intro}</p>
        </div>
      </header>

      <PostGrid posts={posts} />

      {collections.length > 0 && (
        <section className="pt-20 sm:pt-28 reveal">
          <h2 className="display-m">Shop the Topic.</h2>
          <ul className="mt-8 flex flex-wrap gap-2">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link to="/shop/$slug" params={{ slug: c.slug }} className="btn-ghost">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="More topics" className="mt-20 sm:mt-28 pt-10 border-t border-ink reveal">
        <p className="text-sm text-graphite">More Topics</p>
        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {others.map((t) => (
            <li key={t.slug} className="border-b border-line">
              <Link
                to="/blog/topic/$topic"
                params={{ topic: t.slug }}
                className="block py-4 font-display text-2xl font-semibold tracking-[-0.03em] hover:text-graphite transition-colors"
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
