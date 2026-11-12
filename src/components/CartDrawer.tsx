import { useCallback, useRef, useState, type FormEvent } from 'react'
import { ArrowLeft, Copy, Minus, Plus, Send, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useDialog } from '../hooks/useDialog'
import { formatRupiah } from '../lib/format'
import { MAX_QTY } from '../lib/cart'
import { buildOrderMessage, buildWhatsAppUrl, WHATSAPP_NUMBER } from '../lib/whatsapp'

export function CartDrawer() {
  const { lines, count, total, isOpen, close, setQuantity, remove, clear } = useCart()
  const toast = useToast()
  const panelRef = useRef<HTMLElement>(null)
  const [step, setStep] = useState<'cart' | 'checkout'>('cart')
  const [name, setName] = useState('')
  const [note, setNote] = useState('')

  const handleClose = useCallback(() => {
    close()
    setStep('cart')
  }, [close])

  useDialog(isOpen, handleClose, panelRef)

  if (!isOpen) return null

  const message = buildOrderMessage(lines, total, { customerName: name, note })
  const isDemo = WHATSAPP_NUMBER === null

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (WHATSAPP_NUMBER) {
      window.open(buildWhatsAppUrl(WHATSAPP_NUMBER, message), '_blank', 'noopener,noreferrer')
      toast('Pesanan dibuka di WhatsApp. Silakan kirim pesannya.')
    } else {
      toast('Fitur WhatsApp masih dalam mode demonstrasi: nomor belum dikonfigurasi, pesan tidak dikirim.', 'info')
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      toast('Ringkasan pesanan disalin.')
    } catch {
      toast('Tidak dapat menyalin otomatis. Silakan salin teks secara manual.', 'info')
    }
  }

  return (
    <div className="drawer-root">
      <div className="drawer-backdrop" onClick={handleClose} aria-hidden />
      <aside ref={panelRef} className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="drawer__head">
          {step === 'checkout' && (
            <button type="button" className="icon-btn" onClick={() => setStep('cart')} aria-label="Kembali ke keranjang">
              <ArrowLeft size={20} aria-hidden />
            </button>
          )}
          <h2 id="cart-title">{step === 'cart' ? `Keranjang (${count})` : 'Ringkasan Pesanan'}</h2>
          <button type="button" className="icon-btn drawer__close" onClick={handleClose} aria-label="Tutup keranjang">
            <X size={22} aria-hidden />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <ShoppingBag size={36} strokeWidth={1.4} aria-hidden />
            <p>Keranjangmu masih kosong.</p>
            <a href="#menu" className="btn btn--outline" onClick={handleClose}>
              Lihat Menu
            </a>
          </div>
        ) : step === 'cart' ? (
          <>
            <ul className="cart-list">
              {lines.map(({ product, quantity, subtotal }) => (
                <li key={product.id} className="cart-item">
                  <img src={product.image} alt="" width={72} height={72} />
                  <div className="cart-item__info">
                    <h3>{product.name}</h3>
                    <p>{formatRupiah(product.price)}</p>
                    <div className="qty" role="group" aria-label={`Jumlah ${product.name}`}>
                      <button type="button" onClick={() => setQuantity(product.id, quantity - 1)} aria-label={`Kurangi ${product.name}`}>
                        <Minus size={14} aria-hidden />
                      </button>
                      <output aria-live="polite">{quantity}</output>
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        disabled={quantity >= MAX_QTY}
                        aria-label={`Tambah ${product.name}`}
                      >
                        <Plus size={14} aria-hidden />
                      </button>
                    </div>
                  </div>
                  <div className="cart-item__side">
                    <p className="cart-item__subtotal">{formatRupiah(subtotal)}</p>
                    <button type="button" className="link-btn" onClick={() => remove(product.id)} aria-label={`Hapus ${product.name} dari keranjang`}>
                      <Trash2 size={16} aria-hidden /> Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="drawer__foot">
              <dl className="totals">
                <div>
                  <dt>Subtotal ({count} item)</dt>
                  <dd>{formatRupiah(total)}</dd>
                </div>
                <div className="totals__grand">
                  <dt>Total</dt>
                  <dd>{formatRupiah(total)}</dd>
                </div>
              </dl>
              <p className="drawer__hint">Ongkos kirim (jika ada) dikonfirmasi saat pemesanan.</p>
              <button type="button" className="btn btn--primary btn--block" onClick={() => setStep('checkout')}>
                Checkout
              </button>
              <button type="button" className="link-btn link-btn--center" onClick={clear}>
                Kosongkan keranjang
              </button>
            </footer>
          </>
        ) : (
          <form className="checkout" onSubmit={submit}>
            {isDemo && (
              <p className="demo-note" role="note">
                <strong>Mode demonstrasi:</strong> nomor WhatsApp belum dikonfigurasi (<code>VITE_WHATSAPP_NUMBER</code>
                ). Pesanan tidak akan terkirim.
              </p>
            )}
            <div className="field">
              <label htmlFor="cust-name">Nama (opsional)</label>
              <input id="cust-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={60} />
            </div>
            <div className="field">
              <label htmlFor="cust-note">Catatan (opsional)</label>
              <textarea id="cust-note" rows={2} value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} />
            </div>
            <div className="field">
              <label htmlFor="order-preview">Pratinjau pesan</label>
              <textarea id="order-preview" className="preview" readOnly rows={Math.min(14, message.split('\n').length + 1)} value={message} />
            </div>
            <div className="checkout__foot">
              <p className="totals__grand totals__grand--inline">
                <span>Total</span>
                <strong>{formatRupiah(total)}</strong>
              </p>
              <button type="submit" className="btn btn--primary btn--block">
                <Send size={18} aria-hidden /> Kirim via WhatsApp
              </button>
              <button type="button" className="btn btn--outline btn--block" onClick={copy}>
                <Copy size={18} aria-hidden /> Salin ringkasan
              </button>
            </div>
          </form>
        )}
      </aside>
    </div>
  )
}
