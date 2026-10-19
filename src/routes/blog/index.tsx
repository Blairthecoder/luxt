import { Link, createFileRoute } from '@tanstack/react-router'
import { POSTS } from '@/content/posts'
import { SITE } from '@/config/site'
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
    <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
      <header className="pt-16 pb-14 border-b border-line text-center">
        <p className="eyebrow text-gold">The Journal</p>
        <h1 className="mt-4 text-6xl sm:text-7xl text-ivory">{SITE.guidesName}</h1>
        <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
          Straight answers on choosing, using and caring for the things in your nightstand.
        </p>
      </header>

      {lead && (
        <Link
          to="/blog/$slug"
          params={{ slug: lead.slug }}
          className="group block py-16 border-b border-line text-center max-w-3xl mx-auto"
        >
          <p className="eyebrow text-gold-deep">Featured Guide · {lead.readMinutes} Minute Read</p>
          <h2 className="mt-5 text-4xl sm:text-5xl text-ivory group-hover:text-gold transition-colors leading-tight">
            {lead.title}
          </h2>
          <p className="mt-5 text-muted leading-relaxed">{lead.excerpt}</p>
          <span className="mt-8 btn-line">Read the Guide</span>
        </Link>
      )}

      <div className="grid md:grid-cols-2 gap-px bg-line border-b border-line">
        {rest.map((post) => (
          <Link
            key={post.slug}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="group bg-ink p-10 sm:p-14"
          >
            <p className="eyebrow text-gold-deep">{post.readMinutes} Minute Read</p>
            <h2 className="mt-4 text-3xl text-ivory group-hover:text-gold transition-colors leading-snug">
              {post.title}
            </h2>
            <p className="mt-4 text-muted leading-relaxed">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
