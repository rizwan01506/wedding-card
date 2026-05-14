import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BsMoonStarsFill, BsStarFill } from 'react-icons/bs';
import { GiFlowerPot } from 'react-icons/gi';
import { EASE, VIEWPORT, revealTransition } from '../motion/presets';

const STEPS = [
  {
    id: 'haldi',
    step: '01',
    icon: <GiFlowerPot size={22} />,
    title: 'Haldi Ceremony',
    subtitle: 'Wed, 10 June · 10:00 PM',
    description: "The celebrations begin with the Haldi ceremony the evening before the Baraat. Family and friends bless the couple with turmeric, joy, and heartfelt prayers.",
    color: '#B8860B',
    bg: 'rgba(184,134,11,0.09)',
    border: 'rgba(184,134,11,0.28)',
    glow: 'rgba(184,134,11,0.12)',
  },
  {
    id: 'baraat',
    step: '02',
    icon: <BsMoonStarsFill size={22} />,
    title: 'Baraat',
    subtitle: 'Thu, 11 June · After Zuhr Namaaz',
    description: "The groom's procession arrives at the bride's residence at Village Rampur Saghri in a joyful celebration of lights and blessings after Zuhr prayers.",
    color: '#C9A84C',
    bg: 'rgba(201,168,76,0.09)',
    border: 'rgba(201,168,76,0.28)',
    glow: 'rgba(201,168,76,0.14)',
  },
  {
    id: 'walima',
    step: '03',
    icon: <BsStarFill size={22} />,
    title: 'Walima Reception',
    subtitle: 'Fri, 12 June · After Zuhr Namaaz',
    description: "The wedding celebrations conclude with the blessed Walima feast. Join us for an afternoon of joy, abundant food, and heartfelt du'as.",
    color: '#1B6B47',
    bg: 'rgba(27,107,71,0.09)',
    border: 'rgba(27,107,71,0.28)',
    glow: 'rgba(27,107,71,0.10)',
  },
];

/* ─── Timeline dot ─── */
function TimelineDot({ color, index, inView }) {
  return (
    <div className="hidden sm:flex flex-col items-center shrink-0 w-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.12 + 0.2, duration: 0.55, ease: EASE }}
        className="relative w-5 h-5 rounded-full"
        style={{ background: color, boxShadow: `0 0 16px ${color}AA` }}
      >
        {/* Halo ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1.5px solid ${color}` }}
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, delay: index * 0.4, repeat: Infinity, ease: 'easeOut' }}
        />
      </motion.div>
    </div>
  );
}

export default function Timeline({ darkMode }) {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true });

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-28 overflow-hidden site-section"
      style={{ background: darkMode ? 'rgba(21,32,16,0.5)' : 'rgba(242,232,213,0.45)' }}
    >
      <div className="absolute inset-0 islamic-pattern opacity-[0.05]" />

      <div className="max-w-3xl mx-auto relative z-10 px-4 sm:px-6">
        <div ref={headRef} className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.65 }}
            className="section-tag mb-3">
            The Journey
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="font-playfair font-semibold mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: darkMode ? '#E8C97E' : '#1A1A1A' }}>
            Events Timeline
          </motion.h2>
          <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.18 }}
            className="gold-divider w-32 mx-auto" />
        </div>

        <div className="relative">
          {/* Vertical gradient spine */}
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, #B8860B 15%, #C9A84C 50%, #1B6B47 85%, transparent)' }} />

          <div className="flex flex-col gap-10">
            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={revealTransition(i * 0.08)}
                  className={`flex items-center gap-0 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className={`w-full sm:w-[calc(50%-2rem)] ${isLeft ? 'sm:pr-8' : 'sm:pl-8'}`}>
                    <motion.div
                      whileHover={{ y: -5, transition: { duration: 0.3 } }}
                      className="glass-card p-6 group relative"
                      style={{
                        borderColor: step.border,
                        boxShadow: `0 8px 32px rgba(0,0,0,0.06), 0 0 24px ${step.glow}`,
                      }}
                    >
                      {/* Accent top line */}
                      <div className={`absolute top-0 ${isLeft ? 'left-6 right-6' : 'left-6 right-6'} h-0.5 rounded-full`}
                        style={{ background: `linear-gradient(to right, transparent, ${step.color}, transparent)` }} />

                      <div className="flex items-center gap-3 mb-4">
                        {/* Icon */}
                        <div className="relative">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-400 group-hover:scale-110"
                            style={{ background: step.bg, color: step.color, border: `1px solid ${step.border}` }}>
                            {step.icon}
                          </div>
                          <motion.div className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{ border: `1.5px solid ${step.color}` }}
                            animate={{ scale: [1, 1.35], opacity: [0.4, 0] }}
                            transition={{ duration: 2.5, delay: i * 0.8, repeat: Infinity, ease: 'easeOut' }} />
                        </div>

                        {/* Step number */}
                        <span className="font-amiri text-4xl font-bold" style={{ color: `${step.color}28` }}>
                          {step.step}
                        </span>
                      </div>

                      <h3 className="font-playfair text-lg font-semibold mb-1"
                        style={{ color: darkMode ? '#E8E0D0' : '#1A1A1A' }}>
                        {step.title}
                      </h3>
                      <p className="font-inter text-xs font-semibold mb-3 tracking-wide" style={{ color: step.color }}>
                        {step.subtitle}
                      </p>
                      <p className="font-inter text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {step.description}
                      </p>

                      {/* Hover bottom glow */}
                      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-b-3xl"
                        style={{ background: `linear-gradient(to top, ${step.glow}, transparent)` }} />
                    </motion.div>
                  </div>

                  {/* Dot */}
                  <TimelineDot color={step.color} index={i} inView />

                  {/* Spacer */}
                  <div className="hidden sm:block w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
