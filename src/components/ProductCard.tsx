import { Plus, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { formatRupiah } from '../lib/format'
import type { Product } from '../types'

export function ProductCard({ product }: { product: Product }) {
  const { add, quantityOf } = useCart()
  const toast = useToast()
  const inCart = quantityOf(product.id)

  const handleAdd = () => {
    add(product.id)
    toast(`${product.name} ditambahkan ke keranjang.`)
  }

  return (
    <article className="product">
      <div className="product__media">
        <img src={product.image} alt={product.imageAlt} width={900} height={675} loading="lazy" />
        <span className="product__tag">{product.category}</span>
      </div>
      <div className="product__body">
        <h3 className="product__name">{product.name}</h3>
        <p className="product__desc">{product.description}</p>
        <div className="product__footer">
          <p className="product__price">{formatRupiah(product.price)}</p>
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={handleAdd}
            aria-label={`Tambah ${product.name} ke keranjang`}
          >
            {inCart > 0 ? <Check size={16} aria-hidden /> : <Plus size={16} aria-hidden />}
            {inCart > 0 ? `Di keranjang (${inCart})` : 'Tambah'}
          </button>
        </div>
      </div>
    </article>
  )
}
