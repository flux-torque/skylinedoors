import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, company } from '../lib/site'
import { Arrow, EASE } from './ui'

export function Logo({ className = 'logo' }) {
  return (
    <Link to="/" className={className} aria-label={`${company.name} — home`}>
      <span className="logo__word">SKYLINE</span>
      <span className="logo__sub">DOORS</span>
    </Link>
  )
}

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 90)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        className={`nav ${solid && !open ? 'nav--solid' : ''}`}
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.25, ease: EASE }}
      >
        <div className="container nav__inner">
          <Logo />

          <nav className="nav__links" aria-label="Primary">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/contact" className="btn btn--primary nav__cta">
            Get a Quote <Arrow />
          </Link>

          <button
            className={`nav__burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="drawer"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.07, duration: 0.6, ease: EASE }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `drawer__link ${isActive ? 'is-active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="drawer__meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              <div>
                {company.address.line1}, {company.address.line2}
              </div>
              <div>
                {company.address.city} — {company.address.pin}
              </div>
              <a href={`tel:${company.phones[0].replace(/\s/g, '')}`}>{company.phones[0]}</a>
              <br />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
