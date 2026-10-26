/**
 * Content-to-commerce funnel: where a guide sends the reader next. Only guides where
 * the next step is genuinely relevant appear here; everything else keeps its normal
 * related reading. Slugs that do not exist are ignored at render time.
 */
import type { PickIntent } from '@/lib/merchant-picks'

export interface FunnelStep {
  /** Existing guide slug the reader should read next. */
  next: string
  /** One sentence on why. */
  reason: string
}

/** Educational guide -> the buying guide that follows from it. */
export const NEXT_STEPS: Record<string, FunnelStep> = {
  'how-to-feel-confident-in-bed': { next: 'sex-toys-for-beginners', reason: 'When you are ready to explore products, this guide explains where to start.' },
  'self-pleasure-guide-for-women': { next: 'how-to-choose-your-first-vibrator', reason: 'Thinking about a first vibrator? Start with what to look for.' },
  'non-sexual-intimacy-ideas': { next: 'how-to-talk-to-your-partner-about-sex-toys', reason: 'If you want to bring products into the relationship, begin with the conversation.' },
  'sensate-focus-exercises-for-couples': { next: 'how-to-use-sex-toys-with-a-partner', reason: 'A natural next step once you are comfortable with shared touch.' },
  'how-to-talk-to-your-partner-about-sex-toys': { next: 'best-couples-sex-toys', reason: 'Ready to choose something together? Compare the main kinds of couples products.' },
  'how-to-spice-up-your-marriage': { next: 'best-couples-sex-toys', reason: 'Compare couples products if shared products appeal to you both.' },
}

/** Buying guide -> the curated picks that match its intent. */
export const GUIDE_PICKS: Record<string, { intent: PickIntent; heading: string }> = {
  'sex-toys-for-beginners': { intent: 'beginners', heading: 'Beginner Picks From a Multi-Brand Retailer' },
  'how-to-choose-your-first-vibrator': { intent: 'beginners', heading: 'Simple First Picks' },
  'best-couples-sex-toys': { intent: 'couples', heading: 'Couples Picks From a Multi-Brand Retailer' },
  'how-to-use-sex-toys-with-a-partner': { intent: 'couples', heading: 'Products Made for Sharing' },
  'anniversary-sex-toy-gifts': { intent: 'couples', heading: 'Gift Ideas for Two' },
  'lovense-vs-we-vibe': { intent: 'couples', heading: 'More Couples Picks to Compare' },
  'best-lube-for-sex-toys': { intent: 'care', heading: 'Lubricants We Selected' },
}
