import Icon from './Icon.jsx'
import { features } from '../content.js'

export default function Features() {
  return (
    <section className="section" id="prodotto">
      <div className="container">
        <header className="section__head" data-reveal>
          <span className="eyebrow">{features.eyebrow}</span>
          <h2>{features.title}</h2>
          <p>{features.subtitle}</p>
        </header>

        <p className="swipe-hint swipe-hint--always" data-reveal>
          {features.hint}
        </p>
      </div>

      <div className="rail-wrap" data-reveal>
        <div className="rail container">
          {features.items.map((item) => (
            <article key={item.title} className="card rail__item">
              <div className="card__glow" aria-hidden="true" />
              <span className="card__icon">
                <Icon name={item.icon} size={20} />
              </span>
              <span className="card__tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
