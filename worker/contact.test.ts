import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { parseContactPayload } from './contact.ts'

describe('parseContactPayload', () => {
  it('accepts a complete payload', () => {
    const result = parseContactPayload({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      company: 'Analytical Engines',
      message: 'Hello from a plant-floor question about retrieval.',
      'cf-turnstile-response': 'token-value',
    })
    assert.equal(result.ok, true)
    if (result.ok) {
      assert.equal(result.fields.email, 'ada@example.com')
      assert.equal(result.fields.honeypot, '')
    }
  })

  it('rejects a missing turnstile token', () => {
    const result = parseContactPayload({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Hello from a plant-floor question about retrieval.',
    })
    assert.equal(result.ok, false)
  })

  it('treats honeypot fills as a silent success shape', () => {
    const result = parseContactPayload({
      name: 'bot',
      email: 'bot@example.com',
      message: 'spam '.repeat(10),
      website: 'https://spam.example',
      'cf-turnstile-response': 'token-value',
    })
    assert.equal(result.ok, true)
    if (result.ok) assert.equal(result.fields.honeypot, 'https://spam.example')
  })
})
