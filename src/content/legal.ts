/**
 * Privacy Policy and Terms of Use copy. Plain-language drafts that describe
 * what the site actually does; have them reviewed against your jurisdiction
 * before relying on them, and update them whenever tracking, storage or
 * data collection changes (new analytics, forms, cookies).
 */
export interface LegalSection {
  heading: string
  /** Paragraphs of plain text. */
  body: string[]
  /** Optional bullet list shown after the paragraphs. */
  bullets?: string[]
}

export interface LegalDoc {
  title: string
  metaTitle: string
  description: string
  updated: string
  intro: string
  sections: LegalSection[]
}

export const PRIVACY: LegalDoc = {
  title: 'Privacy Policy',
  metaTitle: 'Privacy Policy',
  description:
    'How Nightstand Supply Co. handles your information: no accounts, no orders, privacy-minded analytics, and what is stored on your device.',
  updated: 'October 20, 2026',
  intro:
    'Privacy matters on a site like this, so here is the short version: you do not need an account, we do not take orders or payments, and we do not sell your personal information. The details are below.',
  sections: [
    {
      heading: 'What We Do and Do Not Collect',
      body: [
        "Nightstand Supply Co. is a buying guide. You browse here, and if you decide to buy, you check out on the retailer's website. We never see your payment details, your shipping address or what you order.",
        'There are no user accounts, carts or saved lists on this site.',
      ],
    },
    {
      heading: 'Information Stored on Your Device',
      body: ['When you confirm you are 18 or older, we store a small marker on your device so we do not ask again on every page.'],
      bullets: [
        'A first-party cookie named ns_age, set for up to one year.',
        'A localStorage entry named ns_age_confirmed.',
        'Neither contains your name or any personal detail. You can remove them at any time by clearing your browser cookies and site data, and you will simply be asked again.',
      ],
    },
    {
      heading: 'Analytics',
      body: [
        'We use Google Analytics 4 to understand which pages are useful and which links people click. It records things like the pages you view, the type of device and browser you use, your approximate location, how you arrived at the site and an anonymous identifier stored in a cookie.',
        'We also record an event when you click a buy button, which includes the product and the page you were on. We do not send your name, email address or any other direct identifier to Google Analytics. Google processes this data under its own privacy policy.',
        'Google Analytics keeps data according to the retention settings we choose in that account.',
      ],
    },
    {
      heading: 'Email Signup',
      body: [
        'If you subscribe to our email list, we collect the email address you enter and the page you signed up on. Signups are received through Netlify Forms. We use your email only to send you new guides and deals, and you can unsubscribe at any time using the link in our emails or by contacting us. We do not sell your email address.',
      ],
    },
    {
      heading: 'Affiliate Links and Our Retail Partner',
      body: [
        "Buy buttons link through our own /go/ address, which sends you to the product page of the retailer that sells it (currently Lovense) with a tracking link so the retailer can credit us for the referral. When you land on the retailer's site, its own privacy policy and cookies apply to everything you do there, including checkout, billing and shipping.",
        'We may earn a commission if you buy. See our affiliate disclosure for details.',
      ],
    },
    {
      heading: 'Hosting and Server Logs',
      body: [
        'The site is hosted by Netlify. Like most web hosts, Netlify and our servers record technical information about each request, such as your IP address, the page requested, your browser and the time, to deliver the site, keep it secure and diagnose problems.',
      ],
    },
    {
      heading: 'How We Use Information',
      body: [
        'We use the information above to run and secure the site, understand what readers find helpful and improve our guides and product pages. We do not sell personal information.',
      ],
    },
    {
      heading: 'Who Receives Information',
      body: ['Information is shared only with the services that make the site work, and only as described above:'],
      bullets: [
        'Google, for analytics.',
        'Netlify, for hosting and for receiving email signups.',
        'Our retail partners (the merchants you buy from), when you click through to buy, under their own privacy policies.',
        'Authorities, if the law requires it.',
      ],
    },
    {
      heading: 'Your Choices',
      body: ['You can limit what is collected without losing access to the site:'],
      bullets: [
        'Clear cookies and site data in your browser to remove the age marker and the analytics cookie.',
        'Browse in a private window so nothing is kept on a shared device.',
        "Block analytics with your browser's privacy settings, a content blocker or Google's Analytics opt-out browser add-on.",
        'Read our guide to buying sex toys discreetly for more ways to keep your browsing and orders private.',
      ],
    },
    {
      heading: 'Your Rights',
      body: [
        'Depending on where you live, you may have the right to ask what personal information we hold about you, to ask us to correct or delete it, or to object to certain processing. Because we do not collect names, emails or accounts, we usually hold very little that can be linked to you. To make a request, contact us using the details below.',
      ],
    },
    {
      heading: 'Children',
      body: [
        'This site is for adults 18 and older. We do not knowingly collect information from anyone under 18. If you believe a minor has used the site, please contact us.',
      ],
    },
    {
      heading: 'Security',
      body: [
        'The site is served over HTTPS. No method of transmission or storage is perfectly secure, but we limit what we collect so there is little to expose.',
      ],
    },
    {
      heading: 'Changes to This Policy',
      body: ['We will update this page when our practices change, and the date at the top will show when it was last revised.'],
    },
  ],
}

