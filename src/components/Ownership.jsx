import Icon from './Icon.jsx'
import Logo from './Logo.jsx'

export default function Ownership() {
  return <section className="ownership-section wrap" id="tuo"><div className="ownership-copy" data-reveal><div className="eyebrow">BELLA DA USARE. TUA DA TENERE.</div><h2>L’accoglienza è tua.<br /><span className="serif">Anche la guida.</span></h2><p>Ti consegniamo contenuti e file sorgente. Li puoi conservare e spostare altrove: la guida segue la tua casa.</p><div className="ownership-points"><span><Icon name="check" size={18} /> Contenuti personalizzati</span><span><Icon name="check" size={18} /> File sorgente consegnati</span><span><Icon name="check" size={18} /> Nessun account per gli ospiti</span></div></div><div className="delivery-art" aria-hidden="true"><div className="delivery-sheet delivery-sheet--back" /><div className="delivery-sheet"><Logo /><div className="delivery-line" /><small>PREPARATA PER</small><h3>La tua<br />prossima<br /><i>accoglienza.</i></h3><div className="delivery-seal"><Icon name="check" size={35} /><span>È TUA.</span></div><div className="delivery-bottom"><span>CONTENUTI + SORGENTE</span><Icon name="arrow" /></div></div></div></section>
}
