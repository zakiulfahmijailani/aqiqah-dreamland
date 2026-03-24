import React from 'react';

export default function FootprintsAnimation() {
  return (
    <div className="flex items-center justify-center gap-4 mt-8 flex-wrap" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-1 motion-reduce:animate-none"
          style={{
            animation: 'footstep 1.5s ease-in-out forwards',
            animationDelay: `${i * 0.4}s`,
            animationIterationCount: 'infinite',
            opacity: 0,
          }}
        >
          <svg width="10" height="16" viewBox="0 0 10 16">
            <ellipse cx="5" cy="10" rx="4" ry="6" fill="#735c00" opacity="0.3" />
            <ellipse cx="3" cy="3" rx="2" ry="2.5" fill="#735c00" opacity="0.3" />
          </svg>
          <svg width="10" height="16" viewBox="0 0 10 16">
            <ellipse cx="5" cy="10" rx="4" ry="6" fill="#735c00" opacity="0.3" />
            <ellipse cx="7" cy="3" rx="2" ry="2.5" fill="#735c00" opacity="0.3" />
          </svg>
        </div>
      ))}
    </div>
  );
}
