export const SITE = {
  name: 'Nightstand Supply Co.',
  shortName: 'Nightstand Supply',
  url: 'https://nightstandsupply.com',
  tagline: 'Sex education, intimacy and confidence for adults, solo or together.',
  description:
    "Sex education, intimacy and confidence guides for adults, with a focus on women's empowerment, plus independent toy reviews. Plain answers, no judgment.",
  guidesName: 'Nightstand Notes',
  /** Byline for guides with no named author. */
  editorialTeam: 'The Nightstand Notes Editors',
  /** Shown on the privacy and terms pages. Leave empty to hide the contact section. */
  contactEmail: 'nightstandsupplynsfw@gmail.com' as string,
} as const

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
