import { Link } from 'react-router-dom'
import { Arrow, Reveal, SplitHeading } from '../components/ui'
import { PageHero } from '../components/sections'

export default function NotFound() {
  return (
    <>
      <PageHero
        crumb="404"
        eyebrow="Page not found"
        lines={['This door', <em key="e">leads nowhere.</em>]}
        lead="The page you were looking for has moved or never existed. Let's get you back to one that opens."
        image="door-dark-glow"
      />
      <section className="section section--ivory">
        <div className="container">
          <SplitHeading
            className="display display--md"
            lines={['Try one of these instead.']}
          />
          <Reveal delay={0.15}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 34 }}>
              <Link to="/" className="btn btn--primary">
                Back home <Arrow />
              </Link>
              <Link to="/products" className="btn btn--ghost">
                Browse products <Arrow />
              </Link>
              <Link to="/contact" className="btn btn--ghost">
                Contact us <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
