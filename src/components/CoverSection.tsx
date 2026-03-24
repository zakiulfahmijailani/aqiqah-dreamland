import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import BismillahCalligraphy from '@/components/BismillahCalligraphy';
import { MuslimBabyBoySeated, BabyCradle, MoonAndStars, CuteSheep, IslamicStarPattern } from '@/components/AqiqahDecorations';

interface CoverSectionProps {
  onOpen: () => void;
}

export default function CoverSection({ onOpen }: CoverSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const handleOpen = useCallback(() => {
    confetti({
      particleCount: 120,
      spread: 100,
      colors: ['#FFB7C5', '#B5EAD7', '#C7CEEA', '#FFD700', '#FFDAC1'],
      origin: { y: 0.6 },
    });
    setIsOpen(true);
    document.body.classList.remove('locked');
    setTimeout(() => onOpen(), 800);
  }, [onOpen]);

  return (
    <AnimatePresence>
      {!isOpen && (
        <>
          {/* Top curtain */}
          <motion.div
            key="curtain-top"
            className="fixed inset-x-0 top-0 h-1/2 z-[110] flex items-end justify-center"
            style={{ background: 'linear-gradient(180deg, #e8f5f0, #f0fff8)' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
          />
          {/* Bottom curtain */}
          <motion.div
            key="curtain-bottom"
            className="fixed inset-x-0 bottom-0 h-1/2 z-[110]"
            style={{ background: 'linear-gradient(0deg, #e8f5f0, #f0fff8)' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
          />

          {/* Main cover content */}
          <motion.section
            key="cover"
            className="fixed inset-0 flex flex-col items-center justify-center z-[120]"
            style={{ background: 'linear-gradient(160deg, #f0fff8, #fff5f7, #fffde7)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Floating decorations — ENHANCED with AqiqahDecorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
              {/* Top left */}
              <div className="absolute" style={{ top: '8%', left: '10%' }}>
                <MoonAndStars size={90} delay={0} />
              </div>
              {/* Top right */}
              <div className="absolute" style={{ top: '5%', left: '75%' }}>
                <IslamicStarPattern size={60} delay={0.5} />
              </div>
              {/* Middle left */}
              <div className="absolute" style={{ top: '40%', left: '5%' }}>
                <CuteSheep size={65} delay={0.3} />
              </div>
              {/* Middle right */}
              <div className="absolute" style={{ top: '38%', left: '78%' }}>
                <CuteSheep size={55} delay={0.8} flip />
              </div>
              {/* Bottom left */}
              <div className="absolute" style={{ top: '70%', left: '8%' }}>
                <BabyCradle size={80} delay={0.6} />
              </div>
              {/* Bottom center */}
              <div className="absolute" style={{ top: '75%', left: '40%' }}>
                <MuslimBabyBoySeated size={70} delay={1} />
              </div>
              {/* Bottom right */}
              <div className="absolute" style={{ top: '72%', left: '72%' }}>
                <CuteSheep size={45} delay={1.2} />
              </div>
            </div>

            {/* Envelope card */}
            <motion.div
              className="z-10 max-w-lg w-full flex flex-col items-center px-6 text-center"
              initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h2
                className="font-headline italic text-lg mb-10 tracking-widest"
                style={{ color: '#516161' }}
                initial={prefersReduced ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Bismillahirrahmanirrahim
              </motion.h2>

              <motion.div
                className="relative w-full aspect-[4/3] bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center border border-gray-200/10 mb-10 overflow-hidden"
                initial={prefersReduced ? {} : { scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 0.5 }}
              >
                <div className="absolute top-0 left-0 w-full h-2 opacity-30"
                  style={{ background: 'linear-gradient(90deg, #516161, #735c00, #B5EAD7)' }} />
                <BismillahCalligraphy size="md" color="#735c00" className="mb-6" />
                <p className="text-sm max-w-[280px] leading-relaxed" style={{ color: '#6b5a60' }}>
                  Kami mengundang Anda untuk hadir dalam syukuran Aqiqah putra kami
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                onClick={handleOpen}
                className="group relative px-10 py-5 rounded-xl font-medium tracking-wide flex items-center gap-3 shadow-xl cursor-pointer text-white"
                style={{ backgroundColor: '#516161', boxShadow: '0 10px 25px rgba(81,97,97,0.2)' }}
                whileHover={prefersReduced ? {} : { scale: 1.08 }}
                whileTap={prefersReduced ? {} : { scale: 0.95 }}
                animate={prefersReduced ? {} : { scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Buka Undangan
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor" opacity="0.8">
                    <rect x="0" y="0" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M0,0 L9,8 L18,0" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
                <div className="absolute inset-0 rounded-xl border-2 border-white/30 animate-[pulseRing_2s_infinite]" />
              </motion.button>
            </motion.div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}
