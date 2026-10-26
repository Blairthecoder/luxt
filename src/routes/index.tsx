import { Link, createFileRoute } from '@tanstack/react-router'
import { ProductCard } from '@/components/ProductCard'
import { PickCard } from '@/components/PickCard'
import { DiscoveryQuiz } from '@/components/DiscoveryQuiz'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { MobileSearchField } from '@/components/MobileSearchField'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { PostMeta } from '@/components/PostGrid'
import { POSTS_BY_SLUG } from '@/content/posts'
import { STORIES } from '@/content/erotica'
import { EroticaGrid } from '@/components/EroticaCard'
import { SITE, absoluteUrl } from '@/config/site'
import { getHomeData } from '@/lib/catalog'
import { getCuratedPicks } from '@/lib/curated'
import { organizationJsonLd, pageHead } from '@/lib/seo'

/** The featured guide, then three related reads chosen for usefulness to a newcomer, not recency. */
const FEATURED_SLUG = 'how-to-feel-confident-in-bed'
const RELATED_SLUGS = ['sex-toys-for-beginners', 'how-to-ask-for-what-you-want-in-bed', 'how-to-talk-to-your-partner-about-sex-toys']

const START_CARDS = [
  {
    title: 'For Yourself',
    body: 'Confidence, personal discovery, and beginner-friendly education.',
    to: '/explore',
    params: undefined,
    cta: 'Explore the Guides',
    tone: 'bg-blush',
  },
  {
    title: 'For Couples',
    body: 'Connection, communication, shared experiences, and thoughtful product recommendations.',
    to: '/for-couples',
    params: undefined,
    cta: 'Explore For Couples',
    tone: 'bg-mist',
  },
  {
    title: 'Find Your First',
    body: 'Approachable buying guides for people exploring intimate wellness products.',
    to: '/blog/$slug',
    params: { slug: 'sex-toys-for-beginners' },
    cta: 'Read the Beginner Guide',
    tone: 'bg-petal',
  },
] as const

const TRUST = [
  ['How we choose', 'Body-safe materials, reputable brands and clear trade-offs come first. We group picks by who they suit.'],
  ['Affiliate disclosure', 'We are an independent publisher. We may earn a commission when you buy through our links, at no extra cost to you.'],
  ['Editorial independence', 'Commissions never decide what we recommend. Merchants do not review or approve our copy.'],
  ['Privacy-conscious', 'An 18+ confirmation, discreet guidance, no accounts, and a quiz that never saves your answers.'],
] as const

