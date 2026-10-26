/**
 * Merchant profiles shown on brand pages, badges and pick cards. These describe the
 * retailer only; the tracked outbound links themselves stay in src/lib/affiliate.ts
 * (PROGRAMS) and are only ever served through /go/<handle>. Never add a referral URL
 * or commission rate here.
 *
 * Every fact below was read from the retailer's own public policy pages on
 * `verifiedAt`. Anything not verified is left out rather than guessed.
 */
export interface MerchantProfile {
  /** Matches the PROGRAMS key in src/lib/affiliate.ts. */
  id: 'luxurytoyx' | 'lovense' | 'shopify'
  name: string
  /** Short badge text. */
  badge: string
  website: string
  /** Where verified facts came from. */
  sources: { label: string; url: string }[]
  verifiedAt: string
  editorialDescription: string
  categories: string[]
  shipping: string[]
  returns: string[]
}

export const MERCHANTS: Record<MerchantProfile['id'], MerchantProfile> = {
  luxurytoyx: {
    id: 'luxurytoyx',
    name: 'Luxury Toy X',
    badge: 'Luxury Toy X',
    website: 'https://www.luxurytoyx.com',
    sources: [
      { label: 'Shipping policy', url: 'https://www.luxurytoyx.com/policies/shipping-policy' },
      { label: 'Refund policy', url: 'https://www.luxurytoyx.com/policies/refund-policy' },
    ],
    verifiedAt: '2026-10-26',
    editorialDescription:
      'Luxury Toy X is an online adult retailer that carries many brands in one store, so it suits shoppers who want to compare products from different makers before choosing. We link to it for products we selected ourselves; we do not sell or ship them.',
    // From the retailer's own product types: the broad categories its catalog is organized into.
    categories: ['Vibrators', 'Wands', 'Couples products', 'Lubricants', 'Lingerie', 'Strokers and masturbators', 'Anal toys', 'BDSM'],
    shipping: [
      'Free discreet shipping on orders to the 48 contiguous states; other destinations see rates at checkout.',
      'Orders ship in plain packaging and labeling.',
      'The retailer says Luxury Toy X will not appear on bank or card statements.',
      'The retailer says most orders arrive within 3-4 days.',
    ],
    returns: [
      '30 days from the delivered date on tracking.',
      'Items must be unused and unopened. A $15 return shipping charge and a 20% restocking fee apply to eligible returns.',
      'Thongs, G-strings, teddies, bras, bikinis and similar intimate items are not returnable.',
      'Damage in shipping must be reported within 3 days and defects within 7 days.',
    ],
  },
  lovense: {
    id: 'lovense',
    name: 'Lovense',
    badge: 'Lovense',
    website: 'https://www.lovense.com',
    sources: [],
    verifiedAt: '2026-10-26',
    editorialDescription:
      'Lovense makes app-connected toys and sells them from its own store. We link to Lovense product pages for the toys we review.',
    categories: ['App-controlled vibrators', 'Long-distance toys', 'Couples bundles'],
    shipping: [],
    returns: [],
  },
  shopify: {
    id: 'shopify',
    name: 'Nightstand Supply Shop',
    badge: 'Our store',
    website: 'https://nightstandsupply.com/category/lingerie',
    sources: [],
    verifiedAt: '2026-10-26',
    editorialDescription: 'Lingerie sold through our own Shopify store, with checkout on Shopify.',
    categories: ['Lingerie'],
    shipping: [],
    returns: [],
  },
}
