import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import HouseJourney from './HouseJourney.jsx'
import PhoneMock from './PhoneMock.jsx'
import './HouseJourney.css'
import './HouseScene3D.css'

// The stops of the camera path. `from` is where each chapter card takes over
// as the camera flies; `progress` is the target used when the journey is driven
// by buttons (small screens, reduced motion) rather than scroll.
const moments = [
  { label: 'Arrivo', icon: 'pin', title: 'Il tuo benvenuto è già qui.', detail: 'La porta si apre: si entra in casa', from: 0, progress: 0 },
  { label: 'Check-in', icon: 'pin', title: 'Le istruzioni per entrare.', detail: 'Orari, codici e chiavi, sulla scrivania', from: 0.17, progress: 0.235 },
  { label: 'Wi-Fi', icon: 'wifi', title: 'La rete, senza doverla chiedere.', detail: 'Nome e password, subito a portata di mano', from: 0.325, progress: 0.35 },
  { label: 'Regole', icon: 'home', title: 'Le cose da sapere, in un posto solo.', detail: 'Orari · rifiuti · piccole attenzioni', from: 0.435, progress: 0.48 },
  { label: 'Check-out', icon: 'check', title: 'Fino all’ultimo saluto.', detail: 'Le regole per partire, sulla porta d’uscita', from: 0.6, progress: 0.65 },
  { label: 'App', icon: 'sparkle', title: 'Tutta la casa, in un solo link.', detail: 'La guida che i tuoi ospiti aprono dal telefono', from: 0.86, progress: 1, phone: true },
]
// Labels pinned to the sheets, each shown only while its stop is on screen
// (`until` keeps the check-out label off the door once we head back outside).
const labels = [
  { name: 'checkin', icon: 'pin', text: 'Regole del check-in', until: 0.325 },
  { name: 'wifi', icon: 'wifi', text: 'Wi-Fi della casa', until: 0.435 },
  { name: 'rules', icon: 'home', text: 'Regole della casa', until: 0.6 },
  { name: 'checkout', icon: 'check', text: 'Regole del check-out', until: 0.67 },
]
const stageAt = p => moments.reduce((stage, moment, i) => (p >= moment.from ? i : stage), 0)
const clamp01 = v => Math.max(0, Math.min(1, v))
const ease = t => t * t * (3 - 2 * t)

// The finale, in scroll progress: back on the opening view the scene pulls the
// camera away so the whole house shrinks; only then the phone rises around the
// small house, the guest app appears on its screen and the house dissolves
// into it. PhoneMock is 286×563.
const PHONE = { w: 286, h: 563 }
const FADE = { phone: [0.93, 0.975], ui: [0.965, 1], gone: [0.975, 1] }
const span = (p, [a, b]) => ease(clamp01((p - a) / (b - a)))

