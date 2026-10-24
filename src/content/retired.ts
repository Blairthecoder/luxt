/**
 * Pages retired when the store moved to a Lovense-only catalog. Each one has
 * no Lovense products, so it is dropped from navigation, tiles and the sitemap,
 * and its URL 301s to the closest live page. Old LuxuryToyX product URLs are
 * handled in the product route.
 */
export const RETIRED_HUBS: Record<string, string> = {
  couples: '/shop/couples-sex-toys',
  'penis-pumps': '/category/penis-rings',
  'sex-dolls': '/category/strokers',
  lingerie: '/category/vibrators',
}

export const RETIRED_COLLECTIONS: Record<string, string> = {
  fleshlight: '/category/strokers',
  tenga: '/category/strokers',
  lelo: '/category/vibrators',
  womanizer: '/shop/clitoral-vibrators',
  'we-vibe': '/shop/couples-sex-toys',
  'realistic-dildos': '/category/dildos',
  'sex-toy-gift-sets': '/gifts',
  'bondage-kits': '/category/bdsm',
  'strap-on-kits': '/category/strap-ons',
  'sex-swings': '/category/sex-machines-furniture',
  'silicone-lube': '/shop/water-based-lube',
  'black-friday-sex-toy-deals': '/blog/black-friday-sex-toy-deals',
}

/**
 * LuxuryToyX listings of Lovense toys, now sold through Lovense under the
 * Lovense handle. Old URLs 301 to the Lovense page and their copy carries over.
 */
export const LOVENSE_HANDLE_ALIASES: Record<string, string> = {
  'lovense-domi-2-rechargeable-wand-massager': 'lovense-domi-2',
  'lovense-edge-2-flexible-prostate-massager-black': 'lovense-edge-2',
  'lovense-ferri-panty-vibe-pink': 'lovense-ferri',
  'lovense-lush-3-0-vibrator': 'lovense-lush-3',
  'lovense-lush-2-0-sound-activated-vibrator': 'lovense-lush-4',
  'lovense-mission-2-silicone-rechargeable-vibrator': 'lovense-mission-2',
  'lovense-osci-3-rechargeable-silicone-g-spot-vibrator-with-clitoral-stimulator': 'lovense-osci-3',
  'lovense-gush-2-oscillating-masturbator': 'lovense-gush-2-motion',
}

/** Copy written for a LuxuryToyX listing that also fits the Lovense listing it now points to. */
export const LOVENSE_COPY_CARRYOVER = [
  'lovense-domi-2-rechargeable-wand-massager',
  'lovense-edge-2-flexible-prostate-massager-black',
  'lovense-ferri-panty-vibe-pink',
  'lovense-lush-3-0-vibrator',
  'lovense-mission-2-silicone-rechargeable-vibrator',
  'lovense-osci-3-rechargeable-silicone-g-spot-vibrator-with-clitoral-stimulator',
]

/** Where a retired hub's products now live, for redirects from old product URLs. */
export function hubPath(slug: string): string {
  return RETIRED_HUBS[slug] ?? `/category/${slug}`
}
