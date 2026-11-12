import { useEffect, useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { NAV_LINKS } from '../data/site'
import { useCart } from '../context/CartContext'
import { useActiveSection } from '../hooks/useActiveSection'
import { Logo } from './Logo'

const SECTION_IDS = NAV_LINKS.map((l) => l.id)

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const { count, open } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const orderNow = () => {
    setMenuOpen(false)
    open()
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#beranda" className="navbar__brand" aria-label="Roti Rona — ke beranda">
          <Logo />
        </a>

        <nav id="primary-nav" className={`navbar__nav${menuOpen ? ' is-open' : ''}`} aria-label="Navigasi utama">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn--primary navbar__order-mobile" onClick={orderNow}>
            Pesan Sekarang
          </button>
        </nav>

        <div className="navbar__actions">
          <button type="button" className="icon-btn cart-btn" onClick={open} aria-label={`Buka keranjang, ${count} item`}>
            <ShoppingBag size={22} strokeWidth={1.75} aria-hidden />
            {count > 0 && <span className="cart-btn__badge" aria-hidden>{count}</span>}
          </button>
          <button type="button" className="btn btn--primary navbar__order" onClick={orderNow}>
            Pesan Sekarang
          </button>
          <button
            type="button"
            className="icon-btn navbar__toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </div>
    </header>
  )
}
