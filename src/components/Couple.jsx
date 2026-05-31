import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import groomImg from '../assets/boy.jpeg';
import brideImg from '../assets/girl.jpeg';
import coupleBg from '../assets/couple-bg.png';
import { VIEWPORT, revealTransition } from '../motion/presets';

/* ─── Spinning ornament ring ─── */
const OrnamentRing = ({ cw = true, size = 100, opacity = 0.15, dur = 22 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size, height: size,
      border: '1px dashed rgba(201,168,76,0.4)',
      top: '50%', left: '50%',
      transform: 'translate(-50%,-50%)',
      opacity,
    }}
    animate={{ rotate: cw ? 360 : -360 }}
    transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
  />
);

/* ─── Card ─── */
function CoupleCard({ image, name, parentLine, title, bio, index, darkMode, facePosition = 'center 18%' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={revealTransition(index * 0.08)}
      className="glass-card flex flex-col items-center text-center p-6 sm:p-8 md:p-10 h-full group"
    >
      {/* Title tag */}
      <p className="section-tag mb-5" style={{ fontSize: '0.65rem', letterSpacing: '0.32em' }}>{title}</p>

      {/* Photo */}
      <div className="relative mb-5 sm:mb-7" style={{ width: 'min(180px,52vw)', height: 'min(180px,52vw)' }}>
        {/* Orbiting rings */}
        <OrnamentRing cw size="105%" dur={24} opacity={0.18} />
        <OrnamentRing cw={false} size="85%" dur={16} opacity={0.12} />

        {/* Rotating gold gradient border */}
        <motion.div
          className="absolute inset-0 rounded-full p-[2.5px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'conic-gradient(from 0deg, transparent 50%, rgba(201,168,76,0.7) 75%, #E8C97E 85%, transparent 100%)',
          }}
        />

        {/* Image */}
        <div
          className="absolute inset-[3px] rounded-full overflow-hidden"
          style={{ border: '1.5px solid rgba(201,168,76,0.25)' }}
        >
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover img-warm transition-transform duration-700 group-hover:scale-110"
            style={{ objectPosition: facePosition }}
          />
        </div>

        {/* Glow dot at center-bottom */}
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{ background: 'var(--gold)', boxShadow: '0 0 12px rgba(201,168,76,0.8)' }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </div>

      {/* Name */}
      <h3
        className="font-playfair font-semibold mb-1"
        style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', color: darkMode ? '#E8C97E' : '#1A1A1A' }}
      >
        {name}
      </h3>

      {/* Parent line */}
      <p className="font-inter text-xs mb-5" style={{ color: 'var(--gold)', letterSpacing: '0.06em' }}>
        {parentLine}
      </p>

      {/* Divider */}
      <div className="gold-divider w-24 mb-5" />

      {/* Bio */}
      <p className="font-amiri leading-relaxed"
        style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: darkMode ? 'rgba(232,220,196,0.9)' : '#3A3A3A', fontWeight: 400 }}>
        {bio}
      </p>
    </motion.div>
  );
}

/* ─── Center heart ornament ─── */
function CenterOrnament({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.35, type: 'spring', stiffness: 200, damping: 18 }}
      className="hidden sm:flex flex-col items-center justify-center gap-2 px-2"
    >
      {/* Top line */}
      <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, transparent, var(--gold))' }} />
      {/* Heart */}
      <motion.div
        style={{ fontSize: '1.8rem', color: 'var(--gold)', textShadow: '0 0 20px rgba(201,168,76,0.5)' }}
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        ♥
      </motion.div>
      {/* Bottom line */}
      <div className="w-px h-10" style={{ background: 'linear-gradient(to top, transparent, var(--gold))' }} />
    </motion.div>
  );
}

/* ─── Section ─── */
export default function Couple({ darkMode }) {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cardsRef = useRef(null);
  const inView = useInView(headRef, { once: true, margin: '-60px' });
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      id="couple"
      className="relative py-16 sm:py-28 overflow-hidden site-section"
    >
      {/* Background image overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${coupleBg})`,
          filter: 'brightness(0.2) saturate(1.2)',
          opacity: darkMode ? 0.5 : 0.3,
        }} />
      
      <div className="absolute inset-0"
        style={{ background: darkMode ? 'rgba(15,26,20,0.75)' : 'rgba(242,232,213,0.82)' }} />

      <motion.div
        className="absolute inset-0 islamic-pattern opacity-[0.05]"
        animate={{ opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(27,107,71,0.07) 0%, transparent 65%)',
      }} />

      <div className="max-w-5xl mx-auto relative z-10 px-4 sm:px-6">

        {/* Heading */}
        <div ref={headRef} className="text-center mb-10 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="section-tag mb-3"
          >
            The Blessed Union
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="font-playfair font-semibold mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: darkMode ? '#E8C97E' : '#1A1A1A' }}
          >
            Meet the Couple
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="font-amiri text-xl"
            style={{ color: 'var(--gold)' }}
          >
            "And of His signs is that He created for you mates from among yourselves"
          </motion.p>
          <p className="font-inter text-xs mt-1" style={{ color: 'var(--text-muted)' }}>— Quran 30:21</p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="gold-divider w-32 mt-5 mx-auto"
          />
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-8 sm:gap-6 items-stretch"
        >
          <CoupleCard image={groomImg} name="Md Suleman" parentLine="S/o Md. Wahidur Rahman"
            title="The Groom"
            bio="A man of faith, warmth, and deep devotion to his family and Deen. Known for his generous spirit and calm resolve, he is a blessing to all who know him."
            index={0} darkMode={darkMode} facePosition="center 15%" />
          <CenterOrnament inView={cardsInView} />
          <CoupleCard image={brideImg} name="Sofiya Fatma" parentLine="D/o Jb. Md. Ashraf Sb."
            title="The Bride"
            bio="A woman of grace, piety, and quiet strength. She carries warmth in her smile and sincerity in her heart, cherished deeply by her family and loved ones."
            index={1} darkMode={darkMode} facePosition="center top" />
        </div>

        {/* Quote strip */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={revealTransition(0.12)}
          className="mt-10 sm:mt-16 text-center glass-card py-6 sm:py-8 px-5 md:px-12"
        >
          <p className="font-amiri text-xl md:text-2xl italic leading-relaxed"
            style={{ color: darkMode ? 'rgba(232,201,126,0.75)' : 'var(--emerald)' }}>
            "And He placed between you affection and mercy. Indeed in that are signs for a people who give thought."
          </p>
          <p className="font-inter text-xs mt-3" style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}>— QURAN 30:21</p>
        </motion.div>
      </div>
    </section>
  );
}
