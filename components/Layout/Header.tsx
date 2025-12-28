import Link from 'next/link';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black text-gradient">SpeedTest</span>
          </Link>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
