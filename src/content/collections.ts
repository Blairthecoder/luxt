/**
 * Search-led collection pages at /shop/<slug>. Each one targets a query people
 * actually type ("rabbit vibrators", "sex toys for men") and is built from a
 * rule over the synced catalog. Intros are original copy.
 */
export interface CollectionRule {
  hubs?: string[]
  /** Product matches if it has any of these tags (case-insensitive). */
  tags?: string[]
  /** Regex tested against the product title. */
  title?: string
  brands?: string[]
  minPrice?: number
  maxPrice?: number
}

export interface Collection {
  slug: string
  name: string
  group: 'For Him' | 'For Her' | 'For Couples' | 'By Style' | 'By Brand' | 'By Budget'
  metaTitle: string
  metaDescription: string
  intro: string
  /** Every listed condition must match. */
  rule: CollectionRule
  /** Related guide slug in Nightstand Notes. */
  guide?: string
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'sex-toys-for-men',
    name: 'Sex Toys for Men',
    group: 'For Him',
    metaTitle: 'Best Sex Toys for Men: Strokers, Rings & Prostate Toys',
    metaDescription:
      'Strokers, Fleshlights, penis rings, pumps and prostate massagers chosen for men. Compare brands and prices, then buy discreetly.',
    intro:
      'Everything designed with men in mind, from first-time strokers to prostate massagers. If you are not sure where to start, a manual stroker and a bottle of water-based lube is the easiest first step.',
    rule: { tags: ['male'] },
    guide: 'fleshlight-vs-tenga',
  },
  {
    slug: 'sex-toys-for-women',
    name: 'Sex Toys for Women',
    group: 'For Her',
    metaTitle: 'Best Sex Toys for Women: Vibrators, Suction & More',
    metaDescription:
      'Vibrators, clitoral suction toys, wands and G-spot toys chosen for women. Clear guidance, real specs and current prices.',
    intro:
      'Toys designed for vulva owners, from discreet bullets to air-pulse clitoral stimulators. Most people start with external stimulation, so a clitoral or wand vibrator is the safest first pick.',
    rule: { tags: ['female'] },
    guide: 'how-to-choose-your-first-vibrator',
  },
  {
    slug: 'couples-sex-toys',
    name: 'Couples Sex Toys',
    group: 'For Couples',
    metaTitle: 'Best Couples Sex Toys: Wearables & App-Controlled',
    metaDescription:
      'Wearable vibrators, vibrating rings and app-controlled toys built for two. How they work and current prices.',
    intro:
      'Toys made to be shared. Wearables and vibrating rings work during sex, while app-controlled toys let a partner take over from across the room or across the country.',
    rule: { title: 'couple|partner|we-vibe|wearable' },
  },
  {
    slug: 'app-controlled-sex-toys',
    name: 'App-Controlled Sex Toys',
    group: 'For Couples',
    metaTitle: 'App-Controlled Sex Toys: Lovense, We-Vibe & Kiiroo',
    metaDescription:
      'Bluetooth and app-controlled vibrators and strokers for solo play or long-distance couples. Compare Lovense, We-Vibe, Kiiroo and more.',
    intro:
      'Bluetooth toys pair with a phone app for custom patterns, music sync and remote control by a partner anywhere in the world. Check that the brand app supports your phone before you buy.',
    rule: { tags: ['app'] },
  },
  {
    slug: 'rabbit-vibrators',
    name: 'Rabbit Vibrators',
    group: 'By Style',
    metaTitle: 'Best Rabbit Vibrators for Dual Stimulation',
    metaDescription:
      'Rabbit vibrators that stimulate the G-spot and clitoris at once. Compare fit, power and price from top brands.',
    intro:
      'A rabbit pairs an internal shaft with an external arm for dual stimulation. Fit matters: look for a flexible arm so it lines up with your body.',
    rule: { hubs: ['vibrators'], title: 'rabbit' },
    guide: 'how-to-choose-your-first-vibrator',
  },
  {
    slug: 'wand-vibrators',
    name: 'Wand Vibrators',
    group: 'By Style',
    metaTitle: 'Best Wand Vibrators: Powerful Massagers Compared',
    metaDescription:
      'Wand vibrators and massagers from Le Wand, Magic Wand and more. Compare power, size, cordless options and price.',
    intro:
      'Wands deliver broad, deep vibration and are the go-to for people who want strength over subtlety. Cordless rechargeable models are the most versatile.',
    rule: { hubs: ['vibrators'], title: '\\bwand' },
    guide: 'how-to-choose-your-first-vibrator',
  },
  {
    slug: 'clitoral-vibrators',
    name: 'Clitoral Vibrators',
    group: 'By Style',
    metaTitle: 'Best Clitoral Vibrators & Suction Toys',
    metaDescription:
      'Clitoral vibrators and air-pulse suction toys from Womanizer, Satisfyer and more. Compare intensity, noise and price.',
    intro:
      'Clitoral toys focus on external stimulation, which is how most vulva owners reach orgasm. Air-pulse suction toys feel gentler and less direct than traditional vibration.',
    rule: { hubs: ['vibrators'], title: 'clit|suction|air|womanizer' },
    guide: 'how-to-choose-your-first-vibrator',
  },
  {
    slug: 'g-spot-vibrators',
    name: 'G-Spot Vibrators',
    group: 'By Style',
    metaTitle: 'Best G-Spot Vibrators: Curved Toys Compared',
    metaDescription:
      'Curved G-spot vibrators and dildos chosen for internal stimulation. Compare shape, firmness and price.',
    intro:
      'G-spot toys have a curved tip that presses on the front wall of the vagina. Firmer silicone gives more targeted pressure.',
    rule: { title: 'g-spot|g spot' },
  },
  {
    slug: 'realistic-dildos',
    name: 'Realistic Dildos',
    group: 'By Style',
    metaTitle: 'Best Realistic Dildos: Lifelike Feel & Suction Bases',
    metaDescription:
      'Lifelike dildos with veining, dual-density feel and suction cup bases. Sizing tips and current prices.',
    intro:
      'Realistic dildos are sculpted for a lifelike look and feel. Dual-density models are soft outside with a firm core, and a suction base makes them hands-free.',
    rule: { hubs: ['dildos'], title: 'realistic|cock|signature|dual density|dual-density' },
  },
  {
    slug: 'butt-plugs',
    name: 'Butt Plugs',
    group: 'By Style',
    metaTitle: 'Best Butt Plugs for Beginners & Beyond',
    metaDescription:
      'Silicone, glass, metal and vibrating butt plugs in every size. Beginner sizing advice and current prices.',
    intro:
      'Butt plugs are designed to stay in place, with a tapered tip, a narrow neck and a flared base for safety. Start small and use plenty of lube.',
    rule: { hubs: ['anal-toys'], title: 'plug' },
  },
  {
    slug: 'automatic-strokers',
    name: 'Automatic Strokers',
    group: 'For Him',
    metaTitle: 'Best Automatic Strokers & Hands-Free Masturbators',
    metaDescription:
      'Hands-free strokers with thrusting, suction and rotation from Kiiroo, Lovense, Tenga and more. Compare features and price.',
    intro:
      'Automatic strokers do the work for you with thrusting, rotation or suction. Many pair with apps or video for an interactive experience.',
    rule: { tags: ['masturbation type_automatic'] },
    guide: 'fleshlight-vs-tenga',
  },
  {
    slug: 'pocket-pussies',
    name: 'Pocket Pussies',
    group: 'For Him',
    metaTitle: 'Best Pocket Pussies: Realistic & Affordable Strokers',
    metaDescription:
      'Compact, realistic pocket strokers in vaginal, anal and mouth entry styles. Easy cleanup tips and current prices.',
    intro:
      'Pocket strokers are compact, realistic and easy to store. Open-ended designs are the easiest to clean.',
    rule: { hubs: ['strokers'], title: 'pussy|pocket|stroker' },
    guide: 'fleshlight-vs-tenga',
  },
  {
    slug: 'prostate-vibrators',
    name: 'Prostate Vibrators',
    group: 'For Him',
    metaTitle: 'Best Vibrating Prostate Massagers',
    metaDescription:
      'Vibrating prostate massagers from b-Vibe, Lelo, Aneros and more. Beginner-friendly picks and current prices.',
    intro:
      'Vibrating prostate massagers add sensation faster than hands-free designs, which makes them easier for first-timers.',
    rule: { hubs: ['prostate-massagers'], title: 'vibrat|remote|rechargeable' },
  },
  {
    slug: 'vibrating-cock-rings',
    name: 'Vibrating Cock Rings',
    group: 'For Couples',
    metaTitle: 'Best Vibrating Cock Rings for Couples',
    metaDescription:
      'Vibrating penis rings that help firmness and add clitoral stimulation during sex. Fit tips and current prices.',
    intro:
      'A vibrating ring helps maintain firmness and puts vibration where both partners feel it. Stretchy silicone is the easiest fit.',
    rule: { hubs: ['penis-rings'], title: 'vibrat' },
  },
  {
    slug: 'fleshlight',
    name: 'Fleshlight',
    group: 'By Brand',
    metaTitle: 'Fleshlight: Every Sleeve, Girls Model & Accessory',
    metaDescription:
      'Fleshlight Girls, Quickshot, Flight and accessories compared by texture and size, with current prices.',
    intro:
      'Fleshlight is the best-known stroker brand, with reusable sleeves molded from adult stars and dozens of internal textures.',
    rule: { brands: ['fleshlight'] },
    guide: 'fleshlight-vs-tenga',
  },
  {
    slug: 'tenga',
    name: 'Tenga',
    group: 'By Brand',
    metaTitle: 'Tenga Strokers, Cups & Eggs Compared',
    metaDescription:
      'Tenga cups, eggs, Flip and Spinner strokers compared by feel and reusability, with current prices.',
    intro:
      'Tenga makes clean, design-led strokers, from single-use cups to reusable Flip and Spinner models.',
    rule: { brands: ['tenga'] },
    guide: 'fleshlight-vs-tenga',
  },
  {
    slug: 'lelo',
    name: 'LELO',
    group: 'By Brand',
    metaTitle: 'LELO Vibrators & Massagers Compared',
    metaDescription:
      'LELO vibrators, suction toys and prostate massagers compared by feature and price.',
    intro: 'LELO is a Swedish luxury brand known for premium silicone, quiet motors and long warranties.',
    rule: { brands: ['lelo'] },
  },
  {
    slug: 'womanizer',
    name: 'Womanizer',
    group: 'By Brand',
    metaTitle: 'Womanizer Air-Pulse Toys Compared',
    metaDescription:
      'Every Womanizer air-pulse clitoral stimulator compared by intensity, size and price.',
    intro:
      'Womanizer invented air-pulse clitoral stimulation, which uses gentle suction waves instead of direct vibration.',
    rule: { brands: ['womanizer'] },
  },
  {
    slug: 'lovense',
    name: 'Lovense',
    group: 'By Brand',
    metaTitle: 'Lovense App-Controlled Toys Compared',
    metaDescription:
      'Lovense app-controlled vibrators and strokers for solo and long-distance play, with current prices.',
    intro: 'Lovense specializes in app-controlled toys built for long-distance couples and interactive play.',
    rule: { brands: ['lovense'] },
  },
  {
    slug: 'we-vibe',
    name: 'We-Vibe',
    group: 'By Brand',
    metaTitle: 'We-Vibe Couples Vibrators Compared',
    metaDescription:
      'We-Vibe wearable and app-controlled couples vibrators compared by fit and features, with current prices.',
    intro: 'We-Vibe pioneered the wearable couples vibrator and pairs most toys with its We-Connect app.',
    rule: { brands: ['we-vibe', 'we vibe'] },
  },
  {
    slug: 'sex-toys-under-50',
    name: 'Sex Toys Under $50',
    group: 'By Budget',
    metaTitle: 'Best Sex Toys Under $50',
    metaDescription:
      'Quality vibrators, strokers, plugs and lubes under $50. Body-safe picks that do not cut corners.',
    intro:
      'A great first toy does not have to be expensive. Everything here is under $50, and body-safe silicone is the one place not to compromise.',
    rule: { maxPrice: 50 },
  },
  {
    slug: 'luxury-sex-toys',
    name: 'Luxury Sex Toys',
    group: 'By Budget',
    metaTitle: 'Luxury Sex Toys Worth the Investment',
    metaDescription:
      'Premium vibrators, strokers and machines over $150 from LELO, Womanizer, Kiiroo and more, with current prices.',
    intro:
      'Premium toys earn their price with stronger, quieter motors, better materials and longer warranties. These are the pieces worth investing in.',
    rule: { minPrice: 150 },
  },
]

export const COLLECTIONS_BY_SLUG: Record<string, Collection> = Object.fromEntries(
  COLLECTIONS.map((c) => [c.slug, c])
)

export const COLLECTION_GROUPS = [
  'For Him',
  'For Her',
  'For Couples',
  'By Style',
  'By Brand',
  'By Budget',
] as const
