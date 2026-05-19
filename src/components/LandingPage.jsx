import { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Floating hearts — very subtle like the reference ── */
const HEARTS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: (i * 43.7 + 6) % 100,
  size: 8 + (i % 4) * 4,
  dur: 9 + (i % 6) * 2,
  del: (i * 1.1) % 10,
  dx: ((i % 7) - 3) * 20,
  opacity: 0.10 + (i % 3) * 0.05,   // very faint — matches reference
  color: i % 3 === 0 ? '#f9a8c4' : i % 3 === 1 ? '#fda4af' : '#fbcfe8',
}));

const BURST = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  angle: (i / 28) * Math.PI * 2,
  r: 80 + (i % 5) * 18,
  big: i % 4 === 0,
}));

const EASE = [0.16, 1, 0.3, 1];

/* ── Minimal heart SVG ── */
function HeartIcon({ size, color, opacity }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ opacity }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/* ── Floating hearts ambient ── */
function FloatingHearts() {
  return (
    <>
      {HEARTS.map((h) => (
        <motion.div
          key={h.id}
          style={{ position: 'absolute', left: `${h.x}%`, bottom: -20, pointerEvents: 'none' }}
          animate={{ y: [0, -900], x: [0, h.dx], rotate: [0, 12, -8, 15] }}
          transition={{ duration: h.dur, delay: h.del, repeat: Infinity, ease: 'easeOut' }}
        >
          <HeartIcon size={h.size} color={h.color} opacity={h.opacity} />
        </motion.div>
      ))}
    </>
  );
}

