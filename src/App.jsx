import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DoorIntro from './components/DoorIntro'
import { EASE } from './components/ui'

import Home from './pages/Home'
import Products from './pages/Products'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

/** Inertial scrolling for the whole document. */
function useLenis(paused) {
  const ref = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
      lerp: 0.1,
    })
    ref.current = lenis
    window.__lenis = lenis

    let frame
    const loop = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      ref.current = null
      delete window.__lenis
    }
  }, [])

  useEffect(() => {
    const lenis = ref.current
    if (!lenis) return
    paused ? lenis.stop() : lenis.start()
  }, [paused])

  return ref
}

/** Jump to the top on every route change, and honour #hash targets. */
function useRouteScroll(lenisRef) {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) return
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash, lenisRef])

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const t = setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      const lenis = lenisRef.current
      if (lenis) lenis.scrollTo(el, { offset: -100 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }, 260)
    return () => clearTimeout(t)
  }, [hash, pathname, lenisRef])
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return <motion.div className="progress" style={{ scaleX }} />
}

const page = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.35, ease: 'easeIn' } },
}

export default function App() {
  const location = useLocation()
  // The door only opens on a fresh landing at the front door.
  const [introDone, setIntroDone] = useState(() => window.location.pathname !== '/')

  const lenisRef = useLenis(!introDone)
  useRouteScroll(lenisRef)

  useEffect(() => {
    document.body.classList.toggle('intro-locked', !introDone)
  }, [introDone])

  return (
    <>
      <AnimatePresence>
        {!introDone && <DoorIntro key="intro" onDone={() => setIntroDone(true)} />}
      </AnimatePresence>

      <ScrollProgress />
      <Navbar />

      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={location.pathname} {...page}>
            <Routes location={location}>
              <Route path="/" element={<Home introDone={introDone} />} />
              <Route path="/products" element={<Products />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}
