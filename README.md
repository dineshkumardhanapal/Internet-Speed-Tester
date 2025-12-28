# Internet Speed Test - Next.js Professional Edition

A professional, modern internet speed test application built with Next.js 14, React, and TypeScript. Features accurate network performance testing with SEO optimization and comprehensive content pages.

## Features

### Core Functionality
- **Ping Test**: Measures latency with multiple samples for accuracy
- **Download Speed Test**: Real-time download speed measurement with progress tracking
- **Upload Speed Test**: Actual upload speed testing with fallback mechanisms
- **Network Information**: Displays public IP address and server location
- **Circular Gauge**: Ookla-inspired visual gauge showing real-time speeds
- **Quality Indicators**: Color-coded quality badges for each metric

### Professional Features
- **SEO Optimized**: Comprehensive metadata, structured data, sitemap, and robots.txt
- **Content Pages**: About, How It Works, FAQ, and Privacy Policy pages
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Blue to purple gradient theme with smooth animations
- **Performance Optimized**: Next.js 14 App Router with server components
- **TypeScript**: Full type safety throughout the application

## Technology Stack

- **Next.js 14**: React framework with App Router
- **React 18**: Latest React features and hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Cloudflare Speed Test**: Reliable testing infrastructure

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
Internet-Speed-Tester-main/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── how-it-works/      # How It Works page
│   ├── faq/              # FAQ page
│   ├── privacy/          # Privacy Policy page
│   ├── sitemap.ts        # Dynamic sitemap
│   └── robots.ts         # Robots.txt
├── components/            # React components
│   ├── SpeedTest/        # Speed test components
│   ├── Layout/           # Layout components
│   └── SEO/              # SEO components
├── lib/                  # Utility functions
│   ├── speedTest.ts      # Speed test logic
│   ├── networkInfo.ts    # Network info fetching
│   └── utils.ts          # Utility functions
└── styles/               # Global styles
    └── globals.css        # Global CSS with theme
```

## SEO Features

- Comprehensive metadata for all pages
- Open Graph and Twitter Card tags
- JSON-LD structured data (WebApplication, FAQPage, Organization)
- Dynamic sitemap generation
- Robots.txt configuration
- Semantic HTML structure
- Accessibility features (ARIA labels, keyboard navigation)

## Performance Optimizations

- Next.js Image optimization
- Code splitting and lazy loading
- Font optimization with next/font
- Server Components where possible
- Optimized bundle size
- Core Web Vitals optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

Copyright 2025 © Made with ❤️ by DK

## Deployment

This application can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- Any platform supporting Next.js

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

---

**Note**: This application performs actual network tests and may consume data. Results may vary based on network conditions, server load, and geographic location.