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
import { ANAL_BEGINNERS } from '@/content/guides/anal-toys-for-beginners'
import { BDSM_STARTER_KIT } from '@/content/guides/bdsm-starter-kit'
import { BEST_BULLETS } from '@/content/guides/best-bullet-vibrators'
import { BEST_PROSTATE_VIBRATORS } from '@/content/guides/best-prostate-vibrators'
import { BEST_RABBITS } from '@/content/guides/best-rabbit-vibrators'
import { BEST_THRUSTING } from '@/content/guides/best-thrusting-vibrators'
import { BEST_VIBRATING_RINGS } from '@/content/guides/best-vibrating-cock-rings'
import { BODY_SAFE_MATERIALS } from '@/content/guides/body-safe-sex-toy-materials'
import { BUTT_PLUG_SIZES } from '@/content/guides/butt-plug-sizes'
import { TOYS_AND_UTI } from '@/content/guides/can-sex-toys-cause-a-uti'
import { SILICONE_LUBE_SILICONE_TOYS } from '@/content/guides/can-you-use-silicone-lube-with-silicone-toys'
import { CHRISTMAS_COUPLES } from '@/content/guides/christmas-sex-toy-gifts-for-couples'
import { DISCREET_SHOPPING } from '@/content/guides/discreet-sex-toy-shopping'
import { HOW_LONG_TOYS_LAST } from '@/content/guides/how-long-do-sex-toys-last'
import { ASK_PARTNER_TOY } from '@/content/guides/how-to-ask-your-partner-to-try-a-sex-toy'
import { CHOOSE_A_DILDO } from '@/content/guides/how-to-choose-a-dildo'
import { HIDE_AND_TRAVEL } from '@/content/guides/how-to-hide-and-travel-with-sex-toys'
import { TALK_ABOUT_SEX } from '@/content/guides/how-to-talk-about-sex-with-your-partner'
import { PENIS_PUMP_HOWTO } from '@/content/guides/how-to-use-a-penis-pump'
import { IS_LOVENSE_WORTH_IT } from '@/content/guides/is-lovense-worth-it'
import { LELO_VS_WOMANIZER } from '@/content/guides/lelo-vs-womanizer'
import { LINGERIE_SIZES } from '@/content/guides/lingerie-size-guide'
import { MISMATCHED_LIBIDO } from '@/content/guides/mismatched-libido'
import { POSTPARTUM_TOYS } from '@/content/guides/postpartum-sex-toys'
import { QUIETEST_VIBRATORS } from '@/content/guides/quietest-vibrators'
import { ROLEPLAY_IDEAS } from '@/content/guides/roleplay-ideas-for-couples'
import { SEX_TOY_SIZES } from '@/content/guides/sex-toy-size-guide'
import { CHRONIC_PAIN_MOBILITY } from '@/content/guides/sex-toys-for-chronic-pain-and-limited-mobility'
import { ED_TOYS } from '@/content/guides/sex-toys-for-erectile-dysfunction'
import { STRAP_ON_HARNESS } from '@/content/guides/strap-on-harness-guide'
import { TYPES_OF_LUBE } from '@/content/guides/types-of-lube'
import { YES_NO_MAYBE } from '@/content/guides/yes-no-maybe-list'

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
  ANAL_BEGINNERS,
  BDSM_STARTER_KIT,
  BEST_BULLETS,
  BEST_PROSTATE_VIBRATORS,
  BEST_RABBITS,
  BEST_THRUSTING,
  BEST_VIBRATING_RINGS,
  BODY_SAFE_MATERIALS,
  BUTT_PLUG_SIZES,
  TOYS_AND_UTI,
  SILICONE_LUBE_SILICONE_TOYS,
  CHRISTMAS_COUPLES,
  DISCREET_SHOPPING,
  HOW_LONG_TOYS_LAST,
  ASK_PARTNER_TOY,
  CHOOSE_A_DILDO,
  HIDE_AND_TRAVEL,
  TALK_ABOUT_SEX,
  PENIS_PUMP_HOWTO,
  IS_LOVENSE_WORTH_IT,
  LELO_VS_WOMANIZER,
  LINGERIE_SIZES,
  MISMATCHED_LIBIDO,
  POSTPARTUM_TOYS,
  QUIETEST_VIBRATORS,
  ROLEPLAY_IDEAS,
  SEX_TOY_SIZES,
  CHRONIC_PAIN_MOBILITY,
  ED_TOYS,
  STRAP_ON_HARNESS,
  TYPES_OF_LUBE,
  YES_NO_MAYBE,
  {
    slug: 'fleshlight-vs-tenga',
    title: 'Fleshlight vs. Tenga: Which Stroker Should You Buy First?',
    metaTitle: 'Fleshlight vs. Tenga: Which Stroker to Buy First',
    metaDescription:
      'Fleshlight vs. Tenga: we compare feel, reusability, cleanup, discretion and cost so you can pick a first stroker that feels comfortable and suits you.',
    excerpt:
      'Two very different ways to enjoy solo time. How Fleshlight and Tenga compare, so you can choose the stroker that fits you and how you like to play.',
    publishedAt: '2026-10-19',
    readMinutes: 6,
    hubs: ['strokers'],
    topics: ['for-him'],
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
    faqs: [
      {
        q: 'Which is better for a first stroker, Fleshlight or Tenga?',
        a: 'Tenga cups are easier and lower commitment to start with. Fleshlight is a better fit if you already know you enjoy strokers and want a reusable toy.',
      },
      {
        q: 'What lube should I use with a stroker?',
        a: 'Water-based lube. It is safe with every sleeve material, whereas silicone lube can break down many stroker materials.',
      },
      {
        q: 'How do I clean a Fleshlight?',
        a: 'Rinse the sleeve with warm water after each use, then let it dry completely before storing it, ideally removed from the case.',
      },
    ],
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
    topics: ['for-her', 'how-to'],
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
    faqs: [
      {
        q: 'What is the best first vibrator?',
        a: 'A small clitoral vibrator or bullet is the easiest first pick: external, quiet, affordable and simple to use. A mini wand is a good step up if you want broader vibration.',
      },
      {
        q: 'Are vibrators noisy?',
        a: 'It varies. Rumbly, low-frequency motors tend to be quieter than high, buzzy ones, and a toy used under a blanket or against the body sounds quieter still.',
      },
      {
        q: 'What material should a vibrator be made of?',
        a: 'Body-safe silicone is the best all-round choice. It is non-porous, easy to clean and works with water-based lube.',
      },
    ],
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
    topics: ['how-to'],
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
    faqs: [
      {
        q: 'Which lube is best for sex toys?',
        a: 'Water-based lube is safe with every toy material and with condoms. Silicone lube lasts longer but can damage silicone toys, so use it with glass, steel or ABS plastic.',
      },
      {
        q: 'Can I use silicone lube with a silicone toy?',
        a: 'Usually not. Silicone lube can degrade silicone toys over time. Spot-test on the base of the toy first, or choose water-based lube.',
      },
      {
        q: 'How often should I reapply lube?',
        a: 'Whenever things start to feel dry or sticky. Water-based lube absorbs and dries faster, so plan to reapply during longer sessions.',
      },
    ],
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
