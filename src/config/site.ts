export const SITE = {
  name: 'Nightstand Supply Co.',
  shortName: 'Nightstand Supply',
  url: 'https://nightstandsupply.co',
  tagline: 'Honest answers and the best adult toys, in one place.',
  description:
    'Compare adult toys from top brands with plain-English guidance, real specs and current prices. Every order ships discreetly from our trusted retail partner.',
  guidesName: 'Nightstand Notes',
} as const

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
