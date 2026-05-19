import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMapPin, FiExternalLink, FiNavigation } from 'react-icons/fi';
import { VIEWPORT, revealTransition } from '../motion/presets';

const VENUES = [
  {
    id: 'haldi-venue',
    event: 'Haldi',
    arabicLabel: 'حفل الهالدي',
    name: "Bride's Residence — Village Rampur Saghari",
    address: 'Village Rampur Saghari, Via: Aurai, Dist: Muzaffarpur, Bihar 843312',
    details: "The Haldi ceremony will be held at the bride's family home on the evening of 10 June 2026 at 10:00 PM. Family and friends are warmly invited.",
    mapUrl: 'https://maps.google.com/?q=Rampur+Saghari+Muzaffarpur+Bihar+843312',
    color: '#B8860B',
    bgColor: 'rgba(184,134,11,0.07)',
    borderColor: 'rgba(184,134,11,0.28)',
    icon: <FiMapPin size={22} />,
  },
  {
    id: 'baraat-venue',
    event: 'Baraat',
    arabicLabel: 'مكان البارات',
    name: "Bride's Residence — Village Rampur Saghari",
    address: 'Village Rampur Saghari, Via: Aurai, Dist: Muzaffarpur, Bihar 843312',
    details: "The groom's procession will arrive at the bride's family home after Zuhr Namaaz on 11 June 2026, in a joyful celebration of lights and blessings.",
    mapUrl: 'https://maps.google.com/?q=Rampur+Saghari+Muzaffarpur+Bihar+843312',
    color: '#C9A84C',
    bgColor: 'rgba(201,168,76,0.07)',
    borderColor: 'rgba(201,168,76,0.28)',
    icon: <FiNavigation size={22} />,
  },
  {
    id: 'walima-venue',
    event: 'Walima',
    arabicLabel: 'مكان الوليمة',
    name: "Groom's Residence — Village Rampur Saghari",
    address: 'Village Rampur Saghari, Via: Aurai, Dist: Muzaffarpur, Bihar 843312',
    details: "The Walima feast will be hosted at the groom's family home after Zuhr Namaaz on 12 June 2026. Join us for food, joy, and heartfelt blessings.",
    mapUrl: 'https://maps.google.com/?q=Rampur+Saghari+Muzaffarpur+Bihar+843312',
    color: '#1B6B47',
    bgColor: 'rgba(27,107,71,0.07)',
    borderColor: 'rgba(27,107,71,0.22)',
    icon: <FiMapPin size={22} />,
  },
];

function VenueCard({ venue, index, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={revealTransition(index * 0.08)}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: 'easeOut' } }}
      className="glass-card group p-7 sm:p-8 relative flex flex-col"
      style={{ borderColor: venue.borderColor }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
        style={{ background: `linear-gradient(to right, transparent, ${venue.color}, transparent)` }} />

      {/* Event badge */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-400 group-hover:scale-110"
            style={{ background: venue.bgColor, color: venue.color, border: `1px solid ${venue.borderColor}` }}
          >
            {venue.icon}
          </div>
          {/* Ripple */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ border: `1.5px solid ${venue.color}` }}
            animate={{ scale: [1, 1.32], opacity: [0.5, 0] }}
            transition={{ duration: 2.2, delay: index * 0.7, repeat: Infinity, ease: 'easeOut' }}
          />
        </div>
        <div>
          <span className="font-inter text-xs tracking-[0.22em] uppercase block" style={{ color: venue.color }}>{venue.event} Venue</span>
          <p className="font-amiri text-base leading-tight" style={{ color: venue.color }}>{venue.arabicLabel}</p>
        </div>
      </div>

      <div className="h-px mb-5" style={{ background: `linear-gradient(to right, ${venue.color}55, transparent)` }} />

      <h3 className="font-playfair text-lg font-semibold mb-2"
        style={{ color: darkMode ? '#E8E0D0' : '#1A1A1A' }}>
        {venue.name}
      </h3>

      <div className="flex items-start gap-2 mb-3">
        <FiMapPin size={13} className="mt-0.5 flex-shrink-0" style={{ color: venue.color }} />
        <p className="font-inter text-sm" style={{ color: 'var(--text-muted)' }}>{venue.address}</p>
      </div>

      <p className="font-inter text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--text-muted)' }}>
        {venue.details}
      </p>

      <motion.a
        href={venue.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ x: 4 }}
        className="inline-flex items-center gap-2 font-inter text-sm font-medium transition-all duration-200 mt-auto"
        style={{ color: venue.color }}
      >
        <FiExternalLink size={13} />
        View on Google Maps
      </motion.a>

      {/* Hover bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-b-3xl"
        style={{ background: `linear-gradient(to top, ${venue.bgColor}, transparent)` }}
      />
    </motion.div>
  );
}

export default function VenueDetails({ darkMode }) {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={sectionRef} id="venue" className="relative py-28 overflow-hidden site-section">
      <motion.div
        className="absolute inset-0 islamic-pattern opacity-[0.05]"
        animate={{ opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 65%)',
      }} />

      <div className="max-w-5xl mx-auto relative z-10 px-4 sm:px-6">
        <div ref={ref} className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.65 }}
            className="section-tag mb-3">
            Where We Gather
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="font-playfair font-semibold mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: darkMode ? '#E8C97E' : '#1A1A1A' }}>
            Venue Details
          </motion.h2>
          <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.18 }}
            className="gold-divider w-32 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {VENUES.map((venue, i) => (
            <VenueCard key={venue.id} venue={venue} index={i} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </section>
  );
}
