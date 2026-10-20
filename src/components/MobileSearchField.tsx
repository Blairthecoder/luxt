/** A search field look-alike for phones. Tapping it opens the site search dialog in the header. */
export function MobileSearchField({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('open-search'))}
      aria-label="Search toys, brands and guides"
      className={`press lg:hidden flex h-12 w-full items-center gap-3 rounded-2xl bg-mist px-4 text-left text-[0.9375rem] text-graphite ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </svg>
      <span className="truncate">Search toys, brands and guides</span>
    </button>
  )
}
