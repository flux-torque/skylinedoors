import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring, animate } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

/** Scrolls to an element by id through Lenis when it is running. */
export function scrollToId(id, offset = -100) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = window.__lenis
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.3 })
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset })
}

/* Intrinsic widths of the optimised source images, for correct srcset selection. */
const WIDTHS = {
  'hero-door': 1672,
  'about-entrance': 1536,
  'product-fire-rated': 1122,
  'product-laminated': 1122,
  'product-frame': 1122,
  'project-fortune-florence': 1586,
  'project-citycare': 1586,
  'door-dark-glow': 1920,
}

export function Img({ name, alt, sizes = '100vw', priority = false, style, className }) {
  const full = WIDTHS[name] || 1600
  return (
    <img
      src={`/images/${name}.webp`}
      srcSet={`/images/${name}@480.webp 480w, /images/${name}@960.webp 960w, /images/${name}.webp ${full}w`}
      sizes={sizes}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      draggable="false"
    />
  )
}

/**
 * Image inside a clipped frame that drifts against the scroll.
 * `amount` is the drift in percent of the frame height.
 */
export function Parallax({
  name,
  alt,
  amount = 9,
  sizes = '100vw',
  className = '',
  priority = false,
  children,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const raw = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])
  const y = useSpring(raw, { stiffness: 110, damping: 28, mass: 0.4 })

  return (
    <div ref={ref} className={`parallax-frame ${className}`}>
      <motion.div style={{ y, height: '100%', width: '100%', scale: 1 + amount / 42 }}>
        <Img name={name} alt={alt} sizes={sizes} priority={priority} />
      </motion.div>
      {children}
    </div>
  )
}

/** Fade + rise once, when scrolled into view. */
export function Reveal({ children, delay = 0, y = 26, duration = 0.9, className = '', style }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -8% 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Display heading whose lines slide up from behind a mask. */
export function SplitHeading({ lines, className = 'display display--lg', as = 'h2', delay = 0 }) {
  const Tag = motion[as] || motion.h2
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span className="reveal-line" key={i}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '112%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 1.05, delay: delay + i * 0.11, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Counts up to `value` the first time it enters the viewport. */
export function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.9,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="stat__value">
      {n}
      <sup>{suffix}</sup>
    </span>
  )
}

export function Stat({ value, suffix, label }) {
  return (
    <div className="stat">
      <Counter value={value} suffix={suffix} />
      <div className="stat__label">{label}</div>
    </div>
  )
}

/* ---------------- Icons ---------------- */

export const Arrow = () => (
  <svg className="btn__arrow" width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
    <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

export const Icon = ({ name, size = 18 }) => {
  const paths = {
    pin: (
      <>
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.6" />
      </>
    ),
    phone: (
      <path d="M6.5 3h3l1.5 4-2 1.6a12 12 0 0 0 6.4 6.4l1.6-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1.6" />
        <path d="m3.6 6.4 8.4 6 8.4-6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5.2l3.2 2" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2.4" />
        <path d="M7.2 10.4v6.2M7.2 7.5v.1M11.2 16.6v-6.2M11.2 13c0-1.5.9-2.6 2.4-2.6s2.4 1 2.4 2.6v3.6" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </>
    ),
    youtube: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="3.6" />
        <path d="m10.3 9.4 5 2.6-5 2.6V9.4Z" />
      </>
    ),
    whatsapp: (
      <path d="M20 11.8a8 8 0 0 1-11.9 7L4 20l1.3-3.9A8 8 0 1 1 20 11.8Zm-11.6-3c-.3.6-.3 1.6.5 2.8a8 8 0 0 0 3.4 3c1.3.6 2.2.4 2.7 0 .3-.3.5-.8.4-1.1l-1.6-.8-.8.9a6 6 0 0 1-2.6-2.6l.9-.8-.8-1.6c-.4-.1-.9 0-1.2.3Z" />
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
