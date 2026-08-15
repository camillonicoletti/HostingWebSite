import { brand, footer } from '../content.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a className="nav__brand" href="#top">
            <img className="nav__logo" src="/logo-light.png" alt={brand.name} />
          </a>
          <p>{footer.tagline}</p>
          <div className="footer__social">
            {['Instagram', 'LinkedIn', 'X'].map((s) => (
              <a key={s} href="#top">
                {s}
              </a>
            ))}
          </div>
        </div>

        {footer.columns.map((col) => (
          <div key={col.title} className="footer__col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#top">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container footer__bottom">
        <span>
          © {new Date().getFullYear()} {brand.name} — {brand.claim}
        </span>
        <span>P. IVA 00000000000 · Fatto in Italia</span>
      </div>
    </footer>
  )
}
