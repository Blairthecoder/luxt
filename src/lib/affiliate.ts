import lovenseLinks from '@/data/lovense-links.json'
import lovenseBundles from '@/data/lovense-bundles.json'
import shopifyLinks from '@/data/shopify-links.json'
import shopifyMeta from '@/data/shopify-meta.json'

/**
 * Affiliate programs. Every outbound purchase link is built here and only
 * served through the /go/<handle> redirect, so a program change is one edit.
 */
export interface AffiliateProgram {
  id: string
  merchantName: string
  /** Merchant product page for a given product handle. */
  productUrl?: (handle: string) => string
  /** Tracking link; the merchant landing page is appended as ?url=<encoded>. */
  deepLinkBase?: string
  /** Per-product tracking links, for programs that issue one short link per item. */
  productLinks?: Record<string, string>
  /** Used when a product has no link of its own. */
  fallbackLink?: string
}

export const PROGRAMS: Record<string, AffiliateProgram> = {
  luxurytoyx: {
    id: 'luxurytoyx',
    merchantName: 'LuxuryToyX',
    productUrl: (handle) => `https://www.luxurytoyx.com/products/${handle}`,
    deepLinkBase: 'https://luxurytoyx.fxo.co/g/1559545/250145/3789407/DxCPTgc',
  },
  lovense: {
    id: 'lovense',
    merchantName: 'Lovense',
    productLinks: { ...lovenseLinks, ...lovenseBundles.links },
    // Lovense home page tracking link.
    fallbackLink: 'https://www.lovense.com/r/3t7vuu',
  },
  // Our own Shopify store (lingerie). Links go to the store's product page; checkout happens there.
  shopify: {
    id: 'shopify',
    merchantName: shopifyMeta.shopName || 'Nightstand Supply Shop',
    productLinks: shopifyLinks as Record<string, string>,
    fallbackLink: shopifyMeta.storeUrl || '/',
  },
}

export const DEFAULT_PROGRAM_ID = 'luxurytoyx'

const HANDLE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function isValidHandle(handle: string): boolean {
  return handle.length <= 200 && HANDLE_PATTERN.test(handle)
}

export function getProgram(programId: string = DEFAULT_PROGRAM_ID): AffiliateProgram {
  return PROGRAMS[programId] ?? PROGRAMS[DEFAULT_PROGRAM_ID]
}

export function buildAffiliateUrl(handle: string, programId?: string): string {
  const program = getProgram(programId)
  const own = program.productLinks?.[handle]
  if (own) return own
  if (program.deepLinkBase && program.productUrl) {
    return `${program.deepLinkBase}?url=${encodeURIComponent(program.productUrl(handle))}`
  }
  return program.fallbackLink ?? '/'
}

/** Internal path used by every buy button. */
export function goPath(handle: string): string {
  return `/go/${handle}`
}
