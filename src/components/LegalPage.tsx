import { Link } from '@tanstack/react-router'
import { SITE } from '@/config/site'
import type { LegalDoc } from '@/content/legal'

const related = 'underline underline-offset-2 hover:text-ink'

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <article className="wrap py-20 sm:py-32">
      <div className="max-w-3xl space-y-6 text-[1.0625rem] text-[#3a3a3c] leading-relaxed">
        <p className="eyebrow text-graphite">Legal</p>
        <h1 className="display-l text-ink !mt-3">{doc.title}</h1>
        <p className="text-sm text-graphite">Last updated {doc.updated}</p>
        <p>{doc.intro}</p>
        {doc.sections.map((section) => (
          <section key={section.heading} className="space-y-3 pt-4">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul className="list-disc space-y-2 pl-6">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        {SITE.contactEmail && (
          <section className="space-y-3 pt-4">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">Contact</h2>
            <p>
              Questions about this page? Email us at{' '}
              <a href={`mailto:${SITE.contactEmail}`} className="text-ink underline underline-offset-2">
                {SITE.contactEmail}
              </a>
              .
            </p>
          </section>
        )}
        <p className="pt-4 text-sm text-graphite">
          Related:{' '}
          <Link to="/privacy" className={related}>
            Privacy Policy
          </Link>
          {' · '}
          <Link to="/terms" className={related}>
            Terms of Use
          </Link>
          {' · '}
          <Link to="/disclosure" className={related}>
            Affiliate Disclosure
          </Link>
        </p>
      </div>
    </article>
  )
}
