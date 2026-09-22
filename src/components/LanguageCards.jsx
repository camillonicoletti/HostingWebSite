import { useEffect, useRef, useState } from 'react'

// Three greeting cards that shuffle: every few seconds the front card retires
// to the back-right, the back-right slides left and the left one comes forward.
const cards = [
  { text: 'Ciao.', tone: 'paper' },
  { text: 'Hello.', tone: 'ink' },
  { text: 'Bonjour.', tone: 'coral' },
]
const EVERY = 3000

export default function LanguageCards() {
  const [turn, setTurn] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer = 0
    const start = () => { if (!timer) timer = setInterval(() => { if (!document.hidden) setTurn(t => t + 1) }, EVERY) }
    const stop = () => { clearInterval(timer); timer = 0 }
    // Only shuffle while the card is on screen.
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: .3 })
    observer.observe(ref.current)
    return () => { stop(); observer.disconnect() }
  }, [])

  return <div className="language-art" aria-hidden="true" ref={ref}>
    {cards.map((card, i) => <span key={card.text} className={`language-card language-card--${card.tone}`} data-slot={(i - turn % 3 + 3) % 3}>{card.text}</span>)}
  </div>
}
