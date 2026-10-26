import { Link, createFileRoute } from '@tanstack/react-router'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { MerchantPicksSection } from '@/components/MerchantPicks'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { PostMeta } from '@/components/PostGrid'
import { POSTS_BY_SLUG } from '@/content/posts'
import { SITE, absoluteUrl } from '@/config/site'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

const PATH = '/guides/intimacy-and-connection'
const TITLE = 'Explore Intimacy, Confidence & Connection'
const INTRO =
  'Curious about creating more connection, discovering personal wellness products, or finding practical intimacy guidance? Explore helpful resources and thoughtfully selected recommendations.'

const CONFIDENCE = ['how-to-feel-confident-in-bed', 'self-pleasure-guide-for-women', 'sex-toys-for-beginners', 'how-to-ask-for-what-you-want-in-bed']
const TOGETHER = ['non-sexual-intimacy-ideas', 'how-to-talk-to-your-partner-about-sex-toys', 'sensate-focus-exercises-for-couples', 'how-to-use-sex-toys-with-a-partner']
const BUYING = ['sex-toys-for-beginners', 'best-couples-sex-toys', 'best-lube-for-sex-toys', 'how-to-clean-sex-toys']
const KEEP_EXPLORING = ['responsive-vs-spontaneous-desire', 'what-is-aftercare', 'mismatched-libido-in-relationships', 'consent-in-long-term-relationships']

const pick = (slugs: string[]) => slugs.map((s) => POSTS_BY_SLUG[s]).filter(Boolean)

export const Route = createFileRoute('/guides/intimacy-and-connection')({
  head: () =>
    pageHead({
      title: `${TITLE} | ${SITE.shortName}`,
      description:
        'Practical guides to confidence, communication and closeness, plus thoughtfully selected personal wellness products with clear reasons and disclosed affiliate links.',
      path: PATH,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Intimacy & Connection', path: PATH },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: TITLE,
          description: INTRO,
          url: absoluteUrl(PATH),
          publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Intimacy and connection guides',
          itemListElement: [...CONFIDENCE, ...TOGETHER, ...BUYING, ...KEEP_EXPLORING]
            .filter((s, i, a) => a.indexOf(s) === i && POSTS_BY_SLUG[s])
            .map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: POSTS_BY_SLUG[s].title, url: absoluteUrl(`/blog/${s}`) })),
        },
      ],
    }),
  component: IntimacyLanding,
})

function GuideList({ slugs, cluster }: { slugs: string[]; cluster: string }) {
  return (
    <ul className="border-t border-ink">
      {pick(slugs).map((post) => (
        <li key={post.slug} className="border-b border-line">
          <Link to="/blog/$slug" params={{ slug: post.slug }} data-cluster={cluster} className="group block py-5">
            <PostMeta post={post} />
            <span className="mt-1.5 block font-display text-lg font-semibold leading-snug tracking-[-0.02em] group-hover:underline underline-offset-4 sm:text-xl">
              {post.title}
            </span>
            <span className="mt-1.5 line-clamp-2 block text-sm leading-relaxed text-graphite">{post.excerpt}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function Block({ id, eyebrow, title, blurb, children }: { id: string; eyebrow: string; title: string; blurb: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`${id}-title`} className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="eyebrow text-graphite">{eyebrow}</p>
        <h2 id={`${id}-title`} className="mt-2 display-m">
          {title}
        </h2>
        <p className="mt-3 max-w-sm leading-relaxed text-graphite">{blurb}</p>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </section>
  )
}

function IntimacyLanding() {
  return (
    <div>
      <header className="wrap pt-6 pb-12 sm:pb-16">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Intimacy & Connection', path: PATH }]} />
        <p className="mt-14 eyebrow text-graphite rise sm:mt-20">Guides</p>
        <h1 className="mt-3 display-l max-w-4xl rise max-sm:!text-[2.125rem]">{TITLE}</h1>
        <p className="mt-6 lede max-w-2xl text-graphite rise-delay">{INTRO}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-graphite">
          {SITE.name} is an independent publisher for adults 18 and older. Everything here is education first; where we recommend
          a product, we say who it suits and why, and we disclose that we may earn a commission.
        </p>
      </header>

      <div className="wrap grid gap-16 sm:gap-24">
        <Block
          id="confidence"
          eyebrow="Step one"
          title="Start With Confidence"
          blurb="Feeling at ease in your own body makes everything else easier. These guides move at your pace."
        >
          <GuideList slugs={CONFIDENCE} cluster="landing_confidence" />
        </Block>

        <Block
          id="together"
          eyebrow="Step two"
          title="Explore Together"
          blurb="Closeness grows from conversation and small habits. Start with these, then see products made to share."
        >
          <GuideList slugs={TOGETHER} cluster="landing_together" />
        </Block>
        <MerchantPicksSection intent="couples" context="landing_intimacy" limit={3} id="ltx-couples" />

        <Block
          id="products"
          eyebrow="Step three"
          title="Discover Thoughtful Products"
          blurb="Buying guides explain how to choose. The picks below are a short, curated starting point."
        >
          <GuideList slugs={BUYING} cluster="landing_buying" />
        </Block>
        <MerchantPicksSection intent="beginners" context="landing_intimacy" limit={4} />
        <p className="max-w-2xl text-sm text-graphite">
          See every curated group in{' '}
          <Link to="/shop" className="text-ink underline underline-offset-4">
            Shop Our Picks
          </Link>{' '}
          or read the{' '}
          <Link to="/brands/luxury-toy-x" className="text-ink underline underline-offset-4">
            Luxury Toy X shopping guide
          </Link>
          .
        </p>

        <Block
          id="keep-exploring"
          eyebrow="Keep going"
          title="Keep Exploring"
          blurb="More on desire, consent and closeness, written plainly and without judgment."
        >
          <GuideList slugs={KEEP_EXPLORING} cluster="landing_more" />
          <NewsletterSignup source="landing:intimacy-and-connection" className="mt-10" />
        </Block>

        <AffiliateNotice className="border-t border-line pt-6" />
      </div>
    </div>
  )
}
