import type { ProductCopy } from '@/types/catalog'

/**
 * Original copy for the Lovense catalog, keyed by Lovense handle. Specs are
 * kept general and attributed to Lovense where given; check lovense.com before
 * adding numbers.
 */

const APP = {
  q: 'Do I need the app?',
  a: 'You can use the button on the toy for basic settings. The free Lovense Remote app unlocks custom patterns, music and sound modes, and lets a partner control it from the same room or from anywhere.',
}

const LONG_DISTANCE = {
  q: 'Can a partner control it from far away?',
  a: 'Yes. Pair the toy with the Lovense Remote app on your phone, then invite your partner in the app. They can take control over the internet, with chat and video calls in the same app.',
}

const WATER_LUBE = {
  q: 'What lube should I use with it?',
  a: 'A water-based lube. Silicone lube can wear down silicone toys over time, while water-based lube is gentle on the material and rinses off easily.',
}

const CLEANING = {
  q: 'How do I clean it?',
  a: 'Wash it with warm water and mild soap or a toy cleaner after each use, let it dry fully, and store it somewhere clean. Keep the charging port dry.',
}

const STROKER_CARE = {
  q: 'How do I clean the sleeve?',
  a: 'Remove the sleeve, rinse it with warm water, let it air dry fully and dust it with a little cornstarch if it starts to feel tacky. Keep water away from the motor unit.',
}

