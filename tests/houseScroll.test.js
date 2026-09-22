import test from 'node:test'
import assert from 'node:assert/strict'
import { createHouseScrollProgress } from '../src/lib/houseScroll.js'

// A 4000px story in a 1000px viewport has 3000px of animation travel.
const rect = top => ({ top, bottom: top + 4000, height: 4000 })

test('keeps the reached moment when scrolling backwards inside the story', () => {
  const progress = createHouseScrollProgress()
  assert.equal(progress(rect(0), 1000), 0)
  assert.equal(progress(rect(-600), 1000), 0.2)
  assert.equal(progress(rect(-1800), 1000), 0.6)
  assert.equal(progress(rect(-1200), 1000), 0.6)
  assert.equal(progress(rect(-2100), 1000), 0.7)
})

test('resets only after the entire story has left the viewport below', () => {
  const progress = createHouseScrollProgress()
  assert.equal(progress(rect(-3000), 1000), 1)
  assert.equal(progress(rect(-3999), 1000), 1)
  assert.equal(progress(rect(-4000), 1000), 0)
  assert.equal(progress(rect(-4500), 1000), 0)
})

test('stays at the beginning on returning from below, then replays from the top', () => {
  const progress = createHouseScrollProgress()
  progress(rect(-3000), 1000)
  progress(rect(-4000), 1000)
  assert.equal(progress(rect(-3500), 1000), 0)
  assert.equal(progress(rect(-1500), 1000), 0)
  assert.equal(progress(rect(0), 1000), 0)
  assert.equal(progress(rect(-600), 1000), 0.2)
})

test('resets an unfinished visit only when it is completely passed upwards', () => {
  const progress = createHouseScrollProgress()
  progress(rect(-1800), 1000)
  assert.equal(progress(rect(999), 1000), 0.6)
  assert.equal(progress(rect(1000), 1000), 0)
  assert.equal(progress(rect(500), 1000), 0)
  assert.equal(progress(rect(-300), 1000), 0.1)
})

test('handles anchor jumps past the story and returning to its start', () => {
  const progress = createHouseScrollProgress()
  progress(rect(1200), 1000)
  assert.equal(progress(rect(-5000), 1000), 0)
  assert.equal(progress(rect(-2000), 1000), 0)
  assert.equal(progress(rect(1200), 1000), 0)
  assert.equal(progress(rect(-1500), 1000), 0.5)
})
