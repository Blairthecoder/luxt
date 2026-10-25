import { Link, createFileRoute } from '@tanstack/react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { EroticaGrid } from '@/components/EroticaCard'
import { EROTICA, READING_LISTS, STORIES } from '@/content/erotica'
import { POSTS_BY_SLUG } from '@/content/posts'
import { SITE, absoluteUrl } from '@/config/site'
import { breadcrumbJsonLd, faqJsonLd, pageHead } from '@/lib/seo'

const FAQS = [
  {
    q: 'Is the erotica on Nightstand Supply explicit?',
    a: 'No. Our stories are sensual and romantic rather than graphic. They focus on desire, confidence, consent and connection, and the door closes before anything explicit. Every character is an adult.',
  },
  {
    q: 'Who is the erotica section for?',
    a: 'Adults 18 and over, especially women who want stories that feel warm, confident and grown-up, and couples looking for something to read together.',
  },
  {
    q: 'Can reading erotica help with desire?',
    a: 'For many people, yes. Arousal often starts in the mind, and stories give your imagination somewhere to go. Sex educators often suggest reading as a gentle way to build anticipation, alone or with a partner.',
  },
]

/** Guides that pair well with the stories: confidence first, then intimacy. */
const PAIRS = ['how-to-feel-confident-in-lingerie', 'solo-date-night-ideas', 'responsive-vs-spontaneous-desire', 'how-to-spice-up-your-marriage']

export const Route = createFileRoute('/erotica/')({
  head: () =>
    pageHead({
      title: `Erotica for Women: Sensual Stories & Steamy Reads | ${SITE.shortName}`,
      description:
        'Tasteful erotica for women: original sensual short stories about confidence, desire and connection, plus steamy romance reading lists. For adults 18+.',
      path: '/erotica',
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Erotica', path: '/erotica' },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Erotica for Women',
          url: absoluteUrl('/erotica'),
          isFamilyFriendly: false,
          audience: { '@type': 'PeopleAudience', suggestedMinAge: 18 },
          hasPart: EROTICA.map((e) => ({
            '@type': e.kind === 'story' ? 'ShortStory' : 'Article',
            headline: e.title,
            url: absoluteUrl(`/erotica/${e.slug}`),
          })),
        },
        faqJsonLd(FAQS),
      ],
    }),
  component: EroticaHub,
})

function EroticaHub() {
  const pairs = PAIRS.map((slug) => POSTS_BY_SLUG[slug]).filter((p) => p !== undefined)
  return (
    <div className="wrap">
      <header className="pt-6 pb-12 sm:pb-16">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Erotica', path: '/erotica' },
          ]}
        />
        <div className="mt-14 sm:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 rise">
            <p className="eyebrow text-graphite">Erotica · For Adults 18+</p>
            <h1 className="mt-3 display-l">Erotica for Women: Sensual Stories and Steamy Reads</h1>
          </div>
          <div className="lg:col-span-5 rise-delay">
            <p className="text-[1.0625rem] leading-relaxed text-graphite">
              Original short stories about wanting, being wanted and feeling at home in your own skin, plus reading lists
              for every heat level. Romantic, grown-up and never graphic.
            </p>
          </div>
        </div>
      </header>

      <section id="stories" aria-labelledby="stories-heading" className="scroll-mt-28">
        <div className="section-head">
          <div>
            <h2 id="stories-heading" className="display-m">
              Sensual Short Stories
            </h2>
            <p className="mt-2 text-graphite">Confidence, desire and connection, written for women. Each one reads in under ten minutes.</p>
          </div>
        </div>
        <EroticaGrid entries={STORIES} />
      </section>

      <section id="reading-lists" aria-labelledby="reading-heading" className="pt-14 sm:pt-24 scroll-mt-28">
        <div className="section-head">
          <div>
            <h2 id="reading-heading" className="display-m">
              Reading Lists
            </h2>
            <p className="mt-2 text-graphite">Romance, erotica and confidence-building nonfiction, sorted so you can pick your heat level.</p>
          </div>
        </div>
        <EroticaGrid entries={READING_LISTS} />
      </section>

      <section className="pt-14 sm:pt-24 grid lg:grid-cols-12 gap-10 reveal">
        <div className="lg:col-span-4">
          <h2 className="display-m">Set the Mood</h2>
          <p className="mt-4 text-graphite leading-relaxed max-w-xs">
            A story is a lovely start to an evening for yourself or with a partner. These pair well.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link to="/category/$slug" params={{ slug: 'lingerie' }} className="btn-ghost">
              Shop Lingerie
            </Link>
            <Link to="/blog/topic/$topic" params={{ topic: 'body-confidence' }} className="btn-ghost">
              Confidence Guides
            </Link>
          </div>
        </div>
        <ul className="lg:col-span-8 border-t border-ink">
          {pairs.map((post) => (
            <li key={post.slug} className="border-b border-line">
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block py-6">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] leading-tight group-hover:underline underline-offset-4 decoration-1">
                  {post.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] text-graphite leading-relaxed line-clamp-2">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-14 sm:pt-24 max-w-3xl">
        <h2 className="display-m">About Our Erotica</h2>
        <dl className="mt-8 border-t border-line">
          {FAQS.map((faq) => (
            <div key={faq.q} className="py-6 border-b border-line">
              <dt className="font-display text-xl font-semibold tracking-[-0.02em]">{faq.q}</dt>
              <dd className="mt-2 text-graphite text-[1.0625rem] leading-relaxed">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
