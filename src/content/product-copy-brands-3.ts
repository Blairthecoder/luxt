import type { ProductCopy } from '@/types/catalog'

/**
 * Third batch of researched copy and FAQs (LELO, Womanizer, We-Vibe, Lovense,
 * TENGA). Specs come from each maker's own product page, so recheck them when a
 * model is updated. Original wording only; never paste manufacturer descriptions.
 */

const WATER_LUBE = {
  q: 'What lube should I use with it?',
  a: 'A water-based lube. It is safe with silicone, keeps things comfortable and rinses off easily. Silicone lube can leave silicone toys tacky over time, so save it for sex without toys.',
}

const TENGA_LUBE = {
  q: 'What lotion or lube is safe to use?',
  a: 'TENGA recommends its own HOLE LOTION, and says other water-based lubes should be compatible with the interior material. Oils and silicone-based lubes can damage it, so avoid them.',
}

const LELO_WARRANTY = {
  q: 'What is the warranty?',
  a: 'LELO covers the toy with a warranty that gives you a free replacement for a problem within the first year, and a 10-year guarantee that follows. Keep your receipt and fill in the warranty card.',
}

export const BRAND_PRODUCT_COPY_3: Record<string, ProductCopy> = {
  // ---------------------------------------------------------------------------
  // LELO
  // ---------------------------------------------------------------------------
  'lelo-lily-3-rechargeable-mini-silicone-vibrator': {
    summary:
      'A tiny, quiet LELO clitoral vibrator with ten patterns, easy to tuck into a drawer or a bag and fully waterproof.',
    body: [
      'LILY 3 is a mini vibrator made for focused clitoral stimulation. It is small and light, and LELO designed it to be travel ready and quiet enough to use almost anywhere.',
      'It has ten vibration patterns that run from a teasing murmur to a satisfying pulse, and it is certified to the IPX7 waterproof standard, so you can rinse it clean under the tap.',
    ],
    bestFor: 'Beginners and travelers who want a small, quiet, simple vibrator.',
    pros: ['Ten vibration patterns', 'IPX7 waterproof and USB rechargeable', 'Small enough to hide or pack'],
    cons: ['External use only, so it is less versatile than a larger toy', 'Not as deep or rumbly as a wand'],
    faqs: [
      {
        q: 'Is the LILY 3 really quiet?',
        a: 'LELO describes it as a silent mini vibrator and designed it to be used almost anywhere. Lower patterns are quieter than higher ones, so try it at home first to hear how it sounds on each level.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Yes. LELO lists it as 100 percent waterproof and certified to the IPX7 standard, so it can go in the bath or shower and be rinsed clean. Dry the charging area before you plug it in.',
      },
      {
        q: 'How big is it?',
        a: 'LELO lists it at about 39 x 34 x 74 mm (1.5 x 1.3 x 2.9 in). It has a soft-touch silicone coating over an ABS body, and it switches itself off after 20 minutes.',
      },
      {
        q: 'Is it a good first vibrator?',
        a: 'It is a friendly place to start. It is small, has ten patterns you can step through slowly and works externally, which many people find the most comfortable way to begin.',
      },
      WATER_LUBE,
    ],
  },
  'lelo-nea-3-rechargeable-mini-silicone-vibrator': {
    summary:
      'A pocket-sized LELO mini vibrator with ten patterns and IPX7 waterproofing, at a friendly price.',
    body: [
      'NEA 3 is LELO’s compact clitoral vibrator for travel and everyday use. It shares the small, discreet body of LILY 3 and offers ten patterns from a teasing murmur to a satisfying pulse.',
      'It is USB rechargeable, fully waterproof and comes with a longer warranty than some of the brand’s minis, so it is a safe, simple first purchase from a premium maker.',
    ],
    bestFor: 'Anyone who wants a small, travel-ready vibrator at an easy price.',
    pros: ['Ten vibration patterns', 'IPX7 waterproof', 'Two-year LELO warranty'],
    cons: ['External use only', 'Small, so less broad than a wand'],
    faqs: [
      {
        q: 'Can I use the NEA 3 in the shower?',
        a: 'Yes. LELO lists it as 100 percent waterproof and certified to IPX7. Rinse it after use, and dry the charging port before you recharge it.',
      },
      {
        q: 'How many settings does it have?',
        a: 'LELO lists ten vibration patterns, varying in intensity from a teasing murmur to a satisfying pulse. Start on the lowest and step up at your own pace.',
      },
      {
        q: 'How big is it, and how does it charge?',
        a: 'LELO lists about 39 x 34 x 74 mm. It charges with the included USB cord and switches off automatically after 20 minutes of use.',
      },
      LELO_WARRANTY,
      WATER_LUBE,
    ],
  },
  'lelo-mia-3-personal-vibrator': {
    summary:
      'A slim LELO lipstick-style vibrator with eight patterns and a travel lock, made to look like nothing special in a bag.',
    body: [
      'MIA 3 is shaped like a lipstick, which makes it one of the most discreet vibrators around. LELO molded the tip to target the clitoris for fast, focused stimulation.',
      'It has eight patterns, a lock for travel and a long-lasting rechargeable battery, and it is fully waterproof, so it is as easy to clean as it is to carry.',
    ],
    bestFor: 'People who want a very discreet, travel-friendly vibrator.',
    pros: ['Lipstick shape is easy to hide', 'Travel lock', 'Fully waterproof'],
    cons: ['Focused tip, not broad coverage', 'External use only'],
    faqs: [
      {
        q: 'Is the MIA 3 discreet?',
        a: 'It is designed to be. The lipstick shape is slim, at about 22 x 22 x 111 mm, and LELO describes it as travel ready and discreet. A lock stops it switching on in a bag.',
      },
      {
        q: 'How many patterns does it have?',
        a: 'LELO lists eight vibration patterns, from a teasing murmur to a satisfying pulse. It switches itself off after 20 minutes.',
      },
      {
        q: 'Is it waterproof and rechargeable?',
        a: 'Yes. LELO lists it as 100 percent waterproof, charging by USB, with a long-lasting charge. The body is ABS and body-safe silicone.',
      },
      LELO_WARRANTY,
      WATER_LUBE,
    ],
  },
  'lelo-liv-3-app-controlled-g-spot-vibrator': {
    summary:
      'A silky LELO vibrator for the G-spot and clitoris with eight patterns and two extra modes you can unlock in the LELO app.',
    body: [
      'LIV 3 is a curved vibrator you can use internally against the G-spot or externally on the clitoris. LELO lists eight vibration patterns on the toy itself.',
      'Connect it to the LELO app and you can unlock two more modes, Finish Me Off and Out Of Control. The app is optional, and the toy is fully waterproof.',
    ],
    bestFor: 'People who want a versatile, app-capable vibrator they can use solo or with a partner.',
    pros: ['Eight patterns, plus two in the app', 'Fully waterproof silicone', 'Comes with a satin pouch'],
    cons: ['Two modes need the app', 'Fit varies from body to body'],
    faqs: [
      {
        q: 'Do I need the app for LIV 3?',
        a: 'No. It has eight patterns on the toy. The LELO app adds two exclusive modes, Finish Me Off and Out Of Control, but you can ignore it completely.',
      },
      {
        q: 'How big is it?',
        a: 'LELO lists about 169 x 35 x 42 mm, with an insertable length of 100 mm (about 3.9 in). It is made from body-safe silicone and ABS plastic.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Yes. LELO lists it as 100 percent waterproof, so it works in the bath or shower. It switches itself off after 20 minutes.',
      },
      {
        q: 'What comes in the box?',
        a: 'LELO lists the toy, a USB charging cord, a satin storage pouch, a warranty card and an instruction manual.',
      },
      WATER_LUBE,
    ],
  },
  'lelo-sona-3-cruise-clitoral-stimulator': {
    summary:
      'LELO’s newest sonic clitoral massager, with Cruise Control, twelve settings and an app for partner play across a distance.',
    body: [
      'SONA 3 Cruise uses LELO’s SenSonic technology, which sends gentle sonic waves for contact-free clitoral stimulation. Cruise Control raises the intensity when you press it against your body, so it feels fuller the closer you get.',
      'It has ten modes plus two more in the LELO app, and a Love Bridge feature lets you connect with a partner when you are apart. SmoothRise is designed to build intensity without sudden jumps.',
    ],
    bestFor: 'People who like indirect, sonic stimulation and want lots of control.',
    pros: ['Twelve settings with the app', 'Cruise Control and SmoothRise', 'Fully waterproof'],
    cons: ['Premium price', 'Some features need the app'],
    faqs: [
      {
        q: 'What is the difference between SONA 3 Cruise and a regular vibrator?',
        a: 'LELO says SenSonic uses gentle sonic waves for contact-free stimulation, rather than direct buzzing. Many people find that softer and more spread out.',
      },
      {
        q: 'What is Cruise Control?',
        a: 'LELO says Cruise Control automatically increases the intensity when the toy is pressed hard against the body, for more controlled stimulation. You can press lightly for a gentler feel.',
      },
      {
        q: 'Is it waterproof, and how long does it last?',
        a: 'LELO lists it as 100 percent waterproof, with up to 2 hours of use per charge and up to 2 hours to charge. It measures about 112 x 51 x 55 mm and weighs 128 g.',
      },
      {
        q: 'What is the Love Bridge?',
        a: 'It is a feature in the LELO app that lets you connect with your partner whenever you are apart. It is optional, and the toy works without it.',
      },
      {
        q: 'What is the warranty?',
        a: 'LELO lists a 2-year warranty, and a 10-year quality guarantee that begins after the 2-year warranty ends. Keep your receipt and fill in the warranty card.',
      },
    ],
  },
  'ida-wave-app-compatible-rechargeable-dual-stimulating-vibrator': {
    summary:
      'An app-connected LELO dual vibrator that rotates inside and vibrates outside, for a fuller feeling alone or with a partner.',
    body: [
      'IDA Wave has two arms: a smaller one that goes inside and a larger one that rests on the clitoris. LELO’s rotating finger-like motion inside is paired with deep vibration on both arms, from two motors working together.',
      'It has ten settings, connects to the LELO app so a partner can join in, and is fully waterproof. LELO lists up to two hours of use per charge.',
    ],
    bestFor: 'Couples and solo players who like blended, wearable-style stimulation.',
    pros: ['Rotating motion plus vibration', 'App control for partner play', 'Fully waterproof'],
    cons: ['More to learn than a simple vibrator', 'The app is needed for partner control'],
    faqs: [
      {
        q: 'Can a partner control it?',
        a: 'Yes, through the LELO app, which pairs with the toy. Use it solo, with a partner nearby or to play across a distance. The toy also works without the app.',
      },
      {
        q: 'How do I use it?',
        a: 'LELO says to apply a water-based moisturizer, insert the smaller arm into the vagina and rest the larger arm on the clitoris. Turn it on and let the excitement build slowly.',
      },
      {
        q: 'How big is it, and is it waterproof?',
        a: 'LELO lists about 63 x 56 x 93 mm and 100 percent waterproofing. It charges by USB in up to 2 hours and switches off after 20 minutes of use.',
      },
      LELO_WARRANTY,
      WATER_LUBE,
    ],
  },
  'mona-2-rechargeable-vibrator': {
    summary:
      'A curved LELO G-spot wand with six modes and a firm, rounded tip, fully waterproof and easy to hold.',
    body: [
      'MONA 2 has curves designed to press against the G-spot, and a tip you can also use on the clitoris as a warm-up. LELO lists six modes controlled by a four-button interface.',
      'It is made from body-safe silicone over ABS plastic, fully waterproof and long-lasting on a charge. It is a straightforward choice if you want internal vibration without extras.',
    ],
    bestFor: 'People who want a simple, powerful G-spot vibrator.',
    pros: ['Six modes with simple buttons', 'Fully waterproof', 'Curved shape for G-spot pressure'],
    cons: ['No app, and fewer modes than some', 'Firmer than very soft toys'],
    faqs: [
      {
        q: 'How big is MONA 2?',
        a: 'LELO lists a diameter of about 34.3 mm (1.35 in) and an insertable length of 110 mm (about 4.3 in).',
      },
      {
        q: 'How do I use it?',
        a: 'Add water-based lube, turn it on and slowly start inserting it. LELO says you can use the tip on your clitoris as a warm-up first.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Yes. LELO lists it as 100 percent waterproof, so it works in the bath or shower and is easy to rinse clean. It switches off after 20 minutes.',
      },
      LELO_WARRANTY,
      WATER_LUBE,
    ],
  },
  'lelo-enigma-suction-dual-stimulator': {
    summary:
      'A LELO dual stimulator that pairs sonic waves on the clitoris with vibration on a flexible G-spot arm.',
    body: [
      'ENIGMA is LELO’s original sonic dual stimulator. Without making direct contact, its SenSonic waves give fast, gentle clitoral stimulation while the flexible internal arm vibrates against the G-spot.',
      'It has eight settings, is fully waterproof and lasts a long time on a charge. If you like blended internal and external sensation, it is a well-finished option.',
    ],
    bestFor: 'People who want sonic stimulation on the clitoris and vibration inside together.',
    pros: ['Sonic waves and G-spot vibration together', 'Eight settings', 'Fully waterproof'],
    cons: ['Not the simplest toy for beginners', 'Premium price'],
    faqs: [
      {
        q: 'How do I start?',
        a: 'LELO says to put water-based moisturizer on the clitoral and vaginal parts, then press the + button to turn it on. Start at the lowest speed and increase as you like.',
      },
      {
        q: 'How big is it?',
        a: 'LELO lists about 100 x 50 x 185 mm, with an insertable length of 140 mm (5.5 in). The internal arm is fully flexible.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Yes. LELO lists it as 100 percent waterproof, with eight settings and an automatic shut-off after 20 minutes.',
      },
      {
        q: 'What is the warranty?',
        a: 'LELO lists a 2-year warranty, and a 10-year quality guarantee that begins after the 2-year warranty ends. Keep your receipt and fill in the warranty card.',
      },
      WATER_LUBE,
    ],
  },
  'lelo-f2s-massager-stroker': {
    summary:
      'An app-connected LELO male stroker with an AI interactive mode, guided stamina and Kegel training, and fifteen settings.',
    body: [
      'F2S is a soft liquid-silicone stroker that begins working when it senses you are inside. It has eight settings on the toy and seven more you can unlock in the LELO app, including guided stamina and Kegel routines.',
      'An AI interactive mode uses a sensor inside the toy to match the intensity to your movement, and silicone ribs inside let air escape so there are no air pockets. It is fully waterproof.',
    ],
    bestFor: 'People who want an app-connected stroker with built-in training features.',
    pros: ['Fifteen settings with the app', 'Stamina trainer and guided Kegel routines', 'Fully waterproof'],
    cons: ['Premium price', 'Training and AI modes need the app'],
    faqs: [
      {
        q: 'What is the stamina trainer?',
        a: 'It is a set of routines in the LELO app, including guided Kegel exercises for men, that use the toy to practice control. Results vary, and it is not a medical treatment.',
      },
      {
        q: 'How does it start working?',
        a: 'LELO says F2S begins working once it senses you are inside. Add plenty of water-based lube, switch it on, connect the app if you want it, and insert slowly.',
      },
      {
        q: 'How big is it?',
        a: 'LELO lists about 110 mm long and 82 mm across, with an insertable opening of 34 x 45 mm. It is made from body-safe silicone, ABS plastic and aluminum.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Yes. LELO lists it as 100 percent waterproof, so you can rinse the sleeve under the tap. Dry it fully before storing it.',
      },
      WATER_LUBE,
    ],
  },
  'lelo-sona-2-travel': {
    summary:
      'A small, travel-friendly LELO sonic massager with twelve modes and a travel lock, about as long as a pair of sunglasses is wide.',
    body: [
      'SONA 2 Travel brings LELO’s SenSonic technology into a compact body that LELO says is smaller than your average pair of sunglasses. Sonic pulses stimulate without direct contact.',
      'It has twelve modes, a travel lock and a single-piece silicone design that keeps it watertight. It fits in a carry-on or a small purse.',
    ],
    bestFor: 'Travelers and anyone who wants sonic stimulation in a small, simple package.',
    pros: ['Twelve modes', 'Travel lock', 'Fully waterproof single-piece silicone'],
    cons: ['Smaller than SONA 3, with fewer features', 'External use only'],
    faqs: [
      {
        q: 'Is it good for travel?',
        a: 'Yes. LELO describes it as having a compact size and a travel lock so it will not switch on in a bag. It measures about 87 x 54 x 46 mm.',
      },
      {
        q: 'How is sonic different from vibration?',
        a: 'LELO says SenSonic technology uses sonic pulses that resonate deep into the internal structure of the clitoris rather than conventional vibration. Many people find it softer and more spread out.',
      },
      {
        q: 'Is it waterproof?',
        a: 'LELO lists it as 100 percent waterproof, made from a single piece of silicone. It switches off automatically after 20 minutes.',
      },
      {
        q: 'What comes in the box?',
        a: 'LELO lists the vibrator and a USB charging cord. Pick up a water-based lube if you do not already have one.',
      },
      WATER_LUBE,
    ],
  },
  'lelo-surfer-2-vibrating-plug-app-controlled-waterproof-silicone-design': {
    summary:
      'A medium-sized, app-controlled LELO vibrating anal plug with eight intensities, made from a single piece of waterproof silicone.',
    body: [
      'SURFER 2 is a unisex plug designed to sit in place while it vibrates. LELO lists four modes on the plug plus two more in the LELO app, and eight intensities.',
      'It is made from a single piece of body-safe silicone and is fully waterproof, with up to two hours of use per charge. Like any anal toy, it works best with plenty of lube and a relaxed pace.',
    ],
    bestFor: 'People who want a vibrating plug with app control, solo or with a partner.',
    pros: ['Eight intensities and app modes', 'Single-piece waterproof silicone', 'Up to 2 hours per charge'],
    cons: ['Anal play takes patience and plenty of lube', 'Two modes need the app'],
    faqs: [
      {
        q: 'How do I use it?',
        a: 'LELO says to apply plenty of water-based moisturizer and make yourself comfortable. Insert it slowly, breathing deeply until it feels comfortable, then power it on.',
      },
      {
        q: 'Is it waterproof, and how long does it last?',
        a: 'LELO lists it as 100 percent waterproof, with up to 2 hours of use and under 2 hours to charge. It shuts down automatically every 20 minutes.',
      },
      {
        q: 'How big is it?',
        a: 'LELO lists about 103 x 96 x 34 mm, and a weight of about 71 g.',
      },
      {
        q: 'How do I clean it?',
        a: 'LELO says to wash it with antibacterial soap after each use. It is waterproof, so you can rinse it fully, and then let it dry.',
      },
      WATER_LUBE,
    ],
  },

  // ---------------------------------------------------------------------------
  // Womanizer
  // ---------------------------------------------------------------------------
  'womanizer-blend-rechargeable-silicone-vibrator-with-clitoral-stimulator': {
    summary:
      'A flexible Womanizer rabbit that pairs Pleasure Air on the clitoris with vibration inside, controlled with one hand.',
    body: [
      'Womanizer Blend has two motors, so you can enjoy the air-pulse clitoral massage and the G-spot vibrations together or separately. It is flexible and lightweight, and designed to move with your body.',
      'It has eight intensity levels for the air pulse and six vibration modes (three intensities and three patterns: Massage, Wave and Pulse), and is IPX7 waterproof.',
    ],
    bestFor: 'People who like dual stimulation and want to control each part separately.',
    pros: ['Separate controls for air and vibration', 'Easy one-handed use', 'IPX7 waterproof'],
    cons: ['More to learn than a single-function toy', 'Air-pulse can feel strong if you go up too fast'],
    faqs: [
      {
        q: 'Can I use only one part?',
        a: 'Yes. Womanizer says Blend has two separate motors, so you can enjoy clitoral massage and G-spot vibrations together or separately.',
      },
      {
        q: 'How do I use it?',
        a: 'Womanizer says to gently insert the stimulator into the vagina and surround the clitoris with the stimulation head. A little water-based lube helps both parts sit comfortably.',
      },
      {
        q: 'Is it waterproof, and how do I clean it?',
        a: 'Womanizer lists IPX7 waterproofing. Clean it with a toy cleaner or warm water and antibacterial soap, and dry the magnetic charging pins before you recharge.',
      },
      {
        q: 'Is it good for beginners?',
        a: 'Womanizer describes it as easy to use with just one hand. If you are brand new to toys, start on the lowest levels and treat the two motors as something to explore one at a time.',
      },
      WATER_LUBE,
    ],
  },
  'womanizer-classic-2-rechargeable-silicone-clitoral-stimulator': {
    summary:
      'A straightforward Womanizer air-pulse stimulator with ten intensity levels, an Afterglow button and up to three hours of use.',
    body: [
      'Classic 2 uses Pleasure Air Technology to stimulate the clitoris without direct contact. It has ten intensity levels, from soft and gentle to strong.',
      'A short press of the power button drops it to the lowest setting for a gentle finish, which Womanizer calls Afterglow. Two stimulator heads come in the box so you can find the best fit.',
    ],
    bestFor: 'First-time air-pulse buyers who want a simple, long-lasting toy.',
    pros: ['Ten intensity levels', 'Two head sizes in the box', 'Up to 180 minutes of use'],
    cons: ['No vibration option', 'Air-pulse can build quickly'],
    faqs: [
      {
        q: 'What is Afterglow?',
        a: 'Womanizer says a short press of the power button quickly returns the toy to its lowest setting, for a relaxing end to the experience.',
      },
      {
        q: 'Why are there two heads?',
        a: 'Womanizer includes two stimulator head sizes in every box because everyone’s body is different, so you can choose the one that fits best.',
      },
      {
        q: 'How long does it last?',
        a: 'Womanizer lists 180 minutes of operating time. It charges with a magnetic USB cable (an AC adapter is not included) and measures about 148 x 48 x 35 mm.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Womanizer lists IPX7 waterproofing, so it works in the bath or shower. Dry the charging pins before you recharge it.',
      },
      WATER_LUBE,
    ],
  },

  // ---------------------------------------------------------------------------
  // We-Vibe
  // ---------------------------------------------------------------------------
  'we-vibe-wand-2-rechargeable-silicone-wand': {
    summary:
      'A cordless, app-enabled We-Vibe wand with ten-plus intensity levels and Smart Silence, for deep, rumbly vibration that stays quiet.',
    body: [
      'Wand 2 is a body massager and vibrator in one. It offers more than ten intensity levels, and We-Vibe describes the vibrations as powerful, rumbly and surprisingly quiet.',
      'Smart Silence can be switched on so it only vibrates while touching your body. It is IPX7 waterproof, rechargeable by USB and works with the We-Vibe app for play over any distance.',
    ],
    bestFor: 'People who want a quiet, cordless wand with plenty of power.',
    pros: ['Ten-plus intensity levels', 'Smart Silence for discreet use', 'App control and IPX7 waterproofing'],
    cons: ['Wands are larger than minis', 'Charging takes up to 150 minutes'],
    faqs: [
      {
        q: 'Is it quiet?',
        a: 'We-Vibe describes Wand 2’s powerful, rumbly vibrations as surprisingly quiet and discreet. Smart Silence helps by only vibrating when it touches your body.',
      },
      {
        q: 'How long does it last?',
        a: 'We-Vibe lists up to 120 minutes of use per charge and up to 150 minutes to charge, using a USB cable.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Yes. We-Vibe lists it as IPX7 waterproof, so you can use it in a bath or shower.',
      },
      {
        q: 'What comes in the box?',
        a: 'We-Vibe lists the wand, a USB cable, a quick-start guide and an illustrated manual. It is made from body-safe silicone and backed by a two-year warranty.',
      },
    ],
  },
  'we-vibe-verge-2-rechargeable-silicone-vibrating-perineum-cock-ring': {
    summary:
      'A stretchy We-Vibe ring that vibrates against the penis, testicles and perineum, with a design that also stimulates a partner.',
    body: [
      'Verge 2 adapts to the body and sends vibration to the penis, testicles and perineum. We-Vibe describes it as triple stimulation, since a partner’s G-spot or clitoris can feel it too.',
      'It is whisper quiet, IPX7 waterproof, rechargeable by USB and works with the We-Vibe app for control over distance.',
    ],
    bestFor: 'Couples who want a stretchy ring that adds vibration for both people.',
    pros: ['Stimulates several areas at once', 'Whisper quiet, per We-Vibe', 'IPX7 waterproof with app control'],
    cons: ['USB power adapter not included', 'Fit depends on your size'],
    faqs: [
      {
        q: 'How long does the battery last?',
        a: 'We-Vibe lists up to 120 minutes of use and up to 90 minutes to charge, with a USB cable (the power adapter is not included).',
      },
      {
        q: 'Is it comfortable?',
        a: 'We-Vibe describes a comfortable, stretchy design that adapts to the body. Do not overstretch it, and take it off if it feels uncomfortable.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Yes. We-Vibe lists IPX7 waterproofing, so you can use it in a bath or shower and rinse it clean.',
      },
      {
        q: 'Do I need the app?',
        a: 'No. It works on its own. The We-Vibe app lets you control it, even over distance, from your phone.',
      },
      WATER_LUBE,
    ],
  },
  'we-vibe-rave-2-twisted-pleasure-rechargeable-silicone-g-spot-vibrator': {
    summary:
      'An adjustable We-Vibe G-spot vibrator with dual stimulation, an ergonomic shape and app control.',
    body: [
      'Rave 2 is shaped to work with your body, with an adjustable fit that suits different shapes. We-Vibe lists dual stimulation that targets both the G-spot and the clitoris.',
      'It is IPX7 waterproof, rechargeable by USB and works with the We-Vibe app, with a storage bag for discreet storage and travel.',
    ],
    bestFor: 'People who want a flexible G-spot vibrator they can adjust to fit.',
    pros: ['Adjustable fit', 'IPX7 waterproof', 'App control and a storage bag'],
    cons: ['More to adjust than a simple vibrator', 'App is optional but needed for remote play'],
    faqs: [
      {
        q: 'Can I adjust the shape?',
        a: 'We-Vibe lists an adjustable fit for a comfortable feel on any body. Bend it gently until it sits well, and use water-based lube.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Yes. We-Vibe lists IPX7 waterproofing, so you can use it in a bath or shower.',
      },
      {
        q: 'What comes in the box?',
        a: 'We-Vibe lists the vibrator, a USB cable, a quick-start guide, an illustrated manual and a line storage bag for discreet storage and travel.',
      },
      {
        q: 'Do I need the app?',
        a: 'No. The app lets you control it from your phone, even over distance, but the toy works without it.',
      },
      WATER_LUBE,
    ],
  },
  'we-vibe-shared-touch-couples-grinding-vibrator': {
    summary:
      'A double-sided We-Vibe couples vibrator that stimulates the clitoris and penis at once, with ten rumbly modes and app control.',
    body: [
      'Shared Touch has a curved side for the clitoris and a stroker side for the penis, so both partners feel synchronized vibration as you grind together. It is flexible and designed for comfort and intuitive positioning.',
      'It has ten modes, is IPX7 waterproof, rechargeable by USB and works with the We-Vibe app.',
    ],
    bestFor: 'Couples who want a shared toy that is not worn or held in one place.',
    pros: ['Stimulates both partners at once', 'Ten modes', 'IPX7 waterproof'],
    cons: ['Shorter run time than some toys', 'Takes a little practice with positioning'],
    faqs: [
      {
        q: 'How does it work for two people?',
        a: 'We-Vibe describes a dual-sided design that stimulates the clitoris and the penis at the same time with synchronized vibrations. It is meant for grinding together.',
      },
      {
        q: 'How long does the battery last?',
        a: 'We-Vibe lists up to 60 minutes of use and up to 120 minutes to charge. It comes with a USB cable and a cotton pouch.',
      },
      {
        q: 'How big is it?',
        a: 'We-Vibe lists about 13.8 cm long, 4 cm wide and 6.8 cm high.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Yes. We-Vibe lists IPX7 waterproofing, so it is easy to clean and fine for the bath or shower.',
      },
      WATER_LUBE,
    ],
  },
  'we-vibe-jive-2-silicone-rechargeable-wearable-g-spot-vibrator-with-remote-control': {
    summary:
      'A wearable We-Vibe egg that stays put during play, with up to four hours of use, a splashproof remote and app control.',
    body: [
      'Jive 2 is a wearable G-spot vibrator with dual stimulation that targets both the G-spot and the clitoris. It has an adjustable fit and a splashproof remote.',
      'We-Vibe lists up to four hours of use per charge and up to 90 minutes to charge. It is IPX7 waterproof and works manually, with the remote or with the app.',
    ],
    bestFor: 'People who want a long-lasting wearable for solo play, date nights or distance.',
    pros: ['Up to 4 hours of use', 'Remote and app control', 'IPX7 waterproof'],
    cons: ['Remote is splashproof, not submersible', 'Takes a moment to find the right fit'],
    faqs: [
      {
        q: 'How long does it last?',
        a: 'We-Vibe lists up to 4 hours of use and up to 90 minutes to charge, using a USB cable.',
      },
      {
        q: 'How can I control it?',
        a: 'Manually on the toy, with the splashproof remote or with the We-Vibe app, including over distance.',
      },
      {
        q: 'Is it waterproof?',
        a: 'The toy is IPX7 waterproof. The remote is splashproof but not meant to be submerged.',
      },
      {
        q: 'What comes in the box?',
        a: 'We-Vibe lists the vibrator, a USB cable, a quick-start guide, an illustrated manual and a cotton pouch for discreet storage and travel.',
      },
      WATER_LUBE,
    ],
  },
  'we-vibe-ditto-app-compatible-vibrating-rechargeable-silicone-butt-plug-with-remote-control': {
    summary:
      'A vibrating We-Vibe anal plug with a splashproof remote and app control, shaped to work with your body.',
    body: [
      'Ditto+ is an ergonomic anal plug vibrator made from body-safe silicone. It comes with a We-Vibe remote that has intensity control, and it works with the We-Vibe app.',
      'It is IPX7 waterproof, rechargeable by USB and comes with a silky storage bag for discreet storage and travel.',
    ],
    bestFor: 'People who want a vibrating plug a partner can control.',
    pros: ['Remote with intensity control', 'IPX7 waterproof', 'Storage bag included'],
    cons: ['Anal play takes patience and plenty of lube', 'Remote is splashproof, not submersible'],
    faqs: [
      {
        q: 'How do I use it?',
        a: 'Use plenty of water-based lube, go slowly and relax. Turn it on low, then use the remote or the We-Vibe app to change the vibration.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Yes. We-Vibe lists the toy as IPX7 waterproof. The remote is splashproof but not made to be submerged.',
      },
      {
        q: 'How big is it?',
        a: 'We-Vibe lists about 68.5 mm x 88.1 mm. It is made from body-safe silicone, free from phthalates and BPA and made without latex.',
      },
      {
        q: 'What comes in the box?',
        a: 'We-Vibe lists the plug, a USB cable, a new We-Vibe remote, a quick-start guide, an illustrated manual and a storage bag.',
      },
      WATER_LUBE,
    ],
  },
  'we-vibe-temp-heating-and-cooling-rechargeable-silicone-lay-on-vibrator': {
    summary:
      'A We-Vibe lay-on vibrator with heating and cooling for temperature play, plus three intensities and three patterns.',
    body: [
      'Temp pairs vibration with precise temperature control, so partners can explore warmth and coolness together. It has three intensity levels and three pattern modes.',
      'We-Vibe suggests using it on a partner’s nipples, inner thighs or genitals to elevate foreplay. It is IPX7 waterproof and made from body-safe silicone.',
    ],
    bestFor: 'Couples who want to try temperature play as part of foreplay.',
    pros: ['Heating and cooling', 'Quiet vibrations', 'IPX7 waterproof'],
    cons: ['Fewer vibration levels than some toys', 'USB power adapter not included'],
    faqs: [
      {
        q: 'What is temperature play?',
        a: 'It means using warmth or coolness as part of touch. We-Vibe says Temp has precise temperature control so partners can explore it together.',
      },
      {
        q: 'How long does it last?',
        a: 'We-Vibe lists up to 120 minutes of use and up to 90 minutes to charge, using a USB cable (the power adapter is not included).',
      },
      {
        q: 'Is it waterproof?',
        a: 'Yes. We-Vibe lists IPX7 waterproofing, so you can use it in a bath or shower.',
      },
      {
        q: 'How do I use it with a partner?',
        a: 'We-Vibe suggests using it on a partner’s nipples, inner thighs or genitals. Start gently, check in often and change the temperature and vibration to what feels good.',
      },
    ],
  },
  'we-vibe-sync-lite-app-control-rechargeable-silicone-couples-vibrator': {
    summary:
      'A simpler, lower-priced We-Vibe C-shape couples vibrator with one-button control and ten-plus modes.',
    body: [
      'Sync Lite is a C-shape couples vibrator with an adjustable fit. We-Vibe describes the vibrations as powerful and whisper quiet, with one-button control for simple, intuitive play.',
      'It has more than ten vibration modes and works with the We-Vibe app. It comes in pink or aqua with a cotton storage pouch.',
    ],
    bestFor: 'Couples who want a shared vibrator without the higher price of the flagship models.',
    pros: ['One-button control', 'Ten-plus modes', 'App control for distance'],
    cons: ['Shorter run time than larger We-Vibes', 'Fewer extras than Sync O or Chorus'],
    faqs: [
      {
        q: 'How long does the battery last?',
        a: 'We-Vibe lists up to 45 minutes of use and up to 90 minutes to charge. It is a short run time, so charge it before you plan to use it.',
      },
      {
        q: 'Is it quiet?',
        a: 'We-Vibe describes its vibrations as near-silent yet powerful, and whisper quiet.',
      },
      {
        q: 'How big is it?',
        a: 'We-Vibe lists about 7.5 x 5.1 x 3.0 cm. The fit is adjustable, and it comes with a cotton storage pouch.',
      },
      {
        q: 'Do I need the app?',
        a: 'No. One button controls it. The We-Vibe app lets you control it even over distance, and lets a partner join in.',
      },
      WATER_LUBE,
    ],
  },
  'we-vibe-jive-lite-g-spot-rechargeable-silicone-egg-purple': {
    summary:
      'A smooth, egg-shaped We-Vibe vibrator that stays in place during play, with ten-plus intensity levels and app control.',
    body: [
      'Jive Lite has a smooth egg shape that holds it in place during play. We-Vibe lists more than ten intensity levels and describes the vibrations as near-silent.',
      'It is IPX7 waterproof, runs for up to 120 minutes and works with the We-Vibe app. It comes with a cotton pouch for discreet storage and travel.',
    ],
    bestFor: 'People who want a simple, quiet, app-capable wearable egg.',
    pros: ['Ten-plus intensity levels', 'Whisper quiet, per We-Vibe', 'IPX7 waterproof'],
    cons: ['No remote in the box, so partner play uses the app', 'Fit varies from body to body'],
    faqs: [
      {
        q: 'How long does it last?',
        a: 'We-Vibe lists up to 120 minutes of use and up to 90 minutes to charge.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Yes. We-Vibe lists IPX7 waterproofing, so you can use it in a bath or shower.',
      },
      {
        q: 'Can a partner control it?',
        a: 'Yes, through the We-Vibe app, even over distance. The toy also works on its own.',
      },
      {
        q: 'What comes in the box?',
        a: 'We-Vibe lists the vibrator, a USB cable, a quick-start guide, an illustrated manual and a cotton pouch for discreet storage and travel.',
      },
      WATER_LUBE,
    ],
  },

  // ---------------------------------------------------------------------------
  // Lovense
  // ---------------------------------------------------------------------------
  'lovense-lush-mini': {
    summary:
      'A small, app-controlled Lovense egg vibrator with a slim 31 mm body, a light-up tail and quiet operation.',
    body: [
      'Lush Mini is a smaller, easier-to-wear version of Lovense’s popular remote-controlled egg. Its soft silicone body is about 31 mm wide, which Lovense designed for effortless insertion, and it has an LED light tail.',
      'Lovense lists a minimum sound level of 36 dB, vibration of up to 7,000 per minute and IPX7 waterproofing. It works with the Lovense Remote app for custom patterns and partner control.',
    ],
    bestFor: 'People who want a small, quiet, app-controlled egg for solo or partner play.',
    pros: ['Slim 31 mm body', 'Minimum 36 dB, per Lovense', 'IPX7 waterproof with fast charging'],
    cons: ['Needs the app for remote play', 'Bluetooth can be unstable in water'],
    faqs: [
      {
        q: 'How quiet is it?',
        a: 'Lovense lists a minimum sound level of 36 dB for Lush Mini. Higher settings are louder, so try it at home to learn how it sounds.',
      },
      {
        q: 'How long does the battery last?',
        a: 'Lovense lists a battery life of 63 to 236 minutes, depending on the level, and about 40 to 50 minutes to charge. Standby time is up to 120 hours.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Lovense lists IPX7 waterproofing. Bluetooth may not be stable in or under water, and the toy should be switched off while it charges.',
      },
      {
        q: 'Can a partner control it?',
        a: 'Yes, through the Lovense Remote app, whether they are nearby or far away. You can also use it on your own.',
      },
      WATER_LUBE,
    ],
  },
  'lovense-mission-2-silicone-rechargeable-vibrator': {
    summary:
      'A Lovense vibrating dildo with an adjustable suction cup base, touch-sense vibration and app control, for hands-free play.',
    body: [
      'Mission 2 has a 180 degree adjustable suction cup base that attaches to a smooth surface, so you can try hands-free positions. Lovense’s Touch-Sense vibration responds to how it is touched, and it can control other Lovense toys.',
      'It is made from food-grade silicone with a velvety tip, is IPX7 waterproof and lasts up to 230 minutes on a charge.',
    ],
    bestFor: 'People who want hands-free play and app features in one toy.',
    pros: ['Adjustable suction cup base', 'Touch-sense vibration', 'IPX7 waterproof'],
    cons: ['Heavier than most vibrators, with the base', 'The suction cup needs a smooth surface'],
    faqs: [
      {
        q: 'How does the suction cup work?',
        a: 'Lovense says the 180 degree adjustable suction cup attaches to a smooth surface so you can try different hands-free positions and angles. Test the hold before you rely on it.',
      },
      {
        q: 'How long does it last?',
        a: 'Lovense lists up to 230 minutes of battery life, about 80 minutes to charge and standby time of up to 120 hours.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Lovense lists IPX7 waterproofing. Bluetooth may not be stable in water.',
      },
      {
        q: 'How heavy is it?',
        a: 'Lovense lists the toy at about 175 g and the suction base at about 125 g.',
      },
      WATER_LUBE,
    ],
  },

  // ---------------------------------------------------------------------------
  // TENGA
  // ---------------------------------------------------------------------------
  'tenga-flip-zero-masturbator': {
    summary:
      'The manual FLIP ZERO from TENGA: a reusable, flip-open stroker with premium elastomer and bold internal details.',
    body: [
      'FLIP ZERO opens like a book, so you can see and rinse every detail. TENGA made it from a premium-grade elastomer that was previously only available in Japan, with an integrated hinge that keeps it easy to clean.',
      'It is the manual version, with no motor to charge, and it comes with two sample pouches of TENGA HOLE LOTION. TENGA says the white items are standard strength and the black ones use a firmer material for a stronger feel.',
    ],
    bestFor: 'People who want a reusable premium stroker that is simple to wash.',
    pros: ['Flip-open design is easy to clean', 'Two lotion samples included', 'Nothing to charge'],
    cons: ['Manual only', 'Higher price than single-use cups'],
    faqs: [
      {
        q: 'Is it reusable?',
        a: 'Yes. TENGA says that with proper washing and care the FLIP ZERO items can be reused, though lifespan depends on use, lube, cleaning and storage.',
      },
      {
        q: 'How do I clean it?',
        a: 'Open it up and rinse with water, using only neutral or mild soap. TENGA warns against alcohol and other cleaners. Air dry it fully before you close it for storage.',
      },
      {
        q: 'What is the difference between FLIP ZERO and FLIP ZERO GRAVITY?',
        a: 'Both are manual. TENGA says GRAVITY has lower-profile details that suit fast, smooth strokes, while FLIP ZERO has larger ribs. Both come in white (standard) and black (firmer).',
      },
      TENGA_LUBE,
    ],
  },
  'tenga-standard-original-vac-cup': {
    summary:
      'The classic TENGA Original Vacuum Cup: a disposable, pre-lubricated cup with an hourglass shape and strong suction.',
    body: [
      'The Original Vacuum Cup is TENGA’s best-known design. Its hourglass shape and valve structure create constriction and suction, and the internal details have been refined over years of engineering.',
      'It is ready to use out of the wrapper and made for one use only, which makes it a low-commitment way to try TENGA. TENGA says the standard-strength CUPs are the best place to start.',
    ],
    bestFor: 'First-time TENGA buyers who want a simple, no-prep, disposable option.',
    pros: ['Pre-lubricated and ready to use', 'Strong suction from the air hole and valve', 'Easy cleanup, since you dispose of it'],
    cons: ['Single use, so the cost adds up', 'Less variety than reusable strokers'],
    faqs: [
      {
        q: 'Is it reusable?',
        a: 'No. TENGA says the CUPs are designed solely for one-time, disposable use and should be discarded after use. For hygiene, it does not recommend using them more than once.',
      },
      {
        q: 'Do I need lube?',
        a: 'No. The cup comes pre-lubricated, and TENGA’s Smooth Pad insertion mechanism helps apply lubricant as you insert. Open the cap and it is ready to use.',
      },
      {
        q: 'How does the suction work?',
        a: 'TENGA says the CUPs have an air hole and release valve. Cover the hole with a finger while pulling out for extra vacuum suction, and leave it open for easier insertion.',
      },
      {
        q: 'How do I dispose of it?',
        a: 'TENGA says to put the cap back on after use and dispose of it. Check your local guidelines for how to throw away items made from these materials.',
      },
    ],
  },
  'tenga-standard-rolling-head-cup': {
    summary:
      'A disposable TENGA Rolling Head Cup with a flexible spiraling body that squeezes as you insert and a bulbous orb deep inside.',
    body: [
      'The Rolling Head Cup has a flexible, spiraling body that squeezes as you insert, so you feel 360 degree sensations at the tip. A bulbous stimulation orb sits deeper inside.',
      'It is pre-lubricated, ready to use and made for one use, with the same air hole and valve as the other cups in the series.',
    ],
    bestFor: 'People who want a more textured, twisting feel from a disposable cup.',
    pros: ['Spiraling body with all-around sensation', 'Pre-lubricated', 'Disposable and easy to clean up'],
    cons: ['Single use only', 'A busier feel than the original cup'],
    faqs: [
      {
        q: 'Is it reusable?',
        a: 'No. TENGA says the CUPs are designed solely for one-time, disposable use and should be discarded after use.',
      },
      {
        q: 'What makes the Rolling Head different?',
        a: 'TENGA describes a flexible, spiraling body that squeezes as you insert, giving 360 degree sensation at the tip, plus a bulbous orb deeper inside.',
      },
      {
        q: 'Do I need lube?',
        a: 'No. It is pre-lubricated, and the Smooth Pad insertion mechanism helps apply lubricant as you insert.',
      },
      {
        q: 'Can I use it with a partner?',
        a: 'Many people use disposable cups alone, but they can be part of partnered play if you both want that. Talk about it first and keep things comfortable for everyone.',
      },
    ],
  },
  'tenga-smart-vibe-ring': {
    summary:
      'A rechargeable TENGA silicone vibrating ring for partnered play, with a rumbling motor, several strengths and rhythm patterns.',
    body: [
      'The Smart Vibe Ring is a vibrator attached to a stretchy silicone ring. Wear it at the base of the penis during sex so the vibration reaches both of you, or hold it and use it as a small vibrator.',
      'TENGA says it houses a strong, rumbling motor with multiple vibration strengths and several rhythm patterns, and a long vibrating tip designed to reach different sizes.',
    ],
    bestFor: 'Couples who want a simple vibrating ring that is designed to fit a range of bodies.',
    pros: ['Several strengths and rhythm patterns', 'Stretchy silicone ring', 'Can also be used as a handheld vibrator'],
    cons: ['Uses a special charging port, not a standard USB cable', 'About an hour of running time at full power'],
    faqs: [
      {
        q: 'How long does it last?',
        a: 'TENGA lists about 60 minutes of running time at full power for the original Smart Vibe Ring and about 40 minutes for the larger SVR+, with about 60 minutes to charge. Check which version you have in the product details.',
      },
      {
        q: 'Can I charge it with a normal USB cable?',
        a: 'TENGA says the port on the SVR is made specifically for it, not a common USB cable, so keep the cable that comes with it.',
      },
      {
        q: 'How do I clean it?',
        a: 'TENGA says not to wash it under hot water, boil it or soak it in detergents for long. Use neutral or mild soap, avoid acidic or alcohol cleansers and dry it fully before storing.',
      },
      {
        q: 'How far can I stretch the ring?',
        a: 'TENGA says the ring is stretchable, but overstretching can leave it disfigured or permanently stretched, so ease it on gently.',
      },
      WATER_LUBE,
    ],
  },
  'tenga-iroha-rin-sango': {
    summary:
      'A soft-touch iroha Rin+ vibrator with a spherical tip, four vibration strengths and two pulse patterns.',
    body: [
      'iroha Rin+ keeps the easy-to-hold shape of the original Rin and adds enhanced vibration. It has a soft spherical tip on a firmer length, and a flexible tip that moves as you use it.',
      'It features four vibration strengths and two pulse patterns, and is battery-operated. iroha describes its soft-touch silicone as gentle and silky smooth to the touch.',
    ],
    bestFor: 'People who want a gentle, design-led vibrator for external or insertable play.',
    pros: ['Soft-touch silicone', 'Four strengths and two pulse patterns', 'Easy-to-hold shape'],
    cons: ['Battery-operated rather than rechargeable', 'Fewer settings than app-connected toys'],
    faqs: [
      {
        q: 'How many settings does it have?',
        a: 'iroha lists four vibration strengths and two pulse patterns for the Rin+.',
      },
      {
        q: 'Is it rechargeable?',
        a: 'iroha describes the Rin+ as battery-operated. Check the product details for the battery type before you buy.',
      },
      {
        q: 'What is it made of?',
        a: 'iroha uses a soft-touch silicone it describes as gentle and silky smooth. Use water-based lube with silicone toys.',
      },
      {
        q: 'Can I use it inside the body?',
        a: 'iroha lists the Rin+ for insertable pleasure, with a soft spherical tip designed for easy insertion. Use plenty of water-based lube and go slowly.',
      },
    ],
  },
  'tenga-iroha-rin-hisui': {
    summary:
      'The iroha Rin+ in Hisui: a soft-touch vibrator with a spherical tip, four strengths and two pulse patterns.',
    body: [
      'iroha Rin+ has an easy-to-hold shape and a soft spherical tip on a firmer length. The flexible tip moves as you use it, which makes for a sensation that iroha says is new for everyone.',
      'It features four vibration strengths and two pulse patterns, and is battery-operated. Hisui is simply one of the colors.',
    ],
    bestFor: 'People who want a gentle, design-led vibrator with simple controls.',
    pros: ['Soft-touch silicone', 'Four strengths and two pulse patterns', 'Easy-to-hold shape'],
    cons: ['Battery-operated rather than rechargeable', 'Fewer settings than app-connected toys'],
    faqs: [
      {
        q: 'How many settings does it have?',
        a: 'iroha lists four vibration strengths and two pulse patterns for the Rin+.',
      },
      {
        q: 'Is it rechargeable?',
        a: 'iroha describes the Rin+ as battery-operated. Check the product details for the battery type before you buy.',
      },
      {
        q: 'What lube should I use?',
        a: 'Water-based lube. It is safe with silicone and rinses off easily. Silicone lube can leave silicone toys tacky.',
      },
      {
        q: 'Is it a good first vibrator?',
        a: 'Its soft materials, easy-to-hold shape and simple controls make it approachable. Start on the lowest strength and go at your own pace.',
      },
    ],
  },
}
