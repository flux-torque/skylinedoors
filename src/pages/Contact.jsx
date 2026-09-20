import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Arrow, EASE, Icon, Reveal, SplitHeading } from '../components/ui'
import { CTABand, PageHero } from '../components/sections'
import { company, enquiryTypes, faqs, mapsQuery } from '../lib/site'

const EMPTY = { name: '', company: '', email: '', phone: '', type: enquiryTypes[0], message: '' }

function EnquiryForm() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()

    // No server behind this site, so the enquiry is handed to the visitor's
    // mail client pre-addressed and pre-filled.
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company || '—'}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Enquiry: ${form.type}`,
      '',
      form.message,
    ].join('\n')

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      `Enquiry — ${form.type}`
    )}&body=${encodeURIComponent(body)}`

    setSent(true)
  }

  return (
    <form className="form" onSubmit={submit}>
      <AnimatePresence>
        {sent && (
          <motion.div
            className="form__sent"
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 26 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span>
              Thank you, {form.name.split(' ')[0] || 'there'} — your enquiry is ready in
              your mail app. Prefer to talk? Call{' '}
              <a href={`tel:${company.phones[0].replace(/\s/g, '')}`}>{company.phones[0]}</a>.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="form__grid">
        <div className="field">
          <label htmlFor="c-name">Your name</label>
          <input id="c-name" required value={form.name} onChange={set('name')} placeholder="Full name" />
        </div>
        <div className="field">
          <label htmlFor="c-company">Company</label>
          <input
            id="c-company"
            value={form.company}
            onChange={set('company')}
            placeholder="Builder / architect / contractor"
          />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input
            id="c-email"
            type="email"
            required
            value={form.email}
            onChange={set('email')}
            placeholder="you@company.com"
          />
        </div>
        <div className="field">
          <label htmlFor="c-phone">Phone</label>
          <input
            id="c-phone"
            type="tel"
            required
            value={form.phone}
            onChange={set('phone')}
            placeholder="+91"
          />
        </div>
        <div className="field field--wide">
          <label htmlFor="c-type">What is this about?</label>
          <select id="c-type" value={form.type} onChange={set('type')}>
            {enquiryTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field field--wide">
          <label htmlFor="c-msg">Project details</label>
          <textarea
            id="c-msg"
            required
            value={form.message}
            onChange={set('message')}
            placeholder="Project name, location, approximate number of openings, ratings and finishes required, and your target date on site."
          />
        </div>
      </div>

      <div className="form__foot">
        <button type="submit" className="btn btn--primary">
          Send Enquiry <Arrow />
        </button>
        <p className="form__note">
          We reply to every enquiry within one working day.
        </p>
      </div>
    </form>
  )
}

function Accordion() {
  const [open, setOpen] = useState(0)

  return (
    <div className="acc">
      {faqs.map((f, i) => (
        <div className={`acc__item ${open === i ? 'is-open' : ''}`} key={f.q}>
          <button
            className="acc__head"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            {f.q}
            <span className="acc__sign" aria-hidden="true" />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                className="acc__body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p>{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export default function Contact() {
  const { address } = company

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Let's build a brighter tomorrow"
        lines={['Tell us about', <em key="e">the opening.</em>]}
        lead="Send us the door schedule — or just the floor count — and our team will come back with sizes, ratings, finishes and a delivery date."
        image="door-dark-glow"
      />

      {/* quick-contact cards on the dark band */}
      <section className="section section--navy" style={{ paddingBlock: 'clamp(48px, 6vw, 78px)' }}>
        <div className="container">
          <div className="contactcards">
            <Reveal className="ccard">
              <span className="ccard__icon">
                <Icon name="pin" size={22} />
              </span>
              <div className="ccard__h">Factory &amp; office</div>
              <div className="ccard__v">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {address.line1},<br />
                  {address.line2},<br />
                  {address.city} — {address.pin}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="ccard">
              <span className="ccard__icon">
                <Icon name="phone" size={22} />
              </span>
              <div className="ccard__h">Call or WhatsApp</div>
              <div className="ccard__v">
                {company.phones.map((p) => (
                  <div key={p}>
                    <a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.16} className="ccard">
              <span className="ccard__icon">
                <Icon name="mail" size={22} />
              </span>
              <div className="ccard__h">Email</div>
              <div className="ccard__v">
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container contact">
          <div>
            <Reveal y={16}>
              <span className="eyebrow">Get in touch</span>
            </Reveal>
            <SplitHeading
              className="display display--md sechead__title"
              lines={['Visit the floor,', 'or send the schedule.']}
            />

            <Reveal delay={0.15} className="infoblock" style={{ marginTop: 34 }}>
              <div className="infoblock__h">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                  <Icon name="clock" size={14} /> Opening hours
                </span>
              </div>
              <ul className="hours">
                {company.hours.map((h) => (
                  <li key={h.days}>
                    <b>{h.days}</b>
                    <span className={h.time === 'Closed' ? 'closed' : ''}>{h.time}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2} className="infoblock">
              <div className="infoblock__h">Where we deliver</div>
              <div className="infoblock__body">{company.serviceAreas.join(' · ')}</div>
            </Reveal>

            <Reveal delay={0.25} className="infoblock">
              <div className="infoblock__h">Registered name</div>
              <div className="infoblock__body">{company.legalName}</div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      <section style={{ background: 'var(--cream)' }}>
        <div className="container" style={{ paddingBottom: 'clamp(60px, 8vw, 110px)' }}>
          <Reveal>
            <div className="mapwrap">
              <iframe
                title="Skyline Doors on the map"
                src={`https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Also carries the address in text, so the block stays useful
                  if the keyless embed is blocked. */}
              <div className="mapcard">
                <div className="mapcard__h">Factory &amp; office</div>
                <address className="mapcard__addr">
                  {address.line1},<br />
                  {address.line2},<br />
                  {address.city} — {address.pin}
                </address>
                <a
                  className="link-arrow"
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Google Maps <Arrow />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div className="sechead">
            <div>
              <Reveal y={16}>
                <span className="eyebrow">Before you ask</span>
              </Reveal>
              <SplitHeading
                className="display display--lg sechead__title"
                lines={['Questions we get', 'most often.']}
              />
            </div>
          </div>
          <Reveal delay={0.1}>
            <Accordion />
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
