import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ── CuteSheep ──────────────────────────────── */
interface CuteSheepProps {
  size?: number;
  delay?: number;
  flip?: boolean;
}

export function CuteSheep({ size = 60, delay = 0, flip = false }: CuteSheepProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      animate={reduced ? {} : { x: [0, 6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ width: size, height: size * 0.75, transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <svg viewBox="0 0 100 75" width="100%" height="100%">
        {/* Grass */}
        <line x1="20" y1="72" x2="22" y2="64" stroke="#B5EAD7" strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="72" x2="48" y2="65" stroke="#B5EAD7" strokeWidth="2" strokeLinecap="round" />
        <line x1="75" y1="72" x2="77" y2="66" stroke="#B5EAD7" strokeWidth="2" strokeLinecap="round" />
        {/* Legs */}
        <rect x="25" y="52" width="8" height="18" rx="4" fill="#C7CEEA" />
        <rect x="40" y="52" width="8" height="18" rx="4" fill="#C7CEEA" />
        <rect x="55" y="52" width="8" height="18" rx="4" fill="#C7CEEA" />
        <rect x="68" y="52" width="8" height="18" rx="4" fill="#C7CEEA" />
        {/* Body (fluffy wool) */}
        <circle cx="50" cy="38" r="22" fill="white" stroke="#C7CEEA" strokeWidth="1.5" />
        <circle cx="35" cy="32" r="14" fill="white" stroke="#C7CEEA" strokeWidth="1" />
        <circle cx="65" cy="32" r="14" fill="white" stroke="#C7CEEA" strokeWidth="1" />
        <circle cx="42" cy="25" r="12" fill="white" stroke="#C7CEEA" strokeWidth="1" />
        <circle cx="58" cy="25" r="12" fill="white" stroke="#C7CEEA" strokeWidth="1" />
        <circle cx="50" cy="22" r="10" fill="white" stroke="#C7CEEA" strokeWidth="1" />
        {/* Tail */}
        <circle cx="82" cy="35" r="5" fill="white" />
        {/* Head */}
        <circle cx="18" cy="30" r="12" fill="#FFDAC1" />
        {/* Ear */}
        <ellipse cx="10" cy="22" rx="5" ry="8" fill="#FFB7C5" transform="rotate(-15 10 22)" />
      </svg>
    </motion.div>
  );
}

/* ── BabyCradle ─────────────────────────────── */
interface BabyCradleProps {
  size?: number;
  delay?: number;
}

export function BabyCradle({ size = 80, delay = 0 }: BabyCradleProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      animate={reduced ? {} : { rotate: [-6, 6, -6] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ width: size, height: size * 0.85, transformOrigin: 'bottom center' }}
    >
      <svg viewBox="0 0 100 85" width="100%" height="100%">
        {/* Rockers */}
        <path d="M10,75 Q50,90 90,75" fill="none" stroke="#C7CEEA" strokeWidth="3" strokeLinecap="round" />
        <path d="M15,78 Q50,92 85,78" fill="none" stroke="#C7CEEA" strokeWidth="2" strokeLinecap="round" />
        {/* Cradle body */}
        <path d="M15,35 Q15,70 50,70 Q85,70 85,35" fill="#FFDAC1" stroke="#735c00" strokeWidth="1.5" />
        {/* Stars on cradle */}
        <polygon points="30,55 32,50 34,55 29,52 35,52" fill="#FFD700" />
        <polygon points="70,50 72,45 74,50 69,47 75,47" fill="#FFD700" />
        {/* Canopy */}
        <path d="M15,35 Q15,10 40,10 Q50,10 50,20" fill="#FFB7C5" stroke="#FFB7C5" strokeWidth="1" />
        {/* Scallop edge */}
        <path d="M15,35 Q20,30 25,35 Q30,30 35,35 Q40,30 45,35 Q48,32 50,35" fill="none" stroke="#FFB7C5" strokeWidth="2" />
        {/* Pillow */}
        <rect x="20" y="55" width="18" height="8" rx="4" fill="white" />
        {/* Baby blanket */}
        <ellipse cx="55" cy="55" rx="20" ry="10" fill="#B5EAD7" />
        {/* Baby head */}
        <circle cx="35" cy="50" r="9" fill="#FFDAC1" />
      </svg>
    </motion.div>
  );
}

/* ── FloatingFeather ────────────────────────── */
interface FloatingFeatherProps {
  size?: number;
  delay?: number;
  color?: string;
}

export function FloatingFeather({ size = 30, delay = 0, color = '#B5EAD7' }: FloatingFeatherProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      animate={reduced ? {} : { y: [-20, 60], x: [-10, 10] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ width: size, height: size * 2 }}
    >
      <svg viewBox="0 0 30 60" width="100%" height="100%" style={{ opacity: 0.7 }}>
        <path d="M15,0 Q5,15 8,30 Q10,45 15,60 Q20,45 22,30 Q25,15 15,0 Z" fill={color} />
        <line x1="15" y1="0" x2="15" y2="60" stroke={color} strokeWidth="1" opacity="0.8" />
        {/* Barbs */}
        <line x1="15" y1="10" x2="8" y2="15" stroke={color} strokeWidth="0.5" opacity="0.6" />
        <line x1="15" y1="10" x2="22" y2="15" stroke={color} strokeWidth="0.5" opacity="0.6" />
        <line x1="15" y1="20" x2="9" y2="25" stroke={color} strokeWidth="0.5" opacity="0.6" />
        <line x1="15" y1="20" x2="21" y2="25" stroke={color} strokeWidth="0.5" opacity="0.6" />
        <line x1="15" y1="30" x2="10" y2="35" stroke={color} strokeWidth="0.5" opacity="0.6" />
        <line x1="15" y1="30" x2="20" y2="35" stroke={color} strokeWidth="0.5" opacity="0.6" />
        <line x1="15" y1="40" x2="11" y2="44" stroke={color} strokeWidth="0.5" opacity="0.6" />
        <line x1="15" y1="40" x2="19" y2="44" stroke={color} strokeWidth="0.5" opacity="0.6" />
      </svg>
    </motion.div>
  );
}

