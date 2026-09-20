import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Arrow, Img, Parallax, Reveal, SplitHeading } from './ui'

/** The closing band — a door ajar in the dark, and the invitation. */
export function CTABand() {
  return (
    <section className="ctaband on-navy">
      <div className="ctaband__bg">
        <Img name="door-dark-glow" alt="" sizes="100vw" />
      </div>
      <div className="container">
        <div className="ctaband__inner">
          <div className="ctaband__spacer" />
          <div>
            <Reveal>
              <span className="eyebrow">Let's build a brighter tomorrow</span>
            </Reveal>
            <SplitHeading
              className="display display--lg ctaband__title"
              lines={['Ready to open', <em key="e">better spaces?</em>]}
            />
          </div>
          <Reveal delay={0.15} className="ctaband__side">
            <p>
              Get in touch with our team for expert guidance and a customised door
              schedule for your next project.
            </p>
            <Link to="/contact" className="btn btn--primary">
              Get a Quote <Arrow />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/** Horizontally drifting strip of claims, driven by scroll velocity. */
export function Marquee({ items }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-32%'])

  return (
    <div className="marquee" ref={ref} aria-hidden="true">
      <motion.div className="marquee__track" style={{ x }}>
        {[...items, ...items, ...items].map((t, i) => (
          <span className="marquee__item" key={i}>
            {t}
            <i className="marquee__dot" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/** Dark banner at the top of every inner page. */
export function PageHero({ eyebrow, lines, lead, image = 'about-entrance', crumb }) {
  return (
    <header className="phero on-navy">
      <div className="phero__bg">
        <Img name={image} alt="" sizes="100vw" priority />
      </div>
      <div className="container phero__inner">
        {crumb && (
          <Reveal y={14}>
            <div className="crumbs">
              <Link to="/">Home</Link>
              <span>/</span>
              {crumb}
            </div>
          </Reveal>
        )}
        <Reveal y={16} delay={0.05} style={{ marginTop: crumb ? 22 : 0 }}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <SplitHeading className="display display--xl phero__title" as="h1" lines={lines} delay={0.1} />
        {lead && (
          <Reveal delay={0.35}>
            <p className="lead phero__lead">{lead}</p>
          </Reveal>
        )}
      </div>
    </header>
  )
}

export function ProjectCard({ project, index = 0 }) {
  return (
    <Reveal delay={(index % 3) * 0.1} className="jcard">
      <div style={{ position: 'relative' }}>
        <Parallax
          name={project.image}
          alt={`${project.name}, ${project.location}`}
          className="jcard__media"
          amount={7}
          sizes="(max-width: 900px) 100vw, 45vw"
        />
        <span className="jcard__year">{project.year}</span>
      </div>
      <div className="jcard__info">
        <i className="accent-bar" />
        <div>
          <h3 className="jcard__name">{project.name}</h3>
          <div className="jcard__meta">
            <span>{project.location}</span>
            <span>{project.sector}</span>
            <span>{project.units}</span>
          </div>
          <p className="jcard__note">{project.note}</p>
        </div>
      </div>
    </Reveal>
  )
}
