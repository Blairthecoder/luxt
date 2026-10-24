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
import { VALENTINES_GIFTS } from '@/content/guides/valentines-day-sex-toy-gifts'
import { STOCKING_STUFFERS } from '@/content/guides/naughty-stocking-stuffers'
import { PENIS_RING_HOWTO } from '@/content/guides/how-to-use-a-penis-ring'
import { PROSTATE_BEGINNERS } from '@/content/guides/prostate-massage-for-beginners'
import { CLITORAL_VS_GSPOT } from '@/content/guides/clitoral-vs-g-spot-vibrators'
import { BEST_WANDS } from '@/content/guides/best-wand-vibrators'
import { LONG_DISTANCE } from '@/content/guides/long-distance-sex-toys'
import { PEGGING_BEGINNERS } from '@/content/guides/pegging-for-beginners'
import { BONDAGE_BEGINNERS } from '@/content/guides/bondage-for-beginners'
import { CLEAN_TOYS } from '@/content/guides/how-to-clean-sex-toys'
import { AUTOMATIC_STROKERS } from '@/content/guides/best-automatic-strokers'
import { MENOPAUSE_TOYS } from '@/content/guides/sex-toys-for-menopause'
import { WOMANIZER_VS_SONA } from '@/content/guides/womanizer-vs-lelo-sona'
import { LOVENSE_VS_WE_VIBE } from '@/content/guides/lovense-vs-we-vibe'
import { LE_WAND_VS_MAGIC_WAND } from '@/content/guides/le-wand-vs-magic-wand'
import { BEGINNERS_GUIDE } from '@/content/guides/sex-toys-for-beginners'
import { BLACK_FRIDAY_DEALS } from '@/content/guides/black-friday-sex-toy-deals'
import { BUYING_DISCREETLY } from '@/content/guides/buying-sex-toys-discreetly'
import { RECONNECT_UNSEEN } from '@/content/guides/reconnect-with-your-husband-when-you-feel-unseen'
import { INTRODUCE_KINK } from '@/content/guides/how-to-introduce-kink-to-your-marriage'
import { SEXY_ADVENT } from '@/content/guides/sexy-advent-calendar-ideas-for-couples'
import { BEST_TIME_TO_BUY } from '@/content/guides/best-time-to-buy-sex-toys'
import { MENS_QUESTIONS } from '@/content/guides/sex-toy-questions-men-are-afraid-to-ask'
import { TALK_TO_PARTNER } from '@/content/guides/how-to-talk-to-your-partner-about-sex-toys'
import { LDR_VIDEO_INTIMACY } from '@/content/guides/long-distance-relationship-video-call-intimacy'
import { CREATOR_STRATEGY } from '@/content/guides/adult-content-creator-strategy-by-level'
import { SOLO_CREATOR_IDEAS } from '@/content/guides/onlyfans-solo-creator-content-ideas'
import { COUPLE_CREATOR } from '@/content/guides/onlyfans-couple-creator-guide'
import { CREATOR_TOYS } from '@/content/guides/best-sex-toys-for-adult-content-creators'
import { PAYWALL_STRATEGY } from '@/content/guides/how-to-price-and-paywall-adult-content'
import { CREATOR_SAFETY } from '@/content/guides/privacy-and-safety-for-adult-content-creators'
import { BEST_FLESHLIGHT_BEGINNERS } from '@/content/guides/best-fleshlight-for-beginners'
import { CLEAN_FLESHLIGHT } from '@/content/guides/how-to-clean-a-fleshlight'
import { CLITORIS_ANATOMY } from '@/content/guides/clitoris-anatomy-guide'
import { ORGASM_FOR_WOMEN } from '@/content/guides/how-to-orgasm-for-women'
import { RESPONSIVE_DESIRE } from '@/content/guides/responsive-vs-spontaneous-desire'
import { CONSENT_RELATIONSHIPS } from '@/content/guides/consent-in-long-term-relationships'
import { WHY_SEX_HURTS } from '@/content/guides/why-does-sex-hurt'
import { FIND_G_SPOT } from '@/content/guides/how-to-find-the-g-spot'
import { SEX_MYTHS } from '@/content/guides/sex-myths-adults-still-believe'
import { ASK_IN_BED } from '@/content/guides/how-to-ask-for-what-you-want-in-bed'
import { NON_SEXUAL_INTIMACY } from '@/content/guides/non-sexual-intimacy-ideas'
import { MISMATCHED_LIBIDO } from '@/content/guides/mismatched-libido-in-relationships'
import { SENSATE_FOCUS } from '@/content/guides/sensate-focus-exercises-for-couples'
import { AFTERCARE } from '@/content/guides/what-is-aftercare'
import { CONFIDENT_IN_BED } from '@/content/guides/how-to-feel-confident-in-bed'
import { SELF_PLEASURE_WOMEN } from '@/content/guides/self-pleasure-guide-for-women'
import { MASTURBATION_BENEFITS } from '@/content/guides/benefits-of-masturbation'
import { SOLO_DATE_NIGHT } from '@/content/guides/solo-date-night-ideas'
import { SEXUAL_EMPOWERMENT } from '@/content/guides/sexual-empowerment-for-women'
import { SEXUAL_BOUNDARIES } from '@/content/guides/how-to-set-sexual-boundaries'
import { CONFIDENCE_AFTER_DIVORCE } from '@/content/guides/sexual-confidence-after-divorce'
import { KEGELS_FOR_PLEASURE } from '@/content/guides/kegel-exercises-for-pleasure'
import { SEX_AFTER_BABY } from '@/content/guides/sex-after-having-a-baby'

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
  /** Named writer and medical/sexual-health reviewer. Defaults to the editorial team (SITE.editorialTeam). */
  author?: { name: string; role?: string; url?: string }
  reviewedBy?: { name: string; credentials?: string; url?: string }
  /** Shows the general-education, not-medical-advice note under the body. */
  healthNote?: boolean
}

