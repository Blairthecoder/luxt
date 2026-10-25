/**
 * GA4 events on top of the gtag snippet in src/routes/__root.tsx. Every helper is a
 * no-op on the server, without gtag (blocked or not loaded yet) and never throws.
 * Lingerie uses the GA4 ecommerce schema; purchase fires on Shopify's checkout
 * (see docs/ga4-tracking.md).
 */

export const GA_MEASUREMENT_ID = 'G-QQ0NJL2W40'
export const CURRENCY = 'USD'
/** localStorage key the root snippet writes landing attribution to. */
export const ATTRIBUTION_KEY = 'ns_attr'

type Params = Record<string, unknown>
type Gtag = (...args: unknown[]) => void

function gtag(): Gtag | null {
  if (typeof window === 'undefined') return null
  const fn = (window as unknown as { gtag?: Gtag }).gtag
  return typeof fn === 'function' ? fn : null
}

export function track(event: string, params: Params = {}) {
  try {
    gtag()?.('event', event, params)
  } catch {
    // Analytics must never break the page.
  }
}

export interface Ga4Item {
  item_id: string
  item_name: string
  item_brand?: string
  item_category?: string
  item_variant?: string
  price: number
  quantity: number
}

const itemsValue = (items: Ga4Item[]) =>
  Math.round(items.reduce((n, i) => n + i.price * i.quantity, 0) * 100) / 100

function ecommerce(event: string, items: Ga4Item[], extra: Params = {}) {
  if (!items.length) return
  track(event, { currency: CURRENCY, value: itemsValue(items), items, ...extra })
}

export const trackViewItem = (item: Ga4Item, extra?: Params) => ecommerce('view_item', [item], extra)
export const trackAddToCart = (item: Ga4Item, extra?: Params) => ecommerce('add_to_cart', [item], extra)
export const trackRemoveFromCart = (item: Ga4Item) => ecommerce('remove_from_cart', [item])
export const trackViewCart = (items: Ga4Item[]) => ecommerce('view_cart', items)
export const trackBeginCheckout = (items: Ga4Item[], checkoutSource: string) =>
  ecommerce('begin_checkout', items, { checkout_source: checkoutSource, page_path: location.pathname })

/** Email signup: generate_lead is the key event, sign_up keeps GA4's standard signup report filled. */
export function trackSignup(formLocation: string) {
  track('generate_lead', { form_name: 'newsletter', form_location: formLocation, page_path: location.pathname })
  track('sign_up', { method: 'newsletter', form_location: formLocation })
}

export interface Attribution {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  gclid?: string
  landing_page?: string
  referrer?: string
}

/** Last non-direct landing attribution (30 days), saved by the root snippet. */
export function readAttribution(): Attribution {
  try {
    const raw = JSON.parse(localStorage.getItem(ATTRIBUTION_KEY) ?? 'null')
    if (raw && typeof raw === 'object' && Date.now() - Number(raw.ts) < 30 * 864e5) {
      const { ts: _ts, ...rest } = raw
      return rest as Attribution
    }
  } catch {
    // Storage blocked: no attribution.
  }
  return {}
}

export interface GaIds {
  clientId?: string
  sessionId?: string
}

function gaCookie(name: string): string | undefined {
  return document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1]
}

/** Client id from the _ga cookie ("GA1.1.123.456" → "123.456") when gtag cannot answer. */
function cookieClientId(): string | undefined {
  const parts = gaCookie('_ga')?.split('.')
  return parts && parts.length >= 4 ? parts.slice(-2).join('.') : undefined
}

/** GA4 client and session ids, so Shopify orders can be tied back to the browsing session. */
export function getGaIds(timeoutMs = 1500): Promise<GaIds> {
  if (typeof window === 'undefined') return Promise.resolve({})
  return new Promise((resolve) => {
    const ids: GaIds = {}
    let pending = 2
    const done = () => resolve({ clientId: ids.clientId ?? cookieClientId(), sessionId: ids.sessionId })
    const timer = setTimeout(done, timeoutMs)
    const settle = () => {
      if (--pending === 0) {
        clearTimeout(timer)
        done()
      }
    }
    const g = gtag()
    if (!g) {
      clearTimeout(timer)
      done()
      return
    }
    try {
      g('get', GA_MEASUREMENT_ID, 'client_id', (v: unknown) => {
        if (v) ids.clientId = String(v)
        settle()
      })
      g('get', GA_MEASUREMENT_ID, 'session_id', (v: unknown) => {
        if (v) ids.sessionId = String(v)
        settle()
      })
    } catch {
      clearTimeout(timer)
      done()
    }
  })
}
