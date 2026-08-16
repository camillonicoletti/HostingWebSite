import Icon from './Icon.jsx'
import PhoneMock from './PhoneMock.jsx'
import { hero, marquee } from '../content.js'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__aurora hero__aurora--1" />
        <div className="hero__aurora hero__aurora--2" />
        <div className="hero__aurora hero__aurora--3" />
        <div className="hero__scan" />
      </div>

      <div className="hero__inner container">
        <div className="hero__copy">
          <h1 data-reveal style={{ '--d': '.05s' }}>
            {hero.title[0]}
            <br />
            <span className="grad">{hero.title[1]}</span>
          </h1>

          <p className="hero__sub" data-reveal style={{ '--d': '.12s' }}>
            {hero.subtitle}
          </p>

          <div className="hero__cta" data-reveal style={{ '--d': '.18s' }}>
            <a className="btn btn--primary btn--lg" href="#prodotto">
              {hero.primaryCta}
              <Icon name="arrow" size={16} strokeWidth={2} />
            </a>
            <a className="btn btn--glass btn--lg" href="#come-funziona">
              <Icon name="play" size={16} strokeWidth={2} />
              {hero.secondaryCta}
            </a>
          </div>

          <dl className="hero__stats" data-reveal style={{ '--d': '.24s' }}>
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__visual" data-reveal style={{ '--d': '.1s' }}>
          <PhoneMock />
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i}>
              <i className="marquee__star">✦</i>
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
