/**
 * Search-led collection pages at /shop/<slug>. Each one targets a query people
 * actually type ("rabbit vibrators", "sex toys for men") and is built from a
 * rule over the synced catalog. Intros are original copy.
 */
import { RETIRED_COLLECTIONS } from '@/content/retired'

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
  /** Further guide slugs linked under the grid, after `guide`. */
  guides?: string[]
}

const ALL_COLLECTIONS: Collection[] = [
  {
    slug: 'sex-toys-for-men',
    name: 'Sex Toys for Men',
    group: 'For Him',
    metaTitle: 'Best Sex Toys for Men: Strokers, Rings & Prostate Toys',
    metaDescription:
      'Sex toys for men that make solo time and partnered sex feel better: strokers, penis rings, pumps and prostate toys, with simple tips on where to start.',
    intro:
      'Feeling good is for everyone, and these toys are made with men\'s bodies in mind, from first strokers to prostate massagers. If you are not sure where to start, a manual stroker and a bottle of water-based lube is an easy, low-pressure first step.',
    rule: { hubs: ['strokers', 'prostate-massagers', 'penis-rings'] },
    guide: 'fleshlight-vs-tenga',
  },
  {
    slug: 'sex-toys-for-women',
    name: 'Sex Toys for Women',
    group: 'For Her',
    metaTitle: 'Best Sex Toys for Women: Vibrators, Suction & More',
    metaDescription:
      'Sex toys for women that help you learn what you love: vibrators, clitoral suction toys, wands and G-spot picks, with friendly advice on where to start.',
    intro:
      'Knowing what you enjoy is a confident place to be, and the right toy makes finding out easy. Most people start with external stimulation, so a clitoral or wand vibrator is a comfortable first pick, with discreet bullets and air-pulse toys close behind.',
    rule: { hubs: ['vibrators', 'dildos'], excludeTitle: 'strap' },
    guide: 'how-to-choose-your-first-vibrator',
  },
  {
    slug: 'couples-sex-toys',
    name: 'Couples Sex Toys',
    group: 'For Couples',
    metaTitle: 'Best Couples Sex Toys: Wearables & App-Controlled',
    metaDescription:
      'Couples sex toys that bring you closer: wearable vibrators, vibrating rings and app-controlled toys made for two. See how each one fits into your sex life.',
    intro:
      'Toys made to share bring more pleasure and more playfulness to sex for both of you. Wearables and vibrating rings work during sex, while app-controlled toys let a partner take over from across the room or across the country.',
    rule: { hubs: ['vibrators', 'penis-rings', 'anal-toys', 'dildos', 'bdsm'], text: 'remote control' },
    guide: 'best-couples-sex-toys',
  },
  {
    slug: 'app-controlled-sex-toys',
    name: 'App-Controlled Sex Toys',
    group: 'For Couples',
    metaTitle: 'App-Controlled Sex Toys: Every Lovense Toy Compared',
    metaDescription:
      'App-controlled Lovense toys that keep you connected, solo or across the miles. Compare Lush, Nora, Max and more for patterns, remote play and easy pairing.',
    intro:
      'An app-connected toy lets you shape the feeling with custom patterns or hand the controls to a partner anywhere in the world, which can make distance feel a lot smaller. Check that the brand app supports your phone before you buy.',
    rule: { text: 'app controlled' },
    guide: 'long-distance-sex-toys',
  },
  {
    slug: 'rabbit-vibrators',
    name: 'Rabbit Vibrators',
    group: 'By Style',
    metaTitle: 'Best Rabbit Vibrators for Dual Stimulation',
    metaDescription:
      'Rabbit vibrators that pair internal and clitoral sensation for fuller pleasure. Compare fit, power and flexibility to find the one that suits your body.',
    intro:
      'A rabbit pairs an internal shaft with an external arm, so you feel both at once. Comfort depends on fit, so look for a flexible arm that lines up with your body rather than one you have to work around.',
    rule: { hubs: ['vibrators'], title: 'rabbit', excludeTitle: 'strap|harness' },
    guide: 'how-to-choose-your-first-vibrator',
  },
  {
    slug: 'wand-vibrators',
    name: 'Wand Vibrators',
    group: 'By Style',
    metaTitle: 'Best Wand Vibrators: Powerful Massagers Compared',
    metaDescription:
      'Wand vibrators for deep, rumbly sensation you can relax into, from Le Wand, Magic Wand and more. Compare power, size and cordless options to choose yours.',
    intro:
      'Wands deliver broad, deep vibration that many people find easy to relax into, on the body or as a massager. Cordless rechargeable models are the most versatile, and you can always start on the lowest setting.',
    rule: { hubs: ['vibrators'], title: '\\bwand' },
    guide: 'best-wand-vibrators',
  },
  {
    slug: 'clitoral-vibrators',
    name: 'Clitoral Vibrators',
    group: 'By Style',
    metaTitle: 'Best Clitoral Vibrators & Suction Toys',
    metaDescription:
      'Lovense clitoral vibrators and suction toys, from Tenera 2 to Fizz and Hyphy, for the kind of pleasure most bodies love. Compare feel and app features here.',
    intro:
      'External stimulation is how most vulva owners reach orgasm, so a clitoral toy is often the most satisfying place to start. Air-pulse suction toys feel gentler and less direct than traditional vibration, which many people find easier to enjoy.',
    rule: { hubs: ['vibrators'], title: 'clit|suction|air|womanizer' },
    guide: 'clitoral-vs-g-spot-vibrators',
  },
  {
    slug: 'g-spot-vibrators',
    name: 'G-Spot Vibrators',
    group: 'By Style',
    metaTitle: 'Best G-Spot Vibrators: Curved Toys Compared',
    metaDescription:
      'Curved G-spot vibrators and dildos for exploring internal pleasure at your own pace. Compare shape and firmness to find the pressure that feels right.',
    intro:
      'G-spot toys have a curved tip that presses gently on the front wall of the vagina, a feeling many people describe as fuller and deeper. Firmer silicone gives more targeted pressure, and some external play first helps you relax into it.',
    rule: { title: 'g-spot|g spot' },
    guide: 'clitoral-vs-g-spot-vibrators',
  },
  {
    slug: 'realistic-dildos',
    name: 'Realistic Dildos',
    group: 'By Style',
    metaTitle: 'Best Realistic Dildos: Lifelike Feel & Suction Bases',
    metaDescription:
      'Realistic dildos with a lifelike look and feel, dual-density softness and suction bases for hands-free play. Simple sizing tips so you choose comfortably.',
    intro:
      'Realistic dildos are sculpted to look and feel lifelike, which many people find familiar and easy to relax with. Dual-density models are soft outside with a firm core, and a suction base frees your hands.',
    rule: { hubs: ['dildos'], title: 'realistic|cock|signature|dual density|dual-density' },
  },
  {
    slug: 'butt-plugs',
    name: 'Butt Plugs',
    group: 'By Style',
    metaTitle: 'Best Butt Plugs for Beginners & Beyond',
    metaDescription:
      'Butt plugs in silicone, glass and metal, with flared bases for safety and sizes for every comfort level. Gentle beginner advice to help you start easy.',
    intro:
      'A butt plug gives a full, steady sensation that many people enjoy on its own or during sex. A tapered tip, a narrow neck and a flared base keep it comfortable and safe, so start small and use plenty of lube.',
    rule: { hubs: ['anal-toys'], title: 'plug' },
  },
  {
    slug: 'automatic-strokers',
    name: 'Automatic Strokers',
    group: 'For Him',
    metaTitle: 'Best Automatic Strokers & Hands-Free Masturbators',
    metaDescription:
      'Automatic Lovense strokers that do the work so you can lie back and enjoy it. Compare Solace, Solace Pro and Gush 2 Motion by motion, size and app control.',
    intro:
      'Automatic strokers handle the motion with thrusting, rotation or suction, so you can relax and focus on the feeling. Many pair with apps or video, and some let a partner take control from afar.',
    rule: { hubs: ['strokers'], title: 'automatic|thrust|motion|blowjob' },
    guide: 'best-automatic-strokers',
  },
  {
    slug: 'pocket-pussies',
    name: 'Pocket Pussies',
    group: 'For Him',
    metaTitle: 'Best Pocket Pussies: Realistic & Affordable Strokers',
    metaDescription:
      'Pocket pussies and compact strokers that feel realistic and store easily, in vaginal, anal and mouth entry styles. Simple cleanup tips to keep things easy.',
    intro:
      'Pocket strokers are compact, realistic and easy to keep out of sight, which makes solo time feel relaxed and private. Open-ended designs are the easiest to rinse and dry.',
    rule: { hubs: ['strokers'], title: 'pussy|pocket|stroker' },
    guide: 'fleshlight-vs-tenga',
  },
  {
    slug: 'prostate-vibrators',
    name: 'Prostate Vibrators',
    group: 'For Him',
    metaTitle: 'Best Vibrating Prostate Massagers',
    metaDescription:
      'App-controlled Lovense prostate massagers like Edge 2 that make a first try feel easy and rewarding. Beginner-friendly picks and gentle how-to tips.',
    intro:
      'Vibration brings sensation sooner than hands-free designs, which makes a first try at prostate play feel rewarding rather than like guesswork. Go slowly, breathe and use plenty of lube.',
    rule: { hubs: ['prostate-massagers'], title: 'vibrat|remote|app-controlled|dual-motor' },
    guide: 'prostate-massage-for-beginners',
  },
  {
    slug: 'vibrating-cock-rings',
    name: 'Vibrating Cock Rings',
    group: 'For Couples',
    metaTitle: 'Best Vibrating Cock Rings for Couples',
    metaDescription:
      'Vibrating cock rings that help you stay firm and add clitoral sensation your partner can feel too. Easy fit tips for a comfortable, shared experience.',
    intro:
      'A vibrating ring helps you stay firm and puts vibration right where both of you can feel it, which makes it one of the simplest shared upgrades. Stretchy silicone is the easiest, most comfortable fit.',
    rule: { hubs: ['penis-rings'], title: 'vibrat' },
    guide: 'how-to-use-a-penis-ring',
  },
  {
    slug: 'fleshlight',
    name: 'Fleshlight',
    group: 'By Brand',
    metaTitle: 'Fleshlight: Every Sleeve, Girls Model & Accessory',
    metaDescription:
      'Fleshlight sleeves, Girls models, Quickshot and Flight compared by texture and size, so you can pick a feel you will love. Care tips and accessories too.',
    intro:
      'Fleshlight is the best-known stroker brand, with reusable sleeves in dozens of internal textures, including models molded from adult performers. Pick a texture that matches the intensity you like, and the right accessories make cleanup easy.',
    rule: { brands: ['fleshlight'] },
    guide: 'fleshlight-vs-tenga',
    guides: ['best-fleshlight-for-beginners', 'how-to-clean-a-fleshlight', 'best-lube-for-sex-toys'],
  },
  {
    slug: 'tenga',
    name: 'Tenga',
    group: 'By Brand',
    metaTitle: 'Tenga Strokers, Cups & Eggs Compared',
    metaDescription:
      'Tenga cups, eggs, Flip and Spinner strokers compared by feel and reusability. A simple, low-pressure way to try new sensations and find your favorite.',
    intro:
      'Tenga makes clean, thoughtfully designed strokers, from single-use cups to reusable Flip and Spinner models. Trying a few cups is a low-pressure way to find out which sensations you like best.',
    rule: { brands: ['tenga'] },
    guide: 'fleshlight-vs-tenga',
    guides: ['how-to-clean-sex-toys', 'best-lube-for-sex-toys'],
  },
  {
    slug: 'lelo',
    name: 'LELO',
    group: 'By Brand',
    metaTitle: 'LELO Vibrators & Massagers Compared',
    metaDescription:
      'LELO vibrators, suction toys and prostate massagers compared by feel and features. Quiet motors and soft silicone that make it easy to relax and enjoy.',
    intro:
      'LELO is a Swedish brand known for soft silicone, quiet motors and long warranties. That quiet matters if you share a home, and the smooth finish makes its toys easy to relax with.',
    rule: { brands: ['lelo'] },
    guides: ['womanizer-vs-lelo-sona', 'how-to-choose-your-first-vibrator'],
  },
  {
    slug: 'womanizer',
    name: 'Womanizer',
    group: 'By Brand',
    metaTitle: 'Womanizer Air-Pulse Toys Compared',
    metaDescription:
      'Every Womanizer air-pulse clitoral stimulator compared by intensity and size. Gentle, contact-free sensation that many people find easy to enjoy.',
    intro:
      'Womanizer invented air-pulse clitoral stimulation, which uses gentle suction waves instead of direct vibration. Many people find it a softer, more comfortable way to reach orgasm, especially if direct vibration feels like too much.',
    rule: { brands: ['womanizer'] },
    guides: ['womanizer-vs-lelo-sona', 'clitoral-vs-g-spot-vibrators'],
  },
  {
    slug: 'lovense',
    name: 'Lovense',
    group: 'By Brand',
    metaTitle: 'Lovense App-Controlled Toys Compared',
    metaDescription:
      'Lovense app-controlled vibrators and strokers for solo play and long-distance couples. Stay connected, share the controls and keep things playful.',
    intro:
      'Lovense specializes in app-controlled toys that help couples stay close across any distance. Share the controls with a partner, or set your own patterns for solo play.',
    rule: { brands: ['lovense'] },
    guides: ['lovense-vs-we-vibe', 'long-distance-sex-toys'],
  },
  {
    slug: 'we-vibe',
    name: 'We-Vibe',
    group: 'By Brand',
    metaTitle: 'We-Vibe Couples Vibrators Compared',
    metaDescription:
      'We-Vibe wearable and app-controlled couples vibrators compared by fit and features. Designed to stay comfortable during sex so you both feel more.',
    intro:
      'We-Vibe pioneered the wearable couples vibrator, designed to stay comfortable during sex so both of you feel more. Most models pair with the We-Connect app for remote play.',
    rule: { brands: ['we-vibe', 'we vibe'] },
    guides: ['lovense-vs-we-vibe', 'best-couples-sex-toys'],
  },
  {
    slug: 'sex-toy-gift-sets',
    name: 'Sex Toy Gift Sets',
    group: 'Gift Ideas',
    metaTitle: 'Sex Toy Gift Sets & Kits for Her, Him & Couples',
    metaDescription:
      'Sex toy gift sets and kits that make a thoughtful, easy present: vibrator collections, couples kits and bondage starters. Something to explore together.',
    intro:
      'A set takes the guesswork out of gifting and gives the person opening it room to explore. Kits bundle toys that work together, so there are options to try and nothing to figure out on day one.',
    rule: { text: '\\b(kit|set|collection|gift box|gift set)\\b', excludeTitle: 'lingerie|bodysuit|stocking|garter' },
    guide: 'valentines-day-sex-toy-gifts',
  },
  {
    slug: 'lovense-bundles',
    name: 'Lovense Bundles',
    group: 'Gift Ideas',
    metaTitle: 'Lovense Bundles: Couples and Long-Distance Toy Sets',
    metaDescription:
      'Lovense bundles that pair two app-controlled toys, from Lush 4 and Ferri to Nora and Max 2. Matched sets for couples, long-distance play and gifts.',
    intro:
      'Some Lovense toys are made to work together. These sets pair two toys that connect in the same app, so partners can feel each other’s movements across the room or across the world. They are also an easy gift: one box, two toys, nothing to match up.',
    rule: { tags: ['bundle'] },
    guide: 'long-distance-sex-toys',
  },
  {
    slug: 'stocking-stuffers',
    name: 'Stocking Stuffers Under $30',
    group: 'Gift Ideas',
    metaTitle: 'Naughty Stocking Stuffers Under $30',
    metaDescription:
      'Stocking stuffers under $30 that bring a little fun to the holidays: bullets, rings, strokers and lube. Easy, low-pressure gifts for someone you love.',
    intro:
      'Small enough for a stocking, good enough to get used. Everything here is under $30, which makes it a playful add-on to a bigger gift or a low-pressure way to try a first toy.',
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
      'Bullet vibrators that are small, quiet and easy to bring into partnered sex or pack for travel. A low-pressure first toy, with tips on power and charging.',
    intro:
      'Bullets are small, focused and easy to bring into partnered sex without getting in the way. They are a low-pressure way to try vibration, and a good rechargeable bullet stays a favorite even in big collections.',
    rule: { hubs: ['vibrators'], title: 'bullet' },
    guide: 'how-to-use-sex-toys-with-a-partner',
  },
  {
    slug: 'remote-control-vibrators',
    name: 'Remote Control Vibrators',
    group: 'For Couples',
    metaTitle: 'Best Remote Control Vibrators for Couples',
    metaDescription:
      'Remote control vibrators, panty vibes and wearables that let you share the controls with a partner. Playful date nights and long-distance fun start here.',
    intro:
      'Handing the remote to someone you trust is playful and a little thrilling. Wearable panty vibes suit date nights out, and app-controlled models keep the connection going from anywhere.',
    rule: { hubs: ['vibrators', 'couples'], title: 'remote|app' },
    guide: 'long-distance-sex-toys',
  },
  {
    slug: 'thrusting-vibrators',
    name: 'Thrusting Vibrators',
    group: 'By Style',
    metaTitle: 'Best Thrusting Vibrators & Thrusting Rabbits',
    metaDescription:
      'Thrusting vibrators and rabbits that move on their own, so you can relax and focus on the feeling. Compare stroke, power and noise to pick the right one.',
    intro:
      'A thrusting toy moves in and out on its own, so you can lie back and focus on how it feels rather than the motion. Thrusting rabbits add external vibration on top for fuller sensation.',
    rule: { hubs: ['vibrators', 'dildos'], title: 'thrust' },
  },
  {
    slug: 'anal-beads',
    name: 'Anal Beads',
    group: 'By Style',
    metaTitle: 'Best Anal Beads: Silicone, Graduated & Vibrating',
    metaDescription:
      'Anal beads in graduated, silicone and vibrating styles, so you set the pace bead by bead. Beginner sizing advice to help it feel easy and comfortable.',
    intro:
      'Beads let you control intensity one bead at a time, so you are always in charge of the pace. Graduated sizes make them a gentle way to explore, and one-piece silicone with a sturdy retrieval ring is the most comfortable choice.',
    rule: { hubs: ['anal-toys'], title: 'bead' },
  },
  {
    slug: 'bondage-kits',
    name: 'Bondage Kits',
    group: 'For Couples',
    metaTitle: 'Best Bondage Kits for Beginners & Couples',
    metaDescription:
      'Beginner bondage kits with soft restraints, blindfolds and ticklers for exploring trust together. See what is inside and how to start comfortably.',
    intro:
      'A kit is an easy way to try light restraint together and see what you both enjoy, without buying piece by piece. Look for soft cuffs, a blindfold and something for sensation play, and agree on a safe word first.',
    rule: { hubs: ['bdsm'], title: '\\b(kit|set)\\b' },
    guide: 'bondage-for-beginners',
  },
  {
    slug: 'strap-on-kits',
    name: 'Strap-On Kits',
    group: 'For Couples',
    metaTitle: 'Best Strap-On Kits for Beginners & Pegging',
    metaDescription:
      'Strap-on kits that pair a comfortable harness with a matching dildo, sized for beginners and pegging. Fit tips so you both feel confident from day one.',
    intro:
      'A kit takes care of the trickiest part, matching a harness to a dildo that fits it, so you can focus on each other. Start with an adjustable harness and a modest size for a confident first time.',
    rule: { hubs: ['strap-ons'], title: '\\b(kit|set|system)\\b|with (a )?dildo|harness (and|&) dildo' },
    guide: 'pegging-for-beginners',
  },
  {
    slug: 'sex-swings',
    name: 'Sex Swings & Slings',
    group: 'For Couples',
    metaTitle: 'Sex Swings, Door Swings & Slings',
    metaDescription:
      'Sex swings and slings that support your weight so positions feel easy and comfortable. Compare door, ceiling and stand setups and their weight limits.',
    intro:
      'A swing takes your weight so positions that are tiring to hold feel easy, which leaves more energy for each other. Door-mounted swings install in minutes, while stands and ceiling mounts feel sturdier.',
    rule: { text: 'swing|\\bsling\\b' },
    guide: 'how-to-spice-up-your-marriage',
  },
  {
    slug: 'sex-toys-under-50',
    name: 'Sex Toys Under $50',
    group: 'By Budget',
    metaTitle: 'Best Sex Toys Under $50',
    metaDescription:
      'Sex toys under $50 that feel great without the stress of a big spend: body-safe vibrators, strokers and lube. Find your first favorite with confidence.',
    intro:
      'Feeling good does not need a big budget. Everything here is under $50, and body-safe silicone is the one thing worth insisting on, so you can try something new without second thoughts.',
    // Approachable categories only; novelty and explicit items stay out of the budget pages.
    rule: {
      maxPrice: 50,
      hubs: ['vibrators', 'strokers', 'lubricants', 'penis-rings', 'couples', 'prostate-massagers'],
      excludeTitle: 'sling|swing|machine|doll|pump|whip|flog|gag|bondage|chastity|celebrity|porn|slut|fuck|bitch|naughty|pussy|dong|realistic|novelty|gag gift|candy|edible|party',
    },
    guide: 'sex-toy-gifts-for-her',
  },
  {
    slug: 'sex-toys-under-100',
    name: 'Sex Toys Under $100',
    group: 'By Budget',
    metaTitle: 'Best Sex Toys Under $100',
    metaDescription:
      'Sex toys under $100 that feel thoughtful and well made: rechargeable vibrators, strokers and couples toys with quieter motors and comfortable materials.',
    intro:
      'Between $50 and $100 is where most toys become rechargeable, quieter and nicer to hold. It is a comfortable range for a first upgrade or a gift that feels considered.',
    rule: {
      minPrice: 50,
      maxPrice: 100,
      hubs: ['vibrators', 'strokers', 'lubricants', 'penis-rings', 'couples', 'prostate-massagers'],
      excludeTitle: 'sling|swing|machine|doll|pump|whip|flog|gag|bondage|chastity|celebrity|porn|slut|fuck|bitch|naughty|pussy|dong|realistic|novelty|gag gift|candy|edible|party',
    },
    guide: 'sex-toy-gifts-for-him',
  },
  {
    slug: 'luxury-sex-toys',
    name: 'Luxury Sex Toys',
    group: 'By Budget',
    metaTitle: 'Luxury Sex Toys: Considered Picks Worth Investing In',
    metaDescription:
      'Premium Lovense toys, from Solace Pro to the Sex Machine, chosen for how they feel: strong motors, app control and body-safe materials. Built to last.',
    intro:
      'Spending more makes sense when a toy feels better every time you reach for it. These premium picks earn their price with quieter, stronger motors, softer materials and longer warranties, so you can buy once and enjoy it for years.',
    rule: { minPrice: 150 },
    guide: 'anniversary-sex-toy-gifts',
  },
  {
    slug: 'water-based-lube',
    name: 'Water-Based Lube',
    group: 'By Style',
    metaTitle: 'Water-Based Lube: Safe With Every Toy and Condom',
    metaDescription:
      'Water-based lube that makes sex and toys more comfortable, safe with silicone toys, sleeves and condoms. Gentle on skin and easy to rinse away after.',
    intro:
      'Water-based lube is the one bottle that works with everything, so comfort is never a guessing game: silicone toys, stroker sleeves, latex condoms and sensitive skin. It rinses off with plain water, and if it turns tacky, a few drops of water bring it back.',
    rule: { hubs: ['lubricants'], text: 'water', excludeTitle: 'silicone|hybrid|oil|wash|cleaner|fuck|jizz|cum|semen|fisting' },
    guide: 'best-lube-for-sex-toys',
  },
  {
    slug: 'silicone-lube',
    name: 'Silicone Lube',
    group: 'By Style',
    metaTitle: 'Silicone Lube: Long-Lasting and Shower-Proof',
    metaDescription:
      'Silicone lube for long-lasting comfort during sex, massage and shower play. Safe with latex condoms, with simple notes on which toys to keep it away from.',
    intro:
      'Silicone lube stays slippery far longer than water-based formulas, so you can relax without stopping to reapply, and it does not wash away in the shower. It is safe with latex condoms. Keep it away from silicone toys unless the maker says otherwise, because it can leave the surface tacky.',
    rule: { hubs: ['lubricants'], text: 'silicone|uber ?lube', excludeTitle: 'hybrid|water|fuck|jizz|cum|semen|fisting' },
    guide: 'best-lube-for-sex-toys',
  },
  {
    slug: 'quiet-vibrators',
    name: 'Quiet Vibrators',
    group: 'By Style',
    metaTitle: 'Quiet Vibrators for Shared Homes and Thin Walls',
    metaDescription:
      'Quiet Lovense vibrators, including Lush, Ambi and Nora, for when privacy helps you relax. Chosen for shared homes, with tips to keep noise down.',
    intro:
      'It is easier to let go when you are not worried about being heard. This collection sticks to well-finished Lovense motors and leaves out thrusting toys, the loudest kind. Lower settings, a towel underneath and a rumbly rather than buzzy toy help further.',
    rule: {
      hubs: ['vibrators'],
      brands: ['lovense'],
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
      'Sex toys for beginners that feel easy and unintimidating: small vibrators, strokers and lube from trusted brands. A comfortable first step at your pace.',
    intro:
      'Everyone starts somewhere, and a first toy should feel simple, body-safe and easy to understand. These come from brands with a track record, at prices that let you find out what you like before investing more. Add a water-based lube and you are ready.',
    rule: {
      hubs: ['vibrators', 'strokers', 'lubricants', 'penis-rings'],
      brands: ['lovense'],
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
      'Discreet sex toys that look unremarkable in a drawer or bag: lipstick vibrators, mini wands and compact strokers. Private, low-key and shipped plainly.',
    intro:
      'Privacy helps you relax, and discreet toys are small, plain-looking and easy to tuck away. Lipstick-style vibrators, mini wands and compact strokers fit in a toiletry bag and charge by USB like any other gadget, and orders ship in plain packaging.',
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
      'Black Friday sex toy deals on vibrators, strokers and couples toys currently marked down, updated with every catalog sync. Treat yourself for less.',
    intro:
      'This page lists only products currently marked below their usual price at our retail partner, so it changes as sales start and end. Around Black Friday it fills up, and the rest of the year it is a short list worth checking before you treat yourself.',
    rule: {
      onSale: true,
      hubs: ['vibrators', 'strokers', 'couples', 'penis-rings', 'prostate-massagers', 'lubricants', 'dildos', 'anal-toys', 'bdsm'],
      excludeTitle: 'pussy|jizz|cum\\b|semen|slut|bitch|fuck',
    },
    guide: 'black-friday-sex-toy-deals',
  },
]

/** Live collections; retired ones redirect (src/content/retired.ts). */
export const COLLECTIONS: Collection[] = ALL_COLLECTIONS.filter((c) => !(c.slug in RETIRED_COLLECTIONS))

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
