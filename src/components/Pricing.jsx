import { useState } from 'react'
import Icon from './Icon.jsx'
import { pricing } from '../content.js'

export default function Pricing() {
  const [yearly, setYearly] = useState(true)

  return (
    <section className="section" id="prezzi">
      <div className="container">
        <header className="section__head" data-reveal>
          <span className="eyebrow">{pricing.eyebrow}</span>
          <h2>{pricing.title}</h2>
          <p>{pricing.subtitle}</p>
        </header>

        <div className="toggle" data-reveal>
          <button
            type="button"
            className={!yearly ? 'is-on' : ''}
            onClick={() => setYearly(false)}
            aria-pressed={!yearly}
          >
            Mensile
          </button>
          <button
            type="button"
            className={yearly ? 'is-on' : ''}
            onClick={() => setYearly(true)}
            aria-pressed={yearly}
          >
            Annuale <em>−20%</em>
          </button>
        </div>

        <p className="swipe-hint">Scorri per confrontare i piani →</p>

        <div className="plans">
          {pricing.plans.map((plan, i) => (
            <article
              key={plan.id}
              className={`card plan ${plan.highlight ? 'plan--hot' : ''}`}
              data-reveal
              style={{ '--d': `${i * 0.08}s` }}
            >
              {plan.highlight && <span className="plan__flag">{plan.highlight}</span>}
              <div className="card__glow" aria-hidden="true" />

              <h3 className="plan__name">{plan.name}</h3>
              <p className="plan__tagline">{plan.tagline}</p>

              <p className="plan__price">
                <span className="plan__cur">€</span>
                <span className="plan__num">{yearly ? plan.yearly : plan.monthly}</span>
                <span className="plan__per">/mese</span>
              </p>
              <p className="plan__cycle">
                {yearly ? 'fatturato annualmente' : 'fatturato mensilmente'}
              </p>

              <a className={`btn ${plan.highlight ? 'btn--primary' : 'btn--glass'} btn--full`} href="#contatti">
                {plan.cta}
              </a>

              <ul className="plan__list">
                {plan.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={17} strokeWidth={1.8} />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="plans__note" data-reveal>
          <Icon name="shield" size={16} />
          {pricing.note}
        </p>
      </div>
    </section>
  )
}
