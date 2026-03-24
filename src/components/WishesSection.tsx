import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { supabase } from '@/lib/supabase';

interface Wish { id: string; name: string; message: string; created_at: string; }
type SubmitState = 'idle' | 'loading';
const PASTEL_COLORS = ['#B5EAD7', '#FFDAC1', '#C7CEEA', '#FFB7C5', '#E2F0CB'];
const MAX_LENGTH = 300;

function formatRelativeTime(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);
  if (minutes < 1) return 'Baru saja';
  if (minutes < 60) return `${minutes} menit yang lalu`;
  if (hours < 24) return `${hours} jam yang lalu`;
  return `${days} hari yang lalu`;
}

function CornerIcon({ type }: { type: number }) {
  const icons = [
    <svg key="s" width="14" height="14" viewBox="0 0 24 24" fill="#e9c349" fillOpacity="0.4"><polygon points="12,2 15,10 24,10 17,15 19,24 12,19 5,24 7,15 0,10 9,10" /></svg>,
    <svg key="h" width="14" height="14" viewBox="0 0 24 24" fill="#FFB7C5" fillOpacity="0.5"><path d="M12,21 C12,21 3,13 3,8 A5,5,0,0,1,12,5 A5,5,0,0,1,21,8 C21,13 12,21 12,21Z" /></svg>,
    <svg key="m" width="14" height="14" viewBox="0 0 24 24" fill="#C7CEEA" fillOpacity="0.5"><path d="M12,2 A10,10,0,0,0,12,22 A7,7,0,0,1,12,2Z" /></svg>,
  ];
  return <div className="absolute top-3 right-3 animate-float motion-reduce:animate-none">{icons[type % 3]}</div>;
}

function RollingHills() {
  return (
    <div className="absolute bottom-0 left-0 w-full pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 800 120" preserveAspectRatio="none" className="w-full h-24">
        <path d="M0,80 Q200,20 400,80 Q600,140 800,80 L800,120 L0,120Z" fill="#B5EAD7" opacity="0.15" />
        <path d="M0,90 Q150,50 350,90 Q550,130 800,90 L800,120 L0,120Z" fill="#E2F0CB" opacity="0.15" />
      </svg>
      {[10, 25, 50, 70, 85].map((left, i) => (
        <div key={i} className="absolute bottom-8 animate-sway motion-reduce:animate-none" style={{ left: `${left}%`, animationDelay: `${i * 0.3}s`, transformOrigin: 'bottom center' }}>
          <svg width="16" height="40" viewBox="0 0 16 40">
            <line x1="8" y1="40" x2="8" y2="12" stroke="#6b8f71" strokeWidth="1.5" />
            <circle cx="8" cy="10" r="5" fill={PASTEL_COLORS[i % PASTEL_COLORS.length]} />
            <circle cx="8" cy="10" r="2" fill="#e9c349" opacity="0.6" />
          </svg>
        </div>
      ))}
    </div>
  );
}

