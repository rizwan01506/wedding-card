import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: 'Days',    value: timeLeft.days },
    { label: 'Hours',   value: timeLeft.hours },
    { label: 'Mins',    value: timeLeft.minutes },
    { label: 'Secs',    value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2 sm:gap-4 justify-center flex-wrap">
      {units.map(({ label, value }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 1.2, type: 'spring', stiffness: 80, damping: 16 }}
          className="flex flex-col items-center"
        >
          {/* Box */}
          <div
            className="relative flex items-center justify-center rounded-xl overflow-hidden"
            style={{
              width: 'clamp(42px, 11vw, 68px)',
              height: 'clamp(42px, 11vw, 68px)',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.16) 0%, rgba(201,168,76,0.06) 100%)',
              border: '1px solid rgba(201,168,76,0.42)',
              boxShadow: '0 0 20px rgba(201,168,76,0.14), inset 0 1px 0 rgba(232,201,126,0.14)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Top shimmer */}
            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(232,201,126,0.5), transparent)' }} />

            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ y: -14, opacity: 0 }}
                animate={{ y: 0,   opacity: 1 }}
                exit={{    y:  14, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="font-playfair font-bold tabular-nums select-none"
                style={{
                  fontSize: 'clamp(1rem, 3.5vw, 1.5rem)',
                  color: '#F0D98A',
                  textShadow: '0 0 14px rgba(232,201,126,0.55)',
                }}
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Label */}
          <span
            className="mt-1 font-inter uppercase tracking-widest select-none"
            style={{
              fontSize: 'clamp(0.48rem, 1.4vw, 0.6rem)',
              color: 'rgba(232,201,126,0.65)',
              textShadow: '0 1px 6px rgba(0,0,0,0.8)',
            }}
          >
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
