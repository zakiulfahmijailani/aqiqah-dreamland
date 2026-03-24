import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import FootprintsAnimation from './FootprintsAnimation';
import { SheepFamily } from './AqiqahDecorations';

/* ── Paper Lanterns ───────────────────────── */
const lanternColors = ['#e74c3c', '#e67e22', '#f1c40f', '#FFB7C5', '#9b59b6', '#B5EAD7'];

function PaperLanterns() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {lanternColors.map((color, i) => (
        <div
          key={i}
          className="absolute animate-float motion-reduce:animate-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${10 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + i * 0.5}s`,
          }}
        >
          <svg width="28" height="42" viewBox="0 0 28 42" style={{ opacity: 0.15 }}>
            <path d="M6,8 L4,32 A4,4,0,0,0,8,36 L20,36 A4,4,0,0,0,24,32 L22,8Z" fill={color} />
            <rect x="10" y="4" width="8" height="6" rx="2" fill={color} opacity="0.7" />
            <line x1="14" y1="0" x2="14" y2="4" stroke={color} strokeWidth="1" opacity="0.5" />
            <ellipse cx="14" cy="22" rx="6" ry="8" fill="#fffbe6" opacity="0.4" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ── Main Section ─────────────────────────── */
export default function ClosingSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="px-6 py-32 text-center max-w-3xl mx-auto relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF5F7, #f0fff8)' }}>
      <PaperLanterns />

      <div className="relative z-10">
        <motion.p
          className="font-body leading-relaxed mb-12 italic text-sm md:text-base"
          style={{ color: '#6b5a60' }}
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir untuk memberikan doa restu kepada putra kami. Atas kehadiran
          dan doa restunya, kami ucapkan terima kasih.
        </motion.p>

        {/* Family name with halo */}
        <motion.div
          className="relative inline-block mb-12"
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', bounce: 0.3, delay: 0.2 }}
        >
          <div
            className="absolute inset-0 rounded-full -m-8 animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(81,97,97,0.08) 0%, transparent 70%)',
              transform: 'scale(1.5)',
            }}
          />
          <h4 className="font-headline text-3xl md:text-4xl relative" style={{ color: '#516161' }}>
            Keluarga Besar Zakiul Fahmi Jailani &amp; Kemala Putri Ayunda
          </h4>
        </motion.div>

        {/* Heart icon */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#735c00" opacity="0.3">
            <path d="M12,21 C12,21 3,13 3,8 A5,5,0,0,1,12,5 A5,5,0,0,1,21,8 C21,13 12,21 12,21Z" />
          </svg>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#e9c349">
            <path d="M12,21 C12,21 3,13 3,8 A5,5,0,0,1,12,5 A5,5,0,0,1,21,8 C21,13 12,21 12,21Z" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#735c00" opacity="0.3">
            <path d="M12,21 C12,21 3,13 3,8 A5,5,0,0,1,12,5 A5,5,0,0,1,21,8 C21,13 12,21 12,21Z" />
          </svg>
        </div>

        {/* Footprints */}
        <FootprintsAnimation />

        {/* Divider */}
        <div className="h-px w-40 bg-gray-300/30 mx-auto my-10" />

        {/* Wassalamu'alaikum — Arabic + Latin */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p
            className="text-2xl md:text-3xl"
            style={{ fontFamily: "'Amiri', serif", color: '#516161' }}
            dir="rtl"
          >
            وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
          </p>
          <p className="font-label text-[10px] tracking-[0.5em] uppercase mt-1" style={{ color: '#999' }}>
            Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </p>
        </motion.div>

        {/* ENHANCED: Sheep parade at the bottom */}
        <div className="mt-12 opacity-30 overflow-hidden">
          <SheepFamily />
        </div>
      </div>
    </section>
  );
}
