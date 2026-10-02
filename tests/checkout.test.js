import test from 'node:test'
import assert from 'node:assert/strict'
import { checkoutUrl, orderReference } from '../src/lib/checkout.js'

test('turns the home name into a Stripe-safe reference', () => {
  assert.equal(orderReference('Casa Sole · Matera', 'ab12'), 'casa-sole-matera-ab12')
  assert.equal(orderReference('Città è Bella!', 'x1'), 'citta-e-bella-x1')
  assert.equal(orderReference('   ', 'x1'), 'ordine-x1')
  assert.match(orderReference('Casa'), /^casa-[a-z0-9]{1,4}$/)
})

test('keeps references within Stripe limits', () => {
  const reference = orderReference('a'.repeat(300), 'zz')
  assert.ok(reference.length <= 200)
  assert.match(reference, /^[a-z0-9-]+$/)
})

test('adds email and reference to the payment link', () => {
  const url = new URL(checkoutUrl('https://buy.stripe.com/test_abc', { email: ' ospite@esempio.it ', reference: 'casa-sole-ab12' }))
  assert.equal(url.origin + url.pathname, 'https://buy.stripe.com/test_abc')
  assert.equal(url.searchParams.get('prefilled_email'), 'ospite@esempio.it')
  assert.equal(url.searchParams.get('client_reference_id'), 'casa-sole-ab12')
})

test('leaves out empty hints and reports a missing link', () => {
  assert.equal(checkoutUrl('https://buy.stripe.com/test_abc'), 'https://buy.stripe.com/test_abc')
  assert.equal(checkoutUrl(''), null)
})
