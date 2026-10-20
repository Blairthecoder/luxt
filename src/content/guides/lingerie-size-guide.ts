import type { Post } from '@/content/posts'

export const LINGERIE_SIZES: Post = {
  slug: 'lingerie-size-guide',
  title: 'Lingerie Size Guide: How to Measure and Find Your Fit',
  metaTitle: 'Lingerie Size Guide: How to Measure & Size Chart',
  metaDescription:
    'Lingerie size guide: how to measure bust, band, waist and hips, a typical US size chart, fit tips for bodysuits, babydolls and teddies, and gifting advice.',
  excerpt:
    'The right fit is what makes lingerie feel good. How to measure yourself, read a size chart and choose a forgiving style, plus how to buy for someone else.',
  publishedAt: '2026-10-20',
  readMinutes: 8,
  hubs: ['lingerie'],
  topics: ['gift-guides', 'for-her'],
  body: `
To find your lingerie size, measure your bust, underbust band, natural waist and hips with a soft tape, then compare those numbers with the brand's own size chart rather than your usual dress size. If you fall between sizes, size up for structured pieces and choose stretch styles for an easier fit.

Lingerie should make you feel good in your skin, and a piece that digs in or gapes rarely does. Sizing varies a lot between brands, so knowing your measurements is more reliable than any letter size. This guide shows you how to measure, gives a typical chart and explains how each style in our [lingerie](/category/lingerie) range tends to fit.

## The Short Answer

- **Measure four places:** bust, band (underbust), waist and hips.
- **Always check the brand's chart.** The table below is typical, not universal.
- **Between sizes?** Size up in structured pieces with cups or underwire; stretch mesh and lace are more forgiving.
- **Buying a gift?** Choose a stretchy one-size or bodystocking style, or a robe or chemise with a loose fit.

## How to Measure

Use a soft fabric tape measure and wear a thin, unpadded bra or nothing on top. Stand relaxed, breathe normally and keep the tape level all the way around without pulling it tight.

1. **Bust:** around the fullest part of your chest, usually across the nipples.
2. **Band (underbust):** snugly around your ribcage, directly under your bust.
3. **Waist:** around your natural waist, the narrowest part of your torso, usually an inch or two above the belly button.
4. **Hips:** around the fullest part of your hips and seat, with your feet together.

Write each number down in inches. If you are measuring yourself, a mirror helps you check the tape is level at the back.

### Finding a Bra Size

For pieces sized like a bra, your band measurement rounded to the nearest whole number gives a starting band size, and the difference between your bust and band gives the cup. Each inch of difference is roughly one cup size: 1 inch is an A, 2 inches a B, 3 inches a C, 4 inches a D, and so on. Methods vary between brands, so use this as a starting point and check their chart.

## Typical US Lingerie Size Chart

This is a typical guide only. Every brand cuts differently, so always check the size chart on the product page before you buy.

| Size | US dress size | Bust (in) | Waist (in) | Hips (in) |
|---|---|---|---|---|
| XS | 0 to 2 | 31 to 33 | 23 to 25 | 33 to 35 |
| S | 4 to 6 | 33 to 35 | 25 to 27 | 35 to 37 |
| M | 8 to 10 | 35 to 37 | 27 to 29 | 37 to 39 |
| L | 12 to 14 | 37 to 40 | 29 to 32 | 39 to 42 |
| XL | 16 | 40 to 42 | 32 to 34 | 42 to 44 |
| 1X | 16 to 18 | 42 to 45 | 34 to 37 | 44 to 47 |
| 2X | 20 to 22 | 45 to 48 | 37 to 40 | 47 to 50 |
| 3X | 24 to 26 | 48 to 51 | 40 to 43 | 50 to 53 |

**One size** pieces usually stretch to fit around a small to a large, and **queen** or **plus one size** pieces usually cover around 1X to 2X. The exact range is on each brand's chart.

## Fit Tips by Style

| Style | How it fits | Measurement that matters most |
|---|---|---|
| Bodystocking | Very stretchy; often one size | Height and hips |
| Bodysuit | Fitted from shoulder to crotch | Bust and torso length |
| Teddy | Like a bodysuit, softer and looser | Bust |
| Babydoll | Fitted at the bust, flowing below | Bust and band |
| Chemise | Slip dress, loose or lightly fitted | Bust and hips |
| Bra and panty set | Sized separately top and bottom | Band, cup and hips |

### Bodysuits and Bodystockings

A bodysuit runs from shoulders to crotch, so torso length matters as much as bust. If you are tall or long in the body, size up or look for adjustable straps. Bodystockings are knitted stretch mesh and forgiving on almost every body. They are the easiest style to buy without trying on.

### Teddies

A teddy is a softer, looser cousin of the bodysuit. It usually fits by bust size, with room through the body. If you are between sizes, the larger one tends to drape better.

### Babydolls

A babydoll fits at the bust and flows loosely below, so it suits almost any waist and hip shape. Get the bust and band right; everything else takes care of itself. If the cups are structured, use your bra size.

### Chemises

A chemise is a short slip dress. Loose styles fit mainly by bust, while fitted ones need your hip measurement too. Stretch fabrics forgive a lot; satin and silk do not stretch, so check the chart closely.

[[picks:styles]]

## Buying Lingerie as a Gift

Buying for someone else is lovely, and the safest approach is to remove sizing from the equation as much as you can.

- **Choose stretch:** bodystockings, stretch lace and one-size styles fit a wide range.
- **Go loose:** babydolls, chemises and robes do not need to fit closely.
- **Check their drawer:** the size labels on lingerie or sleepwear they already wear are a good clue. Do not guess from a dress size alone.
- **When unsure, size up.** Too loose is wearable; too tight is not.
- **Keep the gift receipt** and check the returns policy, since many stores do not accept worn intimate items.

[[picks:gift]]

Lingerie pairs well with a small toy or a gift set. See [sex toy gift sets](/shop/sex-toy-gift-sets)[[from:sex-toy-gift-sets]], [sex toys for women](/shop/sex-toys-for-women) and our guides to [sex toy gifts for her](/blog/sex-toy-gifts-for-her) and [Christmas gifts for couples](/blog/christmas-sex-toy-gifts-for-couples).

## Care

Hand wash in cold water with a gentle detergent and lay flat to dry. Fasten hooks before washing so they do not snag lace, and keep pieces out of the dryer so the elastic lasts.
`,
  picks: {
    styles: {
      slots: [
        {
          label: 'Most Forgiving Fit',
          note: 'Stretch mesh that fits a wide range of bodies. The easiest style to buy without trying on.',
          rules: [
            { hubs: ['lingerie'], title: 'bodystocking|body stocking', excludeTitle: 'costume' },
            { hubs: ['lingerie'], title: 'one size|stretch|mesh', excludeTitle: 'costume' },
          ],
        },
        {
          label: 'Best Bodysuit or Teddy',
          note: 'A fitted one-piece. Check torso length as well as bust if you are tall.',
          rules: [
            { hubs: ['lingerie'], title: 'bodysuit|teddy', excludeTitle: 'costume|bodystocking' },
            { hubs: ['lingerie'], title: 'body', excludeTitle: 'costume|bodystocking' },
          ],
        },
        {
          label: 'Best Babydoll or Chemise',
          note: 'Fitted at the bust and loose below, so it suits almost any shape.',
          rules: [
            { hubs: ['lingerie'], title: 'babydoll|chemise|slip', excludeTitle: 'costume' },
            { hubs: ['lingerie'], title: 'dress|gown|robe', excludeTitle: 'costume' },
          ],
        },
      ],
    },
    gift: {
      slots: [
        {
          label: 'Best Gift When Unsure of Size',
          note: 'A stretchy one-size piece that does not depend on knowing their exact measurements.',
          rules: [
            { hubs: ['lingerie'], title: 'one size|bodystocking|body stocking|stretch', excludeTitle: 'costume|queen|plus' },
            { hubs: ['lingerie'], title: 'babydoll|chemise|robe', excludeTitle: 'costume' },
          ],
          prefer: 'price-asc',
        },
        {
          label: 'Best Plus-Size Pick',
          note: 'A queen or plus-size cut designed for curves rather than sized up from a smaller pattern.',
          rules: [
            { hubs: ['lingerie'], title: 'queen|plus|curv|\\b[1-4]x\\b', excludeTitle: 'costume' },
            { hubs: ['lingerie'], text: 'queen|plus|curv', excludeTitle: 'costume' },
          ],
        },
      ],
    },
  },
  faqs: [
    {
      q: 'How do I measure myself for lingerie?',
      a: 'Use a soft tape to measure your bust at the fullest point, your band directly under your bust, your natural waist at the narrowest point and your hips at the fullest point. Keep the tape level and snug, not tight.',
    },
    {
      q: 'Does lingerie run small?',
      a: 'It often does, and it varies by brand. Compare your measurements with each brand\'s size chart rather than relying on your usual dress size.',
    },
    {
      q: 'Should I size up or down in lingerie?',
      a: 'Size up if you are between sizes in structured pieces with cups or underwire. Stretch mesh and lace are more forgiving, so your usual size is often fine.',
    },
    {
      q: 'What does one size fit in lingerie?',
      a: 'One size pieces usually stretch to fit around a small to a large, and queen or plus one size around 1X to 2X. Check the exact range on the brand\'s chart.',
    },
    {
      q: 'How do I buy lingerie as a gift if I do not know their size?',
      a: 'Choose a stretchy one-size, bodystocking, babydoll or chemise style, check the labels on lingerie they already own, size up if unsure and keep the gift receipt.',
    },
    {
      q: 'What is the difference between a teddy and a bodysuit?',
      a: 'Both are one-piece. A bodysuit is fitted from shoulder to crotch, while a teddy is softer and looser through the body.',
    },
  ],
}
