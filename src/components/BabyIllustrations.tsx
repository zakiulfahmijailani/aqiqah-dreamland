import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface IllustrationProps {
  size?: number;
  delay?: number;
  className?: string;
}

export function MuslimBabyBoy({ size = 60, delay = 0, className = '' }: IllustrationProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduced ? {} : { y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ width: size, height: size * 1.2 }}
    >
      <svg viewBox="0 0 100 120" width="100%" height="100%">
        <ellipse cx="50" cy="115" rx="35" ry="5" fill="#516161" opacity="0.1" />
        <path d="M30,50 Q20,110 25,115 L75,115 Q80,110 70,50 Z" fill="#f0f0f0" stroke="#C7CEEA" strokeWidth="2" strokeLinejoin="round" />
        <ellipse cx="28" cy="70" rx="8" ry="12" fill="#FFDAC1" transform="rotate(15 28 70)" />
        <ellipse cx="72" cy="70" rx="8" ry="12" fill="#FFDAC1" transform="rotate(-15 72 70)" />
        <circle cx="50" cy="35" r="22" fill="#FFDAC1" />
        <path d="M30,22 Q35,8 50,8 Q65,8 70,22 Z" fill="#ffffff" stroke="#C7CEEA" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

export function BabyMoon({ size = 60, delay = 0, className = '' }: IllustrationProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduced ? {} : { rotate: [-3, 3, -3] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ width: size, height: size, transformOrigin: 'center' }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M80,50 A40,40 0 1,1 50,10 A30,30 0 1,0 75,45 Z" fill="#FFD700" opacity="0.85" />
        <g transform="translate(15, 55) rotate(-20)">
          <ellipse cx="35" cy="15" rx="20" ry="12" fill="#B5EAD7" />
          <circle cx="15" cy="15" r="10" fill="#FFDAC1" />
        </g>
      </svg>
    </motion.div>
  );
}

export function FloatingStars({ size = 60, delay = 0, className = '' }: IllustrationProps) {
  const reduced = useReducedMotion();
  const starPath = "M50,0 Q50,45 100,50 Q50,55 50,100 Q50,55 0,50 Q50,45 50,0 Z";

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <motion.path
          d={starPath}
          fill="#FFD700"
          opacity="1"
          transform="translate(10, 10) scale(0.4)"
          style={{ transformOrigin: 'center' }}
          animate={reduced ? {} : { scale: [0.4, 0.48, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: delay }}
        />
        <motion.path
          d={starPath}
          fill="#FFD700"
          opacity="0.6"
          transform="translate(60, 20) scale(0.25)"
          style={{ transformOrigin: 'center' }}
          animate={reduced ? {} : { scale: [0.25, 0.3, 0.25] }}
          transition={{ duration: 2, repeat: Infinity, delay: delay + 0.4 }}
        />
        <motion.path
          d={starPath}
          fill="#FFD700"
          opacity="0.8"
          transform="translate(30, 60) scale(0.35)"
          style={{ transformOrigin: 'center' }}
          animate={reduced ? {} : { scale: [0.35, 0.42, 0.35] }}
          transition={{ duration: 2, repeat: Infinity, delay: delay + 0.8 }}
        />
      </svg>
    </div>
  );
}

export function BabyPrayingHands({ size = 60, delay = 0, className = '' }: IllustrationProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduced ? {} : { scale: [1, 1.05, 1] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M30,80 Q20,50 45,30 Q50,35 40,65 Q35,80 30,80 Z" fill="#FFDAC1" stroke="#735c00" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M70,80 Q80,50 55,30 Q50,35 60,65 Q65,80 70,80 Z" fill="#FFDAC1" stroke="#735c00" strokeWidth="1" strokeOpacity="0.3" />
      </svg>
    </motion.div>
  );
}

