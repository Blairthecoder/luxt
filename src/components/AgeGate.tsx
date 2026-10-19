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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm px-4"
    >
      <div className="w-full max-w-md border border-line bg-surface px-8 py-12 text-center">
        <p className="eyebrow text-gold">Nightstand Supply Co.</p>
        <h2 id="age-gate-title" className="mt-6 text-4xl text-ivory">
          Adults Only
        </h2>
        <p className="mt-4 text-sm text-muted leading-relaxed">
          This site features adult products. Please confirm you are 18 or older to enter.
        </p>
        <div className="mt-10 flex flex-col gap-3">
          <button type="button" onClick={confirm} className="btn-gold w-full">
            I Am 18 or Older
          </button>
          <a href="https://www.google.com" className="btn-line w-full">
            Leave
          </a>
        </div>
      </div>
    </div>
  )
}
