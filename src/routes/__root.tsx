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
      { name: 'theme-color', content: '#ffffff' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://cdn.shopify.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@500;600;700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Fade sections in as they enter the viewport; no-op without IntersectionObserver or with reduced motion. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
document.documentElement.classList.add('reveal-ready');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
function scan(){document.querySelectorAll('.reveal:not(.in)').forEach(function(el){io.observe(el);});}
document.addEventListener('DOMContentLoaded',scan);
new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});
})();`,
          }}
        />
        {/* Google tag (gtag.js) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
document.addEventListener('click', function(e){
  var a = e.target instanceof Element ? e.target.closest('a[href^="/go/"]') : null;
  if (!a) return;
  gtag('event', 'affiliate_click', {
    product_handle: a.getAttribute('href').slice(4).split('?')[0],
    page_path: location.pathname,
    link_context: a.classList.contains('pick-buy') ? 'guide_pick' : 'product_page'
  });
}, true);`,
          }}
        />
      </head>
      <body className="bg-canvas text-ink antialiased min-h-screen flex flex-col">
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
    <div className="wrap py-32 sm:py-44">
      <p className="eyebrow text-graphite">Page Not Found</p>
      <h1 className="mt-4 display-l max-w-4xl">This Page Has Moved On.</h1>
      <p className="mt-6 lede text-graphite max-w-xl">
        The product may have sold out or moved. Try one of our collections instead.
      </p>
      <Link to="/" className="mt-10 btn">
        Return Home
      </Link>
    </div>
  )
}
