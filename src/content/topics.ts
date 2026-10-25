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
    metaTitle: 'Guides for Women: Toys, Lingerie & Pleasure',
    metaDescription:
      'Guides for women on choosing vibrators and lingerie, understanding your pleasure and feeling more confident in solo and partnered sex. Warm, plain advice.',
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
    slug: 'sex-education',
    name: 'Sex Education',
    metaTitle: 'Sex Education for Adults: Anatomy, Orgasm & Desire',
    metaDescription:
      'Sex education for adults: plain-English guides to anatomy, orgasm, desire, consent and comfort, so you can understand your body and enjoy sex with confidence.',
    intro:
      'The sex education most of us never got. Clear, judgment-free guides to anatomy, arousal, orgasm, consent and comfort, written for adults of every body and experience level.',
    collections: ['sex-toys-for-women', 'clitoral-vibrators', 'g-spot-vibrators', 'water-based-lube', 'sex-toys-for-beginners'],
  },
  {
    slug: 'intimacy',
    name: 'Intimacy & Communication',
    metaTitle: 'Intimacy & Communication Guides for Couples',
    metaDescription:
      'Intimacy and communication guides for couples: how to ask for what you want, handle mismatched libido, build closeness without sex and feel connected after.',
    intro:
      'Good sex starts long before the bedroom. These guides cover the conversations, check-ins and small daily habits that help couples feel safe, wanted and close.',
    collections: ['couples-sex-toys', 'remote-control-vibrators', 'app-controlled-sex-toys', 'water-based-lube'],
  },
  {
    slug: 'body-confidence',
    name: 'Body Confidence & Self-Pleasure',
    metaTitle: 'Body Confidence Guides: Feel Sexy in Your Skin',
    metaDescription:
      'Body confidence guides for women: how to feel confident in bed and in lingerie, plan a boudoir shoot, quiet the inner critic and enjoy self-pleasure.',
    intro:
      'Feeling at home in your body changes everything, alone or with a partner. Practical, kind guides to confidence, self-pleasure and enjoying the moment instead of overthinking it.',
    collections: ['sex-toys-for-women', 'quiet-vibrators', 'bullet-vibrators', 'clitoral-vibrators', 'discreet-sex-toys'],
  },
  {
    slug: 'womens-empowerment',
    name: "Women's Empowerment",
    metaTitle: "Women's Sexual Empowerment: Own Your Pleasure",
    metaDescription:
      "Women's sexual empowerment guides: owning your desire, setting boundaries, rebuilding confidence after divorce or a baby, and asking for what you deserve.",
    intro:
      'Your pleasure belongs to you. Guides for women on owning desire, setting boundaries, rebuilding confidence through life changes and asking for what you deserve.',
    collections: ['sex-toys-for-women', 'clitoral-vibrators', 'wand-vibrators', 'rabbit-vibrators', 'quiet-vibrators'],
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
