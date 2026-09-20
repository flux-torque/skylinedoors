import { Link } from 'react-router-dom'
import { Arrow, Parallax, Reveal, SplitHeading, Stat } from '../components/ui'
import { CTABand, Marquee, PageHero } from '../components/sections'
import { company, leadership, stats, timeline, values } from '../lib/site'

function Story() {
  return (
    <section className="section section--cream">
      <div className="container split">
        <div>
          <Reveal y={16}>
            <span className="eyebrow">Our story</span>
          </Reveal>
          <SplitHeading
            className="display display--lg sechead__title"
            lines={['Engineering trust', <em key="e">since 2010.</em>]}
          />
          <Reveal delay={0.2}>
            <div className="split__body">
              <p className="body-text">
                Skyline Doors began in {company.since} in a single unit at Sun Mill
                Compound, Lower Parel, with one press and a short list of contractors
                willing to take a chance on a new supplier.
              </p>
              <p className="body-text">
                Fifteen years later the list is longer and the floor is 50,000 sq. ft.,
                but the job has not changed: empower builders with door solutions that
                combine structural integrity, fire safety and aesthetic excellence — and
                hit the date we promised.
              </p>
              <p className="body-text">
                We are not only a supplier of products. We build lasting partnerships
                with the developers, contractors and architects who put their name on a
                building, because a door that arrives late or arrives wrong is their
                problem long before it is ours.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <Parallax
            name="about-entrance"
            alt="The entrance to a Skyline Doors installation at golden hour"
            className="split__media"
            amount={8}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </Reveal>
      </div>
    </section>
  )
}

function Values() {
  return (
    <section className="section section--ivory">
      <div className="container">
        <div className="sechead">
          <div>
            <Reveal y={16}>
              <span className="eyebrow">What we stand on</span>
            </Reveal>
            <SplitHeading
              className="display display--lg sechead__title"
              lines={['Three things we', 'refuse to trade.']}
            />
          </div>
        </div>

        <div className="tiles">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="tile">
              <span className="tile__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="tile__title">{v.title}</h3>
              <p className="tile__body">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Timeline() {
  return (
    <section className="section section--cream">
      <div className="container">
        <div className="sechead">
          <div>
            <Reveal y={16}>
              <span className="eyebrow">The road here</span>
            </Reveal>
            <SplitHeading
              className="display display--md sechead__title"
              lines={['Fifteen years, one direction.']}
            />
          </div>
        </div>

        <div className="timeline">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08} className="tl">
              <div className="tl__year">{t.year}</div>
              <h3 className="tl__title">{t.title}</h3>
              <p className="tl__body">{t.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Facility() {
  return (
    <section className="section section--navy">
      <div className="container split split--reverse">
        <Reveal delay={0.1}>
          <Parallax
            name="product-frame"
            alt="Close detail of a machined hardwood door frame"
            className="split__media"
            amount={8}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </Reveal>

        <div>
          <Reveal y={16}>
            <span className="eyebrow">The factory floor</span>
          </Reveal>
          <SplitHeading
            className="display display--lg sechead__title"
            lines={['50,000 sq. ft.', 'of tolerance.']}
          />
          <Reveal delay={0.2}>
            <div className="split__body">
              <p className="lead">
                CNC machinery, automated finishing lines, an in-house fire-testing lab
                and climate-controlled curing chambers — all under one roof in Lower
                Parel, so a 500-door order leaves as consistently as a single sample.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="stats" style={{ marginTop: 44, gridTemplateColumns: '1fr 1fr' }}>
              {stats.slice(0, 2).map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Leadership() {
  return (
    <section className="section section--ivory">
      <div className="container">
        <div className="sechead">
          <div>
            <Reveal y={16}>
              <span className="eyebrow">Leadership &amp; board</span>
            </Reveal>
            <SplitHeading
              className="display display--lg sechead__title"
              lines={['The people who', 'sign the schedule.']}
            />
          </div>
          <Reveal delay={0.2}>
            <Link to="/contact" className="link-arrow">
              Talk to the team <Arrow />
            </Link>
          </Reveal>
        </div>

        <div className="leaders">
          {leadership.map((m, i) => (
            <Reveal
              key={m.role}
              delay={i * 0.08}
              className={`leader ${m.featured ? 'leader--featured' : ''}`}
            >
              <div className="leader__photo">
                <span className="leader__initials">{m.initials}</span>
                {m.placeholder && <span className="leader__ph">Photo to follow</span>}
              </div>
              <h3 className="leader__name">{m.name}</h3>
              <div className="leader__role">{m.role}</div>
              <p className="leader__bio">{m.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About us"
        lines={['Built on strength.', 'Refined by design.']}
        lead={`${company.legalName} — ${company.positioning}, manufacturing high-performance door solutions for residential, commercial and fire-rated spaces since ${company.since}.`}
        image="about-entrance"
      />
      <Marquee items={['Quality First', 'Client Centric', 'Integrity', 'On Time, Every Time']} />
      <Story />
      <Values />
      <Timeline />
      <Facility />
      <Leadership />
      <CTABand />
    </>
  )
}
