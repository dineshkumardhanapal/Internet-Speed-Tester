'use client';

import { useEffect, useRef } from 'react';

interface CircularGaugeProps {
  value: number;
  maxValue: number;
  label: string;
  size?: number;
}

const CIRCUMFERENCE = 754; // 2 * PI * 120

export default function CircularGauge({
  value,
  maxValue,
  label,
  size = 280,
}: CircularGaugeProps) {
  const progressRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      const percentage = Math.min(value / maxValue, 1);
      const offset = CIRCUMFERENCE - percentage * CIRCUMFERENCE;
      progressRef.current.style.strokeDashoffset = offset.toString();
    }
  }, [value, maxValue]);

  const displayValue = label === 'ms' ? Math.round(value) : value.toFixed(2);

  return (
    <div className="relative mx-auto mb-8" style={{ width: size, height: size }}>
      <svg
        className="gauge-svg w-full h-full"
        viewBox="0 0 260 260"
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          className="gauge-background fill-none stroke-gray-200"
          cx="130"
          cy="130"
          r="120"
          strokeWidth="12"
        />
        <circle
          ref={progressRef}
          className="gauge-progress fill-none stroke-primary transition-all duration-600 ease-out"
          cx="130"
          cy="130"
          r="120"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-5xl font-extrabold text-primary leading-none">
          {displayValue}
        </div>
        <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mt-2">
          {label}
        </div>
      </div>
    </div>
  );
}