export function IslamicLantern({ size = 60, delay = 0, className = '' }: IllustrationProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduced ? {} : { rotate: [-5, 5, -5] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ width: size, height: size * 1.5, transformOrigin: 'top center' }}
    >
      <svg viewBox="0 0 100 150" width="100%" height="100%">
        <circle cx="50" cy="15" r="5" fill="none" stroke="#735c00" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="30" stroke="#735c00" strokeWidth="2" />
        <path d="M50,30 L30,50 L70,50 Z" fill="#FFD700" stroke="#735c00" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="30,50 70,50 60,110 40,110" fill="#FFD700" fillOpacity="0.7" stroke="#735c00" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="40,110 60,110 50,130" fill="#FFD700" stroke="#735c00" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="50" cy="80" r="15" fill="#FFF9C4" opacity="0.6" />
        <line x1="37" y1="70" x2="63" y2="70" stroke="#735c00" strokeWidth="1" opacity="0.5" />
        <line x1="35" y1="90" x2="65" y2="90" stroke="#735c00" strokeWidth="1" opacity="0.5" />
        <polygon points="50,75 55,80 50,85 45,80" fill="none" stroke="#735c00" strokeWidth="1" opacity="0.6" />
      </svg>
    </motion.div>
  );
}

export function BabyQuran({ size = 60, delay = 0, className = '' }: IllustrationProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduced ? {} : { y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ width: size * 1.2, height: size }}
    >
      <svg viewBox="0 0 120 100" width="100%" height="100%">
        <path d="M20,80 L50,60 L80,80 L90,75 L60,50 L30,75 Z" fill="#735c00" opacity="0.4" />
        <path d="M60,55 L20,40 L30,20 L60,45 Z" fill="#516161" />
        <path d="M60,55 L100,40 L90,20 L60,45 Z" fill="#516161" />
        <path d="M60,52 L24,39 L32,22 L60,42 Z" fill="#FFF9F0" />
        <path d="M60,52 L96,39 L88,22 L60,42 Z" fill="#FFF9F0" />
        <path d="M60,45 L55,70 L60,65 L65,70 Z" fill="#FFB7C5" />
        <line x1="35" y1="30" x2="52" y2="36" stroke="#C7CEEA" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="34" x2="54" y2="42" stroke="#C7CEEA" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="85" y1="30" x2="68" y2="36" stroke="#C7CEEA" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="88" y1="34" x2="66" y2="42" stroke="#C7CEEA" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

export function FloatingBalloons({ size = 60, delay = 0, className = '' }: IllustrationProps) {
  const reduced = useReducedMotion();
  return (
    <div className={`relative ${className}`} style={{ width: size * 1.5, height: size * 1.5 }}>
      <svg viewBox="0 0 150 150" width="100%" height="100%">
        <motion.g
          style={{ transformOrigin: '50% 120px' }}
          animate={reduced ? {} : { rotate: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <path d="M40,50 Q45,85 75,120" fill="none" stroke="#e0e0e0" strokeWidth="1.5" />
          <polygon points="40,50 35,55 45,55" fill="#FFB7C5" />
          <circle cx="40" cy="30" r="20" fill="#FFB7C5" opacity="0.9" />
          <ellipse cx="33" cy="23" rx="4" ry="8" fill="#ffffff" opacity="0.3" transform="rotate(-30 33 23)" />
        </motion.g>
        <motion.g
          style={{ transformOrigin: '50% 120px' }}
          animate={reduced ? {} : { rotate: [-2, 4, -2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.2 }}
        >
          <path d="M75,30 Q75,75 75,120" fill="none" stroke="#e0e0e0" strokeWidth="1.5" />
          <polygon points="75,30 70,35 80,35" fill="#C7CEEA" />
          <circle cx="75" cy="12" r="18" fill="#C7CEEA" opacity="0.9" />
          <ellipse cx="69" cy="6" rx="3" ry="6" fill="#ffffff" opacity="0.3" transform="rotate(-30 69 6)" />
        </motion.g>
        <motion.g
          style={{ transformOrigin: '50% 120px' }}
          animate={reduced ? {} : { rotate: [4, -4, 4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.4 }}
        >
          <path d="M110,40 Q100,80 75,120" fill="none" stroke="#e0e0e0" strokeWidth="1.5" />
          <polygon points="110,40 105,45 115,45" fill="#B5EAD7" />
          <circle cx="110" cy="22" r="18" fill="#B5EAD7" opacity="0.9" />
          <ellipse cx="104" cy="16" rx="3" ry="6" fill="#ffffff" opacity="0.3" transform="rotate(-30 104 16)" />
        </motion.g>
      </svg>
    </div>
  );
}
