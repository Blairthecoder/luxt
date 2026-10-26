/**
 * Verified references for Nightstand Notes. Each entry was checked against the
 * PubMed record (title, journal, year, DOI and abstract) before it was added.
 * Cite from a guide body with `[[cite:<id>]]`; src/server/post-html.ts numbers
 * citations by first appearance and the page lists them under References.
 *
 * Only add a source after reading its abstract, and only cite it for what the
 * study measured. `limits` is plain-language context shown beside the entry.
 */
export type SourceType = 'Systematic review' | 'Meta-analysis' | 'Cross-sectional survey' | 'Laboratory study' | 'Small clinical study'

export interface Source {
  id: string
  title: string
  /** First author and "et al." where there are several. */
  authors: string
  /** Journal or institution. */
  publisher: string
  year: number
  url: string
  doi?: string
  type: SourceType
  /** What the study can and cannot show, in ordinary language. */
  limits: string
}

export const SOURCES: Source[] = [
  {
    id: 'body-image-review',
    title: 'Association of Body Image and Genital Self-Image with Female Sexual Function: A Systematic Review',
    authors: 'da Silva et al.',
    publisher: 'Journal of Sex & Marital Therapy',
    year: 2024,
    url: 'https://pubmed.ncbi.nlm.nih.gov/39126389/',
    doi: '10.1080/0092623X.2024.2386430',
    type: 'Systematic review',
    limits:
      'Ten studies of young adult women. It shows an association between how women see their bodies and sexual function, not that one causes the other, and the link differs by group and circumstance.',
  },
  {
    id: 'sexual-communication-meta',
    title: "Dimensions of couples' sexual communication, relationship satisfaction, and sexual satisfaction: A meta-analysis",
    authors: 'Mallory et al.',
    publisher: 'Journal of Family Psychology',
    year: 2022,
    url: 'https://pubmed.ncbi.nlm.nih.gov/34968095/',
    doi: '10.1037/fam0000946',
    type: 'Meta-analysis',
    limits:
      'Pools 93 studies covering 38,499 people in relationships. The studies measure association at one point in time, so they cannot show that better communication produces better sex or a happier relationship.',
  },
  {
    id: 'vibrator-use-us',
    title: 'Prevalence and characteristics of vibrator use by women in the United States: results from a nationally representative study',
    authors: 'Herbenick et al.',
    publisher: 'The Journal of Sexual Medicine',
    year: 2009,
    url: 'https://pubmed.ncbi.nlm.nih.gov/19453881/',
    doi: '10.1111/j.1743-6109.2009.01318.x',
    type: 'Cross-sectional survey',
    limits:
      'An online survey of 2,056 US women aged 18 to 60, published in 2009. It cannot show that vibrators improve sexual function, only that use and function were related, and it says little about people outside that age range.',
  },
  {
    id: 'clitoral-stimulation-survey',
    title: "Women's Experiences With Genital Touching, Sexual Pleasure, and Orgasm: Results From a U.S. Probability Sample of Women Ages 18 to 94",
    authors: 'Herbenick et al.',
    publisher: 'Journal of Sex & Marital Therapy',
    year: 2018,
    url: 'https://pubmed.ncbi.nlm.nih.gov/28678639/',
    doi: '10.1080/0092623X.2017.1346530',
    type: 'Cross-sectional survey',
    limits:
      'An online survey of 1,055 US women completed in 2015 and based on self-report. It describes what these women said about their own experience, and it does not cover people outside that group.',
  },
  {
    id: 'hpv-sex-toys',
    title: 'A study of human papillomavirus on vaginally inserted sex toys, before and after cleaning, among women who have sex with women and men',
    authors: 'Anderson et al.',
    publisher: 'Sexually Transmitted Infections',
    year: 2014,
    url: 'https://pubmed.ncbi.nlm.nih.gov/24739872/',
    doi: '10.1136/sextrans-2014-051558',
    type: 'Small clinical study',
    limits:
      'Twelve women and two toys, one thermoplastic elastomer and one silicone, cleaned with one commercial cleaner. Too small to set cleaning standards, and it did not test whether infection actually passes between partners.',
  },
  {
    id: 'mineral-oil-condoms',
    title: 'Mineral oil lubricants cause rapid deterioration of latex condoms',
    authors: 'Voeller et al.',
    publisher: 'Contraception',
    year: 1989,
    url: 'https://pubmed.ncbi.nlm.nih.gov/2535978/',
    doi: '10.1016/0010-7824(89)90018-8',
    type: 'Laboratory study',
    limits:
      'Bench testing of latex condoms, not people. It is decades old and tested the products sold at the time, so it shows the risk of mineral oil with latex but says nothing about newer products.',
  },
]

export const SOURCES_BY_ID: Record<string, Source> = Object.fromEntries(SOURCES.map((s) => [s.id, s]))
