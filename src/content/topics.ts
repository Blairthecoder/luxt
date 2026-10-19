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
    slug: 'gift-guides',
    name: 'Gift Guides',
    metaTitle: 'Sex Toy Gift Guides for Her, Him & Couples',
    metaDescription:
      'Gift guides for every budget: sex toy gifts for her, for him, for couples and for anniversaries, with current prices and honest picks.',
    intro:
      'Buying for someone else is harder than buying for yourself. These guides pick a safe bet and a bolder option for each person and budget, so you can decide in minutes.',
    collections: ['sex-toy-gift-sets', 'stocking-stuffers', 'sex-toys-under-50', 'sex-toys-under-100', 'luxury-sex-toys'],
  },
  {
    slug: 'couples',
    name: 'Couples & Relationships',
    metaTitle: 'Couples Guides: Spice Up Your Relationship',
    metaDescription:
      'Practical guides for couples: how to bring toys into the bedroom, keep a long relationship exciting and pick toys you will both use.',
    intro:
      'Long relationships are worth investing in. These guides cover the conversation, the first toy you share and the small changes that keep things interesting years in.',
    collections: ['couples-sex-toys', 'remote-control-vibrators', 'vibrating-cock-rings', 'app-controlled-sex-toys', 'bondage-kits', 'sex-swings'],
  },
  {
    slug: 'for-her',
    name: 'For Her',
    metaTitle: 'Sex Toy Guides for Women: Vibrators & More',
    metaDescription:
      'Guides for women on choosing vibrators, clitoral and G-spot toys, and getting more from solo and partnered play.',
    intro:
      'Straight answers on vibrators, suction toys and everything in between, written for the person who will be using them.',
    collections: ['sex-toys-for-women', 'clitoral-vibrators', 'rabbit-vibrators', 'wand-vibrators', 'g-spot-vibrators', 'bullet-vibrators'],
  },
  {
    slug: 'for-him',
    name: 'For Him',
    metaTitle: 'Sex Toy Guides for Men: Strokers, Rings & More',
    metaDescription:
      'Guides for men on strokers, penis rings, prostate massagers and pumps. Comparisons, how-tos and what to buy first.',
    intro:
      'Comparisons and how-tos for strokers, rings, prostate toys and pumps, with the cleanup and discretion questions answered up front.',
    collections: ['sex-toys-for-men', 'automatic-strokers', 'pocket-pussies', 'prostate-vibrators', 'vibrating-cock-rings', 'fleshlight'],
  },
  {
    slug: 'how-to',
    name: 'How-To & Care',
    metaTitle: 'How to Use Sex Toys: Guides, Lube & Care',
    metaDescription:
      'How to use sex toys alone or with a partner, which lube to choose and how to keep toys clean and lasting.',
    intro:
      'The practical side: using toys with a partner, choosing lube, and keeping everything clean so it lasts.',
    collections: ['bullet-vibrators', 'vibrating-cock-rings', 'butt-plugs', 'anal-beads'],
  },
]

export const TOPICS_BY_SLUG: Record<string, Topic> = Object.fromEntries(TOPICS.map((t) => [t.slug, t]))
