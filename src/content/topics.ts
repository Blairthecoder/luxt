/**
 * Nightstand Notes topic hubs at /blog/topic/<slug>. Each groups guides for one
 * audience or job and points shoppers at the collections that pillar feeds.
 */
export interface Topic {
  slug: string
  name: string
  metaTitle: string
  metaDescription: string
  intro: string
  /** /shop collection slugs shown under the guides. */
  collections: string[]
}

export const TOPICS: Topic[] = [
  {
    slug: 'buying-guides',
    name: 'Buying Guides',
    metaTitle: 'Best Sex Toys: Tested Buying Guides & Top Picks',
    metaDescription:
      'Our best-of buying guides: the wand vibrators, automatic strokers, couples toys and long-distance toys we rate highest, with who each one suits and current prices.',
    intro:
      'Roundups of the toys we rate highest in each category. Every guide names a best overall pick, a budget pick and the trade-offs, so you can choose in minutes.',
    collections: ['wand-vibrators', 'automatic-strokers', 'couples-sex-toys', 'app-controlled-sex-toys', 'sex-toys-for-beginners', 'luxury-sex-toys'],
  },
  {
    slug: 'comparisons',
    name: 'Comparisons',
    metaTitle: 'Sex Toy Comparisons: Brand vs. Brand, Head to Head',
    metaDescription:
      'Head-to-head sex toy comparisons: Lovense vs. We-Vibe, Womanizer vs. LELO SONA, Le Wand vs. Magic Wand and more, compared on feel, noise, app and price.',
    intro:
      'Two popular choices, side by side. We compare feel, noise, build, app and price, then tell you which one we would buy and who should pick the other.',
    collections: ['app-controlled-sex-toys', 'wand-vibrators', 'clitoral-vibrators', 'g-spot-vibrators', 'automatic-strokers'],
  },
  {
    slug: 'gift-guides',
    name: 'Gift Guides',
    metaTitle: 'Sex Toy Gift Guides for Her, Him & Couples',
    metaDescription:
      'Sex toy gift guides for her, him, couples and anniversaries: thoughtful picks at every budget that help the people you love feel seen and wanted.',
    intro:
      'A thoughtful intimate gift helps someone feel seen and wanted. These guides pick a safe bet and a bolder option for each person and budget, so you can choose with confidence in minutes.',
    collections: ['lovense-bundles', 'stocking-stuffers', 'sex-toys-under-50', 'sex-toys-under-100', 'luxury-sex-toys'],
  },
  {
    slug: 'couples',
    name: 'Couples & Relationships',
    metaTitle: 'Couples Guides: Spice Up Your Relationship',
    metaDescription:
      'Couples guides for feeling closer: how to bring toys into the bedroom with ease, keep a long relationship exciting and choose toys you will both enjoy.',
    intro:
      'Feeling close takes a little attention at any stage of a relationship. These guides cover the conversation, the first toy you share and the small changes that help you both feel wanted years in.',
    collections: ['couples-sex-toys', 'remote-control-vibrators', 'vibrating-cock-rings', 'app-controlled-sex-toys'],
  },
  {
    slug: 'for-her',
    name: 'For Her',
    metaTitle: 'Sex Toy Guides for Women: Vibrators & More',
    metaDescription:
      'Guides for women on choosing vibrators, clitoral and G-spot toys, and feeling more comfortable and confident in solo and partnered pleasure.',
    intro:
      'Warm, straight answers on vibrators, suction toys and everything in between, written for you, so you can find what feels good with confidence.',
    collections: ['sex-toys-for-women', 'clitoral-vibrators', 'rabbit-vibrators', 'wand-vibrators', 'g-spot-vibrators', 'bullet-vibrators', 'quiet-vibrators'],
  },
  {
    slug: 'for-him',
    name: 'For Him',
    metaTitle: 'Sex Toy Guides for Men: Strokers, Rings & More',
    metaDescription:
      'Guides for men on strokers, penis rings, prostate massagers and pumps, so you can explore what you enjoy with confidence. Comparisons and first picks.',
    intro:
      'Comparisons and how-tos for strokers, rings, prostate toys and pumps, with cleanup and discretion answered up front, so you can explore what you enjoy with ease.',
    collections: ['sex-toys-for-men', 'automatic-strokers', 'pocket-pussies', 'prostate-vibrators', 'vibrating-cock-rings'],
  },
  {
    slug: 'how-to',
    name: 'How-To & Care',
    metaTitle: 'How to Use Sex Toys: Guides, Lube & Care',
    metaDescription:
      'How to use sex toys alone or with a partner, choose a comfortable lube and keep toys clean, so you can relax and enjoy every moment with confidence.',
    intro:
      'The practical side of feeling at ease: using toys with a partner, choosing a lube that keeps things comfortable and caring for toys so they are always ready.',
    collections: ['sex-toys-for-beginners', 'water-based-lube', 'discreet-sex-toys', 'bullet-vibrators', 'vibrating-cock-rings', 'butt-plugs', 'anal-beads'],
  },
  {
    slug: 'creators',
    name: 'For Creators',
    metaTitle: 'Guides for Adult Content Creators: Strategy, Toys & Privacy',
    metaDescription:
      'Guides for adult content creators: strategy by level, solo and couple content ideas, pricing and paywalls, toys that work on camera and a practical privacy and safety checklist.',
    intro:
      'Practical guidance for consenting adult creators on subscription platforms: how to grow at each level, what to put behind the paywall, which toys work on camera and how to protect your privacy and wellbeing.',
    collections: ['app-controlled-sex-toys', 'quiet-vibrators', 'wand-vibrators', 'couples-sex-toys', 'remote-control-vibrators', 'water-based-lube'],
  },
]

export const TOPICS_BY_SLUG: Record<string, Topic> = Object.fromEntries(TOPICS.map((t) => [t.slug, t]))
