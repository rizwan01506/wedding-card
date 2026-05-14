import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Couple from './components/Couple';
import EventDetails from './components/EventDetails';
import VenueDetails from './components/VenueDetails';
import Timeline from './components/Timeline';
import AudioPlayer from './components/AudioPlayer';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import './index.css';

/* ─── Read ?guest= from URL ─── */
function getGuest() {
  try {
    return new URLSearchParams(window.location.search).get('name') || '';
  } catch {
    return '';
  }
}

/* ─── Floating "View Events" pill ─── */
function FloatingRSVP() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#events"
          initial={{ opacity: 0, y: 24, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="float-rsvp btn-gold hidden sm:inline-flex"
          style={{ fontSize: '0.72rem', letterSpacing: '0.12em', padding: '0.65rem 1.6rem' }}
        >
          ✦ View Events
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ─── Gold scroll progress bar ─── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

export default function App() {
  const [entered, setEntered] = useState(false); // false = show landing page
  const [darkMode, setDarkMode] = useState(false);
  const guestName = getGuest();

  /* Dark mode */
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  /* Lenis — desktop pointer only; mobile uses native scroll for smoother cards */
  useEffect(() => {
    if (!entered) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || coarsePointer) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [entered]);

  /* Lock scroll on landing page */
  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [entered]);

  return (
    <>
      {/* ── Landing gate ── */}
      <AnimatePresence>
        {!entered && (
          <LandingPage
            key="landing"
            guestName={guestName}
            onEnter={() => setEntered(true)}
          />
        )}
      </AnimatePresence>

      {/* ── Main wedding site ── */}
      <AnimatePresence>
        {entered && (
          <motion.div
            key="site"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScrollProgress />
            <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(v => !v)} />

            <motion.div
              className="site-shell min-h-screen transition-colors duration-500"
              data-theme={darkMode ? 'dark' : 'light'}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <main className="site-main">
                <Hero darkMode={darkMode} guestName={guestName} />
                <Couple darkMode={darkMode} />
                <EventDetails darkMode={darkMode} />
                <VenueDetails darkMode={darkMode} />
                <Timeline darkMode={darkMode} />
              </main>
              <Footer darkMode={darkMode} />
            </motion.div>

            <AudioPlayer />
            <FloatingRSVP />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
