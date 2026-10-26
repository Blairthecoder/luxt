import { useId, useState, type FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { trackEvent } from '@/lib/events'

type State = 'idle' | 'pending' | 'success' | 'error'

/**
 * Email signup handled by Netlify Forms. The matching static registration form
 * lives in public/newsletter-form.html (Netlify detects forms in built HTML, not
 * in SSR output), so field names here must match that file.
 */
export function NewsletterSignup({
  source,
  variant = 'card',
  title,
  body,
  button = 'Subscribe',
  className = '',
}: {
  /** Where the signup happened, e.g. "footer" or a guide slug. */
  source: string
  variant?: 'card' | 'footer'
  /** Overrides for the heading, supporting copy and button label. */
  title?: string
  body?: string
  button?: string
  className?: string
}) {
  const [state, setState] = useState<State>('idle')
  const id = useId()

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) => body.append(key, String(value)))
    setState('pending')
    try {
      const response = await fetch('/newsletter-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      // A plain preview can return the static registration page with status 200.
      if (/\bdata-netlify\s*=/i.test(await response.text())) throw new Error('Form handling is unavailable')
      setState('success')
      // Only the form location is sent, never the address.
      trackEvent('newsletter_signup', { form_location: source.split(':')[0] })
    } catch {
      setState('error')
    }
  }

  const compact = variant === 'footer'

  return (
    <section
      aria-labelledby={`${id}-title`}
      className={`${compact ? '' : 'rounded-2xl bg-mist p-6 sm:p-8'} ${className}`}
    >
      <h2
        id={`${id}-title`}
        className={compact ? 'text-xs font-semibold text-ink' : 'font-display text-2xl font-semibold tracking-[-0.02em]'}
      >
        {title ?? (compact ? 'Get New Guides by Email' : 'Get New Guides by Email.')}
      </h2>
      <p className={`mt-2 text-graphite ${compact ? 'text-xs leading-relaxed' : 'text-[0.9375rem] leading-relaxed'}`}>
        {body ?? 'Honest guides and good deals, now and then. Unsubscribe any time.'}
      </p>

      {state === 'success' ? (
        <p role="status" className="mt-4 text-sm text-ink">
          Thank you. You are on the list.
        </p>
      ) : (
        <form
          name="newsletter"
          method="POST"
          action="/newsletter-form.html"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={submit}
          onChange={() => {
            if (state !== 'pending') setState('idle')
          }}
          className="mt-4"
        >
          <input type="hidden" name="form-name" value="newsletter" />
          <input type="hidden" name="source" value={source} />
          <p hidden>
            <label>
              Leave empty
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <fieldset disabled={state === 'pending'} className={`flex flex-col gap-2 ${compact ? '' : 'sm:flex-row'}`}>
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
              className="h-11 w-full min-w-0 rounded-full border border-line bg-canvas px-5 text-sm"
            />
            <button type="submit" className="btn !min-h-[2.75rem] !text-sm shrink-0">
              {state === 'pending' ? 'Sending…' : button}
            </button>
          </fieldset>
          {state === 'error' && (
            <p role="alert" className="mt-3 text-xs text-graphite">
              We could not confirm your signup. Your email is still in the box, so please try again in a moment.
            </p>
          )}
        </form>
      )}

      <p className="mt-3 text-xs text-graphite">
        We use your email only to send guides and deals. See our{' '}
        <Link to="/privacy" className="underline underline-offset-2 hover:text-ink">
          Privacy Policy
        </Link>
        .
      </p>
    </section>
  )
}
