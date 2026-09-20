import { Link } from 'react-router-dom'
import { Arrow, Parallax, Reveal, SplitHeading, scrollToId } from '../components/ui'
import { CTABand, PageHero } from '../components/sections'
import { products } from '../lib/site'

export default function Products() {
  return (
    <>
      <PageHero
        crumb="Products"
        eyebrow="Our products"
        lines={['Doors for every', 'greater possibility.']}
        lead="Six product families, one standard. Whether an opening needs a two-hour fire rating or a grain-matched laminate finish, it leaves our Lower Parel floor built to the same tolerance."
        image="product-laminated"
      />

      {/* quick index */}
      <section className="section section--cream" style={{ paddingBlock: 'clamp(40px, 5vw, 64px)' }}>
        <div className="container">
          <Reveal y={16}>
            <div className="filters" style={{ marginBottom: 0 }}>
              {products.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  className="filter"
                  onClick={() => scrollToId(p.slug)}
                >
                  {p.short}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          {products.map((p, i) => (
            <article
              key={p.slug}
              id={p.slug}
              className={`prow ${i % 2 ? 'prow--alt' : ''}`}
              style={{ scrollMarginTop: 110 }}
            >
              <Reveal delay={0.05} className="prow__media-wrap">
                <Parallax
                  name={p.image}
                  alt={p.name}
                  className="prow__media"
                  amount={8}
                  sizes="(max-width: 900px) 100vw, 46vw"
                />
              </Reveal>

              <div>
                <Reveal y={16}>
                  <span className="prow__tag">{p.tag}</span>
                </Reveal>
                <SplitHeading className="display display--md prow__title" lines={[p.name]} />
                <Reveal delay={0.15}>
                  <p className="prow__desc">{p.description}</p>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="spec">
                    {p.specs.map(([k, v]) => (
                      <div className="spec__row" key={k}>
                        <span className="spec__k">{k}</span>
                        <span className="spec__v">{v}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.25}>
                  <div className="chips">
                    {p.uses.map((u) => (
                      <span className="chip" key={u}>
                        {u}
                      </span>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.3}>
                  <div style={{ marginTop: 32 }}>
                    <Link to="/contact" className="link-arrow">
                      Enquire about {p.short} <Arrow />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  )
}
