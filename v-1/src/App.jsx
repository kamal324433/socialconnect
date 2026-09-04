import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Challenges from './pages/Challenges'
import HowItWorksPage from './pages/HowItWorks'
import ImpactPage from './pages/Impact'
import About from './pages/About'

function App() {
  return (
    <Router>
      <div className="app bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
