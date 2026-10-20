/**
 * Nightstand Notes: original buying guides. Bodies are Markdown, rendered on
 * the server. Link to /shop and /category pages so guides pass shoppers on.
 *
 * Bodies can embed live catalog data (see src/server/post-html.ts):
 * - `[[picks:<id>]]` on its own line renders the post's `picks[id]` block as
 *   product cards with feed prices and /go/ buttons.
 * - `[[from:<collection slug>]]` renders " (from $X)", the lowest in-stock
 *   price in that collection, or nothing if it is empty.
 * - `[[price:<collection slug>]]` renders that lowest price alone ("$12"),
 *   for tables.
 */
import type { CollectionRule } from '@/content/collections'
import { GIFTS_FOR_HER } from '@/content/guides/sex-toy-gifts-for-her'
import { GIFTS_FOR_HIM } from '@/content/guides/sex-toy-gifts-for-him'
import { COUPLES_TOYS } from '@/content/guides/best-couples-sex-toys'
import { SPICE_UP_MARRIAGE } from '@/content/guides/how-to-spice-up-your-marriage'
import { ANNIVERSARY_GIFTS } from '@/content/guides/anniversary-sex-toy-gifts'
import { TOYS_WITH_PARTNER } from '@/content/guides/how-to-use-sex-toys-with-a-partner'

export interface PickSlot {
  /** Short badge, e.g. "Best Overall" or "Under $50". */
  label: string
  /** Original one or two sentences on why this pick is here. */
  note: string
  /** Tried in order; the first rule with an in-stock product fills the slot. */
  rules: CollectionRule[]
  /** Which matching product to take. Defaults to the median price in range. */
  prefer?: 'price-desc' | 'price-asc'
}

export interface PickBlock {
  slots: PickSlot[]
}

export interface Post {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  publishedAt: string
  updatedAt?: string
  readMinutes: number
  /** Hubs this guide supports; used to surface it on category and product pages. */
  hubs: string[]
  /** Nightstand Notes topic hubs (src/content/topics.ts) this guide belongs to. */
  topics: string[]
  body: string
  picks?: Record<string, PickBlock>
  faqs?: { q: string; a: string }[]
}

