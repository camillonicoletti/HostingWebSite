import { useState } from 'react'
import { guideCards, brand } from '../content.js'
import Icon from './Icon.jsx'
import { LogoMark } from './Logo.jsx'

const details = {
  checkin: { title: 'Benvenuti a casa.', text: 'Check-in dalle 15:00. Qui trovi la foto del portone e le indicazioni per il tuo arrivo.', label: 'Arrivo e accesso', icon: 'pin' },
  wifi: { title: 'Facciamo connessione.', text: 'Rete: CasaMagnolie · Password dimostrativa', label: 'Wi-Fi', icon: 'wifi' },
  rules: { title: 'Piccole attenzioni.', text: 'Rispetta il vicinato e gli spazi comuni. Qui trovi le regole della tua casa.', label: 'Regole della casa', icon: 'home' },
  groceries: { title: 'La spesa, qui vicino.', text: 'I supermercati della zona, con indirizzi e informazioni utili concordati con il tuo host.', label: 'Supermercati', icon: 'cart' },
  transport: { title: 'La città ti aspetta.', text: 'Fermate, collegamenti e indicazioni per muoverti nei dintorni della casa.', label: 'Trasporti', icon: 'train' },
  health: { title: 'Un aiuto, se serve.', text: 'Farmacie e contatti sanitari utili da consultare durante il soggiorno.', label: 'Farmacie', icon: 'cross' },
  services: { title: 'Tutto nei dintorni.', text: 'I servizi e gli indirizzi utili vicino alla tua struttura, raccolti in un posto solo.', label: 'Servizi in zona', icon: 'globe' },
  checkout: { title: 'Al prossimo soggiorno.', text: 'Check-out entro le 10:00. Controlla di avere tutto e segui le indicazioni per lasciare le chiavi.', label: 'Check-out', icon: 'check' },
}
export default function PhoneMock({ decorative = false }) {
  const [active, setActive] = useState(null)
  const [copied, setCopied] = useState(false)
  const [touched, setTouched] = useState(false)
  const detail = details[active]
  const open = id => { setTouched(true); setCopied(false); setActive(id) }
  // A tapping hand on the first card says "try me" until the visitor does.
  const hint = !decorative && !touched
  const copy = async () => {
    try { await navigator.clipboard.writeText('Magnolie-Demo'); setCopied(true) }
    catch { setCopied(false) }
  }
  return <div className="phone-object" aria-hidden={decorative || undefined}>
    <div className="phone-side phone-side--left" /><div className="phone-side phone-side--right" />
    <div className="phone-frame"><div className="phone-screen"><div className="phone-status"><span>9:41</span><div className="phone-island" /><span className="phone-signal">▮▮▮ <span className="battery" /></span></div>
      <div className="guest-header"><div className="guest-topline"><LogoMark /><span>LA TUA GUIDA OSPITI</span><span className="guest-lang">IT</span></div><h3>Benvenuti<br />a <i>casa.</i></h3><p>Casa Magnolie · Milano</p></div>
      <div className="guest-grid">{guideCards.map((card, i) => <button tabIndex={decorative ? -1 : undefined} key={card.id} onClick={() => open(card.id)} className={`guest-card guest-card--${i % 3}`} aria-label={`Apri ${card.label} nell’anteprima`}><Icon name={card.icon} size={21} /><span>{card.label}</span><span className="guest-card-arrow">↗</span>{i === 0 && hint && <span className="guest-hint" aria-hidden="true"><span className="guest-hint-ring" /><svg viewBox="0 0 24 24" width="32" height="32" fill="#fffdf6" stroke="#272b28" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><path d="M9 12V4.6a1.8 1.8 0 0 1 3.6 0v6.6m0-2.6a1.7 1.7 0 0 1 3.4 0v3.2m0-1.7a1.6 1.6 0 0 1 3.2 0V16a6 6 0 0 1-6 6h-1.4a6 6 0 0 1-4.9-2.5l-3.1-4.3a1.7 1.7 0 0 1 2.7-2L9 15.5" /></svg></span>}</button>)}</div>
      <div className="guest-bottom"><Icon name="chat" size={15} /> Il tuo host, a un messaggio di distanza.</div><div className="phone-homebar" />
      {detail && <div className="guest-panel"><button className="guest-close" aria-label="Chiudi anteprima sezione" tabIndex={decorative ? -1 : undefined} onClick={() => setActive(null)}><Icon name="close" size={18} /></button><span className="guest-panel-icon"><Icon name={detail.icon} size={30} /></span><small>{detail.label}</small><h4>{detail.title}</h4><p>{detail.text}</p>{active === 'wifi' && <><code>Magnolie-Demo</code><button className="guest-copy" onClick={copy} tabIndex={decorative ? -1 : undefined}>{copied ? 'Password copiata ✓' : 'Copia password demo'}</button><span className="sr-only" role="status">{copied ? 'Password demo copiata' : ''}</span></>}<a href={brand.demo} target="_blank" rel="noreferrer" tabIndex={decorative ? -1 : undefined}>Esplora la demo completa ↗</a><small className="guest-demo-note">Anteprima con contenuti dimostrativi</small></div>}
    </div></div>
  </div>
}
