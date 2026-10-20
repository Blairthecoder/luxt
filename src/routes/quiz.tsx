import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { SITE, absoluteUrl } from '@/config/site'
import { COLLECTIONS_BY_SLUG } from '@/content/collections'
import { QUIZ_QUESTIONS, QUIZ_RESULTS, quizResults, type QuizAnswers, type QuizResult } from '@/content/quiz'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/quiz')({
  head: () =>
    pageHead({
      title: `Sex Toy Quiz: Which Toy Is Right for You? | ${SITE.shortName}`,
      description:
        'Answer four quick questions and get a sex toy recommendation that fits your body, experience and budget, with a guide to read before you buy.',
      path: '/quiz',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Sex Toy Quiz: Which Toy Is Right for You?',
          url: absoluteUrl('/quiz'),
        },
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Toy Finder', path: '/quiz' },
        ]),
      ],
    }),
  component: QuizPage,
})

function ResultCard({ result, primary = false }: { result: QuizResult; primary?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 ${primary ? 'bg-blush' : 'bg-mist'}`}>
      {primary && <p className="eyebrow text-graphite mb-2">Your best match</p>}
      <h3 className="text-xl font-semibold text-ink">{result.name}</h3>
      <p className="mt-2 text-graphite leading-relaxed">{result.summary}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link to="/shop/$slug" params={{ slug: result.collection }} className="btn">
          Shop {COLLECTIONS_BY_SLUG[result.collection]?.name ?? 'Now'}
        </Link>
        <Link to="/blog/$slug" params={{ slug: result.guide }} className="btn-ghost">
          Read: {result.guideLabel}
        </Link>
      </div>
    </div>
  )
}

function QuizPage() {
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [step, setStep] = useState(0)
  const done = step >= QUIZ_QUESTIONS.length
  const question = QUIZ_QUESTIONS[step]
  const results = done ? quizResults(answers) : []

  const choose = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
    setStep((s) => s + 1)
  }

  const restart = () => {
    setAnswers({})
    setStep(0)
  }

  return (
    <div className="wrap py-20 sm:py-32">
      <div className="max-w-3xl">
        <p className="eyebrow text-graphite">Toy Finder</p>
        <h1 className="display-l text-ink mt-3">Which Sex Toy Is Right for You?</h1>
        <p className="mt-6 lede text-graphite">
          Four quick questions, no sign-up. You get one best match, two alternatives and the guide to read before you
          buy. Nothing you choose is saved.
        </p>

        <section aria-live="polite" className="mt-12 rounded-3xl border border-line p-6 sm:p-10">
          {!done ? (
            <>
              <p className="text-sm text-graphite">
                Question {step + 1} of {QUIZ_QUESTIONS.length}
              </p>
              <h2 className="display-m text-ink mt-2">{question.question}</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => choose(option.value)}
                    className="text-left rounded-2xl bg-mist hover:bg-line transition-colors px-5 py-4 font-medium text-ink"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-6 text-sm text-graphite underline underline-offset-2">
                  Back
                </button>
              )}
            </>
          ) : (
            <>
              <h2 className="display-m text-ink">Your Matches</h2>
              <div className="mt-6 space-y-4">
                {results.map((result, i) => (
                  <ResultCard key={result.id} result={result} primary={i === 0} />
                ))}
              </div>
              <button type="button" onClick={restart} className="mt-6 text-sm text-graphite underline underline-offset-2">
                Start over
              </button>
            </>
          )}
        </section>

        <section className="mt-20">
          <h2 className="display-m text-ink">Every Recommendation, at a Glance</h2>
          <p className="mt-4 text-graphite leading-relaxed">
            Not in the mood for a quiz? These are all the toys the finder can recommend and who each one suits. New to
            all of this? Start with our{' '}
            <Link to="/blog/$slug" params={{ slug: 'sex-toys-for-beginners' }} className="text-ink underline underline-offset-2">
              beginner&apos;s guide
            </Link>{' '}
            or the{' '}
            <Link to="/glossary" className="text-ink underline underline-offset-2">
              glossary
            </Link>
            .
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {QUIZ_RESULTS.map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
