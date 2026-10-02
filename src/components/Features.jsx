import HouseScene3D from './HouseScene3D.jsx'
import Icon from './Icon.jsx'
import PlatformRibbon from './PlatformRibbon.jsx'
import { featureGroups } from '../content.js'

export default function Features() {
  return <>
    <PlatformRibbon />
    <section className="product-section wrap" id="prodotto"><div className="section-heading" data-reveal><div className="eyebrow"><span className="section-number">01</span> LA GUIDA</div><h2>Le stesse domande.<br /><span className="muted">Un posto nuovo per le risposte.</span></h2></div>
    <div className="product-story" data-scroll-scene data-house-scroll data-stage="0"><div className="product-sticky"><div className="product-visual product-visual--house"><HouseScene3D /></div>
    <div className="product-chapters">{featureGroups.map((group, i) => <article className={`product-chapter chapter-${i}`} key={group.n}><div className="chapter-top"><span>{group.n} / 0{featureGroups.length}</span><Icon name={['pin','home','check','sparkle'][i]} size={31} /></div><h3>{group.title}</h3><p>{group.text}</p><div className="tag-list">{group.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}<div className="chapter-progress" aria-hidden="true">{featureGroups.map(group => <i key={group.n} />)}</div></div></div></div>
    
    </section>
  </>
}
