import { describe, expect, it } from 'vitest'
import { PRODUCTS } from '../data/products'
import { cartReducer, getCartCount, getCartLines, getCartTotal, MAX_QTY } from './cart'
import { formatRupiah } from './format'
import { buildOrderMessage, buildWhatsAppUrl, normalizeWhatsAppNumber } from './whatsapp'

const [a, b] = PRODUCTS

describe('cartReducer', () => {
  it('menambah produk baru dan menaikkan jumlah bila sudah ada', () => {
    let s = cartReducer([], { type: 'add', productId: a.id })
    s = cartReducer(s, { type: 'add', productId: a.id })
    expect(s).toEqual([{ productId: a.id, quantity: 2 }])
  })
  it('mengubah jumlah, dan menghapus bila jumlah < 1', () => {
    let s = cartReducer([], { type: 'add', productId: a.id })
    s = cartReducer(s, { type: 'setQty', productId: a.id, quantity: 5 })
    expect(s[0].quantity).toBe(5)
    expect(cartReducer(s, { type: 'setQty', productId: a.id, quantity: 0 })).toEqual([])
  })
  it('membatasi jumlah maksimum', () => {
    const s = cartReducer([{ productId: a.id, quantity: 1 }], { type: 'setQty', productId: a.id, quantity: 500 })
    expect(s[0].quantity).toBe(MAX_QTY)
  })
  it('menghapus produk dan mengosongkan keranjang', () => {
    let s = cartReducer([], { type: 'add', productId: a.id })
    s = cartReducer(s, { type: 'add', productId: b.id })
    expect(cartReducer(s, { type: 'remove', productId: a.id })).toHaveLength(1)
    expect(cartReducer(s, { type: 'clear' })).toEqual([])
  })
})

describe('perhitungan keranjang', () => {
  it('menghitung subtotal, total, dan jumlah item', () => {
    const lines = getCartLines(
      [
        { productId: a.id, quantity: 2 },
        { productId: b.id, quantity: 3 },
        { productId: 'tidak-ada', quantity: 9 },
      ],
      PRODUCTS,
    )
    expect(lines).toHaveLength(2)
    expect(getCartTotal(lines)).toBe(a.price * 2 + b.price * 3)
    expect(getCartCount(lines)).toBe(5)
  })
})

describe('WhatsApp', () => {
  it('menormalisasi nomor', () => {
    expect(normalizeWhatsAppNumber(undefined)).toBeNull()
    expect(normalizeWhatsAppNumber('')).toBeNull()
    expect(normalizeWhatsAppNumber('123')).toBeNull()
    expect(normalizeWhatsAppNumber('+62 812-0000-0000')).toBe('6281200000000')
  })
  it('menyusun pesan dan URL', () => {
    const lines = getCartLines([{ productId: a.id, quantity: 2 }], PRODUCTS)
    const msg = buildOrderMessage(lines, getCartTotal(lines), { customerName: 'Uji', note: 'tanpa kantong' })
    expect(msg).toContain(`1. ${a.name} x2`)
    expect(msg).toContain(`Total: ${formatRupiah(a.price * 2)}`)
    expect(msg).toContain('Nama: Uji')
    expect(buildWhatsAppUrl('628120000000', msg)).toMatch(/^https:\/\/wa\.me\/628120000000\?text=Halo%20Roti%20Rona/)
  })
})
