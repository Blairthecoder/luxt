import { Link } from '@tanstack/react-router'
import type { CuratedPick } from '@/lib/curated'
import { goPath } from '@/lib/affiliate'
import { formatPrice } from '@/lib/format'
import { getImageSrcSet, getOptimizedImageUrl, isModelPhoto } from '@/lib/image'

/**
 * Editorial product card: image, audience, features, our rationale, one honest
 * limitation and a sponsored merchant link. Used wherever a pick appears with
 * its reasoning; plain listing grids keep using ProductCard.
 */
export function PickCard({ pick, context = 'home_pick', cluster }: { pick: CuratedPick; context?: string; cluster?: string }) {
  const photo = isModelPhoto(pick.image)
  return (
    <article className="flex h-full flex-col rounded-3xl bg-canvas p-5 sm:p-6 ring-1 ring-line">
      <Link
        to="/products/$productId"
        params={{ productId: pick.handle }}
        data-product-card={pick.handle}
        data-cluster={cluster}
        className="group relative block aspect-[5/4] overflow-hidden rounded-2xl bg-stone"
      >
        <img
          src={getOptimizedImageUrl(pick.image, 600)}
          srcSet={getImageSrcSet(pick.image, [240, 360, 480, 600])}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          alt={pick.imageAlt ?? `${pick.title} by ${pick.brand}`}
          loading="lazy"
          decoding="async"
          width={600}
          height={480}
          className={`absolute inset-0 h-full w-full ${photo ? 'object-cover object-[50%_25%]' : 'object-contain mix-blend-multiply p-[14%]'} transition-transform duration-700 group-hover:scale-[1.04]`}
        />
      </Link>
      <p className="mt-5 text-[0.8125rem] font-semibold text-plum">{pick.audience}</p>
      <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] leading-snug">
        <Link
          to="/products/$productId"
          params={{ productId: pick.handle }}
          data-product-card={pick.handle}
          data-cluster={cluster}
          className="hover:underline underline-offset-4"
        >
          {pick.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-graphite">
        {pick.brand}
        {pick.price > 0 && <span> · {formatPrice(pick.price)}</span>}
      </p>
      {pick.bestFor && (
        <p className="mt-3 text-[0.9375rem] leading-snug">
          <span className="font-semibold">Best for:</span> {pick.bestFor}
        </p>
      )}
      {pick.features.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-graphite list-disc pl-4 marker:text-mauve">
          {pick.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-sm text-graphite leading-relaxed line-clamp-4">{pick.summary}</p>
      {pick.limitation && (
        <p className="mt-2 text-sm text-graphite leading-relaxed">
          <span className="font-semibold text-ink">Keep in mind:</span> {pick.limitation}
        </p>
      )}
      <div className="mt-auto pt-5">
        <a
          href={goPath(pick.handle)}
          target="_blank"
          rel="sponsored nofollow noopener"
          data-link-context={context}
          data-merchant={pick.program ?? 'lovense'}
          data-cluster={cluster}
          className="btn !min-h-[2.75rem] !text-sm w-full"
        >
          Check Price &amp; Details
        </a>
        <p className="mt-2 text-center text-xs text-graphite">Sold by {pick.merchant}</p>
      </div>
    </article>
  )
}
