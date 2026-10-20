import { useEffect, useState } from 'react'
import { Logo } from '@/components/Logo'

const STORAGE_KEY = 'ns_age_confirmed'
// A first-party cookie as well as localStorage, so Safari private windows and
// cleared storage don't re-gate every page.
const COOKIE = 'ns_age=1'

function confirmed(): boolean {
  if (document.cookie.split('; ').includes(COOKIE)) return true
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * 18+ confirmation overlay. Rendered only after hydration, so the server HTML
 * (what crawlers index) always contains the full page.
 */
export function AgeGate() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!confirmed()) setOpen(true)
  }, [])

  if (!open) return null

  const confirm = () => {
    document.cookie = `${COOKIE}; Max-Age=31536000; Path=/; SameSite=Lax`
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
        <Logo className="mx-auto h-14 w-auto" />
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
