import { useState, useEffect } from 'react';
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

function getGuest() {
  try {
    return new URLSearchParams(window.location.search).get('name') || '';
  } catch {
    return '';
  }
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const guestName = getGuest();

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

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
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [entered]);

  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [entered]);

  return (
    <>
      <AnimatePresence>
        {!entered && (
          <LandingPage
            key="landing"
            guestName={guestName}
            onEnter={() => setEntered(true)}
          />
        )}
      </AnimatePresence>

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
              <main className="site-main site-main-with-bottomnav">
                <Hero darkMode={darkMode} guestName={guestName} />
                <Couple darkMode={darkMode} />
                <EventDetails darkMode={darkMode} />
                <VenueDetails darkMode={darkMode} />
                <Timeline darkMode={darkMode} />
              </main>
              <Footer darkMode={darkMode} />
            </motion.div>

            <AudioPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
