/**
 * Thin GA4 helper for the content and discovery features. Never throws, is a no-op
 * on the server or without gtag, and must only receive non-sensitive parameters
 * (page, product handle, merchant, content cluster). Never pass quiz answers,
 * email addresses or other personal data.
 */
type Gtag = (...args: unknown[]) => void

export type SiteEvent =
  | 'affiliate_click'
  | 'product_card_click'
  | 'comparison_click'
  | 'newsletter_signup'
  | 'quiz_completed'
  | 'cannawize_referral_landing'
  | 'merchant_product_click'
  | 'lead_magnet_signup'

export function trackEvent(name: SiteEvent, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return
  try {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag
    let referral: string | undefined
    try {
      referral = sessionStorage.getItem('ns_ref') ?? undefined
    } catch {
      // Storage blocked: no referral tag.
    }
    if (typeof gtag === 'function') gtag('event', name, { page_path: window.location.pathname, referral_source: referral, ...params })
  } catch {
    // Analytics must never break the page.
  }
}
