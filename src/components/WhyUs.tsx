import { Wheat, Croissant, Wallet, HandHeart } from 'lucide-react'

const REASONS = [
  { icon: Wheat, title: 'Bahan berkualitas', text: 'Mentega asli, tepung pilihan, dan telur segar sebagai dasar setiap adonan.' },
  { icon: Croissant, title: 'Dibuat fresh', text: 'Dipanggang setiap pagi dalam batch kecil agar tekstur dan aromanya terjaga.' },
  { icon: Wallet, title: 'Harga terjangkau', text: 'Kualitas bakery tanpa harga premium — nyaman untuk pembelian harian.' },
  { icon: HandHeart, title: 'Pelayanan ramah', text: 'Pesan mudah lewat WhatsApp, dilayani dengan sabar dan hangat.' },
]

export function WhyUs() {
  return (
    <section id="keunggulan" className="section why" aria-labelledby="why-title">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="section-label">03 — Keunggulan</p>
            <h2 id="why-title" className="section-title">
              Alasan pelanggan kembali lagi.
            </h2>
          </div>
        </header>
        <ol className="why__list">
          {REASONS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="why__item">
              <span className="why__num" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <Icon size={28} strokeWidth={1.4} aria-hidden />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
