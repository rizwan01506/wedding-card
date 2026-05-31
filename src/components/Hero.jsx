import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import CountdownTimer from './CountdownTimer';
import heroBg from '../assets/hero-bg-new.png';

const WEDDING_DATE = '2026-06-11T13:00:00';

const FLOAT_ORBS = [
  { w: 340, h: 340, top: '5%',  left: '-8%',  color: 'rgba(201,168,76,0.12)',  dur: 8 },
  { w: 280, h: 280, top: '55%', right: '-6%', color: 'rgba(27,107,71,0.14)',  dur: 10 },
  { w: 220, h: 220, top: '30%', left: '55%',  color: 'rgba(201,168,76,0.07)',  dur: 13 },
  { w: 180, h: 180, top: '70%', left: '12%',  color: 'rgba(27,107,71,0.09)',  dur: 15 },
];

/* Inside the glass card text doesn't need heavy external shadow */
const shadow = '0 1px 4px rgba(0,0,0,0.45)';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
  };
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (i * 41 + 5) % 100,
  size: 2 + (i % 3) * 1.4,
  dur: 6 + (i % 4) * 2,
  delay: (i * 0.7) % 8,
  dx: ((i % 6) - 3) * 25,
}));

export default function Hero({ guestName }) {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ height: '100dvh', minHeight: '100svh' }}
    >
      {/* Background image — slightly brighter so it shows through the card */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
          filter: 'brightness(0.65) saturate(1.2) contrast(1.05)',
          transform: 'scale(1.06)',
        }}
      />

      {/* Lighter cinematic overlay so bg image breathes through the glass card */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(170deg, rgba(2,6,4,0.82) 0%, rgba(4,12,7,0.58) 35%, rgba(6,18,10,0.52) 60%, rgba(2,6,4,0.82) 100%)',
      }} />

      {/* Islamic pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-[0.05]" />

      {/* Ambient orbs */}
      {FLOAT_ORBS.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ width: o.w, height: o.h, top: o.top, left: o.left, right: o.right,
            background: `radial-gradient(circle, ${o.color}, transparent 70%)` }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 1.8 }}
        />
      ))}

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`, bottom: -10,
            width: p.size, height: p.size,
            background: 'radial-gradient(circle, #F5D978, #C9A84C)',
            boxShadow: '0 0 8px rgba(201,168,76,0.5)',
          }}
          animate={{ y: [0, -800], x: [0, p.dx], opacity: [0, 0.7, 0], scale: [1, 0.5, 0.1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(to right, transparent, #C9A84C 25%, #E8C97E 50%, #C9A84C 75%, transparent)' }} />

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(to right, transparent, #C9A84C 25%, #E8C97E 50%, #C9A84C 75%, transparent)', opacity: 0.5 }} />

      {/* Corner ornaments */}
      {[
        { top: 14, left: 14,  borderTop: '1.5px solid rgba(201,168,76,0.65)', borderLeft:   '1.5px solid rgba(201,168,76,0.65)' },
        { top: 14, right: 14, borderTop: '1.5px solid rgba(201,168,76,0.65)', borderRight:  '1.5px solid rgba(201,168,76,0.65)' },
        { bottom: 14, left: 14,  borderBottom: '1.5px solid rgba(201,168,76,0.65)', borderLeft:  '1.5px solid rgba(201,168,76,0.65)' },
        { bottom: 14, right: 14, borderBottom: '1.5px solid rgba(201,168,76,0.65)', borderRight: '1.5px solid rgba(201,168,76,0.65)' },
      ].map((s, i) => (
        <div key={i} className="absolute w-10 h-10 pointer-events-none" style={s} />
      ))}

      {/* ─── GLASS CONTENT CARD ─── */}
      <div className="relative z-10 flex flex-col items-center text-center px-3 sm:px-5 max-w-xl lg:max-w-2xl mx-auto w-full">
        <div className="hero-content-wrapper w-full">

          {/* Guest ribbon */}
          {guestName && (
            <motion.p {...fadeUp(0.08)} className="hero-guest-ribbon">
              Welcome, <span>{guestName}</span>
            </motion.p>
          )}

          {/* Bismillah */}
          <motion.p
            {...fadeUp(0.15)}
            className="font-amiri mb-1"
            style={{
              fontSize: 'clamp(1rem, 3.8vw, 1.45rem)',
              color: '#F5E090',
              textShadow: '0 0 24px rgba(232,201,126,0.55)',
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="flex items-center gap-2 mb-1 w-48 mx-auto"
          >
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.7))' }} />
            <motion.span
              style={{ color: '#C9A84C', fontSize: 13 }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
            >✦</motion.span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.7))' }} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.32)}
            className="font-inter uppercase mb-1.5"
            style={{
              fontSize: 'clamp(0.5rem, 1.6vw, 0.66rem)',
              letterSpacing: '0.3em',
              color: 'rgba(201,168,76,0.85)',
            }}
          >
            Together with their families
          </motion.p>

          {/* Groom name */}
          <motion.h1
            {...fadeUp(0.42)}
            className="font-script leading-none mb-0"
            style={{
              fontSize: 'clamp(2rem, 7.5vw, 4.5rem)',
              color: '#FAE8A0',
              textShadow: '0 2px 24px rgba(201,168,76,0.5)',
            }}
          >
            Md Suleman
          </motion.h1>

          {/* Father of groom */}
          <motion.p
            {...fadeUp(0.5)}
            className="font-inter mb-1 sm:mb-1.5"
            style={{
              fontSize: 'clamp(0.6rem, 1.8vw, 0.78rem)',
              color: 'rgba(255,255,255,0.82)',
              letterSpacing: '0.06em',
              textShadow: shadow,
            }}
          >
            Son of <strong style={{ color: '#E8C97E' }}>Md. Wahidur Rahman</strong>
          </motion.p>

          {/* Heart */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.55, type: 'spring', stiffness: 240 }}
            className="mb-0.5 sm:mb-1"
            style={{ fontSize: 'clamp(1.1rem, 4vw, 1.9rem)', color: '#C9A84C' }}
          >
            <motion.span
              animate={{ scale: [1, 1.22, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ textShadow: '0 0 18px rgba(201,168,76,0.65), 0 0 36px rgba(201,168,76,0.3)' }}
            >♥</motion.span>
          </motion.div>

          {/* Bride name */}
          <motion.h1
            {...fadeUp(0.72)}
            className="font-script leading-none mb-0"
            style={{
              fontSize: 'clamp(2rem, 7.5vw, 4.5rem)',
              color: '#FAE8A0',
              textShadow: '0 2px 24px rgba(201,168,76,0.5)',
            }}
          >
            Sofiya Fatma
          </motion.h1>

          {/* Father of bride */}
          <motion.p
            {...fadeUp(0.8)}
            className="font-inter mb-2 sm:mb-3"
            style={{
              fontSize: 'clamp(0.6rem, 1.8vw, 0.78rem)',
              color: 'rgba(255,255,255,0.82)',
              letterSpacing: '0.06em',
              textShadow: shadow,
            }}
          >
            Daughter of <strong style={{ color: '#E8C97E' }}>Jb. Md. Ashraf Sb.</strong>
          </motion.p>

          {/* Date badge */}
          <motion.div
            {...fadeUp(0.9)}
            className="mb-2 sm:mb-2.5 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full flex flex-wrap items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08))',
              border: '1px solid rgba(201,168,76,0.55)',
              boxShadow: '0 0 24px rgba(201,168,76,0.15), inset 0 1px 0 rgba(201,168,76,0.18)',
            }}
          >
            <span className="font-playfair italic" style={{ fontSize: 'clamp(0.68rem, 2.2vw, 0.85rem)', color: 'rgba(255,255,255,0.95)' }}>
              Nikah &amp; Walima Invitation
            </span>
            <span style={{ color: '#C9A84C', fontSize: 9 }}>✦</span>
            <span className="font-amiri" style={{ fontSize: 'clamp(0.85rem, 2.8vw, 1rem)', color: '#F5D978', textShadow: '0 0 12px rgba(232,201,126,0.45)' }}>
              11 – 12 June 2026
            </span>
          </motion.div>

          {/* Countdown */}
          <motion.div {...fadeUp(1.0)} className="mb-2 sm:mb-2.5 w-full">
            <p className="font-inter uppercase mb-1.5"
              style={{ fontSize: 'clamp(0.48rem, 1.4vw, 0.6rem)', letterSpacing: '0.22em', color: 'rgba(201,168,76,0.85)' }}>
              Counting down to the big day
            </p>
            <CountdownTimer targetDate={WEDDING_DATE} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-2"
          >
            <Link to="events" smooth duration={700} offset={-70}>
              <button className="btn-gold" style={{ fontSize: 'clamp(0.62rem, 1.8vw, 0.72rem)', padding: '0.48rem 1.35rem' }}>
                ✦ View Events
              </button>
            </Link>
            <Link to="couple" smooth duration={700} offset={-70}>
              <button className="btn-outline-gold" style={{ fontSize: 'clamp(0.62rem, 1.8vw, 0.72rem)', padding: '0.44rem 1.15rem', color: '#F0D98A', borderColor: 'rgba(232,201,126,0.5)' }}>
                Meet the Couple
              </button>
            </Link>
          </motion.div>

          {/* Venue */}
          <motion.p
            {...fadeUp(1.4)}
            className="font-inter"
            style={{
              fontSize: 'clamp(0.52rem, 1.6vw, 0.66rem)',
              color: 'rgba(201,168,76,0.82)',
              letterSpacing: '0.1em',
            }}
          >
            📍 Rampur Saghari · Aurai · Muzaffarpur, Bihar
          </motion.p>

        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.7 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1"
      >
        <span className="font-inter uppercase"
          style={{ fontSize: '0.48rem', letterSpacing: '0.25em', color: 'rgba(201,168,76,0.75)' }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-6"
          style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)' }}
          animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
