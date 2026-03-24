import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface BismillahProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export default function BismillahCalligraphy({
  size = 'md',
  color = '#735c00',
  className = '',
}: BismillahProps) {
  const prefersReduced = useReducedMotion();

  const sizeClass = {
    sm: 'text-3xl',
    md: 'text-4xl md:text-5xl',
    lg: 'text-5xl md:text-7xl',
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p
          dir="rtl"
          className={`font-arabic tracking-widest leading-relaxed px-4 ${sizeClass}`}
          style={{ color }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        <div className="mt-4 flex justify-center">
          <svg
            width="200"
            height="12"
            viewBox="0 0 200 12"
            fill="none"
            style={{ opacity: 0.4 }}
            aria-hidden="true"
          >
            <line x1="0" y1="6" x2="94" y2="6" stroke={color} strokeWidth="1" />
            <polygon points="100,2 104,6 100,10 96,6" fill={color} />
            <line x1="106" y1="6" x2="200" y2="6" stroke={color} strokeWidth="1" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
