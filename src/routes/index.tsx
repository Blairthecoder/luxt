import { Link, createFileRoute } from '@tanstack/react-router'
import { ProductCard } from '@/components/ProductCard'
import { MobileSearchField } from '@/components/MobileSearchField'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { PostGrid, PostMeta } from '@/components/PostGrid'
import { HUBS } from '@/content/hubs'
import { POSTS, POSTS_BY_SLUG, latestPosts, postsForTopic } from '@/content/posts'
import type { Post } from '@/content/posts'
import { TOPICS, TOPICS_BY_SLUG } from '@/content/topics'
import { SITE } from '@/config/site'
import { getHomeData } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'
import { getOptimizedImageUrl } from '@/lib/image'
import type { ProductSummary } from '@/lib/listing'
import { organizationJsonLd, pageHead } from '@/lib/seo'
import { absoluteUrl } from '@/config/site'

function itemList(name: string, products: ProductSummary[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/products/${p.handle}`),
      name: p.title,
    })),
  }
}

export const Route = createFileRoute('/')({
  loader: () => getHomeData(),
  head: ({ loaderData }) => {
    const from = loaderData?.firstPicks.length ? Math.min(...loaderData.firstPicks.map((p) => p.price)) : null
    return pageHead({
      title: `Honest Sex Toy Reviews & Guides | ${SITE.shortName}`,
      description: from
        ? `Independent sex toy reviews, buying guides and head-to-head comparisons. Body-safe picks from ${formatPrice(from)}, plain answers and no judgment.`
        : SITE.description,
      path: '/',
      jsonLd: [
        organizationJsonLd(),
        { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url },
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `Latest from ${SITE.guidesName}`,
          itemListElement: latestPosts(6).map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: absoluteUrl(`/blog/${p.slug}`),
            name: p.title,
          })),
        },
        ...(loaderData
          ? [itemList(loaderData.topPicksLabel, loaderData.topPicks), itemList('Best First Toys', loaderData.firstPicks)].filter(
              (l) => l.itemListElement.length > 0
            )
          : []),
      ],
    })
  },
  component: HomePage,
})

/** The lead story. Seasonal guides go first in POSTS, so this follows the editorial calendar. */
const LEAD = POSTS[0]
/** Sex education and confidence pillars, featured as one band below the hero. */
const WELLNESS_TOPICS = ['sex-education', 'intimacy', 'body-confidence', 'womens-empowerment']
const WELLNESS_LEAD = 'sexual-empowerment-for-women'
const START_HERE = ['sex-toys-for-beginners', 'how-to-choose-your-first-vibrator', 'how-to-use-sex-toys-with-a-partner', 'how-to-clean-sex-toys']

const STANDARDS = [
  ['Independent', 'Commissions never decide what we recommend. We name a cheaper option or a reason not to buy when that serves you.'],
  ['Original', 'Every guide and review is written by us. We never paste merchant descriptions.'],
  ['Body-Safe First', 'We favor non-porous silicone and brands that list their materials and stand behind their toys.'],
] as const

function SectionHead({ title, sub, to, params, cta }: { title: string; sub?: string; to: string; params?: Record<string, string>; cta: string }) {
  return (
    <div className="section-head">
      <div>
        <h2 className="display-m">{title}</h2>
        {sub && <p className="mt-2 text-graphite">{sub}</p>}
      </div>
      <Link to={to} {...(params ? { params } : {})} className="more hidden sm:inline-flex">
        {cta}
      </Link>
    </div>
  )
}

function ProductRow({ products }: { products: ProductSummary[] }) {
  return (
    <div className="rail">
      {products.map((product) => (
        <ProductCard key={product.handle} product={product} size="small" context="home_card" />
      ))}
    </div>
  )
}

function topicPosts(slug: string, limit: number, skip: Post[] = []) {
  return postsForTopic(slug)
    .filter((p) => !skip.includes(p))
    .slice(0, limit)
}

function HomePage() {
  const { hubCounts, firstPicks, splurge, topPicks, topPicksLabel } = Route.useLoaderData()
  const hubs = HUBS.filter((hub) => (hubCounts[hub.slug] ?? 0) > 0)
  const latest = latestPosts().filter((p) => p !== LEAD).slice(0, 5)
  const shown = [LEAD, ...latest]
  const buyingGuides = topicPosts('buying-guides', 3, shown)
  const comparisons = topicPosts('comparisons', 4)
  const giftGuides = topicPosts('gift-guides', 3, [...shown, ...buyingGuides])
  const wellnessLead = POSTS_BY_SLUG[WELLNESS_LEAD]
  // Each guide appears once across the four columns.
  const wellnessShown: Post[] = wellnessLead ? [wellnessLead] : []
  const wellness = WELLNESS_TOPICS.map((slug) => TOPICS_BY_SLUG[slug])
    .filter((t) => t !== undefined)
    .map((topic) => {
      const posts = topicPosts(topic.slug, 3, wellnessShown)
      wellnessShown.push(...posts)
      return { topic, posts }
    })
    .filter(({ posts }) => posts.length > 0)
  const startHere = START_HERE.map((slug) => POSTS_BY_SLUG[slug]).filter((p) => p !== undefined)

  return (
    <div>
      <section className="wrap pt-3 sm:pt-10">
        <MobileSearchField className="mb-5" />
        <header className="max-w-4xl rise">
          <p className="eyebrow text-graphite">{SITE.guidesName} · Independent Reviews & Guides</p>
          <h1 className="mt-3 display-l max-sm:!text-[2.125rem]">Honest Sex Toy Reviews and Guides</h1>
          <p className="mt-4 lede text-graphite max-w-2xl">
            Plain-English reviews, buying guides, comparisons and sex education to help you choose with confidence and
            feel good in your body, solo or together.
          </p>
        </header>

        <div className="mt-8 sm:mt-12 grid lg:grid-cols-12 gap-6 lg:gap-10">
          {LEAD && (
            <Link
              to="/blog/$slug"
              params={{ slug: LEAD.slug }}
              className="group lg:col-span-7 flex flex-col justify-between rounded-3xl bg-blush p-7 sm:p-12 min-h-[20rem] sm:min-h-[26rem]"
            >
              <span className="block">
                <PostMeta post={LEAD} />
                <span className="mt-4 block font-display text-[2rem] sm:text-[3rem] font-bold tracking-[-0.04em] leading-[1.02] group-hover:underline underline-offset-[6px] decoration-2">
                  {LEAD.title}
                </span>
                <span className="mt-5 block lede text-graphite max-w-xl">{LEAD.excerpt}</span>
              </span>
              <span className="mt-8 more">Read the Guide</span>
            </Link>
          )}
          <div className="lg:col-span-5">
            <div className="flex items-baseline justify-between border-b border-ink pb-3">
              <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Latest</h2>
              <Link to="/blog" className="more">
                All Guides
              </Link>
            </div>
            <ul>
              {latest.map((post) => (
                <li key={post.slug} className="border-b border-line">
                  <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block py-4">
                    <PostMeta post={post} />
                    <h3 className="mt-1.5 font-display text-lg sm:text-xl font-semibold tracking-[-0.02em] leading-snug group-hover:underline underline-offset-4 decoration-1">
                      {post.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav aria-label="Guide topics" className="mt-8 sm:mt-10">
          <ul className="flex gap-2 overflow-x-auto max-sm:-mx-5 max-sm:px-5 [scrollbar-width:none] sm:flex-wrap">
            <li className="shrink-0">
              <Link to="/reviews" className="chip !bg-ink !border-ink text-canvas">
                Reviews
              </Link>
            </li>
            {TOPICS.map((t) => (
              <li key={t.slug} className="shrink-0">
                <Link to="/blog/topic/$topic" params={{ topic: t.slug }} className="chip">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {wellness.length > 0 && (
        <section aria-labelledby="wellness-heading" className="wrap pt-14 sm:pt-24 reveal">
          <div className="rounded-3xl bg-blush p-7 sm:p-12">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
              <div className="lg:col-span-5">
                <p className="eyebrow text-graphite">Sex Ed, Intimacy & Confidence</p>
                <h2 id="wellness-heading" className="mt-3 display-m">
                  The Sex Education Most of Us Never Got
                </h2>
                <p className="mt-4 text-graphite leading-relaxed max-w-md">
                  Plain, kind guides to how pleasure works, how to talk about it and how to feel at home in your body, with
                  a focus on women's confidence and choice.
                </p>
                {wellnessLead && (
                  <Link to="/blog/$slug" params={{ slug: wellnessLead.slug }} className="group mt-8 block border-t border-ink pt-5">
                    <PostMeta post={wellnessLead} />
                    <span className="mt-2 block font-display text-2xl sm:text-[1.75rem] font-bold tracking-[-0.03em] leading-tight group-hover:underline underline-offset-4 decoration-2">
                      {wellnessLead.title}
                    </span>
                    <span className="mt-3 block text-[0.9375rem] text-graphite leading-relaxed">{wellnessLead.excerpt}</span>
                  </Link>
                )}
              </div>
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-x-8 gap-y-8">
                {wellness.map(({ topic, posts }) => (
                  <div key={topic.slug}>
                    <Link
                      to="/blog/topic/$topic"
                      params={{ topic: topic.slug }}
                      className="flex items-baseline justify-between border-b border-ink pb-2 font-display text-lg font-semibold tracking-[-0.02em] hover:underline underline-offset-4"
                    >
                      {topic.name}
                    </Link>
                    <ul>
                      {posts.map((post) => (
                        <li key={post.slug} className="border-b border-petal">
                          <Link
                            to="/blog/$slug"
                            params={{ slug: post.slug }}
                            className="block py-3 text-[0.9375rem] leading-snug hover:underline underline-offset-4"
                          >
                            {post.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link to="/blog/topic/$topic" params={{ topic: topic.slug }} className="mt-3 more text-sm">
                      All {topic.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {topPicks.length > 0 && (
        <section className="wrap pt-14 sm:pt-24 reveal">
          <SectionHead
            title={topPicksLabel === 'Best Sellers' ? 'Best Sellers We Have Reviewed' : 'Our Top Picks'}
            sub="The toys we recommend most, with our full review a click away."
            to="/reviews"
            cta="All Reviews"
          />
          <ProductRow products={topPicks} />
        </section>
      )}

      {buyingGuides.length > 0 && (
        <section className="wrap pt-14 sm:pt-24 reveal">
          <SectionHead
            title="Buying Guides"
            sub="Our highest-rated picks in each category, with a budget option and the trade-offs."
            to="/blog/topic/$topic"
            params={{ topic: 'buying-guides' }}
            cta="All Buying Guides"
          />
          <PostGrid posts={buyingGuides} />
        </section>
      )}

      {comparisons.length > 0 && (
        <section className="wrap pt-14 sm:pt-24 grid lg:grid-cols-12 gap-10 reveal">
          <div className="lg:col-span-4">
            <h2 className="display-m">Head to Head</h2>
            <p className="mt-4 text-graphite leading-relaxed max-w-xs">
              Two popular choices side by side: feel, noise, build, app and price, then which one we would buy.
            </p>
            <Link to="/blog/topic/$topic" params={{ topic: 'comparisons' }} className="mt-6 more">
              All Comparisons
            </Link>
          </div>
          <ul className="lg:col-span-8 border-t border-ink">
            {comparisons.map((post) => (
              <li key={post.slug} className="border-b border-line">
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block py-6">
                  <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold tracking-[-0.03em] leading-tight group-hover:underline underline-offset-4 decoration-1">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] text-graphite leading-relaxed line-clamp-2">{post.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {firstPicks.length > 0 && (
        <section className="wrap pt-14 sm:pt-24 reveal">
          <SectionHead
            title="Best First Toys"
            sub="Gentle, simple to use and under $100. Our picks for a comfortable first try, solo or together."
            to="/blog/$slug"
            params={{ slug: 'sex-toys-for-beginners' }}
            cta="Read the Beginner's Guide"
          />
          <ProductRow products={firstPicks} />
        </section>
      )}

      {giftGuides.length > 0 && (
        <section className="wrap pt-14 sm:pt-24 reveal">
          <SectionHead
            title="Gift Guides"
            sub="A safe bet and a bolder pick for every person and budget."
            to="/blog/topic/$topic"
            params={{ topic: 'gift-guides' }}
            cta="All Gift Guides"
          />
          <PostGrid posts={giftGuides} />
        </section>
      )}

      {splurge.length > 0 && (
        <section className="wrap pt-14 sm:pt-24 grid lg:grid-cols-12 gap-10 reveal">
          <div className="lg:col-span-4">
            <h2 className="display-m">Worth the Splurge</h2>
            <p className="mt-4 text-graphite leading-relaxed max-w-xs">
              Quieter motors, softer materials and builds that last. Three premium toys our reviews say earn their price.
            </p>
            <Link to="/shop/$slug" params={{ slug: 'luxury-sex-toys' }} className="mt-6 more">
              See Premium Picks
            </Link>
          </div>
          <ul className="lg:col-span-8 border-t border-ink">
            {splurge.map((p) => (
              <li key={p.handle} className="border-b border-line">
                <Link
                  to="/products/$productId"
                  params={{ productId: p.handle }}
                  className="group grid grid-cols-[4.5rem_1fr_auto] sm:grid-cols-[6rem_1fr_auto] items-center gap-5 py-4"
                >
                  <span className="relative block aspect-square rounded-xl bg-stone overflow-hidden">
                    <img
                      src={getOptimizedImageUrl(p.image, 240)}
                      alt={`${p.title} by ${p.brand}`}
                      loading="lazy"
                      width={240}
                      height={240}
                      className="absolute inset-0 w-full h-full object-contain p-[14%] mix-blend-multiply saturate-[0.85]"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg sm:text-xl font-semibold tracking-[-0.02em] leading-snug group-hover:underline underline-offset-4 decoration-1">
                      {p.title}
                    </span>
                    <span className="block mt-0.5 text-sm text-graphite">
                      {p.brand}
                      {p.why && <span className="hidden sm:inline"> · {p.why}</span>}
                    </span>
                  </span>
                  <span className="text-[0.9375rem] font-medium tabular-nums">
                    {formatPrice(p.price)}
                    {p.compareAtPrice && (
                      <span className="block text-xs font-normal text-silver line-through text-right">{formatPrice(p.compareAtPrice)}</span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-16 sm:mt-24 bg-plum text-canvas">
        <div className="wrap py-16 sm:py-24 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 reveal">
            <p className="eyebrow text-petal">How We Review</p>
            <h2 className="mt-4 display-m">Picked and Explained by People Who Want You to Feel Good.</h2>
            <p className="mt-5 text-canvas/70 leading-relaxed max-w-md">
              {SITE.editorialTeam} compare materials, noise, power and price so you can choose without guesswork. We
              write the way a trusted friend would talk: plainly, kindly and without judgment.
            </p>
            <ul className="mt-8 space-y-4 max-w-md">
              {STANDARDS.map(([title, body]) => (
                <li key={title}>
                  <span className="block text-sm font-semibold">{title}</span>
                  <span className="block mt-0.5 text-sm text-canvas/60 leading-relaxed">{body}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/editorial-policy" className="btn btn-light">
                Our Editorial Policy
              </Link>
              <Link to="/about" className="btn-ghost border-canvas/30 text-canvas hover:border-canvas">
                About Us
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 reveal">
            <p className="eyebrow text-petal">New Here? Start With These</p>
            <ul className="mt-4 border-t border-plum-line">
              {startHere.map((post) => (
                <li key={post.slug} className="border-b border-plum-line">
                  <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block py-6">
                    <span className="block font-display text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-canvas/90 group-hover:text-canvas">
                      {post.title}
                    </span>
                    <span className="mt-1.5 block text-sm text-canvas/60 leading-relaxed line-clamp-2">{post.excerpt}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap pt-14 sm:pt-24 grid lg:grid-cols-12 gap-10 reveal">
        <h2 className="lg:col-span-4 display-m">Reviews and Advice for Every Body</h2>
        <div className="lg:col-span-8 grid md:grid-cols-2 gap-x-10 gap-y-5 text-[0.9375rem] leading-relaxed text-[#3a3a3c]">
          <p>
            {SITE.name} is an independent review site. We read the manuals, check the materials and compare the specs so you
            do not have to, then tell you who each toy suits. Start with our{' '}
            <Link to="/reviews" className="underline underline-offset-4">
              Lovense reviews
            </Link>
            , the{' '}
            <Link to="/blog/topic/$topic" params={{ topic: 'buying-guides' }} className="underline underline-offset-4">
              best-of buying guides
            </Link>{' '}
            or a{' '}
            <Link to="/blog/topic/$topic" params={{ topic: 'comparisons' }} className="underline underline-offset-4">
              head-to-head comparison
            </Link>
            .
          </p>
          <p>
            Toys are sold and shipped by the retailer you buy from, and we may earn a commission when you buy through our
            links. That never changes what we recommend. Pair any toy with a{' '}
            <Link to="/blog/$slug" params={{ slug: 'best-lube-for-sex-toys' }} className="underline underline-offset-4">
              lube that suits it
            </Link>{' '}
            and{' '}
            <Link to="/blog/$slug" params={{ slug: 'how-to-clean-sex-toys' }} className="underline underline-offset-4">
              keep it clean
            </Link>
            .
          </p>
          {hubs.length > 0 && (
            <p className="md:col-span-2 text-sm text-graphite">
              Browse toys by category:{' '}
              {hubs.map((hub, i) => (
                <span key={hub.slug}>
                  {i > 0 && (i === hubs.length - 1 ? ' and ' : ', ')}
                  <Link to="/category/$slug" params={{ slug: hub.slug }} className="text-ink underline underline-offset-4 decoration-silver">
                    {hub.name}
                  </Link>
                </span>
              ))}
              .
            </p>
          )}
        </div>
      </section>

      <section className="wrap pt-16">
        <AffiliateNotice />
      </section>
    </div>
  )
}
