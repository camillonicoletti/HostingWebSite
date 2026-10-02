import { useId } from 'react'

// The brand mark: a gradient disc with a white house, and an arrow that comes
// in at the top and leaves through the wall. Drawn in a 1250-unit square; the
// same artwork lives in public/brand-mark.svg (favicon). Gradient ids are made
// unique so several marks can share a page.
export function LogoMark({ className = '', ...props }) {
  const id = useId().replaceAll(':', '')
  return <svg viewBox="0 0 1250 1250" className={`logo-mark ${className}`} aria-hidden="true" {...props}>
    <defs>
      <linearGradient id={`${id}-bg`} x1="150" y1="170" x2="1110" y2="1090" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FF8A00" /><stop offset=".27" stopColor="#FF2FC8" /><stop offset=".44" stopColor="#A247FF" /><stop offset=".62" stopColor="#3178FF" /><stop offset=".8" stopColor="#0A8CFF" /><stop offset="1" stopColor="#0038FF" /></linearGradient>
      <linearGradient id={`${id}-j`} x1="500" y1="540" x2="930" y2="930" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FF8A00" /><stop offset=".32" stopColor="#FF3FB5" /><stop offset=".6" stopColor="#9A5BFF" /><stop offset="1" stopColor="#1667FF" /></linearGradient>
    </defs>
    <circle cx="625" cy="625" r="615" fill={`url(#${id}-bg)`} />
    <path d="M625 245 968 548q10 27-20 27h-46v360H340V575h-38q-30 0-20-27Z" fill="#FCFCFC" stroke="#FCFCFC" strokeWidth="60" strokeLinejoin="round" />
    <path d="M838 742 992 850 838 968Z" fill="#FCFCFC" stroke="#FCFCFC" strokeWidth="110" strokeLinejoin="round" />
    <path d="M712 760V638a88.5 88.5 0 0 0-177 0v132a90 90 0 0 0 90 90h225" fill="none" stroke={`url(#${id}-j)`} strokeWidth="100" />
    <path d="M838 742 992 850 838 968Z" fill={`url(#${id}-j)`} stroke={`url(#${id}-j)`} strokeWidth="30" strokeLinejoin="round" />
  </svg>
}
export default function Logo({ className = '', wordmark = true }) {
  return <span className={`brand-lockup ${className}`}><LogoMark />{wordmark && <span>lamia<span className="brand-light">casa</span><span className="brand-dot">.</span></span>}</span>
}
