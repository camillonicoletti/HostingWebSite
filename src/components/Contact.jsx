import { useState } from 'react'
import Icon from './Icon.jsx'
import { brand, contact } from '../content.js'

const empty = { nome: '', email: '', case: '1', oggetto: contact.subjects[0], messaggio: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  // Nessun backend collegato: qui va inserita la chiamata all'API / al servizio email.
  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm(empty)
  }

  return (
    <section className="section" id="contatti">
      <div className="container contact">
        <div className="contact__aside" data-reveal>
          <span className="eyebrow">{contact.eyebrow}</span>
          <h2>{contact.title}</h2>
          <p>{contact.subtitle}</p>

          <ul className="contact__bullets">
            {contact.bullets.map((b) => (
              <li key={b}>
                <Icon name="check" size={18} strokeWidth={1.8} />
                {b}
              </li>
            ))}
          </ul>

          <div className="contact__info">
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{brand.phone}</a>
            <span>{brand.city}</span>
          </div>
        </div>

        <form className="card contact__form" onSubmit={onSubmit} data-reveal style={{ '--d': '.1s' }}>
          <div className="card__glow" aria-hidden="true" />

          <div className="field">
            <label htmlFor="nome">Nome e cognome</label>
            <input id="nome" required value={form.nome} onChange={update('nome')} placeholder="Giulia Ferraro" />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                placeholder="giulia@example.com"
              />
            </div>
            <div className="field">
              <label htmlFor="case">Quante case gestisci</label>
              <select id="case" value={form.case} onChange={update('case')}>
                <option value="1">1</option>
                <option value="2-5">2 – 5</option>
                <option value="6-20">6 – 20</option>
                <option value="20+">più di 20</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="oggetto">Di cosa parliamo</label>
            <select id="oggetto" value={form.oggetto} onChange={update('oggetto')}>
              {contact.subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="messaggio">Messaggio</label>
            <textarea
              id="messaggio"
              rows="4"
              value={form.messaggio}
              onChange={update('messaggio')}
              placeholder="Ho un bilocale in centro e vorrei una guida per gli ospiti in italiano e inglese…"
            />
          </div>

          <button type="submit" className="btn btn--primary btn--full btn--lg">
            Invia richiesta
            <Icon name="arrow" size={16} strokeWidth={2} />
          </button>

          <p className={`contact__ok ${sent ? 'is-on' : ''}`} role="status">
            Grazie! Ti scriviamo entro un giorno lavorativo.
          </p>
        </form>
      </div>
    </section>
  )
}
