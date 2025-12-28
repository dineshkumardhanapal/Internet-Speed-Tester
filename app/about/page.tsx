import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about our internet speed test tool, its features, technology stack, and how we help you measure your network performance accurately.',
  openGraph: {
    title: 'About | SpeedTest',
    description:
      'Learn about our internet speed test tool and how we help you measure your network performance.',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-gradient mb-8">About SpeedTest</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            SpeedTest is a professional internet speed testing tool designed to help you
            accurately measure your network performance. Our tool provides comprehensive
            metrics including ping latency, download speed, and upload speed to give you
            a complete picture of your internet connection quality.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Ping Test:</strong> Measures latency to the server with multiple
              samples for accuracy
            </li>
            <li>
              <strong>Download Speed Test:</strong> Real-time download speed measurement
              with progress tracking
            </li>
            <li>
              <strong>Upload Speed Test:</strong> Actual upload speed testing with
              fallback mechanisms
            </li>
            <li>
              <strong>Network Information:</strong> Displays your public IP address and
              server location
            </li>
            <li>
              <strong>Quality Indicators:</strong> Color-coded quality badges for each
              metric
            </li>
            <li>
              <strong>Real-time Updates:</strong> Live speed display during tests with
              visual gauges
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology Stack</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our speed test tool is built with modern web technologies to ensure accuracy,
            performance, and a great user experience:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Next.js 14:</strong> React framework with App Router for optimal
              performance
            </li>
            <li>
              <strong>TypeScript:</strong> Type-safe development for reliability
            </li>
            <li>
              <strong>Tailwind CSS:</strong> Utility-first CSS for modern, responsive
              design
            </li>
            <li>
              <strong>Cloudflare Speed Test:</strong> Reliable infrastructure for accurate
              measurements
            </li>
            <li>
              <strong>Performance API:</strong> High-precision timing for accurate
              measurements
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            We believe everyone should have access to accurate, easy-to-use tools for
            testing their internet connection. Our goal is to provide a free, professional
            speed test tool that helps users understand their network performance and make
            informed decisions about their internet service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Developer</h2>
          <p className="text-gray-700 leading-relaxed">
            SpeedTest is developed and maintained by DK. For questions, suggestions, or
            feedback, please visit our FAQ page or contact us through our support
            channels.
          </p>
        </section>
      </div>
    </div>
  );
}
