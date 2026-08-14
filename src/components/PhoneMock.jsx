import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import { phoneCards } from '../content.js'

const langs = ['IT', 'EN', 'FR']

// Riproduzione fedele della web app ospiti: è la "prova" del prodotto dentro l'hero.
export default function PhoneMock() {
  const [lang, setLang] = useState('IT')
  const [active, setActive] = useState(0)

  // Un tap "fantasma" gira tra le card per dare vita al mockup.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => setActive((i) => (i + 1) % phoneCards.length), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="phone" aria-hidden="true">
      <div className="phone__glow" />
      <div className="phone__body">
        <div className="phone__notch" />
        <div className="phone__screen">
          <header className="app__top">
            <div className="app__langs">
              {langs.map((l) => (
                <button
                  key={l}
                  type="button"
                  tabIndex={-1}
                  className={`app__lang ${lang === l ? 'is-on' : ''}`}
                  onClick={() => setLang(l)}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="app__title">
              <h3>LA MIA CASA</h3>
              <p>Via dei Fiori 12 · Milano</p>
            </div>
          </header>

          <div className="app__grid">
            {phoneCards.map((card, i) => (
              <div key={card.id} className={`app__card ${active === i ? 'is-active' : ''}`}>
                <span className={`app__badge app__badge--${card.tone}`}>
                  <Icon name={card.icon} size={16} strokeWidth={1.9} />
                </span>
                <p className="app__label">{card.label}</p>
                <span className="app__arrow">
                  <Icon name="arrow" size={13} strokeWidth={2.2} />
                </span>
              </div>
            ))}
          </div>

          <nav className="app__bar">
            <span>
              <Icon name="chat" size={16} />
              WhatsApp host
            </span>
            <span>
              <Icon name="recycle" size={16} />
              Raccolta
            </span>
            <span>
              <Icon name="alert" size={16} />
              Emergenze
            </span>
          </nav>
        </div>
      </div>

      <figure className="float float--a">
        <Icon name="wifi" size={18} />
        <figcaption>
          <b>Wi-Fi copiato</b>
          <span>CasaFiori_5G</span>
        </figcaption>
      </figure>

      <figure className="float float--b">
        <Icon name="bolt" size={18} />
        <figcaption>
          <b>0 domande</b>
          <span>ricevute stanotte</span>
        </figcaption>
      </figure>

      <figure className="float float--c">
        <span className="float__dot" />
        <figcaption>
          <b>Ospite arrivato</b>
          <span>check-in autonomo · 23:41</span>
        </figcaption>
      </figure>
    </div>
  )
}
