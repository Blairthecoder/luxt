export const SITE = {
  name: 'Nightstand Supply Co.',
  shortName: 'Nightstand Supply',
  url: 'https://nightstandsupply.com',
  tagline: 'Independent sex toy reviews and honest guides, solo or together.',
  description:
    'Independent sex toy reviews, buying guides and comparisons that help you and your partner choose with confidence. Body-safe picks, plain answers, no judgment.',
  guidesName: 'Nightstand Notes',
  /** Byline for guides with no named author. */
  editorialTeam: 'The Nightstand Notes Editors',
  /** Shown on the privacy and terms pages. Leave empty to hide the contact section. */
  contactEmail: 'nightstandsupplynsfw@gmail.com' as string,
} as const

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
