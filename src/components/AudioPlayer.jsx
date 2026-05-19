import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiVolume2, FiVolumeX, FiSkipForward, FiSkipBack, FiMusic, FiChevronUp } from 'react-icons/fi';

/*
  Playlist — Best Islamic Wedding Nasheeds
  Place your own MP3 files in /public/audio/ and update the url fields.
  These URLs are reliable free-to-stream sources.
*/
const TRACKS = [
  {
    title: 'Tala Al Badru Alayna',
    artist: 'Traditional Islamic Nasheed — Nikah',
    url: 'https://archive.org/download/tala-al-badru-alayna/Tala%20Al%20Badru%20Alayna.mp3',
  },
  {
    title: 'Masha Allah',
    artist: 'Maher Zain',
    url: 'https://archive.org/download/maher-zain-masha-allah/Masha%20Allah%20-%20Maher%20Zain.mp3',
  },
  {
    title: 'Baraka Allahu Lakuma',
    artist: 'Nikah Du\'a — Wedding Nasheed',
    url: 'https://archive.org/download/baraka-allahu-lakuma/Baraka%20Allahu%20Lakuma.mp3',
  },
  {
    title: 'Ya Nabi Salam Alayka',
    artist: 'Maher Zain',
    url: 'https://archive.org/download/ya-nabi-salam-alayka/Ya%20Nabi%20Salam%20Alayka.mp3',
  },
];


