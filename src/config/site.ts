export const SITE = {
  name: 'Nightstand Supply Co.',
  shortName: 'Nightstand Supply',
  url: 'https://nightstandsupply.com',
  tagline: 'Lingerie, toys, confidence and erotica for feeling sexy on your own terms.',
  description:
    'A judgment-free hub for women who want to feel sexier and more confident: size-inclusive lingerie, honest toy reviews, confidence and sex ed guides, and tasteful erotica.',
  guidesName: 'Nightstand Notes',
  /** Byline for guides with no named author. */
  editorialTeam: 'The Nightstand Notes Editors',
  /** Shown on the privacy and terms pages. Leave empty to hide the contact section. */
  contactEmail: 'nightstandsupplynsfw@gmail.com' as string,
} as const

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
