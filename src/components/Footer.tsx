import { Camera, Users, MapPin, Clock, Mail, Music2 } from 'lucide-react'
import { NAV_LINKS, SITE } from '../data/site'
import { useToast } from '../context/ToastContext'
import { Logo } from './Logo'

const SOCIALS = [
  { label: 'Instagram', icon: Camera },
  { label: 'Facebook', icon: Users },
  { label: 'TikTok', icon: Music2 },
]

export function Footer() {
  const toast = useToast()
  return (
    <footer id="kontak" className="footer" aria-labelledby="footer-title">
      <div className="container footer__grid">
        <div className="footer__brand">
          <h2 id="footer-title" className="sr-only">
            Kontak dan informasi Roti Rona
          </h2>
          <Logo light />
          <p>{SITE.tagline} Proyek portofolio dengan data demonstrasi.</p>
          <ul className="socials" aria-label="Media sosial (placeholder)">
            {SOCIALS.map(({ label, icon: Icon }) => (
              <li key={label}>
                <button
                  type="button"
                  aria-label={`${label} (placeholder demonstrasi)`}
                  onClick={() => toast(`Tautan ${label} masih placeholder demonstrasi.`, 'info')}
                >
                  <Icon size={20} strokeWidth={1.6} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Alamat (demonstrasi)</h3>
          <address>
            <MapPin size={18} aria-hidden />
            <span>
              {SITE.address[0]}
              <br />
              {SITE.address[1]}
            </span>
          </address>
          <p className="footer__mail">
            <Mail size={18} aria-hidden />
            <span>{SITE.email}</span>
          </p>
        </div>

        <div>
          <h3>Jam operasional (demonstrasi)</h3>
          <ul className="hours">
            {SITE.hours.map((h) => (
              <li key={h.day}>
                <Clock size={18} aria-hidden />
                <span>
                  {h.day}
                  <br />
                  <strong>{h.time}</strong>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Navigasi footer">
          <h3>Jelajahi</h3>
          <ul className="footer__links">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container footer__legal">
        <p>
          © {new Date().getFullYear()} Roti Rona — usaha fiktif untuk portofolio frontend. Foto oleh kontributor{' '}
          <a href="https://unsplash.com" target="_blank" rel="noreferrer">
            Unsplash
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
