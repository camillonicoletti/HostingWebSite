import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { phoneCards } from '../content.js'

const langs = ['IT', 'EN', 'FR']
const WIFI_PASS = 'CasaFiori-2026'
const GLITCH_CHARS = '!<>-_\\/[]{}=+*^?#01@$%&'

// Posizione del puntatore in % dello schermo del telefono
const POS = {
  idle: { x: 50, y: 92 },
  checkin: { x: 30, y: 24 },
  wifi: { x: 72, y: 24 },
  regole: { x: 30, y: 40 },
  trasporti: { x: 30, y: 56 },
  close: { x: 87, y: 18 },
  copy: { x: 52, y: 64 },
}

// Copione della demo: ogni passo applica uno stato e attende
const SCRIPT = [
  { wait: 900, set: { aim: 'idle', press: false, sheet: null, hacked: false } },
  { wait: 780, set: { aim: 'checkin' } },
  { wait: 340, set: { press: true } },
  { wait: 560, set: { press: false, sheet: 'checkin' } },
  { wait: 2900, set: { aim: 'close' } },
  { wait: 320, set: { press: true } },
  { wait: 620, set: { press: false, sheet: null } },
  { wait: 700, set: { aim: 'wifi' } },
  { wait: 340, set: { press: true } },
  { wait: 620, set: { press: false, sheet: 'wifi' } },
  { wait: 1500, set: { aim: 'copy' } },
  { wait: 340, set: { press: true } },
  { wait: 2800, set: { press: false, hacked: true } },
  { wait: 800, set: { aim: 'close' } },
  { wait: 320, set: { press: true } },
  { wait: 620, set: { press: false, sheet: null, hacked: false } },
  { wait: 700, set: { aim: 'regole' } },
  { wait: 340, set: { press: true } },
  { wait: 3100, set: { press: false, sheet: 'regole' } },
  { wait: 700, set: { aim: 'close' } },
  { wait: 320, set: { press: true } },
  { wait: 620, set: { press: false, sheet: null } },
  { wait: 700, set: { aim: 'trasporti' } },
  { wait: 340, set: { press: true } },
  { wait: 3400, set: { press: false, sheet: 'trasporti' } },
  { wait: 700, set: { aim: 'close' } },
  { wait: 320, set: { press: true } },
  { wait: 900, set: { press: false, sheet: null } },
]

function CheckinSheet() {
  return (
    <>
      <div className="srow">
        <p className="sheet__k">Indirizzo</p>
        <p className="sheet__v">Via delle Magnolie 24 — Milano</p>
      </div>
      <div className="sheet__sep" />
      <div className="srow">
        <p className="sheet__k">Orari</p>
        <p className="sheet__v">Check-in dalle 15:00 alle 20:00. Avvisaci 24 ore prima.</p>
      </div>
      <div className="sheet__photo">
        <Icon name="home" size={18} />
        Foto del portone
      </div>
      <div className="srow">
        <p className="sheet__k">Come entrare</p>
        <p className="sheet__v">Citofono 24. Le chiavi sono nella cassetta accanto al portone.</p>
      </div>
      <div className="sheet__btn">
        Apri in Google Maps
        <Icon name="arrow" size={14} strokeWidth={2.4} />
      </div>
    </>
  )
}

function WifiSheet({ pass }) {
  return (
    <>
      <div className="wifi">
        <div className="srow">
          <p className="sheet__k">Nome rete</p>
          <p className="sheet__v sheet__v--strong">CasaFiori_5G</p>
        </div>
        <div className="sheet__sep" />
        <div className="srow">
          <p className="sheet__k">Password</p>
          <p className="wifi__pass">{pass}</p>
        </div>
      </div>
      <div className="sheet__btn sheet__btn--wifi">
        <Icon name="copy" size={15} strokeWidth={1.9} />
        Copia password
      </div>
      <p className="sheet__foot">La rete arriva in tutta la casa, terrazzo compreso.</p>
    </>
  )
}

const RULES = [
  { n: '01', t: 'Rispetto del vicinato', b: 'Niente musica alta dopo le 22, le pareti sono sottili.' },
  { n: '02', t: 'Raccolta differenziata', b: 'Il calendario è sul frigo: carta il martedì, umido ogni giorno.' },
  { n: '03', t: 'Fumo e animali', b: 'Si fuma solo in terrazzo. Cani e gatti benvenuti, avvisaci prima.' },
  { n: '04', t: 'Spazi comuni', b: 'Cucina e terrazzo sono di tutti: lasciali come li hai trovati.' },
]

function RegoleSheet() {
  return (
    <>
      {RULES.map((r) => (
        <div key={r.n} className="rule">
          <span className="rule__n">{r.n}</span>
          <span>
            <b>{r.t}</b>
            <em>{r.b}</em>
          </span>
        </div>
      ))}
    </>
  )
}

