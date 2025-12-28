import { Metadata } from 'next';
import SpeedTest from '@/components/SpeedTest/SpeedTest';

export const metadata: Metadata = {
  title: 'Internet Speed Test | Professional Network Diagnostics',
  description:
    'Test your internet connection speed with our free, accurate speed test tool. Measure ping, download, and upload speeds with precision.',
  openGraph: {
    title: 'Internet Speed Test | Professional Network Diagnostics',
    description:
      'Test your internet connection speed with our free, accurate speed test tool. Measure ping, download, and upload speeds.',
  },
};

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-gradient mb-4 tracking-tight">
          Internet Speed Test
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Measure your network performance with precision
        </p>
      </div>

      <SpeedTest />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white rounded-2xl border border-gray-200">
          <div className="text-3xl font-extrabold text-primary mb-2">Fast</div>
          <p className="text-gray-600 text-sm">
            Get accurate results in seconds with our optimized testing infrastructure
          </p>
        </div>
        <div className="text-center p-6 bg-white rounded-2xl border border-gray-200">
          <div className="text-3xl font-extrabold text-primary mb-2">Accurate</div>
          <p className="text-gray-600 text-sm">
            Precise measurements using advanced network testing algorithms
          </p>
        </div>
        <div className="text-center p-6 bg-white rounded-2xl border border-gray-200">
          <div className="text-3xl font-extrabold text-primary mb-2">Free</div>
          <p className="text-gray-600 text-sm">
            No registration required. Test your speed anytime, anywhere
          </p>
        </div>
      </div>
    </div>
  );
}
