import { About } from './components/About'
import { CartDrawer } from './components/CartDrawer'
import { Catalog } from './components/Catalog'
import { CtaSection } from './components/CtaSection'
import { DemoBanner } from './components/DemoBanner'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Testimonials } from './components/Testimonials'
import { WhyUs } from './components/WhyUs'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <a href="#menu" className="skip-link">
          Lewati ke menu produk
        </a>
        <DemoBanner />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Catalog />
          <WhyUs />
          <Testimonials />
          <CtaSection />
        </main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </ToastProvider>
  )
}
