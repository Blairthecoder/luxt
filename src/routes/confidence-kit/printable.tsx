import { createFileRoute } from '@tanstack/react-router'
import { Logo } from '@/components/Logo'
import {
  FIT_CHECKS,
  FIT_MEASURE,
  FIT_STYLES,
  KIT_CARDS,
  KIT_DAYS,
  KIT_PROMPTS,
} from '@/content/confidence-kit'
import { SITE } from '@/config/site'
import { KIT_PDF } from '@/lib/subscribe'
import { pageHead } from '@/lib/seo'

// The kit itself. Linked after signup and from the welcome emails, kept out of
// the index so the landing page is the one that ranks.
export const Route = createFileRoute('/confidence-kit/printable')({
  head: () =>
    pageHead({
      title: `The Confidence Kit (Printable) | ${SITE.shortName}`,
      description: 'Your printable Confidence Kit from Nightstand Notes.',
      path: '/confidence-kit/printable',
      noindex: true,
    }),
  component: PrintableKit,
})

const h2 = 'font-display text-3xl font-semibold tracking-[-0.02em]'
const page = 'kit-page py-10 sm:py-14 border-b border-line print:border-0 print:py-0'

function PrintableKit() {
  return (
    <article className="kit-print wrap max-w-4xl pt-8 pb-20">
      <div className="no-print flex flex-wrap gap-3">
        <a href={KIT_PDF} download className="btn">
          Download the PDF
        </a>
        <button type="button" onClick={() => print()} className="btn-ghost">
          Print
        </button>
      </div>

      <section className={page}>
        <Logo className="h-12 w-auto" />
        <p className="mt-12 eyebrow text-graphite">{SITE.guidesName}</p>
        <h1 className="mt-3 display-l">The Confidence Kit</h1>
        <p className="mt-5 lede text-graphite max-w-2xl">
          Feel at home in your body. This kit is not about fixing anything. It is a handful of small, kind practices for
          feeling like yourself: in the mirror, in what you wear and with the people you are close to.
        </p>
        <ol className="mt-10 border-t border-ink">
          {['The 7-Day Confidence Reset', 'The Lingerie Fit Guide', '10 Confidence Prompts', '12 Date-Night Conversation Cards'].map(
            (title, i) => (
              <li key={title} className="flex gap-4 border-b border-line py-4 text-lg">
                <span className="text-graphite tabular-nums">0{i + 1}</span>
                {title}
              </li>
            ),
          )}
        </ol>
        <p className="mt-10 text-sm text-graphite">
          How to use it: do one reset exercise a day for a week, keep the fit guide handy when you shop, reach for a prompt
          when your inner critic gets loud, and cut out the cards for your next night in.
        </p>
      </section>

      <section className={page}>
        <p className="eyebrow text-graphite">01</p>
        <h2 className={`mt-2 ${h2}`}>The 7-Day Confidence Reset</h2>
        <p className="mt-3 text-graphite">About ten minutes a day. Tick each one off when you are done.</p>
        <ol className="mt-8 space-y-6">
          {KIT_DAYS.map((d) => (
            <li key={d.day} className="kit-card grid grid-cols-[3.5rem_1fr] gap-4">
              <span className="font-display text-3xl font-semibold text-graphite tabular-nums">{d.day}</span>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
                  <span aria-hidden="true" className="mr-2 inline-block h-4 w-4 rounded border border-ink align-[-2px]" />
                  {d.title}
                </h3>
                <p className="mt-1.5 leading-relaxed text-[#3a3a3c]">{d.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={page}>
        <p className="eyebrow text-graphite">02</p>
        <h2 className={`mt-2 ${h2}`}>The Lingerie Fit Guide</h2>
        <p className="mt-3 text-graphite">
          Sizes vary by brand, so measure once and check every size chart. A piece that does not fit is the wrong size, never
          the wrong body.
        </p>
        <h3 className="mt-8 font-display text-xl font-semibold">Measure at Home</h3>
        <p className="mt-1 text-sm text-graphite">Use a soft tape, stand relaxed and breathe normally. Write your numbers in.</p>
        <table className="mt-4 w-full text-left text-[0.9375rem]">
          <tbody>
            {FIT_MEASURE.map((m) => (
              <tr key={m.name} className="border-b border-line align-top">
                <th className="py-3 pr-4 font-semibold w-28">{m.name}</th>
                <td className="py-3 pr-4 text-[#3a3a3c]">{m.how}</td>
                <td className="py-3 w-24">
                  <span className="block border-b border-ink h-6" aria-label={`${m.name} measurement`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="mt-10 font-display text-xl font-semibold">What to Size By, Style by Style</h3>
        <ul className="mt-4 space-y-3">
          {FIT_STYLES.map((s) => (
            <li key={s.style} className="text-[0.9375rem] leading-relaxed">
              <span className="font-semibold">{s.style}:</span> <span className="text-[#3a3a3c]">{s.rule}</span>
            </li>
          ))}
        </ul>
        <h3 className="mt-10 font-display text-xl font-semibold">Five Checks in the Mirror</h3>
        <ul className="mt-4 space-y-2">
          {FIT_CHECKS.map((c) => (
            <li key={c} className="flex gap-3 text-[0.9375rem] leading-relaxed">
              <span aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 rounded border border-ink" />
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section className={page}>
        <p className="eyebrow text-graphite">03</p>
        <h2 className={`mt-2 ${h2}`}>10 Confidence Prompts</h2>
        <p className="mt-3 text-graphite">Pick one. Write for five minutes without editing yourself.</p>
        <ol className="mt-8 space-y-5">
          {KIT_PROMPTS.map((p, i) => (
            <li key={p} className="kit-card border-b border-line pb-5">
              <span className="text-graphite tabular-nums mr-3">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-lg">{p}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={page}>
        <p className="eyebrow text-graphite">04</p>
        <h2 className={`mt-2 ${h2}`}>12 Date-Night Conversation Cards</h2>
        <p className="mt-3 text-graphite">
          Cut along the dashed lines. Take turns drawing a card. Either of you can pass, no explanation needed.
        </p>
        <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 print:grid-cols-3">
          {KIT_CARDS.map((c) => (
            <li
              key={c}
              className="kit-card flex min-h-[9rem] items-center justify-center border border-dashed border-silver p-5 text-center font-display text-lg leading-snug"
            >
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-graphite">
          More guides, stories and honest picks at nightstandsupply.com. You are getting this because you joined{' '}
          {SITE.guidesName}. For adults 18+.
        </p>
      </section>
    </article>
  )
}