export default function AudioPlayer({ autoPlayDelay = 3200 }) {
  const [playing, setPlaying]   = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [volume, setVolume]     = useState(0.4);
  const [blocked, setBlocked]   = useState(false); // true when browser blocks autoplay
  const audioRef                = useRef(null);
  const track                   = TRACKS[trackIdx];

  /* ── Load audio whenever trackIdx changes ── */
  useEffect(() => {
    const audio = new Audio(track.url);
    audio.loop   = false;
    audio.volume = volume;
    audio.onended = () => goNext();
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ''; };
  }, [trackIdx]); // eslint-disable-line

  /* ── Sync volume ── */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  /* ── Auto-play after loading screen fades out ── */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!audioRef.current) return;
      audioRef.current.play()
        .then(() => { setPlaying(true); setBlocked(false); })
        .catch(() => { setBlocked(true); }); // browser blocked — show "tap to play" hint
    }, autoPlayDelay);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line

  const play  = () => { audioRef.current?.play().catch(() => {}); setPlaying(true); setBlocked(false); };
  const pause = () => { audioRef.current?.pause(); setPlaying(false); };
  const toggle = () => (playing ? pause() : play());

  const goNext = () => { pause(); setTrackIdx(i => (i + 1) % TRACKS.length); setTimeout(play, 80); };
  const goPrev = () => { pause(); setTrackIdx(i => (i - 1 + TRACKS.length) % TRACKS.length); setTimeout(play, 80); };

  const BAR_HEIGHTS = [40,55,70,90,60,80,50,75,45,65,85,55,70,40,90,60,75,50,85,65,45,80,55,70,40,90,60,75];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.0, duration: 0.7, type: 'spring', stiffness: 80 }}
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2"
    >
      {/* ── Expanded panel ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="rounded-2xl p-4 w-65 sm:w-72"
            style={{
              background: 'rgba(8,20,12,0.97)',
              border: '1px solid rgba(201,168,76,0.35)',
              backdropFilter: 'blur(22px)',
              boxShadow: '0 24px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.07)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <FiMusic size={11} style={{ color: '#C9A84C' }} />
              <span className="font-inter text-[10px] tracking-widest uppercase" style={{ color: 'rgba(201,168,76,0.6)' }}>
                Now Playing
              </span>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)' }} />
              <span className="font-inter text-[10px]" style={{ color: 'rgba(201,168,76,0.4)' }}>
                {trackIdx + 1}/{TRACKS.length}
              </span>
            </div>

            {/* Waveform */}
            <div className="flex items-end justify-center gap-px h-7 mb-3 px-1">
              {BAR_HEIGHTS.map((h, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 3,
                    background: playing
                      ? `rgba(201,168,76,${0.35 + (i % 4) * 0.16})`
                      : 'rgba(201,168,76,0.18)',
                  }}
                  animate={playing
                    ? { height: [`${h * 0.45}%`, `${h}%`, `${h * 0.55}%`, `${h}%`] }
                    : { height: '22%' }}
                  transition={playing
                    ? { duration: 0.55 + (i % 5) * 0.11, repeat: Infinity, ease: 'easeInOut', delay: i * 0.035 }
                    : { duration: 0.4 }}
                />
              ))}
            </div>

            {/* Track info */}
            <div className="text-center mb-4 px-1">
              <p className="font-playfair font-semibold text-sm leading-tight mb-0.5" style={{ color: '#F0D98A' }}>
                {track.title}
              </p>
              <p className="font-inter text-[10px]" style={{ color: 'rgba(201,168,76,0.5)' }}>
                {track.artist}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button onClick={goPrev}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ color: 'rgba(201,168,76,0.75)', background: 'rgba(201,168,76,0.08)' }}>
                <FiSkipBack size={14} />
              </button>

              <button onClick={toggle}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{
                  background: playing ? 'linear-gradient(135deg,#C9A84C,#A07830)' : 'rgba(201,168,76,0.12)',
                  border: '1px solid rgba(201,168,76,0.45)',
                  color: '#F0D98A',
                  boxShadow: playing ? '0 0 24px rgba(201,168,76,0.4)' : 'none',
                }}>
                {playing ? <FiVolume2 size={19} /> : <FiVolumeX size={19} />}
              </button>

              <button onClick={goNext}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ color: 'rgba(201,168,76,0.75)', background: 'rgba(201,168,76,0.08)' }}>
                <FiSkipForward size={14} />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 px-1">
              <FiVolumeX size={10} style={{ color: 'rgba(201,168,76,0.4)', flexShrink: 0 }} />
              <input
                type="range" min="0" max="1" step="0.05" value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  accentColor: '#C9A84C',
                  background: `linear-gradient(to right,#C9A84C ${volume*100}%,rgba(201,168,76,0.18) ${volume*100}%)`,
                }}
              />
              <FiVolume2 size={10} style={{ color: 'rgba(201,168,76,0.4)', flexShrink: 0 }} />
            </div>

            {/* Playlist */}
            <div className="mt-3 border-t pt-3" style={{ borderColor: 'rgba(201,168,76,0.12)' }}>
              {TRACKS.map((t, i) => (
                <button
                  key={i}
                  onClick={() => { pause(); setTrackIdx(i); setTimeout(play, 80); }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all hover:bg-white/5"
                  style={{ background: i === trackIdx ? 'rgba(201,168,76,0.1)' : 'transparent' }}
                >
                  <span style={{
                    fontSize: 9, color: i === trackIdx ? '#C9A84C' : 'rgba(201,168,76,0.3)',
                    fontFamily: 'monospace', minWidth: 14
                  }}>{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-inter text-[11px] truncate font-medium"
                      style={{ color: i === trackIdx ? '#F0D98A' : 'rgba(232,224,208,0.55)' }}>
                      {t.title}
                    </p>
                  </div>
                  {i === trackIdx && playing && (
                    <div className="flex items-end gap-px h-3 shrink-0">
                      {[0,1,2].map(j => (
                        <motion.div key={j} className="w-0.5 rounded-full"
                          style={{ background: '#C9A84C' }}
                          animate={{ height: ['30%','100%','50%','100%'] }}
                          transition={{ duration: 0.6, delay: j*0.15, repeat: Infinity }} />
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ── */}
      <div className="relative">
        {/* Ripple when playing & collapsed */}
        <AnimatePresence>
          {playing && !expanded && [0, 0.6, 1.2].map(delay => (
            <motion.div
              key={delay}
              className="absolute inset-0 rounded-full"
              style={{ border: '1px solid rgba(201,168,76,0.5)' }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.1, delay, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>

        {/* "Tap to play" hint badge when autoplay was blocked */}
        <AnimatePresence>
          {blocked && !expanded && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-inter pointer-events-none"
              style={{
                background: 'rgba(8,20,12,0.95)',
                border: '1px solid rgba(201,168,76,0.35)',
                color: '#F0D98A',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              🎵 Tap to play music
            </motion.div>
          )}
        </AnimatePresence>

        <button
          id="audio-toggle"
          onClick={() => { setExpanded(v => !v); if (blocked) { play(); } }}
          className="relative rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            width: 52, height: 52,
            background: playing
              ? 'linear-gradient(135deg,#C9A84C,#A07830)'
              : 'rgba(8,20,12,0.92)',
            border: '1px solid rgba(201,168,76,0.55)',
            boxShadow: playing
              ? '0 0 28px rgba(201,168,76,0.5), 0 4px 20px rgba(0,0,0,0.35)'
              : '0 4px 20px rgba(0,0,0,0.35)',
            color: '#F0D98A',
            backdropFilter: 'blur(12px)',
          }}
          aria-label="Music player"
        >
          <motion.div animate={expanded ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
            {expanded ? <FiChevronUp size={20} /> : <FiMusic size={19} />}
          </motion.div>
        </button>

        {/* Playing indicator dot */}
        <AnimatePresence>
          {playing && (
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full"
              style={{ background: '#4ade80', border: '1.5px solid rgba(8,20,12,0.9)',
                boxShadow: '0 0 8px rgba(74,222,128,0.6)' }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
