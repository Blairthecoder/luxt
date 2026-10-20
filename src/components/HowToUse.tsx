import type { HowToUse as HowToUseData } from '@/types/catalog'

/**
 * "How to Use It" guide for a product: where to start, what to expect and
 * practical notes. Open by default so the text is visible to shoppers and
 * crawlers, and collapsible for people who have seen it.
 */
export function HowToUse({ guide }: { guide: HowToUseData }) {
  return (
    <details open className="group rounded-2xl bg-mist p-6 sm:p-8">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
        <span className="font-display text-xl font-semibold tracking-[-0.02em]">Step-by-step guide</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-graphite transition-transform group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </summary>

      <div className="mt-6 space-y-8">
        <section>
          <h3 className="text-sm font-semibold text-graphite">Where to Start</h3>
          <ol className="mt-3 space-y-3">
            {guide.start.map((step, i) => (
              <li key={step} className="grid grid-cols-[1.75rem_1fr] gap-3 leading-relaxed">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas text-xs font-semibold tabular-nums">{i + 1}</span>
                <span className="pt-0.5 text-[1.0625rem]">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-graphite">What to Expect</h3>
          <p className="mt-3 text-[1.0625rem] leading-relaxed">{guide.expect}</p>
        </section>

        {guide.goodToKnow && guide.goodToKnow.length > 0 && (
          <section>
            <h3 className="text-sm font-semibold text-graphite">Good to Know</h3>
            <ul className="mt-3 space-y-2 text-[1.0625rem] leading-relaxed">
              {guide.goodToKnow.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7rem] h-1 w-1 shrink-0 rounded-full bg-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="border-t border-line pt-5 text-sm leading-relaxed text-graphite">
          Everyone is different, so go at your own pace and stop if anything hurts or feels uncomfortable. Always follow
          the instructions that come with your product.
        </p>
      </div>
    </details>
  )
}
