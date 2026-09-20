import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Arrow, EASE, Img, Parallax, Reveal, SplitHeading, Stat } from '../components/ui'
import { CTABand, Marquee } from '../components/sections'
import { capabilities, process, products, projects, stats } from '../lib/site'

const HERO_WORDS = ['Spaces', 'People', 'Potential']

function Hero({ introDone }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const copyFade = useTransform(scrollYProgress, [0, 0.72], [1, 0])

  // Content waits for the door to finish opening.
  const show = introDone
  const rise = (delay) => ({
    initial: { opacity: 0, y: 30 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 1, delay, ease: EASE },
  })

  return (
    <section className="hero on-navy" ref={ref}>
      <motion.div className="hero__media" style={{ y: mediaY, scale: mediaScale }}>
        <Img
          name="hero-door"
          alt="A walnut pivot door opening onto a sunlit apartment with a city skyline beyond"
          sizes="100vw"
          priority
        />
      </motion.div>
      <div className="hero__scrim" />

      <motion.div
        className="container hero__inner"
        style={{ y: copyY, opacity: copyFade }}
      >
        <div className="hero__copy">
          <motion.span className="eyebrow" {...rise(0.1)}>
            Doors for a brighter tomorrow
          </motion.span>

          <h1 className="display display--xl hero__title">
            {['Open to', <em key="e">better spaces.</em>].map((line, i) => (
              <span className="reveal-line" key={i}>
                <motion.span
                  style={{ display: 'block' }}
                  initial={{ y: '115%' }}
                  animate={show ? { y: 0 } : { y: '115%' }}
                  transition={{ duration: 1.25, delay: 0.2 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="hero__lead" {...rise(0.62)}>
            Premium door solutions for safer, smarter and more beautiful built
            environments — engineered in Mumbai, delivered to schedule.
          </motion.p>

          <motion.div className="hero__actions" {...rise(0.74)}>
            <Link to="/products" className="btn btn--primary">
              Explore Products <Arrow />
            </Link>
            <Link to="/contact" className="btn btn--ghost">
              Get a Quote <Arrow />
            </Link>
          </motion.div>
        </div>

        <div className="hero__foot">
          <motion.ul className="hero__words" {...rise(0.9)}>
            {HERO_WORDS.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </motion.ul>

          <motion.div className="hero__rail" {...rise(1)}>
            More
            <br />
            than doors
            <br />
            a brighter
            <br />
            tomorrow
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="hero__scrollcue"
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{ opacity: copyFade }}
      >
        <span>Scroll</span>
        <i />
      </motion.div>
    </section>
  )
}

function AboutStrip() {
  return (
    <section className="section section--cream about">
      <div className="container about__grid">
        <div className="about__copy">
          <Reveal y={16}>
            <span className="eyebrow">About us</span>
          </Reveal>
          <SplitHeading
            className="display display--lg sechead__title"
            lines={['Built on strength.', <em key="e">Refined by design.</em>]}
          />
          <Reveal delay={0.2}>
            <p className="lead split__body">
              At Skyline Doors, we craft high-performance door solutions for
              residential, commercial and fire-rated spaces that make life safer,
              smarter and more inspiring.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="about__figures">
              {stats.slice(0, 2).map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="split__cta">
              <Link to="/about" className="link-arrow">
                About Skyline <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="about__media">
          <Reveal delay={0.1} className="about__plate">
            <Parallax
              name="about-entrance"
              alt="A sunlit lobby entrance with a walnut door set into stone"
              className="about__img about__img--main"
              amount={8}
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </Reveal>

          {/* Inset detail shot, cut into the corner of the main image */}
          <Reveal delay={0.26} className="about__inset">
            <Parallax
              name="product-frame"
              alt="Close detail of a machined hardwood door frame"
              className="about__img about__img--detail"
              amount={11}
              sizes="22vw"
            />
          </Reveal>

          <Reveal delay={0.4} className="about__seal">
            <span>
              Est.
              <b>2010</b>
              Mumbai
            </span>
          </Reveal>

        </div>
      </div>
    </section>
  )
}

function ProductsPreview() {
  const featured = [products[0], products[2], products[4]]

  return (
    <section className="section section--ivory">
      <div className="container">
        <div className="sechead">
          <div>
            <Reveal y={16}>
              <span className="eyebrow">Our products</span>
            </Reveal>
            <SplitHeading
              className="display display--lg sechead__title"
              lines={['Doors for every', 'greater possibility.']}
            />
          </div>
          <Reveal delay={0.2}>
            <Link to="/products" className="link-arrow">
              View all products <Arrow />
            </Link>
          </Reveal>
        </div>

        <div className="pgrid">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link to={`/products#${p.slug}`} className="pcard">
                <Parallax
                  name={p.image}
                  alt={p.name}
                  className="pcard__media"
                  amount={6}
                  sizes="(max-width: 760px) 100vw, 32vw"
                />
                <span className="pcard__shade" />
                <span className="pcard__tag">{p.tag}</span>
                <span className="pcard__index">{String(i + 1).padStart(2, '0')}</span>
                <span className="pcard__label">
                  <i className="accent-bar" />
                  <span className="pcard__name">{p.short}</span>
                  <Arrow />
                </span>
                <span className="pcard__blurb">{p.blurb}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsPreview() {
  return (
    <section className="section section--sage">
      <div className="container">
        <div className="sechead">
          <div>
            <Reveal y={16}>
              <span className="eyebrow">Selected projects</span>
            </Reveal>
            <SplitHeading
              className="display display--lg sechead__title"
              lines={['Spaces that', 'stand for more.']}
            />
          </div>
          <Reveal delay={0.2}>
            <Link to="/projects" className="link-arrow">
              View all projects <Arrow />
            </Link>
          </Reveal>
        </div>

        <div className="feat">
          {projects.slice(0, 2).map((p, i) => (
            <Reveal key={p.name} delay={i * 0.12} className="feat__item">
              <Parallax
                name={p.image}
                alt={`${p.name}, ${p.location}`}
                className="feat__media"
                amount={7}
                sizes="(max-width: 900px) 100vw, 46vw"
              />
              <span className="feat__year">{p.year}</span>
              <div className="feat__panel">
                <span className="feat__index">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="feat__name">{p.name}</h3>
                  <div className="feat__meta">
                    <span>{p.location}</span>
                    <span>{p.sector}</span>
                    <span>{p.units}</span>
                  </div>
                </div>
                <Arrow />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Numbers() {
  return (
    <section className="section section--cream">
      <div className="container">
        <div className="sechead">
          <div>
            <Reveal y={16}>
              <span className="eyebrow">By the numbers</span>
            </Reveal>
            <SplitHeading
              className="display display--md sechead__title"
              lines={['Scale you can schedule around.']}
            />
          </div>
        </div>

        <div className="stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <Stat {...s} />
            </Reveal>
          ))}
        </div>

        <div className="tiles" style={{ marginTop: 'clamp(44px, 6vw, 80px)' }}>
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07} className="tile">
              <span className="tile__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="tile__title">{c.title}</h3>
              <p className="tile__body">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section section--navy">
      <div className="container process">
        <div className="process__sticky">
          <Reveal y={16}>
            <span className="eyebrow">How we work</span>
          </Reveal>
          <SplitHeading
            className="display display--lg sechead__title"
            lines={['From door', 'schedule to', <em key="e">site handover.</em>]}
          />
          <Reveal delay={0.25}>
            <p className="lead" style={{ marginTop: 26 }}>
              Five steps, the same every time — which is exactly why site teams can
              plan around us.
            </p>
          </Reveal>
        </div>

        <div className="process__list">
          {process.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.06} className="pstep">
              <span className="pstep__num">{s.step}</span>
              <div>
                <h3 className="pstep__title">{s.title}</h3>
                <p className="pstep__body">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home({ introDone }) {
  return (
    <>
      <Hero introDone={introDone} />
      <Marquee
        items={[
          'Fire Rated Doors',
          'Designer Laminated',
          'Wooden Frames',
          'LVL Frames',
          'Flush Doors',
          'Metal Fire Doors',
        ]}
      />
      <AboutStrip />
      <ProductsPreview />
      <ProjectsPreview />
      <Numbers />
      <Process />
      <CTABand />
    </>
  )
}
