import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiUser, FiUsers, FiMapPin, FiHome, FiHeart,
} from 'react-icons/fi';
import { BsMoonStarsFill } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';

/* ─── Data ─────────────────────────────────────── */
const FAMILY = {
  brothers: ['Md Usman', 'Md Rizwan', 'Md Irfan'],
  sisters:  ['Razia Fatma'],
  nephews:  ['Ayaan Ahmad', 'Rayyan Ahmad'],
  address:  'Rampur Saghri, Via Aurai\nDist. Muzaffarpur (Bihar)\nPin — 843312',
};

/* ─── Animated section heading ──────────────────── */
function SectionHead({ tag, title, verse, verseRef, inView }) {
  return (
    <div className="text-center mb-14 sm:mb-16">
      <motion.p className="section-tag mb-3"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: .6 }}>
        {tag}
      </motion.p>
      <motion.h2 className="font-playfair font-semibold mb-4"
        style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}
        initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .75, delay: .08, ease: [.22,1,.36,1] }}>
        {title}
      </motion.h2>
      {verse && (
        <motion.p className="font-amiri text-xl" style={{ color: 'var(--gold)' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: .7, delay: .18 }}>
          {verse}
        </motion.p>
      )}
      {verseRef && (
        <p className="font-inter text-xs mt-1" style={{ color: 'var(--txt-muted)' }}>{verseRef}</p>
      )}
      <motion.div className="w-32 gold-line mx-auto mt-5"
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: .7, delay: .22 }} />
    </div>
  );
}

/* ─── Member chip ───────────────────────────────── */
function Chip({ name, i }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: .88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * .06, duration: .38 }}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-inter text-sm"
      style={{
        background: 'rgba(201,168,76,.09)',
        border: '1px solid rgba(201,168,76,.22)',
        color: 'inherit',
      }}
    >
      <span style={{ color: 'var(--gold)', fontSize: '.6rem' }}>✦</span>
      {name}
    </motion.span>
  );
}

/* ─── Category card ─────────────────────────────── */
function CatCard({ icon, label, accentColor, children, delay = 0 }) {
  return (
    <motion.div
      className="glass-card p-5 sm:p-6"
      style={{ borderColor: `${accentColor}28` }}
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: .65, delay, ease: [.22,1,.36,1] }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${accentColor}12`, color: accentColor, border: `1px solid ${accentColor}28` }}>
          {icon}
        </div>
        <span className="font-inter text-xs font-semibold tracking-[.22em] uppercase" style={{ color: accentColor }}>
          {label}
        </span>
      </div>
      {children}
    </motion.div>
  );
}

/* ─── Main ──────────────────────────────────────── */
export default function GroomFamily({ darkMode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="family" className="section-wrap"
      style={{ background: darkMode ? 'rgba(16,28,18,.5)' : 'rgba(245,239,224,.55)' }}>
      <div className="absolute inset-0 islamic-pattern opacity-[.04]" />

      <div className="max-w-5xl mx-auto relative">
        <div ref={ref}>
          <SectionHead
            tag="With Love & Pride"
            title="Groom's Family"
            verse='"And We have made you peoples and tribes that you may know one another"'
            verseRef="— Quran 49:13"
            inView={inView}
          />
        </div>

        {/* ── Groom hero card ── */}
        <motion.div
          className="glass-card mb-8 overflow-hidden relative"
          style={{ border: '1px solid rgba(201,168,76,.3)' }}
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .75, ease: [.22,1,.36,1] }}
        >
          {/* Tri-colour top bar */}
          <div className="h-1.5"
            style={{ background: 'linear-gradient(to right, #1B6B47 0%, #C9A84C 50%, #1B6B47 100%)' }} />

          <div className="p-7 sm:p-9 flex flex-col sm:flex-row items-center gap-5">
            {/* Moon icon */}
            <div className="w-18 h-18 rounded-full flex-shrink-0 flex items-center justify-center w-20 h-20"
              style={{
                background: 'linear-gradient(135deg,rgba(201,168,76,.14),rgba(27,107,71,.14))',
                border: '2px solid rgba(201,168,76,.35)',
              }}>
              <BsMoonStarsFill size={30} style={{ color: 'var(--gold)' }} />
            </div>

            <div className="text-center sm:text-left">
              <p className="section-tag mb-1">The Groom</p>
              <h3 className="font-playfair font-semibold gold-text"
                style={{ fontSize: 'clamp(1.9rem,4vw,2.7rem)' }}>
                Md Suleman
              </h3>
              <p className="font-cormorant text-lg mt-1" style={{ color: 'var(--txt-muted)', fontStyle: 'italic' }}>
                Son of Vahidul Rahman
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 2-col grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          {/* Father */}
          <CatCard icon={<FiUser size={17} />} label="Father" accentColor="#C9A84C" delay={.05}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(201,168,76,.07)', border: '1px solid rgba(201,168,76,.15)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(201,168,76,.14)', color: 'var(--gold)' }}>
                <FiUser size={14} />
              </div>
              <span className="font-playfair text-lg font-semibold">Vahidul Rahman</span>
            </div>
          </CatCard>

          {/* Sister */}
          <CatCard icon={<FiHeart size={17} />} label="Sister" accentColor="#1B6B47" delay={.1}>
            <div className="flex flex-wrap gap-2">
              {FAMILY.sisters.map((n, i) => <Chip key={n} name={n} i={i} />)}
            </div>
          </CatCard>

          {/* Brothers */}
          <CatCard icon={<HiOutlineUserGroup size={19} />} label="Brothers" accentColor="#C9A84C" delay={.15}>
            <div className="flex flex-wrap gap-2">
              {FAMILY.brothers.map((n, i) => <Chip key={n} name={n} i={i} />)}
            </div>
          </CatCard>

          {/* Nephews */}
          <CatCard icon={<FiUsers size={17} />} label="Nephews (Bhateeja)" accentColor="#A07830" delay={.2}>
            <div className="flex flex-wrap gap-2">
              {FAMILY.nephews.map((n, i) => <Chip key={n} name={n} i={i} />)}
            </div>
          </CatCard>
        </div>

        {/* ── Address ── */}
        <motion.div
          className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{ borderColor: 'rgba(27,107,71,.28)' }}
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .65, delay: .25, ease: [.22,1,.36,1] }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(27,107,71,.08)', border: '1px solid rgba(27,107,71,.22)', color: '#1B6B47' }}>
            <FiHome size={22} />
          </div>

          <div className="flex-1">
            <span className="font-inter text-xs tracking-[.22em] uppercase font-semibold"
              style={{ color: '#1B6B47' }}>Home Address</span>
            <div className="flex items-start gap-2 mt-2">
              <FiMapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#1B6B47' }} />
              <p className="font-cormorant text-xl leading-snug"
                style={{ color: darkMode ? '#EDE5D5' : '#1A1A1A', whiteSpace: 'pre-line', fontStyle: 'italic' }}>
                {FAMILY.address}
              </p>
            </div>
          </div>

          <a id="family-map-link"
            href="https://maps.google.com/?q=Rampur+Saghri+Muzaffarpur+Bihar"
            target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 font-inter text-xs font-semibold tracking-wide transition-all px-4 py-2 rounded-full"
            style={{
              color: '#1B6B47',
              border: '1.5px solid rgba(27,107,71,.35)',
              textDecoration: 'none',
              background: 'rgba(27,107,71,.06)',
            }}
          >
            View on Map
          </a>
        </motion.div>
      </div>
    </section>
  );
}
