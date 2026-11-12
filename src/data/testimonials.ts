import type { Testimonial } from '../types'

/** Testimoni DEMONSTRASI — ditulis sebagai contoh, bukan dari pelanggan nyata. */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Croissant-nya renyah sampai ke lapisan terakhir. Buat sarapan sebelum kelas, harganya masih ramah di kantong mahasiswa.',
    name: 'Contoh Pelanggan A',
    role: 'Persona: mahasiswa',
  },
  {
    id: 't2',
    quote:
      'Pesan lewat WhatsApp mudah dan cepat. Roti gandumnya jadi bekal rutin selama jam kerja yang padat.',
    name: 'Contoh Pelanggan B',
    role: 'Persona: pekerja kantoran',
  },
  {
    id: 't3',
    quote:
      'Anak-anak suka cinnamon roll-nya. Kami sering memesan paket roti aneka untuk berkumpul di akhir pekan.',
    name: 'Contoh Pelanggan C',
    role: 'Persona: keluarga',
  },
]
