import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiHeart, FiMapPin } from 'react-icons/fi';

export default function Footer({ darkMode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <footer
      className="relative pt-24 pb-12 overflow-hidden"
      style={{ background: '#0B1810' }}
    >
      {/* Islamic pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-[0.12]" />

      {/* Radial emerald glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 100%, rgba(27,107,71,0.18) 0%, transparent 65%)',
      }} />

      {/* Top gold border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, #C9A84C 30%, #E8C97E 50%, #C9A84C 70%, transparent)' }} />
      {/* Top inner blur line */}
      <div className="absolute top-0 left-0 right-0 h-8"
        style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.08), transparent)' }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6" ref={ref}>

        {/* Animated crescent emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.9, type: 'spring', stiffness: 160, damping: 16 }}
          className="flex justify-center mb-7"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '1px dashed rgba(201,168,76,0.2)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <span className="crescent" style={{ width: 30, height: 30, boxShadow: 'inset -11px -3px 0 0 #C9A84C' }} />
            </div>
          </div>
        </motion.div>

        {/* Couple names */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="font-script text-center mb-3"
          style={{
            fontSize: 'clamp(2.2rem, 7vw, 3.5rem)',
            color: '#E8C97E',
            textShadow: '0 0 40px rgba(232,201,126,0.3), 0 3px 20px rgba(0,0,0,0.5)',
            lineHeight: 1.15,
          }}
        >
          Md Suleman & Sofiya Fatima
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="font-inter text-xs text-center tracking-[0.28em] uppercase mb-8"
          style={{ color: 'rgba(201,168,76,0.45)' }}
        >
          11 June 2026 · Rampur Saghri, Muzaffarpur, Bihar
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.28 }}
          className="gold-divider w-40 mx-auto mb-10"
        />

        {/* Dua */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-center mb-10 px-4"
        >
          <p className="font-amiri text-2xl sm:text-3xl mb-4 leading-relaxed" style={{ color: '#C9A84C' }}>
            بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="font-playfair italic text-sm leading-relaxed" style={{ color: 'rgba(232,224,208,0.5)' }}>
            "May Allah bless you, and shower His blessings upon you,<br className="hidden sm:block" />
            and may He unite you both in goodness."
          </p>
          <p className="font-inter text-xs mt-2" style={{ color: 'rgba(201,168,76,0.35)' }}>
            — Du'a for the Newlyweds (Abu Dawud)
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.42 }}
          className="gold-divider w-40 mx-auto mb-10"
        />

        {/* Address */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.48 }}
          className="flex items-center justify-center gap-2 font-inter text-sm mb-10 text-center"
          style={{ color: 'rgba(232,224,208,0.5)' }}
        >
          <FiMapPin size={13} style={{ color: '#C9A84C', flexShrink: 0 }} />
          Village Rampur Saghri, Via: Aurai, Dist: Muzaffarpur, Bihar 843312
        </motion.div>

        {/* Bottom */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="font-inter text-xs flex items-center justify-center gap-1.5 text-center"
          style={{ color: 'rgba(201,168,76,0.28)' }}
        >
          Made with <FiHeart size={11} style={{ color: '#C9A84C' }} /> for Md Suleman & Sofiya Fatima's Special Day
        </motion.p>
      </div>
    </footer>
  );
}
