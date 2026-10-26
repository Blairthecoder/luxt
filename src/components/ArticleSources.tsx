import { Link } from '@tanstack/react-router'
import { SOURCES_BY_ID } from '@/content/sources'

/** "How this guide was prepared" note and numbered References, matching the [n] markers in the body. */
export function ArticleSources({ ids, howPrepared, className = '' }: { ids: string[]; howPrepared?: string; className?: string }) {
  const sources = ids.map((id) => SOURCES_BY_ID[id]).filter(Boolean)
  if (!sources.length && !howPrepared) return null
  return (
    <section aria-labelledby="references-heading" className={className}>
      {howPrepared && (
        <div className="mb-10 rounded-2xl bg-stone p-5 sm:p-6 text-[0.9375rem] leading-relaxed text-graphite">
          <p className="font-semibold text-ink">How this guide was prepared</p>
          <p className="mt-1">{howPrepared}</p>
          <p className="mt-2">
            Found a mistake?{' '}
            <Link to="/editorial-policy" hash="corrections" className="text-ink underline underline-offset-2">
              Report a correction
            </Link>
            .
          </p>
        </div>
      )}
      {sources.length > 0 && (
        <>
          <h2 id="references-heading" className="font-display text-2xl font-semibold tracking-[-0.02em]">
            References
          </h2>
          <ol className="mt-5 space-y-5 text-[0.9375rem] leading-relaxed text-graphite">
            {sources.map((s, i) => (
              <li key={s.id} id={`ref-${s.id}`} className="scroll-mt-24 grid grid-cols-[2rem_1fr]">
                <span className="text-silver">{i + 1}.</span>
                <div>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink underline underline-offset-4 decoration-silver hover:decoration-ink"
                  >
                    {s.title}
                  </a>
                  <p>
                    {s.authors}, {s.publisher}, {s.year}. {s.type}.{s.doi ? ` DOI ${s.doi}.` : ''}
                  </p>
                  <p className="mt-1">
                    <span className="font-medium text-ink">Limits:</span> {s.limits}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  )
}
