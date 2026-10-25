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
  /**
   * Customer and reader contact address, shown on Contact, legal, policy and
   * size guide pages and in Organization schema. Set VITE_CONTACT_EMAIL in
   * Netlify to the domain mailbox (e.g. hello@nightstandsupply.com) to switch.
   * PLACEHOLDER: the Gmail fallback stays until the domain mailbox exists.
   */
  contactEmail: (import.meta.env.VITE_CONTACT_EMAIL || 'nightstandsupplynsfw@gmail.com') as string,
} as const

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
