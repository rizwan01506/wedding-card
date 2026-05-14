import { motion } from 'framer-motion';
import { EASE, VIEWPORT } from '../motion/presets';

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  x = 0,
  duration = 0.75,
  ...props
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
