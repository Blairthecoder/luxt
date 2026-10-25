import { Link, createFileRoute } from '@tanstack/react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FaqAccordion } from '@/components/FaqAccordion'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { KIT_CARDS, KIT_CONTENTS, KIT_DAYS, KIT_FAQ, KIT_PROMPTS } from '@/content/confidence-kit'
import { POSTS_BY_SLUG } from '@/content/posts'
import { SITE } from '@/config/site'
import { breadcrumbJsonLd, faqJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/confidence-kit/')({
  head: () =>
    pageHead({
      title: `Free Confidence Kit: Body Confidence Exercises & Lingerie Fit Guide | ${SITE.shortName}`,
      description:
        'A free printable for feeling at home in your body: a 7-day confidence reset, a lingerie fit guide for every body, journal prompts and date-night conversation cards.',
      path: '/confidence-kit',
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Confidence Kit', path: '/confidence-kit' },
        ]),
        faqJsonLd(KIT_FAQ),
      ],
    }),
  component: ConfidenceKitPage,
})

const RELATED = [
  'how-to-feel-confident-in-lingerie',
  'how-to-feel-confident-in-bed',
  'sexual-confidence-after-divorce',
  'boudoir-photoshoot-tips',
]
  .map((slug) => POSTS_BY_SLUG[slug])
  .filter((post) => post !== undefined)

function ConfidenceKitPage() {
  return (
    <div className="wrap pt-6 pb-20 sm:pb-32">
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Confidence Kit', path: '/confidence-kit' },
        ]}
      />

      <section className="mt-6 grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-6">
          <p className="eyebrow text-graphite">Free Printable · {SITE.guidesName}</p>
          <h1 className="mt-3 display-l">The Confidence Kit</h1>
          <p className="mt-5 lede text-graphite max-w-xl">
            Feel at home in your body. Seven small exercises, a lingerie fit guide for every body, journal prompts for loud
            days and conversation cards for date night. Free, printable and yours to keep.
          </p>
          <NewsletterSignup source="kit:landing" title="Send Me the Kit" className="mt-8" />
        </div>
        <ul className="lg:col-span-5 lg:col-start-8 border-t border-ink self-start">
          {KIT_CONTENTS.map((item) => (
            <li key={item.title} className="border-b border-line py-5">
              <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">{item.title}</h2>
              <p className="mt-1 text-[0.9375rem] text-graphite leading-relaxed">{item.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="preview-heading" className="mt-20 sm:mt-28 reveal">
        <h2 id="preview-heading" className="display-m">
          A Look Inside
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          <div className="rounded-2xl bg-blush p-6">
            <p className="eyebrow text-graphite">Day {KIT_DAYS[0].day}</p>
            <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em]">{KIT_DAYS[0].title}</h3>
            <p className="mt-3 text-[0.9375rem] text-graphite leading-relaxed">{KIT_DAYS[0].body}</p>
          </div>
          <div className="rounded-2xl bg-mist p-6">
            <p className="eyebrow text-graphite">Prompt</p>
            <p className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] leading-snug">{KIT_PROMPTS[4]}</p>
          </div>
          <div className="rounded-2xl bg-petal p-6">
            <p className="eyebrow text-graphite">Date-Night Card</p>
            <p className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] leading-snug">{KIT_CARDS[0]}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="kit-faq" className="mt-20 sm:mt-28 max-w-3xl reveal">
        <h2 id="kit-faq" className="display-m mb-6">
          Questions About the Kit
        </h2>
        <FaqAccordion faqs={KIT_FAQ} />
      </section>

      <section className="mt-20 sm:mt-28 reveal">
        <h2 className="display-m">Keep Reading</h2>
        <ul className="mt-6 grid sm:grid-cols-2 gap-x-10 border-t border-line">
          {RELATED.map((post) => (
            <li key={post.slug} className="border-b border-line">
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block py-4 text-[1.0625rem] hover:underline underline-offset-4"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
