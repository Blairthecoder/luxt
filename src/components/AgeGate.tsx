import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ns_age_confirmed'

/**
 * 18+ confirmation overlay. Rendered only after hydration, so the server HTML
 * (what crawlers index) always contains the full page.
 */
export function AgeGate() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== '1') setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  if (!open) return null

  const confirm = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // Storage blocked: allow this visit only.
    }
    setOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas/80 backdrop-blur-2xl px-5"
    >
      <div className="w-full max-w-md text-center rise">
        <p className="font-display text-lg font-bold tracking-[-0.045em] text-ink">
          Nightstand<span className="text-graphite font-semibold"> Supply Co.</span>
        </p>
        <h2 id="age-gate-title" className="mt-10 display-m">
          Adults Only.
        </h2>
        <p className="mt-4 text-graphite leading-relaxed">
          This site features adult products. Please confirm you are 18 or older to enter.
        </p>
        <div className="mt-10 flex flex-col gap-3">
          <button type="button" onClick={confirm} className="btn btn-lg w-full">
            I Am 18 or Older
          </button>
          <a href="https://www.google.com" className="btn-ghost w-full min-h-[3.75rem]">
            Leave
          </a>
        </div>
      </div>
    </div>
  )
}
