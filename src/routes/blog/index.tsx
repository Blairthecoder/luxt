import { Link, createFileRoute } from '@tanstack/react-router'
import { POSTS, latestPosts } from '@/content/posts'
import { TOPICS } from '@/content/topics'
import { SITE } from '@/config/site'
import { PostGrid } from '@/components/PostGrid'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/blog/')({
  head: () =>
    pageHead({
      title: `Confidence, Sex Ed & Toy Guides for Women | ${SITE.guidesName}`,
      description:
        'Judgment-free guides to body confidence, sex education, intimacy, lingerie and toys. Practical, kind advice for women, solo or with a partner.',
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
  const [lead] = POSTS
  const rest = latestPosts().filter((p) => p !== lead)
  return (
    <div>
      <header className="wrap pt-16 sm:pt-28 pb-12 sm:pb-16">
        <p className="eyebrow text-graphite rise">Confidence, Sex Ed, Lingerie & Toy Guides</p>
        <h1 className="mt-3 display-xl rise">{SITE.guidesName}</h1>
        <p className="mt-8 lede text-graphite max-w-xl rise-delay">
          Kind, judgment-free guides to feeling confident in your body, understanding your pleasure and choosing lingerie
          and toys you will love, solo or with a partner.
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
        <h2 className="display-m mb-8">Latest.</h2>
        <PostGrid posts={rest} />
      </div>
    </div>
  )
}
