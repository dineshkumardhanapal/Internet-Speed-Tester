import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for SpeedTest. Learn how we handle your data, what information we collect, and how we protect your privacy.',
  openGraph: {
    title: 'Privacy Policy | SpeedTest',
    description:
      'Learn how we handle your data and protect your privacy when using our speed test tool.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-gradient mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">
          <strong>Last updated:</strong> January 2025
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            At SpeedTest, we are committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, and safeguard your information when you use our
            internet speed test tool.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you use our speed test tool, we automatically collect the following
            information:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Public IP Address:</strong> We display your public IP address as part
              of the test results. This is necessary to identify your network connection.
            </li>
            <li>
              <strong>Server Information:</strong> We may collect information about the server
              location used for testing.
            </li>
            <li>
              <strong>Test Results:</strong> Speed test results (ping, download, upload
              speeds) are calculated in your browser and displayed to you.
            </li>
          </ul>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Services</h3>
          <p className="text-gray-700 leading-relaxed">
            We use third-party services to provide the speed test functionality:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Cloudflare:</strong> We use Cloudflare's speed test infrastructure to
              perform the actual speed measurements.
            </li>
            <li>
              <strong>IPify:</strong> We use IPify to fetch your public IP address.
            </li>
            <li>
              <strong>IPinfo:</strong> We use IPinfo to determine server location information.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The information we collect is used solely for the purpose of providing the speed
            test functionality:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>To perform accurate speed tests</li>
            <li>To display your test results</li>
            <li>To show your network information (IP address, server location)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Storage and Retention</h2>
          <p className="text-gray-700 leading-relaxed">
            We do not store your speed test results or personal information on our servers.
            All test calculations are performed in your browser, and results are displayed
            locally. We do not maintain any databases of test results or user information.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
          <p className="text-gray-700 leading-relaxed">
            Our speed test tool does not use cookies or tracking technologies. We do not
            track your browsing behavior or collect analytics data about your usage of the
            tool.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website may contain links to third-party websites. We are not responsible
            for the privacy practices of these external sites. We encourage you to review
            their privacy policies.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            Since we do not store your data on our servers, there is minimal risk of data
            breaches. All speed test operations are performed client-side in your browser,
            ensuring your privacy and security.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our speed test tool is not intended for children under 13 years of age. We do
            not knowingly collect personal information from children.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted
            on this page with an updated revision date. We encourage you to review this
            policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy, please visit our{' '}
            <a href="/faq" className="text-primary hover:underline">
              FAQ page
            </a>{' '}
            or contact us through our support channels.
          </p>
        </section>
      </div>
    </div>
  );
}
