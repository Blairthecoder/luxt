/**
 * Shop-window shortcuts: the image tiles on the homepage and the sub-category
 * row on listing pages. Each tile links to an existing indexable page and takes
 * its image from the top discreet product on that page, so nothing here goes
 * stale when the catalog changes.
 */

export type TileTarget = { kind: 'shop' | 'hub'; slug: string }

export interface Shortcut extends TileTarget {
  label: string
}

/** Round shortcuts under the homepage hero. */
export const HOME_SHORTCUTS: Shortcut[] = [
  { label: 'For Her', kind: 'shop', slug: 'sex-toys-for-women' },
  { label: 'For Him', kind: 'shop', slug: 'sex-toys-for-men' },
  { label: 'For Couples', kind: 'shop', slug: 'couples-sex-toys' },
  { label: 'Beginners', kind: 'shop', slug: 'sex-toys-for-beginners' },
  { label: 'Under $50', kind: 'shop', slug: 'sex-toys-under-50' },
  { label: 'Quiet Picks', kind: 'shop', slug: 'quiet-vibrators' },
  { label: 'Lube', kind: 'hub', slug: 'lubricants' },
  { label: 'Treat Yourself', kind: 'shop', slug: 'luxury-sex-toys' },
]

/** Featured Categories grid on the homepage. */
export const FEATURED_HUBS = ['vibrators', 'couples', 'lubricants', 'strokers', 'penis-rings', 'prostate-massagers', 'lingerie', 'anal-toys']

/** Shop by Brand grid. Only brands with their own collection page. */
export const BRAND_TILES: { slug: string; name: string; line: string }[] = [
  { slug: 'lelo', name: 'LELO', line: 'Quiet, rechargeable and made to last' },
  { slug: 'womanizer', name: 'Womanizer', line: 'The original air-pulse toys' },
  { slug: 'we-vibe', name: 'We-Vibe', line: 'Wearables made for two' },
  { slug: 'lovense', name: 'Lovense', line: 'App control, near or far' },
  { slug: 'tenga', name: 'Tenga', line: 'Simple, clean designs for him' },
  { slug: 'fleshlight', name: 'Fleshlight', line: 'The best-known stroker brand' },
]

/** One line under each sub-category tile. */
export const COLLECTION_LINES: Record<string, string> = {
  'sex-toys-for-women': 'Toys that put her pleasure first',
  'sex-toys-for-men': 'Strokers, rings and prostate toys',
  'couples-sex-toys': 'Made to share, in bed or apart',
  'app-controlled-sex-toys': 'Control from a phone, anywhere',
  'rabbit-vibrators': 'Inside and outside at once',
  'wand-vibrators': 'Deep, rumbly, all-over massage',
  'clitoral-vibrators': 'Focused, external stimulation',
  'g-spot-vibrators': 'Curved to reach the right spot',
  'realistic-dildos': 'Lifelike shape and feel',
  'butt-plugs': 'Small sizes to start slow',
  'automatic-strokers': 'Hands-free motion for him',
  'pocket-pussies': 'Compact, easy-clean strokers',
  'prostate-vibrators': 'Angled for prostate pleasure',
  'vibrating-cock-rings': 'Longer-lasting, shared buzz',
  fleshlight: 'The best-known strokers',
  tenga: 'Clean, simple, often single-use',
  lelo: 'Quiet and beautifully made',
  womanizer: 'Air-pulse clitoral toys',
  lovense: 'App-connected toys',
  'we-vibe': 'Couples wearables',
  'sex-toy-gift-sets': 'Ready-to-give bundles',
  'stocking-stuffers': 'Small gifts under $30',
  'bullet-vibrators': 'Small, simple and discreet',
  'remote-control-vibrators': 'Hand your partner the controls',
  'thrusting-vibrators': 'Motion that does the work',
  'anal-beads': 'Graduated sizes, go slow',
  'bondage-kits': 'Soft restraints for beginners',
  'strap-on-kits': 'Harnesses and kits for two',
  'sex-swings': 'Support for new positions',
  'sex-toys-under-50': 'Good first toys for less',
  'sex-toys-under-100': 'The sweet spot for quality',
  'luxury-sex-toys': 'Quieter, softer, built to last',
  'water-based-lube': 'Safe with every toy',
  'silicone-lube': 'Long-lasting glide',
  'quiet-vibrators': 'Low noise for shared walls',
  'sex-toys-for-beginners': 'Gentle places to start',
  'discreet-sex-toys': 'Look like anything but a toy',
}