export const POSTS: Post[] = [
  GIFTS_FOR_HER,
  GIFTS_FOR_HIM,
  COUPLES_TOYS,
  ANNIVERSARY_GIFTS,
  SPICE_UP_MARRIAGE,
  TOYS_WITH_PARTNER,
  VALENTINES_GIFTS,
  STOCKING_STUFFERS,
  PENIS_RING_HOWTO,
  PROSTATE_BEGINNERS,
  CLITORAL_VS_GSPOT,
  BEST_WANDS,
  LONG_DISTANCE,
  PEGGING_BEGINNERS,
  BONDAGE_BEGINNERS,
  CLEAN_TOYS,
  AUTOMATIC_STROKERS,
  MENOPAUSE_TOYS,
  WOMANIZER_VS_SONA,
  LOVENSE_VS_WE_VIBE,
  LE_WAND_VS_MAGIC_WAND,
  BEGINNERS_GUIDE,
  BLACK_FRIDAY_DEALS,
  BUYING_DISCREETLY,
  RECONNECT_UNSEEN,
  INTRODUCE_KINK,
  SEXY_ADVENT,
  BEST_TIME_TO_BUY,
  MENS_QUESTIONS,
  TALK_TO_PARTNER,
  LDR_VIDEO_INTIMACY,
  CREATOR_STRATEGY,
  SOLO_CREATOR_IDEAS,
  COUPLE_CREATOR,
  CREATOR_TOYS,
  PAYWALL_STRATEGY,
  CREATOR_SAFETY,
  BEST_FLESHLIGHT_BEGINNERS,
  CLEAN_FLESHLIGHT,
  CLITORIS_ANATOMY,
  ORGASM_FOR_WOMEN,
  RESPONSIVE_DESIRE,
  CONSENT_RELATIONSHIPS,
  WHY_SEX_HURTS,
  FIND_G_SPOT,
  SEX_MYTHS,
  ASK_IN_BED,
  NON_SEXUAL_INTIMACY,
  MISMATCHED_LIBIDO,
  SENSATE_FOCUS,
  AFTERCARE,
  CONFIDENT_IN_BED,
  SELF_PLEASURE_WOMEN,
  MASTURBATION_BENEFITS,
  SOLO_DATE_NIGHT,
  SEXUAL_EMPOWERMENT,
  SEXUAL_BOUNDARIES,
  CONFIDENCE_AFTER_DIVORCE,
  KEGELS_FOR_PLEASURE,
  SEX_AFTER_BABY,
  {
    slug: 'fleshlight-vs-tenga',
    title: 'Fleshlight vs. Tenga: Which Stroker Should You Buy First?',
    metaTitle: 'Fleshlight vs. Tenga: Which Stroker to Buy First',
    metaDescription:
      'Fleshlight vs. Tenga: we compare feel, reusability, cleanup, discretion and cost so you can pick a first stroker that feels comfortable and suits you.',
    excerpt:
      'Two very different ways to enjoy solo time. How Fleshlight and Tenga compare, so you can choose the stroker that fits you and how you like to play.',
    publishedAt: '2026-10-19',
    updatedAt: '2026-10-24',
    readMinutes: 6,
    hubs: ['strokers'],
    topics: ['for-him', 'comparisons'],
    body: `
Solo time is a chance to relax, learn what you like and feel good in your own body. If you are shopping for your first stroker, you will run into two names almost immediately: **Fleshlight** and **Tenga**. Both are well made and both are worth buying. They just solve the problem differently, and this guide helps you choose based on how you plan to use it.

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

The trade-off is care. A sleeve needs to be rinsed with warm water after every use and dried completely, ideally by removing it from the case and letting it air out. Skip that and it will not last. Our guide to [cleaning a Fleshlight](/blog/how-to-clean-a-fleshlight) walks through it, and the [best Fleshlight for beginners](/blog/best-fleshlight-for-beginners) helps you pick a first sleeve.

## Tenga: Simple and Consistent

Tenga is a Japanese brand known for clean, considered design. Its single-use **cups** and **eggs** come ready to go, many with lube inside, which makes them a very low-effort way to find out what textures you like. When you are ready to commit, the reusable **Flip** and **Spinner** lines offer more intense, repeatable sensations.

## Prefer App Control? Our Lovense Picks

Fleshlight and Tenga are manual toys. If you would rather have a stroker that moves on its own or that a partner can control from their phone, these are the app-connected options we review:

- **[Lovense Max 2](/products/lovense-max-2):** a sleeve with air-pressure contractions and vibration, controllable from the app or a partner's Lovense toy.
- **[Lovense Calor](/products/lovense-calor):** a vibrating pocket stroker with a depth sensor that responds to movement.
- **[Lovense Solace](/products/lovense-solace):** an automatic thrusting stroker for hands-free play.

Read every review in our [Lovense reviews](/reviews#strokers).

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
      'How to choose your first vibrator with confidence: a plain-English guide to bullets, wands, rabbits and suction toys, plus power, noise and materials.',
    excerpt:
      'Your first vibrator should feel exciting, not confusing. Start with where you want sensation, then narrow it down by power, noise and material.',
    publishedAt: '2026-10-19',
    readMinutes: 7,
    hubs: ['vibrators', 'couples'],
    topics: ['for-her', 'how-to', 'buying-guides'],
    body: `
Your first vibrator is a chance to learn what feels good to you, at your own pace and on your own terms. Walking into the world of vibrators can feel like a lot. There are hundreds of shapes, a dozen technologies and a wide range of prices. The good news is that choosing well comes down to three questions.

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

You can get a great first vibrator for under $50. See our [picks under $50](/shop/sex-toys-under-50). Spending more usually buys a quieter motor, better silicone and a longer warranty, which is why [premium brands](/shop/luxury-sex-toys) can be worth it once you know what you like.

## Our Advice

Start external, start body-safe, and do not overspend on your first toy. Once you know what you enjoy, upgrading is easy. Browse all [vibrators](/category/vibrators) or toys [designed for women](/shop/sex-toys-for-women).
`,
  },
  {
    slug: 'best-lube-for-sex-toys',
    title: 'Which Lube Should You Use With Your Toys?',
    metaTitle: 'Best Lube for Sex Toys: Water, Silicone or Hybrid?',
    metaDescription:
      'Best lube for sex toys: water-based, silicone, hybrid or oil? How to keep silicone toys, condoms and anal play comfortable, all in plain, simple English.',
    excerpt:
      'Comfort changes everything. The right lube makes play smoother and easier and protects your toys. Here is how to match lube to the toy you own.',
    publishedAt: '2026-10-19',
    readMinutes: 5,
    hubs: ['lubricants', 'anal-toys', 'strokers', 'dildos'],
    topics: ['how-to', 'buying-guides'],
    body: `
Feeling comfortable is the foundation of feeling good, and lube is the simplest way to get there. It is the cheapest upgrade you can make to any toy: it reduces friction, makes play smoother and helps toys last. But not every lube works with every toy, and picking the wrong one can quietly damage a toy you love.

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

/** Last published or updated date, for sorting and bylines. */
export function postDate(post: Pick<Post, 'publishedAt' | 'updatedAt'>): string {
  return post.updatedAt ?? post.publishedAt
}

/** Newest first; guides from the same day keep their POSTS order. */
export function latestPosts(limit = POSTS.length): Post[] {
  return POSTS.map((p, i) => ({ p, i }))
    .sort((a, b) => postDate(b.p).localeCompare(postDate(a.p)) || a.i - b.i)
    .slice(0, limit)
    .map(({ p }) => p)
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
