import { createFileRoute } from '@tanstack/react-router'
import { SITE, absoluteUrl } from '@/config/site'
import { GLOSSARY } from '@/content/glossary'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

const LETTERS = [...new Set(GLOSSARY.map((t) => t.term[0].toUpperCase()))]

export const Route = createFileRoute('/glossary')({
  head: () =>
    pageHead({
      title: `Sex Toy Glossary: ${GLOSSARY.length} Terms Explained | ${SITE.shortName}`,
      description:
        'Plain-English sex toy glossary: what air pulse, body-safe, flared base, TPE, hybrid lube, O-ring and other terms mean, with links to guides that go deeper.',
      path: '/glossary',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          '@id': absoluteUrl('/glossary'),
          name: `${SITE.shortName} Sex Toy Glossary`,
          url: absoluteUrl('/glossary'),
          hasDefinedTerm: GLOSSARY.map((t) => ({
            '@type': 'DefinedTerm',
            name: t.term,
            description: t.definition,
            url: absoluteUrl(`/glossary#${t.slug}`),
            inDefinedTermSet: absoluteUrl('/glossary'),
          })),
        },
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: SITE.guidesName, path: '/blog' },
          { name: 'Glossary', path: '/glossary' },
        ]),
      ],
    }),
  component: GlossaryPage,
})

function GlossaryPage() {
  return (
    <article className="wrap py-20 sm:py-32">
      <div className="max-w-3xl">
        <p className="eyebrow text-graphite">{SITE.guidesName}</p>
        <h1 className="display-l text-ink mt-3">Sex Toy Glossary</h1>
        <p className="mt-6 lede text-graphite">
          Short, plain definitions of the words you will see on product pages and in our guides, from air pulse to
          yes/no/maybe lists. Each term links to the guide that explains it in more depth.
        </p>

        <nav aria-label="Jump to letter" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {LETTERS.map((letter) => (
              <li key={letter}>
                <a
                  href={`#letter-${letter}`}
                  className="inline-flex items-center justify-center h-9 min-w-9 px-3 rounded-full bg-mist text-sm font-medium hover:bg-line transition-colors"
                >
                  {letter}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {LETTERS.map((letter) => (
          <section key={letter} id={`letter-${letter}`} className="mt-14 scroll-mt-24">
            <h2 className="display-m text-ink border-b border-line pb-3">{letter}</h2>
            <dl className="mt-6 space-y-8">
              {GLOSSARY.filter((t) => t.term[0].toUpperCase() === letter).map((t) => (
                <div key={t.slug} id={t.slug} className="scroll-mt-24">
                  <dt className="text-lg font-semibold text-ink">{t.term}</dt>
                  <dd className="mt-2 text-[1.0625rem] text-[#3a3a3c] leading-relaxed">
                    {t.definition}
                    {t.link && (
                      <>
                        {' '}
                        <a href={t.link.href} className="text-ink underline underline-offset-2">
                          {t.link.label}
                        </a>
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </article>
  )
}
