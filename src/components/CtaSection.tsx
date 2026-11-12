import { ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

export function CtaSection() {
  const { open } = useCart()
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container cta__inner">
        <div>
          <h2 id="cta-title" className="cta__title">
            Siap sarapan dengan yang hangat?
          </h2>
          <p>Susun pesananmu sekarang dan kirim lewat WhatsApp — praktis, tanpa perlu membuat akun.</p>
        </div>
        <div className="cta__actions">
          <button type="button" className="btn btn--light" onClick={open}>
            Pesan Sekarang <ArrowRight size={18} aria-hidden />
          </button>
          <a href="#menu" className="btn btn--ghost-light">
            Lihat Menu
          </a>
        </div>
      </div>
    </section>
  )
}
