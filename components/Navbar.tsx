'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-sm shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">

          {/* Logo (UNCHANGED desktop feel, only responsive tweak) */}
          <a href="#home" className="cursor-pointer">
            <img
              className="w-32 sm:w-36 md:w-40 h-auto"
              src="/img/glactic_logo_page-0001-removebg-preview.png"
              alt="GSH"
            />
          </a>

          {/* Desktop Menu (UNCHANGED) */}
          <div className="hidden md:flex items-center space-x-2">
            {['home', 'about', 'wing', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="px-4 py-2 rounded-lg text-gray-800 font-medium capitalize
                           hover:text-blue-600 hover:bg-blue-50
                           transition-all duration-200"
              >
                {item === 'wing'
                  ? 'Wings'
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 px-5 py-2 bg-blue-600 text-white rounded-xl font-semibold
                         hover:bg-blue-700 shadow hover:shadow-md
                         transition-all duration-200"
            >
              Join Us 🚀
            </a>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu (FIXED PROPERLY) */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-80 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-1 pt-2 border-t border-gray-100 bg-white">
            {[
              { href: '#home', label: 'Home' },
              { href: '#about', label: 'About' },
              { href: '#wing', label: 'Wings' },
              { href: '#contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-gray-800 font-medium rounded-lg
                           hover:text-blue-600 hover:bg-blue-50
                           transition-all duration-200"
              >
                {label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mx-2 mt-2 px-4 py-3 text-center bg-blue-600 text-white rounded-xl font-semibold
                         hover:bg-blue-700 transition-all duration-200"
            >
              Join Us 🚀
            </a>
          </div>
        </div>

      </div>
    </nav>
  )
}