import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Challenges', path: '/challenges' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Impact', path: '/impact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="container">
        <div className="flex justify-between items-center h-16 md:h-20 px-2 md:px-0">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">SC</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-black gradient-text">SocialConnect</h1>
                <p className="text-xs text-gray-500">Innovation Platform</p>
              </div>
            </Link>
          </div>

          {/* Spacer - Takes up middle space */}
          <div className="hidden md:flex flex-1"></div>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-semibold transition-all duration-300 relative ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-primary rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons - Right Side */}
          <div className="hidden md:flex items-center space-x-3 ml-6">
            <Link to="/challenges">
              <button className="px-5 py-2.5 text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-md">
                Explore
              </button>
            </Link>
            <button className="px-5 py-2.5 text-sm font-semibold bg-gradient-primary text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
              Submit Challenge
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? (
                <X size={24} className="text-primary" />
              ) : (
                <Menu size={24} className="text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-gradient-to-b from-white to-gray-50/50">
            <div className="flex flex-col space-y-1 py-4 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200/50 mt-4">
                <Link to="/challenges">
                  <button className="px-4 py-2.5 w-full text-sm font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
                    Explore Challenges
                  </button>
                </Link>
                <button className="px-4 py-2.5 w-full text-sm font-semibold bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all duration-300">
                  Submit Challenge
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
