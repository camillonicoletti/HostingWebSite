import { useId, useState } from 'react'
import Icon from './Icon.jsx'
import './HouseJourney.css'

const moments = [
  { label: 'Arrivo', icon: 'pin', title: 'Il tuo benvenuto è già qui.', detail: 'Check-in · accesso · istruzioni della casa' },
  { label: 'Soggiorno', icon: 'wifi', title: 'Tutte le risposte, a casa.', detail: 'Wi-Fi · trasporti · servizi nei dintorni' },
  { label: 'Partenza', icon: 'check', title: 'Fino all’ultimo saluto.', detail: 'Check-out · chiavi · prossimi viaggi' },
]

function HouseIllustration() {
  const id = useId().replaceAll(':', '')
  const paint = name => `url(#${id}-${name})`
  return (
    <svg className="house-diorama" viewBox="0 0 520 470" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fffaf0" /><stop offset="1" stopColor="#e9dbc5" /></linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d9cbb5" /><stop offset="1" stopColor="#c2b299" /></linearGradient>
        <linearGradient id={`${id}-roof`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f3a78b" /><stop offset=".55" stopColor="#df8064" /><stop offset="1" stopColor="#c8664e" /></linearGradient>
        <linearGradient id={`${id}-roofedge`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#bf644e" /><stop offset="1" stopColor="#9b4d3b" /></linearGradient>
        <linearGradient id={`${id}-plinth`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#c5cfb9" /><stop offset="1" stopColor="#a5b695" /></linearGradient>
        <linearGradient id={`${id}-door`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#6d8263" /><stop offset="1" stopColor="#4b6148" /></linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#698078" /><stop offset="1" stopColor="#a8b4a2" /></linearGradient>
        <radialGradient id={`${id}-light`}><stop stopColor="#fff3ba" stopOpacity=".8" /><stop offset="1" stopColor="#ffe19d" stopOpacity="0" /></radialGradient>
        <filter id={`${id}-shadow`} x="-40%" y="-100%" width="180%" height="300%"><feGaussianBlur stdDeviation="10" /></filter>
        <filter id={`${id}-soft`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>

      {/* A fixed isometric camera. Only the objects that tell the story move. */}
      <ellipse cx="272" cy="392" rx="179" ry="38" fill="#556748" opacity=".18" filter={paint('shadow')} />
      <path d="M50 318 250 218 478 314 278 416 50 331Z" fill={paint('plinth')} />
      <path d="m50 318 228 94 200-98v15L278 431 50 335Z" fill={paint('plinth')} />
      <path d="m50 318 200-100 228 96-200 98Z" fill="#dce3d0" />
      <path d="m50 318 228 94 200-98" fill="none" stroke="#edf0e5" strokeWidth="2" />
      <path d="m181 310 48 19-64 48-45-19Z" fill="#eae7dc" />
      <path d="m157 329 46 18m-60-8 46 18m-59-8 45 18" fill="none" stroke="#c7c9bb" strokeWidth="1" />
      <ellipse cx="299" cy="332" rx="132" ry="33" fill="#687158" opacity=".16" />

      {/* Walls, gable, overhanging roof and a small chimney. */}
      <path d="m285 249 129-62v109l-129 63Z" fill={paint('side')} />
      <path d="m136 197 75-76 74 128v110l-149-61Z" fill={paint('front')} />
      <path d="m136 286 149 61v12l-149-61Z" fill="#d8cbb7" />
      <path d="m285 347 129-63v12l-129 63Z" fill="#b9ac96" />
      <path d="m128 196 77-81 133-64-78 82Z" fill="#efac8e" />
      <path d="m205 115 133-64 85 139-134 66Z" fill={paint('roof')} />
      <path d="m205 115 84 141v11l-84-139-77 80v-12Z" fill={paint('roofedge')} />
      <path d="m289 256 134-66v11l-134 66Z" fill="#a8523e" />
      <path d="m205 115 133-64 85 139" fill="none" stroke="#fac1a6" strokeWidth="2" />
      <path d="m229 153 132-64m-112 96 133-65m-114 97 134-65" fill="none" stroke="#b8624b" strokeOpacity=".24" strokeWidth="1" />
      <path d="m251 96 84 141m-57-154 85 140m-56-154 85 140" fill="none" stroke="#f7ba9e" strokeOpacity=".27" strokeWidth="1" />
      <path d="m354 134 18-8v-49l-18 9Z" fill="#cfc0a8" />
      <path d="m333 125 21 9V86l-21-8Z" fill="#f1e4ce" />
      <path d="m330 77 23-12 23 10-23 12Z" fill="#f9efdc" />
      <path d="m336 77 17-8 16 7-16 8Z" fill="#8b8070" />

      {/* Recessed doorway; the leaf swings on its left hinge. */}
      <path d="m166 220 53 22v88l-53-22Z" fill="#bdaf96" />
      <path d="m171 225 43 18v81l-43-18Z" fill="#454b3c" />
      <path className="house-entry-light" d="m171 225 43 18v81l-43-18Z" fill="#e9bd78" />
      <path className="house-welcome-light" d="m173 306 40 17-34 29-61-24Z" fill="#ffe6aa" opacity=".38" />
      <g transform="translate(171 225)"><g className="house-door-leaf"><path d="m0 0 43 18v81L0 81Z" fill={paint('door')} /><path d="m5 9 32 13v63L5 72Z" fill="none" stroke="#a2b092" strokeOpacity=".38" /><path d="m33 52 5 2v4l-5-2Z" fill="#ecce8e" /><path d="M0 0v81" stroke="#a8b598" strokeWidth="2" /></g></g>
      <path d="m164 308 56 23-8 5-56-23Z" fill="#e8ddc7" />
      <path d="m156 313 56 23v5l-56-23Z" fill="#b6ac94" />
      <path d="m225 266 19 8v8l-19-8Z" fill="#d5c9b3" /><path d="m228 269 12 5" stroke="#958971" />

      {/* Windows light up in the middle chapter. */}
      <path d="m236 232 31 13v47l-31-13Z" fill="#b6a78f" />
      <path d="m240 237 23 9v39l-23-10Z" fill={paint('glass')} />
      <path className="house-window-lit" d="m240 237 23 9v39l-23-10Z" fill="#ffe8ab" />
      <path d="m251 241 0 39m-11-23 23 10" stroke="#f8edd8" strokeWidth="2" />
      <path d="m234 278 35 15-4 4-34-15Z" fill="#fbf0dc" />
      <path d="m321 247 44-21v48l-44 21Z" fill="#9a927c" />
      <path d="m325 249 36-17v38l-36 18Z" fill={paint('glass')} />
      <path className="house-window-lit" d="m325 249 36-17v38l-36 18Z" fill="#ffe5a2" />
      <path d="m343 240 0 39m-18-10 36-18" stroke="#e6dbc4" strokeWidth="2.5" />
      <path d="m319 293 48-23 4 3-48 24Z" fill="#f0e4ce" />
      <ellipse className="house-window-glow" cx="343" cy="260" rx="36" ry="40" fill={paint('light')} filter={paint('soft')} />
      <ellipse className="house-window-glow" cx="251" cy="260" rx="28" ry="35" fill={paint('light')} filter={paint('soft')} />
      <path d="m191 178 29 12v21l-29-12Z" fill="#d7c7ac" /><path d="m197 184 17 7v12l-17-7Z" fill="#7f8b73" />

      {/* Planters anchor the house to a small, tangible landscape. */}
      <g><ellipse cx="112" cy="291" rx="20" ry="9" fill="#60704f" opacity=".15" /><path d="m101 271 23 3-4 25-15-2Z" fill="#be7c61" /><ellipse cx="112" cy="273" rx="12" ry="5" fill="#dba184" /><path d="m112 274-1-41m1 18-12-11m13 20 13-14" fill="none" stroke="#6e7b55" strokeWidth="3" /><ellipse cx="105" cy="236" rx="12" ry="17" fill="#9dac80" transform="rotate(-25 105 236)" /><ellipse cx="122" cy="244" rx="11" ry="15" fill="#7c9165" transform="rotate(35 122 244)" /><ellipse cx="111" cy="226" rx="12" ry="16" fill="#b2bf96" /></g>
      <g><path d="m384 317 33-16 3 12-33 16Z" fill="#ad795d" /><path d="m387 307 27-13 3 7-33 16Z" fill="#d39b79" /><ellipse cx="394" cy="300" rx="11" ry="10" fill="#8e9f73" /><ellipse cx="407" cy="293" rx="10" ry="11" fill="#a5b487" /><ellipse cx="414" cy="301" rx="9" ry="8" fill="#728760" /></g>

      {/* The suitcase welcomes; the key ring appears at departure. */}
      <g className="house-suitcase" transform="translate(91 337)"><ellipse cx="14" cy="21" rx="23" ry="8" fill="#56614b" opacity=".13" /><path d="m-4-27 22 9v38l-22-9Z" fill="#bd7054" /><path d="m18-18 10-5v38l-10 5Z" fill="#98543e" /><path d="m-4-27 10-5 22 9-10 5Z" fill="#eaa286" /><path d="m5-25 0-12 10 4v12" fill="none" stroke="#5d6750" strokeWidth="3" /><path d="m1-17 0 25m10-21v25" stroke="#e3a88b" strokeWidth="2" /><circle cx="0" cy="13" r="3" fill="#46523d" /><circle cx="22" cy="18" r="3" fill="#46523d" /></g>
      <g className="house-wifi-bubble" transform="translate(426 139)"><circle r="27" fill="#faf7ed" /><circle r="27" fill="none" stroke="#dedfce" /><path d="M-14-4a22 22 0 0 1 28 0m-23 6a14 14 0 0 1 18 0m-13 6a7 7 0 0 1 8 0" fill="none" stroke="#657956" strokeWidth="2.4" strokeLinecap="round" /><circle cy="14" r="2" fill="#657956" /></g>
      <g className="house-keys" transform="translate(401 333)"><ellipse cx="6" cy="32" rx="44" ry="14" fill="#586849" opacity=".13" /><g transform="rotate(-24)"><path d="M-9-15v46h9v-7h8V15H0v-30Z" fill="#d5b773" /><path d="M-9-15v46h3V-15Z" fill="#f2d698" /><circle cx="-4" cy="-22" r="14" fill="#d5b773" /><circle cx="-4" cy="-22" r="7" fill="#dce3d0" /></g><g transform="translate(17 2) rotate(20)"><path d="M-6-13v42H3v-7h7V12H3v-25Z" fill="#8a9681" /><circle cy="-19" r="12" fill="#aeb8a0" /><circle cy="-19" r="5" fill="#dce3d0" /></g><ellipse cx="2" cy="-30" rx="24" ry="14" fill="none" stroke="#f6e0aa" strokeWidth="3" /><ellipse cx="2" cy="-30" rx="24" ry="14" fill="none" stroke="#bc9853" strokeWidth="1" /></g>
    </svg>
  )
}

export default function HouseJourney() {
  const [mobileStage, setMobileStage] = useState(0)
  return (
    <div className="house-scene" data-mobile-stage={mobileStage}>
      <div className="house-scene-heading"><span className="live-dot" /> UN SOGGIORNO, TRE MOMENTI.<span className="house-mini-star" aria-hidden="true">✳</span></div>
      <div className="house-art"><div className="house-halo" /><HouseIllustration /></div>
      <div className="house-cards">
        {moments.map((moment, i) => (
          <div className={`house-info house-info--${i}`} key={moment.label}>
            <span className="house-info-icon"><Icon name={moment.icon} size={21} /></span>
            <div><small>0{i + 1} / {moment.label.toUpperCase()}</small><strong>{moment.title}</strong><p>{moment.detail}</p></div>
            <span className="house-info-arrow" aria-hidden="true">↗</span>
          </div>
        ))}
      </div>
      <div className="house-mobile-controls" role="group" aria-label="Esplora i momenti del soggiorno">
        {moments.map((moment, i) => <button key={moment.label} type="button" aria-pressed={mobileStage === i} onClick={() => setMobileStage(i)}>{moment.label}</button>)}
      </div>
      <p className="house-scene-caption">Una casa da vivere. Una guida per sentirsi a casa.</p>
    </div>
  )
}
