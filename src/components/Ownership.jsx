import Icon from './Icon.jsx'
import { ownership } from '../content.js'

// QR finto ma deterministico: nessuna immagine da caricare
const SIDE = 11
const QR = Array.from({ length: SIDE * SIDE }, (_, i) => {
  const x = i % SIDE
  const y = Math.floor(i / SIDE)
  const eye = (cx, cy) => x >= cx && x < cx + 3 && y >= cy && y < cy + 3
  const halo = (cx, cy) => x >= cx - 1 && x < cx + 4 && y >= cy - 1 && y < cy + 4
  if (eye(0, 0) || eye(SIDE - 3, 0) || eye(0, SIDE - 3)) return 1
  if (halo(0, 0) || halo(SIDE - 3, 0) || halo(0, SIDE - 3)) return 0
  return (x * 5 + y * 3 + ((x * y) % 7)) % 3 === 0 ? 1 : 0
})

export default function Ownership() {
  const { card, flow, points } = ownership

  return (
    <section className="section section--alt" id="tuo">
      <div className="container">
        <header className="section__head" data-reveal>
          <span className="eyebrow">{ownership.eyebrow}</span>
          <h2>{ownership.title}</h2>
          <p>{ownership.subtitle}</p>
        </header>

        <div className="own">
          <div className="own__side">
            <article className="deed" data-reveal>
              <div className="deed__shine" aria-hidden="true" />
              <header className="deed__top">
                <span className="deed__label">{card.label}</span>
                <span className="deed__seal">
                  <Icon name="shield" size={13} strokeWidth={2} />
                  {card.seal}
                </span>
              </header>

              <p className="deed__domain">{card.domain}</p>

              <div className="deed__grid">
                <dl className="deed__rows">
                  {card.rows.map((r) => (
                    <div key={r.k}>
                      <dt>{r.k}</dt>
                      <dd>{r.v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="deed__qr" aria-hidden="true">
                  {QR.map((on, i) => (
                    <i key={i} className={on ? 'is-on' : ''} />
                  ))}
                </div>
              </div>
            </article>

            <ol className="flow" data-reveal style={{ '--d': '.06s' }}>
              {flow.map((f, i) => (
                <li key={f} className="flow__step" style={{ '--i': i }}>
                  <span className="flow__n">{i + 1}</span>
                  {f}
                </li>
              ))}
            </ol>
          </div>

          <div className="own__points">
            {points.map((p, i) => (
              <article key={p.title} className="card point" data-reveal style={{ '--d': `${i * 0.06}s` }}>
                <div className="card__glow" aria-hidden="true" />
                <span className="point__icon">
                  <Icon name={p.icon} size={18} />
                </span>
                <div>
                  <span className="card__tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
