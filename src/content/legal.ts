import { STORE_POLICY as P } from '@/content/store-policies'

/**
 * Privacy Policy, Terms of Use, Shipping and Returns copy. Plain-language drafts that describe
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
  /** Small label above the title. Defaults to "Legal". */
  eyebrow?: string
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
    'How Nightstand Supply Co. handles your information: lingerie orders at Shopify checkout, what our suppliers see, analytics, and what is stored on your device.',
  updated: 'October 25, 2026',
  intro:
    'Privacy matters on a site like this, so here is the short version: you can read everything here without an account, we only collect order details when you buy lingerie from our shop, and we do not sell your personal information. The details are below.',
  sections: [
    {
      heading: 'Who We Are',
      body: [
        'Nightstand Supply Co. publishes guides and reviews, and sells lingerie through its own online shop, Nightstand Supply Shop, which runs on Shopify. Toys and other products we review are sold by independent retailers such as Lovense, not by us.',
      ],
    },
    {
      heading: 'Lingerie Orders',
      body: [
        'When you check out for lingerie, Shopify collects the details needed to complete your order on our behalf: your name, email address, shipping and billing address, phone number if you give one, the items you order and your payment details.',
        'We receive your order details so we can fulfill it, send order and shipping emails, handle returns and answer your questions. Payments are processed by Shopify and its payment partners. We never see or store your full card number.',
        'Our lingerie is made and shipped by independent brands through Shopify Collective. The brand that ships your item receives the name, shipping address and order details it needs to pack and deliver it, and passes your address to the shipping carrier.',
        'We keep order records for as long as we need them for fulfillment, returns, accounting and tax, and to meet legal obligations.',
      ],
    },
    {
      heading: 'Information Stored on Your Device',
      body: ['We use a few small entries on your device to make the site work. None of them contains your name or payment details.'],
      bullets: [
        'A first-party cookie named ns_age, set for up to one year, and a localStorage entry named ns_age_confirmed, so we do not ask you to confirm you are 18 or older on every page.',
        'A localStorage entry named ns_cart that holds the lingerie in your cart until you check out or remove it.',
        'Shopify sets its own cookies during checkout to keep your session secure and remember your cart there.',
        'You can remove any of these by clearing your browser cookies and site data.',
      ],
    },
    {
      heading: 'Analytics',
      body: [
        'We use Google Analytics 4 to understand which pages are useful and which links people click. It records things like the pages you view, the type of device and browser you use, your approximate location, how you arrived at the site and an anonymous identifier stored in a cookie.',
        'We also record an event when you click a Check Price button, which includes the product and the page you were on. We do not send your name, email address or any other direct identifier to Google Analytics. Google processes this data under its own privacy policy.',
      ],
    },
    {
      heading: 'Email Signup',
      body: [
        'If you subscribe to our email list, we collect the email address you enter and the page you signed up on. Signups are received through Netlify Forms. We use your email only to send you new guides and offers, and you can unsubscribe at any time using the link in our emails or by contacting us. We do not sell your email address.',
      ],
    },
    {
      heading: 'Affiliate Links',
      body: [
        "Check Price buttons on toy reviews link through our own /go/ address to the retailer that sells the product, with a tracking link so the retailer can credit us for the referral. Some of these programs run through Impact, an affiliate network whose script on our pages records page views and outbound clicks so referrals can be credited. Once you land on the retailer's site, its own privacy policy applies to everything you do there, including checkout, billing and shipping. We do not receive your payment or shipping details from those retailers.",
      ],
    },
    {
      heading: 'Hosting and Server Logs',
      body: [
        'The site is hosted by Netlify. Like most web hosts, Netlify records technical information about each request, such as your IP address, the page requested, your browser and the time, to deliver the site, keep it secure and diagnose problems.',
      ],
    },
    {
      heading: 'How We Use Information',
      body: ['We use the information above to:'],
      bullets: [
        'Process, ship and support your lingerie orders, including returns and refunds.',
        'Send order confirmations, shipping updates and, if you subscribed, our emails.',
        'Prevent fraud and keep the site and checkout secure.',
        'Understand what readers find helpful and improve our guides and shop.',
        'Meet our legal, tax and accounting obligations.',
      ],
    },
    {
      heading: 'Who Receives Information',
      body: ['We share information only with the services that make the site and shop work, and only as described above:'],
      bullets: [
        'Shopify and its payment partners, for checkout, payments and order management.',
        'The lingerie brands that ship your order, and their shipping carriers.',
        'Google, for analytics.',
        'Impact and our affiliate partners, for crediting referrals.',
        'Netlify, for hosting and for receiving email signups.',
        'Authorities, if the law requires it.',
      ],
    },
    {
      heading: 'Discreet by Design',
      body: [
        "Your order history stays between you, us and the brand that ships it. Packaging and labels are set by each brand, so if discretion matters, email us before you order and we will tell you what to expect for that item. Our guide to buying discreetly has more ways to keep your browsing and orders private.",
      ],
    },
    {
      heading: 'Your Choices',
      bullets: [
        'Clear cookies and site data in your browser to remove the age marker, your cart and the analytics cookie.',
        'Browse in a private window so nothing is kept on a shared device.',
        "Block analytics with your browser's privacy settings, a content blocker or Google's Analytics opt-out browser add-on.",
        'Unsubscribe from our emails at any time.',
      ],
      body: ['You can limit what is collected without losing access to the site:'],
    },
    {
      heading: 'Your Rights',
      body: [
        'Depending on where you live, including California and other US states with privacy laws, you may have the right to know what personal information we hold about you, to get a copy, to correct or delete it, and to opt out of its sale or sharing for targeted advertising. We do not sell personal information. To make a request, email us using the details below and we will respond within the time the law requires. We will not treat you differently for using these rights.',
      ],
    },
    {
      heading: 'Children',
      body: [
        'This site and shop are for adults 18 and older. We do not knowingly collect information from anyone under 18. If you believe a minor has used the site, please contact us and we will delete their information.',
      ],
    },
    {
      heading: 'Security',
      body: [
        'The site and Shopify checkout are served over HTTPS. No method of transmission or storage is perfectly secure, but we limit what we collect and rely on Shopify to protect payment details.',
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
  metaTitle: 'Terms of Use and Sale',
  description:
    'The terms for using Nightstand Supply Co. and buying lingerie from our shop: adults only, orders and payment, shipping and returns, and affiliate links.',
  updated: 'October 25, 2026',
  intro:
    'These terms cover using this site and buying lingerie from our shop. They are written in plain language. By using the site or placing an order, you agree to them. If you do not agree, please do not use the site.',
  sections: [
    {
      heading: 'Adults Only',
      body: [
        'This site contains adult products and information. You must be 18 or older, or the age of majority where you live if that is higher, to use it or to place an order.',
      ],
    },
    {
      heading: 'Who You Are Buying From',
      body: [
        'Lingerie on this site is sold by Nightstand Supply Co. through our online shop, Nightstand Supply Shop, with checkout on Shopify. For those orders we are the seller, and we handle your order questions, returns and refunds. Many pieces are made and shipped directly by independent brands we partner with through Shopify Collective.',
        'Toys and other products in our reviews are sold by independent retailers. When you click a Check Price button you leave this site and buy from that retailer, which handles payment, shipping, returns, warranty and customer service under its own terms.',
      ],
    },
    {
      heading: 'Orders and Payment',
      body: [
        'Prices are in US dollars. Shipping costs and any taxes are shown at checkout before you confirm your order. Your order is accepted when we send a confirmation email.',
        'We may cancel an order, with a full refund, if an item is unavailable, payment cannot be authorized, the price or details were shown in error, or the order appears fraudulent. If we cannot ship your order in the time we promised, we will tell you and offer you the choice to cancel for a full refund.',
        `You can cancel an order within ${P.cancelHours} hour of placing it. After that, we will still try to stop it if it has not been sent to the brand for shipping.`,
      ],
    },
    {
      heading: 'Shipping, Returns and Sizing',
      body: [
        'Lingerie orders are covered by our Shipping Policy and our Returns and Exchanges policy, which form part of these terms. For hygiene reasons some intimate apparel is final sale; we mark it on the product page and at checkout. Please check our Size Guide and the product details before you order.',
      ],
    },
    {
      heading: 'Product Information and Prices',
      body: [
        'We work to keep product names, images, sizes, colors, prices and availability accurate, but colors can look different on screen and brands sometimes change details. The price and details shown at checkout are the ones that apply. For products sold by other retailers, always check the details on their site before you buy.',
      ],
    },
    {
      heading: 'Affiliate Relationship',
      body: [
        'We may earn a commission when you buy from a retailer through links on this site, at no extra cost to you. Commissions do not decide what we recommend, and they do not make us responsible for orders placed with those retailers. See our affiliate disclosure for more.',
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
        'You agree not to misuse the site. That includes trying to disrupt or gain unauthorized access to it, placing fraudulent orders, scraping it at a rate that harms performance, using it for anything unlawful, or letting anyone under 18 use it.',
      ],
    },
    {
      heading: 'Our Content',
      body: [
        'The text, guides, design and other original material on this site belong to us or our licensors and are protected by copyright. You may read and share links to our pages for personal use. Please do not copy or republish our content without permission. Product images and brand names belong to their respective owners.',
      ],
    },
    {
      heading: 'Third-Party Sites',
      body: [
        'Links to retailers and other sites are provided for convenience. We do not control those sites and are not responsible for their content, products, policies or practices.',
      ],
    },
    {
      heading: 'Warranties and Liability',
      body: [
        'Products from our shop come with the protections consumer law gives you, and our Returns and Exchanges policy explains what we do if an item arrives damaged, faulty or wrong. Beyond that, and to the extent the law allows, the site and its content are provided as is, and we are not liable for indirect, incidental or consequential loss arising from your use of the site or from products bought from other retailers.',
        'Nothing in these terms limits any right you have by law that cannot be limited.',
      ],
    },
    {
      heading: 'Changes',
      body: [
        'We may change the site or these terms from time to time. The date at the top shows when they were last revised. Changes do not affect orders you have already placed.',
      ],
    },
  ],
}

export const SHIPPING: LegalDoc = {
  eyebrow: 'Help',
  title: 'Shipping Policy',
  metaTitle: 'Lingerie Shipping Policy',
  description: `Shipping for lingerie from Nightstand Supply Shop: free US shipping over $${P.freeShippingThreshold}, processing and delivery times, tracking and packaging.`,
  updated: 'October 25, 2026',
  intro: `Lingerie from our shop ships to the US and Canada, and US standard shipping is free on orders of $${P.freeShippingThreshold} or more. This page covers lingerie bought through our checkout. Toys and other products in our reviews ship from the retailer you buy from.`,
  sections: [
    {
      heading: 'Processing Time',
      body: [
        `Orders are usually prepared for shipment within ${P.handlingDays.min} to ${P.handlingDays.max} business days, not counting weekends and US holidays. Busy periods such as Valentine's Day and the holidays can add a day or two.`,
      ],
    },
    {
      heading: 'Delivery Time',
      body: [
        `Once shipped, most US orders arrive within ${P.transitDays.min} to ${P.transitDays.max} business days. Orders to Canada and remote US addresses can take longer. Delivery times are estimates from the carrier, not guarantees.`,
      ],
    },
    {
      heading: 'Shipping Rates',
      bullets: [
        `US standard: $${P.standardRate}, free on orders of $${P.freeShippingThreshold} or more.`,
        `US express: $${P.expressRate}.`,
        'Canada: calculated at checkout.',
        'The exact rate for your order, and any taxes or duties, are shown at checkout before you pay.',
      ],
      body: ['Rates depend on where your order is going:'],
    },
    {
      heading: 'Orders With More Than One Item',
      body: [
        'Our lingerie is made and shipped by independent brands we partner with, so an order with pieces from different brands may arrive in separate packages on different days. You will get tracking for each one.',
      ],
    },
    {
      heading: 'Tracking',
      body: [
        'When your order ships, we email a shipping confirmation with tracking to the address you used at checkout. If you have not received it within the processing time above, check your spam folder, then email us.',
      ],
    },
    {
      heading: 'Packaging and Privacy',
      body: [
        'Packaging and labels are set by the brand that ships each item. If discretion matters, email us before you order and we will tell you what to expect for that piece.',
      ],
    },
    {
      heading: 'Address Changes',
      body: [
        'Please check your shipping address at checkout. If you spot a mistake, email us right away. We can usually correct it before the order ships, but not after. We are not responsible for orders delivered to an incorrect address entered at checkout.',
      ],
    },
    {
      heading: 'Late, Lost or Damaged Packages',
      body: [
        'If your tracking has not updated for several days, your package says delivered but you cannot find it, or it arrives damaged, email us with your order number. We will work with the brand and the carrier and send a replacement or a refund if the package is lost or damaged in transit.',
      ],
    },
  ],
}

export const RETURNS: LegalDoc = {
  eyebrow: 'Help',
  title: 'Returns and Exchanges',
  metaTitle: 'Lingerie Returns and Exchanges',
  description: `Returns for lingerie from Nightstand Supply Shop: ${P.returnDays}-day returns on unworn pieces, final-sale items, damaged orders, and how refunds work.`,
  updated: 'October 25, 2026',
  intro: `Lingerie is personal, so we want you to know where you stand before you order. Unworn pieces can be returned within ${P.returnDays} days of delivery, and if something arrives damaged or wrong, we will make it right at no cost to you. This policy covers lingerie bought through our checkout.`,
  sections: [
    {
      heading: 'What You Can Return',
      body: [`You can return most lingerie within ${P.returnDays} days of delivery if it is:`],
      bullets: [
        'Unworn, unwashed and free of perfume, deodorant, makeup and pet hair.',
        'In its original packaging with all tags attached and any hygiene liner in place.',
      ],
    },
    {
      heading: 'Final-Sale Items',
      body: [
        'For hygiene reasons, some intimate apparel cannot be returned for a change of mind or a size swap. This includes:',
      ],
      bullets: [
        ...P.finalSaleTypes.map((t) => `${t.charAt(0).toUpperCase()}${t.slice(1)}.`),
        'Any item marked final sale on its product page or at checkout.',
        'Final-sale items are still covered if they arrive damaged, faulty or not what you ordered.',
      ],
    },
    {
      heading: 'How to Start a Return',
      body: [
        'Email us with your order number, the item you want to return and the reason. Please do not send anything back before you hear from us: our pieces ship from different brands, and we will send you the right return address and instructions for your item.',
      ],
    },
    {
      heading: 'Exchanges',
      body: [
        'Because each piece ships from its brand, we handle a size or color swap as a return and a new order. Start a return as above, then place a new order for the size you want so it is not held up waiting for the return.',
      ],
    },
    {
      heading: 'Return Shipping',
      body: [
        'For change-of-mind returns, return shipping is paid by you, and the original shipping charge is not refunded. If we made a mistake or the item is faulty, we cover return shipping.',
      ],
    },
    {
      heading: 'Damaged, Faulty or Wrong Items',
      body: [
        'If your order arrives damaged, faulty or different from what you ordered, email us within 7 days of delivery with your order number and a photo. We will send a replacement or a full refund, including shipping, and you will not pay to send anything back.',
      ],
    },
    {
      heading: 'Refunds',
      body: [
        `Once your return arrives and is checked, we will email you and issue an approved refund to your original payment method within ${P.refundDays} business days. Your bank may take a few more days to show it.`,
      ],
    },
    {
      heading: 'Cancellations',
      body: [
        `You can cancel within ${P.cancelHours} hour of ordering for a full refund. After that, email us and we will cancel if the order has not yet been sent to the brand for shipping. Once it ships, the return terms above apply.`,
      ],
    },
    {
      heading: 'Products From Other Retailers',
      body: [
        'Toys and other products bought through Check Price links are sold by those retailers, and their return policies apply. Contact the retailer you bought from for help with those orders.',
      ],
    },
  ],
}
