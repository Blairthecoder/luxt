# GA4 tracking: lingerie ecommerce, email signups, affiliate clicks

Property: `G-QQ0NJL2W40` (tag in `src/routes/__root.tsx`). Helpers in `src/lib/analytics.ts`.

## Events the site sends

| Event | Fires when | Key params |
|---|---|---|
| `view_item` | Any product page loads (lingerie and Lovense) | `items[]`, `value`, `currency`, `pillar` (lingerie/toys), `merchant` |
| `add_to_cart` | Add to Cart on a lingerie PDP or Shop This Guide card, or + in the cart | `items[]`, `value`, `link_context` (product_page, the Shop This Guide context, cart) |
| `remove_from_cart` | − or Remove in the cart | `items[]`, `value` |
| `view_cart` | `/cart` opens with items | `items[]`, `value` |
| `begin_checkout` | Buy Now (PDP) or Checkout (cart) click to Shopify | `items[]`, `value`, `checkout_source` (buy_now / cart_checkout) |
| `generate_lead` | Newsletter signup succeeds | `form_name`, `form_location` (footer, guide:<slug>, erotica:<slug>) |
| `sign_up` | Same submit (feeds GA4's standard signup report; do **not** mark as key event) | `method=newsletter`, `form_location` |
| `affiliate_click` | Any `/go/` link click | `product_handle`, `item_id`, `merchant`, `source_guide` (guide:<slug>, erotica:<slug>, (none)), `link_context`, `page_path` |
| `purchase` | **Shopify checkout**: set up below | `transaction_id`, `value`, `items[]` |

`item_id` is the product handle everywhere, so on-site events and Shopify purchases join in item reports.

## Attribution through to Shopify

- Landing UTMs (`utm_*`, `gclid`) are saved for 30 days (last non-direct touch, `localStorage.ns_attr`).
- Checkout links carry the visitor's original UTMs (or `nightstandsupply / referral / lingerie` + `utm_content=buy_now|cart_checkout` when there are none), so Shopify's own reports show the real source.
- The same values plus the GA4 client and session ids are saved as cart attributes, which Shopify copies onto the order (Order → Additional details): `_ga_client_id`, `_ga_session_id`, `_checkout_source`, `_utm_source`, `_utm_medium`, `_utm_campaign`, `_utm_content`, `_utm_term`, `_gclid`, `_landing_page`.
- gtag cross-domain linker is on for the Shopify store domain and `shop.nightstandsupply.com` (adds `_gl` to checkout links).
- Newsletter submissions in Netlify Forms now include `utm_source`, `utm_medium`, `utm_campaign`.

## Blair: Shopify-side checklist (purchase tracking)

Pick **one** purchase source. Two sources = double-counted revenue.

**Recommended: Customer Events custom pixel.** It reuses the site's GA client id from the cart attributes, so the purchase lands in the same user/session and credits the original source (Pinterest, newsletter, organic).

1. Shopify Admin → Settings → Customer events → **Add custom pixel** → name `GA4 purchase`.
2. Permission: *Not required* (or *Marketing + Analytics* if you run a cookie banner). Data sale: *does not qualify*.
3. Paste the code below → Save → **Connect**.
4. If the **Google & YouTube** app is installed and linked to `G-QQ0NJL2W40`, turn off its GA4 conversion tracking (or unlink GA4) so purchases are not sent twice. Keep the app for Merchant Center if you use it.
5. Place a test order (Bogus Gateway or a 100% discount code) and check GA4 → Admin → DebugView / Realtime for `purchase`.
6. Open the test order in Shopify and confirm `_ga_client_id` and `_utm_*` show under Additional details.

```js
// Shopify Customer Events → custom pixel. Sends GA4 purchase, stitched to the site session.
const GA_ID = 'G-QQ0NJL2W40';
const s = document.createElement('script');
s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
s.async = true;
document.head.appendChild(s);
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

analytics.subscribe('checkout_completed', (event) => {
  const c = event.data.checkout;
  const attr = Object.fromEntries((c.attributes || []).map((a) => [a.key, a.value]));
  const config = { send_page_view: false, page_location: event.context.document.location.href };
  if (attr._ga_client_id) config.client_id = attr._ga_client_id;
  gtag('config', GA_ID, config);
  gtag('event', 'purchase', {
    transaction_id: c.order?.id || c.token,
    value: Number(c.totalPrice?.amount || 0),
    tax: Number(c.totalTax?.amount || 0),
    shipping: Number(c.shippingLine?.price?.amount || 0),
    currency: c.currencyCode,
    coupon: (c.discountApplications || []).map((d) => d.title).join(',') || undefined,
    session_id: attr._ga_session_id || undefined,
    checkout_source: attr._checkout_source || undefined,
    items: (c.lineItems || []).map((li) => ({
      item_id: (li.variant?.product?.url || '').split('/products/')[1]?.split(/[?#]/)[0] || li.variant?.product?.id,
      item_name: li.variant?.product?.title || li.title,
      item_brand: li.variant?.product?.vendor,
      item_category: 'Lingerie',
      item_variant: li.variant?.title,
      price: Number(li.variant?.price?.amount || 0),
      quantity: li.quantity,
    })),
  });
});
```

Also on the Shopify side:

- [ ] Settings → Notifications → **Abandoned checkout** emails on.
- [ ] When `shop.nightstandsupply.com` is connected (plan blocker B2), nothing changes in code: it is already in the linker list.

## Blair: GA4 Admin checklist

1. **Key events** (Admin → Events → mark as key event; create any that don't show yet under Admin → Key events → New): `purchase`, `begin_checkout`, `generate_lead`, `affiliate_click`. Leave `sign_up` and `add_to_cart` unmarked.
2. **Cross-domain** (Admin → Data streams → web stream → Configure tag settings → Configure your domains): `nightstandsupply.com`, `pricgj-tf.myshopify.com`, `shop.nightstandsupply.com`.
3. **Unwanted referrals** (same screen → List unwanted referrals): `pricgj-tf.myshopify.com`, `shop.nightstandsupply.com`, `checkout.shopify.com`, `shop.app`, `paypal.com`.
4. **Custom dimensions** (Admin → Custom definitions → event scope): `product_handle`, `link_context`, `source_guide`, `merchant`, `checkout_source`, `form_location`, `pillar` (plus `page_path` if not already registered, plan item B5).
5. Verify in DebugView with Tag Assistant: PDP → add to cart → cart → Checkout should show `view_item`, `add_to_cart`, `view_cart`, `begin_checkout` in order.
