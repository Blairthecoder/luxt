import { createServerFn } from '@tanstack/react-start'
import type { ProductSummary } from '@/lib/listing'

/** A homepage "Thoughtfully Chosen" pick: feed data plus our own editorial copy. */
export interface CuratedPick extends ProductSummary {
  /** Short audience label, e.g. "Best for beginners". */
  audience: string
  bestFor?: string
  summary: string
  features: string[]
  /** One honest limitation from our review copy, when we have one. */
  limitation?: string
  merchant: string
  program?: string
}

/**
 * Up to four picks, each filling a different need. Only products with original
 * copy qualify, so every card carries our own rationale, and prices come from the
 * synced retailer feed rather than being typed by hand.
 */
export const getCuratedPicks = createServerFn({ method: 'GET' }).handler(async (): Promise<CuratedPick[]> => {
  const store = await import('@/server/catalog-store')
  const { toSummary } = await import('@/server/listing')
  const { pickSection } = await import('@/server/home-picks')
  const { PRODUCT_COPY } = await import('@/content/product-copy')
  const { productHighlights } = await import('@/lib/product-highlights')
  const { getProgram } = await import('@/lib/affiliate')

  const products = store.allProducts().filter((p) => store.hasCopy(p.handle))
  const used = new Set<string>()
  const neutral = /stroker|masturbat|sleeve|cock|penis|prostate|plug|egg|thrust|rabbit|dual|g-?spot/i
  const slots = [
    { audience: 'Best for beginners', section: { maxPrice: 100, hubs: ['vibrators', 'couples'], exclude: neutral } },
    { audience: 'For couples', section: { maxPrice: 250, hubs: ['couples'] } },
    { audience: 'Premium pick', section: { minPrice: 150, hubs: ['vibrators', 'couples'] } },
    { audience: 'Lubricants & care', section: { maxPrice: 30, hubs: ['lubricants'] } },
  ]
  const picks: CuratedPick[] = []
  for (const { audience, section } of slots) {
    const [product] = pickSection(products, section, used, 1)
    if (!product) continue
    const copy = PRODUCT_COPY[product.handle]
    const program = (product as { program?: string }).program
    picks.push({
      ...toSummary(product),
      audience,
      bestFor: copy?.bestFor,
      summary: copy?.summary ?? '',
      features: (copy?.pros?.slice(0, 3) ?? productHighlights(product)).filter(Boolean),
      limitation: copy?.cons?.[0],
      merchant: getProgram(program).merchantName,
      program,
    })
  }
  return picks.filter((p) => p.summary)
})
