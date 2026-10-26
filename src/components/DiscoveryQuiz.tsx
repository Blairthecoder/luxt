import { useId, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { COLLECTIONS_BY_SLUG } from '@/content/collections'
import { POSTS_BY_SLUG } from '@/content/posts'
import { trackEvent } from '@/lib/events'

type Answers = { who?: string; level?: string; focus?: string; budget?: string }

const QUESTIONS: { key: keyof Answers; legend: string; options: [string, string][] }[] = [
  { key: 'who', legend: 'Who are you shopping for?', options: [['self', 'Myself'], ['partner', 'Me and a partner'], ['gift', 'A gift']] },
  { key: 'level', legend: 'How new is this for you?', options: [['new', 'Brand new'], ['some', 'Some experience']] },
  {
    key: 'focus',
    legend: 'What matters most?',
    options: [
      ['quiet', 'Quiet and discreet'],
      ['connected', 'App or long-distance connection'],
      ['lingerie', 'Lingerie and feeling confident'],
      ['care', 'Comfort and care (lube, cleaning)'],
      ['simple', 'Keep it simple'],
    ],
  },
  { key: 'budget', legend: 'Roughly what is your budget?', options: [['50', 'Under $50'], ['100', 'Under $100'], ['more', 'Happy to spend more'], ['any', 'Not sure yet']] },
]

type Target = { kind: 'collection' | 'guide'; slug: string; why: string }

/** Rule-based matching: every result is an existing guide or curated collection. Nothing is inferred or stored. */
export function recommend(a: Answers): Target[] {
  const out: Target[] = []
  const add = (t: Target) => out.push(t)
  switch (a.focus) {
    case 'quiet':
      add({ kind: 'collection', slug: 'quiet-vibrators', why: 'Low-noise picks' })
      add({ kind: 'guide', slug: 'buying-sex-toys-discreetly', why: 'How private shipping and packaging work' })
      break
    case 'connected':
      add({ kind: 'collection', slug: 'app-controlled-sex-toys', why: 'App-controlled picks' })
      add({ kind: 'guide', slug: a.who === 'partner' ? 'long-distance-sex-toys' : 'lovense-vs-we-vibe', why: 'How the main options compare' })
      break
    case 'lingerie':
      add({ kind: 'guide', slug: 'how-to-feel-confident-in-lingerie', why: 'Finding pieces you love wearing' })
      add({ kind: 'collection', slug: 'comfortable-lingerie', why: 'Comfort-first lingerie' })
      break
    case 'care':
      add({ kind: 'collection', slug: 'water-based-lube', why: 'Water-based lubes' })
      add({ kind: 'guide', slug: 'how-to-clean-sex-toys', why: 'Cleaning and care basics' })
      break
    default:
      break
  }
  if (a.who === 'partner') {
    add({ kind: 'guide', slug: 'how-to-talk-to-your-partner-about-sex-toys', why: 'Starting the conversation' })
    add({ kind: 'collection', slug: 'couples-sex-toys', why: 'Products designed to share' })
  } else if (a.who === 'gift') {
    add({ kind: 'guide', slug: 'sex-toy-gifts-for-her', why: 'Gifts by budget and personality' })
  } else if (a.level === 'new') {
    add({ kind: 'guide', slug: 'sex-toys-for-beginners', why: 'Where to start' })
  }
  if (a.level === 'new' && a.who !== 'gift') add({ kind: 'collection', slug: 'sex-toys-for-beginners', why: 'Beginner-friendly picks' })
  if (a.budget === '50') add({ kind: 'collection', slug: 'sex-toys-under-50', why: 'Picks under $50' })
  if (a.budget === '100') add({ kind: 'collection', slug: 'sex-toys-under-100', why: 'Picks under $100' })
  if (a.budget === 'more') add({ kind: 'collection', slug: 'luxury-sex-toys', why: 'Premium picks' })
  const seen = new Set<string>()
  return out
    .filter((t) => (t.kind === 'collection' ? COLLECTIONS_BY_SLUG[t.slug] : POSTS_BY_SLUG[t.slug]) && !seen.has(t.slug) && seen.add(t.slug))
    .slice(0, 4)
}

/**
 * "Not Sure Where to Start?" Answers stay in component state only: nothing is
 * saved, and the single analytics event carries no answers.
 */
export function DiscoveryQuiz({ className = '' }: { className?: string }) {
  const [answers, setAnswers] = useState<Answers>({})
  const [done, setDone] = useState(false)
  const id = useId()
  const complete = QUESTIONS.every((q) => answers[q.key])
  const results = done ? recommend(answers) : []

  return (
    <section aria-labelledby={`${id}-title`} className={className}>
      <h2 id={`${id}-title`} className="display-m">
        Not Sure Where to Start?
      </h2>
      <p className="mt-3 text-graphite max-w-xl">
        Four quick questions point you to the right guides and picks. Your answers stay in this browser tab; we do not save or track them.
      </p>
      {!done ? (
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            if (!complete) return
            setDone(true)
            trackEvent('quiz_completed', { content_cluster: 'discovery' })
          }}
        >
          {QUESTIONS.map((q) => (
            <fieldset key={q.key}>
              <legend className="text-[0.9375rem] font-semibold">{q.legend}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {q.options.map(([value, label]) => (
                  <label key={value} className="cursor-pointer">
                    <input
                      type="radio"
                      name={`${id}-${q.key}`}
                      value={value}
                      checked={answers[q.key] === value}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.key]: value }))}
                      className="peer sr-only"
                    />
                    <span className="chip !min-h-[2.75rem] peer-checked:!bg-plum peer-checked:!border-plum peer-checked:text-canvas peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <button type="submit" disabled={!complete} className="btn disabled:opacity-40 disabled:cursor-not-allowed">
            Show My Starting Points
          </button>
        </form>
      ) : (
        <div className="mt-8" role="status">
          <p className="font-semibold">Here is where we would start:</p>
          {results.length === 0 ? (
            <p className="mt-3 text-graphite">Try our beginner guide for a gentle starting point.</p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {results.map((t) => (
                <li key={t.slug}>
                  {t.kind === 'guide' ? (
                    <Link to="/blog/$slug" params={{ slug: t.slug }} className="group block h-full rounded-2xl bg-canvas p-5 ring-1 ring-line">
                      <span className="text-xs font-semibold text-plum">Guide · {t.why}</span>
                      <span className="mt-1 block font-display text-lg font-semibold tracking-[-0.02em] leading-snug group-hover:underline underline-offset-4">
                        {POSTS_BY_SLUG[t.slug].title}
                      </span>
                    </Link>
                  ) : (
                    <Link to="/shop/$slug" params={{ slug: t.slug }} className="group block h-full rounded-2xl bg-canvas p-5 ring-1 ring-line">
                      <span className="text-xs font-semibold text-plum">Picks · {t.why}</span>
                      <span className="mt-1 block font-display text-lg font-semibold tracking-[-0.02em] leading-snug group-hover:underline underline-offset-4">
                        {COLLECTIONS_BY_SLUG[t.slug].name}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            className="mt-6 text-sm underline underline-offset-4"
            onClick={() => {
              setDone(false)
              setAnswers({})
            }}
          >
            Start over
          </button>
        </div>
      )}
    </section>
  )
}
