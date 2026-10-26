/**
 * Editorial hubs for the primary navigation: Explore (/explore), For Couples
 * (/for-couples) and Shop Our Picks (/shop). They organize guides and
 * collections that already exist; no existing URL moves. Items whose guide or
 * collection is missing are dropped at render time (see resolveHubSections).
 */
import { COLLECTIONS } from '@/content/collections'
import { POSTS_BY_SLUG } from '@/content/posts'
import { TOPICS_BY_SLUG } from '@/content/topics'

export type HubItem =
  | { kind: 'guide'; slug: string; note?: string }
  | { kind: 'collection'; slug: string; note?: string }
  | { kind: 'topic'; slug: string; note?: string }

export interface HubSection {
  id: string
  title: string
  blurb: string
  items: HubItem[]
}

export interface SiteHub {
  path: '/explore' | '/for-couples' | '/shop'
  navLabel: string
  eyebrow: string
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  sections: HubSection[]
}

const guide = (slug: string, note?: string): HubItem => ({ kind: 'guide', slug, note })
const collection = (slug: string, note?: string): HubItem => ({ kind: 'collection', slug, note })
const topic = (slug: string, note?: string): HubItem => ({ kind: 'topic', slug, note })

export const EXPLORE_HUB: SiteHub = {
  path: '/explore',
  navLabel: 'Explore',
  eyebrow: 'For Yourself',
  title: 'Explore: Confidence, Curiosity and Self-Discovery',
  metaTitle: 'Explore Body Confidence, Self-Discovery & Sexual Wellness Guides',
  metaDescription:
    'Practical, judgment-free guides to body confidence, getting started, sexual wellness and choosing your first products, written for women and anyone exploring at their own pace.',
  intro:
    'Start wherever you feel curious. These guides cover feeling at home in your body, getting started without pressure, understanding how pleasure works and choosing products with confidence.',
  sections: [
    {
      id: 'confidence',
      title: 'Confidence & Self-Discovery',
      blurb: 'Feel more at ease in your body and enjoy the moment instead of overthinking it.',
      items: [
        guide('how-to-feel-confident-in-bed'),
        guide('self-pleasure-guide-for-women'),
        guide('sexual-empowerment-for-women'),
        guide('solo-date-night-ideas'),
        topic('body-confidence'),
      ],
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      blurb: 'Gentle first steps: what to buy, what to expect and how to take it at your pace.',
      items: [
        guide('sex-toys-for-beginners'),
        guide('how-to-choose-your-first-vibrator'),
        collection('sex-toys-for-beginners'),
        collection('quiet-vibrators'),
        guide('buying-sex-toys-discreetly'),
      ],
    },
    {
      id: 'sexual-wellness',
      title: 'Sexual Wellness',
      blurb: 'Plain-English education on anatomy, desire, comfort and consent.',
      items: [
        guide('clitoris-anatomy-guide'),
        guide('how-to-orgasm-for-women'),
        guide('responsive-vs-spontaneous-desire'),
        guide('why-does-sex-hurt'),
        guide('kegel-exercises-for-pleasure'),
        topic('sex-education'),
      ],
    },
    {
      id: 'product-education',
      title: 'Product Education',
      blurb: 'How to choose, use and care for intimate products, from materials to cleaning.',
      items: [
        guide('clitoral-vs-g-spot-vibrators'),
        guide('how-to-clean-sex-toys'),
        guide('best-lube-for-sex-toys'),
        collection('water-based-lube'),
        collection('silicone-lube'),
        topic('how-to'),
      ],
    },
    {
      id: 'lingerie',
      title: 'Lingerie & Body Confidence',
      blurb: 'Finding pieces you love wearing, and feeling good in front of the camera.',
      items: [
        guide('how-to-feel-confident-in-lingerie'),
        guide('boudoir-photoshoot-tips'),
        collection('comfortable-lingerie'),
        collection('plus-size-lingerie'),
        collection('lingerie-sets'),
      ],
    },
  ],
}

