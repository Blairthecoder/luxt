// The Confidence Kit: Nightstand Notes' free lead magnet. Rendered as the
// /confidence-kit landing page and the printable /confidence-kit/printable
// (also exported to public/downloads/nightstand-confidence-kit.pdf by
// scripts/build-confidence-kit-pdf.mjs). Original copy; keep it non-explicit.

export const KIT_CONTENTS = [
  {
    title: 'The 7-Day Confidence Reset',
    summary: 'One small exercise a day, about ten minutes each, for feeling like yourself in your own skin again.',
  },
  {
    title: 'The Lingerie Fit Guide',
    summary: 'How to measure at home, what fits where by style, and the five checks that tell you a piece is right.',
  },
  {
    title: '10 Confidence Prompts',
    summary: 'Short journal prompts for the days your inner critic is loud.',
  },
  {
    title: '12 Date-Night Conversation Cards',
    summary: 'Cut-out questions that get you talking about closeness, wants and the two of you, without the awkwardness.',
  },
] as const

export interface KitDay {
  day: number
  title: string
  body: string
}

export const KIT_DAYS: KitDay[] = [
  {
    day: 1,
    title: 'Neutral Mirror Minute',
    body: 'Stand in front of a mirror for one minute. Describe what you see out loud as if you were a kind stranger: "brown eyes, soft shoulders, a scar on the left knee." No grading, no fixing. Neutral is the goal, not love. Love can come later.',
  },
  {
    day: 2,
    title: 'Wear It for You',
    body: 'Put on one thing you have been saving for a special occasion: the matching set, the silk robe, the good perfume. Wear it on an ordinary day where nobody else will see it. Notice how you carry yourself.',
  },
  {
    day: 3,
    title: 'What Your Body Did Today',
    body: 'Write down five things your body did for you today. Carried the groceries. Laughed at a text. Hugged someone. Got you through a long meeting. Shift the question from "how does it look" to "what does it do".',
  },
  {
    day: 4,
    title: 'The Feed Audit',
    body: 'Scroll your social feed for five minutes. Mute or unfollow any account that leaves you comparing. Follow three people whose bodies look like yours, or like nothing you usually see.',
  },
  {
    day: 5,
    title: 'Move for How It Feels',
    body: 'Ten minutes of movement chosen only for pleasure: dancing in the kitchen, a slow stretch, a walk with a song you love. Pay attention to sensation, not calories or steps.',
  },
  {
    day: 6,
    title: 'Say One Want Out Loud',
    body: 'Finish this sentence and say it to someone, or to yourself in the mirror: "I would love more ___ in my life." Small is fine. Wanting things out loud is a confidence muscle.',
  },
  {
    day: 7,
    title: 'A Date With Yourself',
    body: 'Plan one hour that is only yours. Run a bath, read something that makes you feel something, wear what makes you feel good. Put it in your calendar like any other plan you would never cancel.',
  },
]

export const FIT_MEASURE = [
  { name: 'Band', how: 'Measure snugly around your ribcage, right under your bust, tape level all the way round.' },
  { name: 'Bust', how: 'Measure loosely around the fullest part of your bust, wearing a bra without padding or no bra.' },
  { name: 'Waist', how: 'Measure around the narrowest part of your torso, usually just above the belly button.' },
  { name: 'Hips', how: 'Stand with feet together and measure around the fullest part of your hips and seat.' },
  {
    name: 'Torso loop',
    how: 'For bodysuits and teddies: from the top of one shoulder, down through your legs and back up to the same shoulder.',
  },
]

export const FIT_STYLES = [
  { style: 'Bodysuit or teddy', rule: 'Size by torso loop first, then bust. A short torso length pulls at the shoulders and crotch.' },
  { style: 'Bra and panty set', rule: 'Size the top by band and bust, the bottom by hips. Look for sets sold as separates if you are two sizes.' },
  { style: 'Babydoll or chemise', rule: 'Size by bust. The skirt is loose by design, so hips and waist rarely matter.' },
  { style: 'Corset or bustier', rule: 'Size by waist. You should be able to slide two fingers under the top edge.' },
  { style: 'Robe or kimono', rule: 'Size by hips and arm length. Go up a size if you like a deep wrap.' },
]

export const FIT_CHECKS = [
  'The band sits level across your back and does not ride up.',
  'Straps stay put without digging in. If they carry the weight, the band is too loose.',
  'Cups lie flat against your chest with no gaps or spilling over the edge.',
  'Leg openings and waistbands rest on your skin without cutting in.',
  'You can sit, stretch and breathe. If you would not wear it for an hour, it is the wrong size, not the wrong body.',
]

export const KIT_PROMPTS = [
  'When did I last feel completely like myself? Where was I and what was I wearing?',
  'What would I say to a friend who talked about her body the way I talk about mine?',
  'Which part of my body am I grateful for this week, and why?',
  'What is one compliment I brushed off that I could let myself believe?',
  'What does "sexy" feel like to me, not look like?',
  'What am I waiting to do until my body changes? What if I did it now?',
  'Who in my life makes me feel most at ease, and what do they do?',
  'What is one small way I could take up more space this week?',
  'What do I want more of in my intimate life? What do I want less of?',
  'Finish this: "I feel at home in my body when…"',
]

export const KIT_CARDS = [
  'What is a memory of us you replay when you miss me?',
  'When did you feel most wanted by me this month?',
  'What is something small I do that makes you feel close to me?',
  'If we had a whole day with no plans, how would you want to spend it together?',
  'What is one thing you have always wanted to try together, in or out of the bedroom?',
  'What helps you switch off from the day and be present with me?',
  'What is your favorite way to be touched that has nothing to do with sex?',
  'What is something you love about your own body?',
  'When do you feel most confident around me?',
  'Is there anything you would like more of from me, but have not asked for?',
  'What song makes you think of us?',
  'What is one thing we should keep doing, and one thing we should do more?',
]

export const KIT_FAQ = [
  {
    q: 'Is the Confidence Kit really free?',
    a:
      'Yes. Enter your email and the kit opens right away, with a copy sent to your inbox. You will also get a short welcome series from Nightstand Notes, and you can unsubscribe with one click at any time.',
  },
  {
    q: 'What format is it in?',
    a:
      'It is a printable PDF of about eight pages: the 7-day reset, the lingerie fit guide, 10 journal prompts and 12 conversation cards you can cut out. It also works on a phone if you would rather not print.',
  },
  {
    q: 'Is the kit explicit?',
    a:
      'No. It is about confidence, comfort and connection. The conversation cards are written for couples to talk openly, not to shock, and nothing in the kit is graphic.',
  },
  {
    q: 'Will the emails be discreet?',
    a:
      'Yes. Emails come from Nightstand Notes with plain, non-explicit subject lines, so they look ordinary in a shared inbox.',
  },
]
