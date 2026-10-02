import { useState } from 'react'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import PaymentMarks from './PaymentMarks.jsx'
import { brand, order } from '../content.js'
import { checkoutUrl, orderReference } from '../lib/checkout.js'

// The checkout behind "Ordina ora", laid out like a shop checkout: contact and
// home details on the left, the order summary in a side pane. Payment happens
// on Stripe; the email and the home (as Stripe's reference) travel with it,
// the rest is gathered after purchase. With no Payment Link configured yet,
// the page says so instead of paying.
const includes = ['Guida con i contenuti della tua casa', 'Sezioni e stile concordati insieme', 'Lingue definite nella proposta', 'Link e QR pronto da stampare', 'Pubblicazione online inclusa', 'Contenuti e file sorgente consegnati', 'Primo mese di assistenza incluso']
const after = [
  { icon: 'chat', title: 'Ti scriviamo entro 24 ore', text: 'Raccogliamo le informazioni della casa.' },
  { icon: 'sparkle', title: 'Prepariamo la guida', text: 'Ti mandiamo l’anteprima da rivedere.' },
  { icon: 'arrow', title: 'Link e QR pronti', text: 'La condividi con ogni ospite.' },
]
const euro = value => value.toLocaleString('it-IT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 })

function Summary({ open, onToggle }) {
  return <div className="checkout-summary-inner">
    <div className="checkout-line">
      <span className="checkout-thumb"><Icon name="home" size={24} /><i>1</i></span>
      <div><b>{order.product}</b><small>{order.priceNote}</small></div>
      <strong>{euro(order.price)}</strong>
    </div>
    <button type="button" className="checkout-includes-toggle" aria-expanded={open} onClick={onToggle}>Cosa è incluso <span aria-hidden="true">{open ? '−' : '+'}</span></button>
    {open && <ul className="checkout-includes">{includes.map(item => <li key={item}><Icon name="check" size={14} />{item}</li>)}</ul>}
    <div className="checkout-rows">
      <div><span>Subtotale</span><span>{euro(order.price)}</span></div>
      <div><span>Codice sconto</span><span className="checkout-muted">nella pagina di pagamento</span></div>
    </div>
    <div className="checkout-total"><span>Totale</span><span><small>EUR</small> {euro(order.price)}</span></div>
    <ol className="checkout-after">{after.map(step => <li key={step.title}><Icon name={step.icon} size={16} /><div><b>{step.title}</b><p>{step.text}</p></div></li>)}</ol>
  </div>
}

export default function OrderPage() {
  const paid = new URLSearchParams(window.location.search).has('pagato')
  const [form, setForm] = useState({ email: '', home: '', city: '', terms: false })
  const [error, setError] = useState('')
  const [includesOpen, setIncludesOpen] = useState(true)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const ready = Boolean(order.stripeLink)
  const update = event => {
    const { name, type, checked, value } = event.target
    setForm(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setError('')
  }
  const pay = event => {
    event.preventDefault()
    const home = [form.home, form.city].map(part => part.trim()).filter(Boolean).join(' ')
    const url = checkoutUrl(order.stripeLink, { email: form.email, reference: orderReference(home) })
    if (!url) { setError('Il pagamento online non è ancora attivo. Scrivici e ti mandiamo il link per pagare.'); return }
    window.location.assign(url)
  }

  if (paid) return <div className="checkout-page checkout-page--done">
    <header className="checkout-brand"><a href="/" aria-label="LaMiaCasa — torna al sito"><Logo /></a></header>
    <main className="order-thanks">
      <span className="order-thanks-seal"><Icon name="check" size={34} /></span>
      <h1>Grazie, <span className="serif">ci siamo.</span></h1>
      <p>Il pagamento è andato a buon fine e riceverai la ricevuta via email. Entro 24 ore ti scriviamo per iniziare a preparare la tua guida.</p>
      <a className="button button-ink" href="/">Torna al sito <Icon name="arrow" size={18} /></a>
    </main>
  </div>

  return <div className="checkout-page">
    <div className="checkout-main">
      <header className="checkout-brand"><a href="/" aria-label="LaMiaCasa — torna al sito"><Logo /></a><a className="checkout-back" href="/#prezzo">← Torna al sito</a></header>
      <nav className="checkout-crumbs" aria-label="Passaggi dell’ordine"><span aria-current="step">Dati</span><span aria-hidden="true">›</span><span>Pagamento</span><span aria-hidden="true">›</span><span>Conferma</span></nav>

      {/* On small screens the summary folds above the form, as in shop checkouts. */}
      <div className="checkout-summary-mobile">
        <button type="button" aria-expanded={summaryOpen} onClick={() => setSummaryOpen(open => !open)}><span>{summaryOpen ? 'Nascondi' : 'Mostra'} riepilogo ordine</span><b>{euro(order.price)}</b></button>
        {summaryOpen && <Summary open={includesOpen} onToggle={() => setIncludesOpen(open => !open)} />}
      </div>

      <form className="checkout-form" onSubmit={pay}>
        <section>
          <h2>Contatto</h2>
          <label className="checkout-field"><span>Email</span><input required type="email" name="email" value={form.email} onChange={update} placeholder="nome@esempio.it" maxLength={200} autoComplete="email" /></label>
          <p className="checkout-hint">Ti mandiamo qui la ricevuta e i prossimi passi.</p>
        </section>
        <section>
          <h2>La tua struttura</h2>
          <div className="checkout-row">
            <label className="checkout-field"><span>Nome della struttura</span><input required name="home" value={form.home} onChange={update} placeholder="Casa Sole" maxLength={60} autoComplete="organization" /></label>
            <label className="checkout-field"><span>Città</span><input required name="city" value={form.city} onChange={update} placeholder="Matera" maxLength={40} autoComplete="address-level2" /></label>
          </div>
        </section>
        <section>
          <h2>Pagamento</h2>
          <p className="checkout-hint">Tutte le transazioni sono sicure e crittografate. Completerai il pagamento sulla pagina protetta di Stripe.</p>
          <PaymentMarks className="checkout-marks" />
          <label className="checkout-terms"><input type="checkbox" name="terms" required checked={form.terms} onChange={update} /><span>Accetto le condizioni di vendita e l’informativa sulla privacy.</span></label>
          <button className="button button-ink button-full checkout-pay" type="submit">{ready ? `Paga ${euro(order.price)}` : `Ordina ora · ${euro(order.price)}`} <Icon name="arrow" size={19} /></button>
          {error && <p className="order-error" role="alert">{error} <a href={`mailto:${brand.email}?subject=${encodeURIComponent(`Ordine guida — ${form.home.trim() || 'la mia struttura'}`)}`}>{brand.email}</a></p>}
          <p className="checkout-secure"><Icon name="shield" size={14} /> Pagamento protetto da Stripe · Nessun abbonamento</p>
          {!ready && <p className="order-setup" role="note">Anteprima: il pagamento si attiva inserendo il link Stripe in <code>src/content.js</code>.</p>}
        </section>
      </form>
      <footer className="checkout-foot"><a href="/#domande">Domande frequenti</a><a href={`mailto:${brand.email}`}>{brand.email}</a></footer>
    </div>
    <aside className="checkout-summary" aria-label="Riepilogo ordine"><Summary open={includesOpen} onToggle={() => setIncludesOpen(open => !open)} /></aside>
  </div>
}
