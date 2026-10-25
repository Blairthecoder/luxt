// Exports /confidence-kit/printable to public/downloads/nightstand-confidence-kit.pdf.
// Run after editing src/content/confidence-kit.ts, with the dev server up:
//   pnpm dev   (in another terminal)
//   pnpm kit:pdf [base-url]
// Needs Playwright with Chromium (pnpm dlx playwright install chromium if missing).
import { chromium } from 'playwright'

const base = process.argv[2] || 'http://localhost:3000'
const browser = await chromium.launch()
const context = await browser.newContext()
await context.addCookies([{ name: 'ns_age', value: '1', url: base }])
const page = await context.newPage()
await page.goto(`${base}/confidence-kit/printable`, { waitUntil: 'networkidle' })
await page.pdf({
  path: 'public/downloads/nightstand-confidence-kit.pdf',
  format: 'Letter',
  printBackground: true,
  preferCSSPageSize: true,
})
await browser.close()
console.log('[kit:pdf] wrote public/downloads/nightstand-confidence-kit.pdf')
