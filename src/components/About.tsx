import { Leaf, Heart, Flame } from 'lucide-react'

const PILLARS = [
  { icon: Leaf, title: 'Bahan jujur', text: 'Tepung, mentega, dan telur pilihan — tanpa jalan pintas.' },
  { icon: Flame, title: 'Panggang harian', text: 'Adonan disiapkan malam hari, dipanggang segar tiap pagi.' },
  { icon: Heart, title: 'Untuk semua', text: 'Rasa premium dengan harga yang bisa dinikmati setiap hari.' },
]

export function About() {
  return (
    <section id="tentang" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__visual">
          <img
            src="/images/etalase.jpg"
            alt="Etalase bakery kayu berisi roti baguette dan roti bulat"
            width={1200}
            height={800}
            loading="lazy"
          />
          <img
            className="about__visual-small"
            src="/images/etalase-2.jpg"
            alt="Rak kaca berisi aneka croissant dan roti panggang"
            width={1400}
            height={933}
            loading="lazy"
          />
        </div>

        <div className="about__copy">
          <p className="section-label">01 — Tentang Kami</p>
          <h2 id="about-title" className="section-title">
            Dapur kecil dengan niat sederhana: roti enak untuk semua orang.
          </h2>
          <p>
            Roti Rona lahir dari dapur rumahan yang ingin membuat roti berkualitas bakery premium tanpa harga yang
            membuat ragu. Kami percaya roti yang baik berawal dari waktu fermentasi yang cukup, bahan yang jelas
            asalnya, dan tangan yang sabar.
          </p>
          <p>
            Filosofi kami sederhana — <em>rona</em> adalah warna hangat di kulit roti yang matang sempurna.
            Setiap produk dibuat agar siapa pun, dari mahasiswa hingga keluarga besar, bisa merasakannya.
          </p>
          <ul className="pillars">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon size={22} strokeWidth={1.5} aria-hidden />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="note">Cerita usaha ini fiktif dan dibuat untuk keperluan portofolio.</p>
        </div>
      </div>
    </section>
  )
}
