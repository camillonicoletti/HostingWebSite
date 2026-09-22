import { faqs } from '../content.js'

export default function Questions() {
  return <section className="faq-section wrap" id="domande"><div className="faq-intro" data-reveal><div className="eyebrow">PRIMA DI SENTIRCI</div><h2>Hai una<br /><span className="serif">domanda?</span></h2><p>Partiamo da quelle più utili.</p><a className="text-link" href="#contatti">Parliamone insieme <span>↗</span></a></div><div className="faq-list">{faqs.map((faq, i) => <details key={faq.q} className="faq-item"><summary><span className="faq-number">0{i+1}</span><span>{faq.q}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{faq.a}</p></details>)}</div></section>
}
