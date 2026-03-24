import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { supabase } from '@/lib/supabase';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';
type RSVPStatus = 'hadir' | 'tidak_hadir' | null;

interface RSVPSummary {
  hadir: number;
  tidak_hadir: number;
  total: number;
}

export default function RSVPSection() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<RSVPStatus>(null);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [summary, setSummary] = useState<RSVPSummary>({ hadir: 0, tidak_hadir: 0, total: 0 });
  const [loadingSummary, setLoadingSummary] = useState(true);
  const shakeControls = useAnimation();
  const prefersReduced = useReducedMotion();

  const fetchSummary = useCallback(async () => {
    const { data } = await supabase.from('rsvp').select('status');
    if (data) {
      const hadir = data.filter((r) => r.status === 'hadir').length;
      const tidak = data.filter((r) => r.status === 'tidak_hadir').length;
      setSummary({ hadir, tidak_hadir: tidak, total: data.length });
    }
    setLoadingSummary(false);
  }, []);

  useEffect(() => { fetchSummary(); }, [fetchSummary]);

  const handleSubmit = useCallback(async () => {
    if (!name.trim() || !status) {
      shakeControls.start({ x: [-8, 8, -8, 8, 0], transition: { duration: 0.3 } });
      return;
    }
    setSubmitState('loading');
    const { error } = await supabase.from('rsvp').insert([{ name: name.trim(), status }]);
    if (error) {
      setSubmitState('error');
      shakeControls.start({ x: [-8, 8, -8, 8, 0], transition: { duration: 0.3 } });
      return;
    }
    setSubmitState('success');
    setName('');
    setStatus(null);
    fetchSummary();
    setTimeout(() => setSubmitState('idle'), 4000);
  }, [name, status, shakeControls, fetchSummary]);

  const barMax = Math.max(summary.hadir + summary.tidak_hadir, 1);

  return (
    <section className="px-4 py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e8f5f0, #f0fdf4)' }}>
      <div className="max-w-xl mx-auto relative z-10">
        <motion.div className="text-center mb-10" initial={prefersReduced ? {} : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-headline text-3xl md:text-4xl mb-3" style={{ color: '#516161' }}>Konfirmasi Kehadiran</h2>
          <p className="text-gray-500 text-sm">Mohon konfirmasi kehadiran Anda agar kami dapat mempersiapkan dengan baik</p>
        </motion.div>

        <motion.div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-8 max-w-[520px] mx-auto mb-10" initial={prefersReduced ? {} : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} animate={shakeControls}>
          {submitState === 'success' ? (
            <motion.div className="text-center py-8" initial={prefersReduced ? {} : { scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="#B5EAD7" className="mx-auto mb-4">
                <path d="M12,2 A10,10,0,1,0,22,12 A10,10,0,0,0,12,2Z" />
                <path d="M8,12 L11,15 L16,9" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="font-headline text-xl mb-2" style={{ color: '#516161' }}>Terima kasih, konfirmasi Anda telah kami terima 🎉</h3>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-5">
              <div>
                <label className="font-label text-[10px] tracking-widest uppercase text-gray-500 mb-1.5 block">Nama</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Anda" required className="w-full border border-emerald-200 rounded-xl px-4 py-3 bg-white/80 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400" />
              </div>
              <div>
                <label className="font-label text-[10px] tracking-widest uppercase text-gray-500 mb-2 block">Konfirmasi</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button type="button" onClick={() => setStatus('hadir')} className={`cursor-pointer rounded-xl p-4 text-left border-2 transition-all duration-200 ${status === 'hadir' ? 'border-emerald-400 bg-emerald-50 shadow-md' : 'border-gray-200 bg-white/60 hover:border-emerald-200'}`}>
                    <span className="text-2xl mb-1 block">✅</span>
                    <span className="font-semibold text-sm text-gray-800 block">Insya Allah Hadir</span>
                  </button>
                  <button type="button" onClick={() => setStatus('tidak_hadir')} className={`cursor-pointer rounded-xl p-4 text-left border-2 transition-all duration-200 ${status === 'tidak_hadir' ? 'border-rose-300 bg-rose-50 shadow-md' : 'border-gray-200 bg-white/60 hover:border-rose-200'}`}>
                    <span className="text-2xl mb-1 block">🙏</span>
                    <span className="font-semibold text-sm text-gray-800 block">Mohon Maaf, Tidak Bisa Hadir</span>
                  </button>
                </div>
              </div>
              <motion.button type="button" onClick={handleSubmit} disabled={submitState === 'loading'} className={`w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold py-3 px-6 rounded-xl cursor-pointer flex items-center justify-center transition-opacity ${submitState === 'loading' ? 'opacity-60 cursor-not-allowed' : ''}`} whileHover={submitState === 'loading' || prefersReduced ? {} : { scale: 1.02 }} whileTap={submitState === 'loading' || prefersReduced ? {} : { scale: 0.98 }}>
                {submitState === 'loading' ? (<>Mengirim...<svg className="inline-block w-5 h-5 animate-spin ml-2" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" /><path d="M12,2 A10,10,0,0,1,22,12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></>) : 'Kirim Konfirmasi'}
              </motion.button>
              {submitState === 'error' && (<motion.p className="text-rose-500 text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Gagal mengirim. Silakan coba lagi.</motion.p>)}
            </div>
          )}
        </motion.div>

        {loadingSummary ? (
          <div className="max-w-[520px] mx-auto space-y-3 animate-pulse">
            <div className="h-4 w-40 bg-gray-200 rounded mx-auto" />
            <div className="h-6 bg-gray-200 rounded-full" />
            <div className="h-6 bg-gray-200 rounded-full" />
          </div>
        ) : summary.total > 0 ? (
          <motion.div className="max-w-[520px] mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm" initial={prefersReduced ? {} : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <p className="text-center text-sm text-gray-500 mb-4"><span className="font-semibold" style={{ color: '#516161' }}>{summary.total}</span> tamu telah mengkonfirmasi</p>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1"><span>✅ Hadir</span><span className="font-semibold">{summary.hadir}</span></div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full bg-emerald-400" initial={{ width: 0 }} whileInView={{ width: `${(summary.hadir / barMax) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1"><span>🙏 Tidak Hadir</span><span className="font-semibold">{summary.tidak_hadir}</span></div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full bg-gray-300" initial={{ width: 0 }} whileInView={{ width: `${(summary.tidak_hadir / barMax) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
