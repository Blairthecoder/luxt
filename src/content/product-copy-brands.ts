import type { ProductCopy } from '@/types/catalog'

/**
 * Researched copy and FAQs for featured-brand products. Specs (sizes, settings,
 * waterproofing, warranty, what is in the box) come from each maker's own
 * product page, so recheck them against that page when a model is updated.
 * Original wording only; never paste manufacturer descriptions.
 */

const WATER_LUBE_SILICONE = {
  q: 'What lube should I use with it?',
  a: 'A water-based lube. It is safe with silicone, keeps things comfortable and rinses off easily. Silicone lube can leave silicone toys tacky over time, so save it for sex without toys.',
}

const STROKER_LUBE = {
  q: 'What lube is safe to use?',
  a: 'Water-based lube. Oil-based and silicone lubes can damage stroker materials, and a generous amount of water-based lube keeps every stroke comfortable and makes cleanup easier.',
}

export const BRAND_PRODUCT_COPY: Record<string, ProductCopy> = {
  // ---------------------------------------------------------------------------
  // Fleshlight
  // ---------------------------------------------------------------------------
  'fleshlight-go-torque': {
    summary:
      'A see-through, travel-sized Fleshlight with a textured sleeve, made for people who want the classic stroker experience in a case that is easy to pack and easy to keep private.',
    body: [
      'The GO line is a smaller, lighter version of the original Fleshlight case. Fleshlight describes it as discreet, compact and easy to hold with one hand, which makes it a comfortable pick if the full-size case feels like too much.',
      'The Torque has a clear sleeve so you can see how the texture sits, and it uses the same SuperSkin material as the rest of the range. Like any stroker, it rewards a little care: plenty of water-based lube, a warm rinse afterward and time to dry.',
    ],
    bestFor: 'People who travel, live with others or want a smaller case with a classic Fleshlight sleeve.',
    pros: [
      'Compact case that is easier to store and carry',
      'Clear sleeve lets you see the texture',
      'Fleshlight lists the sleeve as phthalate-free',
    ],
    cons: [
      'Smaller case, so it is a shorter stroke than a full-size Fleshlight',
      'Sleeve needs rinsing and full drying after every use',
    ],
    faqs: [
      {
        q: 'Is the Fleshlight GO discreet?',
        a: 'Fleshlight designed the GO to be smaller, lighter and more compact than its original case, so it takes up less room in a drawer or a bag. It is still a toy, so if privacy matters most, store it in its case somewhere dry and out of the way.',
      },
      {
        q: 'What size does the GO series fit?',
        a: 'Fleshlight lists the GO series as suiting up to 8 inches in length and 6½ inches in girth. If you are on the larger side and unsure, the full-size Fleshlight line gives you more room, and the sleeve is stretchy enough to be comfortable for most people.',
      },
      {
        q: 'Is the sleeve body safe?',
        a: 'Fleshlight states that all of its sleeves are made from its patented SuperSkin material, which it describes as 100 percent phthalate-free. Use water-based lube, clean it after each use and replace the sleeve if it tears or stays sticky.',
      },
      {
        q: 'How do I clean it?',
        a: 'Slide the sleeve out of the case, rinse it with warm water, and let it air dry fully before it goes back in. Fleshlight also publishes a care guide. Never put it away damp, since trapped moisture is the main reason sleeves wear out early.',
      },
      STROKER_LUBE,
    ],
  },
  'fleshlight-flight-pilot': {
    summary:
      'The smallest, most discreet case in the Fleshlight range, in a tapered shape that is easy to slip into a bag.',
    body: [
      'Flight is Fleshlight’s travel-focused series, built around a smaller, lighter, tapered case that is the most discreet the brand makes. The Pilot is one of its textured sleeves in that compact case.',
      'It trades some length for convenience. If you want maximum stroke length, a full-size Fleshlight is the better fit, but for travel or tight storage the Flight is hard to beat.',
    ],
    bestFor: 'People who want a very compact, discreet stroker for travel or small spaces.',
    pros: ['Smallest, lightest, most discreet Fleshlight case', 'Fleshlight SuperSkin sleeve', 'Easy to pack'],
    cons: [
      'Shorter and tighter than a full-size Fleshlight',
      'The Fleshlight Shower Mount needs the Flight Adapter, which is sold separately',
    ],
    faqs: [
      {
        q: 'How discreet is the Flight Pilot?',
        a: 'Fleshlight describes the Flight case as its smallest, lightest and most discreet. It packs flat and takes up very little space, so it is a good fit for travel or for a shared home where you want your things to stay private.',
      },
      {
        q: 'What size does the Flight series fit?',
        a: 'Fleshlight lists the Flight series as suiting up to 7 inches in length and 5½ inches in girth. It is a snug, compact fit, so if you want more room, look at the GO line or a full-size Fleshlight.',
      },
      {
        q: 'Can I use it with the shower mount?',
        a: 'Only with the Flight Adapter. Fleshlight notes that the adapter is required for the Shower Mount and is not included with the toy, so add it to your order if you want to use it that way.',
      },
      {
        q: 'What is in the box?',
        a: 'Fleshlight lists the compact Flight case, the SuperSkin sleeve and instructions for use and care. Lube and cleaning products are sold separately, so pick up a water-based lube if you do not already have one.',
      },
      STROKER_LUBE,
    ],
  },
  'fleshlight-quickshot-vantage': {
    summary:
      'A short, open-ended Fleshlight with a clear sleeve that is simple to rinse and easy to share, for solo or partnered play.',
    body: [
      'Quickshot is Fleshlight’s compact, open-ended design. Because the sleeve is open at both ends, cleanup is as easy as running water straight through it, and the clear case lets you see what you are working with.',
      'Fleshlight says the Quickshot is less than half the size of its original, which makes it light and easy to hold. It works well on its own or as extra stimulation with a partner.',
    ],
    bestFor: 'First-time Fleshlight buyers and anyone who wants the easiest cleanup.',
    pros: ['Open-ended sleeve rinses clean easily', 'Light, compact case', 'Works solo or with a partner'],
    cons: ['Much shorter than a full-size Fleshlight', 'Open-ended, so there is no end cap for suction control'],
    faqs: [
      {
        q: 'Is the Quickshot Vantage a good first Fleshlight?',
        a: 'It is a gentle way in. It is compact and light, the open-ended sleeve is easy to clean, and the price is lower than the full-size cases. If you enjoy it, you will know which textures and sizes to try next.',
      },
      {
        q: 'How big is it?',
        a: 'Fleshlight lists the Quickshot series at about 4 inches in length and 4½ inches in girth. That is less than half the size of its original case, so it is a short, light toy designed for convenience rather than maximum length.',
      },
      {
        q: 'How do I clean it?',
        a: 'Fleshlight says to remove the sleeve from the case after use and rinse it with warm water, and it also recommends its Fleshwash cleaner. Let the sleeve dry completely before it goes back in the case. The open ends make this quick.',
      },
      {
        q: 'Can I use it with a partner?',
        a: 'Yes. Fleshlight designed the open-ended Quickshot to work solo or as added stimulation during partnered play. Talk about it beforehand, keep water-based lube close and check in as you go so it feels good for both of you.',
      },
      STROKER_LUBE,
    ],
  },
  'fleshlight-pink-lady-stamina-training-unit': {
    summary:
      'Fleshlight’s Stamina Training Unit, built with an intense texture for people who want to practice control and last longer, made in the same case and SuperSkin sleeve as the rest of the line.',
    body: [
      'Fleshlight markets the Stamina Training Unit as a way to build endurance and says it is its best-selling sleeve. The texture is deliberately intense, so the idea is to practice staying in control as the sensation builds.',
      'There is no magic here, just practice. If lasting longer is a concern for you or a partner, a stroker like this can help you get to know your own pace, and a doctor or sex therapist is a good next step if it keeps bothering you.',
    ],
    bestFor: 'People who want to practice control and build confidence in how long they last.',
    pros: ['Intense texture made for practicing control', 'Standard Fleshlight case with suction adjustment', 'Reusable'],
    cons: ['The texture can feel strong if you are new to strokers', 'Results vary and nothing is guaranteed'],
    faqs: [
      {
        q: 'Will it really help me last longer?',
        a: 'Fleshlight designed it to help you practice control, but no toy can promise results. Many people find that going slowly, pausing and learning their own pace helps over time. If it is a persistent worry, a doctor or sex therapist can help.',
      },
      {
        q: 'Is it too intense for a beginner?',
        a: 'It can be. The texture is built to be stimulating, so start slowly, use plenty of water-based lube and loosen the cap to reduce suction. If it feels like too much, a milder sleeve is a perfectly good place to begin.',
      },
      {
        q: 'How do I clean it?',
        a: 'Rinse the sleeve with warm water after each use, press out the water and let it air dry fully before it goes back in the case. Fleshlight publishes a care guide. A well-dried sleeve lasts noticeably longer than one stored damp.',
      },
      {
        q: 'What lube should I use?',
        a: 'Use water-based lube. Fleshlight sells its own, and any good water-based formula works. Avoid silicone and oil-based products, which can damage the sleeve. Using plenty makes the texture feel smoother and more comfortable.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Tenga
  // ---------------------------------------------------------------------------
  'tenga-flip-zero-gravity': {
    summary:
      'A reusable, manual TENGA stroker with a flip-open hinge that makes cleanup simple, and low, smooth internal details that suit long, flowing strokes.',
    body: [
      'The FLIP ZERO series opens like a book, so you can see and rinse every detail inside. The GRAVITY version uses lower-profile details than the original ZERO, which TENGA says allows faster, smoother strokes.',
      'It is the manual model, with no motor and nothing to charge. TENGA also makes an electronic FLIP ZERO EV with built-in vibration if you want that. This one is a simple, hard-cased toy that comes with two sample pouches of TENGA HOLE LOTION to get you started.',
    ],
    bestFor: 'People who want a reusable stroker that is easy to open, clean and dry.',
    pros: [
      'Flip-open design is easy to clean and air dry',
      'Two lotion samples included',
      'Hard case, so there is nothing to charge or break',
    ],
    cons: ['Manual only, with no vibration', 'Higher price than TENGA’s single-use cups'],
    faqs: [
      {
        q: 'Does the FLIP ZERO GRAVITY vibrate?',
        a: 'No. TENGA says the FLIP ZERO and FLIP ZERO GRAVITY are manual, and the FLIP ZERO EV series is the electronic one. If you want vibration, look at the EV. This one is simpler to care for, since there is no charging base to keep dry.',
      },
      {
        q: 'Is it reusable?',
        a: 'Yes. TENGA says that with proper washing and care the FLIP ZERO items can be reused, though lifespan depends on use, lube, cleaning and storage. Wash it after each use and dry it completely before closing it up.',
      },
      {
        q: 'How do I clean it?',
        a: 'Open it up, rinse with water and use only neutral or mild soap. TENGA warns against alcohol and other cleaners. Air dry it on the slide arms, and make sure it is fully clean and dry before storing it to avoid mold.',
      },
      {
        q: 'What lube should I use?',
        a: 'TENGA recommends its own HOLE LOTION, and two sample pouches are included. The material should be fine with other water-based lubes, but TENGA advises against oil or silicone products. Apply it to both halves for a comfortable fit.',
      },
      {
        q: 'What is the difference between the white and black versions?',
        a: 'TENGA says the white items are standard strength and the black ones use a firmer material with more dynamic internal details for a stronger, more intense feel. If you are new, white is the gentler place to start.',
      },
    ],
  },
  'tenga-3d-spiral-masturbator': {
    summary:
      'A sculpted, reusable TENGA stroker that turns inside out to wash, with spiral details that feel different on every stroke.',
    body: [
      'The TENGA 3D is made from a flexible material that will not break when inverted, so the pattern you feel is on the inside and the whole piece can be washed under running water. It is a design object as much as a toy.',
      'TENGA describes a tray for holding it right after use and a stand for air drying, which keeps cleanup tidy. Spiral is one of several textures in the 3D range.',
    ],
    bestFor: 'People who like design-led toys and want something simple to wash.',
    pros: ['Turns inside out for easy washing', 'Designed to air dry on a stand for tidy cleanup', 'Reusable'],
    cons: ['Soft and stretchy, so it feels different from a hard-cased stroker', 'Needs to dry fully on the stand before you store it'],
    faqs: [
      {
        q: 'Is the TENGA 3D reusable?',
        a: 'Yes. TENGA says that with proper washing and care the 3D series is reusable. How long it lasts depends on how you use it, which lube you choose and how you clean and store it. Always dry it fully before putting it away.',
      },
      {
        q: 'How do I clean it?',
        a: 'Because it inverts, you can wash the whole thing under running water with neutral or mild soap. Skip alcohol and other cleaners. Place it halfway down on the stand to air dry, and store it only once it is completely dry.',
      },
      {
        q: 'What lube is safe?',
        a: 'TENGA recommends its HOLE LOTION and includes a pouch. Other water-based lubes should be compatible, but oils and silicone-based lubricants can damage the material. Lubricate inside the 3D and around the opening so it goes in smoothly.',
      },
      {
        q: 'What is it made of?',
        a: 'TENGA lists the internal sleeve as an antibacterial elastomer. It is soft and stretchy, so it moves with you. If you notice irritation or the material tears, stop using it and replace it.',
      },
    ],
  },
  'tenga-flex-silky-white': {
    summary:
      'A reusable TENGA stroker you can cover the air hole on for a stronger vacuum feel, with a removable sleeve that makes washing easy.',
    body: [
      'The FLEX has a hard outer case and a removable, invertible inner sleeve. Cover the air hole at the end while you stroke and you create an internal vacuum, which also adds a spiraling sensation.',
      'The built-in drying stand turns the cap into a rack for the washed sleeve, so there is no guesswork about where to let it air dry. TENGA makes four FLEX varieties with different internal details and firmness; this is the Silky White.',
    ],
    bestFor: 'People who want adjustable suction and a stroker that is simple to wash.',
    pros: ['Cover the air hole for stronger suction', 'Removable, invertible sleeve', 'Built-in drying stand'],
    cons: ['Bulkier than TENGA’s cups and eggs', 'The sleeve must dry fully before you close it up'],
    faqs: [
      {
        q: 'How does the air hole work?',
        a: 'Leave it open for a lighter feel. Cover it while the toy is fully inserted and pull away, and TENGA says you create strong suction. Covering it also gives a spiraling sensation that is unique to the FLEX.',
      },
      {
        q: 'Is it reusable?',
        a: 'Yes. TENGA says the FLEX is reusable with proper washing and care, though how long it lasts depends on use, lube, cleaning and storage. Wash after every use and keep the sleeve dry between sessions.',
      },
      {
        q: 'How do I clean it?',
        a: 'Take the sleeve out of the case, wash it with neutral or mild soap and water, then invert it again. Use the cap as a drying stand and let it dry completely before returning it to the case. Avoid alcohol and other cleaners.',
      },
      {
        q: 'How big is it inside?',
        a: 'TENGA lists the insertion depth at about 16.5 cm (roughly 6.5 inches) and the insertion width at about 6 cm. The sleeve is a thermoplastic elastomer inside a hard case, so it does not stretch the way TENGA’s softer products do.',
      },
      STROKER_LUBE,
    ],
  },

  // ---------------------------------------------------------------------------
  // LELO
  // ---------------------------------------------------------------------------
  'lelo-enigma-wave-suction-dual-stimulator': {
    summary:
      'A LELO dual stimulator with three motors that gives internal and external pleasure together, including a finger-like motion inside.',
    body: [
      'ENIGMA Wave combines a flexible G-spot arm with an external clitoral stimulator. LELO’s WaveMotion technology moves the internal arm in a finger-like massage, while three synchronized motors work together for a full-feeling blend of sensations.',
      'It has eight settings, runs up to about two hours on a charge and is fully waterproof. It suits you if you already enjoy internal play and want more from one toy.',
    ],
    bestFor: 'People who enjoy internal and clitoral stimulation together and want a polished, premium feel.',
    pros: ['Three motors for blended sensation', 'Fully waterproof', 'Backed by a 2-year warranty, plus a 10-year guarantee after it ends'],
    cons: ['Higher price than basic dual vibrators', 'Not the simplest first toy if you are new to internal play'],
    faqs: [
      {
        q: 'Is the ENIGMA Wave waterproof?',
        a: 'LELO lists it as 100 percent waterproof, so you can use it in the bath or shower and rinse the whole toy. Make sure the charging port is dry before you plug it in, and use a little extra water-based lube, since water washes it away.',
      },
      {
        q: 'How long does the battery last?',
        a: 'LELO lists up to 2 hours of use per charge and up to 90 days of standby. It switches off automatically after 20 minutes, which is a nice safety net, and charges with the included USB cord.',
      },
      {
        q: 'How big is it?',
        a: 'LELO lists the toy at 106 x 50 x 182 mm (about 4.2 x 1.9 x 7.1 in), with an insertable length of 140 mm (about 5.5 in) and a weight of 201 g. The arm is flexible, which helps it sit comfortably.',
      },
      {
        q: 'What comes in the box and what is the warranty?',
        a: 'LELO lists the toy, a USB charging cord, a satin storage pouch, a warranty card and an instruction manual. The 2-year warranty covers replacement in the first year, and a 10-year guarantee applies after that, so keep your receipt.',
      },
      WATER_LUBE_SILICONE,
    ],
  },
  'lelo-f1s-v3-masturbator': {
    summary:
      'An app-connected LELO male masturbator that uses sonic pulses and soft silicone ribs to stimulate you hands-free, with an AI mode that responds to your movement.',
    body: [
      'The F1S V3 uses two synchronized motors and LELO’s SenSonic technology to emit sonic pulses around the penis, so you feel it without having to move your hand. The silicone ribs let air out, which avoids the air pockets that can interrupt other sleeves.',
      'It has eight built-in pleasure settings, and the LELO app adds an AI interactive mode that adjusts the motors to your movement in real time. It is one of the more advanced hands-free options for people who want technology that feels personal.',
    ],
    bestFor: 'People who want a hands-free, app-connected toy with a soft, realistic feel.',
    pros: ['Eight built-in settings, plus an app-based AI mode', 'Soft silicone sleeve with airflow ribs', 'Fully waterproof'],
    cons: ['Premium price', 'The AI mode needs the app and a Bluetooth connection'],
    faqs: [
      {
        q: 'How does the AI interactive mode work?',
        a: 'A feedback sensor inside the toy sends encrypted movement data over Bluetooth to the LELO app, which adjusts the motor intensity to match how you move. You can use the toy without it, since it has eight settings built in.',
      },
      {
        q: 'Is it waterproof and how do I clean it?',
        a: 'LELO lists it as 100 percent waterproof, so you can rinse it under the tap. Wash the sleeve with warm water and mild soap, dry it completely and store it somewhere clean. The silicone is body-safe and easy to wipe down.',
      },
      {
        q: 'Does it come in different sizes?',
        a: 'Yes. LELO lists a standard model at 144 mm long (about 5.7 in) with a 110 mm insertable length, and says it added an XL version based on customer feedback, at 154 mm with a 120 mm insertable length. Both are about 72 mm wide.',
      },
      {
        q: 'What lube should I use?',
        a: 'LELO suggests a generous amount of its own water-based personal moisturizer inside the sleeve. Any good water-based lube is safe with silicone. Avoid silicone lube, which can leave the sleeve tacky.',
      },
      {
        q: 'Can I use it without the app?',
        a: 'Yes. LELO says both versions have eight built-in pleasure settings, so the app is an optional extra. The app unlocks the AI mode and performance feedback, but the toy works on its own right out of the box.',
      },
    ],
  },
  'lelo-soraya-2-rechargeable-rabbit-vibrator': {
    summary:
      'A LELO rabbit vibrator with a broader, thicker arm and twelve settings, made to give you clitoral and G-spot stimulation at the same time in soft silicone.',
    body: [
      'SORAYA 2 pairs a curved internal arm with a clitoral arm, so both areas get attention at once. LELO says the internal arm is broader and thicker than the original for stronger G-spot sensation.',
      'Twelve vibration settings give you plenty of room to explore, and the soft silicone feels warm to the touch. It is fully waterproof, so it works in the bath as well as in bed.',
    ],
    bestFor: 'People who like blended internal and external stimulation and want a refined rabbit.',
    pros: ['Twelve vibration settings', 'Fully waterproof', 'Soft, warm-feeling silicone'],
    cons: ['A fuller shape than a simple external vibrator', 'Fit varies from body to body'],
    faqs: [
      {
        q: 'How big is the SORAYA 2?',
        a: 'LELO lists it at 220 x 76 x 45 mm (about 8.6 x 2.9 x 1.7 in), with an insertable length of 110 mm (about 4.3 in) and a weight of 175 g. The internal arm is broader than on the first SORAYA.',
      },
      {
        q: 'Is it waterproof?',
        a: 'LELO lists it as 100 percent waterproof, so you can use it in the bath or shower and rinse it under the tap. Dry the charging port before plugging it in, and use water-based lube since water rinses it away.',
      },
      {
        q: 'How many settings does it have?',
        a: 'LELO lists twelve vibration settings, from a gentle murmur to a strong pulse. It switches off by itself after 20 minutes. Start on the lowest setting and move up at your own pace.',
      },
      {
        q: 'Is a rabbit vibrator good for beginners?',
        a: 'It can be, if you already know you enjoy internal play. If you are brand new, a small external vibrator is gentler. When you are ready, SORAYA 2 is a polished step up, and the settings let you stay on a gentle level.',
      },
      WATER_LUBE_SILICONE,
    ],
  },
  'lelo-loki-wave-2-rechargeable-silicone-dual-stimulation-prostate-vibrator': {
    summary:
      'A LELO prostate massager with a finger-like motion, two motors and twelve settings, built to feel precise and comfortable in soft silicone.',
    body: [
      'LOKI Wave 2 uses LELO’s WaveMotion technology, so the sculpted tip moves in a finger-like massage that is meant to reach the prostate with ease. Two motors each control one handle, for a dual massage.',
      'Twelve settings let you start gently and build up. Prostate play is easier when you take it slowly, use plenty of water-based lube and relax into it, and the soft silicone helps with comfort.',
    ],
    bestFor: 'People curious about prostate play who want a well-made, comfortable first massager.',
    pros: ['Twelve vibration settings', 'WaveMotion tip for a finger-like feel', 'Fully waterproof'],
    cons: ['Premium price', 'Anal play takes patience and plenty of lube'],
    faqs: [
      {
        q: 'Is the LOKI Wave 2 good for beginners?',
        a: 'It can be. The shape is designed to reach the prostate comfortably, and twelve settings let you stay gentle. Go slowly, use plenty of water-based lube, relax and stop if anything hurts. Our prostate massage guide covers the basics.',
      },
      {
        q: 'How big is it?',
        a: 'LELO lists it at 91 x 42 x 196 mm (about 3.6 x 1.7 x 7.7 in), with an insertable length of 100 mm (about 3.9 in) and a weight of 196 g.',
      },
      {
        q: 'Is it waterproof?',
        a: 'LELO lists it as 100 percent waterproof, so it works in the shower and is easy to rinse clean. Wash it with warm water and mild soap after each use, and let it dry before putting it away.',
      },
      {
        q: 'What lube should I use?',
        a: 'A thick water-based lube. The body does not make its own lubrication for anal play, so use more than you think you need and reapply. Avoid silicone lube with a silicone toy, which can leave it tacky.',
      },
    ],
  },
  'lelo-tiani-3-rechargeable-dual-stimulation-couples-vibrator-with-remote': {
    summary:
      'A small, wearable LELO couples vibrator with a motion-sensing remote, so a partner can control the pleasure with a flick of the wrist.',
    body: [
      'TIANI 3 has two arms: a smaller one that goes into the vagina and a larger one that rests on the clitoris. It is small and light, so it can be worn during sex or on its own.',
      'The remote uses LELO’s SenseMotion technology, so tilting and flicking the remote changes the vibration. It is an easy way to share control with a partner, whether you are in the same room or planning a playful evening.',
    ],
    bestFor: 'Couples who want shared control with a small, comfortable wearable.',
    pros: ['Motion-sensitive wireless remote', 'Light and small, at about 42 g', 'Fully waterproof'],
    cons: ['The remote uses two AAA batteries', 'Smaller and lighter than a full-size dual stimulator'],
    faqs: [
      {
        q: 'How does the remote work?',
        a: 'LELO’s remote is motion-sensitive, so a flick of the wrist changes the vibration pattern and intensity. The toy also has a single button of its own, so you can use it solo. The remote runs on two AAA batteries.',
      },
      {
        q: 'Can I wear it during sex?',
        a: 'Yes, that is what it is designed for. The smaller arm sits in the vagina and the larger arm rests on the clitoris. It is small and light, at about 42 g, so many couples find it comfortable to wear while having sex.',
      },
      {
        q: 'Is it waterproof?',
        a: 'LELO lists it as 100 percent waterproof, so you can use it in the bath or shower. The remote is a separate unit, so keep it away from water and dry the toy before charging.',
      },
      {
        q: 'How big is it?',
        a: 'LELO lists the toy at 78 x 44.5 x 32 mm (about 3.1 x 1.8 x 1.3 in), with an insertable length of 78.2 mm (about 3.1 in). It is small enough to tuck into a bag or a bedside drawer.',
      },
      WATER_LUBE_SILICONE,
    ],
  },
  'lelo-gigi-3-app-controlled-g-spot-vibrator': {
    summary:
      'A silky LELO G-spot vibrator with a flattened tip, eight patterns and two extra app modes, for deep internal pressure and a flip-over clitoral option.',
    body: [
      'GIGI 3 has a broad, flattened tip shaped for G-spot pressure, and LELO says the tip can be flipped over to use as a clitoral massager. Eight vibration patterns run from a teasing murmur to a satisfying pulse.',
      'Connect it to the LELO app by Bluetooth and you unlock two extra modes, Finish Me Off and Out Of Control. You can ignore the app entirely and still have a full toy, and it is fully waterproof for use in the shower.',
    ],
    bestFor: 'People who want focused G-spot stimulation in a compact, app-capable toy.',
    pros: ['Flattened tip for deep, broad pressure', 'Two extra modes in the LELO app', 'Fully waterproof and light, at about 87 g'],
    cons: ['Less external stimulation than a rabbit', 'Needs the app for two of its modes'],
    faqs: [
      {
        q: 'Do I need the app to use GIGI 3?',
        a: 'No. It has eight vibration patterns on the toy itself. The LELO app adds two exclusive modes, Finish Me Off and Out Of Control, but the app is optional. Connect over Bluetooth only if you want those extras.',
      },
      {
        q: 'What are the app modes?',
        a: 'LELO says Finish Me Off slowly builds you toward a strong climax, while Out Of Control gives an unpredictable, tailor-made experience inside the app. Both are only available once you connect the toy to the app.',
      },
      {
        q: 'How big is it?',
        a: 'LELO lists it at 163 x 35 x 42 mm (about 6.4 x 1.4 x 1.7 in), with an insertable length of 90 mm (about 3.5 in) and a weight of 87 g. It is slim and light, which helps it feel approachable.',
      },
      {
        q: 'Is it waterproof, and what is in the box?',
        a: 'Yes, LELO lists it as 100 percent waterproof. The box holds the toy, a USB charging cord, a satin storage pouch, a warranty card and an instruction manual. It also shuts off automatically after 20 minutes.',
      },
      WATER_LUBE_SILICONE,
    ],
  },

  // ---------------------------------------------------------------------------
  // Womanizer
  // ---------------------------------------------------------------------------
  'womanizer-next-duo-rechargeable-silicone-dual-g-spot-clitoral-stimulator': {
    summary:
      'A Womanizer dual stimulator that pairs 3D Pleasure Air for the clitoris with deep, rumbly G-spot vibration, each controlled separately so you can blend them your way.',
    body: [
      'Next Duo combines Womanizer’s 3D Pleasure Air, which uses pulsating air pressure instead of direct contact, with rumbly vibrations from a G-spot arm made with We-Vibe, a sister brand. The two motors work independently, so you choose how much of each you want.',
      'It offers 14 air intensity levels, 14 vibration intensities and 10 vibration patterns, and a Climax Control feature adjusts the depth of the air pulse. If you like blended sensation and want control, it is one of the most flexible dual toys around.',
    ],
    bestFor: 'People who want internal and clitoral stimulation together and like to fine-tune each.',
    pros: ['Separate controls for air and vibration', 'IPX7 waterproof', 'Five-year warranty'],
    cons: ['Premium price', 'A lot of options if you like things simple'],
    faqs: [
      {
        q: 'How is Next Duo different from Womanizer Next?',
        a: 'Womanizer Next is a clitoral air-pulse toy. Next Duo adds a G-spot arm with rumbly vibrations, controlled independently of the air pulse. Choose Next if you want external stimulation only, and Duo if you enjoy internal sensation as well.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Womanizer lists it as IPX7 waterproof, so you can use it in the bath or shower. It charges with magnetic pins, so make sure the contacts are dry before you charge it. A little extra water-based lube helps in water.',
      },
      {
        q: 'Is it quiet?',
        a: 'Womanizer describes it as whisper quiet, and its Smart Silence feature keeps the toy from starting until it touches skin, which also saves battery. That makes it easier to keep things discreet at home.',
      },
      {
        q: 'How long does it take to charge, and what is the warranty?',
        a: 'Womanizer lists a charge time of 120 minutes using a magnetic cable. It comes with a five-year warranty, which is one of the longest in the category, so keep your receipt and register it.',
      },
      {
        q: 'What lube should I use?',
        a: 'Womanizer suggests a few drops of water-based lube on the vibrating arm and stimulation head. Water-based lube is safe with silicone and helps the head seal for smoother air-pulse stimulation.',
      },
    ],
  },
  'womanizer-premium-2-rechargeable-silicone-clitoral-stimulator': {
    summary:
      'Womanizer’s premium air-pulse stimulator, with 14 intensity levels, Smart Silence and an Autopilot mode that changes the sensation for you.',
    body: [
      'Premium 2 stimulates the clitoris with Pleasure Air Technology, which uses gentle waves of air pressure instead of direct contact. Many people find that more comfortable than vibration, especially if direct touch feels like too much.',
      'Fourteen intensity levels let you start soft and build, and Autopilot 2.0 randomly shifts the intensity so you never know exactly what comes next. It runs for up to 240 minutes, and two stimulation heads are included so you can find the best fit.',
    ],
    bestFor: 'People who want a top-of-the-line air-pulse toy with plenty of control.',
    pros: ['Fourteen intensity levels', 'Autopilot 2.0 mode', 'Two stimulation heads and IPX7 waterproofing'],
    cons: ['Premium price', 'Air-pulse can feel strong if you go up too quickly'],
    faqs: [
      {
        q: 'How does Pleasure Air work?',
        a: 'A soft silicone head sits around the clitoris, and the toy sends rapid waves of air pressure that suck and massage at the same time, without direct contact. Many people find that softer than vibration, which can feel numbing for some.',
      },
      {
        q: 'What is Autopilot?',
        a: 'Autopilot 2.0 randomly changes the intensity as you go, so it feels like someone else is adjusting it for you. Turn it off and you can set a steady level yourself, so it works whichever way you like to play.',
      },
      {
        q: 'Is Premium 2 waterproof and quiet?',
        a: 'Womanizer lists it as IPX7 waterproof, so it works in the bath or shower. Smart Silence means the toy only runs when it senses skin contact, so it stays quiet when you are not using it, and a few minutes of runtime is usually plenty.',
      },
      {
        q: 'What comes in the box?',
        a: 'Womanizer lists a USB charging cable (an AC adapter is not included), two stimulation heads, a quick start guide, safety instructions and a cotton storage pouch. It carries a five-year warranty.',
      },
      {
        q: 'How long does the battery last?',
        a: 'Womanizer lists up to 240 minutes of runtime from a 120-minute charge. Since most people finish in a few minutes, one charge goes a long way, and the battery lasts longer because Smart Silence stops it running idle.',
      },
    ],
  },
  'womanizer-liberty-2-rechargeable-silicone-clitoral-stimulator': {
    summary:
      'A compact Womanizer made for travel, with a travel lock, a protective case and Pleasure Air stimulation in a pocket-sized shape.',
    body: [
      'Liberty 2 brings Womanizer’s original Pleasure Air Technology into a small, light body that is easy to take anywhere. A travel lock keeps it from switching on in a bag, and the magnetic travel case keeps it clean and private.',
      'It has eight intensity levels, is fully waterproof and charges in about an hour. If you want an air-pulse toy that does not feel like a lot, this is a friendly entry point.',
    ],
    bestFor: 'People who travel or want a compact, discreet air-pulse toy.',
    pros: ['Travel lock and protective case', 'Charges in about 60 minutes', 'IPX7 waterproof'],
    cons: ['Eight levels, not as many as flagship models', 'Shorter battery life than larger Womanizers'],
    faqs: [
      {
        q: 'Is Liberty 2 discreet enough to travel with?',
        a: 'Yes. A travel lock stops it switching on accidentally, so there are no surprise noises in your bag, and the lightweight case closes with a magnet. It is small enough to slip into a pocket, which suits holidays and overnight stays.',
      },
      {
        q: 'How long does it last on a charge?',
        a: 'Womanizer lists 120 minutes of operating time and a 60-minute charge using magnetic pins. It charges quickly, which is handy before a trip, and a few minutes of use is usually enough.',
      },
      {
        q: 'Is it waterproof?',
        a: 'Womanizer lists it as IPX7 waterproof, so it works in the bath or shower and is easy to clean with a toy cleaner or warm water and antibacterial soap. Dry the charging contacts before recharging.',
      },
      {
        q: 'Is it a good first air-pulse toy?',
        a: 'It is a gentle one. It is small, has eight intensity levels and a lower price than the flagship models. Start on the lowest level, because air-pulse sensation can build quickly, and use a little water-based lube for a better seal.',
      },
      {
        q: 'How big is it, and what is the warranty?',
        a: 'Womanizer lists it at 105 x 50 x 40 mm with a five-year warranty. The head is soft silicone, and the body is ABS plastic and silicone, so it feels smooth and solid in the hand.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // We-Vibe
  // ---------------------------------------------------------------------------
  'we-vibe-sync-o-rechargeable-silicone-couples-vibrator-with-remote-control': {
    summary:
      'We-Vibe’s couples vibrator with an O-shaped inner arm that holds it steady, so it stays put during sex, solo play or hands-free.',
    body: [
      'Sync O is a C-shape vibrator in the classic We-Vibe style. The outer arm rests against the clitoris, and the flexible O-shaped inner arm sits comfortably in the vagina, which helps it stay in place for shared vibrations.',
      'It has a single button on the toy, plus a We-Vibe remote and an app for partner or long-distance play. It is waterproof, rechargeable by USB and made from body-safe silicone.',
    ],
    bestFor: 'Couples who want a wearable vibrator that stays in place and is easy to share.',
    pros: ['O-shaped arm helps it stay in place', 'Remote and app control', 'IPX7 waterproof'],
    cons: ['Fit varies from body to body', 'Needs the app for long-distance play'],
    faqs: [
      {
        q: 'Can we both feel it during sex?',
        a: 'Often, yes. We-Vibe designed the C-shape so the outer arm rests on the clitoris while the inner arm stays in place, and We-Vibe designs it for shared vibrations. How much a partner feels depends on the setting and fit.',
      },
      {
        q: 'Do I need the app?',
        a: 'No. There is a button on the toy, and a remote is available. The We-Vibe app adds more patterns and lets a partner play along across a room or a continent, so it is a nice extra rather than a requirement.',
      },
      {
        q: 'Is it waterproof?',
        a: 'We-Vibe lists it as IPX7 waterproof, so it works in the bath or shower and is easy to clean. Charge it with a USB cable after it is fully dry. Use a little water-based lube.',
      },
      {
        q: 'How big is it?',
        a: 'We-Vibe lists it at about 80 x 44 x 44.5 mm. It is made from body-safe silicone, free from phthalates and BPA, and made without latex. A two-year warranty covers it.',
      },
      WATER_LUBE_SILICONE,
    ],
  },
  'we-vibe-moxie-wearable-rechargeable-silicone-panty-vibe-clitoral-stimulator-with-remote-control': {
    summary:
      'A near-silent We-Vibe panty vibrator that clips to your underwear with a magnet, for discreet pleasure at home or out, with a remote and app control.',
    body: [
      'Moxie sits against the clitoris, held in your underwear by a magnetic clip, so it stays put as you move. Ten modes of rumbly vibration, and We-Vibe describes the sound as whisper quiet.',
      'A splashproof remote and the We-Vibe app let a partner take control, whether they are in the same room or in another country. Take it slowly, try it at home first and build up to a movie night or dinner.',
    ],
    bestFor: 'People who want discreet, hands-free play and a way to share control with a partner.',
    pros: ['Magnetic clip keeps it in place', 'Ten modes and a wireless remote', 'IPX7 waterproof'],
    cons: ['The charging cable and plug are not included', 'Needs a partner or app to get the full effect'],
    faqs: [
      {
        q: 'Is it really quiet?',
        a: 'We-Vibe describes the vibrations as near-silent but powerful, and the rumbly motor tends to sound lower than a buzzy one. Try it at home first so you know how it sounds before you take it anywhere.',
      },
      {
        q: 'How does it stay in place?',
        a: 'Place it in your underwear and secure it by attaching the magnet on the outside. We-Vibe says this keeps it in position as you move. A snug pair of underwear helps, and a replacement magnetic clip is available.',
      },
      {
        q: 'How long does the battery last?',
        a: 'We-Vibe lists up to 2 hours of use per charge, and it charges by USB. The cable is not included, but any standard USB port or power adapter works. Charge it before you head out.',
      },
      {
        q: 'Can a partner control it from far away?',
        a: 'Yes. Use the remote in the same room, or the We-Vibe app for control over the internet. Agree on what is okay in advance, so everyone feels comfortable and the surprise is a fun one.',
      },
      {
        q: 'Is it waterproof?',
        a: 'We-Vibe lists it as IPX7 waterproof, so it is easy to wash. The remote is splashproof but not meant for submersion. Dry the charging contacts before you charge it.',
      },
    ],
  },
  'we-vibe-melt-2-rechargeable-silicone-couples-vibrator': {
    summary:
      'A We-Vibe air-pulse toy that can be shared during partner play, with soft waves of air pressure, six patterns and twelve intensity levels.',
    body: [
      'Melt 2 uses Pleasure Air Technology, sending waves of air pressure that suck and massage the clitoris without direct contact. It is designed to be used with a partner, so it works well alongside a partner.',
      'It has six patterns and twelve intensity levels you can adjust from the toy or the We-Vibe app. A clever start-up feature means the vibration only begins on skin contact, which keeps things quieter.',
    ],
    bestFor: 'Couples who want air-pulse stimulation that works during partner play.',
    pros: ['Air-pulse designed for partner play', 'Six patterns and twelve intensity levels', 'App control'],
    cons: ['Needs a good seal for best results', 'A partner may need a moment to find a comfortable position'],
    faqs: [
      {
        q: 'How is it different from a regular vibrator?',
        a: 'Instead of buzzing against the skin, Melt 2 sends waves of air pressure that suck and massage the clitoris without direct contact. Many people find this softer and easier to build on, especially if direct vibration feels like too much.',
      },
      {
        q: 'Can it be used with a partner?',
        a: 'Yes. We-Vibe describes it as perfect for partner play, since it is meant to work well alongside a partner. Talk about positions, and adjust the intensity together so it feels good for both of you.',
      },
      {
        q: 'How many settings does it have?',
        a: 'We-Vibe lists twelve intensity levels and six patterns. Start with the plus button and move up gradually. The We-Vibe app gives you finer control and lets a partner change settings from afar.',
      },
      {
        q: 'What is in the box?',
        a: 'We-Vibe lists a USB charging cable (no AC adapter), a quick start guide, a multilingual manual and safety information. The silicone is body-safe, free from phthalates and BPA and made without latex, and a two-year warranty applies.',
      },
      WATER_LUBE_SILICONE,
    ],
  },
  'we-vibe-nova-2-rechargeable-silicone-rabbit-vibrator': {
    summary:
      'A flexible We-Vibe rabbit vibrator with an adjustable G-spot arm that keeps clitoral contact even during thrusting, controllable from the We-Vibe app.',
    body: [
      'Nova 2 pairs an internal G-spot stimulator with a flexing external arm, designed for constant clitoral contact, even during active use. The internal arm is adjustable, so you can shape it to fit your body.',
      'The We-Vibe app lets you change vibration and intensity by tapping your phone, even from a distance. It is IPX7 waterproof and comes with a small sample of We-Vibe lube.',
    ],
    bestFor: 'People who want a flexible, adjustable rabbit with app control.',
    pros: ['Adjustable internal arm', 'App control for partner or long-distance play', 'IPX7 waterproof'],
    cons: ['More to adjust than a simple vibrator', 'The app is optional but needed for remote play'],
    faqs: [
      {
        q: 'Can I adjust the shape?',
        a: 'Yes. We-Vibe says the internal G-spot stimulator is adjustable, so you can bend it to suit your body. The external arm flexes with your movement and stays on the clitoris. Take a moment to find a fit that feels natural.',
      },
      {
        q: 'Do I need the app?',
        a: 'No. You can use the buttons on the toy. The We-Vibe app adds toy control features, such as tapping your screen to change settings, and lets a partner join in over distance. It is a bonus rather than a requirement.',
      },
      {
        q: 'Is it waterproof?',
        a: 'We-Vibe lists it as IPX7 waterproof, so it works in the bath or shower and rinses clean. Dry the charging port before you plug it in, and use a little extra water-based lube in the water.',
      },
      {
        q: 'What is in the box?',
        a: 'We-Vibe lists the toy, a USB charging cable (AC adapter not included) and a 2 mL sample of We-Vibe lube made by pjur. It is made from body-safe silicone without phthalates, BPA or latex, and has a two-year warranty.',
      },
    ],
  },
  'we-vibe-chorus-pro-rechargeable-silicone-couples-vibrator-with-remote-control': {
    summary:
      'We-Vibe’s couples vibrator with a haptic squeeze remote: the harder your partner squeezes, the stronger the vibration, and the remote buzzes back so you both feel it.',
    body: [
      'Chorus Pro is a wearable couples vibrator with a squeeze remote that builds intensity as you squeeze. The remote gives real-time tactile feedback that matches the toy’s vibration, so the person holding it can feel what the other person feels.',
      'Sensors in the toy respond to body movement, and the app offers three touch sensitivity modes. A charging case powers both the toy and the remote, so there is nothing fiddly to plug in.',
    ],
    bestFor: 'Couples who want interactive, shared control with real-time feedback.',
    pros: ['Haptic squeeze remote', 'Motion-responsive sensors with three sensitivity modes', 'Charging case powers toy and remote'],
    cons: ['Higher price than basic couples vibrators', 'Pairing takes a minute the first time'],
    faqs: [
      {
        q: 'How does the squeeze remote work?',
        a: 'Squeeze the remote to raise the toy’s vibration, and release to ease off. We-Vibe says the remote also vibrates at the strength of the toy, so the person holding it can feel what the other is feeling.',
      },
      {
        q: 'Do I need the app?',
        a: 'No. The remote and the button on the toy work on their own. The free We-Vibe app adds custom vibrations, modes and control from across the room or across the world, and lets you choose a touch sensitivity mode.',
      },
      {
        q: 'How do I pair the remote?',
        a: 'Hold the We-Vibe button on the toy for about 5 seconds until it vibrates twice, then hold the button on the remote for 5 or more seconds until the toy vibrates three times. After that, the plus and minus buttons switch strengths.',
      },
      {
        q: 'How does charging work?',
        a: 'Place the toy and the remote in the charging case, with no cables to the toy itself. We-Vibe says the case charges and stores both, so it is easy to keep ready and discreet in a drawer.',
      },
      WATER_LUBE_SILICONE,
    ],
  },
}
