import { SITE, absoluteUrl } from '@/config/site'
import { truncate } from '@/lib/format'

// Deploy previews and branch deploys build with VITE_NOINDEX=1 (netlify.toml),
// so preview copies of the site can never be indexed.
const FORCE_NOINDEX = import.meta.env.VITE_NOINDEX === '1'

/** Builds the meta/link/script arrays for a route's head(). */
export function pageHead({
  title,
  description,
  path,
  image,
  noindex = false,
  type = 'website',
  jsonLd = [],
}: {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
  /** og:type; guides and stories pass 'article'. */
  type?: 'website' | 'article' | 'product'
  jsonLd?: object[]
}) {
  const url = absoluteUrl(path)
  const desc = truncate(description, 158)
  return {
    meta: [
      { title },
      { name: 'description', content: desc },
      { name: 'robots', content: noindex || FORCE_NOINDEX ? 'noindex, follow' : 'index, follow, max-image-preview:large' },
      { property: 'og:type', content: type },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
      ...(image
        ? [
            { property: 'og:image', content: image },
            { name: 'twitter:image', content: image },
          ]
        : []),
    ],
    links: [{ rel: 'canonical', href: url }],
    scripts: jsonLd.map((data) => ({
      type: 'application/ld+json',
      children: JSON.stringify(data),
    })),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    description: SITE.description,
    logo: { '@type': 'ImageObject', url: absoluteUrl('/icon-512.png'), width: 512, height: 512 },
    email: SITE.contactEmail || undefined,
  }
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
