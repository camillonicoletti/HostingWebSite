import { useState } from 'react'
import Icon from './Icon.jsx'
import { brand } from '../content.js'
import { createContactRequest } from '../lib/contact.js'

const initial = { name: '', email: '', properties: '1', message: '' }
export default function Contact() {
  const [form, setForm] = useState(initial)
  const [request, setRequest] = useState(null)
  const [copyStatus, setCopyStatus] = useState('')
  const update = event => { setForm(current => ({ ...current, [event.target.name]: event.target.value })); setRequest(null); setCopyStatus('') }
  const submit = event => { event.preventDefault(); setRequest(createContactRequest(form, brand.email)); setCopyStatus('') }
  const copy = async () => {
    try { await navigator.clipboard.writeText(request.body); setCopyStatus('Testo copiato. Puoi incollarlo nella tua email.') }
    catch { setCopyStatus('Seleziona e copia il testo qui sotto.') }
  }
  return <section className="contact-section wrap" id="contatti"><div className="contact-copy" data-reveal><div className="eyebrow"><span className="live-dot" /> FACCIAMO GLI ONORI DI CASA</div><h2>Ci racconti<br /><span className="serif">la tua?</span></h2><p>Un appartamento, un B&B, un piccolo mondo da condividere. Partiamo da qui.</p><a className="contact-email" href={`mailto:${brand.email}`}>{brand.email}<Icon name="arrow" size={20} /></a><span className="contact-asterisk" aria-hidden="true">✳</span></div><form className="contact-form" onSubmit={submit}><div className="form-row"><label>Come ti chiami<input required autoComplete="name" name="name" placeholder="Il tuo nome" value={form.name} onChange={update} maxLength={100} /></label><label>La tua email<input required type="email" autoComplete="email" name="email" placeholder="nome@esempio.it" value={form.email} onChange={update} maxLength={200} /></label></div><label>Quante strutture gestisci?<select name="properties" value={form.properties} onChange={update}><option value="1">Una casa, tante storie</option><option value="2–5">Da 2 a 5 strutture</option><option value="6+">6 o più strutture</option></select></label><label>Raccontaci qualcosa<textarea name="message" placeholder="Dove si trova la casa? Come accogli oggi i tuoi ospiti?" rows={3} value={form.message} onChange={update} maxLength={3000} /></label><button className="button button-ink button-full" type="submit">Prepariamo il tuo messaggio <Icon name="arrow" size={20} /></button><p className="form-note">Prepariamo un’email da inviare con la tua app di posta. I dati non vengono inviati da questo modulo.</p>{request && <div className="contact-request" role="status"><h3>Il messaggio è pronto.</h3><p>Apri la tua app di posta e invialo a {brand.email}.</p><div className="request-actions"><a href={request.href} className="button button-coral">Apri la tua email <Icon name="arrow" size={16} /></a><button type="button" className="text-link" onClick={copy}>Copia il testo</button></div><details><summary>Leggi il messaggio</summary><pre>{request.body}</pre></details>{copyStatus && <p>{copyStatus}</p>}</div>}</form></section>
}
