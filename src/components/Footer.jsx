import { Link } from 'react-router-dom'
import { company, nav, products } from '../lib/site'
import { Icon } from './ui'
import { Logo } from './Navbar'

const socials = [
  { name: 'linkedin', href: 'https://www.linkedin.com/', label: 'LinkedIn' },
  { name: 'instagram', href: 'https://www.instagram.com/', label: 'Instagram' },
  { name: 'youtube', href: 'https://www.youtube.com/', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p className="footer__tag">
              {company.legalName} — engineering trust since {company.since}. Fire-rated,
              laminated and flush door systems for India's builders.
            </p>
          </div>

          <div>
            <h4 className="footer__h">Explore</h4>
            <ul className="footer__list">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer__h">Products</h4>
            <ul className="footer__list">
              {products.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link to={`/products#${p.slug}`}>{p.short}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer__h">Visit / Call</h4>
            <ul className="footer__list">
              <li>
                {company.address.line1},<br />
                {company.address.line2},<br />
                {company.address.city} — {company.address.pin}
              </li>
              {company.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
                </li>
              ))}
              <li>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {company.legalName} All rights reserved.
          </span>
          <div className="socials">
            {socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <Icon name={s.name} size={16} />
              </a>
            ))}
          </div>
          <span>{company.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
