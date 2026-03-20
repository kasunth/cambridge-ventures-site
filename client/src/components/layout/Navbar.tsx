import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { label: 'About Us', path: '/' },
  { label: 'Venture Capital', path: '/venture-capital', submenu: ['WHAT WE DO', 'FUNDING / SUPPORT', 'PARTNER WITH US'] },
  { label: 'Real Estate', path: '/real-estate', submenu: ['WHAT WE DO', 'SELL LAND', 'OUR PROJECTS'] },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact Us', path: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-gold-400 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                  <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="serif">L</text>
                  <rect x="4" y="4" width="32" height="32" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
            </div>
            <div className="leading-tight">
              <div className="text-[13px] font-bold tracking-[0.2em] text-gray-900">LEX</div>
              <div className="text-[10px] tracking-[0.35em] text-gray-400 font-medium">VENTURES</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center">
            {/* Horizontal line */}
            <div className="w-16 h-px bg-gold-400 mr-4" />

            <div className="flex items-start gap-1">
              {navLinks.map(link => (
                <div key={link.label} className="relative group">
                  {link.path === '#contact' ? (
                    <a
                      href="#contact"
                      onClick={scrollToContact}
                      className="px-5 py-2 text-[13px] font-medium text-gray-600 hover:text-gold-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <div className="text-center">
                      <Link
                        to={link.path}
                        className={`px-5 py-1.5 text-[13px] font-medium transition-all inline-block ${
                          location.pathname === link.path
                            ? 'text-white bg-gold-400 rounded-sm'
                            : 'text-gray-600 hover:text-gold-500'
                        }`}
                      >
                        {link.label}
                      </Link>
                      {/* Submenu below active link */}
                      {link.submenu && location.pathname === link.path && (
                        <div className="flex justify-center gap-4 mt-1">
                          {link.submenu.map(sub => (
                            <span key={sub} className="text-[9px] tracking-wider text-gray-400 hover:text-gold-400 cursor-pointer whitespace-nowrap">
                              {sub}
                            </span>
                          ))}
                        </div>
                      )}
                      {/* Submenu on hover (non-active) */}
                      {link.submenu && location.pathname !== link.path && (
                        <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white shadow-lg min-w-[220px] py-2 z-50 border-t-2 border-gold-400">
                          {link.submenu.map(sub => (
                            <Link
                              key={sub}
                              to={link.path}
                              className="px-5 py-2.5 text-[11px] tracking-wider text-gray-500 hover:bg-gold-50 hover:text-gold-500 transition-colors"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-gray-700 text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100">
            {navLinks.map(link => (
              link.path === '#contact' ? (
                <a
                  key={link.label}
                  href="#contact"
                  onClick={scrollToContact}
                  className="block px-4 py-3 text-sm text-gray-600 hover:bg-gold-50 hover:text-gold-500"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 text-sm ${
                    location.pathname === link.path
                      ? 'text-gold-500 bg-gold-50 font-medium'
                      : 'text-gray-600 hover:bg-gold-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
