import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { brand, nav } from '../content.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  const panel = useRef(null)
  useEffect(() => {
    if (!open) return
    panel.current?.querySelector('a')?.focus()
    const onKey = event => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  useEffect(() => {
    const media = window.matchMedia('(min-width: 901px)')
    const close = event => { if (event.matches) setOpen(false) }
    media.addEventListener('change', close)
    return () => media.removeEventListener('change', close)
  }, [])
  return <header className="site-nav"><a className="nav-brand" href="#top" aria-label="LaMiaCasa — inizio" onClick={() => setOpen(false)}><Logo /></a><nav className="desktop-nav" aria-label="Navigazione principale">{nav.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><div className="nav-right"><a className="button button-small button-ink" href={brand.demo} target="_blank" rel="noreferrer">Prova la demo <Icon name="arrow" size={16} /></a><button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Chiudi menu' : 'Apri menu'} onClick={() => setOpen(!open)}><span /><span /></button></div><nav ref={panel} id="mobile-navigation" className="mobile-nav" aria-label="Navigazione mobile" hidden={!open}>{[...nav, { label: 'Parliamone', href: '#contatti' }].map((item, i) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{item.label}<Icon name="arrow" /></a>)}</nav></header>
}