function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <svg key={i} className="absolute animate-float motion-reduce:animate-none" style={{ left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 25}%`, animationDelay: `${i * 0.6}s`, opacity: 0.12 }} width="18" height="18" viewBox="0 0 24 24" fill="#FFB7C5">
          <path d="M12,21 C12,21 3,13 3,8 A5,5,0,0,1,12,5 A5,5,0,0,1,21,8 C21,13 12,21 12,21Z" />
        </svg>
      ))}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="inline-block w-5 h-5 animate-spin ml-2" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M12,2 A10,10,0,0,1,22,12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl p-5 shadow-sm bg-white/40 animate-pulse">
      <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
      <div className="h-3 w-full bg-gray-200 rounded mb-2" />
      <div className="h-3 w-3/4 bg-gray-200 rounded" />
    </div>
  );
}

export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loadingWishes, setLoadingWishes] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitError, setSubmitError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const errorShake = useAnimation();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    async function fetchWishes() {
      const { data } = await supabase.from('wishes').select('*').order('created_at', { ascending: false });
      if (data) setWishes(data as Wish[]);
      setLoadingWishes(false);
    }
    fetchWishes();
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!name.trim() || !message.trim()) {
      errorShake.start({ x: [-8, 8, -8, 8, 0], transition: { duration: 0.3 } });
      return;
    }
    setSubmitState('loading');
    setSubmitError(false);
    const { data, error } = await supabase.from('wishes').insert([{ name: name.trim(), message: message.trim() }]).select().single();
    if (error) {
      setSubmitState('idle');
      setSubmitError(true);
      errorShake.start({ x: [-8, 8, -8, 8, 0], transition: { duration: 0.3 } });
      return;
    }
    if (data) setWishes((prev) => [data as Wish, ...prev]);
    setName(''); setMessage(''); setSubmitState('idle'); setSubmitError(false);
    confetti({ spread: 180, particleCount: 150, origin: { y: 0.4 }, colors: ['#FFB7C5', '#B5EAD7', '#C7CEEA', '#FFD700'] });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, [name, message, errorShake]);

  return (
    <section className="px-4 py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F5F0FF, #FFF5F7)' }}>
      <RollingHills />
      <FloatingHearts />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div className="text-center mb-10" initial={prefersReduced ? {} : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-headline text-3xl md:text-4xl mb-3" style={{ color: '#516161' }}>Ucapan &amp; Doa</h2>
          <p className="text-gray-500 text-sm">Berikan ucapan selamat dan doa terbaik untuk Izhan &amp; Rumaisha</p>
        </motion.div>

        <motion.div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-8 max-w-[520px] mx-auto mb-14" initial={prefersReduced ? {} : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} animate={errorShake}>
          <div className="flex flex-col gap-5">
            <div>
              <label className="font-label text-[10px] tracking-widest uppercase text-gray-500 mb-1.5 block">Nama Lengkap</label>
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Anda" required className="w-full border border-pink-200 rounded-xl px-4 py-3 bg-white/80 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400" />
            </div>
            <div>
              <label className="font-label text-[10px] tracking-widest uppercase text-gray-500 mb-1.5 block">Pesan &amp; Doa</label>
              <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value.slice(0, MAX_LENGTH))} placeholder="Tulis ucapan atau doa untuk Izhan & Rumaisha..." rows={4} maxLength={MAX_LENGTH} required className="w-full border border-pink-200 rounded-xl px-4 py-3 bg-white/80 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400 resize-none" />
              <p className={`text-right text-xs mt-1 ${message.length > 280 ? 'text-rose-500' : 'text-gray-400'}`}>{message.length}/{MAX_LENGTH}</p>
            </div>
            <motion.button type="button" onClick={handleSubmit} disabled={submitState === 'loading'} className={`w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold py-3 px-6 rounded-xl cursor-pointer flex items-center justify-center transition-opacity ${submitState === 'loading' ? 'opacity-60 cursor-not-allowed' : ''}`} whileHover={submitState === 'loading' || prefersReduced ? {} : { scale: 1.02 }} whileTap={submitState === 'loading' || prefersReduced ? {} : { scale: 0.98 }}>
              {submitState === 'loading' ? (<>Mengirim...<Spinner /></>) : 'Kirim Ucapan 🤍'}
            </motion.button>
            {submitError && (<motion.p className="text-rose-500 text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Gagal mengirim. Silakan coba lagi.</motion.p>)}
          </div>
        </motion.div>

        {loadingWishes ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[680px] mx-auto"><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>
        ) : wishes.length === 0 ? (
          <motion.div className="text-center py-10" initial={prefersReduced ? {} : { opacity: 0 }} animate={{ opacity: 1 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#e9c349" fillOpacity="0.5" className="mx-auto mb-3 animate-twinkle motion-reduce:animate-none"><polygon points="12,2 15,10 24,10 17,15 19,24 12,19 5,24 7,15 0,10 9,10" /></svg>
            <p className="text-gray-500 text-sm">Jadilah yang pertama memberikan ucapan! 🌟</p>
          </motion.div>
        ) : (
          <>
            <motion.h3 className="text-center font-headline text-xl mb-6" style={{ color: '#516161' }} initial={prefersReduced ? {} : { opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Ucapan yang Telah Masuk 💌</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[680px] mx-auto">
              {wishes.slice(0, 20).map((w, i) => (
                <motion.div key={w.id} className="relative p-5 rounded-2xl shadow-sm" style={{ backgroundColor: PASTEL_COLORS[i % 5] + '40' }} initial={prefersReduced ? {} : { opacity: 0, rotateY: 90 }} whileInView={{ opacity: 1, rotateY: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}>
                  <CornerIcon type={i} />
                  <p className="font-semibold text-gray-800 mb-1 pr-6">{w.name}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">&ldquo;{w.message}&rdquo;</p>
                  <p className="text-[10px] text-gray-400 text-right">{formatRelativeTime(w.created_at)}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-xl text-sm font-medium z-50 shadow-lg" initial={{ y: 0, opacity: 1 }} animate={{ y: -30, opacity: 1 }} exit={{ y: -50, opacity: 0 }} transition={{ duration: 0.5 }}>
            Jazakumullahu Khairan! 🤍
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
