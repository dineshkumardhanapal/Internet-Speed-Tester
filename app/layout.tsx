import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import StructuredData from '@/components/SEO/StructuredData';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Internet Speed Test | Professional Network Diagnostics',
    template: '%s | SpeedTest',
  },
  description:
    'Test your internet connection speed with our free, accurate speed test tool. Measure ping, download, and upload speeds with precision.',
  keywords: [
    'internet speed test',
    'speed test',
    'network speed',
    'bandwidth test',
    'ping test',
    'download speed',
    'upload speed',
    'network diagnostics',
  ],
  authors: [{ name: 'DK' }],
  creator: 'DK',
  publisher: 'DK',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://internetspeedcheckbydk.netlify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://internetspeedcheckbydk.netlify.app',
    title: 'Internet Speed Test | Professional Network Diagnostics',
    description:
      'Test your internet connection speed with our free, accurate speed test tool. Measure ping, download, and upload speeds.',
    siteName: 'SpeedTest',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internet Speed Test | Professional Network Diagnostics',
    description:
      'Test your internet connection speed with our free, accurate speed test tool.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData
          type="WebApplication"
          data={{
            name: 'Internet Speed Test',
            description:
              'Professional internet speed testing tool to measure your network performance with precision.',
            url: 'https://internetspeedcheckbydk.netlify.app',
          }}
        />
        <StructuredData
          type="Organization"
          data={{
            name: 'SpeedTest',
            url: 'https://internetspeedcheckbydk.netlify.app',
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <div className="bg-pattern" aria-hidden="true" />
          <Header />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
