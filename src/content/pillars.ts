/**
 * Primary navigation: Home | Explore | For Couples | Shop Our Picks |
 * Nightstand Notes | About. The header, mobile menu, footer and homepage read
 * from here. Every link points at an existing page or hub, so no indexed URL
 * moves when the menu changes. Lingerie, Erotica, the Gift Shop and reviews
 * stay reachable from the dropdowns below.
 */
import { STORIES } from '@/content/erotica'
import { hasShopifyProducts } from '@/content/retired'
import { EXPLORE_HUB, COUPLES_HUB, PICKS_HUB, type SiteHub } from '@/content/site-hubs'

export interface PillarLink {
  label: string
  /** A route path; links with params use the route template, e.g. '/blog/topic/$topic'. */
  to: string
  params?: Record<string, string>
  /** In-page section id on the target route. */
  hash?: string
}

export interface Pillar {
  slug: 'home' | 'explore' | 'couples' | 'picks' | 'notes' | 'about'
  /** Short label for the main nav. */
  label: string
  /** Longer name for footer headings. */
  name: string
  blurb: string
  href: PillarLink
  /** Dropdown columns; a pillar without columns is a plain link. */
  columns: { title: string; links: PillarLink[] }[]
}

const topic = (label: string, slug: string): PillarLink => ({ label, to: '/blog/topic/$topic', params: { topic: slug } })
const guide = (label: string, slug: string): PillarLink => ({ label, to: '/blog/$slug', params: { slug } })
const shop = (label: string, slug: string): PillarLink => ({ label, to: '/shop/$slug', params: { slug } })

const hubAnchors = (hub: SiteHub): PillarLink[] => hub.sections.map((s) => ({ label: s.title, to: hub.path, hash: s.id }))

export const PILLARS: Pillar[] = [
  {
    slug: 'home',
    label: 'Home',
    name: 'Home',
    blurb: 'Feel Good. Get Closer. Discover More.',
    href: { label: 'Home', to: '/' },
    columns: [],
  },
  {
    slug: 'explore',
    label: 'Explore',
    name: 'Explore',
    blurb: 'Confidence, self-discovery and beginner-friendly education, at your own pace.',
    href: { label: 'Explore All Topics', to: EXPLORE_HUB.path },
    columns: [
      { title: 'Topic Hubs', links: hubAnchors(EXPLORE_HUB) },
      {
        title: 'Start Here',
        links: [
          guide('How to Feel Confident in Bed', 'how-to-feel-confident-in-bed'),
          guide('Sex Toys for Beginners', 'sex-toys-for-beginners'),
          guide('Self-Pleasure Guide for Women', 'self-pleasure-guide-for-women'),
          guide('How to Feel Confident in Lingerie', 'how-to-feel-confident-in-lingerie'),
        ],
      },
    ],
  },
  {
    slug: 'couples',
    label: 'For Couples',
    name: 'For Couples',
    blurb: 'Connection, communication and shared experiences, with thoughtful product guidance.',
    href: { label: 'Explore For Couples', to: COUPLES_HUB.path },
    columns: [
      { title: 'Topic Hubs', links: hubAnchors(COUPLES_HUB) },
      {
        title: 'Popular Guides',
        links: [
          guide('How to Talk to Your Partner About Sex Toys', 'how-to-talk-to-your-partner-about-sex-toys'),
          guide('Non-Sexual Intimacy Ideas', 'non-sexual-intimacy-ideas'),
          guide('Lovense vs. We-Vibe', 'lovense-vs-we-vibe'),
          guide('Long-Distance Sex Toys', 'long-distance-sex-toys'),
        ],
      },
    ],
  },
  {
    slug: 'picks',
    label: 'Shop Our Picks',
    name: 'Shop Our Picks',
    blurb: 'Editorially curated recommendations by need, sold by our retail partners.',
    href: { label: 'See All Picks', to: PICKS_HUB.path },
    columns: [
      { title: 'By Need', links: hubAnchors(PICKS_HUB) },
      {
        title: 'More Ways to Shop',
        links: [
          ...(hasShopifyProducts('lingerie') ? [{ label: 'Lingerie', to: '/category/$slug', params: { slug: 'lingerie' } }] : []),
          { label: 'The Gift Shop', to: '/gifts' },
          { label: 'All Toy Reviews', to: '/reviews' },
          topic('Buying Guides', 'buying-guides'),
          shop('Premium Picks', 'luxury-sex-toys'),
        ],
      },
    ],
  },
  {
    slug: 'notes',
    label: 'Nightstand Notes',
    name: 'Nightstand Notes',
    blurb: 'Guides, comparisons and sex education, written plainly and kindly.',
    href: { label: 'All Nightstand Notes', to: '/blog' },
    columns: [
      {
        title: 'Categories',
        links: [
          topic('Buying Guides', 'buying-guides'),
          topic('Comparisons', 'comparisons'),
          topic('Gift Guides', 'gift-guides'),
          topic('Sex Education', 'sex-education'),
          topic('Intimacy & Communication', 'intimacy'),
          topic('Body Confidence', 'body-confidence'),
          topic("Women's Empowerment", 'womens-empowerment'),
        ],
      },
      {
        title: 'More From Nightstand',
        links: [
          { label: 'Erotica Short Stories', to: '/erotica' },
          ...STORIES.slice(0, 2).map((s) => ({ label: s.title, to: '/erotica/$slug', params: { slug: s.slug } })),
          topic('For Creators', 'creators'),
        ],
      },
    ],
  },
  {
    slug: 'about',
    label: 'About',
    name: 'About',
    blurb: 'Our mission, how we choose products and how we make money.',
    href: { label: 'About Nightstand Supply', to: '/about' },
    columns: [
      {
        title: 'Trust & Transparency',
        links: [
          { label: 'About Nightstand Supply', to: '/about' },
          { label: 'Editorial Policy', to: '/editorial-policy' },
          { label: 'Affiliate Disclosure', to: '/disclosure' },
          { label: 'Privacy Policy', to: '/privacy' },
          { label: 'Contact', to: '/contact' },
        ],
      },
    ],
  },
]

/** Pillars that open a dropdown (the rest are plain links). */
export const MENU_PILLARS = PILLARS.filter((p) => p.columns.length > 0)
