// Email list providers for /api/subscribe. Each one is optional and switched
// on by its env vars in Netlify (never committed):
//
//   Shopify Email (default)  SHOPIFY_STORE_DOMAIN  your-store.myshopify.com
//                            SHOPIFY_ADMIN_TOKEN   Admin API token with write_customers
//   Klaviyo (swap-in)        KLAVIYO_PRIVATE_KEY   pk_… with lists:write, profiles:write, subscriptions:write
//                            KLAVIYO_LIST_ID       the Nightstand Notes list
//
// Shopify subscribers are customers with email marketing consent, tagged
// `newsletter` plus the lead source, which triggers the Shopify Email "welcome
// new subscriber" automation. With neither provider set, signups still land in
// Netlify Forms (posted by the browser) and can be imported later.

export interface Signup {
  email: string
  source: string
  /** Lead magnet or list the visitor asked for, e.g. "confidence-kit". */
  offer: string
}

export type ProviderResult = { provider: 'shopify' | 'klaviyo'; ok: boolean; error?: string }

const SHOPIFY_API_VERSION = '2025-07'
const KLAVIYO_REVISION = '2025-07-15'

function tagFor(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9:-]+/g, '-')
    .slice(0, 40)
}

async function shopifyAdmin(domain: string, token: string, query: string, variables: Record<string, unknown>) {
  const res = await fetch(`https://${domain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(10000),
  })
  if (!res.ok) throw new Error(`Shopify ${res.status}`)
  const json = (await res.json()) as { data?: any; errors?: unknown }
  if (json.errors) throw new Error('Shopify GraphQL error')
  return json.data
}

const CONSENT = { marketingState: 'SUBSCRIBED', marketingOptInLevel: 'SINGLE_OPT_IN' }

async function subscribeShopify(signup: Signup): Promise<ProviderResult | null> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/+$/, '')
  const token = process.env.SHOPIFY_ADMIN_TOKEN
  if (!domain || !token) return null
  const tags = ['newsletter', tagFor(signup.offer), tagFor(`src:${signup.source}`)]
  try {
    const created = await shopifyAdmin(
      domain,
      token,
      `mutation($input: CustomerInput!) { customerCreate(input: $input) { customer { id } userErrors { field message } } }`,
      { input: { email: signup.email, tags, emailMarketingConsent: { ...CONSENT, consentUpdatedAt: new Date().toISOString() } } },
    )
    if (created.customerCreate.customer) return { provider: 'shopify', ok: true }

    // Already a customer (a past buyer or an earlier signup): opt them in and tag them.
    const found = await shopifyAdmin(domain, token, `query($q: String!) { customers(first: 1, query: $q) { nodes { id } } }`, {
      q: `email:"${signup.email.replace(/"/g, '')}"`,
    })
    const id = found.customers.nodes[0]?.id
    if (!id) return { provider: 'shopify', ok: false, error: created.customerCreate.userErrors[0]?.message ?? 'customer not created' }
    const updated = await shopifyAdmin(
      domain,
      token,
      `mutation($input: CustomerEmailMarketingConsentUpdateInput!, $id: ID!, $tags: [String!]!) {
        customerEmailMarketingConsentUpdate(input: $input) { userErrors { message } }
        tagsAdd(id: $id, tags: $tags) { userErrors { message } }
      }`,
      { input: { customerId: id, emailMarketingConsent: CONSENT }, id, tags },
    )
    const error = updated.customerEmailMarketingConsentUpdate.userErrors[0]?.message
    return { provider: 'shopify', ok: !error, error }
  } catch (err) {
    return { provider: 'shopify', ok: false, error: (err as Error).message }
  }
}

async function subscribeKlaviyo(signup: Signup): Promise<ProviderResult | null> {
  const key = process.env.KLAVIYO_PRIVATE_KEY
  const list = process.env.KLAVIYO_LIST_ID
  if (!key || !list) return null
  try {
    const res = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        Authorization: `Klaviyo-API-Key ${key}`,
        revision: KLAVIYO_REVISION,
      },
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            custom_source: `${signup.offer} · ${signup.source}`,
            profiles: {
              data: [
                {
                  type: 'profile',
                  attributes: { email: signup.email, subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } } },
                },
              ],
            },
          },
          relationships: { list: { data: { type: 'list', id: list } } },
        },
      }),
      signal: AbortSignal.timeout(10000),
    })
    return { provider: 'klaviyo', ok: res.ok, error: res.ok ? undefined : `Klaviyo ${res.status}` }
  } catch (err) {
    return { provider: 'klaviyo', ok: false, error: (err as Error).message }
  }
}

/** Sends the signup to every configured provider. An empty array means none is set up yet. */
export async function subscribe(signup: Signup): Promise<ProviderResult[]> {
  const results = await Promise.all([subscribeShopify(signup), subscribeKlaviyo(signup)])
  return results.filter((r): r is ProviderResult => r !== null)
}
