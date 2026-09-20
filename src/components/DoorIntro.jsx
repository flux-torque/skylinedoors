import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { EASE } from './ui'

/**
 * The curtain-raiser.
 *
 * A small door sits inside an architectural frame of hairlines. It swings
 * open in step with the loader — the door IS the progress bar — and when the
 * count reaches 100 the light behind it floods the screen and hands over to
 * the site.
 *
 *   0.00 — 2.60  count 000 → 100, door swings with it, caption rises
 *   2.60 — 2.90  a beat at full open
 *   2.90 — 3.65  light floods, site takes over
 */

const LOAD = 2.6
const HOLD = 0.3
const OUT = 0.75
const TOTAL = LOAD + HOLD + OUT

export default function DoorIntro({ onDone }) {
  const doneRef = useRef(false)
  const [pct, setPct] = useState(0)
  const [out, setOut] = useState(false)

  const progress = useMotionValue(0)

  // The swing, the light and the caption are all driven off the loader, so
  // they can never drift out of sync with the number on screen.
  const swing = useTransform(progress, [6, 100], [0, 104])
  const leafL = useTransform(swing, (v) => -v)
  const fill = useTransform(progress, [0, 100], [0, 1])
  const light = useTransform(progress, [4, 55, 100], [0, 0.5, 1])
  const capY1 = useTransform(progress, [26, 58], ['115%', '0%'])
  const capY2 = useTransform(progress, [32, 64], ['115%', '0%'])

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

    let controls
    let toOut
    let toEnd
    let started = false

    // Browsers stall rAF in a hidden tab, which pauses the animation but not
    // a wall-clock timer. Only start counting once the page is being looked
    // at, so opening the site in a background tab doesn't burn the intro.
    const start = () => {
      if (started || doneRef.current) return
      started = true
      controls = animate(progress, 100, {
        duration: LOAD,
        ease: [0.35, 0, 0.12, 1],
        onUpdate: (v) => setPct(Math.round(v)),
      })
      toOut = setTimeout(() => setOut(true), (LOAD + HOLD) * 1000)
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
      if (controls) controls.stop()
      clearTimeout(toOut)
      clearTimeout(toEnd)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      className="intro"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      aria-label="Skyline Doors introduction"
    >
      <div className="intro__grid" />
      <div className="intro__vignette" />

      <motion.div
        className="intro__mark"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: out ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <span className="logo__word">SKYLINE</span>
        <span className="logo__sub">DOORS</span>
      </motion.div>

      <motion.div
        className="intro__core"
        animate={out ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
        transition={{ duration: OUT * 0.85, ease: EASE }}
      >
        <motion.div
          className="doorwrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <i className="doorwrap__jamb doorwrap__jamb--l" />
          <i className="doorwrap__jamb doorwrap__jamb--r" />
          <i className="doorwrap__floor" />
          <motion.i className="doorwrap__halo" style={{ opacity: light }} />
          <motion.i className="doorwrap__spill" style={{ opacity: light }} />

          <div className="doorglyph">
            {/* The room behind is simply lit — you see more of it as the
                leaves swing, rather than the light itself fading up. */}
            <span className="doorglyph__light" />
            <motion.span
              className="doorglyph__leaf doorglyph__leaf--l"
              style={{ rotateY: leafL }}
            />
            <motion.span
              className="doorglyph__leaf doorglyph__leaf--r"
              style={{ rotateY: swing }}
            />
          </div>
        </motion.div>

        <p className="intro__caption">
          <span className="intro__capline">
            <motion.span style={{ y: capY1 }}>Crafting doors</motion.span>
          </span>
          <span className="intro__capline">
            <motion.span style={{ y: capY2 }}>
              <em>for you.</em>
            </motion.span>
          </span>
        </p>

        <div className="intro__meter">
          <span className="intro__track">
            <motion.span className="intro__fill" style={{ scaleX: fill }} />
          </span>
          <span className="intro__pct">{String(pct).padStart(3, '0')}</span>
        </div>
      </motion.div>

      <span className="intro__corner intro__corner--l">Est. 2010</span>
      <span className="intro__corner intro__corner--r">Mumbai</span>

      <motion.div
        className="intro__flood"
        initial={{ opacity: 0 }}
        animate={{ opacity: out ? 1 : 0 }}
        transition={{ duration: OUT * 0.95, ease: 'easeIn' }}
      />

      <motion.button
        className="intro__skip"
        onClick={finish}
        initial={{ opacity: 0 }}
        animate={{ opacity: out ? 0 : 1 }}
        transition={{ duration: 0.6, delay: out ? 0 : 0.7 }}
      >
        Skip
      </motion.button>
    </motion.div>
  )
}
