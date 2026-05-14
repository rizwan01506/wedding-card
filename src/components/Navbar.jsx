import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { to: 'couple', label: 'Couple' },
  { to: 'events', label: 'Events' },
  { to: 'venue', label: 'Venue' },
  { to: 'timeline', label: 'Timeline' },
];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      const heroHeight = window.innerHeight;
      setScrolled(y > 60);
      setVisible(y > heroHeight * 0.75);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          pointerEvents: visible ? 'auto' : 'none',
          background: scrolled
            ? darkMode
              ? 'rgba(15,26,20,0.93)'
              : 'rgba(250,247,240,0.93)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="home" smooth duration={600} className="cursor-pointer flex items-center gap-2">
            {/* <span className="crescent" /> */}
            <span className="font-script text-2xl" style={{ color: '#C9A84C' }}>Suleman & Sofiya</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  smooth
                  duration={600}
                  offset={-70}
                  className="font-inter text-sm font-medium cursor-pointer transition-all duration-200 hover:opacity-100"
                  style={{
                    color: darkMode ? 'rgba(232,224,208,0.75)' : 'rgba(26,26,26,0.7)',
                  }}
                  activeClass="!opacity-100"
                  spy
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Dark Mode + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              id="dark-mode-toggle"
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={17} /> : <FiMoon size={17} />}
            </button>
            <button
              id="mobile-menu-toggle"
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-14 left-4 right-4 z-40 rounded-2xl overflow-hidden"
            style={{
              background: darkMode ? 'rgba(15,26,20,0.97)' : 'rgba(250,247,240,0.97)',
              border: '1px solid rgba(201,168,76,0.25)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <ul className="flex flex-col py-4">
              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={to}
                    smooth
                    duration={600}
                    offset={-70}
                    className="block px-6 py-3 font-playfair text-base cursor-pointer transition-colors"
                    style={{ color: '#C9A84C' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
