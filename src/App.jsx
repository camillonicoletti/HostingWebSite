import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Steps from './components/Steps.jsx'
import Ownership from './components/Ownership.jsx'
import Pricing from './components/Pricing.jsx'
import Reviews from './components/Reviews.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import MobileCta from './components/MobileCta.jsx'
import useReveal from './hooks/useReveal.js'

export default function App() {
  useReveal()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Steps />
        <Ownership />
        <Pricing />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  )
}
