import { useId } from 'react'
import { Link } from '@tanstack/react-router'
import { KIT_PDF, KIT_PRINTABLE, useSignup } from '@/lib/subscribe'

type Variant = 'card' | 'footer' | 'band' | 'slidein'

/** Consent line shown under every signup form. Keep in step with the Privacy Policy. */
export function SignupConsent({ className = '', light = false }: { className?: string; light?: boolean }) {
  const link = `underline underline-offset-2 ${light ? 'hover:text-canvas' : 'hover:text-ink'}`
  return (
    <p className={`text-xs leading-relaxed ${light ? 'text-canvas/60' : 'text-graphite'} ${className}`}>
      By subscribing you confirm you are 18 or older and agree to receive emails from Nightstand Supply Co. with guides,
      stories and offers. Discreet subject lines. Unsubscribe anytime with one click. See our{' '}
      <Link to="/privacy" className={link}>
        Privacy Policy
      </Link>
      .
    </p>
  )
}

function KitReady({ light = false }: { light?: boolean }) {
  return (
    <div role="status" className="mt-4 space-y-3">
      <p className={`text-sm ${light ? 'text-canvas' : 'text-ink'}`}>
        You are in. Your Confidence Kit is ready now, and a copy is on its way to your inbox.
      </p>
      <div className="flex flex-wrap gap-2">
        <a href={KIT_PRINTABLE} className={`btn !min-h-[2.75rem] !text-sm ${light ? 'btn-light' : ''}`}>
          Open the Kit
        </a>
        <a href={KIT_PDF} download className={`btn-ghost !min-h-[2.75rem] !text-sm ${light ? 'border-canvas/30 text-canvas hover:border-canvas' : ''}`}>
          Download the PDF
        </a>
      </div>
    </div>
  )
}

const COPY = {
  kit: {
    title: 'Get the Confidence Kit, Free',
    body: 'Seven small confidence exercises, a lingerie fit guide and date-night conversation cards, printable and yours to keep. Plus a short welcome series from Nightstand Notes.',
    button: 'Send My Kit',
  },
  newsletter: {
    title: 'Get New Guides by Email',
    body: 'Honest guides, new stories and the occasional good deal. Start with our free Confidence Kit.',
    button: 'Subscribe',
  },
}

/**
 * Email signup. Posts to Netlify Forms and /api/subscribe (see src/lib/subscribe.ts);
 * field names must match public/newsletter-form.html.
 */
export function NewsletterSignup({
  source,
  variant = 'card',
  offer = 'confidence-kit',
  title,
  body,
  className = '',
}: {
  /** Where the signup happened, e.g. "footer" or a guide slug. */
  source: string
  variant?: Variant
  /** "confidence-kit" (default) or "newsletter". */
  offer?: 'confidence-kit' | 'newsletter'
  title?: string
  body?: string
  className?: string
}) {
  const { state, submit, reset } = useSignup()
  const id = useId()
  const copy = COPY[offer === 'confidence-kit' ? 'kit' : 'newsletter']
  const compact = variant === 'footer'
  const light = variant === 'band'
  const stack = compact || variant === 'slidein'

  const wrapper = {
    card: 'rounded-2xl bg-blush p-6 sm:p-8',
    footer: '',
    band: '',
    slidein: '',
  }[variant]

  const heading = {
    card: 'font-display text-2xl font-semibold tracking-[-0.02em]',
    footer: 'text-xs font-semibold text-ink',
    band: 'display-m',
    slidein: 'font-display text-xl font-semibold tracking-[-0.02em] pr-8',
  }[variant]

  return (
    <section aria-labelledby={`${id}-title`} className={`${wrapper} ${className}`}>
      {variant === 'band' && <p className="eyebrow text-petal">Free Printable · Nightstand Notes</p>}
      <h2 id={`${id}-title`} className={`${heading} ${variant === 'band' ? 'mt-3' : ''}`}>
        {title ?? copy.title}
      </h2>
      <p
        className={`mt-2 ${light ? 'text-canvas/75 max-w-md' : 'text-graphite'} ${compact ? 'text-xs leading-relaxed' : 'text-[0.9375rem] leading-relaxed'}`}
      >
        {body ?? copy.body}
      </p>

      {state === 'success' ? (
        offer === 'confidence-kit' ? (
          <KitReady light={light} />
        ) : (
          <p role="status" className="mt-4 text-sm text-ink">
            Thank you. You are on the list.
          </p>
        )
      ) : (
        <form
          name="newsletter"
          method="POST"
          action="/newsletter-form.html"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={submit}
          onChange={reset}
          className="mt-4"
        >
          <input type="hidden" name="form-name" value="newsletter" />
          <input type="hidden" name="source" value={source} />
          <input type="hidden" name="offer" value={offer} />
          <input type="hidden" name="consent" value="email-marketing-v1" />
          <p hidden>
            <label>
              Leave empty
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <fieldset disabled={state === 'pending'} className={`flex flex-col gap-2 ${stack ? '' : 'sm:flex-row'}`}>
            <legend className="sr-only">Email signup</legend>
            <label htmlFor={`${id}-email`} className="sr-only">
              Email address
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="Your email address"
              className={`h-11 w-full min-w-0 rounded-full border px-5 text-sm ${light ? 'border-canvas/30 bg-canvas text-ink' : 'border-line bg-canvas'}`}
            />
            <button type="submit" className={`btn !min-h-[2.75rem] !text-sm shrink-0 ${light ? 'btn-light' : ''}`}>
              {state === 'pending' ? 'Sending…' : copy.button}
            </button>
          </fieldset>
          {state === 'error' && (
            <p role="alert" className={`mt-3 text-xs ${light ? 'text-canvas/75' : 'text-graphite'}`}>
              We could not confirm your signup. Your email is still in the box, so please try again in a moment.
            </p>
          )}
        </form>
      )}

      <SignupConsent className="mt-3" light={light} />
    </section>
  )
}