export const COUPLES_HUB: SiteHub = {
  path: '/for-couples',
  navLabel: 'For Couples',
  eyebrow: 'Together',
  title: 'For Couples: Connection, Communication and Closeness',
  metaTitle: 'Intimacy & Connection Guides for Couples',
  metaDescription:
    'Guides for couples on talking about intimacy, rebuilding closeness, date nights, long-distance connection, choosing products together and thoughtful gifts for a partner.',
  intro:
    'Closeness takes a little attention at every stage of a relationship. These guides cover the conversations, habits and shared experiences that help partners feel connected, plus honest product guidance when you are ready for it.',
  sections: [
    {
      id: 'communication',
      title: 'Relationship Communication',
      blurb: 'Ask for what you want, set boundaries and check in without it feeling awkward.',
      items: [
        guide('how-to-ask-for-what-you-want-in-bed'),
        guide('how-to-talk-to-your-partner-about-sex-toys'),
        guide('consent-in-long-term-relationships'),
        guide('mismatched-libido-in-relationships'),
      ],
    },
    {
      id: 'intimacy',
      title: 'Intimacy & Connection',
      blurb: 'Rebuild closeness, with or without sex.',
      items: [
        guide('non-sexual-intimacy-ideas'),
        guide('sensate-focus-exercises-for-couples'),
        guide('reconnect-with-your-husband-when-you-feel-unseen'),
        guide('what-is-aftercare'),
        topic('intimacy'),
      ],
    },
    {
      id: 'date-night',
      title: 'Date Night Ideas',
      blurb: 'Small, low-pressure ways to make time for each other.',
      items: [
        guide('how-to-spice-up-your-marriage'),
        guide('sexy-advent-calendar-ideas-for-couples'),
        guide('anniversary-sex-toy-gifts'),
      ],
    },
    {
      id: 'long-distance',
      title: 'Long-Distance Relationships',
      blurb: 'Stay close across the miles, with ideas for video calls and connected products.',
      items: [
        guide('long-distance-relationship-video-call-intimacy'),
        guide('long-distance-sex-toys'),
        collection('app-controlled-sex-toys'),
      ],
    },
    {
      id: 'couples-products',
      title: "Couples' Product Guides",
      blurb: 'Choosing and using products together, and how the big brands compare.',
      items: [
        guide('how-to-use-sex-toys-with-a-partner'),
        guide('best-couples-sex-toys'),
        guide('lovense-vs-we-vibe'),
        collection('couples-sex-toys'),
        topic('comparisons'),
      ],
    },
    {
      id: 'gifts',
      title: 'Gifts for Partners',
      blurb: 'Thoughtful gifts at every budget.',
      items: [
        guide('sex-toy-gifts-for-her'),
        guide('sex-toy-gifts-for-him'),
        guide('valentines-day-sex-toy-gifts'),
        topic('gift-guides'),
      ],
    },
  ],
}

export const PICKS_HUB: SiteHub = {
  path: '/shop',
  navLabel: 'Shop Our Picks',
  eyebrow: 'Thoughtfully Chosen',
  title: 'Shop Our Picks',
  metaTitle: 'Shop Our Picks: Curated Intimacy Products by Need',
  metaDescription:
    'Editorially curated product picks organized by what you need: beginners, quiet and discreet, couples, under $50, premium, lingerie and lubricants. Sold by our retail partners.',
  intro:
    'Picks organized by what you are looking for, each backed by our buying guides. We are an independent affiliate publisher: products are sold and shipped by the retailer, and we may earn a commission when you buy through our links.',
  sections: [
    {
      id: 'beginners',
      title: 'Best for Beginners',
      blurb: 'Gentle, simple and easy to use.',
      items: [collection('sex-toys-for-beginners'), guide('sex-toys-for-beginners'), guide('how-to-choose-your-first-vibrator')],
    },
    {
      id: 'quiet',
      title: 'Quiet & Discreet',
      blurb: 'Low-noise and low-profile picks, plus advice on private shipping.',
      items: [collection('quiet-vibrators'), collection('discreet-sex-toys'), guide('buying-sex-toys-discreetly')],
    },
    {
      id: 'couples',
      title: 'For Couples',
      blurb: 'Products designed to be shared.',
      items: [collection('couples-sex-toys'), collection('app-controlled-sex-toys'), guide('best-couples-sex-toys')],
    },
    {
      id: 'under-50',
      title: 'Under $50',
      blurb: 'Good first buys that keep the cost low.',
      items: [collection('sex-toys-under-50'), collection('stocking-stuffers')],
    },
    {
      id: 'premium',
      title: 'Premium Picks',
      blurb: 'Quieter motors, softer materials and builds that last.',
      items: [collection('luxury-sex-toys'), collection('sex-toys-under-100')],
    },
    {
      id: 'lingerie',
      title: 'Lingerie',
      blurb: 'Sets and bodysuits in sizes for every body.',
      items: [collection('lingerie-sets'), collection('comfortable-lingerie'), collection('plus-size-lingerie'), collection('lace-bodysuits')],
    },
    {
      id: 'lube',
      title: 'Lubricants & Care',
      blurb: 'Pair any product with a lube that suits it, and keep it clean.',
      items: [collection('water-based-lube'), collection('silicone-lube'), guide('best-lube-for-sex-toys'), guide('how-to-clean-sex-toys')],
    },
  ],
}

export interface ResolvedItem {
  label: string
  description?: string
  to: '/blog/$slug' | '/shop/$slug' | '/blog/topic/$topic'
  params: Record<string, string>
  kind: HubItem['kind']
}

/** Resolves hub items to links, dropping any whose guide, collection or topic does not exist. */
export function resolveHubSections(hub: SiteHub): (Omit<HubSection, 'items'> & { items: ResolvedItem[] })[] {
  return hub.sections
    .map((section) => ({
      ...section,
      items: section.items.flatMap((item): ResolvedItem[] => {
        if (item.kind === 'guide') {
          const post = POSTS_BY_SLUG[item.slug]
          return post
            ? [{ kind: 'guide', label: post.title, description: item.note ?? post.excerpt, to: '/blog/$slug', params: { slug: post.slug } }]
            : []
        }
        if (item.kind === 'collection') {
          const c = COLLECTIONS.find((x) => x.slug === item.slug)
          return c ? [{ kind: 'collection', label: c.name, description: item.note, to: '/shop/$slug', params: { slug: c.slug } }] : []
        }
        const t = TOPICS_BY_SLUG[item.slug]
        return t ? [{ kind: 'topic', label: `All ${t.name}`, description: item.note ?? t.intro, to: '/blog/topic/$topic', params: { topic: t.slug } }] : []
      }),
    }))
    .filter((s) => s.items.length > 0)
}
