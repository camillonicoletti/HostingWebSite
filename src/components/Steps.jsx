import LogoBuild3D from './LogoBuild3D.jsx'
import { steps } from '../content.js'
import Icon from './Icon.jsx'

export default function Steps() {
  return <section id="come-funziona" className="process-section"><div className="assembly-scene" data-scroll-scene><div className="assembly-sticky wrap"><div className="assembly-copy"><div className="eyebrow"><span className="section-number">02</span> SU MISURA, DAVVERO</div><h2>Ogni casa<br />ha una storia.<br /><span className="serif">Diamo forma<br />alla tua.</span></h2><p>Le tue istruzioni, il tuo stile, il tuo modo di accogliere. Uniamo i pezzi e costruiamo una guida che ti assomiglia.</p><div className="assembly-meta"><span>LA TUA CASA PRENDE FORMA</span><div className="assembly-track"><i /></div><span className="assembly-meta-end">✳</span></div></div><div className="assembly-art"><div className="assembly-grid" /><LogoBuild3D /><span className="assembly-label label-roof">Il tuo stile</span><span className="assembly-label label-left">Le tue istruzioni</span><span className="assembly-label label-right">Il tuo benvenuto</span><span className="assembly-caption">Pezzo dopo pezzo. Semplicemente tua.</span></div></div></div>
    <div className="steps-grid wrap">{steps.map(step => <article className="step" key={step.n} data-reveal><div className="step-top"><span>{step.n}</span><Icon name={step.icon} size={25} /></div><h3>{step.title}</h3><p>{step.body}</p></article>)}</div>
  </section>
}
