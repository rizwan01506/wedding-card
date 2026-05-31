import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiSun, FiMoon, FiHome, FiUsers, FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';

const NAV_LINKS = [
  { to: 'home',     label: 'Home',     Icon: FiHome },
  { to: 'couple',   label: 'Couple',   Icon: FiUsers },
  { to: 'events',   label: 'Events',   Icon: FiCalendar },
  { to: 'venue',    label: 'Venue',    Icon: FiMapPin },
  { to: 'timeline', label: 'Timeline', Icon: FiClock },
];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('home');

  /* Show 1.5 s after site fades in, then stays permanently */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const pillBg   = darkMode ? 'rgba(6,14,10,0.96)'      : 'rgba(255,252,246,0.97)';
  const pillBdr  = darkMode ? 'rgba(201,168,76,0.26)'   : 'rgba(201,168,76,0.22)';
  const pillShad = darkMode
    ? '0 12px 56px rgba(0,0,0,0.7), 0 2px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.06)'
    : '0 12px 44px rgba(0,0,0,0.15), 0 2px 14px rgba(0,0,0,0.08), 0 0 0 1px rgba(201,168,76,0.07)';

  return (
    <AnimatePresence>
      {visible && (
        /*
          ── KEY FIX ──────────────────────────────────────────────
          The outer div handles ALL positioning with flexbox centering.
          The motion.nav NEVER gets position/left/transform CSS so
          Framer Motion's y/scale animations don't fight with
          translateX(-50%) anymore.
          ─────────────────────────────────────────────────────────
        */
        <div
          style={{
            position: 'fixed',
            bottom: 'max(1.1rem, env(safe-area-inset-bottom, 1.1rem))',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            zIndex: 900,
            pointerEvents: 'none',   /* clicks pass through the wrapper */
          }}
        >
          <motion.nav
            initial={{ opacity: 0, y: 50, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.86 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Main navigation"
            style={{
              pointerEvents: 'auto',   /* re-enable clicks on the pill */
              display: 'flex',
              alignItems: 'center',
              gap: '0.06rem',
              padding: '0.34rem 0.46rem',
              borderRadius: '999px',
              background: pillBg,
              border: `1px solid ${pillBdr}`,
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              boxShadow: pillShad,
              maxWidth: 'calc(100vw - 1.5rem)',
              whiteSpace: 'nowrap',
            }}
          >
            {/* ── Nav links ── */}
            {NAV_LINKS.map(({ to, label, Icon }) => {
              const isActive = active === to;
              const iconColor = isActive
                ? '#C9A84C'
                : darkMode ? 'rgba(232,224,208,0.36)' : 'rgba(26,26,26,0.38)';
              const labelColor = isActive
                ? '#C9A84C'
                : darkMode ? 'rgba(201,168,76,0.36)' : 'rgba(26,26,26,0.34)';

              return (
                <Link
                  key={to}
                  to={to}
                  smooth
                  duration={700}
                  offset={-10}
                  spy
                  onSetActive={() => setActive(to)}
                >
                  <motion.button
                    aria-label={label}
                    whileTap={{ scale: 0.85 }}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.14rem',
                      padding: '0.38rem 0.6rem',
                      borderRadius: '999px',
                      border: 'none',
                      cursor: 'pointer',
                      background: 'transparent',
                      minWidth: '2.4rem',
                    }}
                  >
                    {/* Animated active highlight */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        style={{
                          position: 'absolute', inset: 0, borderRadius: '999px',
                          background: darkMode
                            ? 'rgba(201,168,76,0.17)'
                            : 'rgba(201,168,76,0.13)',
                        }}
                        transition={{ type: 'spring', stiffness: 460, damping: 40 }}
                      />
                    )}

                    <span style={{
                      position: 'relative', zIndex: 1, display: 'flex',
                      color: iconColor,
                      filter: isActive ? 'drop-shadow(0 0 5px rgba(201,168,76,0.55))' : 'none',
                      transition: 'color 0.22s, filter 0.22s',
                    }}>
                      <Icon size={17} />
                    </span>

                    <span style={{
                      position: 'relative', zIndex: 1,
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.45rem',
                      letterSpacing: '0.03em',
                      textTransform: 'uppercase',
                      color: labelColor,
                      transition: 'color 0.22s',
                      lineHeight: 1,
                    }}>
                      {label}
                    </span>
                  </motion.button>
                </Link>
              );
            })}

            {/* Divider */}
            <div style={{
              width: '1px', height: '1.25rem', flexShrink: 0, margin: '0 0.1rem',
              background: darkMode ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.22)',
            }} />

            {/* Dark mode toggle */}
            <motion.button
              onClick={toggleDarkMode}
              whileTap={{ scale: 0.85 }}
              aria-label={darkMode ? 'Light mode' : 'Dark mode'}
              style={{
                width: '1.85rem', height: '1.85rem',
                borderRadius: '50%', flexShrink: 0,
                border: `1px solid ${darkMode ? 'rgba(201,168,76,0.24)' : 'rgba(201,168,76,0.2)'}`,
                background: darkMode ? 'rgba(201,168,76,0.09)' : 'rgba(201,168,76,0.07)',
                color: '#C9A84C', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.22s',
              }}
            >
              {darkMode ? <FiSun size={12} /> : <FiMoon size={12} />}
            </motion.button>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
