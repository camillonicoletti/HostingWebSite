import { useState } from 'react'
import { guideCards, brand } from '../content.js'
import Icon from './Icon.jsx'
import { guideColors, useGuideStyle } from '../lib/guideStyle.js'

// The guest guide as the real product draws it: language switch and house name
// on top, eight section cards, and a dark dock for WhatsApp, recycling and
// emergencies. Every card and dock button opens a preview panel.
const TONES = { checkin: 'terra', wifi: 'olive', rules: 'terra', groceries: 'terra', transport: 'olive', health: 'terra', services: 'terra', checkout: 'olive' }
const LANGS = {
  IT: { subtitle: 'Indirizzo personalizzato', title: 'LA MIA CASA', labels: {}, dock: ['WhatsApp host', 'Raccolta', 'Emergenze'] },
  EN: { subtitle: 'Your custom address', title: 'MY HOME', labels: { rules: 'House rules', groceries: 'Supermarkets', transport: 'Transport', health: 'Pharmacies & hospitals', services: 'Banks & Post office' }, dock: ['WhatsApp host', 'Recycling', 'Emergencies'] },
  FR: { subtitle: 'Adresse personnalisée', title: 'MA MAISON', labels: { checkin: 'Arrivée', rules: 'Règles de la maison', groceries: 'Supermarchés', transport: 'Transports', health: 'Pharmacies et hôpitaux', services: 'Banques et Poste', checkout: 'Départ' }, dock: ['WhatsApp hôte', 'Tri sélectif', 'Urgences'] },
}
const DOCK = [
  { id: 'whatsapp', icon: 'whatsapp' },
  { id: 'recycling', icon: 'recycle' },
  { id: 'emergency', icon: 'alert' },
]
const details = {
  checkin: { title: 'Benvenuti a casa.', text: 'Check-in dalle 15:00. Qui trovi la foto del portone e le indicazioni per il tuo arrivo.', label: 'Arrivo e accesso', icon: 'pin' },
  wifi: { title: 'Facciamo connessione.', text: 'Rete: CasaMagnolie · Password dimostrativa', label: 'Wi-Fi', icon: 'wifi' },
  rules: { title: 'Piccole attenzioni.', text: 'Rispetta il vicinato e gli spazi comuni. Qui trovi le regole della tua casa.', label: 'Regole della casa', icon: 'home' },
  groceries: { title: 'La spesa, qui vicino.', text: 'I supermercati della zona, con indirizzi e informazioni utili concordati con il tuo host.', label: 'Supermercati', icon: 'cart' },
  transport: { title: 'La città ti aspetta.', text: 'Fermate, collegamenti e indicazioni per muoverti nei dintorni della casa.', label: 'Trasporti', icon: 'train' },
  health: { title: 'Un aiuto, se serve.', text: 'Farmacie, ospedali e contatti sanitari utili da consultare durante il soggiorno.', label: 'Farmacie e ospedali', icon: 'cross' },
  services: { title: 'Tutto a portata di mano.', text: 'Banche, bancomat e ufficio postale vicino alla tua struttura, con indirizzi e orari.', label: 'Banche e Ufficio postale', icon: 'bank' },
  checkout: { title: 'Al prossimo soggiorno.', text: 'Check-out entro le 10:00. Controlla di avere tutto e segui le indicazioni per lasciare le chiavi.', label: 'Check-out', icon: 'check' },
  whatsapp: { title: 'Scrivi al tuo host.', text: 'Un messaggio su WhatsApp per qualsiasi dubbio durante il soggiorno.', label: 'WhatsApp host', icon: 'whatsapp' },
  recycling: { title: 'La raccolta differenziata.', text: 'Cosa va dove e in quali giorni: il calendario della raccolta della tua zona.', label: 'Raccolta', icon: 'recycle' },
  emergency: { title: 'Numeri utili.', text: 'Emergenze 112, guardia medica e i contatti da chiamare subito, sempre a portata.', label: 'Emergenze', icon: 'alert' },
}

