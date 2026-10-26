import { Link } from '@tanstack/react-router'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { MERCHANTS } from '@/content/merchants'
import { goPath } from '@/lib/affiliate'
import { formatPrice } from '@/lib/format'
import { getImageSrcSet, getOptimizedImageUrl } from '@/lib/image'
import { INTENTS, PICKS_CHECKED_AT, picksForIntent, type MerchantPick, type PickIntent } from '@/lib/merchant-picks'

/** Small label naming who sells the product. */
export function MerchantBadge({ merchant }: { merchant: keyof typeof MERCHANTS }) {
  return (
    <span className="inline-flex items-center rounded-full bg-mist px-2.5 py-1 text-[0.6875rem] font-semibold text-graphite">
      Sold by {MERCHANTS[merchant].badge}
    </span>
  )
}

function checkedLabel() {
  return new Date(`${PICKS_CHECKED_AT}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/**
 * Editorial card for a retailer-sold product: what it is, who it suits, why it is
 * here, and a sponsored link. No internal product page exists for these, so the
 * only outbound path is the /go redirect that carries the approved tracking link.
 */
export function MerchantPickCard({ pick, context, cluster }: { pick: MerchantPick; context: string; cluster?: string }) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-canvas p-5 ring-1 ring-line">
      <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-stone">
        <img
          src={getOptimizedImageUrl(pick.image, 480)}
          srcSet={getImageSrcSet(pick.image, [240, 360, 480, 640])}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          alt={`${pick.title} by ${pick.brand}`}
          loading="lazy"
          decoding="async"
          width={pick.imageWidth}
          height={pick.imageHeight}
          className="absolute inset-0 h-full w-full object-contain p-[10%] mix-blend-multiply"
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <MerchantBadge merchant={pick.merchant} />
        <span className="text-xs text-graphite">{pick.brand}</span>
      </div>
      <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-[-0.02em]">{pick.title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-snug">
        <span className="font-semibold">Best for:</span> {pick.audience}
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-graphite marker:text-mauve">
        {pick.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-graphite">{pick.why}</p>
      {pick.caution && (
        <p className="mt-2 text-sm leading-relaxed">
          <span className="font-semibold">Keep in mind:</span> {pick.caution}
        </p>
      )}
      <div className="mt-auto pt-5">
        <p className="mb-2 text-xs text-graphite">
          Listed at {formatPrice(pick.price)} on {checkedLabel()}. Confirm the current price at checkout.
        </p>
        <a
          href={goPath(pick.handle)}
          target="_blank"
          rel="sponsored nofollow noopener"
          data-link-context={context}
          data-cluster={cluster}
          data-merchant={pick.merchant}
          className="btn !min-h-[2.75rem] w-full !text-sm"
        >
          Check Price &amp; Details
        </a>
      </div>
    </article>
  )
}

/** One intent group: heading, blurb, cards and a nearby disclosure. */
export function MerchantPicksSection({
  intent,
  context,
  limit = 4,
  headingLevel = 2,
  id,
}: {
  intent: PickIntent
  context: string
  limit?: number
  headingLevel?: 2 | 3
  id?: string
}) {
  const picks = picksForIntent(intent, limit)
  if (picks.length === 0) return null
  const meta = INTENTS[intent]
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <section id={id ?? `ltx-${intent}`} aria-labelledby={`${intent}-picks-title`} className="scroll-mt-32">
      <Heading id={`${intent}-picks-title`} className={headingLevel === 2 ? 'display-m' : 'font-display text-2xl font-semibold tracking-[-0.02em]'}>
        {meta.title}
      </Heading>
      <p className="mt-2 max-w-2xl text-graphite">{meta.blurb}</p>
      <AffiliateNotice className="mt-3 max-w-2xl" />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {picks.map((pick) => (
          <li key={`${intent}:${pick.handle}`}>
            <MerchantPickCard pick={pick} context={context} cluster={intent} />
          </li>
        ))}
      </ul>
    </section>
  )
}

/** A short, relevant strip at the end of a guide, with a path to the full picks page. */
export function GuidePicksStrip({ intent, heading, slug }: { intent: PickIntent; heading: string; slug: string }) {
  const picks = picksForIntent(intent, 3)
  if (picks.length === 0) return null
  return (
    <section aria-label={heading} className="mt-16 border-t border-ink pt-12">
      <h2 className="display-m">{heading}</h2>
      <AffiliateNotice className="mt-3" />
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {picks.map((pick) => (
          <li key={pick.handle}>
            <MerchantPickCard pick={pick} context={`guide_strip:${slug}`} cluster={intent} />
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-graphite">
        More in{' '}
        <Link to="/shop" hash={`ltx-${intent}`} className="text-ink underline underline-offset-4">
          Shop Our Picks
        </Link>{' '}
        or on the{' '}
        <Link to="/brands/luxury-toy-x" className="text-ink underline underline-offset-4">
          Luxury Toy X guide
        </Link>
        .
      </p>
    </section>
  )
}
