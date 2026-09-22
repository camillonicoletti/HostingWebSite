// A doorway and pitched roof, drawn from three pieces.
export const logoParts = {
  roof: 'M10 39 46 9a6 6 0 0 1 8 0l36 30-12 14L50 29 22 53Z',
  left: 'M19 55h24v36H19Z',
  right: 'M57 55h24v36H57Z',
}
export function LogoMark({ className = '', ...props }) {
  return <svg viewBox="0 0 100 100" fill="currentColor" className={`logo-mark ${className}`} aria-hidden="true" {...props}>{Object.entries(logoParts).map(([key, d]) => <path key={key} d={d} />)}</svg>
}
export default function Logo({ className = '', wordmark = true }) {
  return <span className={`brand-lockup ${className}`}><LogoMark />{wordmark && <span>lamia<span className="brand-light">casa</span><span className="brand-dot">.</span></span>}</span>
}