/* ── Pink envelope (exactly matching reference) ── */
function WeddingEnvelope({ onOpen, graphicId }) {
  const [phase, setPhase] = useState('idle');

  const open = () => {
    if (phase !== 'idle') return;
    setPhase('burst');
    window.setTimeout(() => setPhase('open'), 650);
    window.setTimeout(() => { setPhase('done'); onOpen(); }, 2100);
  };

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Glow halo */}
      <motion.div
        style={{
          position: 'absolute', inset: '10% 12% 18%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,168,196,0.28) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Envelope button */}
      <motion.button
        type="button" onClick={open} disabled={phase !== 'idle'}
        aria-label="Open wedding invitation envelope"
        style={{ position: 'relative', zIndex: 2, width: '100%', padding: 0, border: 'none', background: 'transparent', cursor: phase === 'idle' ? 'pointer' : 'default', outline: 'none' }}
        animate={phase === 'idle' ? { y: [0, -8, 0] } : phase === 'burst' ? { y: -14, scale: 1.03 } : {}}
        transition={phase === 'idle' ? { duration: 3.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.45, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 520 340" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 10px 28px rgba(244,114,182,0.28))' }}
        >
          <defs>
            {/* Envelope body — light blush matching reference */}
            <linearGradient id={`${graphicId}-envBg`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fce7f3" />
              <stop offset="55%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f9a8c4" />
            </linearGradient>
            {/* Flap — deeper pink */}
            <linearGradient id={`${graphicId}-flapTop`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            {/* Side flaps */}
            <linearGradient id={`${graphicId}-flapL`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#fbcfe8" />
            </linearGradient>
            <linearGradient id={`${graphicId}-flapR`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#fda4af" />
            </linearGradient>
            {/* Bottom flap */}
            <linearGradient id={`${graphicId}-flapBot`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f9a8c4" />
            </linearGradient>
            {/* Wax seal */}
            <radialGradient id={`${graphicId}-wax`} cx="50%" cy="35%">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="60%" stopColor="#be123c" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>
            <filter id={`${graphicId}-shadow`} x="-5%" y="-5%" width="112%" height="124%">
              <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="rgba(244,114,182,0.28)" />
            </filter>
          </defs>

          {/* Envelope body */}
          <rect x="2" y="38" width="516" height="296" rx="14" fill={`url(#${graphicId}-envBg)`} filter={`url(#${graphicId}-shadow)`} />
          <rect x="2" y="38" width="516" height="296" rx="14" stroke="rgba(244,114,182,0.35)" strokeWidth="1.5" fill="none" />

          {/* Side flaps */}
          <path d="M2 38 L260 200 L2 334 Z" fill={`url(#${graphicId}-flapL)`} />
          <path d="M518 38 L260 200 L518 334 Z" fill={`url(#${graphicId}-flapR)`} />

          {/* Bottom flap */}
          <path d="M2 334 L260 200 L518 334 Z" fill={`url(#${graphicId}-flapBot)`} stroke="rgba(244,114,182,0.25)" strokeWidth="0.8" />

          {/* Top flap (opens on click) */}
          <motion.path
            d="M2 38 L260 200 L518 38 Z"
            fill={`url(#${graphicId}-flapTop)`}
            stroke="rgba(244,114,182,0.45)" strokeWidth="1"
            style={{ transformOrigin: '260px 38px' }}
            animate={phase === 'open' || phase === 'done' ? { scaleY: -1 } : { scaleY: 1 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Wax seal */}
          <circle cx="260" cy="200" r="48" fill={`url(#${graphicId}-wax)`} />
          <circle cx="260" cy="200" r="43" fill="none" stroke="rgba(255,200,220,0.55)" strokeWidth="1.5" />
          <text x="260" y="194" textAnchor="middle" fontSize="10" fontFamily="'Great Vibes', cursive" fill="rgba(255,240,245,0.72)">Nikah</text>
          <text x="260" y="213" textAnchor="middle" fontSize="18" fontFamily="'Great Vibes', cursive" fill="rgba(255,240,245,0.96)" letterSpacing="3">S&amp;S</text>

          {/* "CLICK TO OPEN" label */}
          <text x="260" y="294" textAnchor="middle" fontSize="8" fontFamily="'DM Sans', sans-serif" fill="rgba(190,18,60,0.5)" letterSpacing="5">CLICK TO OPEN</text>
          <line x1="200" y1="301" x2="320" y2="301" stroke="rgba(244,114,182,0.2)" strokeWidth="0.6" />
        </svg>

        {/* Peek animation when opening */}
        <AnimatePresence>
          {(phase === 'open' || phase === 'done') && (
            <motion.div
              initial={{ y: 28, opacity: 0, scaleX: 0.9 }}
              animate={{ y: -50, opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              style={{
                position: 'absolute', left: '1.25rem', right: '1.25rem', bottom: '2rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '0.9rem 1rem', borderRadius: '0.9rem',
                background: 'linear-gradient(135deg, rgba(255,242,250,0.99), rgba(252,231,243,0.99))',
                border: '1px solid rgba(244,114,182,0.38)',
                boxShadow: '0 -8px 32px rgba(244,114,182,0.12)',
              }}
            >
              <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: '0.48rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(190,18,60,0.5)' }}>
                Opening your invitation
              </p>
              <p style={{ marginTop: '0.3rem', fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: '#be123c', margin: '0.3rem 0 0' }}>
                Md Suleman & Sofiya Fatima
              </p>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
                {[0, 1, 2].map((d) => (
                  <motion.span key={d}
                    style={{ width: '0.32rem', height: '0.32rem', borderRadius: '50%', background: '#f472b6', display: 'block' }}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 0.85, delay: d * 0.18, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Burst particles */}
      <AnimatePresence>
        {phase === 'burst' && BURST.map((p) => (
          <motion.span key={p.id}
            style={{
              position: 'absolute', left: '50%', top: '55%', zIndex: 3,
              width: p.big ? 8 : 4, height: p.big ? 8 : 4, borderRadius: '50%',
              background: p.id % 3 === 0 ? '#f472b6' : p.id % 3 === 1 ? '#fb7185' : '#fda4af',
              boxShadow: '0 0 6px rgba(244,114,182,0.7)', pointerEvents: 'none',
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(p.angle) * p.r, y: Math.sin(p.angle) * p.r, opacity: 0, scale: 0.1 }}
            transition={{ duration: 0.9 + (p.id % 4) * 0.14, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN LANDING PAGE
   Matches reference: near-white background,
   clean centred layout, subtle floating hearts
══════════════════════════════════════════ */
export default function LandingPage({ guestName, onEnter }) {
  const [ready, setReady] = useState(false);
  const graphicId = useId().replace(/:/g, '');

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 100);
    return () => window.clearTimeout(t);
  }, []);

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.85, ease: [0.7, 0, 0.3, 1] }}
      style={{
        /* ── Background exactly like reference: very pale blush-to-white ── */
        position: 'fixed', inset: 0, zIndex: 9999,
        overflowX: 'hidden', overflowY: 'auto', WebkitOverflowScrolling: 'touch',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        minHeight: '100dvh',
        background: 'radial-gradient(ellipse at 60% 30%, #fce7f3 0%, #fdf4f8 28%, #fff8fc 52%, #fdf4f8 75%, #fce7f3 100%)',
        paddingTop: 'max(2rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(1rem, env(safe-area-inset-left))',
        paddingRight: 'max(1rem, env(safe-area-inset-right))',
      }}
    >
      {/* Floating hearts — very subtle */}
      <FloatingHearts />

      {/* Very light central glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 35%, rgba(249,168,196,0.14) 0%, transparent 60%)' }} />

      {/* Thin decorative top/bottom lines */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, rgba(244,114,182,0.45) 20%, rgba(251,207,232,0.7) 50%, rgba(244,114,182,0.45) 80%, transparent)', opacity: 0.6 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, transparent, rgba(244,114,182,0.45) 20%, rgba(251,207,232,0.7) 50%, rgba(244,114,182,0.45) 80%, transparent)', opacity: 0.6 }} />

      {/* ── Content container ── */}
      <motion.div
        style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: '36rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: EASE }}
      >

        {/* ── Bismillah ── */}
        <motion.div {...reveal(0.05)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', marginBottom: '0.6rem' }}>
          {/* Crescent ornament */}
          <motion.div
            style={{ color: '#f9a8c4', fontSize: '0.9rem', letterSpacing: '0.65rem', opacity: 0.85 }}
            animate={{ opacity: [0.6, 0.95, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          >
            ☽ ✦ ☽
          </motion.div>

          <p style={{
            margin: 0,
            fontFamily: "'Amiri', serif",
            fontSize: 'clamp(1.25rem, 5.5vw, 1.85rem)',
            color: '#9d174d',
            textShadow: '0 2px 16px rgba(190,18,60,0.15)',
            lineHeight: 1.4,
            direction: 'rtl',
          }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </p>

          <div style={{ width: 'min(13rem, 58vw)', height: '1px', background: 'linear-gradient(to right, transparent, rgba(244,114,182,0.45), transparent)' }} />
        </motion.div>

        {/* ── "Welcome to Our Wedding" — matches reference heading exactly ── */}
        <motion.h1 {...reveal(0.13)} style={{
          margin: '0 0 0.5rem',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.8rem, 7.5vw, 2.8rem)',
          fontWeight: 700,
          color: '#111111',
          lineHeight: 1.1,
          letterSpacing: '-0.015em',
        }}>
          Welcome to Our Wedding
        </motion.h1>

        {/* ── Guest name or "Dear Guest" ── */}
        {guestName ? (
          /* ── NAMED GUEST: beautiful highlighted card ── */
          <motion.div
            {...reveal(0.21)}
            style={{
              marginBottom: '0.6rem',
              width: 'min(100%, 22rem)',
              position: 'relative',
              borderRadius: '1.15rem',
              /* frosted glass with pink tint */
              background: 'linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(252,231,243,0.72) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(244,114,182,0.32)',
              boxShadow: '0 8px 32px rgba(244,114,182,0.14), inset 0 1px 0 rgba(255,255,255,0.75)',
              padding: '0.9rem 1.4rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.18rem',
              overflow: 'hidden',
            }}
          >
            {/* Top pink accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: '15%', right: '15%', height: '2.5px',
              background: 'linear-gradient(to right, transparent, #f472b6, #fbcfe8, #f472b6, transparent)',
              borderRadius: '0 0 4px 4px',
            }} />

            {/* Corner hearts */}
            <span style={{ position: 'absolute', top: '0.55rem', left: '0.7rem', fontSize: '0.7rem', opacity: 0.4 }}>🤍</span>
            <span style={{ position: 'absolute', top: '0.55rem', right: '0.7rem', fontSize: '0.7rem', opacity: 0.4 }}>🤍</span>

            {/* Label */}
            <p style={{
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.55rem, 1.6vw, 0.63rem)',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(190,18,60,0.55)',
              fontWeight: 500,
            }}>
              A Special Invitation For
            </p>

            {/* Guest name — big, bold, script */}
            <motion.p
              animate={{ textShadow: ['0 0 12px rgba(190,18,60,0.15)', '0 0 24px rgba(190,18,60,0.3)', '0 0 12px rgba(190,18,60,0.15)'] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                margin: 0,
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(1.85rem, 8vw, 2.75rem)',
                lineHeight: 1.1,
                color: '#be123c',
                letterSpacing: '0.01em',
              }}
            >
              {guestName}
            </motion.p>

            {/* Thin divider */}
            <div style={{ width: '60%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(244,114,182,0.4), transparent)', margin: '0.1rem 0' }} />

            {/* Invitation line */}
            <p style={{
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.72rem, 2.2vw, 0.82rem)',
              color: '#6b4455',
              fontWeight: 400,
            }}>
              You are warmly invited to our wedding
            </p>
          </motion.div>
        ) : (
          /* No guest: simple "Dear Guest" exactly like reference */
          <motion.div {...reveal(0.21)} style={{ marginBottom: '0.55rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.05rem' }}>
            <p style={{
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
              color: '#555',
            }}>
              Dear{' '}
              <strong style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: '1.25em',
                color: '#e11d48',
              }}>
                Guest
              </strong>
            </p>
            <p style={{
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.78rem, 2.3vw, 0.9rem)',
              color: '#555',
            }}>
              You are invited to our wedding
            </p>
          </motion.div>
        )}

        {/* ── Envelope — centred, prominent, matching reference ── */}
        <motion.div {...reveal(0.28)} style={{ width: 'min(100%, 24rem)', marginTop: '0.2rem' }}>
          <WeddingEnvelope onOpen={onEnter} graphicId={graphicId} />
        </motion.div>

        {/* ── "Click the invitation to open" ── */}
        <motion.p
          {...reveal(0.42)}
          animate={ready ? { opacity: [0.52, 0.9, 0.52] } : {}}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            margin: '0.15rem 0 0',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(0.6rem, 1.8vw, 0.7rem)',
            color: '#9d174d',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            opacity: 0.72,
          }}
        >
          Click the invitation to open
        </motion.p>

        {/* ── Bouncing finger ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          style={{ fontSize: '1.55rem', marginTop: '0.2rem' }}
        >
          <motion.span
            animate={ready ? { y: [0, 6, 0] } : {}}
            transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'block' }}
          >
            👆
          </motion.span>
        </motion.div>

        {/* ── Date / venue pills ── */}
        <motion.div {...reveal(0.58)} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.4rem', marginTop: '0.65rem' }}>
          {['11 June 2026', 'Rampur Saghari, Muzaffarpur'].map((txt) => (
            <span key={txt} style={{
              padding: '0.3rem 0.85rem', borderRadius: '999px',
              border: '1px solid rgba(244,114,182,0.3)',
              background: 'rgba(249,168,196,0.1)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.56rem, 1.7vw, 0.66rem)',
              letterSpacing: '0.1em',
              color: '#9d174d',
              textTransform: 'uppercase',
            }}>
              {txt}
            </span>
          ))}
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
