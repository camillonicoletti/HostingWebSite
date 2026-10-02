// The visitor's own guide, shared across the page: the colours picked under
// the 3D logo, the name of their house and a style. Every phone preview reads
// it, and "Invia il mio stile" turns it into the opening of the contact form.
import { useSyncExternalStore } from 'react'

export const STYLES = [
  { id: 'classico', name: 'Classico' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'mediterraneo', name: 'Mediterraneo' },
]

// Hue names for the disc; the arrow keeps the name of the swatch or tint.
export const DISC_TINTS = [
  { name: 'Terracotta', hue: 0 },
  { name: 'Oliva', hue: 55 },
  { name: 'Salvia', hue: 105 },
  { name: 'Oceano', hue: 190 },
  { name: 'Lavanda', hue: 255 },
  { name: 'Rosa', hue: 320 },
]
export const tintName = hue => DISC_TINTS.reduce((best, tint) => {
  const d = Math.min(Math.abs(tint.hue - hue), 360 - Math.abs(tint.hue - hue))
  return d < best.d ? { d, name: tint.name } : best
}, { d: 999, name: '' }).name

let state = {
  discHue: 0,
  arrow: { name: 'Avorio', color: null, hue: 0 },
  houseName: '',
  style: 'classico',
  sent: 0,          // bumps each time the visitor sends their style
}
const listeners = new Set()

export function updateGuideStyle(patch) {
  state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) }
  listeners.forEach(listener => listener())
}
const subscribe = listener => { listeners.add(listener); return () => listeners.delete(listener) }
const snapshot = () => state

export function useGuideStyle() {
  return useSyncExternalStore(subscribe, snapshot, snapshot)
}

// Rotate a hex colour around the hue wheel (HSL), same maths as the 3D logo.
export function shiftHue(hex, degrees) {
  if (!degrees) return hex
  const n = parseInt(hex.slice(1), 16)
  let r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2
  let h = 0, s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
    h /= 6
  }
  h = (h + degrees / 360 + 1) % 1
  const k = (t, p, q) => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q
  ;[r, g, b] = s === 0 ? [l, l, l] : [k(h + 1 / 3, p, q), k(h, p, q), k(h - 1 / 3, p, q)]
  return '#' + [r, g, b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('')
}
// Blend a colour toward white: amount 0 keeps it, 1 is white.
export function soften(hex, amount) {
  const n = parseInt(hex.slice(1), 16)
  return '#' + [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(v + (255 - v) * amount).toString(16).padStart(2, '0')).join('')
}

// The phone's colours: with the defaults these are exactly the product's own.
// The disc tint drives the terracotta badges, arrows and language pill; the
// arrow colour drives the olive badges.
export function guideColors({ discHue, arrow }) {
  return {
    '--guide-accent': shiftHue('#A0533A', discHue),
    '--guide-blob': shiftHue('#F2E3D9', discHue),
    '--guide-olive': arrow.color || '#636F48',
    '--guide-blob-olive': arrow.color ? soften(arrow.color, 0.85) : '#ECEBE3',
  }
}

export function styleMessage({ discHue, arrow, houseName, style }) {
  return [
    'Mi piace questo stile per la mia guida:',
    `• Nome della casa: ${houseName.trim() || '(da decidere)'}`,
    `• Stile: ${STYLES.find(item => item.id === style)?.name}`,
    `• Colore di sfondo: ${tintName(discHue)}`,
    `• Colore della freccia: ${arrow.name}`,
  ].join('\n')
}
