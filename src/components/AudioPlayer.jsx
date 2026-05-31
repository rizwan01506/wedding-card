import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiVolume2, FiVolumeX, FiMusic, FiChevronUp, FiSkipForward, FiSkipBack } from 'react-icons/fi';

/* ── Wedding song playlist ── */
const PLAYLIST = [
  { id: '_mTs3eloDpg', title: 'Wedding Song 1' },
  { id: '5wjO-1aqjuQ', title: 'Wedding Song 2' },
  { id: 'XR7qvTgQ19o', title: 'Wedding Song 3' },
];

export default function AudioPlayer({ autoPlayDelay = 1800 }) {
  const [playing,  setPlaying]  = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [volume,   setVolume]   = useState(50);
  const [blocked,  setBlocked]  = useState(false);
  const [ytReady,  setYtReady]  = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);

  const playerRef = useRef(null);
  const timerRef  = useRef(null);
  const idxRef    = useRef(0); /* mirror of trackIdx for use inside YT callbacks */

  /* keep idxRef in sync */
  useEffect(() => { idxRef.current = trackIdx; }, [trackIdx]);

  /* ── Bootstrap YouTube IFrame API ── */
  useEffect(() => {
    const createPlayer = () => {
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player('yt-bg-player', {
        videoId: PLAYLIST[0].id,
        playerVars: {
          autoplay:       0,
          controls:       0,
          modestbranding: 1,
          rel:            0,
          iv_load_policy: 3,
          fs:             0,
          disablekb:      1,
        },
        events: {
          onReady: (e) => {
            setYtReady(true);
            e.target.setVolume(volume);
            timerRef.current = setTimeout(() => e.target.playVideo(), autoPlayDelay);
          },
          onStateChange: (e) => {
            const S = window.YT.PlayerState;
            if (e.data === S.PLAYING) {
              setPlaying(true);
              setBlocked(false);
            } else if (e.data === S.PAUSED) {
              setPlaying(false);
            } else if (e.data === S.ENDED) {
              /* Auto-advance to next song */
              const next = (idxRef.current + 1) % PLAYLIST.length;
              setTrackIdx(next);
              idxRef.current = next;
              e.target.loadVideoById(PLAYLIST[next].id);
            }
          },
          onError: () => setBlocked(true),
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); createPlayer(); };

      if (!document.getElementById('yt-api-script')) {
        const s = document.createElement('script');
        s.id    = 'yt-api-script';
        s.src   = 'https://www.youtube.com/iframe_api';
        s.async = true;
        document.head.appendChild(s);
      }
    }

    return () => {
      clearTimeout(timerRef.current);
      try { playerRef.current?.destroy(); } catch (_) {}
      playerRef.current = null;
    };
  }, []); // eslint-disable-line

  /* ── Volume sync ── */
  useEffect(() => {
    playerRef.current?.setVolume?.(volume);
  }, [volume]);

  /* ── Controls ── */
  const play  = () => { playerRef.current?.playVideo();  setBlocked(false); };
  const pause = () =>   playerRef.current?.pauseVideo();
  const toggle = () => (playing ? pause() : play());

  const goNext = () => {
    const next = (trackIdx + 1) % PLAYLIST.length;
    setTrackIdx(next);
    playerRef.current?.loadVideoById(PLAYLIST[next].id);
  };

  const goPrev = () => {
    const prev = (trackIdx - 1 + PLAYLIST.length) % PLAYLIST.length;
    setTrackIdx(prev);
    playerRef.current?.loadVideoById(PLAYLIST[prev].id);
  };

  const BAR_HEIGHTS = [40,55,70,90,60,80,50,75,45,65,85,55,70,40,90,60,75,50,85,65,45,80,55,70,40,90,60,75];

  return (
    <>
      {/* Off-screen YouTube player div */}
      <div
        id="yt-bg-player"
        style={{ position: 'fixed', left: '-9999px', top: '-9999px', width: 1, height: 1, pointerEvents: 'none', zIndex: -1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.7, type: 'spring', stiffness: 80 }}
        className="fixed bottom-24 right-3 sm:bottom-24 sm:right-5 z-950 flex flex-col items-end gap-2"
      >
        {/* ── Expanded panel ── */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.92 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="rounded-2xl p-4 w-72 max-w-[calc(100vw-1.5rem)]"
              style={{
                background:     'rgba(8,20,12,0.97)',
                border:         '1px solid rgba(201,168,76,0.35)',
                backdropFilter: 'blur(22px)',
                boxShadow:      '0 24px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.07)',
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
                  {trackIdx + 1} / {PLAYLIST.length}
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
              <div className="text-center mb-4">
                <p className="font-playfair font-semibold text-sm mb-0.5" style={{ color: '#F0D98A' }}>
                  {PLAYLIST[trackIdx].title}
                </p>
                <p className="font-inter text-[10px]" style={{ color: 'rgba(201,168,76,0.5)' }}>
                  Wedding Special ✦ Auto Loop
                </p>
              </div>

              {/* Controls: Prev · Play/Pause · Next */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={goPrev}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                  style={{ color: 'rgba(201,168,76,0.8)', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
                >
                  <FiSkipBack size={15} />
                </button>

                <button
                  onClick={() => { if (!ytReady) return; toggle(); }}
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                  style={{
                    background: playing ? 'linear-gradient(135deg,#C9A84C,#A07830)' : 'rgba(201,168,76,0.12)',
                    border:     '1px solid rgba(201,168,76,0.45)',
                    color:      '#F0D98A',
                    boxShadow:  playing ? '0 0 28px rgba(201,168,76,0.45)' : 'none',
                    opacity:    ytReady ? 1 : 0.5,
                  }}
                >
                  {playing ? <FiVolume2 size={22} /> : <FiVolumeX size={22} />}
                </button>

                <button
                  onClick={goNext}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                  style={{ color: 'rgba(201,168,76,0.8)', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
                >
                  <FiSkipForward size={15} />
                </button>
              </div>

              {/* Volume slider */}
              <div className="flex items-center gap-2 px-1">
                <FiVolumeX size={10} style={{ color: 'rgba(201,168,76,0.4)', flexShrink: 0 }} />
                <input
                  type="range" min="0" max="100" step="5" value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                  style={{
                    accentColor: '#C9A84C',
                    background: `linear-gradient(to right,#C9A84C ${volume}%,rgba(201,168,76,0.18) ${volume}%)`,
                  }}
                />
                <FiVolume2 size={10} style={{ color: 'rgba(201,168,76,0.4)', flexShrink: 0 }} />
              </div>

              {/* Playlist */}
              <div className="mt-3 border-t pt-3" style={{ borderColor: 'rgba(201,168,76,0.12)' }}>
                {PLAYLIST.map((track, i) => (
                  <button
                    key={track.id}
                    onClick={() => { setTrackIdx(i); playerRef.current?.loadVideoById(track.id); }}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all hover:bg-white/5"
                    style={{ background: i === trackIdx ? 'rgba(201,168,76,0.1)' : 'transparent' }}
                  >
                    <span style={{ fontSize: 9, color: i === trackIdx ? '#C9A84C' : 'rgba(201,168,76,0.3)', fontFamily: 'monospace', minWidth: 14 }}>
                      {i + 1}
                    </span>
                    <span className="font-inter text-[11px] font-medium flex-1"
                      style={{ color: i === trackIdx ? '#F0D98A' : 'rgba(232,224,208,0.55)' }}>
                      {track.title}
                    </span>
                    {i === trackIdx && playing && (
                      <div className="flex items-end gap-px h-3 shrink-0">
                        {[0, 1, 2].map(j => (
                          <motion.div key={j} className="w-0.5 rounded-full"
                            style={{ background: '#C9A84C' }}
                            animate={{ height: ['30%', '100%', '50%', '100%'] }}
                            transition={{ duration: 0.6, delay: j * 0.15, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Status */}
              {!ytReady && (
                <p className="text-center font-inter text-[10px] mt-2" style={{ color: 'rgba(201,168,76,0.5)' }}>Loading…</p>
              )}
              {ytReady && blocked && (
                <p className="text-center font-inter text-[10px] mt-2" style={{ color: 'rgba(201,168,76,0.65)' }}>🎵 Tap ▶ to start</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Floating button ── */}
        <div className="relative">
          <AnimatePresence>
            {playing && !expanded && [0, 0.65, 1.3].map(delay => (
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

          <AnimatePresence>
            {blocked && !expanded && (
              <motion.div
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-inter pointer-events-none"
                style={{ background: 'rgba(8,20,12,0.95)', border: '1px solid rgba(201,168,76,0.35)', color: '#F0D98A', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
              >
                🎵 Tap to play music
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => { setExpanded(v => !v); if (blocked && ytReady) play(); }}
            className="relative rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              width: 52, height: 52,
              background:     playing ? 'linear-gradient(135deg,#C9A84C,#A07830)' : 'rgba(8,20,12,0.92)',
              border:         '1px solid rgba(201,168,76,0.55)',
              boxShadow:      playing ? '0 0 28px rgba(201,168,76,0.5), 0 4px 20px rgba(0,0,0,0.35)' : '0 4px 20px rgba(0,0,0,0.35)',
              color:          '#F0D98A',
              backdropFilter: 'blur(12px)',
            }}
            aria-label="Music player"
          >
            <motion.div animate={expanded ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
              {expanded ? <FiChevronUp size={20} /> : <FiMusic size={19} />}
            </motion.div>
          </button>

          <AnimatePresence>
            {playing && (
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full"
                style={{ background: '#4ade80', border: '1.5px solid rgba(8,20,12,0.9)', boxShadow: '0 0 8px rgba(74,222,128,0.6)' }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
