import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCalendar, FiClock } from 'react-icons/fi';
import { BsStarFill, BsMoonStarsFill } from 'react-icons/bs';
import { GiFlowerPot } from 'react-icons/gi';
import eventsBg from '../assets/events-bg.png';
import { VIEWPORT, revealTransition } from '../motion/presets';

const EVENTS = [
  {
    id: 'haldi',
    icon: <GiFlowerPot size={26} />,
    label: 'Haldi Ceremony',
    arabicLabel: 'حفل الهالدي',
    date: 'Wednesday, 10 June 2026',
    time: '10:00 PM — Onwards',
    description: 'Join us for the joyful Haldi celebration the evening before the Baraat. Family and close friends gather to bless the bride and groom with turmeric and prayers.',
    color: '#B8860B',
    bgColor: 'rgba(184,134,11,0.09)',
    borderColor: 'rgba(184,134,11,0.28)',
    glow: 'rgba(184,134,11,0.15)',
  },
  {
    id: 'baraat',
    icon: <BsMoonStarsFill size={26} />,
    label: 'Dep. of Baraat',
    arabicLabel: 'روانگی بارات',
    date: 'Thursday, 11 June 2026',
    time: '11:00 AM',
    description: "The groom's joyful procession departs for the bride's venue. Lights, flowers, and blessings mark this most auspicious occasion.",
    color: '#C9A84C',
    bgColor: 'rgba(201,168,76,0.09)',
    borderColor: 'rgba(201,168,76,0.28)',
    glow: 'rgba(201,168,76,0.18)',
  },
  {
    id: 'walima',
    icon: <BsStarFill size={26} />,
    label: 'Walima Reception',
    arabicLabel: 'دعوت ولیمہ',
    date: 'Friday, 12 June 2026',
    time: 'After Namaz-e-Juma',
    description: "Celebrate and share in the joy of this blessed union at the Walima banquet. Heartfelt food, prayers, and togetherness await.",
    color: '#1B6B47',
    bgColor: 'rgba(27,107,71,0.09)',
    borderColor: 'rgba(27,107,71,0.22)',
    glow: 'rgba(27,107,71,0.12)',
  },
];

function EventCard({ event, index, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={revealTransition(index * 0.08)}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: 'easeOut' } }}
      className="glass-card group relative flex flex-col p-5 sm:p-8 h-full"
      style={{
        borderColor: event.borderColor,
        boxShadow: `0 8px 36px rgba(0,0,0,0.06), 0 0 30px ${event.glow}`,
      }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
        style={{ background: `linear-gradient(to right, transparent, ${event.color}, transparent)` }} />

      {/* Icon badge with pulse ring */}
      <div className="relative inline-flex mb-6">
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10
            transition-transform duration-400 group-hover:scale-110"
          style={{
            background: event.bgColor,
            color: event.color,
            border: `1px solid ${event.borderColor}`,
          }}
        >
          {event.icon}
        </motion.div>
        {/* Subtle pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ border: `1.5px solid ${event.color}` }}
          animate={{ scale: [1, 1.28], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, delay: index * 0.6, repeat: Infinity, ease: 'easeOut' }}
        />
      </div>

      {/* Arabic */}
      <p className="font-amiri text-xl mb-1" style={{ color: event.color }}>{event.arabicLabel}</p>

      {/* English */}
      <h3 className="font-playfair text-xl font-semibold mb-3"
        style={{ color: darkMode ? '#E8E0D0' : '#1A1A1A' }}>
        {event.label}
      </h3>

      <div className="h-px mb-4" style={{ background: `linear-gradient(to right, ${event.color}80, transparent)` }} />

      <div className="flex items-center gap-2 mb-2">
        <FiCalendar size={13} style={{ color: event.color }} />
        <span className="font-inter text-sm font-medium" style={{ color: darkMode ? 'rgba(232,220,196,0.88)' : '#333' }}>{event.date}</span>
      </div>
      <div className="flex items-center gap-2 mb-5">
        <FiClock size={13} style={{ color: event.color }} />
        <span className="font-inter text-sm font-bold" style={{ color: event.color }}>{event.time}</span>
      </div>

      <p className="font-inter text-sm leading-relaxed mt-auto" style={{ color: darkMode ? 'rgba(232,220,196,0.82)' : '#3A3A3A' }}>
        {event.description}
      </p>

      {/* Bottom hover glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-b-3xl"
        style={{ background: `linear-gradient(to top, ${event.glow} 0%, transparent 100%)` }}
      />
    </motion.div>
  );
}

export default function EventDetails({ darkMode }) {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative py-16 sm:py-28 overflow-hidden site-section"
    >
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${eventsBg})`,
          filter: 'brightness(0.18) saturate(1.1)',
          opacity: darkMode ? 0.5 : 0.35,
        }} />
      
      <div className="absolute inset-0"
        style={{ background: darkMode ? 'rgba(21,32,16,0.8)' : 'rgba(245,239,224,0.85)' }} />

      <div className="absolute inset-0 islamic-pattern opacity-[0.05]" />

      <div className="max-w-5xl mx-auto relative z-10 px-4 sm:px-6">
        <div ref={ref} className="text-center mb-10 sm:mb-16">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.65 }}
            className="section-tag mb-3">
            Mark Your Calendar
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="font-playfair font-semibold mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: darkMode ? '#E8C97E' : '#1A1A1A' }}>
            Wedding Events
          </motion.h2>
          <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
            className="gold-divider w-32 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </section>
  );
}
