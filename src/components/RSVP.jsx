import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiUser, FiUsers, FiMessageCircle, FiSend, FiCheck } from 'react-icons/fi';

export default function RSVP({ darkMode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [form, setForm] = useState({ name: '', guests: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!form.guests || isNaN(form.guests) || Number(form.guests) < 1)
      errs.guests = 'Please enter a valid number of guests (min. 1).';
    if (Number(form.guests) > 10) errs.guests = 'Maximum 10 guests per RSVP.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 1800);
    }
  };

  const inputStyle = {
    background: darkMode ? 'rgba(28,43,30,0.6)' : 'rgba(255,255,255,0.8)',
    color: darkMode ? '#E8E0D0' : '#1A1A1A',
  };

  return (
    <section id="rsvp" className="relative py-24 px-4 sm:px-6"
      style={{ background: darkMode ? 'rgba(22,32,16,0.4)' : 'rgba(245,239,224,0.4)' }}>
      <div className="absolute inset-0 islamic-pattern opacity-5" />

      <div className="max-w-2xl mx-auto">
        <div ref={ref} className="text-center mb-12">
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
            className="section-tag mb-3">
            You're Invited
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair font-semibold mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: darkMode ? '#E8C97E' : '#1A1A1A' }}>
            RSVP
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            className="font-inter text-sm"
            style={{ color: 'var(--text-muted)' }}>
            Please confirm your attendance by November 30, 2026
          </motion.p>
          <div className="gold-divider w-32 mx-auto mt-4" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-10 sm:p-14 text-center"
                style={{ border: '1px solid rgba(27,107,71,0.35)' }}
              >
                {/* Success icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 180 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'rgba(27,107,71,0.1)', border: '2px solid #1B6B47' }}
                >
                  <FiCheck size={36} style={{ color: '#1B6B47' }} />
                </motion.div>
                <h3 className="font-playfair text-2xl font-semibold mb-3" style={{ color: '#1B6B47' }}>
                  JazakAllah Khair!
                </h3>
                <p className="font-amiri text-xl mb-3" style={{ color: '#C9A84C' }}>
                  بَارَكَ اللَّهُ لَكُمْ
                </p>
                <p className="font-inter text-sm" style={{ color: 'var(--text-muted)' }}>
                  Your RSVP has been received. We look forward to celebrating with you, <strong>{form.name}</strong>!
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="glass-card p-6 sm:p-10"
                noValidate
              >
                {/* Name */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 font-inter text-sm font-medium mb-2" style={{ color: '#C9A84C' }}>
                    <FiUser size={14} /> Full Name *
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="form-input"
                    style={inputStyle}
                  />
                  {errors.name && <p className="font-inter text-xs mt-1.5" style={{ color: '#E05252' }}>{errors.name}</p>}
                </div>

                {/* Guests */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 font-inter text-sm font-medium mb-2" style={{ color: '#C9A84C' }}>
                    <FiUsers size={14} /> Number of Guests *
                  </label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    placeholder="How many guests? (max 10)"
                    min="1"
                    max="10"
                    value={form.guests}
                    onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}
                    className="form-input"
                    style={inputStyle}
                  />
                  {errors.guests && <p className="font-inter text-xs mt-1.5" style={{ color: '#E05252' }}>{errors.guests}</p>}
                </div>

                {/* Message */}
                <div className="mb-7">
                  <label className="flex items-center gap-2 font-inter text-sm font-medium mb-2" style={{ color: '#C9A84C' }}>
                    <FiMessageCircle size={14} /> Message (optional)
                  </label>
                  <textarea
                    id="rsvp-message"
                    placeholder="Share your wishes for the couple..."
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="form-input resize-none"
                    style={inputStyle}
                  />
                </div>

                {/* Submit */}
                <button
                  id="rsvp-submit"
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full flex items-center justify-center gap-2 text-base"
                  style={{ opacity: loading ? 0.8 : 1 }}
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiSend size={16} />
                      Confirm Attendance
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
