import { Link, createFileRoute } from '@tanstack/react-router'
import { FaqAccordion } from '@/components/FaqAccordion'
import { SITE } from '@/config/site'
import { STORE_POLICY } from '@/content/store-policies'
import { pageHead } from '@/lib/seo'

/**
 * General US women's sizing reference (inches). Brands cut differently, so
 * the copy points shoppers to the product's own chart first. TO CONFIRM
 * against each brand's chart as products are added.
 */
const MISSES: [string, string, string, string, string][] = [
  ['XS', '0–2', '31–32', '24–25', '34–35'],
  ['S', '4–6', '33–35', '26–28', '36–38'],
  ['M', '8–10', '35–37', '28–30', '38–40'],
  ['L', '12–14', '38–40', '31–33', '41–43'],
  ['XL', '16', '41–43', '34–36', '44–46'],
  ['XXL', '18', '44–46', '37–39', '47–49'],
]

const PLUS: [string, string, string, string, string][] = [
  ['1X', '14W–16W', '42–44', '35–37', '45–47'],
  ['2X', '18W–20W', '46–48', '39–41', '49–51'],
  ['3X', '22W–24W', '50–52', '43–45', '53–55'],
  ['4X', '26W–28W', '54–56', '47–49', '57–59'],
]

const FAQS = [
  {
    q: 'What does One Size or Free Size mean?',
    a: 'One Size pieces are cut from stretch lace or mesh to fit a range of bodies. Most fit a US small to large, but the range varies, so check the product details for the brand\'s own fit notes before you order.',
  },
  {
    q: 'What if I am between sizes?',
    a: 'Size up for structured pieces like corsets, bra sets with underwire and anything non-stretch. Size down for stretch lace, mesh and bodysuits if you prefer a closer fit. Your bust measurement matters most for tops and babydolls, and your hips for bottoms and teddies.',
  },
  {
    q: 'What do sizes like 1X/2X mean?',
    a: 'Combined plus sizes cover two sizes in one piece, usually thanks to stretch fabric or adjustable straps. A 1X/2X fits roughly US 14W to 20W, and a 3X/4X roughly 22W to 28W.',
  },
  {
    q: 'Can I exchange for a different size?',
    a: `Yes for most pieces, within ${STORE_POLICY.returnDays} days of delivery if they are unworn with tags attached. Final-sale items such as panties and hosiery cannot be returned for size. See our returns policy for the details.`,
  },
]

export const Route = createFileRoute('/size-guide')({
  head: () =>
    pageHead({
      title: `Lingerie Size Guide: How to Measure | ${SITE.shortName}`,
      description:
        'Find your lingerie size: how to measure bust, waist and hips, a US size chart from XS to 4X, and fit tips for One Size, plus-size and between-size pieces.',
      path: '/size-guide',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
      ],
    }),
  component: SizeGuidePage,
})

function SizeTable({ caption, rows }: { caption: string; rows: [string, string, string, string, string][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm sm:text-[0.9375rem] border-t border-ink">
        <caption className="text-left font-semibold text-ink pb-3">{caption}</caption>
        <thead>
          <tr className="border-b border-line text-graphite">
            {['Size', 'US', 'Bust', 'Waist', 'Hips'].map((h) => (
              <th key={h} scope="col" className="py-3 pr-2 sm:pr-4 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([size, ...cells]) => (
            <tr key={size} className="border-b border-line">
              <th scope="row" className="py-3 pr-2 sm:pr-4 font-semibold text-ink">
                {size}
              </th>
              {cells.map((c, i) => (
                <td key={i} className="py-3 pr-2 sm:pr-4 tabular-nums">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SizeGuidePage() {
  return (
    <article className="wrap py-20 sm:py-32">
      <div className="max-w-3xl space-y-6 text-[1.0625rem] text-[#3a3a3c] leading-relaxed">
        <p className="eyebrow text-graphite">Help</p>
        <h1 className="display-l text-ink !mt-3">Lingerie Size Guide</h1>
        <p className="lede text-graphite">
          Three measurements and two minutes are all it takes. Use this guide to find your starting size, then check the
          product's own size notes, because every brand cuts a little differently.
        </p>

        <section className="space-y-3 pt-4">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">How to Measure</h2>
          <p>Use a soft tape measure over a thin bra or bare skin, keep the tape level and snug but not tight, and breathe normally.</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <span className="font-semibold text-ink">Bust:</span> around the fullest part of your chest.
            </li>
            <li>
              <span className="font-semibold text-ink">Waist:</span> around the narrowest part of your torso, usually just
              above your belly button.
            </li>
            <li>
              <span className="font-semibold text-ink">Hips:</span> around the fullest part of your hips and seat, with your
              feet together.
            </li>
          </ul>
        </section>

        <section className="space-y-6 pt-4">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">Size Chart</h2>
          <p>Measurements are in inches. If the product page has its own chart, that chart wins.</p>
          <SizeTable caption="Standard Sizes" rows={MISSES} />
          <SizeTable caption="Plus Sizes" rows={PLUS} />
        </section>

        <section className="space-y-3 pt-4">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">Fit Questions</h2>
          <FaqAccordion faqs={FAQS} />
        </section>

        <section className="space-y-3 pt-4">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">Still Not Sure?</h2>
          <p>
            Email us the product and your measurements and we will help you pick a size
            {SITE.contactEmail ? (
              <>
                {' '}
                at{' '}
                <a href={`mailto:${SITE.contactEmail}`} className="text-ink underline underline-offset-2">
                  {SITE.contactEmail}
                </a>
              </>
            ) : null}
            . For how to choose and wear pieces that feel good, read our guide to{' '}
            <Link to="/blog/$slug" params={{ slug: 'how-to-feel-confident-in-lingerie' }} className="text-ink underline underline-offset-2">
              feeling confident in lingerie
            </Link>
            , or{' '}
            <Link to="/category/$slug" params={{ slug: 'lingerie' }} className="text-ink underline underline-offset-2">
              shop all lingerie
            </Link>
            .
          </p>
        </section>

        <p className="pt-4 text-sm text-graphite">
          Related:{' '}
          <Link to="/shipping" className="underline underline-offset-2 hover:text-ink">
            Shipping
          </Link>
          {' · '}
          <Link to="/returns" className="underline underline-offset-2 hover:text-ink">
            Returns and Exchanges
          </Link>
          {' · '}
          <Link to="/contact" className="underline underline-offset-2 hover:text-ink">
            Contact
          </Link>
        </p>
      </div>
    </article>
  )
}
