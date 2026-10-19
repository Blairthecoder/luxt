import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AgeGate } from '@/components/AgeGate'
import { SITE } from '@/config/site'
import '../styles.css'

const GA_MEASUREMENT_ID = 'G-QQ0NJL2W40'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${SITE.name} | Adult Toys, Explained` },
      { name: 'description', content: SITE.description },
      { name: 'rating', content: 'adult' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'theme-color', content: '#0A0B10' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://cdn.shopify.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <HeadContent />
        {/* Google tag (gtag.js) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`,
          }}
        />
      </head>
      <body className="bg-[#0A0B10] text-slate-100 antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AgeGate />
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
      <h1 className="text-3xl font-serif font-bold text-white">We couldn't find that page</h1>
      <p className="text-slate-400">The product may have sold out or moved. Try one of our categories instead.</p>
      <Link to="/" className="inline-block text-amber-200 underline">
        Back to the homepage
      </Link>
    </div>
  )
}
