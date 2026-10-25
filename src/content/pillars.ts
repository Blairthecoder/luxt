/**
 * The five pillars that organize the site: main navigation, footer columns and
 * the homepage pillar band all read from here. Each pillar points at existing
 * hubs (topic hubs, category and collection pages, the Erotica section), so
 * no URL moves when the menu changes.
 */
import { COLLECTIONS } from '@/content/collections'
import { STORIES, READING_LISTS } from '@/content/erotica'
import { hasShopifyProducts } from '@/content/retired'

export interface PillarLink {
  label: string
  /** A route path; links with params use the route template, e.g. '/blog/topic/$topic'. */
  to: string
  params?: Record<string, string>
}

export interface Pillar {
  slug: 'lingerie' | 'toys' | 'confidence' | 'intimacy' | 'erotica'
  /** Short label for the main nav. */
  label: string
  /** Longer name for tiles and footer headings. */
  name: string
  blurb: string
  href: PillarLink
  /** Dropdown columns; the Toys pillar uses the full catalog mega menu instead. */
  columns: { title: string; links: PillarLink[] }[]
}

const topic = (label: string, slug: string): PillarLink => ({ label, to: '/blog/topic/$topic', params: { topic: slug } })
const guide = (label: string, slug: string): PillarLink => ({ label, to: '/blog/$slug', params: { slug } })
const shop = (label: string, slug: string): PillarLink => ({ label, to: '/shop/$slug', params: { slug } })

const lingerieLive = hasShopifyProducts('lingerie')

export const PILLARS: Pillar[] = [
  ...(lingerieLive
    ? [
        {
          slug: 'lingerie' as const,
          label: 'Lingerie',
          name: 'Lingerie',
          blurb: 'Bodysuits, sets and babydolls in sizes for every body, with honest fit notes so you feel good the moment you put it on.',
          href: { label: 'Shop All Lingerie', to: '/category/$slug', params: { slug: 'lingerie' } },
          columns: [
            {
              title: 'Shop by Style',
              links: [
                { label: 'All Lingerie', to: '/category/$slug', params: { slug: 'lingerie' } },
                ...COLLECTIONS.filter((c) => c.group === 'Lingerie').map((c) => shop(c.name, c.slug)),
              ],
            },
            {
              title: 'Wear It With Confidence',
              links: [
                guide('How to Feel Confident in Lingerie', 'how-to-feel-confident-in-lingerie'),
                guide('Boudoir Photoshoot Tips', 'boudoir-photoshoot-tips'),
                guide('How to Feel Confident in Bed', 'how-to-feel-confident-in-bed'),
                guide('Lingerie and Toy Gifts for Her', 'sex-toy-gifts-for-her'),
              ],
            },
          ],
        },
      ]
    : []),
  {
    slug: 'toys',
    label: 'Toys',
    name: 'Toys & Reviews',
    blurb: 'Honest reviews, buying guides and head-to-head comparisons, so you can choose a toy that suits your body and your budget.',
    href: { label: 'All Toy Reviews', to: '/reviews' },
    columns: [
      {
        title: 'Reviews & Guides',
        links: [
          { label: 'All Reviews', to: '/reviews' },
          topic('Buying Guides', 'buying-guides'),
          topic('Comparisons', 'comparisons'),
          guide('Sex Toys for Beginners', 'sex-toys-for-beginners'),
          topic('Toy Guides for Women', 'for-her'),
          topic('Toy Guides for Men', 'for-him'),
        ],
      },
    ],
  },
  {
    slug: 'confidence',
    label: 'Confidence',
    name: 'Confidence & Empowerment',
    blurb: 'Feel at home in your body and own your pleasure, through every chapter of life. Kind, practical guides written for women.',
    href: topic('Body Confidence Guides', 'body-confidence'),
    columns: [
      {
        title: 'Explore',
        links: [topic('Body Confidence & Self-Pleasure', 'body-confidence'), topic("Women's Empowerment", 'womens-empowerment')],
      },
      {
        title: 'Start Here',
        links: [
          guide('How to Feel Confident in Bed', 'how-to-feel-confident-in-bed'),
          guide('Sexual Empowerment for Women', 'sexual-empowerment-for-women'),
          guide('Self-Pleasure Guide for Women', 'self-pleasure-guide-for-women'),
          guide('Boudoir Photoshoot Tips', 'boudoir-photoshoot-tips'),
          guide('Confidence After Divorce', 'sexual-confidence-after-divorce'),
          guide('Solo Date Night Ideas', 'solo-date-night-ideas'),
        ],
      },
    ],
  },
  {
    slug: 'intimacy',
    label: 'Sex & Intimacy',
    name: 'Sex Ed & Intimacy',
    blurb: 'The sex education most of us never got, plus the conversations and habits that keep couples close.',
    href: topic('Sex Education Guides', 'sex-education'),
    columns: [
      {
        title: 'Explore',
        links: [
          topic('Sex Education', 'sex-education'),
          topic('Intimacy & Communication', 'intimacy'),
          topic('Couples & Relationships', 'couples'),
          topic('How-To & Care', 'how-to'),
        ],
      },
      {
        title: 'Popular Guides',
        links: [
          guide('How to Orgasm: A Guide for Women', 'how-to-orgasm-for-women'),
          guide('How to Ask for What You Want in Bed', 'how-to-ask-for-what-you-want-in-bed'),
          guide('How to Spice Up Your Marriage', 'how-to-spice-up-your-marriage'),
          guide('Responsive vs. Spontaneous Desire', 'responsive-vs-spontaneous-desire'),
          guide('Non-Sexual Intimacy Ideas', 'non-sexual-intimacy-ideas'),
        ],
      },
    ],
  },
  {
    slug: 'erotica',
    label: 'Erotica',
    name: 'Erotica',
    blurb: 'Original sensual short stories and steamy reading lists. Romantic, grown-up and never graphic. For adults 18+.',
    href: { label: 'All Erotica', to: '/erotica' },
    columns: [
      {
        title: 'Short Stories',
        links: [{ label: 'All Erotica', to: '/erotica' }, ...STORIES.map((s) => ({ label: s.title, to: '/erotica/$slug', params: { slug: s.slug } }))],
      },
      {
        title: 'Reading Lists',
        links: READING_LISTS.map((s) => ({ label: s.title.split(':')[0], to: '/erotica/$slug', params: { slug: s.slug } })),
      },
    ],
  },
]
