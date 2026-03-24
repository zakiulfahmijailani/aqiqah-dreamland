import React from 'react';

type WaveVariant = 'sine' | 'hill' | 'double';

interface WaveDividerProps {
  fillColor?: string;
  variant?: WaveVariant;
  flip?: boolean;
}

const wavePaths: Record<WaveVariant, string> = {
  sine: 'M0,40 C120,80 240,0 360,40 C480,80 600,0 720,40 L720,100 L0,100Z',
  hill: 'M0,60 Q180,0 360,60 Q540,120 720,60 L720,100 L0,100Z',
  double:
    'M0,50 C80,20 160,80 240,50 C320,20 400,80 480,50 C560,20 640,80 720,50 L720,100 L0,100Z',
};

export default function WaveDivider({
  fillColor = '#ffffff',
  variant = 'sine',
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      className="w-full overflow-hidden leading-none -my-px"
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-auto"
        viewBox="0 0 720 100"
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
        <path d={wavePaths[variant]} fill={fillColor} />
      </svg>
    </div>
  );
}
