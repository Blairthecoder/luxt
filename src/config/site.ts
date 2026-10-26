export const SITE = {
  name: 'Nightstand Supply Co.',
  shortName: 'Nightstand Supply',
  url: 'https://nightstandsupply.com',
  tagline: 'Feel Good. Get Closer. Discover More.',
  /** Brand positioning, used in meta descriptions and structured data. */
  description:
    'Nightstand Supply is a modern destination for intimacy, body confidence, and pleasure, helping women and couples feel more comfortable, connected, and confident through practical guidance and thoughtfully chosen products.',
  guidesName: 'Nightstand Notes',
  /** Byline for guides with no named author. */
  editorialTeam: 'The Nightstand Notes Editors',
  /** Shown on the privacy and terms pages. Leave empty to hide the contact section. */
  contactEmail: 'nightstandsupplynsfw@gmail.com' as string,
} as const

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
