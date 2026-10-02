// A Stripe Payment Link takes two useful hints in its URL: the buyer's email,
// and a reference of ours that Stripe shows next to the payment. The reference
// carries the name of the home, so each payment says who it is for.
export function orderReference(homeName, suffix = Math.random().toString(36).slice(2, 6)) {
  const slug = homeName
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .slice(0, 60)
  return [slug || 'ordine', suffix].join('-')
}

export function checkoutUrl(link, { email = '', reference = '' } = {}) {
  if (!link) return null
  const url = new URL(link)
  if (email.trim()) url.searchParams.set('prefilled_email', email.trim())
  if (reference) url.searchParams.set('client_reference_id', reference)
  return url.toString()
}
