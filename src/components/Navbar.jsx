import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiSun, FiMoon, FiHome, FiUsers, FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';

const NAV_LINKS = [
  { to: 'home',     label: 'Home',     icon: <FiHome size={18} /> },
  { to: 'couple',   label: 'Couple',   icon: <FiUsers size={18} /> },
  { to: 'events',   label: 'Events',   icon: <FiCalendar size={18} /> },
  { to: 'venue',    label: 'Venue',    icon: <FiMapPin size={18} /> },
  { to: 'timeline', label: 'Timeline', icon: <FiClock size={18} /> },
];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setVisible(y > window.innerHeight * 0.4);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="bottom-nav"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Bottom navigation"
        >
          <div className="bottom-nav__inner">

            {/* Nav links */}
            {NAV_LINKS.map(({ to, label, icon }, idx) => (
              <Link
                key={to}
                to={to}
                smooth
                duration={650}
                offset={-10}
                spy
                onSetActive={() => setActiveSection(to)}
              >
                <button
                  className={`bottom-nav__link${activeSection === to ? ' bottom-nav__link--active' : ''}`}
                  aria-label={label}
                >
                  <span
                    className="bottom-nav__icon"
                    style={{ color: activeSection === to ? 'var(--gold)' : darkMode ? 'rgba(232,224,208,0.45)' : 'rgba(26,26,26,0.42)' }}
                  >
                    {icon}
                  </span>
                  <span className="bottom-nav__label">{label}</span>
                </button>
              </Link>
            ))}

            {/* Separator */}
            <span className="bottom-nav__sep" />

            {/* Dark mode toggle */}
            <button
              id="dark-mode-toggle"
              onClick={toggleDarkMode}
              className="bottom-nav__mode-btn"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun size={15} /> : <FiMoon size={15} />}
            </button>

          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