export const POSTS: Post[] = [
  GIFTS_FOR_HER,
  GIFTS_FOR_HIM,
  COUPLES_TOYS,
  ANNIVERSARY_GIFTS,
  SPICE_UP_MARRIAGE,
  TOYS_WITH_PARTNER,
  {
    slug: 'fleshlight-vs-tenga',
    title: 'Fleshlight vs. Tenga: Which Stroker Should You Buy First?',
    metaTitle: 'Fleshlight vs. Tenga: Which Stroker to Buy First',
    metaDescription:
      'Fleshlight or Tenga? We compare feel, reusability, cleanup, discretion and cost so you can pick the right first stroker.',
    excerpt:
      'Two of the biggest names in strokers take very different approaches. Here is how to decide which one fits you.',
    publishedAt: '2026-10-19',
    readMinutes: 6,
    hubs: ['strokers'],
    topics: ['for-him'],
    body: `
If you are shopping for your first stroker, you will run into two names almost immediately: **Fleshlight** and **Tenga**. Both are well made and both are worth buying. They just solve the problem differently, and the right choice depends on how you plan to use it.

## The Short Answer

- **Choose Tenga** if you want something easy, clean and low-commitment to try first.
- **Choose Fleshlight** if you already know you enjoy strokers and want a realistic, reusable toy you will keep for years.

## How They Compare

| | Fleshlight | Tenga |
|---|---|---|
| Format | Reusable sleeve inside a hard case | Single-use cups and eggs, plus reusable lines |
| Feel | Realistic, soft, highly textured | Smooth, consistent, design-led |
| Lube | Add your own water-based lube | Most cups come pre-lubricated |
| Cleanup | Rinse, then dry fully before storing | Throw away single-use; rinse reusable models |
| Discretion | Looks like a large flashlight | Compact and neutral-looking |
| Cost to start | Higher upfront, lasts for years | Low per cup, reusable models cost more |

## Fleshlight: Realism and Range

Fleshlight sleeves are made from a soft, skin-like material housed in a rigid case. The cap at the bottom controls suction: loosen it for less, tighten it for more. The range is huge, from compact **Quickshot** models to the **Fleshlight Girls** line molded from adult performers.

The trade-off is care. A sleeve needs to be rinsed with warm water after every use and dried completely, ideally by removing it from the case and letting it air out. Skip that and it will not last.

[Browse Fleshlight](/shop/fleshlight)

## Tenga: Simple and Consistent

Tenga is a Japanese brand known for clean, considered design. Its single-use **cups** and **eggs** come ready to go, many with lube inside, which makes them a very low-effort way to find out what textures you like. When you are ready to commit, the reusable **Flip** and **Spinner** lines offer more intense, repeatable sensations.

[Browse Tenga](/shop/tenga)

## What to Buy With Either

1. **Water-based lube.** It is safe with every sleeve material. Silicone lube can break down many stroker materials, so skip it. See our [lube guide](/blog/best-lube-for-sex-toys).
2. **A toy cleaner** if you go reusable.
3. **Somewhere breathable to store it**, out of direct sunlight.

## Ready for More?

If you like the feeling but want hands-free play, look at [automatic strokers](/shop/automatic-strokers), which add thrusting or suction. Or browse every [stroker and masturbator](/category/strokers) we carry.
`,
  },
  {
    slug: 'how-to-choose-your-first-vibrator',
    title: 'How to Choose Your First Vibrator',
    metaTitle: 'How to Choose Your First Vibrator: A Simple Guide',
    metaDescription:
      'Bullet, wand, rabbit or suction? A plain-English guide to vibrator types, power, noise, materials and budget so you buy the right one first.',
    excerpt:
      'Bullet, wand, rabbit or suction? Start with where you want sensation, then narrow it down by power, noise and material.',
    publishedAt: '2026-10-19',
    readMinutes: 7,
    hubs: ['vibrators', 'couples'],
    topics: ['for-her', 'how-to'],
    body: `
Walking into the world of vibrators can feel like a lot. There are hundreds of shapes, a dozen technologies and prices from $15 to $300. The good news is that choosing well comes down to three questions.

## 1. Where Do You Want Sensation?

This narrows the field faster than anything else.

- **External (clitoral):** Most vulva owners orgasm from clitoral stimulation, which makes an external toy the safest first pick. Look at [clitoral vibrators](/shop/clitoral-vibrators), compact bullets and wands.
- **Internal:** Curved [G-spot vibrators](/shop/g-spot-vibrators) are shaped to press on the front wall of the vagina.
- **Both at once:** [Rabbit vibrators](/shop/rabbit-vibrators) pair an internal shaft with an external arm.
- **With a partner:** Wearables and [app-controlled toys](/shop/app-controlled-sex-toys) are made to be shared.

## 2. What Kind of Sensation?

| Type | Feels Like | Best For |
|---|---|---|
| Bullet | Focused, buzzy | Beginners, travel, use during sex |
| Wand | Broad and deep, very strong | People who want power |
| Air pulse or suction | Gentle waves, no direct contact | Sensitive clitoris, fast results |
| Rabbit | Internal and external together | Dual stimulation |
| G-spot | Targeted internal pressure | Internal exploration |

If you are not sure, a small wand or an air-pulse toy covers the most ground. [Wand vibrators](/shop/wand-vibrators) are also great as a full-body massager.

## 3. The Practical Details

**Material.** Choose body-safe, non-porous silicone. It is easy to clean and lasts. Avoid jelly or rubber toys with a strong chemical smell.

**Lube.** Use water-based lube with silicone toys. Silicone lube can damage silicone surfaces over time. More in our [lube guide](/blog/best-lube-for-sex-toys).

**Noise.** If you share walls, look for toys described as quiet or whisper-level. Lower, rumbly vibrations also tend to be quieter than high, buzzy ones.

**Charging and water.** Rechargeable toys save money on batteries, and a waterproof toy can go in the shower and is easier to clean.

## How Much to Spend

You can get a great first vibrator for under $50. See our [picks under $50](/shop/sex-toys-under-50). Spending more usually buys a quieter motor, better silicone and a longer warranty, which is why [premium brands](/shop/luxury-sex-toys) are worth it if you already know what you like.

## Our Advice

Start external, start body-safe, and do not overspend on your first toy. Once you know what you enjoy, upgrading is easy. Browse all [vibrators](/category/vibrators) or toys [designed for women](/shop/sex-toys-for-women).
`,
  },
  {
    slug: 'best-lube-for-sex-toys',
    title: 'Which Lube Should You Use With Your Toys?',
    metaTitle: 'Best Lube for Sex Toys: Water, Silicone or Hybrid?',
    metaDescription:
      'Water-based, silicone, hybrid or oil? Which lube works with silicone toys, condoms and anal play, explained in plain English.',
    excerpt:
      'The right lube makes everything more comfortable and protects your toys. Here is how to match lube to the toy you own.',
    publishedAt: '2026-10-19',
    readMinutes: 5,
    hubs: ['lubricants', 'anal-toys', 'strokers', 'dildos'],
    topics: ['how-to'],
    body: `
Lube is the cheapest upgrade you can make to any toy. It makes play more comfortable, reduces friction and helps toys last. But not every lube works with every toy, and picking the wrong one can quietly damage something you paid good money for.

## The Quick Rule

**When in doubt, use water-based lube.** It works with every toy material and every condom.

## The Four Types

| Type | Lasts | Safe With Silicone Toys | Safe With Latex Condoms | Cleanup |
|---|---|---|---|---|
| Water-based | Short, reapply | Yes | Yes | Easy, rinses off |
| Silicone-based | Long | Not recommended | Yes | Needs soap |
| Hybrid | Medium | Patch test first | Usually yes | Easy |
| Oil-based | Long | Varies | No | Needs soap |

### Water-Based
The all-rounder. It feels natural, rinses away easily and works with silicone toys, strokers and condoms. The only downside is that it can dry out, so keep the bottle nearby. [Shop water-based and other lubes](/category/lubricants).

### Silicone-Based
Silky and very long-lasting, and it does not wash away in the shower. That makes it great for sex without toys. Avoid it with silicone toys, because it can bond with the surface and leave it tacky over time.

### Hybrid
A blend of water and silicone that lasts longer than water-based with a creamier feel. Test it on a small, hidden spot of a silicone toy before using it all over.

### Oil-Based
Long-lasting and good for massage, but it breaks down latex condoms and can stain sheets. Keep it away from condoms entirely.

## Special Cases

**Anal play.** The body does not self-lubricate there, so choose a thicker water-based or hybrid formula and reapply often. Pair it with a toy that has a flared base, like a [butt plug](/shop/butt-plugs).

**Strokers.** Use water-based only. Silicone lube can damage most sleeve materials. See our [Fleshlight vs. Tenga guide](/blog/fleshlight-vs-tenga).

**Sensitive skin.** If you are prone to irritation, look for lubes without glycerin, parabens or fragrance, and skip warming or tingling formulas.

## Bottom Line

Keep a good water-based lube in your nightstand as the default, and add a silicone lube for toy-free sex if you like it. Browse every [lubricant](/category/lubricants) we carry.
`,
  },
]

export const POSTS_BY_SLUG: Record<string, Post> = Object.fromEntries(POSTS.map((p) => [p.slug, p]))

export function postsForHub(hub: string): Post[] {
  return POSTS.filter((p) => p.hubs.includes(hub))
}

export function postsForTopic(topic: string): Post[] {
  return POSTS.filter((p) => p.topics.includes(topic))
}

/** Guides that share the most topics with this one, newest first on ties. */
export function relatedPosts(post: Post, limit = 3): Post[] {
  const shared = (p: Post) => p.topics.filter((t) => post.topics.includes(t)).length
  return POSTS.filter((p) => p.slug !== post.slug)
    .map((p, i) => ({ p, score: shared(p) * 100 - i }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p)
}
