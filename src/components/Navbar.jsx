import { useEffect, useState } from 'react'
import { brand, nav } from '../content.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top" onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden="true">
            <i />
          </span>
          {brand.name}
        </a>

        <nav className="nav__links">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="btn btn--ghost nav__login" href="#contatti">
            Accedi
          </a>
          <a className="btn btn--primary" href="#prezzi">
            Inizia gratis
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <i />
            <i />
          </button>
        </div>
      </div>

      <div className="nav__sheet" onClick={() => setOpen(false)}>
        {nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <a className="btn btn--primary" href="#prezzi">
          Inizia gratis
        </a>
      </div>
    </header>
  )
}
