import type { ProductCopy } from '@/types/catalog'

/**
 * Original editorial copy keyed by product handle. A product page is indexable
 * only once it has an entry here; do not paste merchant descriptions.
 *
 * Example:
 * 'doc-johnson-main-squeeze-lulu-chu': {
 *   summary: 'One or two sentences in our own words on what it is and who it suits.',
 *   body: ['Paragraph on how it feels and how it compares.'],
 *   bestFor: 'First-time stroker buyers who want a realistic feel.',
 *   pros: ['...'],
 *   cons: ['...'],
 *   faqs: [{ q: 'Is it easy to clean?', a: '...' }],
 * },
 */

const WATER_LUBE_FAQ = {
  q: 'Which lube should I use with it?',
  a: 'A water-based lube. It is safe with silicone and with every stroker material, and it rinses off easily.',
}

const STROKER_LUBE_FAQ = {
  q: 'Which lube works with it?',
  a: 'Water-based lube. Silicone lube can damage many sleeve materials, so keep it for toy-free sex.',
}

export const PRODUCT_COPY: Record<string, ProductCopy> = {
  // Homepage
  'kiiroo-power-blow': {
    summary:
      'A rechargeable suction add-on from Kiiroo that fits onto its Feel strokers and adds rhythmic suction to manual play.',
    body: [
      'The PowerBlow is not a stroker on its own. It is a motorized unit that attaches to the end of a compatible Kiiroo Feel sleeve and draws air in pulses, so each stroke comes with a pull that a manual sleeve cannot give you.',
      'It makes most sense for someone who already owns, or is buying, a Feel stroker and wants more from it without moving up to a fully automatic machine. You still control the stroke; the PowerBlow adds the suction.',
    ],
    bestFor: 'Kiiroo Feel owners who want suction without buying a new stroker.',
    pros: [
      'Turns a manual sleeve into something more intense',
      'Cheaper than a full automatic stroker',
      'Rechargeable, with no cables during use',
    ],
    cons: [
      'Needs a compatible Kiiroo Feel sleeve to work',
      'Adds bulk to a pocket stroker',
    ],
    faqs: [
      {
        q: 'Does it work with any stroker?',
        a: 'It is designed for Kiiroo’s Feel range. Check the listing for the sleeves it fits before you buy.',
      },
      STROKER_LUBE_FAQ,
    ],
  },
  'svakom-plume-rechargeable-silicone-dual-vibrator': {
    summary:
      'A rechargeable silicone dual vibrator from Svakom that stimulates inside and out at the same time, at an approachable price.',
    body: [
      'Dual vibrators pair an internal shaft with an external arm so the G-spot and clitoris get attention together. Svakom is known for colorful, well-finished silicone toys that sit between budget and luxury on price, and the Plume fits that pattern.',
      'Dual toys suit people who already know they enjoy penetration. If you are new to toys, an external vibrator is an easier first step, and a dual toy makes a good second one.',
    ],
    bestFor: 'People who enjoy internal play and want both kinds of sensation at once.',
    pros: ['Internal and external stimulation in one toy', 'Body-safe silicone', 'USB rechargeable'],
    cons: ['Fit varies by body, as with any dual vibrator', 'More to learn than a simple external toy'],
    faqs: [WATER_LUBE_FAQ],
  },
  'romp-rose-glow-air-clitoral-stimulator-rechargeable-silicone-suction-vibrator': {
    summary:
      'An air-pulse clitoral toy from ROMP, the value brand from the group behind Womanizer, in a compact rose-shaped body.',
    body: [
      'Air-pulse toys work by sealing a soft mouth around the clitoris and pushing gentle waves of pressure through it. There is no direct buzzing contact, which many people find intense without being harsh.',
      'ROMP sits in the same family as Womanizer and We-Vibe and uses the same idea at a much lower price. That makes this a sensible way to find out whether you like air-pulse stimulation before spending more.',
    ],
    bestFor: 'First-time buyers curious about suction-style toys.',
    pros: [
      'Air-pulse sensation at an entry price',
      'Rechargeable silicone body',
      'Small and easy to store',
    ],
    cons: ['Fewer settings and less refinement than flagship air-pulse toys'],
    faqs: [
      {
        q: 'Do I need lube with an air-pulse toy?',
        a: 'A little water-based lube around the opening helps it seal and feel smoother. It is optional, but most people prefer it.',
      },
    ],
  },
  'vush-essentials-wand-tip-vibrator': {
    summary:
      'A small, wand-tipped vibrator from VUSH’s Essentials line that brings a rounded, focused head to an entry-level price.',
    body: [
      'The wand-tip shape gives you a rounded head that spreads vibration a little more than a pointed bullet, while staying small enough to use during sex or slip into a bag.',
      'VUSH is an Australian brand with a playful, design-led look, and the Essentials range is its most affordable. It is a low-risk first vibrator or a travel spare for someone with a bigger wand at home.',
    ],
    bestFor: 'Beginners and travelers who want a small, easy external vibrator.',
    pros: ['Approachable price', 'Rounded head is easy to angle', 'Small enough to bring into partnered sex'],
    cons: ['Not as strong or deep as a full-size wand'],
    faqs: [WATER_LUBE_FAQ],
  },
  'kiiroo-prowand-vibrator': {
    summary:
      'Kiiroo’s wand vibrator: a broad head on a handle, from a brand better known for interactive strokers.',
    body: [
      'A wand gives deep, wide vibration that suits people who find bullets too buzzy. The ProWand brings that format to Kiiroo’s range, which is mostly known for strokers and app-connected toys.',
      'Use it externally, start on the lowest setting and work up, and treat it as a body massager too. As with any wand, the flat of the head gives broad pressure and the edge gives more focus.',
    ],
    bestFor: 'People who want wand-style power from a newer, tech-focused brand.',
    pros: ['Broad, deep vibration', 'Doubles as a body massager', 'Long handle makes it easy to reach and angle'],
    cons: ['Larger than a bullet or mini wand', 'Fewer accessories than Le Wand or Magic Wand'],
    faqs: [
      {
        q: 'Is a wand good for beginners?',
        a: 'Yes, as long as you start low. Wands are strong, and the broad head is often gentler than a small, pointed vibrator at the same setting.',
      },
    ],
  },
  'womanizer-beauty-lipstick-clitoral-stimulator': {
    summary:
      'A lipstick-style clitoral toy from Womanizer that looks like a makeup item and stores as easily as one.',
    body: [
      'Lipstick-shaped toys are about discretion. They sit in a makeup bag or a bedside drawer without drawing attention, and the slim body is easy to hold during solo play or sex.',
      'Womanizer is the brand that introduced air-pulse stimulation, and its name carries a reputation for well-made, rechargeable toys. This model comes in several colors, so it works well as a gift.',
    ],
    bestFor: 'People who want a discreet, travel-friendly clitoral toy.',
    pros: ['Looks like a cosmetic, not a toy', 'Several color options', 'From a brand with a strong track record'],
    cons: ['A slim body has less room for power than a full-size toy'],
    faqs: [
      {
        q: 'Is it good for travel?',
        a: 'Yes. Its size and shape suit a toiletry bag, and it charges like any small gadget.',
      },
    ],
  },
  'romp-lemon-crush-clitoral-stimulator': {
    summary:
      'A playful, low-cost clitoral toy from ROMP, the value brand in the Womanizer and We-Vibe family.',
    body: [
      'ROMP makes simple, cheerful toys that borrow ideas from its sister brands at a much lower price. The Lemon Crush is one of the most affordable ways into the range.',
      'At this price it is a no-pressure first toy, a stocking stuffer or a spare. Pair it with a water-based lube and start on the lowest setting.',
    ],
    bestFor: 'A first toy or an easy, low-cost gift.',
    pros: ['One of the lowest prices from a well-known toy group', 'Bright, unintimidating design', 'Simple to use'],
    cons: ['Basic compared with flagship clitoral toys'],
    faqs: [WATER_LUBE_FAQ],
  },
  'kiiroo-feel-pocket-powerblow-combo-rechargeable-stroker': {
    summary:
      'A Kiiroo Feel pocket stroker bundled with the PowerBlow suction add-on, so you get a sleeve and powered suction in one box.',
    body: [
      'Buying the pair together solves the main question with the PowerBlow, which is whether you have a sleeve it fits. You get a compact Feel pocket stroker for manual use and the suction unit that clips on when you want more.',
      'It is a good middle step between a manual stroker and a fully automatic machine: more sensation than a sleeve alone, with you still in control of the pace.',
    ],
    bestFor: 'Someone ready to move past a basic manual stroker.',
    pros: ['Sleeve and suction unit that are made to fit together', 'Usable manually or with suction', 'Compact pocket format'],
    cons: ['More parts to clean than a simple sleeve'],
    faqs: [
      STROKER_LUBE_FAQ,
      {
        q: 'How do I clean it?',
        a: 'Separate the sleeve, rinse it with warm water and a toy cleaner, and let it dry fully before reassembling. Wipe the powered unit; do not submerge it unless the listing says it is waterproof.',
      },
    ],
  },
  'svakom-robin-masturbator': {
    summary:
      'A compact stroker from Svakom, a brand known for colorful, well-finished toys at fair prices.',
    body: [
      'Svakom is better known for vibrators, but its male range follows the same approach: tidy design, body-friendly materials and prices that stay below the luxury brands.',
      'A compact stroker like this is easy to store and clean, which matters more over time than any single feature. Use plenty of water-based lube and dry it fully after each use.',
    ],
    bestFor: 'Someone who wants a tidy, design-led stroker without a luxury price.',
    pros: ['From an established, design-focused brand', 'Compact and easy to store'],
    cons: ['Fewer reviews and accessories than Fleshlight or Tenga'],
    faqs: [STROKER_LUBE_FAQ],
  },
  'tenga-puffy-stroker': {
    summary:
      'A soft-bodied, reusable stroker from Tenga, the Japanese brand known for clean design and consistent quality.',
    body: [
      'Tenga made its name with single-use cups, then built reusable lines for people who knew what they liked. The Puffy sits in that reusable group, with a soft, cushioned body that gives a gentler grip than a hard-cased stroker.',
      'It comes in several colors and looks more like a homeware object than a toy, which helps if you share a home. Rinse it after each use and let it dry fully.',
    ],
    bestFor: 'Someone who wants a discreet, reusable stroker with a softer feel.',
    pros: ['Reusable', 'Neutral, playful look that stores discreetly', 'Several colors'],
    cons: ['Less intense than Tenga’s textured hard-cased models'],
    faqs: [STROKER_LUBE_FAQ],
  },
  'kiiroo-spot-interactive-rechargeable-silicone-wearable-vibrating-egg': {
    summary:
      'A wearable vibrating egg from Kiiroo, made for hands-free play and for handing the controls to a partner.',
    body: [
      'A wearable egg is worn internally, so your hands stay free and a partner can take over. Kiiroo builds most of its range around connected, interactive play, and this egg brings that to a small, body-safe silicone toy.',
      'It suits playful couples, long-distance relationships and anyone who likes the idea of not knowing when the next buzz will come. Check that the app supports your phone before you buy.',
    ],
    bestFor: 'Couples who want a wearable toy one partner can control.',
    pros: ['Hands-free and wearable', 'Silicone and rechargeable', 'Built for connected play'],
    cons: ['Internal wear is not for everyone', 'App features depend on your phone and connection'],
    faqs: [
      {
        q: 'Can I wear it outside the house?',
        a: 'Many people do. Try it at home first so you know how it sits and how audible it is at each setting.',
      },
      WATER_LUBE_FAQ,
    ],
  },
  'svakom-tyler-silicone-rechargeable-clitoral-stimulating-couples-ring': {
    summary:
      'A rechargeable silicone couples ring from Svakom that sits at the base of the penis and adds clitoral stimulation during sex.',
    body: [
      'A vibrating couples ring does two jobs. The ring helps maintain firmness, and the vibrating part rests where it can reach the clitoris during penetration, so both partners feel it.',
      'Svakom’s version is silicone and rechargeable, which avoids the waste and weak motors of disposable rings. Fit matters: a ring should feel snug, never painful, and come off after about 30 minutes.',
    ],
    bestFor: 'Couples looking for an easy first toy to use during sex.',
    pros: ['Benefits both partners at once', 'Rechargeable rather than disposable', 'Stretchy silicone is easy to fit'],
    cons: ['Not ideal for every position', 'Fit varies with size'],
    faqs: [
      {
        q: 'How long can I wear a cock ring?',
        a: 'Most guidance says up to about 30 minutes. Take it off right away if you feel numbness, coldness or pain.',
      },
      WATER_LUBE_FAQ,
    ],
  },
  'zalo-apis-app-controlled-couple-s-ring': {
    summary:
      'An app-controlled couples ring from ZALO, a luxury brand known for jewelry-like finishes.',
    body: [
      'A couples ring helps with firmness and adds vibration where both partners can feel it. The app control adds a layer of play, letting either partner adjust it, or one partner take it over entirely.',
      'ZALO sits at the design end of the market, so expect a more polished look than most rings. As with any ring, start snug but comfortable and limit wear to about 30 minutes.',
    ],
    bestFor: 'Couples who want a ring that feels like a considered gift.',
    pros: ['App control for shared or handed-over play', 'Premium look and finish'],
    cons: ['Costs more than a basic vibrating ring', 'App features depend on your phone'],
    faqs: [WATER_LUBE_FAQ],
  },
  'kiiroo-keon-wifi-feel-victoria-combo-set-interactive-automatic-masturbator': {
    summary:
      'Kiiroo’s Keon automatic stroker bundled with a Feel sleeve, so the machine and a compatible sleeve arrive together.',
    body: [
      'The Keon moves a stroker sleeve up and down for you, and it can sync with supported interactive content through Kiiroo’s app. This set pairs it with a Feel sleeve modeled on an adult performer, which saves you matching a sleeve to the machine.',
      'It is a serious purchase for someone who already enjoys strokers and wants hands-free play. Set it up on a stable surface or use a stand, and keep a water-based lube nearby.',
    ],
    bestFor: 'Experienced stroker users ready for a hands-free machine.',
    pros: ['Machine and sleeve that fit each other', 'Hands-free stroking', 'Interactive content support'],
    cons: ['Large and not very discreet', 'Premium price', 'Takes some setup'],
    faqs: [
      STROKER_LUBE_FAQ,
      {
        q: 'Can I use other sleeves?',
        a: 'The Keon is built around Kiiroo’s Feel sleeves. Check the listing for compatibility before buying others.',
      },
    ],
  },
  'lelo-boomerang-dual-vibrator-for-couples-app-controlled-waterproof-silicone-design': {
    summary:
      'An app-controlled, waterproof dual vibrator from LELO designed for couples, with the finish you expect from the Swedish brand.',
    body: [
      'LELO is one of the best-known luxury toy makers, with smooth silicone and quiet, well-tuned motors across the range. The Boomerang brings that to a dual-ended couples design that can be shared or handed over through the app.',
      'Because it is waterproof, cleanup is easy and it can come into the shower. Use a water-based lube, since silicone lube can wear the surface of silicone toys over time.',
    ],
    bestFor: 'Couples who want a premium shared toy with app control.',
    pros: ['Premium silicone and finish', 'App control for shared play', 'Waterproof'],
    cons: ['Luxury price', 'App features depend on your phone'],
    faqs: [WATER_LUBE_FAQ],
  },
  'womanizer-next-rechargeable-silicone-3d-pleasure-air-clitoral-stimulator': {
    summary:
      'Womanizer’s flagship air-pulse clitoral stimulator, with the brand’s 3D Pleasure Air approach and a premium silicone body.',
    body: [
      'Womanizer introduced air-pulse stimulation, where a soft mouth sits over the clitoris and gentle pressure waves do the work without direct contact. The Next is the current flagship, refining the feel with what the brand calls 3D Pleasure Air.',
      'It is the toy to buy when you already know you like air pulse and want the most developed version of it, or when you want a luxury gift that does not need explaining. It comes in more than one color.',
    ],
    bestFor: 'Air-pulse fans upgrading to the brand’s top model.',
    pros: ['The flagship from the brand that invented air pulse', 'Contact-free stimulation', 'Rechargeable silicone body'],
    cons: ['Premium price', 'Entry Womanizer models offer the same basic sensation for less'],
    faqs: [
      {
        q: 'What is the difference between air pulse and vibration?',
        a: 'Vibration buzzes against the skin. Air pulse creates waves of pressure over the clitoris without direct contact, which many people find more intense and less numbing.',
      },
      {
        q: 'Should I use lube?',
        a: 'A little water-based lube around the opening helps it seal and glide.',
      },
    ],
  },

  // Guide picks
  'womanizer-next-liberty-clit-stimulator': {
    summary:
      'A Womanizer air-pulse clitoral toy in the brand’s travel-friendly Liberty style, with contact-free stimulation in a compact body.',
    body: [
      'The Liberty models are Womanizer’s answer to travel: a compact body that is easy to pack and store, using the same air-pulse idea as the rest of the range.',
      'It is a strong choice for a first Womanizer or a gift, because it delivers the brand’s signature sensation without the flagship price.',
    ],
    bestFor: 'A first Womanizer, or someone who travels.',
    pros: ['Signature Womanizer air-pulse sensation', 'Compact and easy to pack', 'A safe gift choice'],
    cons: ['Fewer refinements than the flagship Next'],
    faqs: [
      {
        q: 'Is it noisy?',
        a: 'Air-pulse toys make a soft whirring sound. It is noticeable in a quiet room but easy to muffle under a sheet.',
      },
    ],
  },
  'le-wand-hither-rechargeable-silicone-vibrator': {
    summary:
      'A rechargeable silicone vibrator from Le Wand, the brand behind some of the most popular cordless wands.',
    body: [
      'Le Wand built its name on strong, rumbly cordless wands and has since added smaller vibrators that carry the same motor character into other shapes. The Hither brings that to a rechargeable silicone body.',
      'Look at the product images to check the shape against what you enjoy, use water-based lube and start low. Le Wand toys are known for depth of vibration rather than sharp buzz.',
    ],
    bestFor: 'Le Wand fans who want the brand’s feel in a different shape.',
    pros: ['From a brand known for deep, rumbly motors', 'Body-safe silicone', 'Rechargeable'],
    cons: ['Not a full-size wand'],
    faqs: [WATER_LUBE_FAQ],
  },
  'vush-glow-rabbit-vibrator': {
    summary:
      'A rabbit vibrator from VUSH that pairs an internal shaft with an external arm for dual stimulation.',
    body: [
      'Rabbits give G-spot and clitoral stimulation together, which suits people who already enjoy penetration. VUSH brings a playful, design-led look and keeps the price in the middle of the market.',
      'Fit is the main thing to check with any rabbit. Bodies differ, so a flexible external arm helps it line up. Use a water-based lube and start on a low setting.',
    ],
    bestFor: 'People who want both kinds of stimulation at a mid-range price.',
    pros: ['Dual stimulation', 'Design-led look', 'Mid-range price'],
    cons: ['Rabbit fit varies by body'],
    faqs: [WATER_LUBE_FAQ],
  },
  'lelo-smart-wand-2-rechargeable-body-massager-large': {
    summary:
      'LELO’s large rechargeable wand: broad, deep vibration in a premium silicone body that doubles as a genuine massager.',
    body: [
      'The Smart Wand 2 is LELO’s full-size wand. It offers the broad head and deep vibration that make wands so popular, with the smooth silicone and finish the brand is known for.',
      'Choose the large size if you want power and plan to use it as a body massager too. It is a premium choice; Le Wand and Magic Wand offer similar formats at different prices.',
    ],
    bestFor: 'Someone who wants a luxury wand that also works as a massager.',
    pros: ['Full-size head with broad, deep vibration', 'Premium silicone', 'Cordless and rechargeable'],
    cons: ['Luxury price', 'Large to store'],
    faqs: [WATER_LUBE_FAQ],
  },
  'lelo-switch-double-sided-wand-vibrator-app-controlled-dual-motor-massager': {
    summary:
      'A double-sided LELO wand with two motors and app control, built for people who want more than one sensation from a single toy.',
    body: [
      'Most wands have one head. The Switch has two, each with its own motor, so you can change the feel by turning it around. App control adds patterns and lets a partner join in.',
      'It is a premium, feature-rich wand for someone who already knows they like wands. If you just want strong, simple vibration, a classic wand costs less.',
    ],
    bestFor: 'Wand fans who want variety and app control.',
    pros: ['Two heads and two motors', 'App control', 'LELO finish'],
    cons: ['Luxury price', 'More complex than a classic wand'],
    faqs: [WATER_LUBE_FAQ],
  },
  'le-wand-powerful-petite-plug-in': {
    summary:
      'A corded petite wand from Le Wand: smaller than a full-size wand, and never needs charging.',
    body: [
      'Plug-in wands trade a cord for a motor that never runs down. This petite version keeps the body manageable while giving you the reliability of mains power.',
      'It suits home use, especially for anyone who has been let down by a battery mid-session. Never use a corded wand in or near water.',
    ],
    bestFor: 'Home use when you want reliable power in a smaller wand.',
    pros: ['Never needs charging', 'Petite size is easier to handle', 'Deep Le Wand vibration'],
    cons: ['The cord limits where you can use it', 'Not for the shower or bath'],
    faqs: [
      {
        q: 'Is corded stronger than cordless?',
        a: 'Corded wands are usually at least as strong and never fade as a battery drains. The trade-off is the cord.',
      },
    ],
  },
  'tenga-egg': {
    summary:
      'Tenga’s egg-shaped, stretchy stroker: compact, inexpensive and one of the easiest ways to try a stroker.',
    body: [
      'The Egg is a soft, very stretchy sleeve with a texture inside. It comes with lube, so there is nothing else to buy, and it is designed for a single session, which keeps cleanup to zero.',
      'It is a common first stroker, an easy stocking stuffer and a good way to sample Tenga before buying a reusable model.',
    ],
    bestFor: 'A low-commitment first stroker or small gift.',
    pros: ['Very affordable', 'Comes with lube', 'Discreet, egg-shaped packaging'],
    cons: ['Designed for single use', 'Less intense than reusable hard-cased strokers'],
    faqs: [
      {
        q: 'Can I reuse it?',
        a: 'Tenga designs the Egg for one session. For something reusable, look at the Spinner or Flip lines.',
      },
    ],
  },
  'tenga-spinner-stroker-masturbator': {
    summary:
      'A reusable Tenga stroker whose internal spiral makes the sleeve twist as you move, adding a rotating sensation to manual strokes.',
    body: [
      'The Spinner takes a simple idea and does it well: the shape inside the sleeve causes it to spin as you stroke, so you get a twisting sensation without any motor.',
      'It is reusable and easy to clean, which makes it a step up from Tenga’s single-use cups for someone who already knows they enjoy strokers.',
    ],
    bestFor: 'Someone moving from single-use cups to a reusable stroker.',
    pros: ['Twisting sensation with no motor', 'Reusable and easy to clean', 'Clean, discreet design'],
    cons: ['Manual only', 'Needs plenty of lube'],
    faqs: [STROKER_LUBE_FAQ],
  },
  'we-vibe-sync-2nd-generation-rechargeable-silicone-couples-vibrator-with-remote-control': {
    summary:
      'We-Vibe’s adjustable couples vibrator, worn during penetrative sex, with a remote and app control included.',
    body: [
      'The Sync is the toy that made We-Vibe’s name. It is a C-shaped vibrator: one end sits inside against the G-spot and the other rests on the clitoris, staying in place during sex so both partners feel it.',
      'The adjustable shape helps it fit different bodies, and the remote or app lets either partner change the settings. It is one of the most recommended couples toys for good reason.',
    ],
    bestFor: 'Couples who want a toy that stays in place during sex.',
    pros: ['Wearable during penetration', 'Adjustable fit', 'Remote and app control'],
    cons: ['Can take some adjusting to find the right fit', 'Premium price for a first couples toy'],
    faqs: [
      {
        q: 'Can it be used solo?',
        a: 'Yes. It works on its own as a hands-free internal and external vibrator.',
      },
      WATER_LUBE_FAQ,
    ],
  },
  'vush-gloss-bullet-vibrator': {
    summary:
      'A compact bullet vibrator from VUSH: small, focused and easy to bring into partnered sex.',
    body: [
      'Bullets are the simplest vibrators and one of the most useful. They fit between bodies during sex, travel easily and give focused stimulation exactly where you put them.',
      'VUSH adds a polished, design-led look to the format. It is an easy first toy and a favorite second one, even for people with large collections.',
    ],
    bestFor: 'Beginners and couples who want a small, versatile vibrator.',
    pros: ['Small enough to use during sex', 'Travel-friendly', 'Approachable price'],
    cons: ['Focused rather than broad vibration'],
    faqs: [WATER_LUBE_FAQ],
  },
  'lovense-lush-2-0-sound-activated-vibrator': {
    summary:
      'Lovense’s wearable, app-controlled egg vibrator, worn internally with a flexible tail and controlled from anywhere through the app.',
    body: [
      'The Lush is one of the best-known long-distance toys. It is worn internally against the G-spot, with a soft tail outside the body, and it connects to the Lovense app so a partner can control it across the room or across the world.',
      'The app also offers patterns and sound-reactive modes. This is the second generation; Lovense has since released newer versions, so compare before you buy.',
    ],
    bestFor: 'Long-distance couples and playful wearable use.',
    pros: ['Remote control from anywhere through the app', 'Hands-free and wearable', 'Well-supported app'],
    cons: ['Older generation of the Lush', 'Depends on a phone and connection'],
    faqs: [
      {
        q: 'Do we both need the app?',
        a: 'For long-distance control, yes. Each partner uses the Lovense app on their own phone.',
      },
      WATER_LUBE_FAQ,
    ],
  },
  'kiiroo-keon-wifi-interactive-masturbator-automatic-rechargeable-stroker': {
    summary:
      'Kiiroo’s Keon automatic stroker: a hands-free machine that moves a sleeve for you and can sync with interactive content.',
    body: [
      'The Keon is one of the best-known automatic strokers. It holds a Kiiroo Feel sleeve and moves it at speeds and lengths you set, or syncs with supported content through Kiiroo’s app.',
      'This listing is the machine alone. If you do not already own a compatible sleeve, look at the combo sets that bundle one.',
    ],
    bestFor: 'Experienced users ready for a hands-free, interactive stroker.',
    pros: ['Hands-free stroking', 'Interactive content support', 'Uses widely available Feel sleeves'],
    cons: ['Sleeve sold separately', 'Large and not discreet', 'Premium price'],
    faqs: [STROKER_LUBE_FAQ],
  },
  'we-vibe-chorus-rechargeable-couples-vibrator-with-squeeze-control': {
    summary:
      'We-Vibe’s premium couples vibrator with a squeeze remote, so intensity responds to how hard you grip.',
    body: [
      'Like the Sync, the Chorus is worn during sex, with one end inside and one on the clitoris. The difference is the remote: squeeze it harder and the vibration rises, which feels more natural than pressing buttons mid-moment.',
      'It also connects to We-Vibe’s app. Choose the Chorus over the Sync if you value the squeeze control and want We-Vibe’s higher-end model.',
    ],
    bestFor: 'Couples who want the most intuitive controls in a wearable vibrator.',
    pros: ['Squeeze remote is easy to use mid-sex', 'Wearable during penetration', 'App support'],
    cons: ['Premium price', 'Fit takes some adjusting'],
    faqs: [WATER_LUBE_FAQ],
  },

  // Category leaders
  'lelo-sona-originals-sonic-clitoral-massager-with-sensonic-technology-app-control': {
    summary:
      'An app-controlled LELO SONA clitoral massager that uses sonic waves rather than air pulse, at an approachable price for the brand.',
    body: [
      'The SONA range is LELO’s alternative to air-pulse toys. Instead of pulsing air, it uses sonic waves through a soft silicone mouth, which many people describe as deeper and more spread out.',
      'This Originals version adds app control and brings the SONA idea to one of the lowest prices in LELO’s range. It is a good way to compare sonic and air-pulse stimulation without a large outlay.',
    ],
    bestFor: 'Anyone curious about sonic stimulation, or comparing it with Womanizer.',
    pros: ['Sonic waves instead of air pulse', 'App control', 'Affordable for LELO'],
    cons: ['Fewer premium touches than the flagship SONA models'],
    faqs: [
      {
        q: 'Is sonic the same as suction?',
        a: 'No. Both are contact-free over the clitoris, but sonic toys use sound-wave vibration while air-pulse toys use pressure waves. The feel is different, and preference is personal.',
      },
      WATER_LUBE_FAQ,
    ],
  },
  'lelo-sona-3-clitoral-stimulator': {
    summary:
      'The third generation of LELO’s SONA, the sonic-wave clitoral massager that competes directly with Womanizer.',
    body: [
      'SONA uses sonic waves through a soft silicone mouth to stimulate the whole clitoris without direct contact. The SONA 3 is the current mainline version, with LELO’s premium finish.',
      'Choose it if you have tried air pulse and want something deeper and less pointed, or if you prefer LELO’s design and feel. A water-based lube around the mouth helps it seal.',
    ],
    bestFor: 'People who want a premium, contact-free clitoral toy with a deeper feel.',
    pros: ['Sonic waves for a deeper, more diffuse sensation', 'LELO silicone and finish', 'Rechargeable'],
    cons: ['Premium price', 'Some people prefer the sharper feel of air pulse'],
    faqs: [WATER_LUBE_FAQ],
  },
  'arcwave-ion-2-rechargeable-pleasure-air-stroker-male-masturbator': {
    summary:
      'A Pleasure Air stroker from Arcwave, the men’s brand from the group behind Womanizer, bringing air-pulse technology to male toys.',
    body: [
      'Most strokers rely on texture and grip. The Ion uses Pleasure Air, the same pressure-wave idea Womanizer made famous, focused on the sensitive area just below the head of the penis.',
      'It feels unlike a conventional stroker, so it suits someone curious about new sensations rather than someone who wants a realistic sleeve.',
    ],
    bestFor: 'Men who want a genuinely different sensation from a standard stroker.',
    pros: ['Air-pulse technology in a male toy', 'Rechargeable', 'From an established toy group'],
    cons: ['Premium price', 'Different from a realistic stroker, which not everyone wants'],
    faqs: [STROKER_LUBE_FAQ],
  },
  'arcwave-ghost-pocket-stroker': {
    summary:
      'A compact, manual pocket stroker from Arcwave, the men’s brand in the same group as Womanizer and We-Vibe.',
    body: [
      'Arcwave brings a cleaner, design-led approach to men’s toys. The Ghost is its simplest product: a small, manual stroker that is easy to store, travel with and clean.',
      'At its price it is a low-risk first stroker or a travel companion to a larger toy. Use plenty of water-based lube and dry it fully after rinsing.',
    ],
    bestFor: 'A first stroker or a discreet travel option.',
    pros: ['Compact and discreet', 'Low price from a respected brand', 'Easy to clean'],
    cons: ['Manual only', 'Less intense than larger or powered strokers'],
    faqs: [STROKER_LUBE_FAQ],
  },
  'lovense-lush-3-0-vibrator': {
    summary:
      'The third-generation Lovense Lush: a wearable egg vibrator with a flexible tail, controlled through the Lovense app from anywhere.',
    body: [
      'The Lush is worn internally against the G-spot with its tail outside the body. Through the Lovense app, a partner can control it from the next room or another country, and you can run patterns or let it react to music.',
      'It is the most familiar long-distance toy for a reason: the app is mature and the format is simple. Make sure both of your phones support the app.',
    ],
    bestFor: 'Long-distance couples and anyone who wants a wearable, app-controlled toy.',
    pros: ['Control from anywhere', 'Mature, well-supported app', 'Hands-free wear'],
    cons: ['Internal wear is not for everyone', 'Relies on a phone and connection'],
    faqs: [
      {
        q: 'How is the Lush 3 different from the Lush 2?',
        a: 'It is the newer generation of the same idea. Compare the current listings for details, as both are sometimes available.',
      },
      WATER_LUBE_FAQ,
    ],
  },
  'magic-wand-original': {
    summary:
      'The classic corded wand massager that started the category, still sold as the Magic Wand Original.',
    body: [
      'For decades this was the wand most people meant when they said “wand.” It plugs into the wall, has a large rounded head and gives deep, strong vibration that never fades as a battery drains.',
      'It is simple, with only a couple of settings and no app, and that is the appeal. Never use it in or near water, and consider a cordless model if the cord will bother you.',
    ],
    bestFor: 'Anyone who wants proven, reliable wand power for home use.',
    pros: ['Strong, deep vibration', 'Never needs charging', 'A long track record'],
    cons: ['Corded, so not for the shower or travel', 'Fewer settings than modern wands', 'Large and heavy'],
    faqs: [
      {
        q: 'Is it the same as the old Hitachi Magic Wand?',
        a: 'Yes. The design is the same wand that was long sold under the Hitachi name before it was renamed the Magic Wand Original.',
      },
    ],
  },
  'magic-wand-rechargeable': {
    summary:
      'The cordless version of the classic Magic Wand, with the familiar head and deep vibration and no cord.',
    body: [
      'The rechargeable model keeps the shape and character of the corded original and adds freedom of movement. It is the Magic Wand to choose if you like the classic feel but want to use it away from a wall socket.',
      'It is still a large wand, so it is better suited to home than to travel. For something smaller, the Magic Wand Mini and Micro are in the same family.',
    ],
    bestFor: 'Magic Wand fans who want to go cordless.',
    pros: ['Classic wand feel without the cord', 'Deep, strong vibration', 'Trusted brand'],
    cons: ['Large and heavy', 'Costs more than the corded Original'],
    faqs: [
      {
        q: 'Should I choose this or the Original?',
        a: 'Choose the Original for the lowest price and unlimited run time. Choose the Rechargeable if a cord would get in the way.',
      },
    ],
  },
  'le-wand-classique-rechargeable-wand-massager-cordless-original-vibrating-massager': {
    summary:
      'Le Wand’s original full-size cordless wand, now called the Classique, with a silicone head and deep, rumbly vibration.',
    body: [
      'Le Wand made its reputation with this wand. It is cordless and rechargeable, with a soft silicone head and the low, rumbly vibration that many people prefer to buzzy motors.',
      'Le Wand also sells weighted and textured attachments for its wands, which adds versatility over time. Check the listing to confirm which attachments fit this size.',
    ],
    bestFor: 'People who want a premium cordless wand with room to add attachments.',
    pros: ['Cordless and rechargeable', 'Silicone head', 'Deep, rumbly vibration', 'Attachment range'],
    cons: ['Full size takes some storage space', 'Costs more than a corded wand'],
    faqs: [WATER_LUBE_FAQ],
  },

  // Lubricants
  'sliquid-naturals-h2o-intimate-lubricant': {
    summary:
      'Sliquid’s classic water-based lube, from a brand known for short ingredient lists without glycerin or parabens.',
    body: [
      'Sliquid built its range around formulas that skip ingredients many people prefer to avoid. H2O is its everyday water-based lube: unflavored, unscented and safe with silicone toys and condoms.',
      'It suits sensitive skin and makes a good default bottle for the nightstand. Like any water-based lube, it may need reapplying during long sessions.',
    ],
    bestFor: 'An everyday lube for sensitive skin and silicone toys.',
    pros: ['Safe with every toy material and condom', 'No glycerin or parabens', 'Rinses off easily'],
    cons: ['Needs reapplying more often than silicone lube'],
    faqs: [
      {
        q: 'Is it safe with silicone toys?',
        a: 'Yes. Water-based lube is the safe choice with silicone toys.',
      },
    ],
  },
  'pjur-aqua': {
    summary:
      'pjur’s water-based lube: a simple, toy-safe and condom-safe formula from the German lube specialist.',
    body: [
      'pjur makes lube and little else, and Aqua is its water-based option. It is the kind of bottle you can use with anything you own, from silicone vibrators to stroker sleeves and condoms.',
      'Keep it as your default, and add a silicone lube for the shower or for toy-free sex if you like a longer glide.',
    ],
    bestFor: 'A reliable all-purpose lube for toys and condoms.',
    pros: ['Toy-safe and condom-safe', 'From a lube specialist', 'Easy cleanup'],
    cons: ['Shorter-lasting than silicone lube'],
    faqs: [
      {
        q: 'Can I use it with a stroker?',
        a: 'Yes. Water-based lube is the right match for stroker sleeves.',
      },
    ],
  },
  'uber-lube': {
    summary:
      'A silicone lube with a silky, long-lasting glide, popular for sex without toys, massage and use in the shower.',
    body: [
      'Silicone lube stays slippery much longer than water-based formulas and does not rinse off in water. Uberlube is one of the best-known premium options, with a light, silky feel.',
      'It is safe with latex condoms. Do not use it with silicone toys unless the maker says it is fine, because silicone lube can leave silicone surfaces tacky over time. Wash it off with soap and water.',
    ],
    bestFor: 'Long sessions, shower sex and massage without toys.',
    pros: ['Very long-lasting', 'Works in water', 'Safe with latex condoms'],
    cons: ['Not for most silicone toys', 'Needs soap to wash off'],
    faqs: [
      {
        q: 'Can I use it with my vibrator?',
        a: 'Only if the vibrator is not silicone, or the maker says silicone lube is fine. For silicone toys, use a water-based lube.',
      },
    ],
  },
}
