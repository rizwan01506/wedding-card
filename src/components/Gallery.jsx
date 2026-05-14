import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { FiZoomIn } from 'react-icons/fi';

import g1 from '../assets/gallery-1.jpg';
import g2 from '../assets/gallery-2.jpg';
import g3 from '../assets/gallery-3.jpg';
import g4 from '../assets/gallery-4.jpg';
import g5 from '../assets/gallery-5.jpg';
import g6 from '../assets/gallery-6.jpg';
import groomImg from '../assets/groom.jpg';
import brideImg from '../assets/bride.jpg';

const IMAGES = [
  { src: g1, alt: 'Pre-wedding Garden Shoot' },
  { src: g2, alt: 'Nikah Ceremony' },
  { src: groomImg, alt: 'The Groom' },
  { src: g3, alt: 'Baraat Procession' },
  { src: g4, alt: 'Walima Reception' },
  { src: brideImg, alt: 'The Bride' },
  { src: g5, alt: 'Bridal Mehndi' },
  { src: g6, alt: 'Wedding Stage Decor' },
];

const GRID_SPANS = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-2 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
];

export default function Gallery({ darkMode }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6">
      <div className="absolute inset-0 islamic-pattern opacity-5" />

      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="text-center mb-14">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
            className="section-tag mb-3">
            Memories
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair font-semibold mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: darkMode ? '#E8C97E' : '#1A1A1A' }}>
            Photo Gallery
          </motion.h2>
          <div className="gold-divider w-32 mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-48 gap-3 sm:gap-4"
          style={{ gridAutoRows: '180px' }}>
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              className={`gallery-item ${GRID_SPANS[i]}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              onClick={() => setLightboxIndex(i)}
            >
              <img src={img.src} alt={img.alt} />
              <div className="gallery-overlay">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201,168,76,0.85)', color: '#fff' }}>
                  <FiZoomIn size={22} />
                </div>
              </div>
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                <p className="font-inter text-xs text-white">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={IMAGES}
        styles={{
          container: { backgroundColor: 'rgba(10,26,16,0.96)' },
        }}
      />
    </section>
  );
}
