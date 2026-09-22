import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Steps from './components/Steps.jsx'
import Ownership from './components/Ownership.jsx'
import Pricing from './components/Pricing.jsx'
import Questions from './components/Reviews.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import useMotion from './hooks/useMotion.js'

export default function App() {
  useMotion()
  return <><a className="skip-link" href="#main">Vai al contenuto</a><div className="scroll-progress" aria-hidden="true" /><Navbar /><main id="main"><Hero /><Features /><Steps /><Ownership /><Pricing /><Questions /><Contact /></main><Footer /></>
}
