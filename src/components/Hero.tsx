import { ArrowDown, Clock } from 'lucide-react'
import { useCart } from '../context/CartContext'

export function Hero() {
  const { open } = useCart()
  return (
    <section id="beranda" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">Bakery lokal · Sejak pagi, setiap hari</p>
          <h1 id="hero-title" className="hero__title">
            Hangat dari oven, <em>sederhana</em> di setiap gigitan.
          </h1>
          <p className="hero__lead">
            Roti Rona memanggang roti, croissant, pastry, dan dessert dengan bahan pilihan dan harga yang tetap
            bersahabat — untuk sarapan, jam istirahat, hingga kumpul keluarga.
          </p>
          <div className="hero__actions">
            <a href="#menu" className="btn btn--outline">
              Lihat Menu <ArrowDown size={18} aria-hidden />
            </a>
            <button type="button" className="btn btn--primary" onClick={open}>
              Pesan Sekarang
            </button>
          </div>
          <dl className="hero__facts">
            <div>
              <dt>Dipanggang</dt>
              <dd>Setiap pagi</dd>
            </div>
            <div>
              <dt>Mulai dari</dt>
              <dd>Rp12.000</dd>
            </div>
            <div>
              <dt>Pesan via</dt>
              <dd>WhatsApp</dd>
            </div>
          </dl>
        </div>

        <figure className="hero__visual">
          <img
            src="/images/croissant-butter.jpg"
            alt="Croissant butter keemasan dengan taburan tepung di atas meja gelap"
            width={1400}
            height={933}
            fetchPriority="high"
          />
          <figcaption className="hero__badge">
            <Clock size={18} aria-hidden />
            <span>
              <strong>Batch pagi</strong> keluar oven pukul 06.00
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
