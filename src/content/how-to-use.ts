import type { HowToUse } from '@/types/catalog'

/**
 * "How to Use It" guides keyed by product handle. Only products whose specs
 * were checked against the maker's own page appear here; steps follow the
 * maker's instructions, and "what to expect" stays descriptive and hedged
 * because everyone feels things differently. Recheck when a model changes.
 */
const STROKER_CARE = 'Use water-based lube only. Oil-based and silicone lubes can damage stroker materials.'

export const HOW_TO_USE: Record<string, HowToUse> = {
  // ---------------------------------------------------------------------------
  // Fleshlight
  // ---------------------------------------------------------------------------
  'fleshlight-go-torque': {
    start: [
      'If the sleeve is new, rinse it with warm water and let it dry.',
      'Add a generous amount of water-based lube inside the sleeve and on yourself.',
      'Start slowly with a relaxed grip, then adjust speed and pressure to what feels good.',
      'If your case has an adjustable end cap, loosen it for lighter suction and tighten it for more.',
    ],
    expect:
      'A snug, textured feel in a smaller, lighter case than a full-size Fleshlight. The clear sleeve lets you see how the texture sits. The stroke is shorter than in a full-size case, which many people find easier to handle. How it feels varies from person to person.',
    goodToKnow: [
      'Fleshlight lists the GO series as suiting up to 8 inches in length and 6½ inches in girth.',
      'After use, rinse the sleeve with warm water and let it air dry completely before storing it.',
      STROKER_CARE,
    ],
  },
  'fleshlight-flight-pilot': {
    start: [
      'Rinse a new sleeve with warm water and let it dry.',
      'Apply plenty of water-based lube inside the sleeve and on yourself.',
      'Begin gently, since the Flight case is slim, and find a grip that feels comfortable.',
      'Use the Flight Adapter if you want to attach it to a Fleshlight Shower Mount (sold separately).',
    ],
    expect:
      'A compact, snug feel in the smallest and most discreet Fleshlight case. Expect a shorter stroke and a close fit. As with any textured sleeve, the sensation depends on your body and pace.',
    goodToKnow: [
      'Fleshlight lists the Flight series as suiting up to 7 inches in length and 5½ inches in girth.',
      'Rinse with warm water after each use and dry fully before it goes back in the case.',
      STROKER_CARE,
    ],
  },
  'fleshlight-quickshot-vantage': {
    start: [
      'Rinse the sleeve if it is new, then let it dry.',
      'Add water-based lube inside the open-ended sleeve and on yourself.',
      'Start slowly. The sleeve is open at both ends, so there is no cap to adjust and the feel is light and easy.',
      'Take it out of the clear case after use so it is simple to rinse and dry.',
    ],
    expect:
      'A light, open feel from a short, easy-to-hold toy. Because both ends are open, it feels different from a closed sleeve with suction control. It also works as extra stimulation during partnered play if you both want that.',
    goodToKnow: [
      'Fleshlight lists the Quickshot series at about 4 inches in length and 4½ inches in girth.',
      'Fleshlight says to rinse the sleeve with warm water after use and recommends its Fleshwash cleaner.',
      'Let it dry completely before returning it to the case.',
    ],
  },
  'fleshlight-pink-lady-stamina-training-unit': {
    start: [
      'Rinse a new sleeve with warm water and let it dry.',
      'Use plenty of water-based lube inside the sleeve and on yourself.',
      'Go slowly and pause whenever the sensation builds, so you can practice staying in control.',
      'Loosen the end cap for less suction if it feels like too much.',
    ],
    expect:
      'An intense texture that is designed for practicing control and pace. Many people find it stronger than a basic sleeve, so start gently. Results vary, and no toy can promise to change how long you last.',
    goodToKnow: [
      'Fleshlight markets this as its best-selling sleeve.',
      'If lasting longer is a persistent worry, a doctor or sex therapist can help.',
      'Rinse with warm water, air dry fully and store it away from direct sunlight.',
      STROKER_CARE,
    ],
  },

  // ---------------------------------------------------------------------------
  // TENGA
  // ---------------------------------------------------------------------------
  'tenga-flip-zero-gravity': {
    start: [
      'Flip the toy open and apply lotion to both halves, covering every detail. TENGA includes two sample pouches of HOLE LOTION.',
      'Close it up and start with slow, smooth strokes.',
      'Add more lotion if it ever feels dry.',
      'After use, open it again and wash it so it is ready next time.',
    ],
    expect:
      'Low-profile internal details that suit long, smooth strokes. This is the manual version, so there is no vibration. TENGA says the white items are standard strength and the black ones use a firmer material for a stronger feel.',
    goodToKnow: [
      'Wash with water and neutral or mild soap only, and avoid alcohol or other cleaners.',
      'Air dry it on the slide arms and make sure it is completely dry before you store it.',
      'TENGA advises against oil-based and silicone lubes.',
    ],
  },
  'tenga-3d-spiral-masturbator': {
    start: [
      'Turn the sleeve inside out so its details are on the inside.',
      'Add lubricant inside the sleeve and around the opening so entry is smooth. TENGA includes a lotion pouch.',
      'Start gently and let the spiral shape guide the pace.',
      'Wash it under running water afterward.',
    ],
    expect:
      'A flexible, sculpted sleeve with spiraling details that feel different from a hard-cased stroker. It is soft and stretchy, so it moves with you. The feel depends on your body and how firmly you hold it.',
    goodToKnow: [
      'Use only neutral or mild soap, and avoid alcohol or other cleaners.',
      'Place it halfway down on the drying stand to air dry, and store it only when fully dry.',
      'Oils and silicone-based lubes can damage the material.',
    ],
  },
  'tenga-flex-silky-white': {
    start: [
      'Lubricate inside the sleeve and around the opening. TENGA includes a lotion sample.',
      'Start with the air hole open for a lighter feel.',
      'To try stronger suction, cover the air hole with a finger while the toy is fully inserted.',
      'Take the sleeve out of the case after use to wash it.',
    ],
    expect:
      'Spiraling ribs with a vacuum-style pull when you cover the air hole. Leaving the hole open feels lighter. TENGA makes four FLEX varieties with different details and firmness, so this is one of several feels.',
    goodToKnow: [
      'TENGA lists the insertion depth at about 16.5 cm and the width at about 6 cm.',
      'Invert the sleeve to wash it, and use the built-in stand to air dry it before storing it.',
      'Use neutral or mild soap and avoid alcohol or other cleaners.',
    ],
  },

  // ---------------------------------------------------------------------------
  // LELO
  // ---------------------------------------------------------------------------
  'lelo-enigma-wave-suction-dual-stimulator': {
    start: [
      'Charge it with the included USB cord, then press + or the power button to turn it on.',
      'Add a little water-based lube to the flexible internal arm.',
      'Insert the arm comfortably and rest the external stimulator on your clitoris.',
      'Start on the lowest setting and move up through the 8 settings as you like.',
    ],
    expect:
      'Three motors working together: a finger-like massage motion inside, plus vibration inside and out. LELO describes the settings as running from a teasing murmur to a satisfying pulse. Everyone responds differently, so go gently at first.',
    goodToKnow: [
      'LELO lists it as 100 percent waterproof and says it runs for up to 2 hours per charge.',
      'It switches off by itself after 20 minutes.',
      'Clean it with warm water and mild soap or a toy cleaner, and use water-based lube.',
    ],
  },
  'lelo-f1s-v3-masturbator': {
    start: [
      'Charge it, then add a generous amount of water-based lube to the inner sleeve. LELO recommends its own personal moisturizer.',
      'Switch it on and slowly insert yourself.',
      'Try the 8 built-in settings, or connect the LELO app if you want the AI mode.',
      'Let the motors do the work. It is designed to feel good with little hand movement.',
    ],
    expect:
      'Sonic pulses around the penis from two synchronized motors, inside a soft silicone sleeve with ribs. With the app connected, the AI mode adjusts the motors to your movement. How strongly you feel it depends on the setting and your body.',
    goodToKnow: [
      'LELO lists it as 100 percent waterproof, and it switches off automatically after 20 minutes.',
      'It comes in a standard size and an XL size.',
      'Water-based lube is best with the silicone sleeve.',
    ],
  },
  'lelo-soraya-2-rechargeable-rabbit-vibrator': {
    start: [
      'Charge it and add a little water-based lube to the internal arm.',
      'Insert the curved arm comfortably and rest the smaller arm against your clitoris.',
      'Press the power button and start on the lowest of the 12 vibration settings.',
      'Move up through the settings and patterns slowly, and stop at any point.',
    ],
    expect:
      'Blended stimulation inside and outside. LELO says the internal arm is broader and thicker than the first SORAYA for firmer pressure. Settings range from a teasing murmur to a strong pulse.',
    goodToKnow: [
      'LELO lists it as 100 percent waterproof, and it switches off after 20 minutes.',
      'It measures about 220 x 76 x 45 mm, with an insertable length of 110 mm.',
      'Use water-based lube and wash it with warm water and mild soap.',
    ],
  },
  'lelo-loki-wave-2-rechargeable-silicone-dual-stimulation-prostate-vibrator': {
    start: [
      'Use plenty of thick water-based lube and take your time to relax.',
      'Slowly insert the tip until it sits comfortably, then turn it on.',
      'Start on a low setting and work up through the 12 settings.',
      'Stop if anything hurts, and adjust your position instead of pushing.',
    ],
    expect:
      'A finger-like, come-hither massage from the WaveMotion tip, with two motors that each drive one massage handle. It can feel unfamiliar at first, and many people find slow, relaxed breathing helps.',
    goodToKnow: [
      'LELO lists it as 100 percent waterproof, with an insertable length of 100 mm.',
      'It switches off by itself after 20 minutes.',
      'Our prostate massage guide covers a gentle first try.',
    ],
  },
  'lelo-tiani-3-rechargeable-dual-stimulation-couples-vibrator-with-remote': {
    start: [
      'Charge the toy, and put two AAA batteries in the remote.',
      'Add water-based lube, then insert the smaller arm and rest the larger arm on your clitoris.',
      'Use the button on the toy, or hand the remote to a partner.',
      'Flick the motion-sensitive remote to change the vibration, and try different patterns.',
    ],
    expect:
      'Shared vibrations from a small, light wearable (about 42 g). The remote responds to movement, so a partner can change the feel with a flick of the wrist. It is gentler than a full-size dual stimulator.',
    goodToKnow: [
      'LELO lists it as 100 percent waterproof (keep the remote away from water).',
      'It measures about 78 x 44.5 x 32 mm.',
      'It switches off automatically after 20 minutes.',
    ],
  },
  'lelo-gigi-3-app-controlled-g-spot-vibrator': {
    start: [
      'Charge it, and download the LELO app if you want the two extra modes.',
      'Add water-based lube to the insertable part.',
      'Insert it comfortably and tilt the handle to press the flat tip against your G-spot.',
      'Start on a low pattern and move through the 8 patterns at your own pace.',
    ],
    expect:
      'Broad, deep pressure from the flattened tip. LELO says the tip can also flip over to be used as a clitoral massager. The app adds two modes called Finish Me Off and Out Of Control.',
    goodToKnow: [
      'LELO lists it as 100 percent waterproof and light, at about 87 g.',
      'It switches off after 20 minutes.',
      'The app is optional. The toy works fully without it.',
    ],
  },
  'lelo-ina-3-rechargeable-dual-stimulator': {
    start: [
      'Charge it, then add water-based lube to the larger arm.',
      'Insert the bigger arm and rest the smaller arm against your clitoris.',
      'Tilt or move the larger arm toward your G-spot, and start on the lowest of the 10 modes.',
      'Explore the patterns and intensities slowly.',
    ],
    expect:
      'Two kinds of vibration at once, inside and outside. LELO says INA 3 has about 30 percent more power than the previous model, so start low and build up.',
    goodToKnow: [
      'LELO lists it as 100 percent waterproof.',
      'It measures about 200 x 65 x 45 mm, with an insertable length of 110 mm.',
      'It switches off automatically after 20 minutes.',
    ],
  },
  'lelo-tor-3-vibrating-cockring': {
    start: [
      'Charge it with the USB cord.',
      'Add water-based lube and slide the ring on gently.',
      'Position it so the thicker, vibrating area faces up and touches your partner during sex.',
      'Turn it on and try the 8 patterns, or pair it with the LELO app for more options.',
    ],
    expect:
      'A snug fit for you and vibration for your partner. It is small and light, and the vibration is felt by both of you during sex. How firm the fit feels depends on your size.',
    goodToKnow: [
      'LELO lists it as 100 percent waterproof, with an internal diameter of about 29 mm.',
      'Take it off if it feels uncomfortable, and do not wear any cock ring for long periods.',
      'It switches off after 20 minutes.',
    ],
  },
  'lelo-elise-2': {
    start: [
      'Charge it, then turn it on and start on a low setting.',
      'Begin externally on your clitoris and find where it feels good.',
      'If you want to try it inside, add water-based lube and go slowly.',
      'Adjust the power and modes with the buttons as you like.',
    ],
    expect:
      'Strong, body-shaking vibration from two powerful motors, one in the base and one in the tip. It is long, sleek and thick, so it has a fuller presence than smaller vibrators.',
    goodToKnow: [
      'LELO lists it as 100 percent waterproof.',
      'It measures about 220 x 42 x 36 mm.',
      'It switches off after 20 minutes.',
    ],
  },
  'lelo-sila-cruise-rechargeable-sonic-clitoral-stimulator': {
    start: [
      'Press the + button to turn it on and start on a low level.',
      'Rest the wide mouth over your clitoral area. Contact does not need to be tight.',
      'Press the second button to cycle through the 8 settings and find your level.',
      'Press a little harder if you want extra power. Cruise Control keeps the pulses steady.',
    ],
    expect:
      'Gentle sonic waves that stimulate without direct contact, spread across a wider area. Many people find that softer than a buzzing vibrator.',
    goodToKnow: [
      'LELO lists it as 100 percent waterproof, and it measures about 80 x 75 x 35 mm.',
      'It switches off after 20 minutes.',
      'A drop of water-based lube can help it feel smoother.',
    ],
  },

  // ---------------------------------------------------------------------------
  // Womanizer
  // ---------------------------------------------------------------------------
  'womanizer-next-duo-rechargeable-silicone-dual-g-spot-clitoral-stimulator': {
    start: [
      'Put a few drops of water-based lube on the vibrating arm and the stimulation head.',
      'Insert the arm, then find your clitoris and adjust the head so it sits comfortably.',
      'Turn it on. The front buttons control the air pulse and the back buttons control the vibration.',
      'Choose a Climax Control level and start both on low. You can change each one on its own.',
    ],
    expect:
      'Air pulses on the clitoris with no direct contact, plus deep, rumbly vibration inside, each adjustable separately. Womanizer describes it as whisper quiet, and the toy only starts when it senses skin contact.',
    goodToKnow: [
      'Womanizer lists 14 air intensities, 14 vibration intensities and 10 patterns.',
      'It is IPX7 waterproof and charges in about 120 minutes with a magnetic cable.',
      'It comes with a five-year warranty.',
    ],
  },
  'womanizer-premium-2-rechargeable-silicone-clitoral-stimulator': {
    start: [
      'Place the head over your clitoris. A drop of water-based lube helps it seal.',
      'Turn it on and start on a low level. Smart Silence means it only runs when it touches skin.',
      'Increase the intensity slowly with the buttons. Air-pulse sensation can build quickly.',
      'Try Autopilot if you want the intensity to change on its own.',
    ],
    expect:
      'Gentle waves of air pressure that stimulate without direct contact. Many people find this softer and easier to build on than vibration. There are 14 levels, from soft to strong.',
    goodToKnow: [
      'Womanizer lists IPX7 waterproofing and up to 240 minutes of runtime.',
      'Two stimulation heads come in the box so you can find the best fit.',
      'Charging takes about 120 minutes.',
    ],
  },
  'womanizer-liberty-2-rechargeable-silicone-clitoral-stimulator': {
    start: [
      'If the travel lock is on, unlock it first (the quick start guide shows how).',
      'Place the head over your clitoris, with a drop of water-based lube if you like.',
      'Turn it on and start on the lowest of the 8 levels.',
      'Move up gradually, and use the travel lock and case when you pack it.',
    ],
    expect:
      'Soft, contactless air pulses in a compact toy. It is a gentle way to try air-pulse stimulation, and the lowest levels are very light.',
    goodToKnow: [
      'Womanizer lists IPX7 waterproofing, a 60-minute charge and 120 minutes of operating time.',
      'It measures about 105 x 50 x 40 mm.',
      'Clean it with a toy cleaner or warm water and antibacterial soap.',
    ],
  },
  'womanizer-enhance-rechargeable-silicone-clitoral-stimulator': {
    start: [
      'Add a little water-based lube to the head so it seals smoothly.',
      'Turn it on and start on a low Pleasure Air level, with the vibration off.',
      'Add the vibration when you want it. The two motors can be used together or separately.',
      'Try the patterns once you know what you like.',
    ],
    expect:
      'Contactless air pulses, plus deep, rumbly vibration if you choose it. Womanizer lists 10 Pleasure Air intensities, 10 vibration intensities and 10 patterns, so there is plenty of room to explore.',
    goodToKnow: [
      'Starting with just the air pulse is a good way to learn the controls.',
      'Water-based lube is safe with silicone.',
    ],
  },
  'womanizer-starlet-3-rechargeable-silicone-clitoral-stimulator': {
    start: [
      'Place the head over your clitoris, with a little water-based lube if you like.',
      'Turn it on and start on the lowest of the 6 levels.',
      'Increase one step at a time, since the sensation can build quickly.',
      'Rinse the head after use and let it dry.',
    ],
    expect:
      'A gentle, contactless air-pulse feel from a compact toy. It is a simple, low-pressure way to see whether you like air-pulse stimulation.',
    goodToKnow: [
      'Womanizer lists IPX7 waterproofing and a 30-minute charge using magnetic pins.',
      'It measures about 117 x 46 x 47 mm and comes with a five-year warranty.',
    ],
  },
  'womanizer-vibe-rechargeable-silicone-clitoral-vibrator': {
    start: [
      'Turn it on and start on a low level. There are 10 intensity levels.',
      'Rest it against your clitoris or vulva, and move it to find what feels good.',
      'Try the three Autopilot modes if you want the rhythm to change for you.',
      'Charge it with the magnetic USB cable when the battery runs low.',
    ],
    expect:
      'Low, rumbly vibration that Womanizer calls UltraWave, from a motor it describes as noiseless. This one touches the skin, unlike the air-pulse toys.',
    goodToKnow: [
      'Womanizer lists IPX7 waterproofing and a 90-minute charge.',
      'It measures about 142 x 47 x 52 mm and comes with a five-year warranty.',
    ],
  },

  // ---------------------------------------------------------------------------
  // We-Vibe
  // ---------------------------------------------------------------------------
  'we-vibe-sync-o-rechargeable-silicone-couples-vibrator-with-remote-control': {
    start: [
      'Charge it by USB, and add water-based lube to the inner arm.',
      'Slide the O-shaped inner arm in, and rest the outer arm against your clitoris.',
      'Use the button on the toy, the remote or the We-Vibe app to start low and change modes.',
      'Wear it hands-free during sex if you want to share the vibration.',
    ],
    expect:
      'Rumbly vibration that stays in place. We-Vibe designed the O-shaped arm to hold it steady, so it works hands-free alone or with a partner. How much a partner feels depends on the setting and fit.',
    goodToKnow: [
      'We-Vibe lists IPX7 waterproofing and a two-year warranty.',
      'It measures about 80 x 44 x 44.5 mm.',
      'The app is optional and lets a partner control it from a distance.',
    ],
  },
  'we-vibe-moxie-wearable-rechargeable-silicone-panty-vibe-clitoral-stimulator-with-remote-control': {
    start: [
      'Charge it, then try it at home first so you know how it feels and sounds.',
      'Place it in your underwear and attach the magnet on the outside to hold it in place.',
      'Use the remote or the We-Vibe app to change the intensity. There are 10 modes.',
      'Build up to wearing it out once you are comfortable.',
    ],
    expect:
      'Soft, rumbly vibration against the clitoris. We-Vibe describes it as whisper quiet. A partner can control it with the remote or the app, in the same room or far away.',
    goodToKnow: [
      'We-Vibe lists up to 2 hours of use and IPX7 waterproofing.',
      'A USB cable is included but the power adapter is not.',
      'The remote is splashproof but not made for submersion.',
    ],
  },
  'we-vibe-melt-2-rechargeable-silicone-couples-vibrator': {
    start: [
      'Press the + button to turn it on.',
      'Comfortably enclose your clitoris with the stimulator head.',
      'Explore the 12 intensity levels with the + and - buttons or the We-Vibe app.',
      'Try the 6 patterns once you know what you like.',
    ],
    expect:
      'Soft waves of air pressure that suck and massage the clitoris without direct contact. It is designed to work with a partner too, and the vibration only starts once it touches skin.',
    goodToKnow: [
      'A USB charging cable is included but the power adapter is not.',
      'We-Vibe backs it with a two-year warranty.',
      'Water-based lube helps it seal and feel smooth.',
    ],
  },
  'we-vibe-nova-2-rechargeable-silicone-rabbit-vibrator': {
    start: [
      'Charge it and add water-based lube.',
      'Insert the internal G-spot stimulator, and rest the external stimulator on your clitoris.',
      'Bend the internal arm to fit your body if it feels better that way.',
      'Start low, and use the buttons or the We-Vibe app to change settings.',
    ],
    expect:
      'Dual stimulation from a flexible rabbit. The external arm flexes so it keeps contact with the clitoris as you move.',
    goodToKnow: [
      'We-Vibe lists IPX7 waterproofing and a two-year warranty.',
      'A 2 mL sample of We-Vibe lube comes in the box.',
      'The app is optional.',
    ],
  },
  'we-vibe-chorus-pro-rechargeable-silicone-couples-vibrator-with-remote-control': {
    start: [
      'Charge the toy and the remote together in the charging case.',
      'Pair them: hold the We-Vibe button on the toy for 5 seconds until it vibrates twice, then hold the button on the remote for 5 or more seconds until the toy vibrates three times.',
      'Add lube to the internal arm, slide it in, and adjust the flexible hinge for comfort.',
      'Use the + and - buttons, or squeeze the remote to raise the vibration.',
    ],
    expect:
      'Shared vibration that responds to how hard the remote is squeezed. The remote buzzes at the same strength as the toy, so the person holding it can feel what the other is feeling. Sensors in the toy also respond to movement.',
    goodToKnow: [
      'In the We-Vibe app you can choose from 3 touch sensitivity modes.',
      'We-Vibe backs it with a two-year warranty.',
      'Water-based lube is safe with the silicone.',
    ],
  },
  'we-vibe-vector-rechargeable-silicone-vibrating-prostate-massager-with-remote-control-1': {
    start: [
      'Use plenty of water-based lube and relax before you start.',
      'Slowly insert the tapered internal arm until it sits comfortably, and adjust it to fit your body.',
      'Rest the flexible external arm toward your perineum.',
      'Turn it on low and use the remote or the We-Vibe app to change the vibration.',
    ],
    expect:
      'Vibration at the prostate and the perineum together. We-Vibe designed the internal arm with a tapered tip and slim neck for comfort. Take it slowly, since it can feel new at first.',
    goodToKnow: [
      'It charges with a magnetic USB cable, and a remote and a lube sample are included.',
      'A case for discreet storage and travel comes with it.',
      'Stop if anything hurts.',
    ],
  },
  'we-vibe-pivot-2-rechargeable-silicone-vibrating-cock-ring': {
    start: [
      'Add a little lube and slip the stretchy ring on gently.',
      'Position it so it touches your partner during sex.',
      'Press the We-Vibe button to turn it on and cycle through the modes.',
      'Use the We-Vibe app if you want more options or to send vibrations to a partner.',
    ],
    expect:
      'Rumbly vibration that both partners can feel, with a soft ring that fits between two bodies. How snug it feels depends on your size.',
    goodToKnow: [
      'We-Vibe lists IPX7 waterproofing and a two-year warranty.',
      'A USB cable is included, but the power adapter is not.',
      'Take it off if it ever feels uncomfortable.',
    ],
  },
  'we-vibe-sync-go-app-control-rechargeable-silicone-couples-vibrator': {
    start: [
      'Apply a little lube to the inner arm and slide it in.',
      'Wear it during sex so both of you can feel the vibration.',
      'Cycle through the modes with the button on the toy, the We-Vibe app or the remote.',
      'Pack it in the travel case when you go away.',
    ],
    expect:
      'Shared, hands-free vibration from a compact C-shaped toy. How much a partner feels depends on the setting and the fit.',
    goodToKnow: [
      'We-Vibe lists IPX7 waterproofing.',
      'It measures about 77 x 30 x 45 mm and comes with a travel case.',
      'The app is optional and works over long distance.',
    ],
  },
  'we-vibe-touch-x-rechargeable-silicone-clitoral-mini-vibrator': {
    start: [
      'Hold it in the palm of your hand and turn it on.',
      'Start on the lowest of the 8 intensity levels.',
      'Move it around your body to find what feels good. It also works as a massager.',
      'Use the 7 modes to change the rhythm when you want something different.',
    ],
    expect:
      'Deep, rumbly vibration that We-Vibe describes as whisper quiet. It is small and soft, and works best on the outside of the body.',
    goodToKnow: [
      'We-Vibe lists up to 2 hours of use and IPX7 waterproofing.',
      'A travel lock keeps it from switching on in a bag, and it unlocks when you recharge it.',
      'A silky pouch comes in the box.',
    ],
  },
  'we-vibe-tango-x-rechargeable-clitoral-mini-bullet-vibrator': {
    start: [
      'Hold the silicone grip in your palm and turn it on.',
      'Rest the tip on your clitoris or another spot you enjoy, and start on a low level.',
      'Explore the 8 intensity levels and 7 modes at your own pace.',
      'Rinse it after use and let it dry.',
    ],
    expect:
      'Focused, powerful vibration from a small bullet. We-Vibe describes it as whisper quiet, and the tip is designed to massage the clitoris.',
    goodToKnow: [
      'We-Vibe lists up to 2 hours of use and IPX7 waterproofing.',
      'A travel lock, a storage pouch and a lube sample come in the box.',
    ],
  },

  // ---------------------------------------------------------------------------
  // Lovense
  // ---------------------------------------------------------------------------
  'lovense-max-2': {
    start: [
      'Put water-based lube on yourself or in the sleeve.',
      'Stroke manually and set your own pace and depth.',
      'Control the vibrations with the buttons, or connect to the Lovense Remote app by Bluetooth.',
      'Charge it between uses. It takes about 100 minutes.',
    ],
    expect:
      'Lovense describes it as an app-controlled stroker that contracts and vibrates as you move. You stay in charge of the stroking. Its loudest setting reaches about 52 dB.',
    goodToKnow: [
      'Lovense lists a battery life of 95 to 215 minutes.',
      'It weighs about 750 g, so it is a heavier toy.',
      'Clean it with Lovense toy cleaner or warm water and soap, and let it dry.',
    ],
  },
  'lovense-edge-2-flexible-prostate-massager-black': {
    start: [
      'Use plenty of water-based lube and relax before inserting.',
      'Start on a low vibration setting.',
      'Adjust the angle of the flexible neck a little at a time until it sits comfortably.',
      'Use the Lovense Remote app to control the two motors separately, or share control with a partner.',
    ],
    expect:
      'Lovense says one motor works on the prostate and another on the perineum, and it is designed to stay in place once adjusted. Start slowly, since prostate play can feel unfamiliar.',
    goodToKnow: [
      'Lovense lists IPX7 waterproofing. Bluetooth can be unstable in water.',
      'Battery life is 65 to 130 minutes, and charging takes about 100 minutes.',
      'Wash with warm water and soap, and dry it before storing.',
    ],
  },
  'lovense-ferri-panty-vibe-pink': {
    start: [
      'Charge it with the magnetic cable. It takes about an hour.',
      'Place it against your body inside your underwear and snap the magnet on the outside.',
      'Try it at home first, using the 7 patterns and 3 intensity levels.',
      'Connect the Lovense Remote app if you want a partner to control it.',
    ],
    expect:
      'Light, discreet external vibration that stays in place, from a toy that weighs only about 35 g. It is made to be worn rather than inserted.',
    goodToKnow: [
      'Lovense lists IPX7 waterproofing and about 195 minutes of battery life.',
      'It works with the app for custom patterns and remote play.',
    ],
  },
  'lovense-gush-2-oscillating-masturbator': {
    start: [
      'Add water-based lube, and choose the band hole that fits you.',
      'Position the toy over the head of the penis, where it feels best.',
      'Turn it on and start with a low level.',
      'Use the Lovense Remote app if you want more control or a partner to join in.',
    ],
    expect:
      'Hands-free vibration and oscillation focused on the head of the penis, rather than the whole length. Where it sits changes how it feels.',
    goodToKnow: [
      'Lovense lists a diameter of about 1.1 to 2.05 inches and a girth of about 3.5 to 6.5 inches for the band.',
      'It charges in about 75 minutes and runs for 70 to 110 minutes, with IPX7 waterproofing.',
      'Gush 2 Motion adds a motion sensor and shares the same fit and battery.',
    ],
  },
  'lovense-domi-2-rechargeable-wand-massager': {
    start: [
      'Charge it first. Lovense says it takes about 2.5 hours.',
      'Start on the lowest level and use it on the outside of the body.',
      'Increase gradually. Intensity runs from very gentle to very strong.',
      'Connect the Lovense Remote app if you want patterns or a partner to control it.',
    ],
    expect:
      'Deep, rumbly vibration spread over a broad area from a small wand with a dual-rotating head. It is easy to hold and move around.',
    goodToKnow: [
      'Lovense lists up to 6 hours of use per charge.',
      'It is IPX6 water-resistant, so rinse it but do not submerge it.',
      'Clean with warm water and mild soap or toy cleaner, and dry it fully.',
    ],
  },
  'lovense-osci-3-rechargeable-silicone-g-spot-vibrator-with-clitoral-stimulator': {
    start: [
      'Turn it off before charging. The magnetic cable takes about 75 minutes.',
      'Add water-based lube and insert the internal arm comfortably.',
      'Use the buttons on the handle, or the Lovense Remote app, to start low and change the vibration.',
      'Rinse and dry it after use.',
    ],
    expect:
      'A rabbit-style toy with a thumping action for the G-spot and clitoris together. You can control it by hand or with the app.',
    goodToKnow: [
      'Lovense lists IPX7 waterproofing. Bluetooth can be unstable in water, so use the handle buttons there.',
      'It weighs about 185 g and has a standby time of up to 120 hours.',
      'Clean it with warm water and soap.',
    ],
  },
}
