import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AgeGate } from '@/components/AgeGate'
import { SITE } from '@/config/site'
import '../styles.css'

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
      { name: 'theme-color', content: '#0b0a09' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://cdn.shopify.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap',
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
      </head>
      <body className="bg-ink text-ivory antialiased min-h-screen flex flex-col">
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
    <div className="max-w-2xl mx-auto px-5 py-32 text-center space-y-6">
      <p className="eyebrow text-gold">Page Not Found</p>
      <h1 className="text-5xl text-ivory">This Page Has Moved On</h1>
      <p className="text-muted">The product may have sold out or moved. Try one of our collections instead.</p>
      <Link to="/" className="btn-line">
        Return Home
      </Link>
    </div>
  )
}
