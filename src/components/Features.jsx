import HouseScene3D from './HouseScene3D.jsx'
import Icon from './Icon.jsx'
import LanguageCards from './LanguageCards.jsx'
import { brand, featureGroups } from '../content.js'

export default function Features() {
  return <>
    <div className="benefit-ribbon"><div><span>Più accoglienza</span><i>✳</i><span>Meno informazioni sparse</span><i>✳</i><span>Tutto a portata di ospite</span><i>✳</i></div></div>
    <section className="product-section wrap" id="prodotto"><div className="section-heading" data-reveal><div className="eyebrow"><span className="section-number">01</span> LA GUIDA</div><h2>Le stesse domande.<br /><span className="muted">Un posto nuovo per le risposte.</span></h2><p>Il messaggio con il Wi-Fi. Il PDF con le regole. Il biglietto sul tavolo.<br className="desktop-only" /> Mettiamo tutto insieme, in una guida bella da aprire e semplice da usare.</p></div>
    <div className="product-story" data-scroll-scene data-house-scroll data-stage="0"><div className="product-sticky"><div className="product-visual product-visual--house"><HouseScene3D /></div>
    <div className="product-chapters">{featureGroups.map((group, i) => <article className={`product-chapter chapter-${i}`} key={group.n}><div className="chapter-top"><span>{group.n} / 03</span><Icon name={['pin','globe','check'][i]} size={31} /></div><h3>{group.title}</h3><p>{group.text}</p><div className="tag-list">{group.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="text-link" href={brand.demo} target="_blank" rel="noreferrer">Esplora la guida <Icon name="arrow" size={17} /></a></article>)}<div className="chapter-progress" aria-hidden="true"><i /><i /><i /></div></div></div></div>
    <div className="feature-grid"><article className="feature-card feature-card--language" data-reveal><LanguageCards /><div><span className="eyebrow">UN BENVENUTO CHE SI FA CAPIRE</span><h3>La stessa casa.<br />Tre lingue.</h3><p>Italiano, inglese e francese nel prototipo. Per far sentire i tuoi ospiti un po’ più vicini.</p></div></article><article className="feature-card feature-card--link" data-reveal><div className="link-art" aria-hidden="true"><span><Icon name="arrow" size={45} /></span><div>La tua guida ospiti <b>↗</b></div></div><div><span className="eyebrow">APRI. LEGGI. FATTO.</span><h3>Zero download.<br />Solo un link.</h3><p>Si apre nel browser del telefono, anche da un QR. Nessun account per l’ospite, basta Internet.</p></div></article></div>
    </section>
  </>
}
