/**
 * Affiliate programs. Every outbound purchase link is built here and only
 * served through the /go/<handle> redirect, so a program change is one edit.
 */
export interface AffiliateProgram {
  id: string
  merchantName: string
  /** Merchant product page for a given product handle. */
  productUrl: (handle: string) => string
  /** Tracking link; the merchant landing page is appended as ?url=<encoded>. */
  deepLinkBase: string
}

export const PROGRAMS: Record<string, AffiliateProgram> = {
  luxurytoyx: {
    id: 'luxurytoyx',
    merchantName: 'LuxuryToyX',
    productUrl: (handle) => `https://www.luxurytoyx.com/products/${handle}`,
    deepLinkBase: 'https://luxurytoyx.fxo.co/g/1559545/250145/3789407/DxCPTgc',
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
  return `${program.deepLinkBase}?url=${encodeURIComponent(program.productUrl(handle))}`
}

/** Internal path used by every buy button. */
export function goPath(handle: string): string {
  return `/go/${handle}`
}
