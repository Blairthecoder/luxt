import { SITE, absoluteUrl } from '@/config/site'
import { truncate } from '@/lib/format'

/** Builds the meta/link/script arrays for a route's head(). */
export function pageHead({
  title,
  description,
  path,
  image,
  noindex = false,
  jsonLd = [],
}: {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
  jsonLd?: object[]
}) {
  const url = absoluteUrl(path)
  const desc = truncate(description, 158)
  return {
    meta: [
      { title },
      { name: 'description', content: desc },
      { name: 'robots', content: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:url', content: url },
      ...(image ? [{ property: 'og:image', content: image }] : []),
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
    url: SITE.url,
  }
}
