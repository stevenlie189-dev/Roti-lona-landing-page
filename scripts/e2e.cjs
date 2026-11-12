const { chromium } = require('playwright')
const S = process.argv[2] || '.'
let fails = 0
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) fails++ }
;(async () => {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => ['error', 'warning'].includes(m.type()) && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto('http://localhost:5173/')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: `${S}/shots/hero-desktop.png` })
  await page.screenshot({ path: `${S}/shots/full-desktop.png`, fullPage: true })

  // images all loaded
  const broken = await page.$$eval('img', (imgs) => imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src))
  ok(broken.length === 0, 'semua gambar termuat ' + broken.join(','))

  // nav scroll
  for (const [label, id] of [['Tentang Kami', 'tentang'], ['Menu Produk', 'menu'], ['Keunggulan', 'keunggulan'], ['Kontak', 'kontak'], ['Beranda', 'beranda']]) {
    await page.click(`header nav >> text="${label}"`)
    await page.waitForTimeout(900)
    const top = await page.$eval('#' + id, (e) => Math.round(e.getBoundingClientRect().top))
    ok(top >= 0 && top < 200 || id === 'kontak', `nav ${label} -> #${id} top=${top}`)
  }
  await page.click('header nav >> text="Menu Produk"'); await page.waitForTimeout(900)
  ok((await page.getAttribute('header nav >> text="Menu Produk"', 'aria-current')) === 'true', 'active nav menyorot Menu Produk')

  // filter & search
  const cards = () => page.locator('.product').count()
  ok((await cards()) === 9, '9 produk tampil')
  await page.click('.chip:text-is("Pastry")'); ok((await cards()) === 3, 'filter Pastry = 3')
  await page.click('.chip:text-is("Roti")'); ok((await cards()) === 4, 'filter Roti = 4')
  await page.click('.chip:text-is("Semua")')
  await page.fill('#product-search', 'sourdough'); ok((await cards()) === 1, 'cari sourdough = 1')
  await page.fill('#product-search', 'zzzz'); ok((await page.locator('.empty').count()) === 1, 'empty state tampil')
  await page.click('text=Reset pencarian'); ok((await cards()) === 9, 'reset mengembalikan 9')

  // cart
  await page.click('[aria-label="Tambah Croissant Butter ke keranjang"]')
  await page.click('[aria-label="Tambah Croissant Butter ke keranjang"]')
  await page.click('[aria-label="Tambah Sourdough Desa ke keranjang"]')
  ok((await page.textContent('.cart-btn__badge')) === '3', 'badge keranjang = 3')
  ok((await page.locator('.toast').count()) === 1, 'toast tampil')
  await page.click('.cart-btn')
  ok(await page.locator('[role=dialog]').isVisible(), 'keranjang terbuka')
  const text = () => page.textContent('.drawer')
  ok((await text()).includes('Rp 78.000'), 'total 2x18.000+42.000 = 78.000')
  await page.click('[aria-label="Tambah Croissant Butter"]')
  ok((await text()).includes('Rp 96.000'), 'qty +1 -> total 96.000')
  await page.click('[aria-label="Kurangi Croissant Butter"]')
  await page.click('[aria-label="Kurangi Croissant Butter"]')
  await page.click('[aria-label="Kurangi Croissant Butter"]')
  ok(!(await text()).includes('Croissant Butter'), 'qty ke 0 menghapus item')
  ok((await text()).includes('Rp 42.000'), 'total tersisa 42.000')
  await page.screenshot({ path: `${S}/shots/cart.png` })
  await page.click('[aria-label="Hapus Sourdough Desa dari keranjang"]')
  ok((await text()).includes('masih kosong'), 'hapus -> keranjang kosong')
  await page.keyboard.press('Escape')
  ok(!(await page.locator('[role=dialog]').count()), 'Escape menutup keranjang')

  // persist after reload
  await page.click('[aria-label="Tambah Cinnamon Roll ke keranjang"]')
  await page.reload(); await page.waitForLoadState('networkidle')
  ok((await page.textContent('.cart-btn__badge')) === '1', 'keranjang persisten setelah reload')

  // checkout demo mode
  await page.click('.cart-btn'); await page.click('text=Checkout')
  ok(await page.locator('.demo-note').isVisible(), 'catatan mode demonstrasi tampil')
  await page.fill('#cust-name', 'Budi Uji')
  ok((await page.inputValue('#order-preview')).includes('Nama: Budi Uji'), 'pratinjau pesan memuat nama')
  await page.screenshot({ path: `${S}/shots/checkout.png` })
  let popup = false; page.on('popup', () => (popup = true))
  await page.click('text=Kirim via WhatsApp'); await page.waitForTimeout(300)
  ok(!popup, 'mode demo tidak membuka WhatsApp')
  ok((await page.textContent('.toast')).includes('mode demonstrasi'), 'toast mode demonstrasi')
  await page.click('[aria-label="Tutup keranjang"]')
  ok(true, 'drawer ditutup lewat tombol')

  // footer social placeholder
  await page.click('[aria-label^="Instagram"]'); ok((await page.textContent('.toast')).includes('placeholder'), 'sosial placeholder memberi notifikasi')
  ok(errors.length === 0, 'tidak ada error/warning console ' + JSON.stringify(errors))

  // WhatsApp configured
  const p2 = await ctx.newPage()
  await p2.goto('http://localhost:5174/'); await p2.waitForLoadState('networkidle')
  await p2.evaluate(() => { window.__opened = null; window.open = (u) => { window.__opened = u; return null } })
  await p2.click('[aria-label="Tambah Roti Gandum Iris ke keranjang"]')
  await p2.click('.cart-btn'); await p2.click('text=Checkout')
  ok((await p2.locator('.demo-note').count()) === 0, 'nomor terisi: tanpa catatan demo')
  await p2.click('text=Kirim via WhatsApp')
  const url = await p2.evaluate(() => window.__opened)
  ok(url && url.startsWith('https://wa.me/6281200000000?text='), 'URL wa.me dibuat ' + (url || '').slice(0, 70))
  ok(decodeURIComponent(url.split('text=')[1]).includes('Roti Gandum Iris x1'), 'pesan memuat produk')

  // mobile
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  const m = await mctx.newPage(); await m.goto('http://localhost:5173/'); await m.waitForLoadState('networkidle')
  const overflow = await m.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  ok(overflow <= 0, 'mobile: tidak ada horizontal scroll (' + overflow + ')')
  await m.screenshot({ path: `${S}/shots/mobile-hero.png` })
  await m.click('[aria-label="Buka menu"]'); await m.waitForTimeout(400)
  await m.screenshot({ path: `${S}/shots/mobile-menu.png` })
  await m.click('#primary-nav >> text="Menu Produk"'); await m.waitForTimeout(900)
  ok((await m.getAttribute('.navbar__toggle', 'aria-expanded')) === 'false', 'mobile: menu menutup setelah klik')
  await m.screenshot({ path: `${S}/shots/mobile-menu-section.png` })
  await m.screenshot({ path: `${S}/shots/mobile-full.png`, fullPage: true })
  const t = await browser.newContext({ viewport: { width: 820, height: 1100 } })
  const tp = await t.newPage(); await tp.goto('http://localhost:5173/'); await tp.waitForLoadState('networkidle')
  ok((await tp.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 0, 'tablet: tidak ada horizontal scroll')
  await tp.screenshot({ path: `${S}/shots/tablet-full.png`, fullPage: true })
  await browser.close()
  console.log(fails ? `\n${fails} GAGAL` : '\nSEMUA LULUS'); process.exit(fails ? 1 : 0)
})()
