import { useEffect, useRef, useState } from 'react'

// The brand mark assembling itself in 3D as the "come funziona" section
// scrolls, with a tint slider underneath: every colour of the mark turns
// together, a small taste of making the guide one's own. Falls back to the
// flat mark where WebGL is unavailable.
const BASE = { disc: '#C9755B', accent: '#f29a7f' }
const PRESETS = [
  { name: 'Terracotta', hue: 0 },
  { name: 'Oliva', hue: 55 },
  { name: 'Salvia', hue: 105 },
  { name: 'Oceano', hue: 190 },
  { name: 'Lavanda', hue: 255 },
  { name: 'Rosa', hue: 320 },
]

// Rotate a hex colour around the hue wheel (HSL), same maths as the scene.
function shiftHue(hex, degrees) {
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
const track = `linear-gradient(90deg, ${Array.from({ length: 13 }, (_, i) => shiftHue(BASE.disc, i * 30)).join(', ')})`
const nearest = hue => PRESETS.reduce((best, preset) => {
  const d = Math.min(Math.abs(preset.hue - hue), 360 - Math.abs(preset.hue - hue))
  return d < best.d ? { d, name: preset.name } : best
}, { d: 999, name: '' })

function FlatMark() {
  return <svg className="logo-build-flat" viewBox="-50 -50 100 100" aria-hidden="true">
    <defs><linearGradient id="logo-build-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#EAA184" /><stop offset="1" stopColor="#C9755B" /></linearGradient></defs>
    <circle r="50" fill="url(#logo-build-gradient)" />
    <g fill="none" stroke="#F4F0E6" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" transform="translate(-3 0) scale(1 -1)">
      <path d="M-36 2 0 33 36 2M-25 8v-35h45M25 8v-5" />
      <path d="M-3 17v-23a10 10 0 0 0 10-10h13" strokeWidth="13" stroke="#94503E" />
      <path d="M-3 17v-23a10 10 0 0 0 10-10h13" strokeWidth="8" />
      <path d="M23.5-3v-26l24 13Z" fill="#F4F0E6" stroke="#94503E" strokeWidth="3" />
    </g>
  </svg>
}

export default function LogoBuild3D() {
  const [webgl, setWebgl] = useState(null)
  const [hue, setHue] = useState(0)
  const canvasRef = useRef(null)
  const worldRef = useRef(null)
  const wakeRef = useRef(() => {})

  useEffect(() => {
    let cancelled = false
    import('../lib/logoScene.js').then(({ supportsWebGL }) => { if (!cancelled) setWebgl(supportsWebGL()) })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!webgl) return
    const canvas = canvasRef.current
    const host = canvas.parentElement
    const scrollScene = host.closest('[data-scroll-scene]')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let world = null, frame = 0, visible = false, disposed = false
    let current = 0, last = 0

    const target = () => reduced.matches ? 1 : parseFloat(scrollScene?.style.getPropertyValue('--progress')) || 0
    const tick = now => {
      frame = 0
      if (disposed || !world) return
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
      last = now
      const goal = target()
      const gap = goal - current
      current = reduced.matches ? goal : Math.abs(gap) < 0.0004 ? goal : current + gap * (1 - Math.exp(-dt * 6))
      world.setProgress(current)
      world.render()
      if (visible && current !== goal) frame = requestAnimationFrame(tick)
    }
    const wake = () => { if (visible && !frame && !disposed) frame = requestAnimationFrame(tick) }
    wakeRef.current = wake
    const resize = () => { if (world) { world.setSize(host.clientWidth, host.clientHeight); wake() } }

    import('../lib/logoScene.js').then(({ createLogoScene }) => {
      if (disposed) return
      world = worldRef.current = createLogoScene(canvas)
      current = target()
      resize()
      host.dataset.ready = 'true'
    })
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; wake() }, { rootMargin: '120px' })
    observer.observe(host)
    const sizer = new ResizeObserver(resize)
    sizer.observe(host)
    window.addEventListener('scroll', wake, { passive: true })
    reduced.addEventListener('change', wake)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect(); sizer.disconnect()
      window.removeEventListener('scroll', wake)
      reduced.removeEventListener('change', wake)
      world?.dispose()
      worldRef.current = null
    }
  }, [webgl])

  // The chosen tint recolours the mark and the section's own accents.
  useEffect(() => {
    worldRef.current?.setHue(hue)
    worldRef.current?.render()
    const section = canvasRef.current?.closest('.process-section')
    section?.style.setProperty('--tint-accent', shiftHue(BASE.accent, hue))
    section?.style.setProperty('--tint-disc', shiftHue(BASE.disc, hue))
  }, [hue, webgl])

  const tint = <div className="logo-tint">
    <label className="logo-tint-label" htmlFor="logo-tint">IL TUO COLORE <i className="logo-tint-name">{nearest(hue).name}</i></label>
    <input id="logo-tint" className="logo-tint-range" type="range" min="0" max="359" value={hue} style={{ '--tint-track': track }} aria-valuetext={nearest(hue).name} onChange={e => setHue(Number(e.target.value))} />
    <div className="logo-tint-presets" role="group" aria-label="Tinte pronte">
      {PRESETS.map(preset => <button key={preset.name} type="button" title={preset.name} aria-label={preset.name} aria-pressed={hue === preset.hue} style={{ '--swatch': shiftHue(BASE.disc, preset.hue) }} onClick={() => setHue(preset.hue)} />)}
    </div>
  </div>

  if (webgl === false) return <div className="logo-build" aria-hidden="true"><FlatMark /></div>
  return <div className="logo-build"><canvas ref={canvasRef} className="logo-build-canvas" aria-hidden="true" />{tint}</div>
}
