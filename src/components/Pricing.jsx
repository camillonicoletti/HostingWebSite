import Icon from './Icon.jsx'
import { pricing } from '../content.js'

export default function Pricing() {
  const { main, addon } = pricing

  return (
    <section className="section" id="prezzo">
      <div className="container">
        <header className="section__head" data-reveal>
          <span className="eyebrow">{pricing.eyebrow}</span>
          <h2>{pricing.title}</h2>
          <p>{pricing.subtitle}</p>
        </header>

        <div className="offer">
          <article className="card offer__main" data-reveal>
            <div className="card__glow" aria-hidden="true" />
            <span className="offer__badge">{main.badge}</span>

            <p className="offer__price">
              <span className="offer__num">{main.price}</span>
              <span className="offer__cur">€</span>
            </p>
            <p className="offer__unit">{main.unit}</p>
            <p className="offer__lead">{main.lead}</p>

            <a className="btn btn--primary btn--full btn--lg" href="#contatti">
              {main.cta}
              <Icon name="arrow" size={16} strokeWidth={2} />
            </a>

            <ul className="offer__list">
              {main.includes.map((f) => (
                <li key={f}>
                  <Icon name="check" size={17} strokeWidth={1.8} />
                  {f}
                </li>
              ))}
            </ul>
          </article>

          <article className="card offer__addon" data-reveal style={{ '--d': '.08s' }}>
            <div className="card__glow" aria-hidden="true" />
            <span className="offer__badge offer__badge--soft">{addon.badge}</span>

            <h3 className="offer__title">{addon.title}</h3>
            <p className="offer__free">{addon.lead}</p>

            <ul className="ladder">
              {addon.rows.map((r) => (
                <li key={r.k} className={`ladder__row ${r.tone ? `is-${r.tone}` : ''}`}>
                  <span className="ladder__dot" />
                  <span className="ladder__k">{r.k}</span>
                  <span className="ladder__v">{r.v}</span>
                </li>
              ))}
            </ul>

            <p className="offer__body">{addon.body}</p>
          </article>
        </div>

        <p className="plans__note" data-reveal>
          <Icon name="shield" size={16} />
          {pricing.note}
        </p>
      </div>
    </section>
  )
}
