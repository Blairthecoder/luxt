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
export const FEATURED_HUBS = ['vibrators', 'strokers', 'dildos', 'anal-toys', 'sex-machines-furniture', 'prostate-massagers', 'penis-rings', 'lubricants']

/** Shop by Brand grid. Only brands with their own collection page. */
export const BRAND_TILES: { slug: string; name: string; line: string }[] = [
  { slug: 'lovense', name: 'Lovense', line: 'App control, near or far' },
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
  'butt-plugs': 'Small sizes to start slow',
  'automatic-strokers': 'Hands-free motion for him',
  'pocket-pussies': 'Compact, easy-clean strokers',
  'prostate-vibrators': 'Angled for prostate pleasure',
  'vibrating-cock-rings': 'Longer-lasting, shared buzz',
  lovense: 'App-connected toys',
  'lovense-bundles': 'Two toys that play together',
  'stocking-stuffers': 'Small gifts under $30',
  'bullet-vibrators': 'Small, simple and discreet',
  'remote-control-vibrators': 'Hand your partner the controls',
  'thrusting-vibrators': 'Motion that does the work',
  'anal-beads': 'Graduated sizes, go slow',
  'sex-toys-under-50': 'Good first toys for less',
  'sex-toys-under-100': 'The sweet spot for quality',
  'luxury-sex-toys': 'Quieter, softer, built to last',
  'water-based-lube': 'Safe with every toy',
  'quiet-vibrators': 'Low noise for shared walls',
  'sex-toys-for-beginners': 'Gentle places to start',
  'discreet-sex-toys': 'Look like anything but a toy',
}

/** Sub-category tiles shown above the product grid, keyed `hub:<slug>` or `shop:<slug>`. */
export const SUBCATEGORIES: Record<string, string[]> = {
  'hub:vibrators': ['clitoral-vibrators', 'rabbit-vibrators', 'wand-vibrators', 'g-spot-vibrators', 'bullet-vibrators', 'quiet-vibrators', 'remote-control-vibrators', 'thrusting-vibrators'],
  'hub:strokers': ['automatic-strokers', 'pocket-pussies', 'sex-toys-for-men', 'app-controlled-sex-toys'],
  'hub:dildos': ['thrusting-vibrators', 'g-spot-vibrators', 'remote-control-vibrators', 'water-based-lube'],
  'hub:anal-toys': ['butt-plugs', 'anal-beads', 'prostate-vibrators'],
  'hub:prostate-massagers': ['prostate-vibrators', 'butt-plugs', 'sex-toys-for-men'],
  'hub:penis-rings': ['vibrating-cock-rings', 'couples-sex-toys', 'sex-toys-for-men', 'sex-toys-under-50'],
  'hub:strap-ons': ['couples-sex-toys', 'thrusting-vibrators', 'water-based-lube'],
  'hub:bdsm': ['couples-sex-toys', 'app-controlled-sex-toys', 'remote-control-vibrators'],
  'hub:lubricants': ['water-based-lube', 'sex-toys-for-beginners', 'stocking-stuffers'],
  'hub:sex-machines-furniture': ['thrusting-vibrators', 'automatic-strokers', 'couples-sex-toys'],
  'shop:sex-toys-for-women': ['clitoral-vibrators', 'rabbit-vibrators', 'wand-vibrators', 'g-spot-vibrators', 'bullet-vibrators', 'quiet-vibrators'],
  'shop:sex-toys-for-men': ['automatic-strokers', 'pocket-pussies', 'prostate-vibrators', 'vibrating-cock-rings'],
  'shop:couples-sex-toys': ['lovense-bundles', 'app-controlled-sex-toys', 'remote-control-vibrators', 'vibrating-cock-rings', 'lovense'],
  'shop:sex-toys-for-beginners': ['bullet-vibrators', 'clitoral-vibrators', 'quiet-vibrators', 'pocket-pussies', 'butt-plugs', 'water-based-lube'],
  'shop:sex-toys-under-50': ['bullet-vibrators', 'pocket-pussies', 'vibrating-cock-rings', 'stocking-stuffers', 'water-based-lube', 'sex-toys-under-100'],
  'shop:sex-toys-under-100': ['sex-toys-under-50', 'clitoral-vibrators', 'rabbit-vibrators', 'automatic-strokers', 'prostate-vibrators', 'luxury-sex-toys'],
  'shop:luxury-sex-toys': ['thrusting-vibrators', 'automatic-strokers', 'app-controlled-sex-toys', 'sex-toys-under-100'],
  'shop:app-controlled-sex-toys': ['remote-control-vibrators', 'lovense', 'couples-sex-toys'],
  'shop:quiet-vibrators': ['discreet-sex-toys', 'bullet-vibrators', 'clitoral-vibrators'],
  'shop:discreet-sex-toys': ['quiet-vibrators', 'bullet-vibrators', 'stocking-stuffers', 'sex-toys-for-beginners'],
}