export const TERMS: LegalDoc = {
  title: 'Terms of Use',
  metaTitle: 'Terms of Use',
  description:
    'The terms for using Nightstand Supply Co.: adults only, independent buying guides, affiliate links and third-party retailers.',
  updated: 'October 20, 2026',
  intro:
    'By using this site you agree to these terms. They are short and written in plain language. If you do not agree, please do not use the site.',
  sections: [
    {
      heading: 'Adults Only',
      body: [
        'This site contains adult products and information. You must be 18 or older, or the age of majority where you live if that is higher, to use it.',
      ],
    },
    {
      heading: 'What This Site Is',
      body: [
        'Nightstand Supply Co. publishes buying guides, product information and comparisons. We are not the seller. When you click a buy button you leave this site and purchase from the retailer that sells it, which handles payment, shipping, returns, warranty and customer service under its own terms and policies.',
      ],
    },
    {
      heading: 'Affiliate Relationship',
      body: [
        'We may earn a commission when you buy through links on this site, at no extra cost to you. Commissions do not decide what we recommend. See our affiliate disclosure for more.',
      ],
    },
    {
      heading: 'Product Information and Prices',
      body: [
        "Product names, images, prices, availability and some specifications come from our retail partners or from the manufacturers and can change at any time. We work to keep them accurate, but the price and details shown on the retailer's checkout page are the ones that apply. Always check them before you buy.",
      ],
    },
    {
      heading: 'Not Medical, Legal or Professional Advice',
      body: [
        'Our guides are for general information and entertainment. They are not medical, mental-health, legal or relationship advice. If you have a health concern, pain, or questions about sexual function or relationships, speak with a qualified doctor or therapist.',
        "Follow the manufacturer's instructions for using, cleaning and storing any product, and stop using a product if it causes pain or irritation.",
      ],
    },
    {
      heading: 'Acceptable Use',
      body: [
        'You agree not to misuse the site. That includes trying to disrupt or gain unauthorized access to it, scraping it at a rate that harms performance, using it for anything unlawful, or letting anyone under 18 use it.',
      ],
    },
    {
      heading: 'Our Content',
      body: [
        'The text, guides, design and other original material on this site belong to us or our licensors and are protected by copyright. You may read and share links to our pages for personal use. Please do not copy or republish our content without permission. Product images and names belong to their respective owners.',
      ],
    },
    {
      heading: 'Third-Party Sites',
      body: [
        'Links to our retail partners and other sites are provided for convenience. We do not control those sites and are not responsible for their content, products, policies or practices.',
      ],
    },
    {
      heading: 'No Warranties',
      body: [
        'The site and its content are provided as is and as available, without warranties of any kind, to the extent the law allows. We do not guarantee that the site will always be available or error-free.',
      ],
    },
    {
      heading: 'Limitation of Liability',
      body: [
        'To the extent the law allows, we are not liable for any indirect, incidental or consequential loss arising from your use of the site or from products you buy from third parties. Nothing in these terms limits any right you have by law that cannot be limited.',
      ],
    },
    {
      heading: 'Changes',
      body: [
        'We may change the site or these terms from time to time. The date at the top shows when they were last revised, and continued use of the site means you accept the updated terms.',
      ],
    },
  ],
}