/* ── IslamicStarPattern ─────────────────────── */
interface IslamicStarPatternProps {
  size?: number;
  delay?: number;
}

export function IslamicStarPattern({ size = 60, delay = 0 }: IslamicStarPatternProps) {
  const reduced = useReducedMotion();

  // 8-pointed star: two overlapping squares rotated 45deg
  const Star8 = ({ cx, cy, r, staggerDelay }: { cx: number; cy: number; r: number; staggerDelay: number }) => (
    <motion.g
      animate={reduced ? {} : { scale: [1, 1.15, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: delay + staggerDelay }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} fill="#FFD700" opacity="0.7" transform={`rotate(0 ${cx} ${cy})`} />
      <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} fill="#FFD700" opacity="0.7" transform={`rotate(45 ${cx} ${cy})`} />
    </motion.g>
  );

  return (
    <div style={{ width: size, height: size }}>
      <svg viewBox="0 0 80 80" width="100%" height="100%">
        <Star8 cx={20} cy={25} r={14} staggerDelay={0} />
        <Star8 cx={55} cy={15} r={9} staggerDelay={0.3} />
        <Star8 cx={45} cy={55} r={11} staggerDelay={0.6} />
      </svg>
    </div>
  );
}

/* ── MuslimBabyBoySeated ────────────────────── */
interface MuslimBabyBoySeatedProps {
  size?: number;
  delay?: number;
}

export function MuslimBabyBoySeated({ size = 70, delay = 0 }: MuslimBabyBoySeatedProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      animate={reduced ? {} : { y: [0, -6, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ width: size, height: size * 1.1 }}
    >
      <svg viewBox="0 0 80 88" width="100%" height="100%">
        {/* Jubah body (trapezoid) */}
        <path d="M20,40 L15,85 L65,85 L60,40 Z" fill="#f5f5f5" stroke="#C7CEEA" strokeWidth="1.5" rx="5" />
        {/* Hands */}
        <ellipse cx="15" cy="55" rx="7" ry="9" fill="#FFDAC1" />
        <ellipse cx="65" cy="55" rx="7" ry="9" fill="#FFDAC1" />
        {/* Feet */}
        <ellipse cx="30" cy="86" rx="8" ry="4" fill="#FFDAC1" />
        <ellipse cx="50" cy="86" rx="8" ry="4" fill="#FFDAC1" />
        {/* Head */}
        <circle cx="40" cy="25" r="18" fill="#FFDAC1" />
        {/* Peci */}
        <rect x="25" y="8" width="30" height="14" rx="5" fill="white" stroke="#C7CEEA" strokeWidth="1.5" />
        <rect x="25" y="18" width="30" height="4" rx="2" fill="white" stroke="#C7CEEA" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}

/* ── MoonAndStars ───────────────────────────── */
interface MoonAndStarsProps {
  size?: number;
  delay?: number;
}

export function MoonAndStars({ size = 100, delay = 0 }: MoonAndStarsProps) {
  const reduced = useReducedMotion();

  const stars = [
    { x: 75, y: 15, r: 4, opDelay: 0 },
    { x: 85, y: 35, r: 3, opDelay: 0.5 },
    { x: 65, y: 45, r: 3.5, opDelay: 1 },
    { x: 90, y: 55, r: 2.5, opDelay: 1.5 },
    { x: 55, y: 65, r: 3, opDelay: 0.8 },
  ];

  return (
    <div style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Crescent moon */}
        <motion.path
          d="M45,15 A35,35 0 1,1 45,85 A25,25 0 1,0 45,15 Z"
          fill="#FFD700"
          opacity="0.85"
          animate={reduced ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
        />
        {/* Stars */}
        {stars.map((s, i) => (
          <motion.polygon
            key={i}
            points={`${s.x},${s.y - s.r * 2} ${s.x + s.r * 0.6},${s.y - s.r * 0.6} ${s.x + s.r * 2},${s.y} ${s.x + s.r * 0.6},${s.y + s.r * 0.6} ${s.x},${s.y + s.r * 2} ${s.x - s.r * 0.6},${s.y + s.r * 0.6} ${s.x - s.r * 2},${s.y} ${s.x - s.r * 0.6},${s.y - s.r * 0.6}`}
            fill="#FFD700"
            animate={reduced ? {} : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: delay + s.opDelay }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ── SheepFamily ────────────────────────────── */
export function SheepFamily() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="flex items-end gap-2"
      animate={reduced ? {} : { x: [0, 15, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <CuteSheep size={70} delay={0} />
      <CuteSheep size={55} delay={0.4} />
      <CuteSheep size={40} delay={0.8} />
    </motion.div>
  );
}
