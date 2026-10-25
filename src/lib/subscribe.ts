import { useState, type FormEvent } from 'react'

export type SignupState = 'idle' | 'pending' | 'success' | 'error'

/** localStorage key: "subscribed", or a dismissal timestamp for the slide-in. */
export const KIT_STORAGE_KEY = 'ns_kit'

export const KIT_PRINTABLE = '/confidence-kit/printable'
export const KIT_PDF = '/downloads/nightstand-confidence-kit.pdf'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function remember(value: string) {
  try {
    localStorage.setItem(KIT_STORAGE_KEY, value)
  } catch {
    // Storage blocked: the slide-in may show again next visit.
  }
}

export function readKitFlag(): string | null {
  try {
    return localStorage.getItem(KIT_STORAGE_KEY)
  } catch {
    return null
  }
}

export function dismissKitOffer() {
  remember(String(Date.now()))
}

/**
 * Posts a signup to Netlify Forms (the always-on record, registered in
 * public/newsletter-form.html) and to /api/subscribe (the email provider).
 * Succeeds when either one accepts it.
 */
export function useSignup() {
  const [state, setState] = useState<SignupState>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) => body.append(key, String(value)))
    const encoded = body.toString()
    const post = (url: string) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded,
        signal: AbortSignal.timeout(15000),
      })
    setState('pending')

    const netlify = post('/newsletter-form.html').then(async (res) => {
      if (!res.ok) throw new Error('Submission failed')
      // A plain preview can return the static registration page with status 200.
      if (/\bdata-netlify\s*=/i.test(await res.text())) throw new Error('Form handling is unavailable')
    })
    const provider = post('/api/subscribe').then(async (res) => {
      const json = (await res.json()) as { ok: boolean; providers: string[] }
      if (!res.ok || !json.ok || json.providers.length === 0) throw new Error('No provider accepted the signup')
    })

    const results = await Promise.allSettled([netlify, provider])
    if (results.some((r) => r.status === 'fulfilled')) {
      remember('subscribed')
      window.gtag?.('event', 'generate_lead', {
        lead_source: body.get('source') ?? '',
        offer: body.get('offer') ?? '',
        page_path: location.pathname,
      })
      setState('success')
    } else {
      setState('error')
    }
  }

  return {
    state,
    submit,
    reset: () => {
      if (state !== 'pending') setState('idle')
    },
  }
}
