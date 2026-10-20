export const SITE = {
  name: 'Nightstand Supply Co.',
  shortName: 'Nightstand Supply',
  url: 'https://nightstandsupply.com',
  tagline: 'Adult toys and honest advice for feeling good, solo or together.',
  description:
    'Adult toys and honest advice to help you and your partner feel comfortable, confident and pleasured. Body-safe picks from trusted brands, shipped discreetly.',
  guidesName: 'Nightstand Notes',
  /** Byline for guides with no named author. */
  editorialTeam: 'The Nightstand Notes Editors',
} as const

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
