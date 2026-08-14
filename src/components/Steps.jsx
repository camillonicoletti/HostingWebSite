import { steps } from '../content.js'

export default function Steps() {
  return (
    <section className="section section--alt" id="come-funziona">
      <div className="container">
        <header className="section__head" data-reveal>
          <span className="eyebrow">{steps.eyebrow}</span>
          <h2>{steps.title}</h2>
        </header>

        <ol className="steps">
          {steps.items.map((s, i) => (
            <li key={s.n} className="step" data-reveal style={{ '--d': `${i * 0.08}s` }}>
              <span className="step__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
