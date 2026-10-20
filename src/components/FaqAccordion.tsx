export function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-line">
      {faqs.map((faq) => (
        <details key={faq.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{faq.q}</h3>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-graphite transition-transform group-open:rotate-45"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <p className="pb-6 -mt-2 text-graphite text-[1.0625rem] leading-relaxed">{faq.a}</p>
        </details>
      ))}
    </div>
  )
}
