import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { EASE, Reveal, SplitHeading, Stat } from '../components/ui'
import { CTABand, PageHero, ProjectCard } from '../components/sections'
import { projects, stats } from '../lib/site'

export default function Projects() {
  const sectors = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.sector)))],
    []
  )
  const [active, setActive] = useState('All')

  const shown = active === 'All' ? projects : projects.filter((p) => p.sector === active)

  return (
    <>
      <PageHero
        crumb="Projects"
        eyebrow="Selected projects"
        lines={['Spaces that', 'stand for more.']}
        lead="Towers, hospitals and commercial cores across Mumbai and Pune — delivered opening by opening, floor by floor, on the dates we committed to."
        image="project-fortune-florence"
      />

      <section className="section section--ivory">
        <div className="container">
          <Reveal y={16}>
            <div className="filters">
              {sectors.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`filter ${active === s ? 'is-active' : ''}`}
                  onClick={() => setActive(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="projgrid">
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => (
                <motion.div
                  key={p.name}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                >
                  <ProjectCard project={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <div className="sechead">
            <div>
              <Reveal y={16}>
                <span className="eyebrow">Track record</span>
              </Reveal>
              <SplitHeading
                className="display display--md sechead__title"
                lines={['Built to be', <em key="e">counted on.</em>]}
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
        </div>
      </section>

      <CTABand />
    </>
  )
}
