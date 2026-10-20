import type { ProductCopy } from '@/types/catalog'

/**
 * Second batch of researched copy and FAQs for featured-brand products
 * (Lovense, LELO, We-Vibe, Womanizer). Specs come from each maker's own
 * product page, so recheck them when a model is updated. Original wording
 * only; never paste manufacturer descriptions.
 */

const WATER_LUBE = {
  q: 'What lube should I use with it?',
  a: 'A water-based lube. It is safe with silicone, keeps things comfortable and rinses off easily. Silicone lube can leave silicone toys tacky over time, so save it for sex without toys.',
}

export const BRAND_PRODUCT_COPY_2: Record<string, ProductCopy> = {
  // ---------------------------------------------------------------------------
  // Lovense
  // ---------------------------------------------------------------------------
  'lovense-max-2': {
    summary:
      'An app-controlled Lovense stroker that squeezes and vibrates while you stroke, and can control, or be controlled by, other Lovense toys from anywhere.',
    body: [
      'Max 2 is a manual stroker with a twist: the sleeve contracts around you and vibrates as you move, and you can adjust everything from the buttons or the Lovense Remote app. It has a battery life of 95 to 215 minutes depending on intensity.',
      'It is also a master controller, so it can drive other Lovense toys, and another master toy can drive it. That makes it a popular pick for long-distance couples as well as solo use.',
    ],
    bestFor: 'People who want an interactive, app-connected stroker that works for solo or long-distance play.',
    pros: [
      'Contraction and vibration in one toy',
      'Works as a master controller for other Lovense toys',
      'Lovense lists a loudest setting of about 52 dB, similar to a quiet office',
    ],
    cons: ['At 750 g it is a heavier toy', 'Needs the app for the full feature set'],
    faqs: [
      {
        q: 'How loud is the Max 2?',
        a: 'Lovense says its loudest setting reaches about 52 dB, roughly as loud as a quiet office. Lower settings are quieter. If privacy matters, a bit of background music or a closed door is usually plenty.',
      },
      {
        q: 'How long does the battery last, and how long does it take to charge?',
        a: 'Lovense lists a battery life of 95 to 215 minutes, depending on intensity, and about 100 minutes to charge. Standby time is up to 120 hours, so it holds a charge well between sessions.',
      },
      {
        q: 'How do I clean it?',
        a: 'Lovense recommends its toy cleaner, and says warm water and soap also work. The sleeve is TPE, so dry it fully before storing it. Water-based lube is the right choice, and Lovense sells its own.',
      },
      {
        q: 'Can it be used for long-distance play?',
        a: 'Yes. Lovense says all of its toys can be controlled remotely from anywhere through the Lovense Remote app, and Max 2 is also a master controller, so it can control other Lovense toys or be controlled by one such as Nora.',
      },
      {
        q: 'What is in the box?',
        a: 'Lovense lists the Max 2, a USB charging cable, a user manual, a storage bag and the packaging. Lube is sold separately, so pick up a water-based one if you do not have it. The warranty is one year.',
      },
    ],
  },
  'lovense-edge-2-flexible-prostate-massager-black': {
    summary:
      'An adjustable, app-controlled prostate massager with two motors, so you can tune internal and external stimulation separately, alone or with a partner in control.',
    body: [
      'Edge 2 has a flexible neck that lets you change the angle of the insertable arm to fit your body, plus one motor for the prostate and another for the perineum. You can control the two separately in the Lovense Remote app.',
      'Lovense says it is designed to stay in place once inserted, which makes hands-free play possible. It is made from body-safe silicone and is IPX7 waterproof.',
    ],
    bestFor: 'People who want an adjustable, app-controlled prostate toy that a partner can control too.',
    pros: ['Adjustable angle for a better fit', 'Two motors you can control separately', 'IPX7 waterproof silicone'],
    cons: ['Prostate play takes patience and plenty of lube', 'Bluetooth can be unreliable under water'],
    faqs: [
      {
        q: 'Is the Edge 2 suitable for beginners?',
        a: 'Lovense says it can be. Start slowly with plenty of water-based lube, begin on low settings and adjust the angle gradually until it feels comfortable. Our prostate massage guide covers the basics for a first time.',
      },
      {
        q: 'Can my partner control it?',
        a: 'Yes. Lovense says a partner can control Edge 2 through the Lovense Remote app whether they are nearby or far away. It works for foreplay, long-distance intimacy or giving a partner control during sex.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Lovense lists it as IPX7 waterproof, so you can use it in the bath or shower. Bluetooth may not be stable in or under water, and it should be off while charging. Dry it thoroughly before storing it.',
      },
      {
        q: 'How long does it last on a charge?',
        a: 'Lovense lists a battery life of 65 to 130 minutes depending on the vibration level, about 100 minutes to charge with the magnetic cable, and standby time of up to 120 hours.',
      },
      {
        q: 'What lube should I use?',
        a: 'Lovense recommends a high-quality water-based lube, which also avoids frequent re-application. Anal play needs more lubrication than you might expect, so use plenty and reapply as needed.',
      },
    ],
  },
  'lovense-ferri-panty-vibe-pink': {
    summary:
      'A tiny, magnetic panty vibrator you control from your phone or a partner’s, for discreet play that stays in place and fits in the palm of your hand.',
    body: [
      'Ferri clips into your underwear with a magnet and weighs only 35 g, so it is easy to wear around the house or out. It has seven built-in patterns and three intensity levels, with unlimited patterns in the Lovense Remote app.',
      'Lovense lists it as IPX7 waterproof with up to 195 minutes of battery life, and it charges in about an hour with a magnetic cable. Try it at home first to get comfortable with how it feels and sounds.',
    ],
    bestFor: 'People who want discreet, hands-free play and a partner who can control it remotely.',
    pros: ['Magnet keeps it in place', 'Light at 35 g', 'IPX7 waterproof with a one-hour charge'],
    cons: ['Not meant for insertion', 'Needs the app for remote and custom patterns'],
    faqs: [
      {
        q: 'How does it stay in place?',
        a: 'Ferri uses a magnet. You place the vibrator against your body inside your underwear and snap the magnet on the outside. A snug pair of underwear helps, and trying it at home first shows you how it sits.',
      },
      {
        q: 'How long does the battery last?',
        a: 'Lovense lists a battery life of 195 minutes, about an hour to charge and 100 hours of standby. Charge it before an outing so the surprise is not cut short.',
      },
      {
        q: 'Can a partner control it from far away?',
        a: 'Yes. Ferri works with the Lovense Remote app, so a partner can control it nearby or across the world. Agree on what is okay in advance so the surprise feels fun for both of you.',
      },
      {
        q: 'Is it waterproof, and how many settings does it have?',
        a: 'Lovense lists IPX7 waterproofing, seven built-in patterns and three intensity levels, with unlimited patterns through the app. It is easy to clean with warm water and mild soap.',
      },
      {
        q: 'What is in the box?',
        a: 'Lovense lists the panty vibrator, a USB charging cable and a user manual. It comes with a one-year warranty.',
      },
    ],
  },
  'lovense-gush-2-oscillating-masturbator': {
    summary:
      'A hands-free, oscillating Lovense massager that targets the head of the penis, with an adjustable band and an IPX7 waterproof silicone body.',
    body: [
      'Gush 2 is a hands-free glans massager that uses vibration and oscillation, and an adjustable band holds it in place. Lovense designed it to stimulate the frenulum, and where you position it depends on what feels best.',
      'Lovense also sells Gush 2 Motion, which adds a motion sensor so your stroke speed can control other connected Lovense toys, with the same fit, motor and battery. Both are rechargeable with a magnetic cable.',
    ],
    bestFor: 'People who want hands-free, targeted stimulation they can control from an app.',
    pros: ['Hands-free with an adjustable band', 'Food-grade silicone and IPX7 waterproof', 'Charges in about 75 minutes'],
    cons: ['Targets the head rather than the whole length', 'Fit depends on your size and the band'],
    faqs: [
      {
        q: 'What sizes does the band fit?',
        a: 'Lovense lists a penis diameter of about 1.1 to 2.05 inches (28 to 52 mm) and a girth of about 3.5 to 6.5 inches (89 to 165 mm), depending on which band hole you use. If you are close to the limits, check the fit before ordering.',
      },
      {
        q: 'How long does the battery last?',
        a: 'Lovense lists a battery life of 70 to 110 minutes, depending on the level, about 75 minutes to charge, and standby time of up to 120 hours. Turn it off before charging with the magnetic cable.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Lovense lists it as IPX7 waterproof, so you can rinse it and use it in the bath or shower. It is made from food-grade silicone and has a one-year warranty.',
      },
      {
        q: 'What lube is safe with it?',
        a: 'Water-based lube. Lovense says water-based lubes are safe for silicone toys and easy to clean, and recommends its own for the smoothest feel. Avoid silicone lube with silicone toys.',
      },
      {
        q: 'What is the difference between Gush 2 and Gush 2 Motion?',
        a: 'Lovense says Gush 2 Motion adds a built-in motion sensor, so your stroke speed can control any connected Lovense toy. It keeps the same fit, motor and battery as Gush 2, so the shared specs are identical.',
      },
    ],
  },
  'lovense-domi-2-rechargeable-wand-massager': {
    summary:
      'A compact, app-controlled wand with dual-rotating heads for deep, rumbly vibration, up to 6 hours of use and a small size that is easy to hold and hide.',
    body: [
      'Domi 2 is a mini wand from Lovense with dual-rotating head technology, designed for strong vibrations you can adjust from featherlight to very intense. It is smaller than most wands, so it is comfortable to grip and easy to store.',
      'Lovense says it takes about 2.5 hours to charge and gives up to 6 hours of continuous use. You can control it from the Lovense Remote app, including from a partner’s phone, and attachments are available for different kinds of play.',
    ],
    bestFor: 'People who want wand-style power in a small, app-connected, long-lasting toy.',
    pros: ['Up to 6 hours of use', 'Compact, easy-to-hold size', 'Lovense Remote app for solo or partner control'],
    cons: ['IPX6 is water resistant, not fully submersible', 'Takes about 2.5 hours to charge'],
    faqs: [
      {
        q: 'Is the Domi 2 suitable for beginners?',
        a: 'Lovense says it suits both beginners and experienced users. The vibration goes from very gentle to very strong, so you can start low and build up. A wand is usually used externally, which many people find the most comfortable place to begin.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Lovense lists it as IPX6 water-resistant, meaning it can handle heavy sprays of water. That is not the same as being submersible, so rinse it rather than dunking it, and dry it fully before storing it.',
      },
      {
        q: 'How long does the battery last?',
        a: 'Lovense says it takes about 2.5 hours to charge and offers up to 6 hours of continuous use, depending on the intensity. That is a long runtime for a wand this small.',
      },
      {
        q: 'How do I control it?',
        a: 'Through the Lovense Remote app, available for iPhone, iPad, Android, Mac and Windows with a Lovense USB Bluetooth Adapter. The app offers local and long-distance control, custom patterns and music sync.',
      },
      {
        q: 'How do I clean it?',
        a: 'Lovense says to use warm water and mild soap or its toy cleaner, then make sure it is completely dry before storing it in a cool, dry place. Use a water-based lube if you use it with attachments.',
      },
    ],
  },
  'lovense-osci-3-rechargeable-silicone-g-spot-vibrator-with-clitoral-stimulator': {
    summary:
      'A Lovense rabbit-style vibrator with a thumping action for the G-spot and clitoris, controlled by buttons on the handle or the Lovense Remote app.',
    body: [
      'Osci 3 pairs an internal arm with an external clitoral stimulator, and you play with the vibrations through the handle buttons or the app. It is made from silicone and weighs 185 g.',
      'Lovense lists it as IPX7 waterproof, with about 75 minutes to charge using a magnetic cable and up to 120 hours of standby. The app opens up unlimited patterns, partner control and long-distance play.',
    ],
    bestFor: 'People who enjoy blended internal and external stimulation and want app features.',
    pros: ['Controls on the handle or in the app', 'IPX7 waterproof silicone', 'Quick 75-minute charge'],
    cons: ['A fuller shape than a simple external vibrator', 'Bluetooth may be unstable in water'],
    faqs: [
      {
        q: 'Do I need the app to use Osci 3?',
        a: 'No. Lovense says you can play with the vibrations through the buttons on the handle or the Lovense Remote app. The app adds custom patterns, partner control and long-distance play, but it is optional.',
      },
      {
        q: 'Can I use it in the shower or bath?',
        a: 'Lovense lists it as IPX7 waterproof, so you can use it while bathing or showering. Bluetooth connectivity may not be stable in or under water, so use the handle buttons there, and turn it off before charging.',
      },
      {
        q: 'How long does it take to charge?',
        a: 'Lovense says about 75 minutes with the magnetic charging cable, which plugs into any USB port or USB adapter. Standby time is up to 120 hours.',
      },
      {
        q: 'How do I clean it?',
        a: 'Lovense says warm water and soap work, and recommends drying it thoroughly before storing it. It also sells a dedicated toy cleaner for silicone, rubber and TPE toys.',
      },
      WATER_LUBE,
    ],
  },

  // ---------------------------------------------------------------------------
  // LELO
  // ---------------------------------------------------------------------------
  'lelo-ina-3-rechargeable-dual-stimulator': {
    summary:
      'LELO’s rabbit vibrator with ten modes, a longer battery and a bigger arm that tilts toward the G-spot while a smaller arm vibrates against the clitoris.',
    body: [
      'INA 3 is a classic rabbit shape: a larger arm for the G-spot and a smaller arm for the clitoris, both vibrating. LELO says it has 30 percent more power than before and a longer-lasting charge.',
      'It has ten vibration modes, a silky silicone finish and full waterproofing. A rabbit suits you if you already enjoy internal play and want both kinds of sensation at once.',
    ],
    bestFor: 'People who enjoy dual stimulation and want a premium, well-finished rabbit.',
    pros: ['Ten vibration modes', 'Fully waterproof', '30 percent more power than the previous model, per LELO'],
    cons: ['Higher price than basic rabbit vibrators', 'Fit varies from body to body'],
    faqs: [
      {
        q: 'How big is INA 3?',
        a: 'LELO lists it at 200 x 65 x 45 mm (about 7.9 x 2.5 x 1.7 in), with an insertable length of 110 mm (about 4.3 in). The shaft is curved so it can press toward the G-spot.',
      },
      {
        q: 'Is INA 3 waterproof?',
        a: 'LELO lists it as 100 percent waterproof, so you can use it in the bath or shower and rinse it clean. Dry the charging port before you plug it in. It switches off automatically after 20 minutes.',
      },
      {
        q: 'How many settings does it have?',
        a: 'LELO lists ten vibrating modes at different intensities, from a teasing murmur to a satisfying pulse. Start on the lowest and move up at your own pace.',
      },
      {
        q: 'What is the warranty?',
        a: 'LELO’s 2-year warranty covers you for a free replacement within the first year of purchase, and a 10-year guarantee applies after that. Keep your receipt and fill in the warranty card.',
      },
      WATER_LUBE,
    ],
  },
  'lelo-tor-3-vibrating-cockring': {
    summary:
      'An app-connected LELO vibrating ring that adds vibration for your partner and a snug hold for you, with eight vibration patterns.',
    body: [
      'TOR 3 is a silicone ring with a thicker vibrating area that sits against your partner’s body during penetration. LELO says the vibrations enhance enjoyment for both partners.',
      'It has eight vibration patterns, connects to the LELO app for extra customization and is fully waterproof. It is small and light, and made from soft silicone.',
    ],
    bestFor: 'Couples who want a simple, shared upgrade that is easy to use.',
    pros: ['Eight vibration patterns', 'LELO app for extra control', 'Fully waterproof silicone'],
    cons: ['The vibrating area needs to face up to reach your partner', 'The battery is small, so charge it before use'],
    faqs: [
      {
        q: 'How do I wear it?',
        a: 'LELO says to position it so the thicker, vibrating area faces up, touching your partner’s body during penetration, and to add water-based lube to smooth the way. Slide it on gently and stop if it feels uncomfortable.',
      },
      {
        q: 'Do I need the app?',
        a: 'No. It has eight vibration patterns on the toy. The LELO app lets you pair it for extra vibrating sensations and customization, but it is optional.',
      },
      {
        q: 'Is it waterproof?',
        a: 'LELO lists it as 100 percent waterproof, so you can use it in the bath or shower and rinse it afterward. Charge it with the included USB cord once it is dry.',
      },
      {
        q: 'How big is it?',
        a: 'LELO lists it at 46.7 x 22.2 x 60 mm (about 1.84 x 0.87 x 2.36 in), with an internal diameter of about 29 mm (1.1 in). It is made from soft silicone, so check the internal diameter against your size before you order.',
      },
      WATER_LUBE,
    ],
  },
  'lelo-elise-2': {
    summary:
      'A large LELO vibrator with two powerful motors, one in the base and one in the tip, for deep, body-shaking sensation inside and out.',
    body: [
      'ELISE 2 is long, sleek and thick, with motors in the base and the tip so the clitoris and G-spot both get strong vibration. LELO says it is for people who want a more substantial presence and maximum power.',
      'It is fully waterproof, charges with a USB cord and shuts off automatically after 20 minutes. Take your time, start on a low setting and increase the power as you like.',
    ],
    bestFor: 'People who like a fuller feel and strong vibration, and already know they enjoy internal play.',
    pros: ['Two motors for strong sensation', 'Long, sleek design', 'Fully waterproof'],
    cons: ['Large, so it is not a first toy for everyone', 'Premium price'],
    faqs: [
      {
        q: 'Is ELISE 2 too big for a beginner?',
        a: 'It is one of LELO’s larger designs, at about 220 x 42 x 36 mm (8.7 x 1.7 x 1.4 in). If you are new to internal play, a smaller vibrator is a gentler start. Plenty of water-based lube and a low setting help if you do try it.',
      },
      {
        q: 'How do the two motors work?',
        a: 'LELO says there are powerful motors in the base and the tip, giving surging sensations to the clitoris and G-spot. You change the power and modes with button presses and can use it externally or internally.',
      },
      {
        q: 'Is it waterproof?',
        a: 'LELO lists it as 100 percent waterproof, so it works in the bath or shower and rinses clean. Dry the charging port before charging. The toy turns off automatically after 20 minutes.',
      },
      WATER_LUBE,
    ],
  },
  'lelo-sila-cruise-rechargeable-sonic-clitoral-stimulator': {
    summary:
      'A LELO sonic clitoral massager with a wide mouth, eight settings and Cruise Control, for gentle stimulation that does not need direct contact.',
    body: [
      'SILA Cruise uses sonic waves to stimulate the clitoris without direct contact, and its wide mouth spreads the sensation across the whole area rather than a single point. Many people find that more comfortable than direct vibration.',
      'Cruise Control keeps the pulsations steady, so pressing it harder against your body adds extra power. It has eight settings, is fully waterproof and is made from soft, body-safe silicone.',
    ],
    bestFor: 'People who prefer indirect, even stimulation over direct vibration.',
    pros: ['Wide mouth spreads sensation', 'Cruise Control keeps intensity steady', 'Fully waterproof'],
    cons: ['Sonic sensation feels different from a vibrator', 'Needs a good seal to feel its best'],
    faqs: [
      {
        q: 'How does it feel compared with a regular vibrator?',
        a: 'LELO says SILA Cruise uses sonic waves for gentle stimulation without direct contact. Many people describe that as softer and more spread out than a buzzing vibrator. A little water-based lube around the mouth helps it feel smooth.',
      },
      {
        q: 'What is Cruise Control?',
        a: 'LELO’s patented Cruise Control keeps the pulsations constant during use, so when it is pressed against the body it delivers extra power instead of fading. You can press lightly for a gentle feel.',
      },
      {
        q: 'How many settings does it have?',
        a: 'LELO lists eight vibration settings. Press the plus button to turn it on, start low and cycle through the settings to find what feels best. It shuts off automatically after 20 minutes.',
      },
      {
        q: 'Is it waterproof?',
        a: 'LELO lists it as 100 percent waterproof and made from body-safe silicone and ABS plastic. Rinse it after use and dry the charging port before you plug it in.',
      },
      WATER_LUBE,
    ],
  },

  // ---------------------------------------------------------------------------
  // We-Vibe
  // ---------------------------------------------------------------------------
  'we-vibe-vector-rechargeable-silicone-vibrating-prostate-massager-with-remote-control-1': {
    summary:
      'An adjustable We-Vibe prostate massager that vibrates the prostate and perineum at the same time, with an app and a remote for solo or shared play.',
    body: [
      'Vector has an internal arm with a tapered tip and a slim neck, and a flexible external arm that rests against the perineum. We-Vibe says the internal arm is adjustable to fit your body.',
      'It pairs with the We-Vibe app and comes with a remote, so a partner can control it across the room or across a continent. A magnetic charging cable keeps it simple to power up.',
    ],
    bestFor: 'People who want an adjustable prostate massager and the option to share control.',
    pros: ['Adjustable internal arm', 'Prostate and perineum stimulated together', 'App and remote control'],
    cons: ['Anal play takes patience and plenty of lube', 'More shape to adjust than a simple plug'],
    faqs: [
      {
        q: 'Is Vector good for a first prostate toy?',
        a: 'It can be. The tapered tip and slim neck are designed for comfort, and the arm adjusts to fit. Go slowly, use plenty of water-based lube, start on a low setting and relax. Our prostate massage guide has tips for first-timers.',
      },
      {
        q: 'Can I wear it during sex?',
        a: 'Yes. We-Vibe lists Vector as a toy that can be worn during sex, with the external arm positioned against the body. Pair it with the remote or app so a partner can join in.',
      },
      {
        q: 'How is it controlled?',
        a: 'We-Vibe says you can play together with the We-Vibe app, across a room or a continent, or use the remote control provided. That gives you both solo and shared options.',
      },
      {
        q: 'What is in the box?',
        a: 'We-Vibe lists a magnetic USB charging cable, a remote and a sample of We-Vibe Lube made by pjur, along with a case for discreet storage and travel. The toy has a two-year warranty.',
      },
      WATER_LUBE,
    ],
  },
  'we-vibe-pivot-2-rechargeable-silicone-vibrating-cock-ring': {
    summary:
      'A stretchy, waterproof We-Vibe ring that vibrates against both partners, with app control and a design made to fit between two bodies.',
    body: [
      'Pivot 2 is a soft silicone ring that stimulates the penis and clitoris with rumbly vibrations, so it adds to partnered sex for both of you. Its stretchy design fits comfortably between two bodies.',
      'Use the button on the ring to change modes and intensity, or the We-Vibe app for more options and for sending vibrations to a partner. It is IPX7 waterproof and charges with a USB cable.',
    ],
    bestFor: 'Couples who want a simple, shared vibrator that does not need to be held.',
    pros: ['Stimulates both partners', 'IPX7 waterproof', 'App control for extra options'],
    cons: ['USB charging adapter not included', 'Fit depends on how stretchy you want a ring to feel'],
    faqs: [
      {
        q: 'How do we use it?',
        a: 'We-Vibe says to slip the stretchy ring onto the penis and position it so it stimulates both the penis and the clitoris during partnered play. Use the We-Vibe button to turn it on and change the intensity and modes.',
      },
      {
        q: 'Does the ring need the app?',
        a: 'No. The button on the ring controls the intensity and modes. The We-Vibe app adds more individual options and lets you send vibrations to a partner, which is a nice bonus.',
      },
      {
        q: 'Is it waterproof?',
        a: 'We-Vibe lists it as IPX7 waterproof, so you can use it in the bath or shower and it is simple to clean. It is made from body-safe silicone without phthalates, BPA or latex.',
      },
      {
        q: 'What does it come with?',
        a: 'We-Vibe lists a USB charging cable, but says the USB power adapter is not included. Any standard USB port or adapter works. It carries a two-year warranty.',
      },
      WATER_LUBE,
    ],
  },
  'we-vibe-sync-go-app-control-rechargeable-silicone-couples-vibrator': {
    summary:
      'A travel-friendly We-Vibe C-shape couples vibrator that comes with its own case, so shared vibrations can go wherever you do.',
    body: [
      'Sync Go is a rechargeable silicone C-shape vibrator you wear during penetration, so you both feel the vibrations without holding anything. It comes with a sleek, durable travel case that protects it in a bag.',
      'Cycle through modes and intensities with the button on the toy or the We-Vibe app, and use the remote if you have one. It is IPX7 waterproof and easy to clean.',
    ],
    bestFor: 'Couples who travel or want a compact, discreet wearable.',
    pros: ['Comes with a travel case', 'IPX7 waterproof', 'Button, app and remote control'],
    cons: ['Fit varies from body to body', 'Remote play needs the app or a remote'],
    faqs: [
      {
        q: 'Can we both feel it during sex?',
        a: 'We-Vibe designed Sync Go so couples can experience shared vibrations, hands-free, while wearing it during penetration. How much a partner feels depends on the setting and the fit.',
      },
      {
        q: 'Is it discreet enough to travel with?',
        a: 'It comes with a sleek, durable case that protects the toy and keeps it private. It is also small, at about 77 x 30 x 45 mm, so it takes up little room in a bag.',
      },
      {
        q: 'How is it controlled?',
        a: 'With the single button on the toy, the free We-Vibe app, which works even over long distance, or the remote. You can cycle through vibration patterns and intensity levels with any of them.',
      },
      {
        q: 'Is it waterproof?',
        a: 'We-Vibe lists it as IPX7 waterproof, so you can use it in the bath or shower, and it is easy to clean. It charges by USB, so dry it first.',
      },
      WATER_LUBE,
    ],
  },
  'we-vibe-touch-x-rechargeable-silicone-clitoral-mini-vibrator': {
    summary:
      'A soft, palm-sized We-Vibe vibrator with rumbly, whisper-quiet vibrations, seven modes and a travel lock, for foreplay, massage or solo play.',
    body: [
      'Touch X is a small, plush multi-purpose vibrator that sits in the palm of your hand. We-Vibe describes the vibrations as earthshaking yet whisper-quiet, so it suits shared homes.',
      'It has eight intensity levels and seven modes, up to two hours of play per charge and a travel lock that stops it switching on in a bag. It comes with a silky storage pouch.',
    ],
    bestFor: 'Beginners and anyone who wants a small, quiet, versatile vibrator.',
    pros: ['Whisper quiet, per We-Vibe', 'Travel lock and storage pouch', 'IPX7 waterproof'],
    cons: ['Small, so not as broad as a wand', 'USB power adapter not included'],
    faqs: [
      {
        q: 'Is Touch X really quiet?',
        a: 'We-Vibe describes it as whisper quiet and designed to be discreet. The motor is deep and rumbly rather than buzzy, which tends to sound lower. Try it at home to learn how it sounds on each setting.',
      },
      {
        q: 'How many settings does it have?',
        a: 'We-Vibe lists eight intensity levels and seven vibration modes. Start on the lowest level and move up at your own pace.',
      },
      {
        q: 'How long does the battery last?',
        a: 'We-Vibe lists up to two hours of play on a single charge. It charges with a USB cable, and the travel lock turns off automatically after a recharge.',
      },
      {
        q: 'Is it waterproof?',
        a: 'We-Vibe lists it as IPX7 waterproof, so you can use it in the bath or shower and rinse it clean. It is made from body-safe silicone and ABS, free from phthalates and BPA.',
      },
      {
        q: 'Is it a good first vibrator?',
        a: 'Yes, it is a friendly place to begin. It is small, quiet and easy to control, and it works externally, which many people find the most comfortable way to start. Add a little water-based lube if you like.',
      },
    ],
  },
  'we-vibe-tango-x-rechargeable-clitoral-mini-bullet-vibrator': {
    summary:
      'We-Vibe’s updated waterproof bullet vibrator, with more power, a smoother shape, seven modes and a silicone grip that is easy to hold.',
    body: [
      'Tango X is the next version of the classic We-Vibe bullet, with a tip designed to massage the clitoris and a silicone grip that fits in your palm. We-Vibe lists seven modes and eight intensity levels.',
      'It is whisper quiet, IPX7 waterproof and has a travel lock, with up to two hours of play from a charge. It comes with a storage pouch and a sample of We-Vibe Lube.',
    ],
    bestFor: 'Beginners and travelers who want a small, powerful, quiet bullet.',
    pros: ['Seven modes and eight intensity levels', 'Whisper quiet, per We-Vibe', 'Travel lock and storage pouch'],
    cons: ['Focused tip, so less broad than a wand', 'USB power adapter not included'],
    faqs: [
      {
        q: 'Is Tango X quiet?',
        a: 'We-Vibe describes it as whisper quiet and designed to be discreet, so no one will know what you are up to. As with any toy, test it at home first so you know how it sounds on each level.',
      },
      {
        q: 'What is in the box?',
        a: 'We-Vibe lists the Tango X, a USB charging cable, a silky storage pouch and a sample of We-Vibe Lube made by pjur. The USB power adapter is not included, though any standard one works.',
      },
      {
        q: 'How long does it last on a charge?',
        a: 'We-Vibe lists up to two hours of play on a single charge. A travel lock keeps it from switching on in a bag and turns off automatically when you recharge it.',
      },
      {
        q: 'Is it waterproof?',
        a: 'We-Vibe lists it as IPX7 waterproof, so you can use it in the bath or shower and rinse it clean. The body is ABS and body-safe silicone, free from phthalates and BPA.',
      },
      {
        q: 'How do I use it?',
        a: 'We-Vibe suggests placing the silicone grip securely in your palm, resting the tip on your clitoris or another erogenous zone and trying different settings and positions until it feels right.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Womanizer
  // ---------------------------------------------------------------------------
  'womanizer-enhance-rechargeable-silicone-clitoral-stimulator': {
    summary:
      'A Womanizer that combines Pleasure Air with We-Vibe’s rumbly vibration in one toy, each with its own motor, so you can mix them any way you like.',
    body: [
      'Enhance is Womanizer’s first clitoral stimulator to combine its Pleasure Air Technology with deep, rumbly vibration. Separate motors mean you can use the air pulse, the vibration or both together.',
      'It has 10 Pleasure Air intensities, 10 vibration intensities and 10 vibration patterns, all individually controllable, which Womanizer says adds up to more than 1,000 ways to play.',
    ],
    bestFor: 'People who like air-pulse stimulation and want to add vibration without a second toy.',
    pros: ['Air pulse and vibration in one toy', 'Separate controls for each', 'Ten levels and ten patterns'],
    cons: ['More options than a simple air-pulse toy', 'Premium price'],
    faqs: [
      {
        q: 'Can I use only the air pulse or only the vibration?',
        a: 'Yes. Womanizer says the vibration motor and the Pleasure Air motor can be controlled separately or together. That makes it easy to start with just one and add the other when you want it.',
      },
      {
        q: 'How many settings does Enhance have?',
        a: 'Womanizer lists 10 Pleasure Air intensities, 10 vibration intensities and 10 vibration patterns, all individually controllable. Start low and build up, because air-pulse sensation can rise quickly.',
      },
      {
        q: 'Is it a good choice if I am new to air-pulse toys?',
        a: 'It is a flexible one, because you can keep the vibration off and explore the air pulse alone first. If you prefer simple controls, a Womanizer without a vibration motor has fewer choices to learn.',
      },
      {
        q: 'What lube helps?',
        a: 'A little water-based lube around the stimulation head helps it seal against the skin and feel smoother. Water-based lube is safe with silicone toys.',
      },
    ],
  },
  'womanizer-starlet-3-rechargeable-silicone-clitoral-stimulator': {
    summary:
      'A compact, affordable Womanizer with Pleasure Air Technology, six intensity levels, IPX7 waterproofing and a 30-minute charge.',
    body: [
      'Starlet 3 brings the original Womanizer idea, touchless clitoral stimulation using gentle air pressure, into a small, lower-priced toy. Womanizer says it has two more intensity levels than the previous version, for six in total.',
      'It charges in about 30 minutes with magnetic pins, is fully waterproof and comes with a five-year warranty. It is a comfortable, low-pressure way to see whether air-pulse stimulation suits you.',
    ],
    bestFor: 'First-time air-pulse buyers who want a compact, simple toy.',
    pros: ['Six intensity levels', 'Charges in about 30 minutes', 'Five-year warranty'],
    cons: ['Fewer settings than flagship models', 'Compact, so less to hold than larger toys'],
    faqs: [
      {
        q: 'Is Starlet 3 a good first Womanizer?',
        a: 'Yes, it is a gentle entry point. It is compact, has six intensity levels and costs less than the flagship models. Start on the lowest level, since air-pulse sensation can build quickly.',
      },
      {
        q: 'How long does it take to charge?',
        a: 'Womanizer lists a charge time of 30 minutes using the magnetic charging cable. The cable is included, but an AC adapter is not.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Womanizer lists it as IPX7 waterproof, so it works in the bath or shower. Dry the charging pins before you recharge it.',
      },
      {
        q: 'How big is it, and what is the warranty?',
        a: 'Womanizer lists 117 x 46 x 47 mm and a five-year warranty. The head is body-safe silicone, and the body is ABS plastic made without phthalates, BPA or latex.',
      },
      {
        q: 'What lube should I use?',
        a: 'A little water-based lube around the head helps it seal and feel smoother. Water-based lube is safe with silicone.',
      },
    ],
  },
  'womanizer-vibe-rechargeable-silicone-clitoral-vibrator': {
    summary:
      'Womanizer’s noiseless vibrator, with UltraWave vibration, ten intensity levels and three Autopilot modes, for quiet, rumbly stimulation you can enjoy at home.',
    body: [
      'Vibe is Womanizer’s take on a clitoral vibrator. It uses UltraWave Vibration, which Womanizer says combines low, rumbly vibration with ten harmonic resonances for a smooth, rich sensation, and an ergonomic shape for broad or targeted pressure.',
      'Womanizer calls it a noiseless vibrator, which is great if you share walls. It has ten intensity levels and three Autopilot modes inspired by musical rhythms, is IPX7 waterproof and comes with a five-year warranty.',
    ],
    bestFor: 'People who want a quiet vibrator with the same quality feel as Womanizer’s air-pulse range.',
    pros: ['Noiseless motor, per Womanizer', 'Ten intensity levels and three Autopilot modes', 'Five-year warranty'],
    cons: ['Premium price for a vibrator', 'Vibration instead of air pulse, so it feels different from other Womanizers'],
    faqs: [
      {
        q: 'Is it actually silent?',
        a: 'Womanizer calls it the world’s first silent clitoral vibrator and says its noiseless motor lets you fully immerse in the experience. No toy is truly silent in every setting, so try it at home to see how it sounds for you.',
      },
      {
        q: 'How is it different from a Womanizer air-pulse toy?',
        a: 'Air-pulse toys stimulate with air pressure and no direct contact. Vibe is a vibrator that uses low, rumbly UltraWave vibration against the skin. If you like direct contact, it is a great fit, and if you want contactless, look at the air-pulse range.',
      },
      {
        q: 'What are the Autopilot modes?',
        a: 'Womanizer says there are three pre-set vibration sequences inspired by musical rhythms, which vary the sensation so each session feels different. You can also choose a steady level from the ten intensities.',
      },
      {
        q: 'How long does it take to charge, and is it waterproof?',
        a: 'Womanizer lists a 90-minute charge using a magnetic USB cable (AC adapter not included) and IPX7 waterproofing, so it works in the bath or shower.',
      },
      {
        q: 'What lube should I use?',
        a: 'Water-based lube. It is safe with silicone and easy to rinse off. Avoid silicone lube on a silicone toy, which can leave it tacky.',
      },
    ],
  },
}
