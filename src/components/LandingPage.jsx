import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/* Stars */
const STARS = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  x: (i * 43.7 + 11) % 100,
  y: (i * 53.7 + 7)  % 100,
  size: (i % 4) * 0.5 + 0.5,
  dur:  (i % 5) * 0.7 + 2.5,
  del:  (i * 0.27) % 4.5,
  gold: i % 6 === 0,
}));

/* Rising particles */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x:    (i * 37.3 + 8) % 100,
  size: 1.2 + (i % 4) * 0.8,
  dur:  9 + (i % 5) * 2.4,
  del:  (i * 0.82) % 10,
  dx:   ((i % 7) - 3) * 18,
  op:   0.16 + (i % 4) * 0.09,
}));

/* Burst particles when envelope is clicked */
const BURST = Array.from({ length: 30 }, (_, i) => ({
  id:    i,
  angle: (i / 30) * Math.PI * 2,
  r:     65 + (i % 5) * 22,
  big:   i % 4 === 0,
  color: i % 3 === 0 ? '#F0D98A' : i % 3 === 1 ? '#C9A84C' : '#1B6B47',
}));

/* ══════════════════════════════════════════════
   PREMIUM ISLAMIC ENVELOPE
══════════════════════════════════════════════ */
function WeddingEnvelope({ onOpen }) {
  const [phase, setPhase] = useState('idle');

  const handleClick = () => {
    if (phase !== 'idle') return;
    setPhase('burst');
    setTimeout(() => setPhase('open'),  580);
    setTimeout(() => { setPhase('done'); onOpen(); }, 2100);
  };

  const isOpen = phase === 'open' || phase === 'done';

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

      {/* Glow halo */}
      <motion.div
        style={{
          position: 'absolute', left: '8%', right: '8%', top: '6%', bottom: '18%',
          borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(201,168,76,0.22) 0%, rgba(27,107,71,0.1) 50%, transparent 75%)',
        }}
        animate={{ scale: [0.94, 1.07, 0.94], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Idle pulse rings */}
      <AnimatePresence>
        {phase === 'idle' && [0, 1].map(d => (
          <motion.div key={d} style={{
            position: 'absolute', left: '50%', top: '52%',
            width: 'min(72%, 17rem)', aspectRatio: '1',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%', pointerEvents: 'none',
            border: '1px solid rgba(201,168,76,0.3)',
          }}
            initial={{ scale: 0.85, opacity: 0.65 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 3, delay: d * 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Envelope button */}
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={phase !== 'idle'}
        aria-label="Open wedding invitation"
        style={{ position: 'relative', zIndex: 2, width: '100%', padding: 0, border: 'none', background: 'transparent', cursor: phase === 'idle' ? 'pointer' : 'default', outline: 'none' }}
        animate={phase === 'idle' ? { y: [0, -10, 0] } : phase === 'burst' ? { y: -16, scale: 1.05 } : {}}
        transition={phase === 'idle' ? { duration: 4.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4, ease: 'easeOut' }}
        whileHover={phase === 'idle' ? { scale: 1.03 } : {}}
      >
        <svg viewBox="0 0 520 370" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 18px 44px rgba(0,0,0,0.65))' }}
        >
          <defs>
            <linearGradient id="lp-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#132517" />
              <stop offset="55%"  stopColor="#0E1E12" />
              <stop offset="100%" stopColor="#09150D" />
            </linearGradient>
            <linearGradient id="lp-flap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#207A50" />
              <stop offset="65%"  stopColor="#155C38" />
              <stop offset="100%" stopColor="#0D3D26" />
            </linearGradient>
            <linearGradient id="lp-sL" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#0B1B11" />
              <stop offset="100%" stopColor="#112214" />
            </linearGradient>
            <linearGradient id="lp-sR" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#112214" />
              <stop offset="100%" stopColor="#0B1B11" />
            </linearGradient>
            <linearGradient id="lp-bot" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#112214" />
              <stop offset="100%" stopColor="#09150D" />
            </linearGradient>
            <radialGradient id="lp-wax" cx="42%" cy="32%">
              <stop offset="0%"   stopColor="#F8E080" />
              <stop offset="35%"  stopColor="#DEAA3E" />
              <stop offset="72%"  stopColor="#B8861E" />
              <stop offset="100%" stopColor="#7A5518" />
            </radialGradient>
            <pattern id="lp-geo" patternUnits="userSpaceOnUse" width="22" height="22">
              <path d="M11 0 L22 11 L11 22 L0 11 Z" fill="none" stroke="rgba(201,168,76,0.13)" strokeWidth="0.4" />
              <circle cx="11" cy="11" r="1.8" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="0.3" />
            </pattern>
            <filter id="lp-shadow" x="-8%" y="-8%" width="118%" height="132%">
              <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="rgba(0,0,0,0.55)" />
            </filter>
            <filter id="lp-sealGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="b" />
              <feFlood floodColor="#C9A84C" floodOpacity="0.38" result="c" />
              <feComposite in="c" in2="b" operator="in" result="g" />
              <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Body */}
          <rect x="2" y="42" width="516" height="320" rx="16" fill="url(#lp-body)" filter="url(#lp-shadow)" />
          <rect x="2" y="42" width="516" height="320" rx="16" fill="url(#lp-geo)" opacity="0.8" />
          <rect x="2" y="42" width="516" height="320" rx="16" fill="none" stroke="rgba(201,168,76,0.55)" strokeWidth="1.5" />
          <rect x="13" y="53" width="494" height="298" rx="9" fill="none" stroke="rgba(201,168,76,0.18)" strokeWidth="0.7" />

          {/* Gold corner L-brackets */}
          <path d="M24 60 L38 60 M24 60 L24 74"   stroke="rgba(201,168,76,0.6)" strokeWidth="1.3" />
          <path d="M496 60 L482 60 M496 60 L496 74" stroke="rgba(201,168,76,0.6)" strokeWidth="1.3" />
          <path d="M24 352 L38 352 M24 352 L24 338" stroke="rgba(201,168,76,0.6)" strokeWidth="1.3" />
          <path d="M496 352 L482 352 M496 352 L496 338" stroke="rgba(201,168,76,0.6)" strokeWidth="1.3" />

          {/* Side flaps */}
          <path d="M2 42 L260 213 L2 362 Z"   fill="url(#lp-sL)" />
          <path d="M518 42 L260 213 L518 362 Z" fill="url(#lp-sR)" />

          {/* Bottom flap */}
          <path d="M2 362 L260 213 L518 362 Z" fill="url(#lp-bot)" stroke="rgba(201,168,76,0.26)" strokeWidth="0.8" />
          <line x1="22" y1="213" x2="498" y2="213" stroke="rgba(201,168,76,0.1)" strokeWidth="0.5" />

          {/* Top flap — animated */}
          <motion.path d="M2 42 L260 213 L518 42 Z"
            fill="url(#lp-flap)" stroke="rgba(201,168,76,0.52)" strokeWidth="1.3"
            style={{ transformOrigin: '260px 42px' }}
            animate={isOpen ? { scaleY: -1 } : { scaleY: 1 }}
            transition={{ duration: 1.1, ease: [0.42, 0, 0.2, 1] }}
          />
          <motion.path d="M2 42 L260 213 L518 42 Z"
            fill="url(#lp-geo)" opacity="0.65"
            style={{ transformOrigin: '260px 42px' }}
            animate={isOpen ? { scaleY: -1 } : { scaleY: 1 }}
            transition={{ duration: 1.1, ease: [0.42, 0, 0.2, 1] }}
          />

          {/* Flap ornaments */}
          <motion.g style={{ transformOrigin: '260px 42px' }}
            animate={isOpen ? { scaleY: -1 } : { scaleY: 1 }}
            transition={{ duration: 1.1, ease: [0.42, 0, 0.2, 1] }}>
            <line x1="150" y1="114" x2="370" y2="114" stroke="rgba(201,168,76,0.24)" strokeWidth="0.6" />
            <line x1="190" y1="134" x2="330" y2="134" stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" />
            <path d="M260 63 L268 76 L260 89 L252 76 Z" fill="rgba(201,168,76,0.28)" stroke="rgba(201,168,76,0.65)" strokeWidth="0.9" />
            <circle cx="260" cy="76" r="2.4" fill="rgba(201,168,76,0.75)" />
            <text x="210" y="98" textAnchor="middle" fontSize="9" fill="rgba(201,168,76,0.4)">✦</text>
            <text x="310" y="98" textAnchor="middle" fontSize="9" fill="rgba(201,168,76,0.4)">✦</text>
          </motion.g>

          {/* Wax seal */}
          <circle cx="260" cy="213" r="72" fill="rgba(201,168,76,0.04)" />
          <circle cx="260" cy="213" r="64" fill="rgba(201,168,76,0.08)" />
          <circle cx="260" cy="213" r="57" fill="url(#lp-wax)" filter="url(#lp-sealGlow)" />
          <circle cx="260" cy="213" r="52" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" />
          <circle cx="260" cy="213" r="46" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.8" strokeDasharray="3.5 2.5" />
          <circle cx="260" cy="213" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          {/* Crescent */}
          <circle cx="254" cy="209" r="16.5" fill="rgba(0,0,0,0.22)" />
          <circle cx="261" cy="209" r="14.5"  fill="url(#lp-wax)" />
          {/* Star */}
          <text x="278" y="203" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.74)">✦</text>
          {/* Labels */}
          <text x="260" y="203" textAnchor="middle" fontSize="6.5" fontFamily="'DM Sans',sans-serif" fill="rgba(255,255,255,0.54)" letterSpacing="4.5">NIKAH</text>
          <text x="260" y="231" textAnchor="middle" fontSize="21" fontFamily="'Great Vibes',cursive" fill="rgba(255,255,255,0.94)" letterSpacing="2">S &amp; S</text>
          {/* Click hint */}
          <text x="260" y="318" textAnchor="middle" fontSize="7" fontFamily="'DM Sans',sans-serif" fill="rgba(201,168,76,0.4)" letterSpacing="5.5">CLICK  TO  OPEN</text>
          <line x1="196" y1="324" x2="324" y2="324" stroke="rgba(201,168,76,0.16)" strokeWidth="0.5" />
        </svg>

        {/* Card peek */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 28, opacity: 0, scaleX: 0.88 }}
              animate={{ y: -58, opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, delay: 0.3, ease: EASE }}
              style={{
                position: 'absolute', left: '1rem', right: '1rem', bottom: '1.75rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.28rem',
                padding: '0.8rem 1rem', borderRadius: '0.9rem',
                background: 'linear-gradient(135deg, rgba(9,26,17,0.99), rgba(4,11,7,0.99))',
                border: '1px solid rgba(201,168,76,0.48)',
                boxShadow: '0 -12px 40px rgba(0,0,0,0.5)',
              }}
            >
              <p style={{ margin: 0, fontFamily: "'DM Sans',sans-serif", fontSize: '0.48rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.58)' }}>
                Opening your invitation
              </p>
              <p style={{ margin: 0, fontFamily: "'Great Vibes',cursive", fontSize: 'clamp(1.05rem, 3vw, 1.5rem)', color: '#E8C97E' }}>
                Md Suleman &amp; Sofiya Fatima
              </p>
              <div style={{ display: 'flex', gap: '0.36rem' }}>
                {[0,1,2].map(d => (
                  <motion.span key={d}
                    style={{ width: '0.28rem', height: '0.28rem', borderRadius: '50%', background: '#C9A84C', display: 'block' }}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.25, 0.8] }}
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
        {phase === 'burst' && BURST.map(p => (
          <motion.span key={p.id}
            style={{
              position: 'absolute', left: '50%', top: '52%', zIndex: 3,
              width: p.big ? 9 : 4, height: p.big ? 9 : 4,
              borderRadius: '50%', background: p.color,
              boxShadow: `0 0 8px ${p.color}88`, pointerEvents: 'none',
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(p.angle) * p.r, y: Math.sin(p.angle) * p.r, opacity: 0, scale: 0.1 }}
            transition={{ duration: 0.95 + (p.id % 4) * 0.12, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════
   LANDING PAGE
══════════════════════════════════════════════ */
export default function LandingPage({ guestName, onEnter }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  const appear = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.72, delay, ease: EASE },
  });

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.07 }}
      transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        overflowX: 'hidden', overflowY: 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100dvh',
        background: 'linear-gradient(158deg, #020807 0%, #06130f 28%, #0b1e15 58%, #040b08 100%)',
        padding: 'max(1.25rem, env(safe-area-inset-top)) max(0.9rem, env(safe-area-inset-right)) max(1.25rem, env(safe-area-inset-bottom)) max(0.9rem, env(safe-area-inset-left))',
      }}
    >
      {/* Stars */}
      {STARS.map(s => (
        <motion.div key={s.id} style={{
          position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, borderRadius: '50%', pointerEvents: 'none',
          background: s.gold ? 'rgba(201,168,76,0.9)' : 'rgba(255,255,248,0.5)',
        }}
          animate={{ opacity: [0.06, 1, 0.06], scale: [0.5, 1.4, 0.5] }}
          transition={{ duration: s.dur, delay: s.del, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Rising particles */}
      {PARTICLES.map(p => (
        <motion.div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, bottom: -14, pointerEvents: 'none',
          width: p.size, height: p.size, borderRadius: '50%',
          background: 'radial-gradient(circle, #F5D978, #C9A84C)',
          boxShadow: '0 0 6px rgba(201,168,76,0.5)',
        }}
          animate={{ y: [0, -820], x: [0, p.dx], opacity: [0, p.op, 0], scale: [1, 0.4, 0.1] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* Islamic pattern */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} className="islamic-pattern opacity-[0.07]" />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: [
          'radial-gradient(ellipse 60% 50% at 18% 22%, rgba(27,107,71,0.26) 0%, transparent 100%)',
          'radial-gradient(ellipse 48% 42% at 82% 78%, rgba(201,168,76,0.11) 0%, transparent 100%)',
        ].join(','),
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 88% 88% at center, transparent 18%, rgba(2,6,4,0.82) 100%)',
      }} />

      {/* Gold frame lines */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, #C9A84C 30%, #F5D978 50%, #C9A84C 70%, transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, #C9A84C 30%, #F5D978 50%, #C9A84C 70%, transparent)', opacity: 0.45 }} />

      {/* Corner ornaments */}
      {[
        { top: '0.8rem', left: '0.8rem',   borderTop:    '1.5px solid rgba(201,168,76,0.52)', borderLeft:   '1.5px solid rgba(201,168,76,0.52)' },
        { top: '0.8rem', right: '0.8rem',  borderTop:    '1.5px solid rgba(201,168,76,0.52)', borderRight:  '1.5px solid rgba(201,168,76,0.52)' },
        { bottom: '0.8rem', left: '0.8rem', borderBottom: '1.5px solid rgba(201,168,76,0.52)', borderLeft:  '1.5px solid rgba(201,168,76,0.52)' },
        { bottom: '0.8rem', right: '0.8rem',borderBottom: '1.5px solid rgba(201,168,76,0.52)', borderRight: '1.5px solid rgba(201,168,76,0.52)' },
      ].map((s, i) => <div key={i} style={{ position: 'absolute', width: '1.5rem', height: '1.5rem', pointerEvents: 'none', ...s }} />)}

      {/* ─── MAIN CONTENT ─── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: EASE }}
        style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: '30rem',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
        }}
      >
        {/* Crescent ornament */}
        <motion.div {...appear(0.05)} style={{ marginBottom: '0.6rem' }}>
          <motion.span
            animate={ready ? { opacity: [0.45, 1, 0.45] } : {}}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: '#C9A84C', fontSize: '0.72rem', letterSpacing: '0.65rem' }}
          >
            ☽ ✦ ☽
          </motion.span>
        </motion.div>

        {/* Bismillah */}
        <motion.p {...appear(0.1)} style={{
          margin: '0 0 0.45rem',
          fontFamily: "'Amiri', serif",
          fontSize: 'clamp(1.05rem, 4.5vw, 1.55rem)',
          color: '#F0D98A',
          textShadow: '0 0 32px rgba(232,201,126,0.5)',
          lineHeight: 1.45, direction: 'rtl',
        }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </motion.p>

        {/* Thin gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={ready ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.95, delay: 0.18, ease: EASE }}
          style={{ width: 'min(11rem, 60vw)', height: '1px', margin: '0 0 0.6rem', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.55), transparent)' }}
        />

        {/* Eyebrow tag */}
        <motion.p {...appear(0.22)} style={{
          margin: '0 0 0.55rem',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(0.48rem, 1.4vw, 0.58rem)',
          letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.6)', fontWeight: 500,
        }}>
          Nikah &amp; Walima Invitation
        </motion.p>

        {/* ── Guest name — highlighted card ── */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.26, ease: EASE }}
            style={{
              position: 'relative',
              margin: '0 0 0.75rem',
              width: '100%',
              borderRadius: '1.25rem',
              background: 'linear-gradient(145deg, rgba(20,50,32,0.96) 0%, rgba(10,28,18,0.98) 100%)',
              border: '1.5px solid rgba(201,168,76,0.5)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
              padding: '1rem 1.25rem 1.1rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
              overflow: 'hidden',
            }}
          >
            {/* Top gold shimmer bar */}
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
              background: 'linear-gradient(to right, transparent, #C9A84C, #F5D978, #C9A84C, transparent)',
              borderRadius: '0 0 4px 4px',
            }} />

            {/* Corner stars */}
            <span style={{ position: 'absolute', top: '0.6rem', left: '0.8rem', color: '#C9A84C', fontSize: '0.6rem', opacity: 0.6 }}>✦</span>
            <span style={{ position: 'absolute', top: '0.6rem', right: '0.8rem', color: '#C9A84C', fontSize: '0.6rem', opacity: 0.6 }}>✦</span>

            {/* Label */}
            <p style={{
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.52rem, 1.5vw, 0.6rem)',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.7)', fontWeight: 600,
            }}>
              A Special Invitation For
            </p>

            {/* Guest name — large, glowing */}
            <motion.p
              animate={{
                textShadow: [
                  '0 0 12px rgba(201,168,76,0.3)',
                  '0 0 32px rgba(201,168,76,0.75), 0 0 60px rgba(201,168,76,0.25)',
                  '0 0 12px rgba(201,168,76,0.3)',
                ],
              }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                margin: 0,
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(2rem, 9vw, 3rem)',
                lineHeight: 1.1,
                color: '#F5E090',
                letterSpacing: '0.02em',
              }}
            >
              {guestName}
            </motion.p>

            {/* Thin divider */}
            <div style={{ width: '50%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.45), transparent)', margin: '0.15rem 0' }} />

            {/* Sub-label */}
            <p style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.72rem, 2vw, 0.85rem)',
              color: 'rgba(232,220,196,0.62)',
            }}>
              You are warmly invited to our wedding
            </p>
          </motion.div>
        )}

        {/* Couple names — elegant, compact */}
        <motion.div {...appear(guestName ? 0.35 : 0.28)} style={{ marginBottom: '0.4rem' }}>
          <p style={{
            margin: 0, fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(1.55rem, 6.5vw, 2.3rem)',
            color: '#F0D98A',
            textShadow: '0 2px 20px rgba(201,168,76,0.45)',
            lineHeight: 1.2,
          }}>
            Md Suleman{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: '#C9A84C', display: 'inline-block', filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.65))' }}
            >♥</motion.span>
            {' '}Sofiya Fatma
          </p>
        </motion.div>

        {/* Ornament line before envelope */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={ready ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: guestName ? 0.42 : 0.34, ease: EASE }}
          style={{ width: 'min(9rem, 48vw)', height: '1px', margin: '0 0 0.45rem', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.45), transparent)' }}
        />

        {/* ── THE ENVELOPE ── big, prominent */}
        <motion.div
          {...appear(guestName ? 0.48 : 0.4)}
          style={{
            width: 'min(100%, clamp(17rem, 85vw, 25rem))',
            marginBottom: '0.65rem',
          }}
        >
          <WeddingEnvelope onOpen={onEnter} />
        </motion.div>

        {/* Date + venue chips */}
        <motion.div
          {...appear(guestName ? 0.62 : 0.54)}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.55rem' }}
        >
          {['✦  11 June 2026', '📍  Rampur Saghari, Muzaffarpur'].map(txt => (
            <span key={txt} style={{
              padding: '0.3rem 0.85rem', borderRadius: '999px',
              border: '1px solid rgba(201,168,76,0.28)',
              background: 'rgba(201,168,76,0.08)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.52rem, 1.5vw, 0.62rem)',
              letterSpacing: '0.08em', color: 'rgba(232,201,126,0.8)',
              textTransform: 'uppercase',
            }}>
              {txt}
            </span>
          ))}
        </motion.div>

        {/* Hint */}
        <motion.p
          {...appear(guestName ? 0.72 : 0.64)}
          animate={ready ? { opacity: [0.38, 0.72, 0.38] } : { opacity: 0.5 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            margin: 0, fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(0.5rem, 1.4vw, 0.59rem)',
            color: 'rgba(201,168,76,0.52)',
            letterSpacing: '0.2em', textTransform: 'uppercase',
          }}
        >
          Click the seal to open your invitation
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
