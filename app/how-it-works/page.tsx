import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Learn how our internet speed test works, including explanations of ping, download, and upload tests, and best practices for accurate results.',
  openGraph: {
    title: 'How It Works | SpeedTest',
    description:
      'Learn how our internet speed test works and how to get accurate results.',
  },
};

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-gradient mb-8">How It Works</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Speed Tests</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            An internet speed test measures three key aspects of your connection: ping
            (latency), download speed, and upload speed. Each metric provides important
            information about your network performance.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ping (Latency)</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ping measures the time it takes for a small data packet to travel from your
            device to the server and back. It's measured in milliseconds (ms). Lower ping
            values indicate better responsiveness, which is crucial for online gaming,
            video calls, and real-time applications.
          </p>
          <div className="bg-blue-50 border-l-4 border-primary p-4 my-4">
            <p className="text-gray-700">
              <strong>How we test:</strong> We send 5 HEAD requests to our test server and
              calculate the average response time. This gives you an accurate representation
              of your connection's latency.
            </p>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Excellent:</strong> Less than 20ms - Ideal for competitive gaming
            </li>
            <li>
              <strong>Good:</strong> 20-50ms - Great for most online activities
            </li>
            <li>
              <strong>Fair:</strong> 50-100ms - Acceptable for general browsing
            </li>
            <li>
              <strong>Poor:</strong> Over 100ms - May experience noticeable delays
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Download Speed</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Download speed measures how quickly data can be transferred from the internet
            to your device. It's measured in megabits per second (Mbps). This affects how
            fast you can stream videos, download files, and load web pages.
          </p>
          <div className="bg-blue-50 border-l-4 border-primary p-4 my-4">
            <p className="text-gray-700">
              <strong>How we test:</strong> We download a 10MB test file and measure the
              time it takes. During the download, we calculate real-time speed and update
              the gauge to show your current download rate.
            </p>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Excellent:</strong> 100+ Mbps - Can handle 4K streaming and large
              downloads
            </li>
            <li>
              <strong>Good:</strong> 50-100 Mbps - Great for HD streaming and gaming
            </li>
            <li>
              <strong>Fair:</strong> 25-50 Mbps - Sufficient for standard streaming
            </li>
            <li>
              <strong>Poor:</strong> Less than 25 Mbps - May struggle with HD content
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Speed</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Upload speed measures how quickly data can be sent from your device to the
            internet. It's also measured in megabits per second (Mbps). This is important
            for video conferencing, file sharing, cloud backups, and live streaming.
          </p>
          <div className="bg-blue-50 border-l-4 border-primary p-4 my-4">
            <p className="text-gray-700">
              <strong>How we test:</strong> We upload a 5MB test file to our server and
              measure the transfer time. The speed is calculated based on the total time
              and file size.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Best Practices for Accurate Results
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Close unnecessary applications:</strong> Stop downloads, streaming,
              and other bandwidth-intensive activities before testing
            </li>
            <li>
              <strong>Use a wired connection:</strong> If possible, connect via Ethernet
              cable for more accurate results
            </li>
            <li>
              <strong>Test multiple times:</strong> Run the test 2-3 times and average the
              results for better accuracy
            </li>
            <li>
              <strong>Test at different times:</strong> Network speeds can vary throughout
              the day
            </li>
            <li>
              <strong>Restart your router:</strong> If speeds are consistently low, try
              restarting your router
            </li>
            <li>
              <strong>Check for interference:</strong> For Wi-Fi, ensure you're close to
              the router and minimize interference
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Details</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our speed test uses Cloudflare's global infrastructure to ensure accurate and
            reliable measurements. We use the Performance API for high-precision timing and
            implement multiple test samples to account for network variability.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The test is performed entirely in your browser using modern web technologies,
            ensuring your data privacy and security. No data is stored or transmitted to
            third parties beyond what's necessary for the speed test.
          </p>
        </section>
      </div>
    </div>
  );
}
