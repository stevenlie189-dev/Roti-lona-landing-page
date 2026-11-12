import { TESTIMONIALS } from '../data/testimonials'

export function Testimonials() {
  return (
    <section id="testimoni" className="section testimonials" aria-labelledby="testi-title">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="section-label">04 — Testimoni</p>
            <h2 id="testi-title" className="section-title">
              Cerita dari meja makan.
            </h2>
          </div>
          <p className="section-intro">
            Testimoni demonstrasi: contoh tulisan untuk memperlihatkan tata letak, <strong>bukan</strong> ulasan dari
            pelanggan nyata.
          </p>
        </header>
        <div className="testimonials__grid">
          {TESTIMONIALS.map((t) => (
            <figure key={t.id} className="quote">
              <span className="quote__mark" aria-hidden>
                “
              </span>
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
                <span className="quote__demo">Contoh fiktif</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
