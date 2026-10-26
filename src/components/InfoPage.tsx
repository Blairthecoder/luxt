import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { SITE } from '@/config/site'

export interface InfoSection {
  /** Anchor id, for deep links such as /editorial-policy#corrections. */
  id?: string
  heading: string
  body?: string[]
  bullets?: string[]
}

const related = 'underline underline-offset-2 hover:text-ink'

/** Plain long-form page used by About, Editorial Policy, Contact and Partners. */
export function InfoPage({
  eyebrow,
  title,
  intro,
  sections,
  top,
  showContact = true,
}: {
  eyebrow: string
  title: string
  intro: string
  sections: InfoSection[]
  /** Optional block shown between the intro and the sections (stats, buttons). */
  top?: ReactNode
  showContact?: boolean
}) {
  return (
    <article className="wrap py-20 sm:py-32">
      <div className="max-w-3xl space-y-6 text-[1.0625rem] text-[#3a3a3c] leading-relaxed">
        <p className="eyebrow text-graphite">{eyebrow}</p>
        <h1 className="display-l text-ink !mt-3">{title}</h1>
        <p className="lede text-graphite">{intro}</p>
        {top}
        {sections.map((section) => (
          <section key={section.heading} id={section.id} className="space-y-3 pt-4 scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">{section.heading}</h2>
            {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && (
              <ul className="list-disc space-y-2 pl-6">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        {showContact && SITE.contactEmail && (
          <section className="space-y-3 pt-4">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">Contact</h2>
            <p>
              Email{' '}
              <a href={`mailto:${SITE.contactEmail}`} className="text-ink underline underline-offset-2">
                {SITE.contactEmail}
              </a>
              .
            </p>
          </section>
        )}
        <p className="pt-4 text-sm text-graphite">
          Related:{' '}
          <Link to="/about" className={related}>
            About
          </Link>
          {' · '}
          <Link to="/editorial-policy" className={related}>
            Editorial Policy
          </Link>
          {' · '}
          <Link to="/disclosure" className={related}>
            Affiliate Disclosure
          </Link>
          {' · '}
          <Link to="/partners" className={related}>
            Partners
          </Link>
        </p>
      </div>
    </article>
  )
}
