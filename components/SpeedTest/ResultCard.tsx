'use client';

import { useEffect, useState } from 'react';
import { getQualityLabel } from '@/lib/utils';

interface ResultCardProps {
  label: string;
  value: number;
  unit: string;
  type: 'ping' | 'speed';
  delay?: number;
}

export default function ResultCard({
  label,
  value,
  unit,
  type,
  delay = 0,
}: ResultCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const quality = getQualityLabel(value, type);

  useEffect(() => {
    if (value > 0) {
      setIsAnimating(true);
      const startTime = Date.now();
      const duration = 1500;
      const startValue = 0;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (value - startValue) * easeOut;

        if (type === 'ping') {
          setDisplayValue(Math.round(currentValue));
        } else {
          setDisplayValue(parseFloat(currentValue.toFixed(2)));
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
          setIsAnimating(false);
        }
      };

      const timeout = setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [value, type, delay]);

  return (
    <div
      className="bg-white border-2 border-gray-200 rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary opacity-0 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
      role="region"
      aria-label={`${label} result`}
    >
      <div className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">
        {label}
      </div>
      <div className="text-5xl font-extrabold text-primary leading-none mb-2">
        {type === 'ping' ? Math.round(displayValue) : displayValue.toFixed(2)}
        <span className="text-xl font-medium text-gray-600 ml-1">{unit}</span>
      </div>
      {value > 0 && (
        <span
          className={`inline-block mt-4 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${quality.class}`}
        >
          {quality.text}
        </span>
      )}
    </div>
  );
}