/** Sub-category tiles shown above the product grid, keyed `hub:<slug>` or `shop:<slug>`. */
export const SUBCATEGORIES: Record<string, string[]> = {
  'hub:vibrators': ['clitoral-vibrators', 'rabbit-vibrators', 'wand-vibrators', 'g-spot-vibrators', 'bullet-vibrators', 'quiet-vibrators', 'remote-control-vibrators', 'thrusting-vibrators'],
  'hub:strokers': ['automatic-strokers', 'pocket-pussies', 'fleshlight', 'tenga'],
  'hub:dildos': ['realistic-dildos', 'strap-on-kits', 'g-spot-vibrators', 'water-based-lube'],
  'hub:anal-toys': ['butt-plugs', 'anal-beads', 'prostate-vibrators', 'silicone-lube'],
  'hub:prostate-massagers': ['prostate-vibrators', 'butt-plugs', 'silicone-lube', 'sex-toys-for-men'],
  'hub:penis-rings': ['vibrating-cock-rings', 'couples-sex-toys', 'sex-toys-for-men', 'sex-toys-under-50'],
  'hub:strap-ons': ['strap-on-kits', 'realistic-dildos', 'couples-sex-toys', 'water-based-lube'],
  'hub:bdsm': ['bondage-kits', 'sex-swings', 'couples-sex-toys', 'sex-toy-gift-sets'],
  'hub:lubricants': ['water-based-lube', 'silicone-lube', 'sex-toys-for-beginners', 'stocking-stuffers'],
  'hub:couples': ['app-controlled-sex-toys', 'remote-control-vibrators', 'vibrating-cock-rings', 'we-vibe', 'lovense', 'bondage-kits', 'strap-on-kits', 'sex-swings'],
  'hub:sex-machines-furniture': ['sex-swings', 'thrusting-vibrators', 'automatic-strokers', 'couples-sex-toys'],
  'shop:sex-toys-for-women': ['clitoral-vibrators', 'rabbit-vibrators', 'wand-vibrators', 'g-spot-vibrators', 'bullet-vibrators', 'quiet-vibrators', 'womanizer', 'lelo'],
  'shop:sex-toys-for-men': ['automatic-strokers', 'pocket-pussies', 'prostate-vibrators', 'vibrating-cock-rings', 'fleshlight', 'tenga'],
  'shop:couples-sex-toys': ['app-controlled-sex-toys', 'remote-control-vibrators', 'vibrating-cock-rings', 'we-vibe', 'lovense', 'bondage-kits', 'strap-on-kits', 'sex-swings'],
  'shop:sex-toys-for-beginners': ['bullet-vibrators', 'clitoral-vibrators', 'quiet-vibrators', 'pocket-pussies', 'butt-plugs', 'water-based-lube'],
  'shop:sex-toys-under-50': ['bullet-vibrators', 'pocket-pussies', 'vibrating-cock-rings', 'stocking-stuffers', 'water-based-lube', 'sex-toys-under-100'],
  'shop:sex-toys-under-100': ['sex-toys-under-50', 'clitoral-vibrators', 'rabbit-vibrators', 'automatic-strokers', 'prostate-vibrators', 'luxury-sex-toys'],
  'shop:luxury-sex-toys': ['lelo', 'womanizer', 'we-vibe', 'lovense', 'sex-toy-gift-sets', 'sex-toys-under-100'],
  'shop:app-controlled-sex-toys': ['remote-control-vibrators', 'lovense', 'we-vibe', 'couples-sex-toys'],
  'shop:quiet-vibrators': ['discreet-sex-toys', 'bullet-vibrators', 'clitoral-vibrators', 'lelo'],
  'shop:discreet-sex-toys': ['quiet-vibrators', 'bullet-vibrators', 'stocking-stuffers', 'sex-toys-for-beginners'],
}
