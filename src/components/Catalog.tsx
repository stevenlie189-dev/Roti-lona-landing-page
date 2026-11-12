import { useMemo, useState } from 'react'
import { Search, SearchX } from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '../data/products'
import type { Category } from '../types'
import { ProductCard } from './ProductCard'

type Filter = 'Semua' | Category
const FILTERS: Filter[] = ['Semua', ...CATEGORIES]

export function Catalog() {
  const [category, setCategory] = useState<Filter>('Semua')
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PRODUCTS.filter(
      (p) =>
        (category === 'Semua' || p.category === category) &&
        (!q || `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q)),
    )
  }, [category, query])

  const reset = () => {
    setCategory('Semua')
    setQuery('')
  }

  return (
    <section id="menu" className="section catalog" aria-labelledby="menu-title">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="section-label">02 — Menu Produk</p>
            <h2 id="menu-title" className="section-title">
              Pilih favoritmu hari ini.
            </h2>
          </div>
          <p className="section-intro">
            Produk dan harga di bawah adalah data demonstrasi. Tambahkan ke keranjang lalu kirim pesanan lewat
            WhatsApp.
          </p>
        </header>

        <div className="toolbar">
          <div className="filters" role="group" aria-label="Filter kategori">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`chip${category === f ? ' is-active' : ''}`}
                aria-pressed={category === f}
                onClick={() => setCategory(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="search">
            <label htmlFor="product-search" className="sr-only">
              Cari produk
            </label>
            <Search size={18} aria-hidden />
            <input
              id="product-search"
              type="search"
              placeholder="Cari croissant, roti, dessert…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>

        <p className="results-count" role="status" aria-live="polite">
          Menampilkan {results.length} dari {PRODUCTS.length} produk
        </p>

        {results.length > 0 ? (
          <div className="product-grid">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <SearchX size={32} strokeWidth={1.5} aria-hidden />
            <h3>Produk tidak ditemukan</h3>
            <p>Coba kata kunci lain atau tampilkan semua kategori.</p>
            <button type="button" className="btn btn--outline" onClick={reset}>
              Reset pencarian
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
