/**
 * Toy finder at /quiz. Every result is also listed in the page's server HTML,
 * so the recommendations are crawlable without running the quiz.
 */
export interface QuizResult {
  id: string
  name: string
  summary: string
  /** /shop collection slug. */
  collection: string
  /** Guide slug in Nightstand Notes. */
  guide: string
  guideLabel: string
}

export interface QuizOption {
  label: string
  value: string
}

export interface QuizQuestion {
  id: 'who' | 'where' | 'experience' | 'priority'
  question: string
  options: QuizOption[]
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'who',
    question: 'Who is it for?',
    options: [
      { label: 'Me, and I have a vulva', value: 'vulva' },
      { label: 'Me, and I have a penis', value: 'penis' },
      { label: 'Me and a partner, together', value: 'couple' },
    ],
  },
  {
    id: 'where',
    question: 'What kind of sensation sounds best?',
    options: [
      { label: 'External, on the outside', value: 'external' },
      { label: 'Internal', value: 'internal' },
      { label: 'Both at once', value: 'both' },
      { label: 'Not sure yet', value: 'unsure' },
    ],
  },
  {
    id: 'experience',
    question: 'Have you used toys before?',
    options: [
      { label: 'This would be my first', value: 'new' },
      { label: 'I have one or two', value: 'some' },
      { label: 'I know what I like', value: 'experienced' },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most?',
    options: [
      { label: 'Quiet and discreet', value: 'quiet' },
      { label: 'Strong power', value: 'power' },
      { label: 'A small budget', value: 'budget' },
      { label: 'Remote or app control', value: 'remote' },
    ],
  },
]

export const QUIZ_RESULTS: QuizResult[] = [
  { id: 'bullet', name: 'A Bullet Vibrator', summary: 'Small, quiet and affordable, with focused external vibration. The easiest first toy.', collection: 'bullet-vibrators', guide: 'best-bullet-vibrators', guideLabel: 'Best bullet vibrators' },
  { id: 'clitoral', name: 'A Clitoral Suction Toy', summary: 'Air pulse or suction stimulation without direct contact. A favorite for people who find vibration too intense or not enough.', collection: 'clitoral-vibrators', guide: 'clitoral-vs-g-spot-vibrators', guideLabel: 'Clitoral vs. G-spot vibrators' },
  { id: 'wand', name: 'A Wand Vibrator', summary: 'Broad, deep, powerful vibration over a wide area. Doubles as a body massager.', collection: 'wand-vibrators', guide: 'best-wand-vibrators', guideLabel: 'Best wand vibrators' },
  { id: 'quiet', name: 'A Quiet Vibrator', summary: 'Rumbly, low-noise motors for shared walls and light sleepers.', collection: 'quiet-vibrators', guide: 'quietest-vibrators', guideLabel: 'Quietest vibrators' },
  { id: 'gspot', name: 'A G-Spot Vibrator', summary: 'A curved tip shaped for internal stimulation on the front wall.', collection: 'g-spot-vibrators', guide: 'clitoral-vs-g-spot-vibrators', guideLabel: 'Clitoral vs. G-spot vibrators' },
  { id: 'rabbit', name: 'A Rabbit Vibrator', summary: 'Internal and external stimulation at once from a shaft and an outer arm.', collection: 'rabbit-vibrators', guide: 'best-rabbit-vibrators', guideLabel: 'Best rabbit vibrators' },
  { id: 'thrusting', name: 'A Thrusting Vibrator', summary: 'A shaft that moves on its own for hands-free internal sensation.', collection: 'thrusting-vibrators', guide: 'best-thrusting-vibrators', guideLabel: 'Best thrusting vibrators' },
  { id: 'stroker', name: 'A Manual Stroker', summary: 'A soft, textured sleeve that is easy to use and easy to hide. Start with a single-use cup if you want to try one first.', collection: 'pocket-pussies', guide: 'fleshlight-vs-tenga', guideLabel: 'Fleshlight vs. Tenga' },
  { id: 'auto-stroker', name: 'An Automatic Stroker', summary: 'Hands-free strokers that add suction, thrusting or vibration.', collection: 'automatic-strokers', guide: 'best-automatic-strokers', guideLabel: 'Best automatic strokers' },
  { id: 'prostate', name: 'A Prostate Massager', summary: 'A curved toy with a flared base, shaped for the prostate. Many vibrate.', collection: 'prostate-vibrators', guide: 'prostate-massage-for-beginners', guideLabel: 'Prostate massage for beginners' },
  { id: 'ring', name: 'A Vibrating Cock Ring', summary: 'Firmer erections and vibration both partners feel, at a small price.', collection: 'vibrating-cock-rings', guide: 'best-vibrating-cock-rings', guideLabel: 'Best vibrating cock rings' },
  { id: 'couples', name: 'A Couples Vibrator', summary: 'Wearable toys designed to be used together during sex.', collection: 'couples-sex-toys', guide: 'best-couples-sex-toys', guideLabel: 'Best couples sex toys' },
  { id: 'remote', name: 'An App or Remote-Controlled Toy', summary: 'Hand the controls to a partner across the room or across the world.', collection: 'app-controlled-sex-toys', guide: 'is-lovense-worth-it', guideLabel: 'Is Lovense worth it?' },
]

export const QUIZ_RESULTS_BY_ID: Record<string, QuizResult> = Object.fromEntries(QUIZ_RESULTS.map((r) => [r.id, r]))

export type QuizAnswers = Partial<Record<QuizQuestion['id'], string>>

/** Picks a main result and up to two alternatives from the answers. */
export function quizResults(a: QuizAnswers): QuizResult[] {
  const ids: string[] = []
  const { who, where, experience, priority } = a

  if (priority === 'remote') ids.push(who === 'penis' ? 'ring' : 'remote')

  if (who === 'couple') {
    ids.push('couples', 'ring', 'remote', 'bullet')
  } else if (who === 'penis') {
    if (where === 'internal') ids.push('prostate')
    if (priority === 'power' || experience === 'experienced') ids.push('auto-stroker')
    ids.push('stroker', 'ring', 'prostate')
  } else {
    if (where === 'internal') ids.push(priority === 'power' || experience === 'experienced' ? 'thrusting' : 'gspot')
    if (where === 'both') ids.push('rabbit')
    if (priority === 'quiet') ids.push('quiet')
    if (priority === 'power') ids.push('wand')
    if (priority === 'budget' || experience === 'new') ids.push('bullet')
    ids.push('clitoral', 'wand', 'bullet')
  }

  return [...new Set(ids)].slice(0, 3).map((id) => QUIZ_RESULTS_BY_ID[id])
}
