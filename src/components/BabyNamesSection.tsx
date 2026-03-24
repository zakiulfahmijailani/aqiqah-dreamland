import React from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useRef } from 'react';
import { BabyPrayingHands, FloatingStars, IslamicLantern } from '@/components/BabyIllustrations';
import { CuteSheep, BabyCradle, IslamicStarPattern } from '@/components/AqiqahDecorations';

/* ── Orbiting element ─────────────────────── */
function OrbitingIcon({ radius = 50, speed = 1, children }: { radius?: number; speed?: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useAnimationFrame((t) => {
    if (ref.current && !prefersReduced) {
      const time = t / 1000;
      const x = Math.cos(time * speed) * radius;
      const y = Math.sin(time * speed) * radius;
      ref.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  });

  return (
    <div ref={ref} className="absolute" style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}

/* ── Typewriter name ──────────────────────── */
function TypewriterName({ name, delay = 0 }: { name: string; delay?: number }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      className="flex justify-center flex-wrap"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: prefersReduced ? 0 : 0.05, delayChildren: delay }}
    >
      {name.split('').map((char, i) => (
        <motion.span
          key={i}
          className="font-headline text-4xl md:text-6xl tracking-tight"
          style={{ color: '#516161' }}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ── Baby bottle SVG ──────────────────────── */
function BabyBottle() {
  return (
    <svg width="24" height="40" viewBox="0 0 24 40" className="animate-float motion-reduce:animate-none">
      <rect x="7" y="6" width="10" height="26" rx="4" fill="#C7CEEA" />
      <rect x="9" y="0" width="6" height="8" rx="2" fill="#B5EAD7" />
      <rect x="8" y="14" width="8" height="2" rx="1" fill="#fff" opacity="0.5" />
      <rect x="8" y="20" width="8" height="2" rx="1" fill="#fff" opacity="0.5" />
    </svg>
  );
}

function Rattle() {
  return (
    <svg width="24" height="36" viewBox="0 0 24 36" className="animate-sway motion-reduce:animate-none">
      <circle cx="12" cy="10" r="8" fill="#FFB7C5" />
      <circle cx="12" cy="10" r="4" fill="#FFDAC1" opacity="0.5" />
      <rect x="11" y="18" width="2" height="16" rx="1" fill="#735c00" opacity="0.5" />
    </svg>
  );
}

function Cradle() {
  return (
    <svg width="40" height="30" viewBox="0 0 40 30" className="animate-rock-cradle motion-reduce:animate-none" style={{ transformOrigin: 'top center' }}>
      <path d="M5,20 Q20,30 35,20" fill="none" stroke="#B5EAD7" strokeWidth="2" />
      <rect x="8" y="8" width="24" height="14" rx="4" fill="#E2F0CB" opacity="0.7" />
      <line x1="20" y1="0" x2="20" y2="8" stroke="#c2c8c7" strokeWidth="1" />
    </svg>
  );
}

function BabyShoes() {
  return (
    <svg width="30" height="20" viewBox="0 0 30 20" className="animate-float motion-reduce:animate-none" style={{ animationDelay: '1.2s' }}>
      <path d="M2,12 Q2,4 10,4 L10,14 Q10,18 6,18 L2,18Z" fill="#FFDAC1" />
      <path d="M18,12 Q18,4 26,4 L26,14 Q26,18 22,18 L18,18Z" fill="#FFDAC1" />
    </svg>
  );
}

/* ── Rainbow Arc ──────────────────────────── */
function RainbowArc() {
  return (
    <div className="relative w-48 md:w-64 h-24 md:h-32 mx-auto mb-8 opacity-40">
      {['#ffdce4', '#e0f2f1', '#ffedc2', '#C7CEEA', '#B5EAD7'].map((color, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-t-full border-t-[6px] border-x-[6px] border-b-0 border-transparent"
          style={{ borderTopColor: color, transform: `scale(${1 - i * 0.1})` }}
        />
      ))}
      <div
        className="absolute inset-0 rounded-t-full border-t-4 border-x-4 border-b-0 border-transparent motion-reduce:animate-none"
        style={{ borderTopColor: '#e9c349', animation: 'spinSlow 6s linear infinite' }}
      />
    </div>
  );
}

/* ── Main Section ─────────────────────────── */
export default function BabyNamesSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="px-4 py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F0FFF4, #E8F8FF)' }}
    >
      <RainbowArc />

      {/* Single child — centered */}
      <div className="max-w-md mx-auto relative z-10">
        {/* ENHANCED: Decorative header row */}
        <div className="flex justify-center items-end gap-8 mb-8 opacity-50">
          <CuteSheep size={50} delay={0} />
          <BabyCradle size={65} delay={0.3} />
          <CuteSheep size={45} delay={0.6} flip />
        </div>

        {/* Flanking sheep - left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-30 hidden md:block">
          <CuteSheep size={40} delay={0.2} />
        </div>
        {/* Flanking sheep - right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-30 hidden md:block">
          <CuteSheep size={40} delay={0.5} flip />
        </div>

        <motion.div
          className="flex flex-col items-center text-center"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
          viewport={{ once: true }}
        >
          <div className="relative inline-block mb-4">
            <OrbitingIcon radius={70} speed={0.4}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#e9c349">
                <polygon points="12,2 15,10 24,10 17,15 19,24 12,19 5,24 7,15 0,10 9,10" />
              </svg>
            </OrbitingIcon>
            <OrbitingIcon radius={80} speed={-0.3}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#C7CEEA">
                <path d="M12,2 A10,10,0,0,0,12,22 A7,7,0,0,1,12,2Z" />
              </svg>
            </OrbitingIcon>
            <h2 className="font-headline text-2xl md:text-3xl leading-tight px-2" style={{ color: '#516161' }}>
              <TypewriterName name="Izhan Faqqihhu" delay={0} />
              <br />
              <TypewriterName name="Fiddin Zakiul" delay={0.3} />
            </h2>
          </div>
          <p className="font-label text-xs tracking-widest uppercase mb-1" style={{ color: '#6b5a60' }}>
            Laki-laki
          </p>
          <p className="text-sm mb-6" style={{ color: '#6b5a60' }}>Lahir pada tanggal 17 Desember 2025</p>

          {/* Parents */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-5 shadow-sm w-full">
            <p className="font-label text-[10px] tracking-widest uppercase mb-2 italic" style={{ color: '#6b5a60' }}>
              Putra Tercinta dari
            </p>
            <p className="font-semibold text-gray-800 text-sm leading-relaxed">
              Bapak Zakiul Fahmi Jailani
            </p>
            <p className="text-gray-600 text-sm">&amp;</p>
            <p className="font-semibold text-gray-800 text-sm leading-relaxed">
              Ibu Kemala Putri Ayunda
            </p>
          </div>

          {/* Baby items */}
          <div className="flex gap-6 mt-6 justify-center opacity-40">
            <div className="animate-float" style={{ animationDelay: '0s' }}><BabyBottle /></div>
            <div className="animate-sway" style={{ animationDelay: '0.2s' }}><Rattle /></div>
            <div className="animate-rock-cradle" style={{ animationDelay: '0.4s' }}><Cradle /></div>
            <div className="animate-float" style={{ animationDelay: '0.6s' }}><BabyShoes /></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
