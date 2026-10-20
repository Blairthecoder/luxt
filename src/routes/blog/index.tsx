import { Link, createFileRoute } from '@tanstack/react-router'
import { POSTS } from '@/content/posts'
import { TOPICS } from '@/content/topics'
import { SITE } from '@/config/site'
import { PostGrid } from '@/components/PostGrid'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/blog/')({
  head: () =>
    pageHead({
      title: `${SITE.guidesName}: Sex Toy Guides & Honest Advice | ${SITE.shortName}`,
      description:
        'Straight answers on choosing, using and caring for adult toys. Buying guides, comparisons and how-tos from the Nightstand Supply Co. team.',
      path: '/blog',
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: SITE.guidesName, path: '/blog' },
        ]),
      ],
    }),
  component: BlogIndex,
})

function BlogIndex() {
  const [lead, ...rest] = POSTS
  return (
    <div>
      <header className="wrap pt-16 sm:pt-28 pb-12 sm:pb-16">
        <p className="eyebrow text-graphite rise">The Journal</p>
        <h1 className="mt-3 display-xl rise">{SITE.guidesName}</h1>
        <p className="mt-8 lede text-graphite max-w-xl rise-delay">
          Straight answers on choosing, using and caring for the things in your nightstand.
        </p>
        <nav aria-label="Guide topics" className="mt-10 rise-delay">
          <ul className="flex flex-wrap gap-2">
            {TOPICS.map((topic) => (
              <li key={topic.slug}>
                <Link
                  to="/blog/topic/$topic"
                  params={{ topic: topic.slug }}
                  className="inline-flex items-center h-9 px-4 rounded-full bg-mist text-sm font-medium hover:bg-line transition-colors"
                >
                  {topic.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {lead && (
        <section className="bg-night text-canvas">
          <Link to="/blog/$slug" params={{ slug: lead.slug }} className="group wrap block py-20 sm:py-32">
            <p className="text-sm text-[#a1a1a6]">
              <span className="text-canvas font-semibold">Featured Guide</span>
              <span className="mx-2">·</span>
              {lead.readMinutes} min read
            </p>
            <h2 className="mt-5 display-l max-w-5xl group-hover:text-canvas/80 transition-colors">{lead.title}</h2>
            <p className="mt-6 lede text-[#a1a1a6] max-w-2xl">{lead.excerpt}</p>
            <span className="mt-10 btn btn-light">Read the Guide</span>
          </Link>
        </section>
      )}

      <div className="wrap mt-16 sm:mt-24">
        <PostGrid posts={rest} />
      </div>
    </div>
  )
}