export const Route = createFileRoute('/')({
  loader: async () => {
    const [home, picks] = await Promise.all([getHomeData(), getCuratedPicks()])
    return { ...home, picks }
  },
  head: ({ loaderData }) =>
    pageHead({
      title: `${SITE.shortName} | Intimacy, Confidence & Thoughtful Finds`,
      description:
        'Explore practical intimacy advice, body confidence guides, couples’ inspiration, and thoughtfully selected personal wellness products.',
      path: '/',
      jsonLd: [
        organizationJsonLd(),
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE.name,
          alternateName: SITE.shortName,
          url: SITE.url,
          description: SITE.description,
          publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
          audience: { '@type': 'PeopleAudience', suggestedMinAge: 18 },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `Featured from ${SITE.guidesName}`,
          itemListElement: [FEATURED_SLUG, ...RELATED_SLUGS]
            .map((slug) => POSTS_BY_SLUG[slug])
            .filter(Boolean)
            .map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/blog/${p.slug}`), name: p.title })),
        },
        ...(loaderData?.picks.length
          ? [
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Thoughtfully Chosen',
                itemListElement: loaderData.picks.map((p, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  url: absoluteUrl(`/products/${p.handle}`),
                  name: p.title,
                })),
              },
            ]
          : []),
      ],
    }),
  component: HomePage,
})

function HomePage() {
  const { lingerie, picks } = Route.useLoaderData()
  const featured = POSTS_BY_SLUG[FEATURED_SLUG]
  const related = RELATED_SLUGS.map((s) => POSTS_BY_SLUG[s]).filter(Boolean)

  return (
    <div>
      {/* 1. Hero */}
      <section className="wrap pt-3 sm:pt-10">
        <MobileSearchField className="mb-5" />
        <div className="rounded-[2rem] bg-plum text-canvas px-6 py-14 sm:px-14 sm:py-24 rise">
          <p className="eyebrow text-petal">{SITE.tagline}</p>
          <h1 className="mt-4 display-l max-w-3xl max-sm:!text-[2.375rem]">Confidence Starts With Curiosity.</h1>
          <p className="mt-6 lede text-canvas/80 max-w-2xl">
            Explore intimacy, connection, and personal wellness with practical guidance, thoughtful recommendations, and a
            little more confidence along the way.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/explore" className="btn btn-light btn-lg">
              Explore the Guides
            </Link>
            <Link to="/shop" className="btn-ghost !min-h-[3.75rem] border-canvas/40 text-canvas hover:border-canvas">
              Shop Our Picks
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Find your starting point */}
      <section aria-labelledby="start-heading" className="wrap pt-14 sm:pt-24 reveal">
        <div className="section-head">
          <h2 id="start-heading" className="display-m">
            Find Your Starting Point
          </h2>
        </div>
        <ul className="grid gap-3 md:grid-cols-3">
          {START_CARDS.map((card) => (
            <li key={card.title}>
              <Link
                to={card.to}
                {...(card.params ? { params: card.params as never } : {})}
                className={`group flex h-full min-h-[14rem] flex-col justify-between rounded-3xl p-7 ${card.tone}`}
              >
                <span className="block">
                  <span className="block font-display text-2xl font-bold tracking-[-0.03em] group-hover:underline underline-offset-4 decoration-2">
                    {card.title}
                  </span>
                  <span className="mt-3 block text-[0.9375rem] text-graphite leading-relaxed">{card.body}</span>
                </span>
                <span className="mt-6 more text-sm">{card.cta}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. The Nightstand Notes */}
      {featured && (
        <section aria-labelledby="notes-heading" className="wrap pt-14 sm:pt-24 reveal">
          <div className="section-head">
            <div>
              <h2 id="notes-heading" className="display-m">
                The Nightstand Notes
              </h2>
              <p className="mt-2 text-graphite">Guides to start with, chosen for usefulness rather than recency.</p>
            </div>
            <Link to="/blog" className="more hidden sm:inline-flex">
              All Nightstand Notes
            </Link>
          </div>
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group lg:col-span-7 flex flex-col justify-between rounded-3xl bg-blush p-7 sm:p-12 min-h-[18rem]"
            >
              <span className="block">
                <PostMeta post={featured} />
                <span className="mt-4 block font-display text-[1.875rem] sm:text-[2.5rem] font-bold tracking-[-0.04em] leading-[1.05] group-hover:underline underline-offset-[6px] decoration-2">
                  {featured.title}
                </span>
                <span className="mt-4 block text-graphite leading-relaxed max-w-xl">{featured.excerpt}</span>
              </span>
              <span className="mt-8 more">Read the Guide</span>
            </Link>
            <ul className="lg:col-span-5 border-t border-ink">
              {related.map((post) => (
                <li key={post.slug} className="border-b border-line">
                  <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block py-5">
                    <PostMeta post={post} />
                    <span className="mt-1.5 block font-display text-lg sm:text-xl font-semibold tracking-[-0.02em] leading-snug group-hover:underline underline-offset-4 decoration-1">
                      {post.title}
                    </span>
                    <span className="mt-1.5 block text-sm text-graphite leading-relaxed line-clamp-2">{post.excerpt}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 4. Thoughtfully chosen */}
      {picks.length > 0 && (
        <section aria-labelledby="chosen-heading" className="wrap pt-14 sm:pt-24 reveal">
          <div className="section-head">
            <div>
              <h2 id="chosen-heading" className="display-m">
                Thoughtfully Chosen
              </h2>
              <p className="mt-2 text-graphite max-w-xl">
                A few picks from our guides, each with who it suits and what to keep in mind.
              </p>
            </div>
            <Link to="/shop" className="more hidden sm:inline-flex">
              All Our Picks
            </Link>
          </div>
          <AffiliateNotice className="mb-6 max-w-2xl" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {picks.map((pick) => (
              <li key={pick.handle}>
                <PickCard pick={pick} context="home_pick" cluster="home" />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-graphite max-w-2xl">
            Nightstand Supply does not sell or ship these products. Prices are read from the retailer&rsquo;s feed and the
            retailer&rsquo;s checkout always shows the final price.
          </p>
        </section>
      )}

      {/* 5. Guided discovery */}
      <section className="wrap pt-14 sm:pt-24 reveal">
        <DiscoveryQuiz className="rounded-3xl bg-mist p-7 sm:p-12" />
      </section>

      {/* 6. The Nightstand Edit */}
      <section aria-label="The Nightstand Edit" className="wrap pt-14 sm:pt-24 reveal">
        <div className="rounded-3xl bg-plum text-canvas p-7 sm:p-12 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <p className="eyebrow text-petal">The Nightstand Edit</p>
            <h2 className="mt-3 display-m">A Little More Confidence, Delivered.</h2>
            <p className="mt-4 text-canvas/75 leading-relaxed max-w-md">
              Practical intimacy tips, thoughtful product discoveries, and inspiration for feeling good and getting closer.
            </p>
          </div>
          <div className="lg:col-span-6 [&_section]:!bg-canvas [&_section]:text-ink [&_section]:rounded-2xl [&_h2]:sr-only">
            <NewsletterSignup
              source="home"
              title="Join The Nightstand Edit"
              body="Practical tips and thoughtful finds, now and then. Unsubscribe any time."
              button="Join The Nightstand Edit"
            />
          </div>
        </div>
      </section>

      {/* 7. Trust & transparency */}
      <section aria-labelledby="trust-heading" className="wrap pt-14 sm:pt-24 reveal">
        <div className="section-head">
          <h2 id="trust-heading" className="display-m">
            Trust &amp; Transparency
          </h2>
          <Link to="/editorial-policy" className="more hidden sm:inline-flex">
            Read Our Editorial Policy
          </Link>
        </div>
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 border-t border-ink pt-6">
          {TRUST.map(([title, body]) => (
            <div key={title}>
              <dt className="font-display text-lg font-semibold tracking-[-0.02em]">{title}</dt>
              <dd className="mt-1.5 text-sm text-graphite leading-relaxed">{body}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm sm:hidden">
          <Link to="/editorial-policy" className="underline underline-offset-4">
            Read our editorial policy
          </Link>
        </p>
      </section>

      {/* Existing shop and fiction sections stay. */}
      {lingerie.length > 0 && (
        <section className="wrap pt-14 sm:pt-24 reveal">
          <div className="section-head">
            <div>
              <h2 className="display-m">Lingerie We Love</h2>
              <p className="mt-2 text-graphite">Forgiving fits, sizes up to 5XL and honest fit notes on every piece.</p>
            </div>
            <Link to="/category/$slug" params={{ slug: 'lingerie' }} className="more hidden sm:inline-flex">
              Shop All Lingerie
            </Link>
          </div>
          <div className="rail">
            {lingerie.map((product) => (
              <ProductCard key={product.handle} product={product} size="small" context="home_card" />
            ))}
          </div>
          <p className="mt-6 text-sm text-graphite">
            New to lingerie?{' '}
            <Link to="/blog/$slug" params={{ slug: 'how-to-feel-confident-in-lingerie' }} className="text-ink underline underline-offset-4">
              How to feel confident in lingerie
            </Link>
            .
          </p>
        </section>
      )}

      {STORIES.length > 0 && (
        <section aria-labelledby="erotica-heading" className="wrap pt-14 sm:pt-24 reveal">
          <div className="section-head">
            <div>
              <p className="eyebrow text-graphite">Erotica · 18+</p>
              <h2 id="erotica-heading" className="mt-2 display-m">
                Sensual Stories to Set the Mood
              </h2>
              <p className="mt-2 text-graphite">Original short fiction about confidence, desire and connection. Romantic, never graphic.</p>
            </div>
            <Link to="/erotica" className="more hidden sm:inline-flex">
              All Erotica
            </Link>
          </div>
          <EroticaGrid entries={STORIES.slice(0, 3)} />
        </section>
      )}
    </div>
  )
}
