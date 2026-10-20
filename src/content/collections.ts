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
  /** Regex the product title must NOT match. */
  excludeTitle?: string
  /** Regex tested against the product title and tags; any match counts. */
  text?: string
  brands?: string[]
  minPrice?: number
  maxPrice?: number
  /** Only products currently marked down (compareAtPrice above price). */
  onSale?: boolean
}

export interface Collection {
  slug: string
  name: string
  group: 'For Him' | 'For Her' | 'For Couples' | 'Gift Ideas' | 'By Style' | 'By Brand' | 'By Budget'
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
    guide: 'best-couples-sex-toys',
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
    guide: 'long-distance-sex-toys',
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
    rule: { hubs: ['vibrators'], title: 'rabbit', excludeTitle: 'strap|harness' },
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
    guide: 'best-wand-vibrators',
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
    guide: 'clitoral-vs-g-spot-vibrators',
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
    guide: 'clitoral-vs-g-spot-vibrators',
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
    guide: 'best-automatic-strokers',
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
    guide: 'prostate-massage-for-beginners',
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
    guide: 'how-to-use-a-penis-ring',
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
    slug: 'sex-toy-gift-sets',
    name: 'Sex Toy Gift Sets',
    group: 'Gift Ideas',
    metaTitle: 'Sex Toy Gift Sets & Kits for Her, Him & Couples',
    metaDescription:
      'Ready-to-give sex toy kits and gift sets: vibrator collections, couples kits, bondage starters and more, with current prices.',
    intro:
      'A set takes the guesswork out of gifting. Kits bundle toys that work together, so the person opening it has options and nothing to figure out on day one.',
    rule: { text: '\\b(kit|set|collection|gift box|gift set)\\b', excludeTitle: 'lingerie|bodysuit|stocking|garter' },
    guide: 'valentines-day-sex-toy-gifts',
  },
  {
    slug: 'stocking-stuffers',
    name: 'Stocking Stuffers Under $30',
    group: 'Gift Ideas',
    metaTitle: 'Naughty Stocking Stuffers Under $30',
    metaDescription:
      'Small, giftable adult toys under $30: bullets, rings, strokers, lube and more. Easy wins for a stocking or a secret Santa for two.',
    intro:
      'Small enough for a stocking, good enough to get used. Everything here is under $30, which makes it an easy add-on to a bigger gift or a low-pressure first toy.',
    rule: {
      maxPrice: 30,
      hubs: ['vibrators', 'strokers', 'penis-rings', 'lubricants', 'anal-toys', 'bdsm', 'couples', 'more-toys'],
    },
    guide: 'naughty-stocking-stuffers',
  },
  {
    slug: 'bullet-vibrators',
    name: 'Bullet Vibrators',
    group: 'By Style',
    metaTitle: 'Best Bullet Vibrators: Small, Quiet & Powerful',
    metaDescription:
      'Compact bullet vibrators for travel, beginners and use during sex. Compare power, noise and charging, with current prices.',
    intro:
      'Bullets are small, focused and easy to bring into partnered sex. They are the most affordable way to try vibration, and a rechargeable bullet is a favorite even in large collections.',
    rule: { hubs: ['vibrators'], title: 'bullet' },
    guide: 'how-to-use-sex-toys-with-a-partner',
  },
  {
    slug: 'remote-control-vibrators',
    name: 'Remote Control Vibrators',
    group: 'For Couples',
    metaTitle: 'Best Remote Control Vibrators for Couples',
    metaDescription:
      'Remote and app-controlled vibrators, panty vibes and wearables that hand the controls to a partner. Compare range and price.',
    intro:
      'A remote hands the controls to someone else, which is the whole fun. Wearable panty vibes suit date nights out; app-controlled models work from anywhere.',
    rule: { hubs: ['vibrators', 'couples'], title: 'remote|app' },
    guide: 'long-distance-sex-toys',
  },
  {
    slug: 'thrusting-vibrators',
    name: 'Thrusting Vibrators',
    group: 'By Style',
    metaTitle: 'Best Thrusting Vibrators & Thrusting Rabbits',
    metaDescription:
      'Thrusting vibrators and rabbits that move on their own for hands-free, rhythmic sensation. Compare stroke, power and price.',
    intro:
      'A thrusting toy moves in and out on its own, so you can focus on the feeling rather than the motion. Thrusting rabbits add external vibration on top.',
    rule: { hubs: ['vibrators', 'dildos'], title: 'thrust' },
  },
  {
    slug: 'anal-beads',
    name: 'Anal Beads',
    group: 'By Style',
    metaTitle: 'Best Anal Beads: Silicone, Graduated & Vibrating',
    metaDescription:
      'Graduated, silicone and vibrating anal beads with retrieval rings. Beginner sizing advice and current prices.',
    intro:
      'Beads let you control intensity bead by bead, and graduated sizes make them a gentle way to explore. Choose one-piece silicone with a sturdy retrieval ring.',
    rule: { hubs: ['anal-toys'], title: 'bead' },
  },
  {
    slug: 'bondage-kits',
    name: 'Bondage Kits',
    group: 'For Couples',
    metaTitle: 'Best Bondage Kits for Beginners & Couples',
    metaDescription:
      'Beginner bondage and BDSM kits with restraints, blindfolds and ticklers. What is inside and current prices.',
    intro:
      'A kit is the easiest way to try light restraint together without buying piece by piece. Look for soft cuffs, a blindfold and something for sensation play.',
    rule: { hubs: ['bdsm'], title: '\\b(kit|set)\\b' },
    guide: 'bondage-for-beginners',
  },
  {
    slug: 'strap-on-kits',
    name: 'Strap-On Kits',
    group: 'For Couples',
    metaTitle: 'Best Strap-On Kits for Beginners & Pegging',
    metaDescription:
      'Strap-on kits that pair a harness with a compatible dildo, sized for beginners and pegging. Fit tips and current prices.',
    intro:
      'A kit solves the biggest strap-on problem, which is matching a harness to a dildo that fits it. Start with an adjustable harness and a modest size.',
    rule: { hubs: ['strap-ons'], title: '\\b(kit|set|system)\\b|with (a )?dildo|harness (and|&) dildo' },
    guide: 'pegging-for-beginners',
  },
  {
    slug: 'sex-swings',
    name: 'Sex Swings & Slings',
    group: 'For Couples',
    metaTitle: 'Sex Swings, Door Swings & Slings',
    metaDescription:
      'Door swings, ceiling swings and slings compared by setup, weight limit and price. Make hard positions easy.',
    intro:
      'A swing takes the weight off so positions that are tiring to hold become easy. Door-mounted swings install in minutes; stands and ceiling mounts are sturdier.',
    rule: { text: 'swing|\\bsling\\b' },
    guide: 'how-to-spice-up-your-marriage',
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
    guide: 'sex-toy-gifts-for-her',
  },
  {
    slug: 'sex-toys-under-100',
    name: 'Sex Toys Under $100',
    group: 'By Budget',
    metaTitle: 'Best Sex Toys Under $100',
    metaDescription:
      'The sweet spot for quality: rechargeable vibrators, strokers and couples toys from $50 to $100, with current prices.',
    intro:
      'Between $50 and $100 is where most toys get rechargeable, quieter and better made. It is the best range for a gift that feels considered without going luxury.',
    rule: { minPrice: 50, maxPrice: 100 },
    guide: 'sex-toy-gifts-for-him',
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
    guide: 'anniversary-sex-toy-gifts',
  },
  {
    slug: 'water-based-lube',
    name: 'Water-Based Lube',
    group: 'By Style',
    metaTitle: 'Water-Based Lube: Safe With Every Toy and Condom',
    metaDescription:
      'Water-based lubes from Sliquid, pjur, LELO and more. Safe with silicone toys, strokers and condoms, and easy to rinse away.',
    intro:
      'Water-based lube is the one bottle that works with everything: silicone toys, stroker sleeves, latex condoms and sensitive skin. It rinses off with plain water, and if it starts to feel tacky, a few drops of water or a little more lube brings it back.',
    rule: { hubs: ['lubricants'], text: 'water', excludeTitle: 'silicone|hybrid|oil|wash|cleaner|fuck|jizz|cum|semen|fisting' },
    guide: 'best-lube-for-sex-toys',
  },
  {
    slug: 'silicone-lube',
    name: 'Silicone Lube',
    group: 'By Style',
    metaTitle: 'Silicone Lube: Long-Lasting and Shower-Proof',
    metaDescription:
      'Silicone lubes from Uberlube, pjur, Sliquid and more. Long-lasting glide for sex, massage and the shower, with toy-safety notes.',
    intro:
      'Silicone lube stays slippery far longer than water-based formulas and does not wash away in the shower. It is a favorite for sex without toys and is safe with latex condoms. Keep it away from silicone toys unless the toy maker says otherwise, because it can leave the surface tacky over time.',
    rule: { hubs: ['lubricants'], text: 'silicone|uber ?lube', excludeTitle: 'hybrid|water|fuck|jizz|cum|semen|fisting' },
    guide: 'best-lube-for-sex-toys',
  },
  {
    slug: 'quiet-vibrators',
    name: 'Quiet Vibrators',
    group: 'By Style',
    metaTitle: 'Quiet Vibrators From Design-Led Brands',
    metaDescription:
      'Vibrators from LELO, We-Vibe, Womanizer, ROMP, Svakom and VUSH, chosen for shared homes and thin walls. Tips for keeping noise down.',
    intro:
      'Noise is rarely published in a way you can compare, so this collection sticks to brands known for well-finished motors and leaves out thrusting toys, which tend to be the loudest. Lower settings, a towel underneath and a rumbly rather than buzzy toy all help further.',
    rule: {
      hubs: ['vibrators'],
      brands: ['lelo', 'we-vibe', 'womanizer', 'romp', 'svakom', 'vush'],
      excludeTitle: 'thrust|strap|harness|attachment|remote$',
    },
    guide: 'how-to-choose-your-first-vibrator',
  },
  {
    slug: 'sex-toys-for-beginners',
    name: 'Sex Toys for Beginners',
    group: 'By Style',
    metaTitle: 'Sex Toys for Beginners: Simple, Body-Safe Picks',
    metaDescription:
      'Easy first toys from ROMP, Le Wand, VUSH, Tenga, LELO and more: small vibrators, strokers and lube at approachable prices.',
    intro:
      'A good first toy is simple, body-safe and not too expensive. Everything here comes from brands with a track record, at a price that makes it easy to find out what you like before investing more. Add a water-based lube and you have everything you need.',
    rule: {
      hubs: ['vibrators', 'strokers', 'lubricants', 'penis-rings'],
      brands: ['romp', 'le wand', 'vush', 'tenga', 'lelo', 'we-vibe', 'womanizer', 'svakom', 'arcwave', 'sliquid', 'pjur', 'uber lube'],
      excludeTitle: 'thrust|strap|harness|attachment|anal|plug|remote$|fisting|warming|tingl',
      maxPrice: 80,
    },
    guide: 'sex-toys-for-beginners',
  },
  {
    slug: 'discreet-sex-toys',
    name: 'Discreet Sex Toys',
    group: 'By Style',
    metaTitle: 'Discreet Sex Toys: Small, Quiet and Easy to Store',
    metaDescription:
      'Lipstick vibrators, mini wands, travel toys and compact strokers that look unremarkable in a drawer or a bag. Current prices.',
    intro:
      'Discreet toys are small, plain-looking and easy to store. Lipstick-style vibrators, mini wands and compact strokers fit in a toiletry bag, and most charge by USB like any other gadget. Orders ship from our retail partner in plain packaging.',
    rule: {
      hubs: ['vibrators', 'strokers'],
      title: 'lipstick|\\bmini\\b|travel|pocket|compact|discreet|bullet|\\begg\\b',
      excludeTitle: 'pussy|strap|harness|realistic|cock|dildo|butt|anal|thrust',
      brands: ['lelo', 'we-vibe', 'womanizer', 'romp', 'le wand', 'vush', 'svakom', 'tenga', 'arcwave', 'kiiroo', 'lovense', 'je joue', 'magic wand'],
    },
    guide: 'sex-toys-for-beginners',
  },
  {
    slug: 'black-friday-sex-toy-deals',
    name: 'Sex Toy Deals',
    group: 'By Budget',
    metaTitle: 'Black Friday Sex Toy Deals: Current Markdowns',
    metaDescription:
      'Every vibrator, stroker and couples toy our retail partner currently has marked down, updated with each catalog sync.',
    intro:
      'This page lists only products that are currently marked below their usual price at our retail partner, so it changes as sales start and end. Around Black Friday it fills up; the rest of the year it is a short list worth checking before you pay full price.',
    rule: {
      onSale: true,
      hubs: ['vibrators', 'strokers', 'couples', 'penis-rings', 'prostate-massagers', 'lubricants', 'dildos', 'anal-toys', 'bdsm'],
      excludeTitle: 'pussy|jizz|cum\\b|semen|slut|bitch|fuck',
    },
    guide: 'black-friday-sex-toy-deals',
  },
]

export const COLLECTIONS_BY_SLUG: Record<string, Collection> = Object.fromEntries(
  COLLECTIONS.map((c) => [c.slug, c])
)

export const COLLECTION_GROUPS = [
  'For Him',
  'For Her',
  'For Couples',
  'Gift Ideas',
  'By Style',
  'By Brand',
  'By Budget',
] as const
