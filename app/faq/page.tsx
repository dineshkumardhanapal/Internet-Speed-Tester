import { Metadata } from 'next';
import StructuredData from '@/components/SEO/StructuredData';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about internet speed testing, accuracy, troubleshooting, and how to interpret your speed test results.',
  openGraph: {
    title: 'FAQ | SpeedTest',
    description:
      'Frequently asked questions about internet speed testing and how to interpret your results.',
  },
};

const faqs = [
  {
    question: 'How accurate is the speed test?',
    answer:
      'Our speed test uses Cloudflare\'s global infrastructure and multiple test samples to provide accurate results. However, actual speeds can vary based on network conditions, server load, and your location. For best accuracy, test multiple times and average the results.',
  },
  {
    question: 'Why is my download speed different from what my ISP advertised?',
    answer:
      'ISPs typically advertise "up to" speeds, which represent maximum potential speeds under ideal conditions. Actual speeds can be lower due to network congestion, distance from servers, Wi-Fi interference, and other factors. Wired connections generally provide more consistent speeds than Wi-Fi.',
  },
  {
    question: 'What is a good ping/latency?',
    answer:
      'Ping under 20ms is excellent for competitive gaming and real-time applications. 20-50ms is good for most online activities. 50-100ms is fair for general browsing. Over 100ms may cause noticeable delays in interactive applications.',
  },
  {
    question: 'Why is my upload speed slower than download speed?',
    answer:
      'This is normal for most internet connections. ISPs typically provide asymmetric connections where download speeds are higher than upload speeds, as most users download more content than they upload. This is especially common with cable and DSL connections.',
  },
  {
    question: 'How can I improve my internet speed?',
    answer:
      'Try these steps: 1) Restart your router and modem, 2) Use a wired Ethernet connection instead of Wi-Fi, 3) Close bandwidth-intensive applications, 4) Move closer to your Wi-Fi router, 5) Update your router firmware, 6) Contact your ISP if speeds are consistently below what you\'re paying for.',
  },
  {
    question: 'Does the speed test use my data?',
    answer:
      'Yes, the speed test downloads and uploads test files to measure your connection. The download test uses approximately 10MB of data, and the upload test uses about 5MB. This is necessary to accurately measure your connection speed.',
  },
  {
    question: 'Can I test on mobile devices?',
    answer:
      'Yes, our speed test works on all devices including smartphones and tablets. Keep in mind that mobile speeds may be affected by cellular signal strength, network congestion, and your data plan limits.',
  },
  {
    question: 'How often should I test my internet speed?',
    answer:
      'It\'s a good idea to test your speed periodically, especially if you notice performance issues. Test at different times of day to understand your connection\'s consistency. If you\'re experiencing problems, test multiple times to identify patterns.',
  },
];

export default function FAQPage() {
  const structuredData = {
    faqs: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <StructuredData type="FAQPage" data={structuredData} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black text-gradient mb-8">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h2>
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border-l-4 border-primary p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h2>
          <p className="text-gray-700">
            If you have additional questions or need help troubleshooting your connection,
            please refer to our{' '}
            <a href="/how-it-works" className="text-primary hover:underline">
              How It Works
            </a>{' '}
            page for more detailed information.
          </p>
        </div>
      </div>
    </>
  );
}
