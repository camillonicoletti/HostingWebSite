import test from 'node:test'
import assert from 'node:assert/strict'
import { createContactRequest } from '../src/lib/contact.js'

test('prepares an email with all customer details without treating it as sent', () => {
  const request = createContactRequest({ name: 'Anna & Luca', email: 'anna@example.it', properties: '2–5', message: 'Wi-Fi & check-in?\nAnche in francese.' }, 'ciao@lamiacasa.app')
  const url = new URL(request.href)
  assert.equal(url.protocol, 'mailto:')
  assert.equal(url.pathname, 'ciao@lamiacasa.app')
  assert.equal(url.searchParams.get('subject'), 'La mia guida ospiti — Anna & Luca')
  assert.equal(url.searchParams.get('body'), request.body)
  for (const value of ['Anna & Luca', 'anna@example.it', '2–5', 'Wi-Fi & check-in?\nAnche in francese.']) assert.ok(request.body.includes(value))
  assert.equal(request.sent, undefined)
})

test('trims form input and offers a useful request when the optional message is empty', () => {
  const request = createContactRequest({ name: '  Anna  ', email: ' anna@example.it ', properties: '1', message: '  ' }, 'ciao@lamiacasa.app')
  assert.ok(request.body.includes('Nome: Anna\n'))
  assert.ok(request.body.includes('Vorrei una guida digitale per i miei ospiti.'))
})