const Hand = () => <span className="guest-hint" aria-hidden="true"><span className="guest-hint-ring" /><svg viewBox="0 0 24 24" width="32" height="32" fill="#fffdf6" stroke="#272b28" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><path d="M9 12V4.6a1.8 1.8 0 0 1 3.6 0v6.6m0-2.6a1.7 1.7 0 0 1 3.4 0v3.2m0-1.7a1.6 1.6 0 0 1 3.2 0V16a6 6 0 0 1-6 6h-1.4a6 6 0 0 1-4.9-2.5l-3.1-4.3a1.7 1.7 0 0 1 2.7-2L9 15.5" /></svg></span>

export default function PhoneMock({ decorative = false }) {
  const [active, setActive] = useState(null)
  const [copied, setCopied] = useState(false)
  const [touched, setTouched] = useState(false)
  const [lang, setLang] = useState('IT')
  const detail = details[active]
  const open = id => { setTouched(true); setCopied(false); setActive(id) }
  // A tapping hand on the first card says "try me" until the visitor does.
  const hint = !decorative && !touched
  // The visitor's own colours, house name and style, chosen further down the page.
  const guide = useGuideStyle()
  const words = LANGS[lang]
  const title = guide.houseName.trim().toUpperCase() || words.title
  const tab = decorative ? -1 : undefined
  const copy = async () => {
    try { await navigator.clipboard.writeText('Magnolie-Demo'); setCopied(true) }
    catch { setCopied(false) }
  }
  return <div className="phone-object" data-guide-style={guide.style} style={guideColors(guide)} aria-hidden={decorative || undefined}>
    <div className="phone-side phone-side--left" /><div className="phone-side phone-side--right" />
    <div className="phone-frame"><div className="phone-screen"><div className="phone-status"><span>9:41</span><div className="phone-island" /><span className="phone-signal">▮▮▮ <span className="battery" /></span></div>
      <div className="app-top">
        <div className="app-lang" role="group" aria-label="Lingua della guida">{Object.keys(LANGS).map(code => <button key={code} type="button" tabIndex={tab} aria-pressed={lang === code} onClick={() => setLang(code)}>{code}</button>)}</div>
        <div className="app-title"><h3 className="guest-house-name">{title}</h3><p>{words.subtitle}</p></div>
      </div>
      <div className="app-grid">{guideCards.map((card, i) => <button type="button" tabIndex={tab} key={card.id} onClick={() => open(card.id)} className={`app-card app-card--${TONES[card.id]}`} aria-label={`Apri ${card.label} nell’anteprima`}>
        <span className="app-badge"><Icon name={card.icon} size={13} strokeWidth={2.2} /></span>
        <span className="app-label">{words.labels[card.id] || card.label}</span>
        <span className="app-arrow" aria-hidden="true"><Icon name="arrow" size={10} strokeWidth={2.6} /></span>
        {i === 0 && hint && <Hand />}
      </button>)}</div>
      <div className="app-dock">{DOCK.map((item, i) => <button type="button" tabIndex={tab} key={item.id} onClick={() => open(item.id)}><Icon name={item.icon} size={12} strokeWidth={2} /><span>{words.dock[i]}</span></button>)}</div>
      <div className="phone-homebar" />
      {detail && <div className="guest-panel"><button className="guest-close" aria-label="Chiudi anteprima sezione" tabIndex={tab} onClick={() => setActive(null)}><Icon name="close" size={18} /></button><span className="guest-panel-icon"><Icon name={detail.icon} size={30} /></span><small>{detail.label}</small><h4>{detail.title}</h4><p>{detail.text}</p>{active === 'wifi' && <><code>Magnolie-Demo</code><button className="guest-copy" onClick={copy} tabIndex={tab}>{copied ? 'Password copiata ✓' : 'Copia password demo'}</button><span className="sr-only" role="status">{copied ? 'Password demo copiata' : ''}</span></>}<a href={brand.demo} target="_blank" rel="noreferrer" tabIndex={tab}>Esplora la demo completa ↗</a><small className="guest-demo-note">Anteprima con contenuti dimostrativi</small></div>}
    </div></div>
  </div>
}
