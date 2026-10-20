/** Below-the-grid copy, H1s and FAQs for category hubs and collections. Keyed "hub:<slug>" or "shop:<slug>". */
export interface ListingExtra {
  /** Keyword-led H1 that matches the page's title intent, Title Case, under 60 characters. */
  h1: string
  /** 2-3 short paragraphs, 150-250 words total, original copy. Plain text, no Markdown. */
  body: string[]
  /** 3-5 questions shoppers actually search, each answer 40-80 words. */
  faqs: { q: string; a: string }[]
}

export const LISTING_EXTRAS: Record<string, ListingExtra> = {
  // ---------------------------------------------------------------------------
  // Category hubs
  // ---------------------------------------------------------------------------
  'hub:vibrators': {
    h1: 'Vibrators: Wands, Rabbits & Bullets Compared',
    body: [
      "Most vibrators fall into a handful of families. Bullets and eggs are small and focused, wands are large and rumbly, rabbits pair an internal shaft with an external arm, and air-pulse toys use pressure waves instead of direct vibration. Knowing which family suits you narrows the field quickly, because the differences between brands within one type are usually smaller than the differences between types.",
      "Pay attention to how a toy vibrates as well as how hard. Deep, rumbly motors feel stronger at lower settings and spread sensation, while buzzy motors feel sharper and more surface-level. Rechargeable models with a travel lock are the most practical for everyday use, and a waterproof rating means you can rinse the whole toy under the tap.",
      "For care, wash silicone toys with warm water and a mild, unscented soap after each use, let them air dry, and store them apart from other toys. If you share a home and value privacy, check the noise level in the product details and choose a model that comes with a soft pouch.",
    ],
    faqs: [
      {
        q: 'What type of vibrator is best for beginners?',
        a: 'A small clitoral vibrator or a compact wand is the easiest place to start, since most people find external stimulation more reliable than internal. Look for a few intensity levels, simple buttons and body-safe silicone. Rechargeable models cost a little more but save money on batteries and tend to have better motors, which helps if you are still learning what you like.',
      },
      {
        q: 'How loud are vibrators?',
        a: 'Most modern rechargeable vibrators are quiet enough not to be heard through a closed door on low settings, though higher settings and larger wands are noticeably louder. Noise also depends on the surface: a toy resting against a bed frame or table carries sound further. Using it under a blanket or with music playing is usually enough for privacy.',
      },
      {
        q: 'What lube is safe with silicone toys?',
        a: 'Water-based lube is safe with every silicone toy and easy to wash off. Silicone lube can bond with some silicone surfaces and leave them tacky or pitted over time, so most makers advise against it unless they say otherwise. If you want to try a silicone or hybrid lube, test a small dab on the base of the toy first and check it the next day.',
      },
      {
        q: 'Can you put a vibrator in water?',
        a: 'Only if it is labelled waterproof or submersible, often shown as an IPX7 rating. Splash-proof toys can be rinsed but should not go in the bath. Make sure any charging port cover is closed before it gets wet, and remember that water washes lube away, so you may need to reapply more often when using a toy in the bath or shower.',
      },
    ],
  },

  'hub:strokers': {
    h1: 'Strokers & Masturbators: Sleeves, Cups & Automatics',
    body: [
      'Strokers sort into three practical groups. Single-use or limited-use cups are inexpensive and a low-commitment way to find out which textures you like. Reusable sleeves in a hard case give suction control and a consistent feel over many sessions. Automatic strokers add a motor for thrusting, squeezing or rotation, and some sync with apps or video content.',
      'Inside, the sleeve material is usually TPE or a similar soft elastomer. It feels lifelike but is porous, so it needs more care than a silicone toy. Rinse with warm water straight after use, turn the sleeve inside out if the design allows, and let it dry completely before you put it away. A light dusting of cornstarch or a renewing powder keeps the surface from turning tacky.',
      'Tightness is the other big variable. Tighter canals feel more intense but need more lube, and open-ended designs are easier to clean than closed ones. If you are buying a first stroker, a mid-range texture and a reusable design give you the clearest sense of what to look for next time.',
    ],
    faqs: [
      {
        q: 'What lube should I use with a stroker?',
        a: 'Use water-based lube with almost every stroker. Silicone and oil-based lubes can break down TPE and similar sleeve materials, leaving them sticky or damaged. A slightly thicker water-based formula lasts longer inside a sleeve. Warming the stroker in a sink of warm water for a few minutes before use, with the case closed, also makes the first moments feel more natural.',
      },
      {
        q: 'How do you clean a Fleshlight or stroker sleeve?',
        a: 'Remove the sleeve from its case, rinse it with warm water while gently flushing the canal, and avoid harsh soaps that can dry the material. Shake out excess water, then let it air dry fully, ideally upright with both ends open. Store it out of direct sunlight once it is dry, and add a little renewing powder if it starts to feel tacky.',
      },
      {
        q: 'Are automatic strokers worth it?',
        a: 'They suit people who want hands-free sensation, have limited hand mobility, or enjoy syncing with interactive content. The trade-offs are size, noise, charging and more parts to clean. If you have never used a manual sleeve, try one first so you know which textures and tightness you prefer, then look for an automatic model with a removable, washable sleeve.',
      },
    ],
  },

  'hub:dildos': {
    h1: 'Dildos: Realistic, Silicone & Glass Options Compared',
    body: [
      'A dildo is the simplest toy in the drawer, which is exactly why material and shape deserve attention. Platinum-cured silicone is the most popular choice because it is non-porous, warms to body temperature and comes in every firmness from squishy to rigid. Glass and stainless steel are completely non-porous, hold temperature well for warm or cool play, and feel firm and smooth.',
      'Shape decides where a dildo is felt. A straight shaft gives even pressure, a gentle curve targets the G-spot or prostate, and a tapered tip makes insertion easier. Realistic styles add veining and a defined head for texture, while fantasy and abstract designs explore shapes nature never offered. A suction cup holds on smooth tile or glass, and a flared base is what makes a dildo harness-compatible and safe for anal use.',
      'Clean silicone, glass and steel dildos with warm water and mild soap. Solid silicone, glass and steel pieces without electronics can also be boiled for a few minutes if the maker allows it. Pair silicone with water-based lube; glass and metal work with any lube.',
    ],
    faqs: [
      {
        q: 'What size dildo should a beginner get?',
        a: 'Start with something around the width of two fingers and a modest insertable length, then size up only if you want to. Width affects comfort far more than length. A tapered tip and a slightly flexible body make the first few sessions easier, and plenty of water-based lube matters as much as the size you choose.',
      },
      {
        q: 'Is silicone or glass better for a dildo?',
        a: 'Both are body-safe and non-porous. Silicone has more give and feels closer to skin, and it comes in soft, dual-density and firm options. Glass is rigid, very smooth and can be warmed or cooled in water for temperature play. Glass works with any lube; silicone is best with water-based lube. Choose by the feel you want rather than by safety.',
      },
      {
        q: 'Can you use a suction cup dildo in the shower?',
        a: 'Yes, on a smooth, non-porous surface such as tile, glass or a sealed shower wall. Grout lines and textured surfaces break the seal. Wet the cup, press it firmly in place and test the hold before you put weight on it. Water rinses lube away quickly, so a long-lasting water-based formula and frequent reapplying help.',
      },
    ],
  },

  'hub:anal-toys': {
    h1: 'Anal Toys: Butt Plugs, Beads & Training Kits',
    body: [
      'The anus does not lubricate itself and the muscles around it need time to relax, so anal toys are designed differently from other toys. A flared base keeps a plug or beads from travelling too far, a tapered tip eases insertion, and a narrow neck lets the muscles close comfortably around a plug once it is in place. Body-safe silicone, glass and stainless steel are the best materials because they are non-porous and easy to clean thoroughly.',
      'Go slowly and let comfort lead. Warm up with a finger or the smallest toy, breathe out as you insert, and stop if anything feels sharp or painful. Avoid numbing lubes and desensitizing sprays, since discomfort is a useful signal to slow down. Thicker lube cushions better and lasts longer than thin formulas.',
      'Wash anal toys with warm water and mild soap straight after use and keep them separate from toys used vaginally. If you want to move a toy from anal to vaginal use, wash it thoroughly first or cover it with a fresh condom.',
    ],
    faqs: [
      {
        q: 'What size butt plug should a beginner use?',
        a: 'Choose the smallest plug in a range or a training kit with graduated sizes. A beginner plug is usually no wider than a finger or two at its widest point. A soft, slightly flexible silicone plug is more forgiving than glass or metal at first. Use plenty of thick water-based lube and wear it for short periods before trying longer sessions.',
      },
      {
        q: 'How long can you wear a butt plug?',
        a: 'For most people, a few minutes up to half an hour is comfortable at first. Remove it if you feel numbness, pain or cramping, and take a break before trying again. Longer wear is something to build toward gradually with a well-fitted plug. Reapply lube if the plug starts to feel dry or tugs on the way out.',
      },
      {
        q: 'What lube is best for anal play?',
        a: 'A thick water-based lube is the safest all-round choice and works with every toy material. Silicone lube lasts longer and is popular for anal sex with condoms or with glass and metal toys, but it is best avoided with silicone toys. Skip numbing formulas, and avoid oil-based lubes with latex condoms. Reapply often, since the body absorbs water-based lube over time.',
      },
      {
        q: 'Are anal beads good for beginners?',
        a: 'Graduated beads are a gentle way to start because the first beads are small and you control how many you use. Choose one-piece silicone beads rather than beads on a string, since a string is harder to clean. A sturdy retrieval ring is essential. Remove them slowly with plenty of lube, and never use any anal toy without a flared base or ring.',
      },
    ],
  },

  'hub:prostate-massagers': {
    h1: 'Prostate Massagers: Hands-Free & Vibrating Options',
    body: [
      'The prostate sits a few inches inside the rectum on the front wall, toward the belly, and responds to firm, steady pressure rather than speed. Prostate massagers are curved to reach it, with a flared base and often a second arm that presses on the perineum, the area between the scrotum and anus. That outside contact is part of the sensation, so fit matters as much as shape.',
      'Classic hands-free designs pivot as the pelvic floor tightens and relaxes, so the experience develops over several sessions as you learn what works. Vibrating and remote-controlled models give more immediate feedback and suit people who want sensation without the learning curve. Some add rotating or come-hither motion for a stronger massage.',
      'Preparation helps. Go to the bathroom beforehand, shower, trim your nails if you plan to warm up with a finger, and use a generous amount of thick water-based lube. Wash the toy in warm, soapy water afterwards and let it dry before storing.',
    ],
    faqs: [
      {
        q: 'Is prostate massage safe?',
        a: 'For most healthy adults it is safe when you use a toy designed for it, go slowly and use plenty of lube. Stop if you feel sharp pain, and never force pressure. If you have hemorrhoids, recent surgery, a prostate condition or any bleeding, speak to a doctor first. A flared base is essential, since it keeps the toy from slipping too far inside.',
      },
      {
        q: 'How do I use a prostate massager for the first time?',
        a: 'Relax first, perhaps after a warm shower, and lie on your side with knees bent. Apply lube to the toy and yourself, then insert slowly while breathing out. Let the toy settle before adding movement or vibration. Gently clenching and releasing the pelvic floor moves a hands-free toy. Expect early sessions to be about getting comfortable rather than reaching orgasm.',
      },
      {
        q: 'Are vibrating prostate massagers better for beginners?',
        a: 'Many people find them easier, because vibration gives clear sensation straight away and does not depend on learning muscle control. A remote also lets you adjust settings without reaching behind you. Classic hands-free designs reward patience and can feel intense over time. Starting with a slim vibrating model is a sensible route if you are unsure which style you prefer.',
      },
    ],
  },

  'hub:penis-rings': {
    h1: 'Penis Rings: Stretchy, Adjustable & Vibrating Picks',
    body: [
      'A penis ring sits at the base of the shaft, sometimes behind the scrotum as well, and slows blood flow out of the penis. That can make an erection feel firmer and last a little longer, and many people simply enjoy the snug sensation. Rings vary in stretch, from soft silicone loops that roll on easily to adjustable straps and firmer designs suited to experienced users.',
      'Fit is everything. A ring should feel snug but never painful, and you should be able to remove it quickly at any point. If your skin turns cold, numb or very dark, take it off straight away. Trimming hair at the base makes rings more comfortable and stops them from pulling.',
      "Vibrating rings place a small motor above the shaft so it rests against a partner's clitoris during penetration, which makes them one of the easiest couples toys to add. Clean rings with warm water and mild soap, use a little water-based lube when putting one on, and replace stretchy rings when they lose elasticity or show tears.",
    ],
    faqs: [
      {
        q: 'Are cock rings safe to use?',
        a: 'Yes, when used correctly. Choose a stretchy or adjustable ring, wear it for no longer than the maker recommends, and remove it straight away if you notice pain, numbness or a cold or bluish color. Avoid rigid rings until you know your size. If you take blood thinners or have circulation problems, check with a doctor before using one.',
      },
      {
        q: 'How do I know what size penis ring to get?',
        a: 'Stretchy silicone rings fit a wide range of sizes and are the easiest choice when you are unsure. For adjustable or rigid rings, measure the circumference around the base of a flaccid or partly erect penis with a soft tape or a strip of paper. A ring should sit snugly without digging in, and it should come off without a struggle.',
      },
      {
        q: 'Do vibrating cock rings help both partners?',
        a: "They are designed to. The ring supports firmness for the wearer, while the vibrating section rests against the partner's clitoris or perineum during penetration. Positions where bodies stay close, such as missionary or partner on top, give the most contact. Turning the ring so the motor points down toward the testicles adds sensation for the wearer instead.",
      },
    ],
  },

  'hub:penis-pumps': {
    h1: 'Penis Pumps: Water, Air & Automatic Pumps Compared',
    body: [
      'A penis pump is a clear cylinder that seals against the body and uses vacuum to draw blood into the penis. The effect is a temporary fullness and firmness, and some people pair a pump with a penis ring to hold the result during sex. Pumps do not permanently change size, so it helps to treat them as a pleasure and confidence tool rather than a long-term fix.',
      'There are three common styles. Hand pumps use a squeeze bulb or trigger and give fine control. Water pumps work with warm water in the shower or bath, which many people find more comfortable. Automatic pumps handle the suction at the press of a button and often include preset levels and a release valve.',
      'Comfort comes from a good seal and modest pressure. Trim hair at the base, use a little water-based lube around the opening, and release the vacuum if you feel pain, tingling or numbness. Sessions are short, typically a matter of minutes. Rinse the cylinder in warm, soapy water and let it dry fully between uses.',
    ],
    faqs: [
      {
        q: 'Do penis pumps actually work?',
        a: 'A pump reliably creates a temporary erection or fuller look by drawing blood into the penis, which is why vacuum devices are sometimes suggested for erectile difficulties. The effect fades after the vacuum is released unless a ring is used. They do not create a permanent size increase. If you have ongoing erectile concerns, it is worth talking to a doctor as well.',
      },
      {
        q: 'Are penis pumps safe?',
        a: 'They are safe for most adults when used gently and for short sessions. Use a model with a quick-release valve or pressure gauge, never pump to the point of pain, and stop if you feel numbness or see small red spots under the skin. People who take blood thinners or have blood disorders should speak to a doctor before using a pump.',
      },
      {
        q: 'What size penis pump cylinder do I need?',
        a: 'Measure your erect length and girth. The cylinder should be a little longer than your length and wide enough to leave some room around the shaft, without being so wide that it struggles to hold suction. Too narrow can pinch, and too wide makes a seal harder to achieve. Most brands publish a size chart, so compare your measurements before buying.',
      },
    ],
  },

  'hub:strap-ons': {
    h1: 'Strap-Ons & Harnesses: Kits, Fit & Pegging Basics',
    body: [
      'A strap-on has two parts: a harness that holds a dildo at the pelvis, and the dildo itself. The harness decides how secure and comfortable it feels. Jock and brief styles sit like underwear, two-strap designs give a firmer hold, and adjustable buckles let one harness fit more than one body. Many harnesses take interchangeable O-rings so you can match the ring to the base of the dildo.',
      'The dildo should have a flared base wide enough to sit in the ring without slipping through. For partners new to receiving, especially for pegging, a slim, smooth dildo with a slight curve is kinder than a large or heavily textured one. Strapless designs have a bulb that the wearer holds internally and suit people who want a closer, more connected feel, though they take practice.',
      'Use plenty of water-based lube with silicone dildos, take your time and agree on how you will communicate during sex. Clean the dildo after each use, and hand wash fabric harnesses or follow the care label so straps and elastic last.',
    ],
    faqs: [
      {
        q: 'What is the best strap-on for beginners?',
        a: 'An adjustable underwear-style or two-strap harness paired with a slim silicone dildo is the easiest start. Kits that bundle both remove the guesswork of matching ring size to base. Look for soft straps, a secure buckle and a dildo with a flared base. Strapless designs and very large dildos are better saved for later, once you know what feels good.',
      },
      {
        q: 'How do you put on a strap-on harness?',
        a: 'Fit the dildo through the O-ring first, then step into the harness like underwear and tighten the straps until the base sits snugly against the pubic bone. It should not shift when you move your hips. Some people wear snug underwear underneath for comfort. Check the fit before adding lube, since slippery hands make buckles harder to adjust.',
      },
      {
        q: 'How do you prepare for pegging?',
        a: 'Talk beforehand about boundaries, pace and a way to pause. The receiving partner may like to use the bathroom and shower first. Warm up with fingers or a small toy, use lots of thick water-based lube, and go slowly, with the giving partner following cues. Start with a slim dildo and treat the first time as exploration rather than a goal.',
      },
    ],
  },

  'hub:bdsm': {
    h1: 'BDSM & Bondage Gear: Restraints, Impact & Starter Kits',
    body: [
      'BDSM covers a wide range of play, from light restraint and blindfolds to impact and sensation play. What it all shares is negotiation. Before anything begins, talk about what each person wants, what is off the table and how to stop. A safe word or a simple traffic-light system makes it easy to slow down or end a scene without confusion.',
      'Gear choice follows the same principle. Soft cuffs with Velcro or quick-release buckles are kinder than metal for beginners, and they spread pressure across the wrist. Never put anything around the neck, avoid tight restraint over joints or the inside of the wrist where nerves sit close to the surface, and never leave a restrained person alone. Keep safety shears within reach whenever rope or tape is involved.',
      'For impact toys, start with a broad paddle or soft flogger on fleshy areas like the buttocks and thighs, away from the spine and kidneys. Clean leather with a suitable leather cleaner, wipe silicone and metal with warm soapy water, and check restraints regularly for wear. Aftercare, such as water, a blanket and a chat about how it went, matters as much as the scene itself.',
    ],
    faqs: [
      {
        q: 'What do you need to start BDSM?',
        a: 'Very little. A blindfold, a pair of soft cuffs and a feather or tickler are enough for a first session, and beginner kits bundle these together. More important than gear is an agreed safe word, a conversation about limits and a plan for checking in. Build from there based on what you both enjoyed, rather than buying everything at once.',
      },
      {
        q: 'What is a safe word in BDSM?',
        a: 'A safe word is a word both partners agree will stop play immediately, chosen because it would never come up naturally in a scene. Many people also use a traffic-light system: green means keep going, yellow means slow down or check in, and red means stop. If someone cannot speak, agree on a non-verbal signal such as dropping an object.',
      },
      {
        q: 'Are handcuffs safe for beginners?',
        a: 'Metal handcuffs can pinch nerves and bruise wrists, especially if someone pulls against them. Padded or fabric cuffs with quick-release fastenings are a safer start and are easier to remove in a hurry. Leave room for a finger between cuff and skin, check hands for coldness or tingling, and never leave someone restrained alone, even briefly.',
      },
    ],
  },

  'hub:lubricants': {
    h1: 'Lube Guide: Water, Silicone, Hybrid & Anal Formulas',
    body: [
      'Lube reduces friction, which makes sex and toy play more comfortable and helps prevent small tears. The base ingredient decides almost everything else. Water-based lube is the most versatile: it is safe with condoms and every toy material, washes off easily and is the default choice for silicone toys. It does absorb over time, so plan to reapply.',
      'Silicone lube stays slippery much longer, holds up in water and needs only a small amount, which makes it popular for shower sex and anal play with condoms. Hybrids blend water and silicone for a creamy feel with more staying power. Oil-based products, including coconut oil, feel luxurious for massage but break down latex condoms and can damage TPE and some other toy materials.',
      'If you have sensitive skin or are prone to irritation, look for formulas without glycerin, parabens, fragrance or warming and tingling additives, and patch test anything new on your inner arm. Thicker gels suit anal play, while thinner liquids feel closer to natural lubrication. Flavored lubes are best kept for oral and external use.',
    ],
    faqs: [
      {
        q: 'Can you use silicone lube with silicone toys?',
        a: "It is usually best not to. Silicone lube can react with the surface of some silicone toys, leaving them tacky or rough, and that damage cannot be reversed. Water-based lube is the safe choice. If you prefer silicone lube's glide, test a small amount on the base of the toy, wait a day and check for changes before using it more widely.",
      },
      {
        q: 'Is water-based or silicone lube better?',
        a: 'Neither is better in every situation. Water-based lube works with all toys and condoms, cleans up with water and suits everyday use. Silicone lube lasts longer, works in water and needs less reapplying, but it can stain fabrics and is not ideal with silicone toys. Many people keep one of each and choose based on the toy and the setting.',
      },
      {
        q: 'Is lube safe with condoms?',
        a: 'Water-based and silicone-based lubes are both safe with latex and polyisoprene condoms. Oil-based products, including lotions, petroleum jelly and coconut oil, weaken latex and raise the risk of breakage. Polyurethane condoms tolerate oil, but it is simpler to stick with water or silicone. A little lube on the outside of a condom also reduces friction and the chance of tearing.',
      },
      {
        q: 'What is the best lube for sensitive skin?',
        a: 'Look for a short ingredient list with no fragrance, flavoring, warming agents or numbing ingredients. Some people react to glycerin or parabens, so formulas without them are a good starting point. Silicone lubes tend to be gentle on skin because they are not absorbed. Patch test on your inner arm first, and stop using any product that stings or itches.',
      },
    ],
  },

  'hub:couples': {
    h1: 'Couples Toys: Wearables, Rings & Long-Distance Picks',
    body: [
      'A good couples toy adds to what you already do together rather than taking over. Wearables sit inside and against the clitoris and stay in place during penetration, vibrating rings add sensation for both partners, and app-connected toys hand the controls to whoever is holding the phone. Each suits a slightly different relationship, so it helps to think about when and where you would actually use it.',
      "For use during sex, look for a slim profile, flexible silicone and a remote that does not need fumbling with. For play apart, check that the app is well reviewed on your phone's platform, supports control over the internet rather than Bluetooth range alone, and offers privacy settings you are comfortable with. Battery life matters for long-distance sessions.",
      'Introducing a toy goes better as a conversation than a surprise. Shop together, start with something small and choose a toy that adds sensation for both of you. Water-based lube is safest with silicone wearables, and a quick wash in warm, soapy water after use keeps them ready for next time.',
    ],
    faqs: [
      {
        q: 'How do you introduce a sex toy to a relationship?',
        a: 'Bring it up outside the bedroom, in a relaxed moment, and frame it as something to try together rather than a fix. Browsing options together lets both people have a say. A small vibrator or vibrating ring is a gentle first step. Agree that either of you can pause or set it aside, and talk afterwards about what you liked.',
      },
      {
        q: 'Do long-distance sex toys work over the internet?',
        a: 'App-connected toys from brands such as Lovense and We-Vibe let a partner control vibration over the internet, often alongside chat or video in the same app. The toy connects to a nearby phone by Bluetooth, and the app relays commands. A stable connection on both ends and a charged toy make the experience much smoother. Check app compatibility before buying.',
      },
      {
        q: 'What is the best couples toy for beginners?',
        a: 'A vibrating penis ring or a small wearable is usually the easiest start, since both add sensation without changing much about how you already have sex. They are compact, simple to use and less intimidating than larger toys. Choose rechargeable silicone with a few clear settings, and try it during foreplay first to see how it feels.',
      },
    ],
  },

  'hub:sex-dolls': {
    h1: 'Sex Dolls: Realistic & Inflatable Love Dolls Compared',
    body: [
      'Dolls range from lightweight inflatables to realistic full-body and torso designs, and the practical differences are larger than the visual ones. Full-size realistic dolls can be heavy, and moving, positioning and storing them takes planning. Torsos and partial-body designs offer a similar feel with far less weight, which makes them a sensible middle ground for many buyers.',
      'Material shapes the care routine. TPE is soft and lifelike but porous, so it needs washing after every use, careful drying and occasional powdering to stop the surface from turning sticky. Silicone dolls are less porous, more heat tolerant and easier to keep clean, though they usually cost more. Use water-based lube with both materials, since oils can damage them.',
      'Plan for storage before you buy. A storage box, a hanging kit or a dedicated cover protects the surface and keeps a doll out of sight. Avoid direct sunlight and dark, dyed fabrics, which can stain TPE, and check how the merchant packages deliveries if discretion matters to you.',
    ],
    faqs: [
      {
        q: 'How do you clean a TPE sex doll?',
        a: 'Wash any openings straight after use with warm water and a mild, unscented soap, using an irrigation bulb for internal areas if you have one. Pat the surface dry with a lint-free towel and let internal areas air dry fully. Once dry, a light dusting of cornstarch or renewal powder restores the soft finish. Never use alcohol or harsh cleaners.',
      },
      {
        q: 'Is TPE or silicone better for a sex doll?',
        a: 'TPE feels softer and more flesh-like and usually costs less, but it is porous and needs more careful cleaning, drying and powdering. Silicone is firmer, less porous, more durable and easier to sanitize, and it resists staining better. If low maintenance matters most, silicone is easier to live with. If softness and price matter most, TPE is the usual choice.',
      },
      {
        q: 'How do you store a sex doll discreetly?',
        a: 'Most people use a lockable storage box, a hanging kit inside a wardrobe or a padded bag under the bed. Store the doll clean and fully dry, away from heat and direct sunlight, and avoid leaving it pressed against hard edges, which can mark soft materials. A loose, light-colored cover protects the surface from dye transfer.',
      },
    ],
  },

  'hub:lingerie': {
    h1: 'Sexy Lingerie: Bodysuits, Sets & Bodystockings',
    body: [
      'Lingerie works best when it fits the body you have today. Bodystockings and stretch mesh adapt to many shapes, bodysuits give a smooth line in one garment, and two-piece sets let you choose different sizes for top and bottom. Babydolls and chemises are relaxed and forgiving, while corsets and bustiers shape the waist but need careful sizing.',
      'Comfort decides whether a piece actually gets worn. Look at underwire, strap adjustability and whether the gusset is lined. Open-crotch and cupless styles are designed for play, and garters are easier to manage when they detach. If you are buying as a gift, a stretchy bodystocking, a robe or a babydoll is safer than structured pieces that rely on exact measurements.',
      'Hand wash lace and mesh in cool water with a gentle detergent, skip the dryer and lay pieces flat to dry. Avoid fabric softener on elastic, and store delicate items away from Velcro and hooks that can snag them.',
    ],
    faqs: [
      {
        q: 'How should lingerie fit?',
        a: 'Lingerie should feel secure without digging in. Straps should stay on the shoulders without leaving marks, bands should sit level, and leg openings should not cut into the skin. Stretch fabrics can be worn a little closer to the body, while corsets and structured bras need accurate measurements. If you fall between sizes, the larger size is usually more comfortable in stretch lace.',
      },
      {
        q: 'What lingerie is best for a gift?',
        a: 'Pieces with stretch and a forgiving fit are the safest choice when you do not know exact measurements. Bodystockings, babydolls, chemises and robes fit a wider range of bodies than bras or corsets. Classic colors such as black, red or ivory suit most people. Include a gift receipt where possible, and check the return policy for intimate apparel before ordering.',
      },
      {
        q: 'How do you wash lingerie?',
        a: 'Hand wash in cool water with a mild detergent made for delicates, then rinse well and press out water gently without wringing. Lay the piece flat or hang it to air dry away from direct heat. If you use a machine, put items in a mesh laundry bag on a cold, gentle cycle with hooks fastened, and skip the tumble dryer entirely.',
      },
    ],
  },

  'hub:sex-machines-furniture': {
    h1: 'Sex Machines, Swings & Positioning Furniture',
    body: [
      'This category covers two different jobs. Sex machines provide steady, motorized thrusting, usually through a fitting that accepts compatible dildos, so you can enjoy a rhythm that is hard to keep up by hand. Swings, slings, wedges and cushions support the body so that positions which strain the back, knees or arms become comfortable and easy to hold.',
      'With a machine, safety starts with control. Begin at the lowest speed and shortest stroke, keep the remote or power switch within easy reach, and position the machine so you can move away from it at any time. Use a body-safe silicone attachment with plenty of water-based lube, and clean the attachment and mounting point after each session.',
      'For furniture, check the rated weight limit, the materials and how the piece is supported. Door swings rely on a solid door and frame, ceiling mounts need a secure joist, and freestanding frames need floor space. Wedges and ramps need no setup at all and work well for anyone with joint pain or limited mobility. Wipe-clean or removable, washable covers make care much easier.',
    ],
    faqs: [
      {
        q: 'Are sex machines safe to use?',
        a: 'They are safe when you start slowly and stay in control. Use the lowest speed and shortest stroke at first, keep the remote within reach, and position the machine so you can pull away easily. Choose a body-safe attachment with a flared base, use plenty of lube and stop if anything feels sore. Never combine a machine with restraints when you are alone.',
      },
      {
        q: 'How do you install a door sex swing?',
        a: "Most door swings hang from straps anchored by padded bars that sit over the top of a closed, solid door. Close and lock the door so it cannot open, check that the door and hinges are sturdy, and test the swing with your hands before sitting in it. Follow the maker's weight limit, and set the strap height before anyone gets in.",
      },
      {
        q: 'What is a sex wedge used for?',
        a: 'A wedge is a firm foam cushion that raises the hips or supports the back, changing the angle of penetration and taking strain off the body. It makes positions like missionary and rear entry more comfortable and can help people with back or knee pain. Many wedges have a washable cover, and some include a slot that holds a toy in place.',
      },
    ],
  },

  'hub:more-toys': {
    h1: 'Toy Cleaners, Storage, Games & Accessories',
    body: [
      'The small extras are what keep a collection in good shape. A dedicated toy cleaner or a mild, unscented soap removes residue without harming silicone, and a fragrance-free spray is handy when a toy cannot go under the tap. Avoid alcohol, bleach and household cleaners, which can dry out or damage toy surfaces and irritate skin.',
      'Storage matters more than most people expect. Keep toys in separate breathable pouches so different materials do not touch, since some soft materials can react with each other over time. A lockable case is useful in shared homes, and a soft pouch makes travel easier. Remove batteries or turn on the travel lock before packing a vibrator.',
      'Games, massage products and novelty items are an easy way to change the mood without a big commitment, and they make good add-on gifts. Spare chargers, adapters and replacement sleeves can extend the life of a favorite toy, so check that any accessory lists your specific model before buying.',
    ],
    faqs: [
      {
        q: 'How do you clean sex toys properly?',
        a: 'Wash toys after every use with warm water and a mild, unscented soap or a toy cleaner, paying attention to seams and buttons. Rinse well and let them air dry before storing. Waterproof toys can be rinsed fully; others should be wiped with a damp cloth. Solid silicone, glass and stainless steel without motors can usually be boiled if the maker allows it.',
      },
      {
        q: 'How should you store sex toys?',
        a: 'Store toys clean and fully dry in individual cloth or satin pouches, away from heat and direct sunlight. Keeping them separate stops lint from sticking and prevents some soft materials from reacting when they touch. A lockable box adds privacy at home. Top up rechargeable toys every few months if they go unused, since a fully drained battery can wear out faster.',
      },
      {
        q: 'Can you use antibacterial soap on sex toys?',
        a: 'Mild antibacterial soap is generally fine on non-porous materials such as silicone, glass and steel, but strong or scented soaps can leave residue that irritates sensitive skin, so rinse thoroughly. Porous materials such as TPE need gentler care with warm water and a cleaner made for them. Never use bleach or alcohol unless the maker specifically recommends it.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Collections
  // ---------------------------------------------------------------------------
  'shop:sex-toys-for-women': {
    h1: 'Sex Toys for Women: Vibrators, Suction & G-Spot Toys',
    body: [
      'The most useful way to shop is by where you want sensation. External toys such as bullets, wands, lay-on vibrators and air-pulse stimulators focus on the clitoris and vulva. Internal toys such as G-spot vibrators and dildos reach inside, and dual-stimulation rabbits do both at once. Many people find external stimulation the most reliable route to orgasm, which is why clitoral toys tend to anchor a first collection.',
      'After type, think about intensity and feel. Rumbly motors spread sensation and feel deeper, buzzy motors feel sharper, and air-pulse toys feel indirect, which suits people who find vibration too intense. A range of settings gives room to explore, and a waterproof, rechargeable design is the most practical for regular use.',
      'Body-safe silicone is the material to look for. It is non-porous, easy to clean with warm water and mild soap, and works with water-based lube. If you share a home, check noise levels and whether the toy has a travel lock so it cannot switch on in a bag.',
    ],
    faqs: [
      {
        q: 'What is a good first sex toy for women?',
        a: 'A small clitoral vibrator or air-pulse toy is a common and sensible first choice because it focuses on external stimulation, which many people enjoy most. Look for body-safe silicone, a few intensity settings, simple controls and a rechargeable battery. A compact size is less intimidating and easier to bring into partnered sex later if you choose to.',
      },
      {
        q: 'Are air-pulse toys better than vibrators?',
        a: 'Neither is better for everyone. Air-pulse toys use rhythmic pressure waves around the clitoris and feel less direct, which suits people who find vibration numbing or too intense. Vibrators come in a wider range of shapes and uses, including internal play. If you are unsure, an air-pulse toy for external play and a small vibrator for everything else covers most preferences.',
      },
      {
        q: 'Can vibrators cause numbness?',
        a: 'Strong vibration can leave the area feeling temporarily less sensitive, much like holding a buzzing phone for a long time. The feeling fades with rest and is not a lasting change. Lower intensity settings, breaks between sessions, a layer of fabric between toy and skin, or switching to air-pulse stimulation can all help if you notice it.',
      },
    ],
  },

  'shop:sex-toys-for-men': {
    h1: 'Sex Toys for Men: Strokers, Rings & Prostate Toys',
    body: [
      'Toys for men fall into a few clear groups. Strokers and masturbation sleeves replace your hand with texture and suction. Penis rings and pumps focus on firmness and sensation during solo or partnered sex. Prostate massagers explore internal sensation, and vibrating options across all three add intensity. Choosing the group first makes the rest of the decision far easier.',
      'Material and care deserve attention. Most stroker sleeves are made from soft TPE or similar materials that feel lifelike but are porous, so they need thorough rinsing, complete drying and water-based lube only. Rings and prostate toys are usually silicone, which is easier to clean and lasts longer. Keep oil-based products away from sleeves and latex condoms.',
      'Discretion is often a priority. Compact cups and eggs are easy to tuck away, cased sleeves look unremarkable on a shelf, and quiet motors matter if you share walls. If you are buying for the first time, a reusable stroker or a stretchy vibrating ring is a dependable starting point.',
    ],
    faqs: [
      {
        q: 'What is a good first sex toy for men?',
        a: 'A reusable manual stroker is the easiest starting point because it is simple to use, needs no charging and shows you which textures and tightness you enjoy. A stretchy silicone penis ring is another low-commitment option. Whichever you choose, pick up a water-based lube at the same time, since it is essential with most stroker materials.',
      },
      {
        q: 'Are prostate toys only for gay men?',
        a: 'No. Prostate stimulation is about anatomy, not orientation, and people of every sexuality enjoy it, alone or with a partner. The prostate is sensitive for many people who have one, and prostate massagers are designed to reach it safely with a curved shape and flared base. Starting slowly with a slim model and plenty of lube is the best approach.',
      },
      {
        q: 'How do you keep sex toys discreet?',
        a: "Choose compact designs, store toys in a plain pouch or lockable box, and pick quiet, rechargeable models with a travel lock. Clean and dry toys fully before putting them away so there is no odor. When ordering, check the merchant's packaging and billing details in its shipping information if you want deliveries to look unremarkable.",
      },
    ],
  },

  'shop:couples-sex-toys': {
    h1: 'Couples Sex Toys: Wearables, Rings & Remote Toys',
    body: [
      'Couples toys are built to fit into sex rather than replace part of it. The main styles are wearable vibrators that sit inside and against the clitoris at the same time, vibrating rings worn by a partner with a penis, panty vibes and remote eggs for play outside the bedroom, and app-connected toys that can be controlled from across the room or another city.',
      'Think about how you have sex now. If you mostly have penetrative sex, a wearable or vibrating ring adds sensation without changing positions. If you enjoy teasing and anticipation, a remote toy gives one partner the controls. For couples who spend time apart, app control and a video call turn distance into something to play with.',
      'Practical details matter for shared toys. Flexible silicone adapts to different bodies, a slim profile stays out of the way, and long battery life avoids interruptions. Use water-based lube with silicone wearables, clean toys after each use and charge them before a date night so the toy is ready when you are.',
    ],
    faqs: [
      {
        q: 'What is the best sex toy for couples to use together?',
        a: 'There is no single best toy, but wearable couples vibrators and vibrating penis rings are the most popular because they work during penetration without getting in the way. They add clitoral stimulation for one partner and gentle vibration for the other. Choose flexible silicone, simple controls and a remote or app so neither of you has to stop to adjust settings.',
      },
      {
        q: 'Are couples vibrators comfortable during sex?',
        a: 'Well-designed wearables are slim and flexible enough that most couples barely notice them during penetration, though fit varies with anatomy. Adjustable or bendable designs adapt better. Use plenty of water-based lube, start in positions where bodies stay close, and reposition the toy if it slips. Trying it during foreplay first helps you find the best placement.',
      },
      {
        q: 'How do remote control vibrators work?',
        a: 'A remote vibrator pairs with a small handheld remote using radio or Bluetooth, which typically works within a room or a short distance. App-controlled models connect to a phone by Bluetooth, and many apps also let a partner control the toy over the internet from anywhere. Range and features vary, so check the product details for the connection type.',
      },
    ],
  },

  'shop:app-controlled-sex-toys': {
    h1: 'App-Controlled Sex Toys for Solo & Long-Distance Play',
    body: [
      'App-connected toys pair with your phone over Bluetooth, then use the app for custom vibration patterns, music or sound reactivity, and remote control by a partner. Most apps can relay control over the internet, so the person holding the phone does not need to be in the same building. Popular styles include wearable vibrators, panty vibes, rabbits, plugs, strokers and prostate toys.',
      'The app is half of the product, so it deserves as much attention as the toy. Check that it supports your phone and operating system version, read recent reviews about connection stability, and look at which permissions it asks for. Privacy options such as using the toy locally without an account, or sharing control through a link you can revoke, are worth looking for.',
      'For long-distance sessions, keep both phones charged, stay on a stable Wi-Fi connection and test the pairing before you plan anything. A Bluetooth toy still needs to be near its own phone. Care is the same as any silicone toy: warm soapy water, water-based lube and a full charge before use.',
    ],
    faqs: [
      {
        q: 'Are app-controlled sex toys safe to use?',
        a: 'Physically they are as safe as any body-safe silicone toy. For privacy, use a strong password, keep the app updated, and review what data it collects and which permissions it requests. Choose brands with a clear privacy policy and, where possible, the option to control the toy without an account. Share control only with people you trust.',
      },
      {
        q: 'Can someone control my vibrator from far away?',
        a: 'Yes, if the toy and app support remote control over the internet. The toy connects to your phone by Bluetooth, and your partner sends commands through the same app on their own phone from anywhere with a data or Wi-Fi connection. You decide who gets access, and you can usually end a session from your phone at any time.',
      },
      {
        q: 'Do app-controlled toys work without the app?',
        a: 'Most have buttons on the toy for power and basic intensity changes, so they still work as a regular vibrator when your phone is out of reach. Custom patterns, music sync and partner control need the app. Check the product details before buying, since a few toys rely heavily on the app and offer little more than a power button.',
      },
    ],
  },

  'shop:rabbit-vibrators': {
    h1: 'Rabbit Vibrators for Dual Stimulation Compared',
    body: [
      'A rabbit vibrator is designed to stimulate inside and outside at once, with a shaft for the G-spot and an external arm for the clitoris. The appeal is blended sensation from a single toy, and the main challenge is fit. Bodies vary in the distance between the vaginal opening and the clitoris, so an arm that bends or adjusts gives you a much better chance of both parts landing where you want them.',
      'Modern rabbits come in several styles. Classic rabbits vibrate along the shaft and arm, often with separate motors you can control independently. Some swap the external arm for air-pulse suction, and others add thrusting, rotation or a come-hither motion to the shaft. Separate controls let you tune each area rather than settling for one setting.',
      'Body-safe silicone with smooth seams is the most comfortable and the easiest to clean around the arm, where residue tends to collect. Pair silicone with water-based lube, wash with warm water and mild soap, and choose a waterproof model if you would like to use it in the bath or shower.',
    ],
    faqs: [
      {
        q: 'Are rabbit vibrators good for beginners?',
        a: 'They can be, as long as you choose a modest size and a flexible clitoral arm. Some beginners find dual stimulation a lot at once, so separate motor controls are helpful. If you are new to internal play, a small rabbit or a clitoral vibrator may be a gentler first step. Plenty of water-based lube makes insertion more comfortable.',
      },
      {
        q: 'How do you use a rabbit vibrator?',
        a: 'Start with foreplay or external stimulation, then apply water-based lube to the shaft and insert it slowly with the vibration on low. Adjust the angle until the arm rests against the clitoris, then raise the intensity of each motor separately. Many people find it easiest lying back with knees bent. Move the toy gently rather than thrusting hard.',
      },
      {
        q: 'Why does my rabbit vibrator not fit right?',
        a: 'The distance between the vaginal opening and the clitoris varies a lot between bodies, so a fixed arm may sit too high or too low. Try changing the insertion depth or angle, or switch positions. If it still misses, a rabbit with a flexible or adjustable arm, or a separate clitoral toy paired with a G-spot vibrator, will work better.',
      },
    ],
  },

  'shop:wand-vibrators': {
    h1: 'Wand Vibrators: Powerful Massagers Compared',
    body: [
      'Wand vibrators have a large rounded head on a handle, which makes them easy to hold and spreads strong vibration across the whole vulva or a sore muscle. Many people prefer their deep, rumbly feel to the sharper buzz of small vibrators. Wands are used externally, and the broad head means you do not need precise placement to feel them.',
      'The main choices are corded or rechargeable, head size and how firm or flexible the neck is. Corded wands deliver consistent power without battery worries but keep you near an outlet. Rechargeable wands are cordless and travel well. A flexible neck lets the head follow the body, and attachments can turn a wand into a G-spot or penis massager.',
      'Wands can be loud and intense, so start on the lowest setting and work up. A layer of fabric between the head and your skin softens strong models. Most wand heads are silicone, so clean them with warm, soapy water and pair them with water-based lube. Check whether the model is waterproof before rinsing the whole toy.',
    ],
    faqs: [
      {
        q: 'Are wand vibrators too strong for beginners?',
        a: 'Some are very powerful, but most have multiple settings and the lowest is usually gentle. Starting on low, using it over underwear or a towel and moving the head around rather than holding it in one spot all help. A compact or mini wand offers the same broad feel with less intensity and is an easy first choice for many people.',
      },
      {
        q: 'Can you use a wand vibrator internally?',
        a: 'Not on its own. The head is too large and there is no flared base, so a wand is designed for external use only. Some brands sell silicone attachments that fit over the head and add a curved insertable tip for G-spot play, or a cup shape for use on a penis. Only use attachments made for your specific wand.',
      },
      {
        q: 'Is a corded or cordless wand better?',
        a: 'A corded wand gives steady power for as long as you like and never needs charging, which suits long sessions and massage. A cordless wand is more convenient, easier to use in different positions and portable. Most people find cordless models more practical for everyday use, while corded wands appeal to those who want maximum consistency and never want to wait on a charge.',
      },
    ],
  },

  'shop:clitoral-vibrators': {
    h1: 'Clitoral Vibrators & Air-Pulse Suction Toys',
    body: [
      'The clitoris has thousands of nerve endings concentrated in a small external area, with much more of its structure extending inside the body. Clitoral toys focus on that external tip and the surrounding area, using vibration, air pulses or both. Lay-on vibrators rest under the palm, bullets and pinpoint vibes give precise contact, and air-pulse toys surround the clitoris with a soft opening.',
      'Air-pulse and suction toys feel different from vibration. Rather than buzzing, they create rhythmic changes in pressure without direct contact, which many people describe as more indirect and sometimes quicker to build. Vibrators offer more variety in shape and allow broad or targeted contact. Plenty of people keep one of each.',
      'Fit and texture matter on such a sensitive area, so look for soft silicone and a range of low settings. Air-pulse heads work best with a little water-based lube to help form a light seal. Wash heads and removable caps carefully after use, since residue collects in the opening, and dry them fully before storing.',
    ],
    faqs: [
      {
        q: 'What is the difference between a clitoral vibrator and a suction toy?',
        a: 'A clitoral vibrator uses a motor to create vibration that you press against the skin. A suction or air-pulse toy places a soft opening around the clitoris and moves air in rhythmic waves, creating pressure changes without direct contact. Vibration can be broad or pinpoint, while air-pulse sensation feels more indirect. Preference is personal, and neither is objectively stronger.',
      },
      {
        q: 'Do clitoral suction toys work for everyone?',
        a: 'Many people enjoy them, but not everyone does. Some find the sensation intense and quick, while others prefer the steady contact of vibration. Fit matters too, since the opening needs to sit around the clitoris to work well. Using a little water-based lube, adjusting the angle and starting on a low setting gives you the best chance of finding what works.',
      },
      {
        q: 'How do you clean an air-pulse toy?',
        a: 'Remove the silicone head if it detaches and wash it in warm, soapy water, working into the opening where lube and fluids collect. Wipe or rinse the body according to its waterproof rating, then let everything air dry before reassembling. A cotton swab helps reach inside the opening. Replacement heads are available for many models if one wears out.',
      },
    ],
  },

  'shop:sex-toys-under-50': {
    h1: "Sex Toys Under $50 That Don't Cut Corners",
    body: [
      'A smaller budget still buys a very good toy, as long as you know where to spend and where to save. Bullets, compact vibrators, stretchy rings, beginner plugs, stroker cups and lube are all categories where affordable options perform well. You may give up some motor power, a few settings or a simpler charging system, but the core experience is often close to pricier models.',
      'Material is the one thing worth protecting. Choose toys described as body-safe silicone, glass, ABS plastic or stainless steel, and be wary of vague terms like jelly or rubber, or anything with a strong chemical smell, which can signal porous or poorly made materials. For strokers, TPE is standard and fine with proper cleaning and water-based lube.',
      'Rechargeable toys save on batteries over time, but battery-powered models are perfectly good for trying a new style before investing. A bottle of quality water-based lube and a toy cleaner make an inexpensive toy feel and last better. For a first toy or a gift, this range keeps the stakes low while still delivering.',
    ],
    faqs: [
      {
        q: 'Are cheap sex toys safe?',
        a: 'Price alone does not decide safety, but very cheap toys are more likely to use porous materials or vague labelling. Look for toys clearly described as body-safe silicone, glass, ABS plastic or stainless steel, and avoid jelly, rubber or products with a strong smell. Using a condom over a toy of uncertain material adds a barrier, and cleaning after every use helps.',
      },
      {
        q: 'What is the best budget sex toy for beginners?',
        a: 'A bullet vibrator, a small clitoral vibrator or a stretchy vibrating ring is an affordable, low-pressure first toy. Stroker cups are an inexpensive way to explore textures. Look for a few clear settings, a body-safe material and simple controls. Spending the difference on a good water-based lube often improves the experience more than buying a pricier toy.',
      },
      {
        q: 'Are battery-powered vibrators worse than rechargeable ones?',
        a: 'Not necessarily. Battery models are often cheaper, easy to keep running with spares and fine for trying a new style. Rechargeable toys tend to have stronger motors and better waterproofing, and they save money on batteries over time. If you expect to use a toy often, rechargeable is the better long-term value. For occasional use, batteries are perfectly practical.',
      },
    ],
  },

  'shop:luxury-sex-toys': {
    h1: 'Luxury Sex Toys Worth the Investment',
    body: [
      'Premium toys justify their price through the details you notice every time you use them. Motors tend to be stronger yet quieter, vibration feels deeper rather than buzzy, and finishes are smoother with fewer seams where residue can collect. Buttons are easier to find by touch, and charging is often magnetic or sealed so the whole toy can be fully waterproof.',
      'The category includes design-led vibrators and air-pulse toys, app-connected couples toys, automatic strokers, thrusting toys and sex machines. Spending more makes the most sense on a toy you will use often, or on a style where motor quality makes a big difference, such as wands and air-pulse stimulators. For a first try of a new style, a mid-range model can be the wiser choice.',
      "Look closely at the warranty, the merchant's return policy for intimate products and the availability of replacement parts like heads and chargers, since these decide how long a premium purchase lasts. Care is the same as any silicone toy: warm water, mild soap, water-based lube and a soft pouch to protect the finish.",
    ],
    faqs: [
      {
        q: 'Are expensive sex toys worth it?',
        a: 'They can be, especially for a toy you will use regularly. Higher prices usually bring better motors, quieter operation, smoother body-safe silicone, stronger waterproofing and longer-lasting batteries. You are often buying better support and replacement parts too. If you are still discovering what you enjoy, a mid-range toy is a sensible test before investing in a premium version of the same style.',
      },
      {
        q: 'What makes a sex toy luxury?',
        a: 'A luxury toy usually combines premium body-safe materials, a well-tuned motor, a seamless finish, thoughtful controls and careful industrial design. Many also offer sealed charging, full waterproofing, a travel lock and a storage case. Brand support, including warranty terms and replacement parts, is part of the package. Price alone does not guarantee quality, so read the materials and features closely.',
      },
      {
        q: 'Is a luxury sex toy a good gift?',
        a: 'A premium toy makes a thoughtful gift for a partner when you know their preferences, such as whether they enjoy vibration, air-pulse sensation or a couples toy. Choose a style they have already enjoyed or mentioned, and favor rechargeable, waterproof designs with a pouch or presentation box. If you are unsure, choosing together or including a gift receipt keeps it relaxed.',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Brand collections
  // ---------------------------------------------------------------------------
  'shop:lelo': {
    h1: 'LELO Vibrators, Sonic Toys & Prostate Massagers',
    body: [
      'LELO is a Swedish pleasure brand founded in Stockholm by a group of designers, and its products are recognizable for their sleek, sculpted shapes and soft silicone finishes. The range treats toys as design objects as much as devices, with rechargeable, waterproof builds and minimal, intuitive controls across most models.',
      'Several lines are especially well known. SONA and ENIGMA use sonic technology that pulses around the clitoris rather than vibrating against it, with ENIGMA adding an internal shaft for dual stimulation. SORAYA is the brand\'s rabbit, GIGI and INA cover G-spot and dual play, and the Smart Wand is its rechargeable wand massager. For prostate play, HUGO and LOKI are curved, vibrating massagers. TIANI is a wearable couples vibrator, and F1S is an app-connected stroker for penis owners.',
      'LELO suits people who value a quiet, refined toy and are happy to pay for finish and design, as well as gift buyers who want something that looks considered out of the box. Pair its silicone toys with water-based lube, clean them with warm, soapy water and check each listing for size and features, since several models have been updated over time with newer versions.',
    ],
    faqs: [
      {
        q: 'Is LELO a good brand?',
        a: 'LELO is one of the best-known premium pleasure brands, recognized for design-led shapes, body-safe silicone and rechargeable, waterproof builds across much of its range. Its toys sit at the higher end of the market. How well a specific model suits you depends on the sensation you want, so compare the type of stimulation, size and controls rather than relying on the name alone.',
      },
      {
        q: 'What is LELO SONA?',
        a: 'SONA is a LELO clitoral massager that uses sonic waves rather than standard surface vibration. A soft silicone opening sits around the clitoris and pulses to stimulate it, which feels more indirect than a vibrator pressed against the skin. It is rechargeable and designed for easy cleaning. A little water-based lube around the opening helps it sit comfortably and work evenly.',
      },
      {
        q: 'Where is LELO from?',
        a: 'LELO was founded in Stockholm, Sweden, and its Scandinavian design influence shows in the clean lines and soft-touch finishes across the range. The brand sells internationally and offers vibrators, sonic clitoral toys, prostate massagers, couples toys and toys for penis owners. Check each product listing for current details, since models are updated over time with new versions.',
      },
    ],
  },

  'shop:womanizer': {
    h1: 'Womanizer Air-Pulse Clitoral Stimulators Compared',
    body: [
      'Womanizer is the German brand that introduced air-pulse clitoral stimulation, which it calls Pleasure Air Technology. Instead of pressing a vibrating surface against the skin, a soft silicone head sits around the clitoris and moves air in rhythmic waves, creating suction-like pressure without direct contact. The approach was widely imitated and helped turn clitoral suction toys into a category of their own.',
      'The range has grown into several lines. The Premium models are the flagship, known for Smart Silence, which keeps the toy paused until it touches skin, and an Autopilot mode for varied patterns. Liberty is a compact, travel-friendly design with a protective lid. Duo combines air-pulse stimulation with an internal G-spot shaft for dual play, and OG brings the air-pulse idea to G-spot stimulation.',
      'Womanizer suits anyone who enjoys clitoral stimulation but finds vibration too direct or numbing, and it is a common starting point for first-time air-pulse buyers. Compare models by size, extra features and if you would like internal stimulation too, since the external air-pulse experience is the common thread across the range. Use a little water-based lube around the head for a better seal and wash the removable head after every use.',
    ],
    faqs: [
      {
        q: 'How does Womanizer work?',
        a: 'A Womanizer toy places a soft silicone opening around the clitoris and uses its Pleasure Air Technology to push and draw air in rhythmic waves. The result is pressure-based stimulation without direct contact. You choose intensity with the buttons, and some models offer automatic patterns. A little water-based lube around the head helps it seal against the skin and feel smoother.',
      },
      {
        q: 'Which Womanizer is best for beginners?',
        a: 'Beginners often start with a compact, simple model such as Liberty, or with a Premium model if features like Smart Silence and a wide intensity range appeal. Both focus on external air-pulse stimulation. If you want internal sensation too, Duo adds a G-spot shaft. Starting on a low setting matters most, since air-pulse sensation can build quickly.',
      },
      {
        q: 'Is Womanizer waterproof?',
        a: 'Many Womanizer models are designed to be waterproof, so they can be rinsed under the tap and used in the bath or shower. Water rinses lube away and can affect the seal, so a little extra lube may help. Always check the individual product details for the rating, and make sure the charging contacts are dry before you charge it.',
      },
    ],
  },

  'shop:we-vibe': {
    h1: 'We-Vibe Couples Vibrators & Wearables Compared',
    body: [
      'We-Vibe is a Canadian brand best known for the C-shaped couples vibrator, a flexible wearable that sits inside and against the clitoris at the same time so it can be worn during penetration. That design shaped the whole couples category, and the brand has built its range around toys meant to be shared, with most models connecting to its companion smartphone app for remote and long-distance control.',
      'The flagship couples lines are Chorus and Sync, both adjustable wearables, with Chorus able to respond to the squeeze of its remote. Melt brings air-pulse stimulation into a shape designed for use during sex. Moxie is a magnetic panty vibrator for discreet play outside the bedroom, and Jive is a wearable egg. Beyond wearables, Nova is a flexible rabbit, Tango is a compact bullet and Pivot is a vibrating ring.',
      'We-Vibe suits partners who want a toy that fits into sex rather than interrupting it, and long-distance couples who rely on app control. Use water-based lube with its silicone toys and wash them in warm, soapy water after each use. Check that the app supports your phone before buying if remote play is the main draw.',
    ],
    faqs: [
      {
        q: 'How does a We-Vibe work during sex?',
        a: 'A We-Vibe couples vibrator has two arms joined by a flexible bridge. One arm sits inside the vagina against the G-spot area, and the other rests on the clitoris, leaving room for penetration alongside it. Both partners can feel the vibration. Adjust the fit for your body, apply water-based lube and try positions where bodies stay close.',
      },
      {
        q: 'Do you need the app to use a We-Vibe?',
        a: 'No. We-Vibe toys can be operated with buttons on the toy, and many couples models come with a remote. The app adds custom patterns, finer control over intensity and the ability for a partner to control the toy over the internet from anywhere. It is useful for long-distance play but optional for everyday use.',
      },
      {
        q: 'Which We-Vibe is best for couples?',
        a: 'Chorus and Sync are the best-known wearable couples vibrators, both adjustable to fit different bodies. Chorus suits couples who like the idea of a squeeze-sensitive remote, while Sync is the classic wearable approach. For play outside the bedroom, Moxie is a discreet panty vibe, and Pivot suits couples who prefer a vibrating ring. Choose based on how you usually have sex.',
      },
    ],
  },

  'shop:lovense': {
    h1: 'Lovense App-Controlled Toys for Solo & Long Distance',
    body: [
      'Lovense is known for app-connected toys designed around remote and interactive play. Its toys pair with the Lovense Remote app, which can control them nearby or over the internet, build custom patterns and sync vibration with music or sound. The brand is especially popular with long-distance couples and with creators who use interactive toys during live streams.',
      "The best-known line is Lush, a wearable egg-shaped vibrator with a slim external antenna, designed to be worn hands-free and controlled by a partner. Hush is a vibrating butt plug, Nora is a rabbit with a rotating head, Domi is a compact wand and Ferri is a magnetic panty vibrator. For penis owners, Max is an app-controlled stroker and Edge is an adjustable prostate massager. Some Lovense toys can be linked so partners feel each other's movements.",
      'Lovense suits people who want app features first: remote control, long-distance play and customization. Check that the app supports your phone, use water-based lube with its silicone toys and keep toys charged before planned sessions. If you only want simple solo use, the app-first features may matter less than size, feel and noise.',
    ],
    faqs: [
      {
        q: 'How does Lovense long-distance control work?',
        a: 'Each Lovense toy connects to a nearby phone or computer by Bluetooth. Through the Lovense Remote app, you can invite a partner to control the toy from their own device over the internet, often with chat and video in the same app. Both people need a stable connection. You can end the session from your side at any time.',
      },
      {
        q: 'Is Lovense Lush good for beginners?',
        a: "Lush is a popular first app-controlled toy because it is wearable, simple to insert and easy to control from your phone or a partner's device. It sits inside with a soft antenna outside the body, so it works for solo play, date nights and long-distance sessions. Size and fit vary between versions, so check the product details, and use water-based lube.",
      },
      {
        q: 'Can you use Lovense toys without the app?',
        a: 'Yes. Most Lovense toys have a button for power and basic vibration modes, so they work as a standard toy without a phone. The app unlocks custom patterns, music sync, partner control and long-distance features, which are the main reasons people choose the brand. If you mainly want simple solo use, it is worth comparing other brands too.',
      },
    ],
  },

  'shop:tenga': {
    h1: 'Tenga Cups, Eggs & Reusable Strokers Compared',
    body: [
      'Tenga is a Japanese brand founded in 2005 that set out to make male masturbation products clean, well designed and easy to buy without embarrassment. Its packaging looks more like a design object than an adult product, and its toys focus on hygienic, pre-lubricated or easy-care designs with detailed internal textures.',
      'The range starts with the Tenga Cup series, single-use pre-lubricated cups in several styles that vary in tightness and sensation, and the Tenga Egg, a stretchy, egg-shaped sleeve with a distinct texture in each version. Reusable options include the Flip series, which opens like a clamshell for easy cleaning, the Spinner, whose internal spiral rotates as you stroke, and the Air-Tech cups, which bring the cup format into a reusable design. Tenga also runs iroha, a separate line of soft, design-led toys for vulva owners.',
      'Tenga suits first-time buyers who want a low-commitment way to try different textures, and experienced users who want a well-made reusable stroker. Use water-based lube and let reusable models dry fully between sessions. Single-use cups are a tidy option for travel, while reusable models make more sense for regular use.',
    ],
    faqs: [
      {
        q: 'Are Tenga cups reusable?',
        a: 'Classic Tenga Cups are designed for single use and come pre-lubricated, which makes them convenient and hygienic. Tenga Eggs are also intended for one use, though some people rinse and reuse them a few times. For repeated use, look at reusable lines such as Air-Tech, Flip and Spinner, which are made to be rinsed, dried and used again.',
      },
      {
        q: 'Tenga vs Fleshlight: which is better?',
        a: 'They suit different needs. Tenga focuses on compact, design-led products, from inexpensive single-use cups to reusable strokers with distinctive textures and easy-clean shapes. Fleshlight centers on reusable sleeves in a hard case with adjustable suction and a wide range of textures. Tenga is the easier way to try several feels; Fleshlight suits someone who wants one long-term sleeve.',
      },
      {
        q: 'How do you clean a Tenga Flip?',
        a: 'Open the Flip like a clamshell, rinse the inner sleeve with warm water to remove lube, and gently pat away excess moisture. Leave it open to air dry fully before closing it for storage, out of direct sunlight. Avoid harsh soaps and oil-based products, which can damage the material. Use a water-based lube every session for the best feel.',
      },
    ],
  },
}
