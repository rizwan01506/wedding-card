import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

/* ── Random star seeds (memoized outside component to avoid hydration flicker) ── */
const STARS = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  x: (i * 37.3 + 11) % 100,
  y: (i * 53.7 + 7)  % 100,
  size: (i % 3) * 0.6 + 0.8,
  dur: (i % 4) * 0.6 + 2.2,
  delay: (i * 0.31) % 3.5,
}));

/* ── Gold particles ── */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: (i * 41.1 + 5) % 100,
  size: (i % 3) * 1.2 + 1.5,
  dur: (i % 3) * 1.2 + 3,
  delay: (i * 0.45) % 5,
  dx: ((i % 5) - 2) * 22,
}));

export default function LoadingScreen({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #080F0B 0%, #0D1810 40%, #0A2010 70%, #060C09 100%)',
          }}
        >
          {/* Islamic pattern bg */}
          <div className="absolute inset-0 islamic-pattern opacity-[0.06]" />
          <div className="absolute inset-0 star-field opacity-[0.04]" />

          {/* Radial glow */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(27,107,71,0.22) 0%, transparent 65%)',
          }} />

          {/* Stars */}
          {STARS.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${s.x}%`, top: `${s.y}%`,
                width: s.size, height: s.size,
                background: s.id % 4 === 0 ? `rgba(201,168,76,0.7)` : `rgba(255,255,240,0.6)`,
              }}
              animate={{ opacity: [0.12, 0.9, 0.12], scale: [0.7, 1.2, 0.7] }}
              transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* Floating gold particles */}
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`, bottom: 0,
                width: p.size, height: p.size,
                background: 'radial-gradient(circle, #F5D978, #C9A84C)',
                boxShadow: '0 0 6px rgba(201,168,76,0.5)',
              }}
              animate={{
                y: [0, -160, -200],
                x: [0, p.dx, p.dx * 1.4],
                opacity: [0, 0.75, 0],
                scale: [1, 0.8, 0.2],
              }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}

          {/* ── Center content ── */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full">

            {/* Top line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="w-56 h-px mb-5"
              style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4) 20%, #E8C97E 50%, rgba(201,168,76,0.4) 80%, transparent)' }}
            />

            {/* Crescent emblem */}
            <motion.div
              className="relative mb-5 flex items-center justify-center"
              initial={{ scale: 0, rotate: -130, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.div className="absolute rounded-full"
                style={{ width: 104, height: 104, border: '1px dashed rgba(201,168,76,0.2)' }}
                animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} />
              <motion.div className="absolute rounded-full"
                style={{ width: 80, height: 80, border: '1px solid rgba(201,168,76,0.14)' }}
                animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }} />
              <div className="absolute rounded-full" style={{
                width: 60, height: 60,
                background: 'radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%)',
                boxShadow: '0 0 35px rgba(201,168,76,0.22)',
              }} />
              <div className="relative" style={{
                width: 42, height: 42, borderRadius: '50%',
                boxShadow: 'inset -15px -3px 0 0 #C9A84C',
              }} />
              <motion.span className="absolute font-amiri" style={{ color: '#E8C97E', fontSize: 13, top: 5, right: 7 }}
                animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}>✦</motion.span>
            </motion.div>

            {/* Bismillah */}
            <motion.p
              className="font-amiri mb-2"
              style={{ color: '#E8C97E', fontSize: 'clamp(1.1rem, 4vw, 1.55rem)', lineHeight: 1.4, textShadow: '0 0 24px rgba(232,201,126,0.35)' }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.9 }}
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="w-24 h-px mb-4"
              style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }}
            />

            {/* Couple names — PREMIUM large */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-script" style={{
                fontSize: 'clamp(1.9rem, 7vw, 2.8rem)',
                color: '#F0D98A',
                textShadow: '0 3px 24px rgba(201,168,76,0.4), 0 1px 10px rgba(0,0,0,0.7)',
                lineHeight: 1.1,
              }}>Md Suleman</p>
              <p className="font-amiri my-1" style={{ color: 'rgba(201,168,76,0.6)', fontSize: '1.1rem' }}>♥</p>
              <p className="font-script" style={{
                fontSize: 'clamp(1.9rem, 7vw, 2.8rem)',
                color: '#F0D98A',
                textShadow: '0 3px 24px rgba(201,168,76,0.4), 0 1px 10px rgba(0,0,0,0.7)',
                lineHeight: 1.1,
              }}>Sofiya Fatima</p>
            </motion.div>

            <motion.p
              className="font-inter uppercase mt-3 mb-1"
              style={{ fontSize: '0.58rem', letterSpacing: '0.3em', color: 'rgba(201,168,76,0.55)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.55, duration: 0.7 }}
            >
              Nikah Invitation · June 2026
            </motion.p>

            {/* Bottom ornament */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.75 }}
              className="w-56 h-px mt-4 mb-5"
              style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.35) 20%, #E8C97E 50%, rgba(201,168,76,0.35) 80%, transparent)' }}
            />

            {/* Progress bar */}
            <motion.div
              className="w-48 h-0.5 rounded-full overflow-hidden mb-3"
              style={{ background: 'rgba(201,168,76,0.1)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #A07830, #C9A84C 35%, #E8C97E 50%, #C9A84C 65%, #A07830)' }}
                initial={{ width: '0%' }} animate={{ width: '100%' }}
                transition={{ delay: 1.9, duration: 0.65, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Dots */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="flex gap-2">
              {[0, 0.2, 0.4].map((d, i) => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#C9A84C' }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.1, delay: d, repeat: Infinity }} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
