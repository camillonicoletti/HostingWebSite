import { reviews } from '../content.js'

function Stars({ n }) {
  return (
    <div className="stars" aria-label={`${n} stelle su 5`}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="section section--alt" id="recensioni">
      <div className="container">
        <header className="section__head" data-reveal>
          <span className="eyebrow">{reviews.eyebrow}</span>
          <h2>{reviews.title}</h2>
        </header>

        <p className="swipe-hint">{reviews.hint}</p>

        <div className="reviews">
          {reviews.items.map((r, i) => (
            <figure key={r.name} className="card review" data-reveal style={{ '--d': `${i * 0.06}s` }}>
              <div className="card__glow" aria-hidden="true" />
              <Stars n={r.score} />
              <blockquote>{r.quote}</blockquote>
              <figcaption>
                <span className="review__avatar" aria-hidden="true">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <b>{r.name}</b>
                  <small>{r.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
