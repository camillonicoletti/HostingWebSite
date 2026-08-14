// Set di icone SVG a tratto, disegnate a mano per restare coerenti tra loro.
const paths = {
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 8.5a16 16 0 0 1 19 0" />
      <path d="M5.8 12.4a11 11 0 0 1 12.4 0" />
      <path d="M9 16.2a6 6 0 0 1 6 0" />
      <circle cx="12" cy="19.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  home: (
    <>
      <path d="M4 10.6 12 4l8 6.6" />
      <path d="M6.2 9.8V20h11.6V9.8" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.2l2.3 11h10l2.2-8H6.4" />
      <circle cx="9.5" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  train: (
    <>
      <rect x="5" y="3.5" width="14" height="13" rx="3.5" />
      <path d="M5 10.5h14" />
      <path d="M8.5 20.5 7 17m8.5 3.5L17 17" />
      <circle cx="9" cy="13.6" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13.6" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  cross: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  fork: (
    <>
      <path d="M7 3v6a2.5 2.5 0 0 0 5 0V3" />
      <path d="M9.5 11v10" />
      <path d="M17 3c-1.6 1.2-2.4 3-2.4 5.4S15.4 12 17 12.4V21" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m8.4 12.2 2.6 2.6 4.8-5.2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M3.5 12h17" />
      <path d="M12 3.4c2.2 2.4 3.3 5.3 3.3 8.6S14.2 18.2 12 20.6c-2.2-2.4-3.3-5.3-3.3-8.6S9.8 5.8 12 3.4Z" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5 13.8 9 19 10.8 13.8 12.6 12 18l-1.8-5.4L5 10.8 10.2 9 12 3.5Z" />
      <path d="M18.5 16.5 19.3 19l2.2.8-2.2.8-.8 2.2" />
    </>
  ),
  arrow: <path d="M6 18 18 6M9 6h9v9" />,
  chat: (
    <>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H12l-4.6 3.6V16H6.5A2.5 2.5 0 0 1 4 13.5Z" />
    </>
  ),
  recycle: (
    <>
      <path d="M8.6 6.4 12 3l3.4 3.4" />
      <path d="M12 3v8" />
      <path d="M5.2 12.4 3.4 16l3.9 2.2" />
      <path d="M18.8 12.4 20.6 16l-3.9 2.2" />
      <path d="M7.3 18.2h9.4" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.8 21 19.5H3L12 3.8Z" />
      <path d="M12 10v4.2" />
      <circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  play: <path d="M8.5 5.5v13l10-6.5-10-6.5Z" />,
  bolt: <path d="M13.5 3 5.5 13.4h5.2L10 21l8.2-10.6h-5.3L13.5 3Z" />,
  shield: (
    <>
      <path d="M12 3.2 19 6v6c0 4.2-2.9 7.3-7 8.8-4.1-1.5-7-4.6-7-8.8V6l7-2.8Z" />
      <path d="m9 12.2 2.2 2.2 4-4.2" />
    </>
  ),
}

export default function Icon({ name, size = 22, strokeWidth = 1.6, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.sparkle}
    </svg>
  )
}
