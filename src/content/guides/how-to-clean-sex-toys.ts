import type { Post } from '@/content/posts'

export const CLEAN_TOYS: Post = {
  slug: 'how-to-clean-sex-toys',
  title: 'How to Clean Sex Toys: Silicone, Glass, Strokers and Electronics',
  metaTitle: 'How to Clean Sex Toys: A Guide by Material',
  metaDescription:
    'How to clean sex toys by material so you can relax and use them with confidence: silicone, glass, metal, TPE, strokers, electronics and what to avoid.',
  excerpt:
    'A clean toy is one less thing to think about. Simple care for silicone, glass, strokers and rechargeables, and what to keep away from them.',
  publishedAt: '2026-10-20',
  readMinutes: 8,
  hubs: ['more-toys', 'lubricants', 'strokers'],
  topics: ['how-to'],
  body: `
Part of feeling relaxed in the moment is knowing your toys are clean, safe and ready when you are. Clean toys are kinder to your body and last longer. The method depends on the material, and the wrong cleaner can damage a toy. This guide covers the common materials and the electronics inside many toys, so care becomes a quick, easy habit.

## The Basic Rule

Clean every toy **before and after each use**. Warm water and mild, unscented soap works for most. Use a dedicated toy cleaner if you prefer, which is gentler and sometimes antibacterial.

## By Material

| Material | Clean with | Avoid | Boil or dishwasher? |
|---|---|---|---|
| Silicone | Warm soapy water, toy cleaner | Silicone lube (it can bond to the surface) | Boil 3 to 5 minutes if no electronics |
| Glass | Warm soapy water, toy cleaner | Sudden temperature changes | Boil or top rack |
| Stainless steel | Warm soapy water, toy cleaner | Abrasives | Boil |
| Hard plastic (ABS) | Warm soapy water, toy cleaner | Alcohol, harsh solvents | No |
| TPE, TPR, jelly | Warm soapy water, toy cleaner | Heat, oil-based products | No |
| Stroker sleeves | Rinse with warm water, mild soap | Silicone lube, heat | No |
| Rechargeable electronics | Wipe, rinse the body if waterproof | Submerging non-waterproof toys | No |

## Silicone

Silicone is non-porous, so it cleans easily. Wash with soap and warm water, rinse and dry. If there are no electronics, you can boil for a few minutes. Do not use silicone-based lube with silicone toys. See our [lube guide](/blog/best-lube-for-sex-toys).

## Glass and Metal

Glass and stainless steel are non-porous and the easiest to sanitize. Wash with soap and warm water. Check glass for chips or cracks before each use and stop using a damaged toy.

## TPE, TPR and Jelly

These materials are porous, so they hold bacteria and can degrade. Wash carefully with mild soap, dry fully and store away from other toys. Consider a condom as a barrier. They have a shorter life than silicone.

## Strokers

Rinse the sleeve with warm water right after use, inside and out. Use a mild soap. Press out water and air dry on a clean towel or a stand, inside out if possible. Dust with a toy powder if the material feels sticky. Browse [strokers](/category/strokers).

## Rechargeable and Battery Toys

- **Waterproof:** wash the body with soap and water. Make sure the charging port is dry.
- **Not waterproof:** wipe with a damp cloth and mild soap, then dry. Do not submerge.
- **Check the label** for the waterproof rating.

[[picks:care]]

## Toy Cleaners and Wipes

A dedicated toy cleaner is gentle and convenient. A spray works for quick cleanup, and wipes are handy for travel. Look for a formula that is safe for your toy's material and free of heavy fragrance.

## What to Avoid

- **Alcohol** on silicone or plastic. It can dry and damage the surface.
- **Harsh soaps** with fragrance or antibacterial additives.
- **Bleach** in anything except a rare, diluted sanitizing soak of non-porous toys.
- **Dishwasher or boiling** for toys with electronics.
- **Sharing toys** between partners without a condom or cleaning in between.

## Storing Your Toys

- **Dry completely** before storing.
- **Store separately.** Silicone toys can react with each other or with TPE.
- **Use a breathable pouch** or the original bag.
- **Keep away from heat and sunlight.**
- **Keep batteries out** if you will not use a toy for a long time.

## When to Replace

Replace a toy if it is sticky or tacky, has a lingering smell, has cracks or tears, or the surface has changed. A porous toy that cannot be fully sanitized should be replaced sooner.

For more on keeping toys in good shape, read how to [choose your first vibrator](/blog/how-to-choose-your-first-vibrator) and the [lube guide](/blog/best-lube-for-sex-toys).
`,
  picks: {
    care: {
      slots: [
        {
          label: 'Best Toy Cleaner',
          note: 'A gentle cleaner made for toys. Quick to use and safe on most materials.',
          rules: [
            { hubs: ['more-toys'], title: 'cleaner|clean|wash|spray', maxPrice: 30 },
            { hubs: ['more-toys'], title: 'wipe|sanitiz', maxPrice: 30 },
          ],
          prefer: 'price-asc',
        },
      ],
    },
  },
  faqs: [
    {
      q: 'How do you clean a sex toy?',
      a: 'Wash with warm water and mild unscented soap or a toy cleaner before and after each use, then dry fully. Check the material and electronics first.',
    },
    {
      q: 'Can you boil a sex toy?',
      a: 'Solid silicone, glass and stainless steel toys without electronics can be boiled for 3 to 5 minutes. Do not boil TPE, jelly or toys with batteries or motors.',
    },
    {
      q: 'Can I use rubbing alcohol to clean a sex toy?',
      a: 'It is not recommended for silicone or plastic toys because it can damage the surface. Use mild soap or a toy cleaner instead.',
    },
  ],
}
