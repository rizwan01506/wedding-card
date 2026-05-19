import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import CountdownTimer from './CountdownTimer';
import heroBg from '../assets/hero-bg.jpg';

const WEDDING_DATE = '2026-06-11T13:00:00';

const FLOAT_ORBS = [
  { w: 300, h: 300, top: '5%',  left: '-5%',  color: 'rgba(27,107,71,0.13)',  dur: 7 },
  { w: 240, h: 240, top: '55%', right: '-4%', color: 'rgba(201,168,76,0.09)', dur: 9 },
  { w: 180, h: 180, top: '25%', left: '52%',  color: 'rgba(27,107,71,0.07)',  dur: 11 },
];

const labelShadow = '0 1px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)';

/* ─── Directional reveal helper ───
   dir: 'left' | 'right' | 'up' | 'down'
*/
function slideIn(dir = 'up', delay = 0, distance = 36) {
  const axis = dir === 'left' || dir === 'right' ? 'x' : 'y';
  const sign = dir === 'right' || dir === 'down' ? distance : -distance;
  return {
    initial: { opacity: 0, [axis]: sign },
    animate: { opacity: 1, [axis]: 0 },
    transition: {
      duration: 0.85,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  };
}

export default function Hero({ guestName }) {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ height: '100dvh', minHeight: '100svh' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
          filter: 'brightness(0.65) saturate(1.2) contrast(1.08)',
          transform: 'scale(1.04)',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(170deg, rgba(4,10,6,0.88) 0%, rgba(6,18,10,0.75) 40%, rgba(6,18,10,0.72) 65%, rgba(4,10,6,0.92) 100%)',
      }} />

      {/* Islamic pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-[0.08]" />

      {/* Ambient orbs */}
      {FLOAT_ORBS.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ width: o.w, height: o.h, top: o.top, left: o.left, right: o.right,
            background: `radial-gradient(circle, ${o.color}, transparent 70%)` }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        />
      ))}

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(to right, transparent, #C9A84C 35%, #E8C97E 50%, #C9A84C 65%, transparent)' }} />

      {/* Corner ornaments */}
      {[
        { top: 14, left: 14,  borderTop: '1.5px solid rgba(201,168,76,0.7)', borderLeft:   '1.5px solid rgba(201,168,76,0.7)', borderRadius: '4px 0 0 0' },
        { top: 14, right: 14, borderTop: '1.5px solid rgba(201,168,76,0.7)', borderRight:  '1.5px solid rgba(201,168,76,0.7)', borderRadius: '0 4px 0 0' },
        { bottom: 14, left: 14,  borderBottom: '1.5px solid rgba(201,168,76,0.7)', borderLeft:  '1.5px solid rgba(201,168,76,0.7)', borderRadius: '0 0 0 4px' },
        { bottom: 14, right: 14, borderBottom: '1.5px solid rgba(201,168,76,0.7)', borderRight: '1.5px solid rgba(201,168,76,0.7)', borderRadius: '0 0 4px 0' },
      ].map((s, i) => (
        <div key={i} className="absolute w-10 h-10 pointer-events-none" style={s} />
      ))}

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 max-w-3xl mx-auto w-full">

        {/*
          Mobile:  wrapped in glass-card style card
          Desktop: no card, transparent background, content floats freely
          Using hero-content-card class controlled via CSS
        */}
        <div className="hero-content-wrapper w-full">

          {/* ── Guest ribbon — slides from top ── */}
          {guestName && (
            <motion.p
              {...slideIn('down', 0.1)}
              className="hero-guest-ribbon"
            >
              Welcome, <span>{guestName}</span>
            </motion.p>
          )}

          {/* ── Bismillah — slides from LEFT ── */}
          <motion.p
            {...slideIn('left', 0.18)}
            className="font-amiri mb-1.5"
            style={{
              fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
              color: '#F0D98A',
              textShadow: '0 0 20px rgba(232,201,126,0.5), ' + labelShadow,
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </motion.p>

          {/* ── Divider — fades in ── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-2 mb-1.5 w-48"
          >
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
            <span style={{ color: '#C9A84C', fontSize: 11 }}>✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
          </motion.div>

          {/* ── Tagline — slides from RIGHT ── */}
          <motion.p
            {...slideIn('right', 0.35)}
            className="font-inter uppercase mb-2"
            style={{
              fontSize: 'clamp(0.55rem, 1.8vw, 0.7rem)',
              letterSpacing: '0.28em',
              color: '#C9A84C',
              textShadow: labelShadow,
            }}
          >
            Together with their families
          </motion.p>

          {/* ── Groom name — slides from LEFT ── */}
          <motion.h1
            {...slideIn('left', 0.48)}
            className="font-script leading-none mb-0.5"
            style={{
              fontSize: 'clamp(2.2rem, 7.5vw, 4.5rem)',
              color: '#F0D98A',
              textShadow: '0 3px 24px rgba(201,168,76,0.4), 0 1px 10px rgba(0,0,0,0.8)',
            }}
          >
            Md Suleman
          </motion.h1>

          {/* ── Father of groom — slides from RIGHT ── */}
          <motion.p
            {...slideIn('right', 0.57)}
            className="font-inter mb-2"
            style={{
              fontSize: 'clamp(0.65rem, 2vw, 0.8rem)',
              color: '#ffffff',
              letterSpacing: '0.08em',
              textShadow: labelShadow,
            }}
          >
            Son of <strong style={{ color: '#E8C97E' }}>Vahidul Rahman</strong>
          </motion.p>

          {/* ── Heart — scales in ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.68, duration: 0.6, type: 'spring', stiffness: 220 }}
            className="mb-2"
            style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', color: '#C9A84C', textShadow: '0 0 16px rgba(201,168,76,0.6)' }}
          >♥</motion.div>

          {/* ── Bride name — slides from RIGHT ── */}
          <motion.h1
            {...slideIn('right', 0.8)}
            className="font-script leading-none mb-0.5"
            style={{
              fontSize: 'clamp(2.2rem, 7.5vw, 4.5rem)',
              color: '#F0D98A',
              textShadow: '0 3px 24px rgba(201,168,76,0.4), 0 1px 10px rgba(0,0,0,0.8)',
            }}
          >
            Sofiya Fatima
          </motion.h1>

          {/* ── Father of bride — slides from LEFT ── */}
          <motion.p
            {...slideIn('left', 0.9)}
            className="font-inter mb-3"
            style={{
              fontSize: 'clamp(0.65rem, 2vw, 0.8rem)',
              color: '#ffffff',
              letterSpacing: '0.08em',
              textShadow: labelShadow,
            }}
          >
            Daughter of <strong style={{ color: '#E8C97E' }}>Md Ashraf</strong>
          </motion.p>

          {/* ── Date badge — slides from RIGHT ── */}
          <motion.div
            {...slideIn('right', 1.02)}
            className="mb-3 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full flex flex-wrap items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.09))',
              border: '1px solid rgba(201,168,76,0.55)',
              boxShadow: '0 0 24px rgba(201,168,76,0.15), inset 0 1px 0 rgba(201,168,76,0.18)',
            }}
          >
            <span className="font-playfair italic" style={{ fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)', color: 'rgba(255,255,255,0.95)', textShadow: labelShadow }}>
              Nikah Invitation
            </span>
            <span style={{ color: '#C9A84C', fontSize: 9 }}>✦</span>
            <span className="font-amiri" style={{ fontSize: 'clamp(0.85rem, 3vw, 1rem)', color: '#F0D98A', textShadow: '0 0 12px rgba(232,201,126,0.4)' }}>
              11 June 2026
            </span>
          </motion.div>

          {/* ── Countdown — slides from bottom ── */}
          <motion.div
            {...slideIn('up', 1.14)}
            className="mb-3 w-full"
          >
            <p className="font-inter uppercase mb-1.5"
              style={{ fontSize: 'clamp(0.5rem, 1.5vw, 0.65rem)', letterSpacing: '0.22em', color: '#C9A84C', textShadow: labelShadow }}>
              Counting down to the big day
            </p>
            <CountdownTimer targetDate={WEDDING_DATE} />
          </motion.div>

          {/* ── CTA Buttons — slide from left & right ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-2"
          >
            <Link to="events" smooth duration={700} offset={-70}>
              <button id="hero-events-btn" className="btn-gold"
                style={{ fontSize: 'clamp(0.65rem, 2vw, 0.75rem)', padding: '0.5rem 1.4rem' }}>
                View Events
              </button>
            </Link>
            <Link to="couple" smooth duration={700} offset={-70}>
              <button id="hero-couple-btn" className="btn-outline-gold"
                style={{ fontSize: 'clamp(0.65rem, 2vw, 0.75rem)', padding: '0.45rem 1.2rem',
                  color: '#F0D98A', borderColor: 'rgba(232,201,126,0.55)' }}>
                Meet the Couple
              </button>
            </Link>
          </motion.div>

          {/* ── Venue — slides from RIGHT ── */}
          <motion.p
            {...slideIn('right', 1.55)}
            className="font-inter"
            style={{
              fontSize: 'clamp(0.55rem, 1.8vw, 0.68rem)',
              color: '#C9A84C',
              letterSpacing: '0.1em',
              textShadow: labelShadow,
            }}
          >
            Karimi Family Masjid · Noor Manzil, Saghari · Muzaffarpur, Bihar
          </motion.p>

        </div>{/* end hero-content-wrapper */}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.75, duration: 0.7 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-inter uppercase"
          style={{ fontSize: '0.5rem', letterSpacing: '0.25em', color: '#C9A84C', textShadow: labelShadow }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-6"
          style={{ background: 'linear-gradient(to bottom, #C9A84C, transparent)' }}
          animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
