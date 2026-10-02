import Icon from './Icon.jsx'
import PhoneMock from './PhoneMock.jsx'
import { STYLES, styleMessage, tintName, updateGuideStyle, useGuideStyle } from '../lib/guideStyle.js'

// "Your guide, previewed": name the house, pick a style, and the phone shows it
// right away with the colours chosen on the 3D logo above. Every phone on the
// page follows, and "Invia il mio stile" carries the choices to the contact form.
export default function GuideStudio() {
  const guide = useGuideStyle()
  const send = () => {
    updateGuideStyle(current => ({ sent: current.sent + 1 }))
    document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  // Land at the end of the logo's scroll story, where the mark is already
  // built and the colour controls sit right under it.
  const toLogo = event => {
    const scene = document.querySelector('#come-funziona .assembly-scene')
    if (!scene) return
    event.preventDefault()
    const top = scene.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + Math.max(0, scene.offsetHeight - window.innerHeight), behavior: 'smooth' })
  }
  return <div className="guide-studio wrap">
    <div className="guide-studio-copy" data-reveal>
      <div className="eyebrow">LA TUA GUIDA, IN ANTEPRIMA</div>
      <h3>Dalle un nome.<br /><span className="serif">E il tuo stile.</span></h3>
      <label className="guide-studio-field">Come si chiama la tua casa?
        <input value={guide.houseName} maxLength={40} placeholder="Casa Magnolie · Milano" onChange={event => updateGuideStyle({ houseName: event.target.value })} />
      </label>
      <div className="guide-studio-field">Scegli lo stile
        <div className="guide-studio-styles" role="radiogroup" aria-label="Stile della guida">
          {STYLES.map(style => <button key={style.id} type="button" role="radio" aria-checked={guide.style === style.id} data-style={style.id} onClick={() => updateGuideStyle({ style: style.id })}>{style.name}</button>)}
        </div>
      </div>
      <p className="guide-studio-colors">
        <span className="guide-studio-dot" style={{ background: `var(--tint-disc, #C9755B)` }} /> Sfondo <b>{tintName(guide.discHue)}</b>
        <span className="guide-studio-dot" style={{ background: guide.arrow.color || '#F4F0E6' }} /> Freccia <b>{guide.arrow.name}</b>
        <a href="#come-funziona" onClick={toLogo}>cambiali dal logo ↑</a>
      </p>
      <button type="button" className="button button-coral guide-studio-send" onClick={send} title={styleMessage(guide)}>Invia il mio stile <span className="button-icon"><Icon name="arrow" size={19} /></span></button>
      <p className="guide-studio-note">Le tue scelte arrivano già scritte nel modulo di contatto.</p>
    </div>
    <div className="guide-studio-phone"><PhoneMock /></div>
  </div>
}
