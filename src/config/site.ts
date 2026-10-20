export const SITE = {
  name: 'Nightstand Supply Co.',
  shortName: 'Nightstand Supply',
  url: 'https://nightstandsupply.com',
  tagline: 'Honest answers and the best adult toys, in one place.',
  description:
    'Compare luxury adult toys from LELO, Womanizer, We-Vibe and more with plain-English guidance, real specs and current prices. Every order ships discreetly.',
  guidesName: 'Nightstand Notes',
  /** Byline for guides with no named author. */
  editorialTeam: 'The Nightstand Notes Editors',
} as const

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
