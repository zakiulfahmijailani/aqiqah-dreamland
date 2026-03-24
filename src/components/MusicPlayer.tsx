import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function FloatingNotes({ playing }: { playing: boolean }) {
  const [notes, setNotes] = useState<{ id: number; char: string; x: number }[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      const chars = ['♪', '♫', '♬', '♩'];
      counter.current += 1;
      setNotes((prev) => [
        ...prev.slice(-5),
        { id: counter.current, char: chars[counter.current % chars.length], x: Math.random() * 40 - 20 },
      ]);
    }, 1500);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {notes.map((n) => (
        <motion.span key={n.id} initial={{ opacity: 1, y: 0, x: n.x }} animate={{ opacity: 0, y: -60 }} transition={{ duration: 1.5 }} onAnimationComplete={() => setNotes((prev) => prev.filter((nn) => nn.id !== n.id))} className="absolute bottom-full text-sm" style={{ color: '#516161' }}>
          {n.char}
        </motion.span>
      ))}
    </div>
  );
}

function SoundWaveBars({ playing }: { playing: boolean }) {
  const delays = [0, 0.1, 0.2, 0.3, 0.4];
  const durations = [0.5, 0.6, 0.4, 0.7, 0.5];
  return (
    <div className="flex items-end gap-0.5 h-4">
      {delays.map((d, i) => (
        <motion.div key={i} className="w-0.5 rounded-full" style={{ backgroundColor: '#516161' }} animate={playing ? { height: ['4px', '16px', '4px'] } : { height: '4px' }} transition={{ duration: durations[i], delay: d, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const prefersReduced = useReducedMotion();
  const hasInteracted = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => { setPlaying(true); hasInteracted.current = true; }).catch(() => {
      const handleFirstInteraction = () => {
        if (hasInteracted.current) return;
        hasInteracted.current = true;
        audio.play().then(() => setPlaying(true)).catch(() => {});
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      };
      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction);
      document.addEventListener('keydown', handleFirstInteraction);
    });
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); } else { audio.play(); }
    setPlaying((prev) => !prev);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button onClick={toggle} className="relative w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center" whileTap={{ scale: 0.9 }}>
        {playing && (<motion.div className="absolute inset-0 rounded-full" style={{ backgroundColor: 'rgba(81,97,97,0.2)' }} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />)}
        {playing ? (
          <svg className="w-5 h-5" fill="#516161" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
        ) : (
          <svg className="w-5 h-5" fill="#516161" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        )}
        <div className="absolute -top-6"><SoundWaveBars playing={playing} /></div>
        {playing && !prefersReduced && <FloatingNotes playing={playing} />}
      </motion.button>
      <audio ref={audioRef} src="/audio/maryam.mp4" loop preload="auto" />
    </div>
  );
}
