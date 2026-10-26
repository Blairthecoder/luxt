import data from '@/data/luxurytoyx-picks.json'
import type { MerchantProfile } from '@/content/merchants'

/** Buyer-intent groups used on Shop Our Picks, the brand page and guide footers. */
export type PickIntent = 'beginners' | 'couples' | 'under-50' | 'premium' | 'care' | 'compact'

export const INTENTS: Record<PickIntent, { title: string; blurb: string }> = {
  beginners: {
    title: 'For Beginners',
    blurb: 'Simple, small and approachable. Chosen for how easy they are to try, not for features.',
  },
  couples: {
    title: 'For Couples',
    blurb: 'Products sold for shared use, with remotes so a partner can hold the controls.',
  },
  'under-50': {
    title: 'Under $50',
    blurb: 'Listed under $50 by the retailer on the date shown. Prices change, so confirm at checkout.',
  },
  premium: {
    title: 'Premium Picks',
    blurb: 'Higher price, with app control, dual motors or well-known brand engineering.',
  },
  care: {
    title: 'Care & Accessories',
    blurb: 'Lubricants to add to a purchase. Match the lube base to the toy material.',
  },
  compact: {
    title: 'Compact',
    blurb: 'Mini-sized products. The retailer does not state noise levels, so we do not claim any.',
  },
}

export interface MerchantPick {
  handle: string
  intents: PickIntent[]
  audience: string
  features: string[]
  why: string
  caution?: string
  title: string
  brand: string
  productType: string
  /** Retailer list price on `checkedAt`. Always shown with that date, never as a live price. */
  price: number
  image: string
  imageWidth: number
  imageHeight: number
  merchant: MerchantProfile['id']
}

export const PICKS_CHECKED_AT: string = data.checkedAt

const ALL: MerchantPick[] = (data.picks as unknown as Array<Record<string, any>>)
  .filter((p) => p.feed.available && p.feed.image)
  .map((p) => ({
    handle: p.handle,
    intents: p.intents,
    audience: p.audience,
    features: p.features,
    why: p.why,
    caution: p.caution,
    title: p.feed.title,
    brand: p.feed.vendor,
    productType: p.feed.productType,
    price: p.feed.price,
    image: p.feed.image,
    imageWidth: p.feed.imageWidth,
    imageHeight: p.feed.imageHeight,
    merchant: 'luxurytoyx' as const,
  }))

export function picksForIntent(intent: PickIntent, limit = 4): MerchantPick[] {
  return ALL.filter((p) => p.intents.includes(intent))
    .sort((a, b) => a.price - b.price)
    .slice(0, limit)
}

export const ALL_MERCHANT_PICKS: MerchantPick[] = ALL