function TrasportiSheet() {
  return (
    <>
      <div className="line">
        <span className="line__chip">
          <Icon name="train" size={13} strokeWidth={2} />
          Tram 14 · Duomo
        </span>
        <div className="line__meta">
          <span>
            <b>Fermata</b>
            Magnolie / Ripa
          </span>
          <span>
            <b>A piedi</b>
            3 minuti
          </span>
        </div>
        <div className="stops">
          {['Ripa', 'Sant’Agostino', 'Duomo'].map((s, i) => (
            <span key={s} className={`stop ${i === 0 ? 'is-first' : ''}`}>
              <i />
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="taxi">
        <span>
          <b>Radiotaxi</b>
          <em>Attivo 24 ore su 24</em>
        </span>
        <span className="taxi__num">02 8585</span>
      </div>

      <div className="taxi">
        <span>
          <b>Bici e monopattini</b>
          <em>Rastrelliera a 80 metri</em>
        </span>
        <span className="taxi__num">4 liberi</span>
      </div>

      <div className="stores">
        <span className="store">
          <Icon name="bolt" size={13} strokeWidth={2} />
          App dei mezzi
        </span>
        <span className="store">
          <Icon name="pin" size={13} strokeWidth={2} />
          Mappa metro
        </span>
      </div>
    </>
  )
}

const SHEETS = {
  checkin: { title: 'Check-in', sub: 'Arrivo e accesso' },
  wifi: { title: 'Wi-Fi', sub: 'Rete e password' },
  regole: { title: 'Regole della casa', sub: 'Le cose essenziali' },
  trasporti: { title: 'Trasporti', sub: 'Come muoverti in zona' },
}

export default function PhoneMock() {
  const [st, setSt] = useState({ aim: 'idle', press: false, sheet: null, hacked: false })
  const [pass, setPass] = useState(WIFI_PASS)
  const [still, setStill] = useState(false)
  // tiene il contenuto anche mentre il pannello scende
  const [shown, setShown] = useState('checkin')
  const step = useRef(0)

  useEffect(() => {
    if (st.sheet) setShown(st.sheet)
  }, [st.sheet])

  // Riproduce il copione in loop
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true)
      return
    }
    let timer
    const run = () => {
      const s = SCRIPT[step.current % SCRIPT.length]
      setSt((prev) => ({ ...prev, ...s.set }))
      timer = setTimeout(() => {
        step.current += 1
        run()
      }, s.wait)
    }
    run()
    return () => clearTimeout(timer)
  }, [])

  // Password che "si scompone" quando parte la copia
  useEffect(() => {
    if (!st.hacked) {
      setPass(WIFI_PASS)
      return
    }
    let n = 0
    const id = setInterval(() => {
      n += 1
      if (n > 11) {
        clearInterval(id)
        setPass(WIFI_PASS)
        return
      }
      setPass(
        WIFI_PASS.split('')
          .map((c, i) => (i < n - 2 ? c : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]))
          .join('')
      )
    }, 70)
    return () => clearInterval(id)
  }, [st.hacked])

  const p = POS[st.aim] ?? POS.idle
  const sheet = SHEETS[shown]
  const dim = st.sheet ? 'is-dim' : ''

  return (
    <div className="phone" aria-hidden="true">
      <div className="phone__glow" />
      <div className="phone__body">
        <div className="phone__notch" />
        <div className={`phone__screen ${st.hacked ? 'is-hacked' : ''}`}>
          <header className={`app__top ${dim}`}>
            <div className="app__langs">
              {langs.map((l) => (
                <span key={l} className={`app__lang ${l === 'IT' ? 'is-on' : ''}`}>
                  {l}
                </span>
              ))}
            </div>
            <div className="app__title">
              <h3>LA MIA CASA</h3>
              <p>Via delle Magnolie 24 · Milano</p>
            </div>
          </header>

          <div className={`app__grid ${dim}`}>
            {phoneCards.map((card) => (
              <div
                key={card.id}
                className={`app__card ${st.aim === card.id && !st.sheet ? 'is-active' : ''} ${
                  st.aim === card.id && st.press ? 'is-press' : ''
                }`}
              >
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

          <nav className={`app__bar ${dim}`}>
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

          {/* pannello che sale dal basso */}
          <section className={`sheet sheet--${shown} ${st.sheet ? 'is-open' : ''}`}>
            <span className="sheet__grab" />
            <header className="sheet__head">
              <div className="sheet__title">
                <h4>{sheet?.title ?? ''}</h4>
                <p>{sheet?.sub ?? ''}</p>
              </div>
              <span className={`sheet__x ${st.aim === 'close' && st.press ? 'is-press' : ''}`}>
                <Icon name="close" size={15} strokeWidth={2.2} />
              </span>
            </header>

            <div className="sheet__body">
              {shown === 'checkin' && <CheckinSheet />}
              {shown === 'wifi' && <WifiSheet pass={pass} />}
              {shown === 'regole' && <RegoleSheet />}
              {shown === 'trasporti' && <TrasportiSheet />}
            </div>

            <div className={`toast ${st.hacked ? 'is-on' : ''}`}>Password copiata</div>
          </section>

          {!still && (
            <span
              className={`pointer ${st.press ? 'is-press' : ''}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className="pointer__ring" />
              <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                <path
                  d="M5.5 2.8 19 12.2l-5.7 1.1 3 5.9-2.7 1.3-2.9-5.9-4.2 4Z"
                  fill="#fff"
                  stroke="#0d1420"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
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
