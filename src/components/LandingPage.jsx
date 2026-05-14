import { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STARS = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  x: (i * 37.93 + 11.3) % 100,
  y: (i * 53.71 + 7.6) % 100,
  size: i % 4 === 0 ? 2.2 : i % 3 === 0 ? 1.4 : 0.8,
  dur: 2.2 + (i % 5) * 0.6,
  del: (i * 0.29) % 4,
  gold: i % 6 === 0,
}));

const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: (i * 43.3 + 8) % 100,
  size: 1.2 + (i % 3) * 0.9,
  dur: 4 + (i % 4) * 0.8,
  del: (i * 0.6) % 5,
  dx: ((i % 6) - 2.5) * 18,
}));

const BURST = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  angle: (i / 28) * Math.PI * 2,
  r: 80 + (i % 5) * 18,
  big: i % 4 === 0,
}));

const EASE = [0.16, 1, 0.3, 1];

function LandingBackdrop() {
  return (
    <>
      <motion.div
        className="landing-page__pattern islamic-pattern"
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="landing-page__glow" />
      <div className="landing-page__vignette" />
      <div className="landing-page__frame landing-page__frame--top" />
      <motion.div
        className="landing-page__frame landing-page__frame--bottom"
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

function LandingAmbient() {
  return (
    <>
      {STARS.map((star) => (
        <motion.div
          key={star.id}
          className="landing-page__star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: star.gold ? 'rgba(245,217,120,0.9)' : 'rgba(255,255,240,0.7)',
          }}
          animate={{ opacity: [0.1, 0.75, 0.1], scale: [0.7, 1.15, 0.7] }}
          transition={{ duration: star.dur, delay: star.del, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {SPARKS.map((spark) => (
        <motion.div
          key={spark.id}
          className="landing-page__particle"
          style={{
            left: `${spark.x}%`,
            bottom: -4,
            width: spark.size,
            height: spark.size,
          }}
          animate={{
            y: [0, -180, -230],
            x: [0, spark.dx, spark.dx * 1.5],
            opacity: [0, 0.75, 0],
            scale: [1, 0.55, 0.1],
          }}
          transition={{ duration: spark.dur, delay: spark.del, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

function InviteIntro({ guestName, ready }) {
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <motion.div className="landing-intro landing-panel__intro">
      <motion.p {...reveal(0.08)} className="landing-intro__bismillah">
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
      </motion.p>

      <motion.div {...reveal(0.14)} className="landing-intro__divider">
        <span aria-hidden="true">✦</span>
      </motion.div>

      {guestName ? (
        <>
          <motion.p {...reveal(0.2)} className="landing-intro__eyebrow">
            A Special Invitation For You
          </motion.p>
          <motion.div {...reveal(0.28)} className="landing-intro__guest">
            <span className="landing-intro__guest-label">Welcome</span>
            <span className="landing-intro__guest-name">{guestName}</span>
            <span className="landing-intro__guest-label">to our Nikah</span>
          </motion.div>
          <motion.p {...reveal(0.36)} className="landing-intro__note">
            Your presence would fill our hearts with joy on this blessed occasion.
          </motion.p>
        </>
      ) : (
        <>
          <motion.p {...reveal(0.2)} className="landing-intro__eyebrow">
            Together with their families
          </motion.p>
          <motion.p {...reveal(0.28)} className="landing-intro__couple">
            Md Suleman <span>&amp;</span> Sofiya Fatima
          </motion.p>
          <motion.p {...reveal(0.36)} className="landing-intro__note">
            We invite you to share in the joy of this sacred Nikah.
          </motion.p>
        </>
      )}

      <motion.div {...reveal(0.44)} className="landing-intro__meta">
        <span>11 June 2026</span>
        <span>Rampur Saghri, Muzaffarpur</span>
      </motion.div>
    </motion.div>
  );
}

function WeddingEnvelope({ onOpen, graphicId }) {
  const [phase, setPhase] = useState('idle');

  const open = () => {
    if (phase !== 'idle') return;
    setPhase('burst');
    window.setTimeout(() => setPhase('open'), 650);
    window.setTimeout(() => {
      setPhase('done');
      onOpen();
    }, 2100);
  };

  return (
    <motion.div
      className="landing-envelope landing-panel__envelope"
      initial={{ opacity: 0, y: 28, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.35, ease: EASE }}
    >
      <motion.div
        className="landing-envelope__halo"
        animate={
          phase === 'idle'
            ? { opacity: [0.45, 0.9, 0.45], scale: [0.96, 1.04, 0.96] }
            : { opacity: 1, scale: 1.08 }
        }
        transition={{ duration: 3.2, repeat: phase === 'idle' ? Infinity : 0, ease: 'easeInOut' }}
      />

      <motion.div
        className="landing-envelope__pulse"
        animate={{ scale: [1, 1.16, 1], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
      />

      <motion.button
        type="button"
        onClick={open}
        disabled={phase !== 'idle'}
        aria-label="Open wedding invitation envelope"
        className="landing-envelope__trigger"
        animate={
          phase === 'idle'
            ? { y: [0, -10, 0] }
            : phase === 'burst'
              ? { y: -14, scale: 1.03 }
              : {}
        }
        transition={
          phase === 'idle'
            ? { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.45, ease: 'easeOut' }
        }
      >
        <svg viewBox="0 0 520 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="landing-envelope__svg">
          <defs>
            <linearGradient id={`${graphicId}-envBg`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#122A1A" />
              <stop offset="50%" stopColor="#0D2016" />
              <stop offset="100%" stopColor="#081410" />
            </linearGradient>
            <linearGradient id={`${graphicId}-flapBg`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A3D26" />
              <stop offset="100%" stopColor="#0F2318" />
            </linearGradient>
            <linearGradient id={`${graphicId}-flapL`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0A1C12" />
              <stop offset="100%" stopColor="#0E2318" />
            </linearGradient>
            <linearGradient id={`${graphicId}-flapR`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0E2318" />
              <stop offset="100%" stopColor="#0A1C12" />
            </linearGradient>
            <linearGradient id={`${graphicId}-flapBot`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#12281A" />
              <stop offset="100%" stopColor="#081410" />
            </linearGradient>
            <linearGradient id={`${graphicId}-goldStroke`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5D978" stopOpacity="0.75" />
              <stop offset="45%" stopColor="#C9A84C" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#8A6030" stopOpacity="0.6" />
            </linearGradient>
            <radialGradient id={`${graphicId}-waxSeal`} cx="50%" cy="35%">
              <stop offset="0%" stopColor="#C42828" />
              <stop offset="60%" stopColor="#8B1515" />
              <stop offset="100%" stopColor="#4A0808" />
            </radialGradient>
            <filter id={`${graphicId}-sealGlow`} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feFlood floodColor="#C9A84C" floodOpacity="0.35" result="c" />
              <feComposite in="c" in2="blur" operator="in" result="d" />
              <feMerge>
                <feMergeNode in="d" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`${graphicId}-envShadow`} x="-5%" y="-5%" width="110%" height="120%">
              <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="#000" floodOpacity="0.6" />
            </filter>
          </defs>

          <rect x="2" y="38" width="516" height="296" rx="10" fill={`url(#${graphicId}-envBg)`} filter={`url(#${graphicId}-envShadow)`} />
          <rect x="2" y="38" width="516" height="296" rx="10" stroke={`url(#${graphicId}-goldStroke)`} strokeWidth="1.8" />
          <rect x="12" y="48" width="496" height="276" rx="7" stroke="rgba(201,168,76,0.25)" strokeWidth="0.8" fill="none" />

          <path d="M2 38 L260 198 L2 334 Z" fill={`url(#${graphicId}-flapL)`} />
          <path d="M518 38 L260 198 L518 334 Z" fill={`url(#${graphicId}-flapR)`} />
          <path d="M2 334 L260 198 L518 334 Z" fill={`url(#${graphicId}-flapBot)`} stroke={`url(#${graphicId}-goldStroke)`} strokeWidth="0.9" />

          <motion.path
            d="M2 38 L260 198 L518 38 Z"
            fill={`url(#${graphicId}-flapBg)`}
            stroke={`url(#${graphicId}-goldStroke)`}
            strokeWidth="1.1"
            style={{ transformOrigin: '260px 38px' }}
            animate={phase === 'open' || phase === 'done' ? { scaleY: -1 } : { scaleY: 1 }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          />

          <circle cx="260" cy="198" r="52" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
          <circle cx="260" cy="198" r="46" fill={`url(#${graphicId}-waxSeal)`} filter={`url(#${graphicId}-sealGlow)`} />
          <circle cx="260" cy="198" r="41" fill="none" stroke="rgba(232,201,126,0.55)" strokeWidth="1.4" />
          <text x="260" y="192" textAnchor="middle" fontSize="11" fontFamily="'Great Vibes',cursive" fill="rgba(248,243,232,0.65)">
            Nikah
          </text>
          <text x="260" y="210" textAnchor="middle" fontSize="17" fontFamily="'Great Vibes',cursive" fill="rgba(248,243,232,0.95)" letterSpacing="3">
            S&amp;S
          </text>

          <text x="260" y="290" textAnchor="middle" fontSize="8.5" fontFamily="'Inter',sans-serif" fill="rgba(201,168,76,0.62)" letterSpacing="5">
            TAP TO OPEN
          </text>
          <line x1="195" y1="298" x2="325" y2="298" stroke="rgba(201,168,76,0.22)" strokeWidth="0.7" />
        </svg>

        <AnimatePresence>
          {(phase === 'open' || phase === 'done') && (
            <motion.div
              initial={{ y: 28, opacity: 0, scaleX: 0.92 }}
              animate={{ y: -54, opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
              className="landing-envelope__peek"
            >
              <p className="landing-envelope__peek-label">Opening your invitation</p>
              <p className="landing-envelope__peek-names">Md Suleman &amp; Sofiya Fatima</p>
              <div className="landing-envelope__peek-dots" aria-hidden="true">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1.15, 0.85] }}
                    transition={{ duration: 0.9, delay: dot * 0.18, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {phase === 'burst' &&
          BURST.map((particle) => (
            <motion.span
              key={particle.id}
              className="landing-envelope__burst"
              style={{
                width: particle.big ? 8 : 4,
                height: particle.big ? 8 : 4,
                background: particle.id % 3 === 0 ? '#F5D978' : particle.id % 3 === 1 ? '#C9A84C' : '#fff',
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos(particle.angle) * particle.r,
                y: Math.sin(particle.angle) * particle.r,
                opacity: 0,
                scale: 0.1,
              }}
              transition={{ duration: 0.95 + (particle.id % 4) * 0.15, ease: 'easeOut' }}
            />
          ))}
      </AnimatePresence>

      <motion.p
        className="landing-envelope__hint"
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        Tap the envelope seal to open your wedding card
      </motion.p>

      <button type="button" className="landing-envelope__cta btn-outline-gold" onClick={open} disabled={phase !== 'idle'}>
        Open Invitation
      </button>
    </motion.div>
  );
}

export default function LandingPage({ guestName, onEnter }) {
  const [ready, setReady] = useState(false);
  const graphicId = useId().replace(/:/g, '');

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.95, ease: [0.7, 0, 0.3, 1] }}
      className="landing-page"
    >
      <LandingBackdrop />
      <LandingAmbient />

      <motion.div
        className="landing-page__stage"
        initial={{ opacity: 0, y: 24 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <div className="landing-panel">
          <span className="landing-panel__corner landing-panel__corner--tl" aria-hidden="true" />
          <span className="landing-panel__corner landing-panel__corner--tr" aria-hidden="true" />
          <span className="landing-panel__corner landing-panel__corner--bl" aria-hidden="true" />
          <span className="landing-panel__corner landing-panel__corner--br" aria-hidden="true" />

          <div className="landing-panel__grid">
            <InviteIntro guestName={guestName} ready={ready} />
            <WeddingEnvelope onOpen={onEnter} graphicId={graphicId} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
