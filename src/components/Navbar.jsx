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
            Contatti
          </a>
          <a className="btn btn--primary" href="#contatti">
            Richiedi la tua
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
        <div className="nav__sheet-links">
          {nav.map((item, i) => (
            <a key={item.href} href={item.href}>
              <span className="nav__sheet-n">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav__sheet-foot">
          <a className="btn btn--primary btn--lg btn--full" href="#contatti">
            Richiedi la tua casa
          </a>
          <a className="nav__sheet-mail" href={`mailto:${brand.email}`}>
            {brand.email}
          </a>
        </div>
      </div>
    </header>
  )
}
