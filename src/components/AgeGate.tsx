import { useEffect, useState } from 'react'
import { SITE } from '@/config/site'

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md px-4"
    >
      <div className="w-full max-w-md rounded-3xl bg-[#12131C] border border-[#2B2E40] p-8 text-center space-y-5 shadow-2xl">
        <p className="text-[11px] uppercase tracking-[0.3em] text-amber-200/80">{SITE.name}</p>
        <h2 id="age-gate-title" className="text-2xl font-serif font-bold text-white">
          Are you 18 or older?
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          This site features adult products. Please confirm you are of legal age to continue.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={confirm}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#9B2C68] to-[#C88A58] text-white text-sm font-semibold"
          >
            Yes, I'm 18+
          </button>
          <a
            href="https://www.google.com"
            className="flex-1 py-3 rounded-xl bg-[#1C1E2B] border border-[#2B2E40] text-slate-300 text-sm font-semibold"
          >
            No, leave
          </a>
        </div>
      </div>
    </div>
  )
}