export default function HouseScene3D() {
  const [mobileStage, setMobileStage] = useState(0)
  const [webgl, setWebgl] = useState(null)
  // Once the phone has fully risen it becomes the interactive preview from the
  // home page (cards open, password copies); until then it is decoration.
  const [phoneReady, setPhoneReady] = useState(false)
  const sceneRef = useRef(null)
  const canvasRef = useRef(null)
  const controlsRef = useRef(null)
  const labelRefs = useRef({})
  const stageRef = useRef(0)
  stageRef.current = mobileStage

  useEffect(() => {
    let cancelled = false
    import('../lib/houseScene.js').then(({ supportsWebGL }) => { if (!cancelled) setWebgl(supportsWebGL()) })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!webgl) return
    const canvas = canvasRef.current
    const host = canvas.parentElement
    const scene = sceneRef.current
    const scrollScene = host.closest('[data-scroll-scene]')
    const compact = window.matchMedia('(max-width: 600px)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let world = null, frame = 0, visible = false, disposed = false
    let current = 0, last = 0, ready = false

    const target = () => {
      if (compact.matches || reduced.matches) return moments[stageRef.current].progress
      return parseFloat(scrollScene?.style.getPropertyValue('--progress')) || 0
    }
    const placeLabel = (label, p, w, h) => {
      const node = labelRefs.current[label.name]
      const point = world.project(label.name, w, h)
      node.style.transform = `translate(${point.x.toFixed(1)}px, ${point.y.toFixed(1)}px) translate(-50%, -100%)`
      node.dataset.offscreen = point.visible && p < label.until ? 'false' : 'true'
    }
    // Where the phone sits: centred in the band left free by the heading and,
    // on small screens, by the stage buttons.
    const phoneRect = (w, h) => {
      const controls = controlsRef.current && getComputedStyle(controlsRef.current).display !== 'none'
      const top = 50, bottom = h - (controls ? 112 : 44)
      return { scale: Math.min(1, (bottom - top) / PHONE.h, (w - 56) / PHONE.w), cy: (top + bottom) / 2 }
    }
    const finale = (p, w, h) => {
      const rect = phoneRect(w, h)
      const risen = span(p, FADE.phone)
      if ((risen >= 1) !== ready) {
        ready = risen >= 1
        scene.dataset.phone = ready ? 'ready' : ''
        setPhoneReady(ready)
      }
      host.style.opacity = (1 - span(p, FADE.gone)).toFixed(4)
      scene.style.setProperty('--phone-in', risen.toFixed(4))
      scene.style.setProperty('--phone-ui', span(p, FADE.ui).toFixed(4))
      scene.style.setProperty('--phone-scale', rect.scale.toFixed(4))
      scene.style.setProperty('--phone-y', `${(rect.cy - h / 2).toFixed(2)}px`)
    }
    const tick = now => {
      frame = 0
      if (disposed || !world) return
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
      last = now
      const goal = target()
      const gap = goal - current
      const reset = !compact.matches && !reduced.matches && goal < current
      // Scroll is damped so fast wheel flicks still read as one continuous flight.
      const rate = compact.matches || reduced.matches ? 2.6 : 7
      // An offscreen restart snaps to the opening view without a reverse flight.
      current = reduced.matches || reset ? goal : Math.abs(gap) < 0.0004 ? goal : current + gap * (1 - Math.exp(-dt * rate))
      world.setProgress(current)
      const w = host.clientWidth, h = host.clientHeight
      labels.forEach(label => placeLabel(label, current, w, h))
      scene.dataset.houseStage = String(stageAt(current))
      finale(current, w, h)
      world.render()
      if (visible && current !== goal) frame = requestAnimationFrame(tick)
    }
    const wake = () => {
      const reset = !compact.matches && !reduced.matches && target() < current
      if ((visible || reset) && !frame && !disposed) frame = requestAnimationFrame(tick)
    }
    const resize = () => {
      if (!world) return
      world.setSize(host.clientWidth, host.clientHeight)
      wake()
    }

    import('../lib/houseScene.js').then(({ createHouseScene }) => {
      if (disposed) return
      world = createHouseScene(canvas)
      current = target()
      resize()
      host.dataset.ready = 'true'
    })

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; wake() }, { rootMargin: '120px' })
    observer.observe(host)
    const sizer = new ResizeObserver(resize)
    sizer.observe(host)
    // Fonts arriving later repaint the boards; a re-render shows them.
    document.fonts?.ready.then(wake)
    window.addEventListener('scroll', wake, { passive: true })
    scrollScene?.addEventListener('sceneprogress', wake)
    compact.addEventListener('change', wake)
    reduced.addEventListener('change', wake)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect(); sizer.disconnect()
      window.removeEventListener('scroll', wake)
      scrollScene?.removeEventListener('sceneprogress', wake)
      compact.removeEventListener('change', wake)
      reduced.removeEventListener('change', wake)
      world?.dispose()
    }
  }, [webgl])

  useEffect(() => { window.dispatchEvent(new Event('scroll')) }, [mobileStage])

  if (webgl === false) return <HouseJourney />
  return (
    <div className="house-scene house-scene--3d" data-house-stage="0" ref={sceneRef}>
      <div className="house-scene-heading"><span className="live-dot" /> UN SOGGIORNO, DALL’ARRIVO AL CHECK-OUT.<span className="house-mini-star" aria-hidden="true">✳</span></div>
      <div className="house-phone" aria-hidden={phoneReady ? undefined : 'true'}><PhoneMock decorative={!phoneReady} /></div>
      <div className="house-stage"><canvas ref={canvasRef} className="house-canvas" aria-hidden="true" />
        {labels.map(label => <span className={`house-label house-label--${label.name}`} key={label.name} ref={node => { labelRefs.current[label.name] = node }} aria-hidden="true"><Icon name={label.icon} size={13} /> {label.text}</span>)}
      </div>
      <div className="house-cards">
        {moments.map((moment, i) => moment.phone ? null : (
          <div className={`house-info house-info--${i}`} key={moment.label}>
            <span className="house-info-icon"><Icon name={moment.icon} size={21} /></span>
            <div><small>0{i + 1} / {moment.label.toUpperCase()}</small><strong>{moment.title}</strong><p>{moment.detail}</p></div>
            <span className="house-info-arrow" aria-hidden="true">↗</span>
          </div>
        ))}
      </div>
      <p className="house-phone-caption" aria-hidden="true">Tutta la casa, <i>in un solo link.</i></p>
      <div className="house-mobile-controls" role="group" aria-label="Esplora i momenti del soggiorno" ref={controlsRef}>
        {moments.map((moment, i) => <button key={moment.label} type="button" aria-pressed={mobileStage === i} onClick={() => setMobileStage(i)}>{moment.label}</button>)}
      </div>
      <p className="house-scene-caption">Una casa da vivere. Una guida per sentirsi a casa.</p>
    </div>
  )
}
