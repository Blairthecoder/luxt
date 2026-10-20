import { useRef } from 'react'

function Arrow({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Scroll back' : 'Scroll forward'}
      className="w-10 h-10 inline-flex items-center justify-center rounded-full border border-line bg-canvas hover:border-ink transition-colors"
    >
      <span
        aria-hidden="true"
        className={`block w-2 h-2 border-t-[1.5px] border-r-[1.5px] border-ink ${dir === 'prev' ? '-rotate-[135deg] ml-1' : 'rotate-45 -ml-1'}`}
      />
    </button>
  )
}

/** Sideways scroller with arrow buttons. Items stay in the server HTML; the arrows only scroll. */
export function Carousel({
  title,
  action,
  children,
}: {
  title: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }
  return (
    <div>
      <div className="section-head">
        <h2 className="display-m">{title}</h2>
        <div className="flex items-center gap-4">
          {action}
          <div className="hidden sm:flex gap-2">
            <Arrow dir="prev" onClick={() => scroll(-1)} />
            <Arrow dir="next" onClick={() => scroll(1)} />
          </div>
        </div>
      </div>
      <div ref={ref} className="carousel">
        {children}
      </div>
    </div>
  )
}
