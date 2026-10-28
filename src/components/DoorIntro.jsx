import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './ui'

/**
 * The curtain-raiser.
 *
 * A pair of wooden doors swings open onto warm light, a line of text settles
 * beneath, then we walk through the doorway into the site.
 *
 *   0.00 — 0.60  doors and caption fade up
 *   0.60 — 2.00  the leaves swing open, the light blooms
 *   2.20 — 3.00  zoom through the doorway, hand over
 */

const OPEN_AT = 0.6
const OPEN_FOR = 1.4
const OUT_AT = 2.2
const TOTAL = 3.0

const SWING = [0.65, 0, 0.2, 1]

export default function DoorIntro({ onDone }) {
  const doneRef = useRef(false)
  const [out, setOut] = useState(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    onDone()
  }

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      const t = setTimeout(finish, 120)
      return () => clearTimeout(t)
    }

    let toOut
    let toEnd
    let started = false

    // Browsers stall rAF in a hidden tab, so only start the clock once the
    // page is being looked at.
    const start = () => {
      if (started || doneRef.current) return
      started = true
      toOut = setTimeout(() => setOut(true), OUT_AT * 1000)
      toEnd = setTimeout(finish, TOTAL * 1000)
    }

    const onVisible = () => {
      if (document.visibilityState === 'visible') start()
    }
    onVisible()
    document.addEventListener('visibilitychange', onVisible)

    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      clearTimeout(toOut)
      clearTimeout(toEnd)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const leaf = (dir) => ({
    initial: { rotateY: 0 },
    animate: { rotateY: dir * 100 },
    transition: { duration: OPEN_FOR, delay: OPEN_AT, ease: SWING },
  })

  return (
    <motion.div
      className="intro"
      onClick={finish}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      aria-label="Skyline Doors introduction"
    >
      <motion.i
        className="intro__bloom"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: OPEN_FOR + 0.4, delay: OPEN_AT, ease: EASE }}
      />

      <div className="intro__core">
        <motion.div
          className="doorway"
          initial={{ opacity: 0, y: 10 }}
          animate={out ? { opacity: 1, y: 0, scale: 16 } : { opacity: 1, y: 0, scale: 1 }}
          transition={
            out
              ? { duration: 0.8, ease: [0.7, 0, 0.84, 0] }
              : { duration: 0.6, ease: EASE }
          }
        >
          <span className="doorway__light" />
          <motion.span className="doorway__leaf doorway__leaf--l" {...leaf(-1)} />
          <motion.span className="doorway__leaf doorway__leaf--r" {...leaf(1)} />
        </motion.div>

        <motion.i
          className="intro__spill"
          initial={{ opacity: 0, scaleX: 0.3 }}
          animate={{ opacity: out ? 0 : 1, scaleX: 1 }}
          transition={{ duration: out ? 0.3 : OPEN_FOR, delay: out ? 0 : OPEN_AT, ease: EASE }}
        />

        <motion.p
          className="intro__caption"
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={
            out
              ? { opacity: 0, letterSpacing: '0.32em' }
              : { opacity: 1, letterSpacing: '0.32em' }
          }
          transition={{ duration: out ? 0.3 : 1.4, delay: out ? 0 : 0.3, ease: EASE }}
        >
          Opening <em>Skyline Doors</em> for you
        </motion.p>
      </div>

      <motion.i
        className="intro__flood"
        initial={{ opacity: 0 }}
        animate={{ opacity: out ? 1 : 0 }}
        transition={{ duration: 0.5, delay: out ? 0.35 : 0, ease: 'easeIn' }}
      />
    </motion.div>
  )
}
