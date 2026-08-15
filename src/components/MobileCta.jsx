import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

// Barra fissa in basso, solo mobile: compare dopo l'hero.
export default function MobileCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.scrollY + window.innerHeight > document.body.scrollHeight - 320
      setShow(window.scrollY > 560 && !nearEnd)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`mcta ${show ? 'is-on' : ''}`}>
      <div className="mcta__copy">
        <b>49 € una tantum</b>
        <span>assistenza inclusa 3 mesi</span>
      </div>
      <a className="btn btn--primary" href="#contatti">
        Provala
        <Icon name="arrow" size={15} strokeWidth={2.2} />
      </a>
    </div>
  )
}
