import React from 'react';
import { SheepFamily, CuteSheep, MoonAndStars, FloatingFeather, IslamicStarPattern } from './AqiqahDecorations';

/* Enhanced animated background with gradient + layered decorations */
export default function AnimatedBackground() {
  return (
    <>
      {/* Soft gradient background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(160deg, #f0fff8 0%, #fff5f7 40%, #fffde7 100%)',
        }}
        aria-hidden="true"
      />

      {/* Layer A — Sheep parade at the bottom */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute" style={{ bottom: '5%', left: '-5%', opacity: 0.25 }}>
          <SheepFamily />
        </div>
        <div className="absolute" style={{ bottom: '8%', right: '5%', opacity: 0.2 }}>
          <CuteSheep size={55} delay={0.5} flip />
        </div>
        <div className="absolute" style={{ bottom: '12%', left: '30%', opacity: 0.15 }}>
          <CuteSheep size={45} delay={1.0} />
        </div>
      </div>

      {/* Layer B — Moon and stars in top corners */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute" style={{ top: '3%', right: '3%', opacity: 0.2 }}>
          <MoonAndStars size={120} delay={0} />
        </div>
        <div className="absolute" style={{ top: '5%', left: '3%', opacity: 0.15 }}>
          <MoonAndStars size={80} delay={1} />
        </div>
      </div>

      {/* Layer C — Floating feathers */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {[
          { left: '10%', delay: 0, color: '#B5EAD7' },
          { left: '25%', delay: 1.5, color: 'white' },
          { left: '50%', delay: 3, color: '#FFB7C5' },
          { left: '70%', delay: 0.8, color: '#B5EAD7' },
          { left: '88%', delay: 2.2, color: 'white' },
        ].map((f, i) => (
          <div key={i} className="absolute" style={{ left: f.left, top: '10%', opacity: 0.4 }}>
            <FloatingFeather size={20} delay={f.delay} color={f.color} />
          </div>
        ))}
      </div>

      {/* Layer D — Islamic star clusters */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute" style={{ top: '8%', left: '45%', opacity: 0.15 }}>
          <IslamicStarPattern size={50} delay={0} />
        </div>
        <div className="absolute" style={{ top: '45%', left: '3%', opacity: 0.15 }}>
          <IslamicStarPattern size={40} delay={0.5} />
        </div>
        <div className="absolute" style={{ top: '50%', right: '5%', opacity: 0.15 }}>
          <IslamicStarPattern size={45} delay={1} />
        </div>
      </div>
    </>
  );
}
