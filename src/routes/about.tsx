import { Link, createFileRoute } from '@tanstack/react-router'
import { SITE, absoluteUrl } from '@/config/site'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/about')({
  head: () =>
    pageHead({
      title: `About Us & Editorial Standards | ${SITE.shortName}`,
      description: `Who writes ${SITE.guidesName}, how we choose the products we feature, how guides are reviewed and updated, and how ${SITE.name} makes money.`,
      path: '/about',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `About ${SITE.name}`,
          url: absoluteUrl('/about'),
          about: { '@type': 'Organization', name: SITE.name, url: SITE.url, description: SITE.description },
        },
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]),
      ],
    }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <article className="wrap py-20 sm:py-32">
      <div className="max-w-3xl space-y-6 text-[1.0625rem] text-[#3a3a3c] leading-relaxed">
        <p className="eyebrow text-graphite">About Us</p>
        <h1 className="display-l text-ink !mt-3 pb-6">About {SITE.name}</h1>
        <p>
          {SITE.name} helps adults choose toys that feel good, with plain, judgment-free advice. We cover vibrators,
          strokers, couples toys, lube and care, and we write for people who want a straight answer and a comfortable
          place to shop, whether it is their first toy or their tenth.
        </p>

        <h2 className="display-m text-ink !mt-12">What We Publish</h2>
        <p>
          {SITE.guidesName} is our library of buying guides, comparisons, how-tos and reference pages such as the{' '}
          <Link to="/blog/$slug" params={{ slug: 'body-safe-sex-toy-materials' }} className="text-ink underline underline-offset-2">
            body-safe materials chart
          </Link>
          , the{' '}
          <Link to="/glossary" className="text-ink underline underline-offset-2">
            glossary
          </Link>{' '}
          and the{' '}
          <Link to="/quiz" className="text-ink underline underline-offset-2">
            toy finder
          </Link>
          . Our writing is warm and practical. We do not publish explicit content.
        </p>

        <h2 className="display-m text-ink !mt-12">How We Choose Products</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We favor body-safe materials such as silicone, glass and stainless steel, and say so when a pick is not.</li>
          <li>We look at the specs that matter for the job: power, noise, size, charging, waterproofing and ease of cleaning.</li>
          <li>We include picks at different prices, including the cheaper option when it is the better buy.</li>
          <li>Product cards show live prices from our retail partner, so we never type prices into a guide.</li>
          <li>Commissions never decide what we recommend.</li>
        </ul>

        <h2 className="display-m text-ink !mt-12">Accuracy, Health Topics and Updates</h2>
        <p>
          Guides that touch on health, such as menopause, postpartum, erectile changes or chronic pain, are written to
          be cautious. They explain practical options and tell you when to see a doctor. They are not medical advice.
          When a guide has been reviewed by a credentialed professional, the reviewer is named at the top of the guide.
        </p>
        <p>
          We update buying guides when products change and show the date on every guide. If you spot something that
          is out of date or wrong, we want to fix it.
        </p>

        <h2 className="display-m text-ink !mt-12">How We Make Money</h2>
        <p>
          We are reader-supported. When you buy through our links we may earn a commission, at no extra cost to you.
          Orders are placed, shipped and supported by our retail partner. Read our full{' '}
          <Link to="/disclosure" className="text-ink underline underline-offset-2">
            affiliate disclosure
          </Link>
          .
        </p>

        <p className="!mt-12">Every product on this site is intended for adults 18 and older.</p>
      </div>
    </article>
  )
}
