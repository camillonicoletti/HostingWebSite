import Logo, { LogoMark } from './Logo.jsx'
import Icon from './Icon.jsx'
import { brand } from '../content.js'

export default function Footer() {
  return <footer className="footer"><div className="wrap"><div className="footer-top"><a href="#top" aria-label="LaMiaCasa — torna all’inizio"><Logo /></a><p>Il tuo modo di accogliere.<br />Finalmente, in un link.</p><a className="footer-up" href="#top" aria-label="Torna all’inizio"><Icon name="arrow" size={25} /></a></div><div className="footer-links"><div><span>SCOPRI</span><a href="#prodotto">La guida ospiti</a><a href="#come-funziona">Come funziona</a><a href="#prezzo">Il prezzo</a></div><div><span>PROVIAMOCI</span><a href={brand.demo} target="_blank" rel="noreferrer">Apri la demo ↗</a><a href="#domande">Domande e risposte</a><a href="#contatti">Raccontaci la tua casa</a></div><div className="footer-note"><span>UN PICCOLO PROMEMORIA</span><p>Le case più belle<br />sono quelle in cui<br />ci sentiamo <i>a casa.</i></p></div></div><div className="footer-wordmark" aria-hidden="true"><LogoMark /><span>lamiacasa<span className="footer-dot">.</span></span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} LaMiaCasa</span><span>Progettata per accogliere.</span><a href={`mailto:${brand.email}`}>{brand.email} ↗</a></div></div></footer>
}