export const LOVENSE_PRODUCT_COPY: Record<string, ProductCopy> = {
  'lovense-lush-4': {
    summary:
      'The newest version of Lovense’s best-known toy: a wearable egg vibrator you or a partner control from a phone, whether you are in the same room or miles apart.',
    body: [
      'Lush sits inside against the G-spot while a flexible antenna stays outside, so it can be worn hands-free during a date, a video call or partnered sex. Lush 4 keeps the shape people already like and refines the motor and connection.',
      'It is the toy most people picture when they think of long-distance play, and it is also a strong solo pick if you like rumbly internal vibration and want hundreds of patterns to explore.',
    ],
    bestFor: 'Couples, long-distance partners and anyone who wants a wearable G-spot vibrator.',
    pros: ['Hands-free and easy to wear', 'Strong long-distance app control', 'Body-safe silicone, waterproof'],
    cons: ['Internal use only, no clitoral arm', 'Most features need the app'],
    faqs: [LONG_DISTANCE, APP, WATER_LUBE],
  },
  'lovense-ambi': {
    summary:
      'A small, rounded bullet vibrator for focused clitoral stimulation, with the option to hand the controls to a partner through the Lovense app.',
    body: [
      'Ambi is one of the simplest ways into Lovense. The ball-shaped tip gives targeted vibration on the clitoris, nipples or anywhere else that likes a gentle buzz, and the slim body is easy to hold or slip between bodies during sex.',
      'It is also one of the most affordable Lovense toys, which makes it a low-risk first try at app-controlled play.',
    ],
    bestFor: 'First-time buyers and anyone who wants a discreet external vibrator.',
    pros: ['Small and easy to hold', 'Focused tip for precise stimulation', 'Low price for a Lovense toy'],
    cons: ['External use only', 'Less rumbly than larger toys'],
    faqs: [APP, CLEANING],
  },
  'lovense-exomoon': {
    summary:
      'A lipstick-shaped bullet vibrator that looks like a beauty product in a bag, with app control for solo play or a partner.',
    body: [
      'Exomoon keeps things discreet. Its lipstick shape is easy to carry and store, and its tapered tip suits clitoral and nipple play. Pair it with the Lovense Remote app for patterns, or let a partner take control.',
    ],
    bestFor: 'Travelers and anyone who wants a toy that looks like anything but a toy.',
    pros: ['Very discreet design', 'Easy to pack', 'App control for partners'],
    cons: ['External use only', 'Small motor compared with wands'],
    faqs: [APP, CLEANING],
  },
  'lovense-domi-domi-2-male-attachment': {
    summary:
      'A soft stroker cup that fits over the head of a Lovense Domi or Domi 2 wand, turning its strong vibration into a toy for penis owners.',
    body: [
      'Wands are known for deep, rumbly vibration, and this attachment lets him enjoy it too. Slip it onto the wand head, add water-based lube, and the cup holds the vibration around the head of the penis.',
    ],
    bestFor: 'Domi or Domi 2 owners who want to share the wand with a partner.',
    pros: ['Gets more use from a wand you already own', 'Low price', 'Easy to rinse'],
    cons: ['Fits Domi and Domi 2 only', 'Needs the wand to work'],
    faqs: [WATER_LUBE, CLEANING],
  },
  'lovense-flexer': {
    summary:
      'A wearable panty vibrator with an internal arm and an external pad, so it can stimulate the G-spot and clitoris at once while a partner holds the controls.',
    body: [
      'Flexer is made for playful days out and date nights. The flexible body bends to fit, a magnet keeps it in place in your underwear, and the app lets a partner tease you from across the table or across the world.',
    ],
    bestFor: 'Couples who enjoy remote teasing and want both internal and external sensation.',
    pros: ['Dual stimulation', 'Wearable under clothes', 'Partner control near or far'],
    cons: ['Fit varies with body shape', 'Most fun features need the app'],
    faqs: [LONG_DISTANCE, WATER_LUBE],
  },
  'lovense-tenera-2': {
    summary:
      'A clitoral suction toy that uses gentle air pulses instead of direct vibration, with Lovense app control for patterns and partner play.',
    body: [
      'Suction toys create a pulsing, pressure-like sensation that many people find easier to enjoy than direct buzzing. Tenera 2 places a soft opening around the clitoris and lets you build intensity slowly.',
      'Because it pairs with the Lovense Remote app, it is also one of the few suction toys a partner can control from afar.',
    ],
    bestFor: 'People who find vibration too direct and want a softer path to orgasm.',
    pros: ['Air-pulse suction feels gentle and indirect', 'App and partner control', 'Soft opening fits around the clitoris'],
    cons: ['Needs a good seal to work well', 'External use only'],
    faqs: [
      {
        q: 'How is suction different from vibration?',
        a: 'Instead of buzzing against the skin, the toy pushes and draws air in pulses around the clitoris. It feels more like pressure than vibration, and many people find it less numbing.',
      },
      APP,
      WATER_LUBE,
    ],
  },
  'lovense-fizz-dual-head-clitoral-vibrator': {
    summary:
      'A dual-head clitoral toy that pairs suction with a tapping head, for people who like to mix sensations or switch between them.',
    body: [
      'Fizz gives you two kinds of external stimulation in one toy. Use the suction end for gentle, pressure-like pulses, switch to the tapping end for a more defined rhythm, and control both through the Lovense app if you want patterns or a partner at the controls.',
    ],
    bestFor: 'Clitoral toy fans who want variety in one device.',
    pros: ['Two sensations in one toy', 'App and partner control', 'Compact for a dual toy'],
    cons: ['External use only', 'More settings to learn'],
    faqs: [APP, WATER_LUBE],
  },
  'lovense-hyphy': {
    summary:
      'A dual-ended vibrator with a high-frequency tip on one end and a broader, rumbly head on the other, for clitoral play solo or with a partner.',
    body: [
      'Hyphy lets you choose your intensity by flipping the toy over. The fine tip gives fast, buzzy, focused stimulation, while the wider end spreads deeper vibration. Both work with the Lovense Remote app.',
    ],
    bestFor: 'People who like strong external vibration and want two feels in one toy.',
    pros: ['Two heads for two sensations', 'Strong, high-frequency option', 'App control'],
    cons: ['External use only', 'Can feel intense at first'],
    faqs: [APP, CLEANING],
  },
  'lovense-dolce': {
    summary:
      'An adjustable dual vibrator that fits during sex, with one arm inside and one on the clitoris, controlled from your phone or a partner’s.',
    body: [
      'Dolce is made for couples. The adjustable bridge lets you set the angle so it stays comfortable during penetration, and both of you feel the vibration. It works just as well solo for blended G-spot and clitoral stimulation.',
    ],
    bestFor: 'Couples who want a toy that fits during sex.',
    pros: ['Adjustable fit', 'Stimulates G-spot and clitoris together', 'Partner and long-distance control'],
    cons: ['Takes a little adjusting to find your fit', 'Best features need the app'],
    faqs: [LONG_DISTANCE, WATER_LUBE],
  },
  'lovense-nora': {
    summary:
      'A rabbit vibrator with a rotating head and a vibrating clitoral arm, paired with the Lovense app for partner and long-distance play.',
    body: [
      'Nora combines internal rotation with external vibration, which many people find more satisfying than vibration alone. The app lets you set each motor separately, sync to music or hand control to a partner, and it is often paired with the Max 2 stroker so both partners feel each other’s movements.',
    ],
    bestFor: 'Rabbit fans and long-distance couples, especially with Max 2.',
    pros: ['Rotating head plus clitoral vibration', 'Pairs with Max 2 for interactive play', 'Separate control of each motor'],
    cons: ['Larger than a basic rabbit', 'Rotation is louder than vibration alone'],
    faqs: [LONG_DISTANCE, APP, WATER_LUBE],
  },
  'lovense-velvo-rotating-rabbit-vibrator-app-controlled-silicone-dual-stimulator': {
    summary:
      'A rabbit vibrator with a rolling bead section inside and a clitoral arm outside, for layered G-spot and clitoral sensation with app control.',
    body: [
      'Velvo adds movement to the classic rabbit. Beads in the shaft roll against the inner walls while the external arm vibrates on the clitoris, and the Lovense app lets you shape both or share control.',
    ],
    bestFor: 'Experienced rabbit users who want more texture and motion.',
    pros: ['Rolling beads add a distinct sensation', 'Dual stimulation', 'App and partner control'],
    cons: ['Bigger than beginner toys', 'More features than a first-timer may need'],
    faqs: [APP, WATER_LUBE],
  },
  'lovense-vulse': {
    summary:
      'A hands-free thrusting egg vibrator that moves on its own against the G-spot, controlled from the Lovense app.',
    body: [
      'Most eggs only vibrate. Vulse adds a thrusting motion, so it delivers a tapping, pulsing feel without you moving it. That makes it a good fit for hands-free solo play or for a partner who wants to take over from the app.',
    ],
    bestFor: 'People who like internal stimulation and want motion without effort.',
    pros: ['Thrusting motion, not just vibration', 'Hands-free', 'Partner control near or far'],
    cons: ['Thrusting is louder than plain vibration', 'Internal use only'],
    faqs: [LONG_DISTANCE, WATER_LUBE],
  },
  'lovense-gravity': {
    summary:
      'A thrusting, vibrating dildo you can use by hand or mount for hands-free play, with app control for patterns and partners.',
    body: [
      'Gravity does the work for you. It thrusts and vibrates at once, so it can recreate the feel of penetration without arm fatigue. Use the app to set the speed, run patterns or let a partner take over.',
    ],
    bestFor: 'People who want realistic motion without a full sex machine.',
    pros: ['Thrusting plus vibration', 'Hands-free friendly', 'App and partner control'],
    cons: ['Louder than a vibrator', 'Larger to store'],
    faqs: [APP, WATER_LUBE],
  },
  'lovense-spinel-app-controlled-thrusting-vibrating-heating-dildo': {
    summary:
      'A fast thrusting dildo that also vibrates and warms, made for people who want strong, hands-free sensation with app control.',
    body: [
      'Spinel is Lovense’s high-speed thrusting option. It is a step up in intensity from vibration-only toys, and the warming feature takes the chill off silicone for a more natural feel. Control it on the toy, in the app or through a partner.',
    ],
    bestFor: 'Experienced users who want strong, fast thrusting.',
    pros: ['High-speed thrusting', 'Warming for a more natural feel', 'App and partner control'],
    cons: ['Intense for beginners', 'Louder than a standard vibrator'],
    faqs: [APP, WATER_LUBE],
  },
  'lovense-lapis': {
    summary:
      'A strapless strap-on with a bulb worn inside the wearer and a shaft for their partner, both vibrating so you each feel it.',
    body: [
      'Lapis lets the person wearing it feel the vibration too. The shorter end sits inside the wearer while the longer shaft is used on a partner, and the Lovense app lets either of you set the intensity. Pair it with the Lovense Harness for extra stability.',
    ],
    bestFor: 'Couples exploring strap-on play who want shared sensation.',
    pros: ['Both partners feel the vibration', 'No harness required', 'App control'],
    cons: ['Takes practice to keep in place', 'Harness sold separately'],
    faqs: [
      {
        q: 'Do I need a harness?',
        a: 'No, it is designed to be worn strapless. Many people add the Lovense Harness for more stability, especially at first.',
      },
      WATER_LUBE,
    ],
  },
  'lovense-strapless-harness-for-lapis-adjustable-o-ring-support-harness': {
    summary:
      'An adjustable harness made for the Lovense Lapis, adding support so the strapless strap-on stays steady during sex.',
    body: [
      'Strapless toys rely on the wearer’s muscles to stay in place, which takes practice. This harness holds Lapis securely with an O-ring and adjustable straps, so you can relax and focus on your partner.',
    ],
    bestFor: 'Lapis owners who want more stability.',
    pros: ['Adds stability to Lapis', 'Adjustable fit', 'Low price'],
    cons: ['Made for Lapis specifically', 'Not a standalone toy'],
    faqs: [
      {
        q: 'Will it fit other dildos?',
        a: 'It is designed around Lapis. Other toys with a similar base may fit the O-ring, but check the sizing first.',
      },
    ],
  },
  'lovense-mini-sex-machine': {
    summary:
      'A compact thrusting machine with app control, for people who want hands-free penetration without the size of a full sex machine.',
    body: [
      'The Mini Sex Machine brings machine-style thrusting to a smaller footprint. It is easier to store and set up than a full-size machine, and the Lovense app lets you control speed and patterns or hand control to a partner.',
    ],
    bestFor: 'Curious first-time machine buyers and smaller spaces.',
    pros: ['Hands-free thrusting', 'Smaller and easier to store', 'App and partner control'],
    cons: ['Less power and reach than the full machine', 'Needs space to set up'],
    faqs: [APP, WATER_LUBE],
  },
  'lovense-sex-machine': {
    summary:
      'Lovense’s full-size thrusting sex machine with adjustable speed and angle, controlled from the device, a remote or the Lovense app.',
    body: [
      'A sex machine handles the motion so you can relax completely. This one pairs strong, steady thrusting with app control, so you can set your own rhythm, run patterns or let a partner take charge from anywhere.',
    ],
    bestFor: 'Experienced users and couples who want powerful hands-free thrusting.',
    pros: ['Powerful, consistent thrusting', 'Adjustable setup', 'App and partner control'],
    cons: ['Large and premium-priced', 'Needs space and a little setup'],
    faqs: [
      {
        q: 'Can I use other dildos with it?',
        a: 'Lovense designs the machine around its own attachments. Check the connector on any other toy before buying.',
      },
      LONG_DISTANCE,
    ],
  },
  'lovense-hush-2': {
    summary:
      'An app-controlled vibrating butt plug in several sizes, made to be worn for longer and controlled by you or a partner.',
    body: [
      'Hush 2 has a tapered tip for easy insertion and a flared base for safety, with a flexible antenna that keeps the connection steady. Choose the size that suits your experience, add plenty of lube and let the app or a partner set the vibration.',
    ],
    bestFor: 'Anal play beginners and partners who enjoy remote control.',
    pros: ['Multiple sizes', 'Wearable for longer play', 'Partner control near or far'],
    cons: ['Pick your size carefully', 'Needs the app for remote play'],
    faqs: [
      {
        q: 'Which size should I choose?',
        a: 'If you are new to anal play, start with the smallest size. You can always size up later, and plenty of lube makes any size more comfortable.',
      },
      WATER_LUBE,
    ],
  },
  'lovense-glint': {
    summary:
      'A small vibrating butt plug that reacts to touch, with app control so you or a partner can set the vibration.',
    body: [
      'Glint is one of Lovense’s newest anal toys. It is sized for comfort, with a flared base for safety, and its touch-responsive feature lets the vibration respond to contact. Pair it with the Lovense Remote app for patterns or long-distance play.',
    ],
    bestFor: 'Beginners and couples who want a small, app-controlled plug.',
    pros: ['Small, beginner-friendly size', 'Touch-responsive vibration', 'App and partner control'],
    cons: ['Newer model with fewer reviews', 'Internal use only'],
    faqs: [WATER_LUBE, CLEANING],
  },
  'lovense-lush-anal-app-controlled-vibrating-plug-light-up-silicone-remote-toy': {
    summary:
      'A Lush-style vibrating plug designed for anal play, with a flared base and the same app control as the original Lush.',
    body: [
      'Lush Anal brings Lush’s strong, rumbly vibration to a toy designed for anal use, with a shape and base that are safe to wear. It works with the Lovense Remote app, so a partner can control it from anywhere.',
    ],
    bestFor: 'Lush fans who want an anal-safe version.',
    pros: ['Anal-safe flared base', 'Strong vibration', 'Long-distance app control'],
    cons: ['Larger than beginner plugs', 'Needs plenty of lube'],
    faqs: [LONG_DISTANCE, WATER_LUBE],
  },
  'lovense-ridge': {
    summary:
      'Vibrating, rotating anal beads with app control, for people who enjoy the feel of graduated beads with added motion.',
    body: [
      'Ridge pairs graduated beads with vibration and rotation, so you can go slowly and explore sensation at your own pace. The flexible body follows your shape, and the app lets you or a partner control the motion.',
    ],
    bestFor: 'People who enjoy anal beads and want more sensation.',
    pros: ['Vibration plus rotation', 'Graduated beads for a gradual start', 'App control'],
    cons: ['Not the smallest starter toy', 'Needs plenty of lube'],
    faqs: [WATER_LUBE, CLEANING],
  },
  'lovense-diamo': {
    summary:
      'A vibrating cock ring that helps him stay firm while sending vibration to both partners, with app control near or far.',
    body: [
      'Diamo sits at the base of the penis, where a snug fit can help erections feel firmer and last longer. The vibration reaches the clitoris during sex, so both of you feel it, and the app lets either partner set the intensity.',
    ],
    bestFor: 'Couples who want a shared toy during sex.',
    pros: ['Both partners feel it', 'Stretchy, comfortable fit', 'App and long-distance control'],
    cons: ['Fit depends on size', 'Do not wear for more than about 30 minutes at a time'],
    faqs: [
      {
        q: 'How long can I wear a cock ring?',
        a: 'Most guidance suggests no longer than 20 to 30 minutes at a time. Take it off straight away if you feel numbness, coldness or pain.',
      },
      WATER_LUBE,
    ],
  },
  'lovense-gemini': {
    summary:
      'App-controlled vibrating nipple clamps with adjustable pressure, for sensation play that a partner can control.',
    body: [
      'Gemini adds vibration to classic clamps. Adjust the grip to a level that feels good, then let the app or a partner control the buzz. They also work as small clitoral clamps for adventurous play.',
    ],
    bestFor: 'Couples exploring light sensation and kink play.',
    pros: ['Adjustable pressure', 'Vibration adds a new sensation', 'Partner control'],
    cons: ['Clamps are not for everyone', 'Start gentle and build up'],
    faqs: [
      {
        q: 'Do they hurt?',
        a: 'They should not. Start with the lightest pressure and adjust slowly. Take them off if anything feels sharp or numb.',
      },
      APP,
    ],
  },
  'lovense-calor': {
    summary:
      'A vibrating pocket stroker with a depth sensor, so the toy responds to movement and a partner can feel it through a paired Lovense toy.',
    body: [
      'Calor is a vibrating stroker with a twist: it senses how deep you go and can share that with a partner’s toy. On its own, it gives a soft, textured sleeve with vibration for solo play.',
    ],
    bestFor: 'Long-distance couples and solo users who want a vibrating stroker.',
    pros: ['Depth-sensing interactive play', 'Vibration plus a soft sleeve', 'Works with partner toys'],
    cons: ['Interactive features need the app', 'Sleeve needs regular care'],
    faqs: [LONG_DISTANCE, STROKER_CARE],
  },
  'lovense-gush-2-motion': {
    summary:
      'A hands-free penis vibrator that wraps around the shaft and responds to motion, with app control for solo or partner play.',
    body: [
      'Gush 2 Motion is different from a standard stroker. It wraps around the penis and delivers broad vibration without needing to move, and its motion-sensing control lets a partner steer the intensity with gestures. Many people pair it with Edge 2.',
    ],
    bestFor: 'People who want hands-free stimulation without a sleeve.',
    pros: ['Hands-free', 'Motion-sensing control', 'Easy to clean'],
    cons: ['Different feel from a sleeve stroker', 'Best features need the app'],
    faqs: [APP, WATER_LUBE],
  },
  'lovense-solace': {
    summary:
      'An automatic thrusting stroker that does the work for you, with app control and the option to sync with a partner’s toy or video.',
    body: [
      'Solace moves the sleeve up and down on its own, so you can lie back and enjoy it. Set the speed and stroke length in the app, pair it with a partner’s Lovense toy for interactive play, or mount it for completely hands-free use.',
    ],
    bestFor: 'People who want automatic stroking at a mid-range price.',
    pros: ['Hands-free thrusting', 'Adjustable speed and stroke', 'Interactive with partner toys'],
    cons: ['Louder than a manual stroker', 'Bigger to store'],
    faqs: [LONG_DISTANCE, STROKER_CARE],
  },
  'lovense-solace-pro': {
    summary:
      'Lovense’s most advanced automatic stroker, with smoother thrusting, more control over stroke length and AI-powered sync features.',
    body: [
      'Solace Pro builds on Solace with more refined motion and smarter features in the app, including syncing to content and partners. It is aimed at people who already know they enjoy automatic toys and want the most realistic experience Lovense offers.',
    ],
    bestFor: 'Experienced users who want the top automatic stroker.',
    pros: ['Smooth, realistic thrusting', 'Detailed stroke control', 'Sync with partners and content'],
    cons: ['Premium price', 'Larger device'],
    faqs: [LONG_DISTANCE, STROKER_CARE],
  },
  'lovense-kraken': {
    summary:
      'A simple, low-cost manual pocket stroker with a textured inner sleeve, an easy first stroker or a travel backup.',
    body: [
      'Kraken has no motor or app, which keeps it small, quiet and very affordable. Add water-based lube and enjoy the textured channel, then rinse and dry it for next time.',
    ],
    bestFor: 'First-time stroker buyers and travelers.',
    pros: ['Very affordable', 'Silent and compact', 'Easy to clean'],
    cons: ['No vibration or app control', 'Manual use only'],
    faqs: [WATER_LUBE, STROKER_CARE],
  },
  'lovense-water-based-lubricant': {
    summary:
      'Lovense’s own water-based lube, safe with silicone toys and easy to rinse off, in a 100 ml bottle.',
    body: [
      'Water-based lube is the safest all-rounder for toys. It keeps silicone in good condition, feels smooth and washes away with water, so it is a sensible addition to any Lovense order.',
    ],
    bestFor: 'Anyone buying a silicone toy.',
    pros: ['Safe with silicone toys', 'Rinses off easily', 'Low price'],
    cons: ['Needs reapplying more often than silicone lube', 'Not ideal in water'],
    faqs: [
      {
        q: 'Is it safe with condoms?',
        a: 'Water-based lubes are generally safe with latex and polyurethane condoms. Check the label for any specific advice.',
      },
    ],
  },
  'lovense-personal-lubricant-jelly': {
    summary:
      'A thicker, jelly-style water-based lube from Lovense, for longer-lasting glide that stays put.',
    body: [
      'A jelly texture clings better than a thin liquid lube, which many people prefer for anal play and for toys that stay inside for a while. It is water-based, so it stays safe with silicone and rinses away easily.',
    ],
    bestFor: 'Anal play and longer sessions.',
    pros: ['Thicker texture stays in place', 'Safe with silicone toys', 'Rinses off easily'],
    cons: ['Can feel heavy for some uses', 'Small bottle'],
    faqs: [WATER_LUBE],
  },
  'lovense-toy-cleaner': {
    summary: 'A spray cleaner for toys, so you can freshen up silicone and stroker sleeves quickly after use.',
    body: [
      'Spray, wipe or rinse, then let the toy dry. A dedicated cleaner is gentler on toy materials than many household soaps and is quick to use when you are tired.',
    ],
    bestFor: 'Anyone who wants an easy cleaning routine.',
    pros: ['Quick to use', 'Gentle on toy materials', 'Low price'],
    cons: ['Still needs a rinse and dry for porous sleeves', 'Not a disinfectant for shared toys'],
    faqs: [CLEANING],
  },
  'lovense-webcam-2': {
    summary:
      'A Lovense webcam built for cam models and live streamers, designed to work with Lovense toys and streaming tools.',
    body: [
      'Webcam 2 is aimed at creators who stream with interactive toys. It connects with Lovense’s streaming software, so tips and toy reactions stay in sync with your stream.',
    ],
    bestFor: 'Cam models and adult content creators who use Lovense toys.',
    pros: ['Built for streaming', 'Works with Lovense creator tools', 'Simple setup'],
    cons: ['Niche product for creators', 'A general webcam may suit non-streamers'],
    faqs: [
      {
        q: 'Do I need a Lovense toy to use it?',
        a: 'No, it works as a webcam on its own. It is most useful alongside Lovense toys and streaming software.',
      },
    ],
  },
}
