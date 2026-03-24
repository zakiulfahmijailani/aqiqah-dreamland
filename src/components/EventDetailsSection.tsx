import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function ConfettiPieces() {
  const colors = ['#FFB7C5', '#B5EAD7', '#C7CEEA', '#FFD700', '#FFDAC1', '#E2F0CB'];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute motion-reduce:animate-none"
          style={{
            left: `${(i * 7 + 3) % 100}%`,
            top: '-10px',
            width: `${6 + (i % 3) * 2}px`,
            height: `${6 + (i % 3) * 2}px`,
            background: colors[i % colors.length],
            borderRadius: i % 2 === 0 ? '50%' : '2px',
            animation: `petalFall ${6 + i * 1.5}s linear infinite`,
            animationDelay: `${i * 0.8}s`,
            opacity: 0.3,
          }}
        />
      ))}
    </div>
  );
}

function BuntingBanner() {
  const colors = ['#516161', '#6b5a60', '#735c00', '#B5EAD7', '#FFB7C5'];
  return (
    <div className="absolute -top-6 left-0 w-full flex justify-around opacity-30 pointer-events-none" aria-hidden="true">
      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gray-300/60" />
      {colors.map((color, i) => (
        <div
          key={i}
          className="clip-triangle animate-sway motion-reduce:animate-none"
          style={{
            width: '28px',
            height: '36px',
            backgroundColor: color,
            animationDelay: `${i * 0.2}s`,
            transformOrigin: 'top center',
          }}
        />
      ))}
    </div>
  );
}

function AnimatedClock() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="17" fill="none" stroke="#516161" strokeWidth="2" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 20 + Math.cos(angle) * 14;
        const y1 = 20 + Math.sin(angle) * 14;
        const x2 = 20 + Math.cos(angle) * 16;
        const y2 = 20 + Math.sin(angle) * 16;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#516161" strokeWidth="1.5" />;
      })}
      <line x1="20" y1="20" x2="20" y2="10" stroke="#735c00" strokeWidth="2" strokeLinecap="round"
        style={{ transformOrigin: '20px 20px', animation: 'spinSlow 10s linear infinite' }} />
      <line x1="20" y1="20" x2="20" y2="7" stroke="#516161" strokeWidth="1.5" strokeLinecap="round"
        style={{ transformOrigin: '20px 20px', animation: 'spinSlow 2s linear infinite' }} />
      <circle cx="20" cy="20" r="2" fill="#735c00" />
    </svg>
  );
}

function AnimatedCalendar() {
  return (
    <svg width="40" height="44" viewBox="0 0 40 44">
      <rect x="2" y="6" width="36" height="36" rx="4" fill="none" stroke="#735c00" strokeWidth="2" />
      <rect x="2" y="6" width="36" height="12" rx="4" fill="#735c00" opacity="0.15" />
      <line x1="12" y1="2" x2="12" y2="10" stroke="#735c00" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="2" x2="28" y2="10" stroke="#735c00" strokeWidth="2" strokeLinecap="round" />
      <text x="20" y="34" textAnchor="middle" fill="#735c00" fontSize="14" fontWeight="bold">15</text>
    </svg>
  );
}

function LocationPin() {
  return (
    <svg width="32" height="40" viewBox="0 0 32 40" className="animate-float motion-reduce:animate-none">
      <path d="M16,2 C9,2 3,8 3,15 C3,24 16,38 16,38 C16,38 29,24 29,15 C29,8 23,2 16,2Z" fill="none" stroke="#735c00" strokeWidth="2" />
      <circle cx="16" cy="14" r="5" fill="#735c00" opacity="0.3" />
    </svg>
  );
}

export default function EventDetailsSection() {
  const prefersReduced = useReducedMotion();
  const cardTransition = prefersReduced
    ? { duration: 0 }
    : { type: 'spring' as const, bounce: 0.4 };

  return (
    <section className="section-events px-6 py-16 max-w-4xl mx-auto relative overflow-visible">
      <BuntingBanner />
      <ConfettiPieces />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/10 transition-shadow hover:shadow-2xl"
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={cardTransition}
          viewport={{ once: true }}
        >
          <div className="mb-6"><AnimatedCalendar /></div>
          <h4 className="font-label text-[10px] tracking-widest uppercase text-gray-500 mb-2">Hari &amp; Tanggal</h4>
          <p className="font-headline text-2xl" style={{ color: '#516161' }}>Ahad, 29 Maret 2026</p>
        </motion.div>

        <motion.div
          className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-transparent transition-shadow hover:shadow-xl"
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ ...cardTransition, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="mb-6"><AnimatedClock /></div>
          <h4 className="font-label text-[10px] tracking-widest uppercase text-gray-500 mb-2">Waktu Acara</h4>
          <p className="font-headline text-2xl text-gray-800">13:00 – 17:00 WIB</p>
        </motion.div>

        <motion.div
          className="md:col-span-2 bg-white/40 backdrop-blur-sm p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ ...cardTransition, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-xl shadow-sm">
              <LocationPin />
            </div>
            <div>
              <h4 className="font-label text-[10px] tracking-widest uppercase text-gray-500 mb-2">Tempat &amp; Alamat</h4>
              <p className="text-gray-500 text-sm max-w-xs">
                Wisma Indah VI Blok i no 2, balai baru,
                Kel. Kalumbuk, Kec. Kuranji,
                RT 003/RW 007, Kota Padang (25155)
              </p>
            </div>
          </div>
          <a
            href="#location"
            className="w-full md:w-auto inline-flex justify-center items-center px-8 py-4 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
            style={{ backgroundColor: '#516161' }}
          >
            Lihat Lokasi
          </a>
        </motion.div>
      </div>
    </section>
  );
}
