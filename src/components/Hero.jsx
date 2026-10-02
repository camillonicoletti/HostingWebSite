import Icon from './Icon.jsx'
import PhoneMock from './PhoneMock.jsx'
import { brand } from '../content.js'

export default function Hero() {
  return <section className="hero" id="top" data-scroll-scene>
    <div className="hero-layout wrap"><div className="hero-copy"><h1>La tua casa.<br />Un solo <span className="serif">link.</span></h1><p className="hero-description">Le istruzioni della casa, i tuoi consigli, tutte le risposte. Una guida digitale fatta per i tuoi ospiti. E un po’ di tempo in più per te.</p><div className="hero-actions"><a className="button button-coral" href={brand.demo} target="_blank" rel="noreferrer">Entra nella demo <span className="button-icon"><Icon name="arrow" size={19} /></span></a></div></div>
    <div className="hero-scene"><div className="scene-orbit scene-orbit--one" /><div className="scene-orbit scene-orbit--two" /><div className="phone-pedestal" /><div className="hero-phone"><PhoneMock /></div><div className="floating-note floating-note--wifi"><span className="note-icon"><Icon name="wifi" size={24} /></span><div><small>LA DOMANDA DI SEMPRE</small><b>Il Wi-Fi? È già qui.</b></div></div><div className="floating-note floating-note--welcome"><span className="welcome-flower">✳</span><div><b>Fai come fossi a casa.</b><small>Il tuo benvenuto, anche a distanza.</small></div></div><div className="scene-stamp">FATTA PER<br /><span>la tua</span><br />CASA ↗</div></div></div>
  </section>
}
