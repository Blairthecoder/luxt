import { createFileRoute } from '@tanstack/react-router'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const SLUG = /^[a-z0-9:_-]{1,80}$/i

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
  })

// Email signups. The browser also posts the same fields to Netlify Forms, so a
// signup is kept even before an email provider is configured (see src/server/subscribe.ts).
export const Route = createFileRoute('/api/subscribe')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const form = new URLSearchParams(await request.text())
        if (form.get('bot-field')) return json({ ok: true, providers: [] })
        const email = (form.get('email') ?? '').trim().toLowerCase()
        const source = form.get('source') ?? 'unknown'
        const offer = form.get('offer') ?? 'newsletter'
        if (!EMAIL.test(email) || email.length > 254) return json({ ok: false, error: 'invalid_email' }, 400)
        if (!SLUG.test(source) || !SLUG.test(offer)) return json({ ok: false, error: 'invalid_source' }, 400)

        const { subscribe } = await import('@/server/subscribe')
        const providers = await subscribe({ email, source, offer })
        for (const p of providers) if (!p.ok) console.error(`[subscribe] ${p.provider}: ${p.error}`)
        return json({ ok: providers.length === 0 || providers.some((p) => p.ok), providers: providers.map((p) => p.provider) })
      },
    },
  },
})
