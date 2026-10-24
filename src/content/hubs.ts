import type { Hub } from '@/types/catalog'
import { RETIRED_HUBS } from '@/content/retired'

const ALL_HUBS: Hub[] = [
  {
    slug: 'vibrators',
    name: 'Vibrators',
    singular: 'Vibrator',
    metaTitle: 'Best Vibrators: Wands, Rabbits, Bullets & Suction',
    metaDescription:
      'Find a vibrator that feels right for your body, from quiet bullets to strong wands and gentle suction toys. Honest notes on power, noise and materials.',
    intro:
      'The right vibrator is simply the one that feels good to you, and that starts with knowing where you like sensation and how strong. Pick a type first, then narrow by power, noise and if you want it waterproof. There is no wrong place to start.',
    buyingTips: [
      'Wands give broad, strong vibration; bullets are small, quiet and easy to bring into partnered sex.',
      'Suction or air-pulse toys stimulate without direct contact, which many people find gentler and easier to relax into.',
      'Body-safe silicone is non-porous and easy to clean; pair it with water-based lube for extra comfort.',
    ],
  },
  {
    slug: 'strokers',
    name: 'Strokers & Masturbators',
    singular: 'Stroker',
    metaTitle: 'Best Strokers & Masturbators: App-Controlled Lovense Picks',
    metaDescription:
      'Lovense strokers and masturbators that make solo time feel more relaxed and more fun. Compare manual, vibrating and automatic picks by feel and cleanup.',
    intro:
      'Making time for yourself is healthy, and a stroker makes it feel more relaxed and more intense than your hand alone. The differences come down to texture, tightness and how easy it is to clean. A manual sleeve is the easiest start; automatic strokers add thrusting or suction when you want to lie back.',
    buyingTips: [
      'A simple sleeve like the Lovense Kraken is a low-pressure first try; Max 2, Calor and Solace add vibration, app control or hands-free thrusting.',
      'Use water-based lube only, since silicone lube can damage most sleeve materials.',
      'Rinse with warm water after use and let it dry fully before storing, so it stays fresh for next time.',
    ],
  },
  {
    slug: 'dildos',
    name: 'Dildos',
    singular: 'Dildo',
    metaTitle: 'Best Dildos: Realistic, Silicone & Fantasy Picks',
    metaDescription:
      'Choose a dildo that feels comfortable and right for you, with clear sizing help across realistic, silicone, glass and fantasy styles. Start confidently.',
    intro:
      'Feeling comfortable comes first, so size, firmness and material matter more than looks. If you are new, a modest size in body-safe silicone is a relaxed place to start, and a suction cup base adds hands-free or harness play when you are ready.',
    buyingTips: [
      'Compare insertable length and width, not total length, so the size you pick is the size you feel.',
      'Dual-density silicone feels soft on the outside with a firm core, which many people find more comfortable.',
      'A flared or suction base is a must for anal use and harness play.',
    ],
  },
  {
    slug: 'anal-toys',
    name: 'Anal Toys',
    singular: 'Anal Toy',
    metaTitle: 'Best Anal Toys: Butt Plugs, Beads & Training Kits',
    metaDescription:
      'Anal toys chosen for comfort: beginner butt plugs, beads and training kits, all with flared bases. Gentle sizing advice so your first time feels easy.',
    intro:
      'Anal play feels good when you feel relaxed, and that comes from going slowly, using plenty of lube and choosing a toy made for it. Every toy here has a flared base, and training kits let you size up at your own pace.',
    buyingTips: [
      'Only use toys with a flared base for anal play.',
      'Start smaller than you think you need; a training kit lets you size up when your body is ready.',
      'Use a thicker water-based or hybrid lube and reapply often, since comfort comes from glide.',
    ],
  },
  {
    slug: 'prostate-massagers',
    name: 'Prostate Massagers',
    singular: 'Prostate Massager',
    metaTitle: 'Best Prostate Massagers: Aneros, b-Vibe & More',
    metaDescription:
      'Prostate massagers for anyone curious about a deeper kind of pleasure. Hands-free and vibrating picks from Aneros, b-Vibe and more, with a calm how-to.',
    intro:
      'Prostate pleasure can feel deeper and fuller than anything else, and curiosity is all you need to begin. These toys are curved to reach the prostate, and many move hands-free with your own muscles. Vibrating models bring sensation sooner, while classic hands-free designs reward a little patience.',
    buyingTips: [
      'Aneros-style hands-free toys move with your pelvic floor and take a few relaxed sessions to learn.',
      'Vibrating models are the easiest way to enjoy a first try.',
      'Relax, breathe and use plenty of lube; comfort always comes before intensity.',
    ],
  },
  {
    slug: 'penis-rings',
    name: 'Penis Rings',
    singular: 'Penis Ring',
    metaTitle: 'Best Penis Rings: Vibrating & Stretchy Cock Rings',
    metaDescription:
      'Penis rings that help you feel firmer, last longer and share vibration with a partner. Stretchy and vibrating picks with simple tips for a safe fit.',
    intro:
      'A penis ring can help you feel firmer and more confident, and a vibrating one adds sensation both of you can enjoy. Stretchy silicone rings are the most comfortable first choice because they slip on and off easily.',
    buyingTips: [
      'Remove any ring after 20 to 30 minutes.',
      'Stretchy or adjustable rings are more comfortable and safer than rigid metal for beginners.',
      'Vibrating rings add clitoral stimulation, so partnered sex feels better for both of you.',
    ],
  },
  {
    slug: 'penis-pumps',
    name: 'Penis Pumps',
    singular: 'Penis Pump',
    metaTitle: 'Best Penis Pumps: Bathmate, Air & Automatic Pumps',
    metaDescription:
      'Penis pumps that help you feel fuller and more confident, compared by size, pressure control and ease of use. Bathmate, air and automatic picks inside.',
    intro:
      'A penis pump uses gentle vacuum to draw blood flow for a fuller erection, which can take a lot of pressure off feeling ready. Water pumps like Bathmate work in the shower, while air and automatic pumps are easier to control anywhere.',
    buyingTips: [
      'Choose a cylinder that fits your length and girth; one that is too large reduces suction.',
      'Use a pressure gauge or quick-release valve and never pump to the point of discomfort.',
      'Start with short sessions and build up gradually as you learn what feels good.',
    ],
  },
  {
    slug: 'strap-ons',
    name: 'Strap-Ons & Harnesses',
    singular: 'Strap-On',
    metaTitle: 'Best Strap-Ons & Harnesses for Beginners & Couples',
    metaDescription:
      'Strap-ons and harnesses that fit well and feel secure, for any body and any partner. Comfortable kits, strapless designs and gentle pegging tips inside.',
    intro:
      'Wearing a strap-on should feel confident and fun, and that mostly comes down to a harness that fits. Kits pair a harness with a compatible dildo, while strapless designs are held in by the wearer for a closer feel. Any body can wear one and any partner can enjoy it.',
    buyingTips: [
      'Adjustable underwear-style harnesses are the most comfortable for beginners.',
      'Check that your dildo has a flared base that fits an O-ring harness securely.',
      'For pegging, start with a smaller dildo, lots of lube and plenty of communication.',
    ],
  },
  {
    slug: 'bdsm',
    name: 'BDSM & Bondage',
    singular: 'BDSM Toy',
    metaTitle: 'BDSM & Bondage Gear: Restraints, Impact & Kits',
    metaDescription:
      'BDSM and bondage gear for exploring trust and play at your own pace. Beginner kits, soft restraints and impact toys, with the safety basics to start well.',
    intro:
      'Kink is built on trust, and the right gear helps you both feel safe enough to play. Beginner kits cover the basics, while individual restraints, impact toys and nipple play let you build on what you enjoy. Talk first, start light and check in often.',
    buyingTips: [
      'Agree on a safe word before you start and check in with each other often.',
      'Quick-release restraints and safety shears are worth having on hand for peace of mind.',
      'Start light with impact toys and warm up gradually.',
    ],
  },
  {
    slug: 'lubricants',
    name: 'Lubricants',
    singular: 'Lubricant',
    metaTitle: 'Best Lube: Water, Silicone, Anal & Flavored',
    metaDescription:
      'The right lube makes sex and toys more comfortable for every body. Compare water-based, silicone, hybrid and anal lube by feel and toy safety to pick one.',
    intro:
      'Lube is the simplest way to make anything feel more comfortable, and using it is completely normal for every body. Water-based lube works with every toy and condom, while silicone lasts longer but should stay away from silicone toys.',
    buyingTips: [
      'Water-based: safe with all toys and condoms, easy cleanup, reapply whenever you like.',
      'Silicone-based: long-lasting and waterproof, but avoid with silicone toys.',
      'Thicker formulas feel more comfortable for anal play.',
    ],
  },
  {
    slug: 'couples',
    name: 'Couples Toys',
    singular: 'Couples Toy',
    metaTitle: 'Best Couples Toys: Wearables, App & Long-Distance',
    metaDescription:
      'Couples toys that help you feel closer, from wearables during sex to app-controlled toys across the miles. How they work and which couples they suit best.',
    intro:
      'Couples toys are about connection: more pleasure for both of you, and more to share. Wearables fit comfortably during sex, and app-connected toys keep you close when you are apart. Look for comfort, quiet motors and an app that is easy to pair.',
    buyingTips: [
      'Wearables should stay in place without getting in the way of each other.',
      'App-controlled toys let a partner set the intensity from anywhere.',
      'Check battery life if you like to take your time.',
    ],
  },
  {
    slug: 'sex-dolls',
    name: 'Sex Dolls',
    singular: 'Sex Doll',
    metaTitle: 'Sex Dolls & Love Dolls: Realistic & Inflatable',
    metaDescription:
      'Realistic and inflatable sex dolls compared by size, material and care, with zero judgment. The practical things worth knowing before you choose one.',
    intro:
      'Companionship and pleasure look different for everyone, and there is no judgment here. Dolls range from simple inflatables to realistic full-size companions, so weight, material and storage space are the practical questions to answer first.',
    buyingTips: [
      'Realistic dolls are heavy; check the weight and plan for storage before you buy.',
      'TPE needs regular cleaning and powdering; silicone is easier to maintain.',
      'Inflatables are a light, low-pressure way to try the idea.',
    ],
  },
  {
    slug: 'lingerie',
    name: 'Lingerie',
    singular: 'Lingerie Piece',
    metaTitle: 'Sexy Lingerie: Bodysuits, Sets & Bodystockings',
    metaDescription:
      'Lingerie that helps you feel confident in your own skin, in sizes for every body. Bodysuits, sets and bodystockings with honest help on finding your fit.',
    intro:
      'Lingerie is about how you feel when you put it on, for yourself or for someone else. Bodystockings and bodysuits are forgiving on fit, while sets give you more sizing control top and bottom. Choose what makes you feel most like yourself.',
    buyingTips: [
      'Check the size chart; lingerie often runs small, and the right fit feels best.',
      'Stretch mesh and lace flatter a wide range of bodies.',
      'Hand wash cold to keep lace and elastic in shape.',
    ],
  },
  {
    slug: 'sex-machines-furniture',
    name: 'Sex Machines & Furniture',
    singular: 'Machine or Furniture Piece',
    metaTitle: 'Sex Machines, Swings & Positioning Furniture',
    metaDescription:
      'Sex machines, swings and positioning wedges that make sex more comfortable and less tiring. Compare setup, stability and weight limits before you buy.',
    intro:
      'Machines and furniture take the effort out so you can focus on how it feels. A machine handles the motion for you, while swings, slings and wedges support positions that are hard to hold and ease the strain on knees and backs. Measure your space and check weight limits first.',
    buyingTips: [
      'Check the rated weight limit and how a swing or sling mounts: door frame, ceiling or freestanding.',
      'On a machine, look for adjustable speed and stroke length and a stable, low base.',
      'Positioning wedges are the easiest start: no setup, more comfort, and they double as support for toys.',
    ],
  },
  {
    slug: 'more-toys',
    name: 'More Toys & Accessories',
    singular: 'Accessory',
    metaTitle: 'Adult Toy Accessories, Cleaners & More',
    metaDescription:
      'Toy cleaners, storage, games and accessories that keep your favorite toys clean, private and ready to go. The small things that make every night easier.',
    intro:
      'The small things that make everything easier: toy cleaners, discreet storage, games and accessories that help your favorites last. Good care means fewer worries and more time enjoying yourself.',
    buyingTips: [
      'Clean toys after every use with warm water and mild soap or a toy cleaner.',
      'Store toys separately in a breathable pouch so they stay fresh and private.',
    ],
  },
]

/** Live hubs. Retired hubs keep their definitions so old product pages still resolve a name. */
export const HUBS: Hub[] = ALL_HUBS.filter((hub) => !(hub.slug in RETIRED_HUBS))

export const HUBS_BY_SLUG: Record<string, Hub> = Object.fromEntries(
  ALL_HUBS.map((hub) => [hub.slug, hub])
)
