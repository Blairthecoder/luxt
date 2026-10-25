import { useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { dismissKitOffer, readKitFlag } from '@/lib/subscribe'

const QUIET_DAYS = 14
// Pages that already carry the offer, or where a prompt would get in the way.
const SKIP = /^\/(confidence-kit|cart|privacy|terms|go)(\/|$)/
const READING = /^\/(blog|erotica)\//

function eligible() {
  const flag = readKitFlag()
  if (flag === 'subscribed') return false
  if (flag && Date.now() - Number(flag) < QUIET_DAYS * 864e5) return false
  // Desktop only: no interstitials on mobile.
  return matchMedia('(min-width: 1024px) and (pointer: fine)').matches
}

/**
 * Small corner card offering the Confidence Kit on desktop. Opens once per
 * visit on exit intent, or after most of a guide or story has been read.
 * Dismissing it keeps it away for two weeks; subscribing, for good.
 */
export function KitSlideIn() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [open, setOpen] = useState(false)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    setArmed(eligible())
  }, [])

  useEffect(() => {
    if (!armed || open || SKIP.test(pathname)) return
    const show = () => {
      // Wait for the age gate to be answered.
      if (document.querySelector('[aria-labelledby="age-gate-title"]')) return
      setOpen(true)
      setArmed(false)
    }
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) show()
    }
    const onScroll = () => {
      const depth = (scrollY + innerHeight) / document.documentElement.scrollHeight
      if (READING.test(pathname) && depth > 0.6) show()
    }
    document.addEventListener('mouseout', onLeave)
    addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('mouseout', onLeave)
      removeEventListener('scroll', onScroll)
    }
  }, [armed, open, pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  function close() {
    dismissKitOffer()
    setOpen(false)
  }

  if (!open) return null

  return (
    <aside
      aria-label="Free Confidence Kit"
      className="fixed bottom-6 right-6 z-[90] w-[22rem] rounded-2xl border border-line bg-canvas p-6 rise"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-graphite hover:bg-mist hover:text-ink"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <NewsletterSignup
        source={`slidein:${pathname.slice(1).replace(/\//g, ':') || 'home'}`.slice(0, 80)}
        variant="slidein"
        body="Seven small confidence exercises, a lingerie fit guide and date-night conversation cards. Free and printable."
      />
    </aside>
  )
}
