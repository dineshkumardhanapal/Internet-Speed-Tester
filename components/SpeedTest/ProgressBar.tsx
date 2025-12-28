'use client';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export default function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  return (
    <div className={`w-full max-w-2xl h-1 bg-gray-200 rounded-full overflow-hidden mx-auto my-8 ${className}`}>
      <div
        className="h-full bg-gradient-primary rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
}
