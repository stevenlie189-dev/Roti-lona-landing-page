/** Informasi usaha — seluruhnya fiktif / demonstrasi. */
export const SITE = {
  name: 'Roti Rona',
  tagline: 'Bakery lokal, fresh dari oven.',
  address: ['Jl. Contoh Raya No. 12', 'Kota Contoh, Indonesia 00000'],
  hours: [
    { day: 'Senin – Jumat', time: '06.00 – 20.00' },
    { day: 'Sabtu – Minggu', time: '07.00 – 21.00' },
  ],
  email: 'halo@rotirona.example',
  phoneNote: 'Nomor pemesanan diatur melalui konfigurasi (.env)',
} as const

export const NAV_LINKS = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang Kami' },
  { id: 'menu', label: 'Menu Produk' },
  { id: 'keunggulan', label: 'Keunggulan' },
  { id: 'kontak', label: 'Kontak' },
] as const
