import type { CartLine } from './cart'
import { formatRupiah } from './format'

/** Mengembalikan nomor yang sudah dibersihkan, atau null bila belum valid/terisi. */
export function normalizeWhatsAppNumber(raw: string | undefined): string | null {
  const digits = (raw ?? '').replace(/\D/g, '')
  return digits.length >= 8 && digits.length <= 15 ? digits : null
}

export const WHATSAPP_NUMBER = normalizeWhatsAppNumber(import.meta.env.VITE_WHATSAPP_NUMBER)

export interface OrderDetails {
  customerName?: string
  note?: string
}

export function buildOrderMessage(lines: CartLine[], total: number, details: OrderDetails = {}): string {
  const rows = lines.map(
    (l, i) =>
      `${i + 1}. ${l.product.name} x${l.quantity} @ ${formatRupiah(l.product.price)} = ${formatRupiah(l.subtotal)}`,
  )
  const parts = [
    'Halo Roti Rona, saya ingin memesan:',
    '',
    ...rows,
    '',
    `Total: ${formatRupiah(total)}`,
  ]
  if (details.customerName?.trim()) parts.push(`Nama: ${details.customerName.trim()}`)
  if (details.note?.trim()) parts.push(`Catatan: ${details.note.trim()}`)
  parts.push('', 'Terima kasih!')
  return parts.join('\n')
}

export const buildWhatsAppUrl = (number: string, message: string): string =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`
