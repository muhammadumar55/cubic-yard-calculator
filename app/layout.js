import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_TAGLINE, VERIFICATION, GA4_ID } from '../lib/site.js';
import Header from './components/Header';
import Footer from './components/Footer';
import ServiceWorkerRegister from './components/ServiceWorkerRegister';
import Analytics from './components/Analytics';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  // Preload only the weight range we use; reduces font payload
  weight: ['400', '500', '600', '700']
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,

  title: {
    default: `Cubic Yard Calculator | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`
  },

  description: SITE_DESCRIPTION,

  // Canonical is set per-page via alternates.canonical
  // Layout provides the sitewide fallback only for the homepage
  alternates: {
    canonical: '/'
  },

  // Manifest (App Router generates /manifest.webmanifest)
  manifest: '/manifest.webmanifest',

  // Apple PWA
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME
  },

  // Linked icons (Next.js static icons)
  icons: {
    icon: [
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico']
  },

  // Open Graph
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    url: '/',
    title: `Cubic Yard Calculator | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Calculate cubic yards for mulch, concrete, gravel, and topsoil`
      }
    ]
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: `Cubic Yard Calculator | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [{ url: '/og-image.jpg', alt: 'Cubic Yard Calculator' }]
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },

  // Authors & publisher
  authors: [{ name: 'Editorial Team', url: `${SITE_URL}/about/` }],
  publisher: SITE_NAME,
  category: 'utility',

  // Format detection — prevent iOS from making phone numbers into links
  formatDetection: { telephone: false },

  // Webmaster verification (set in lib/site.js or env vars)
  verification: {
    google: VERIFICATION.google || undefined,
    other: VERIFICATION.bing ? { 'msvalidate.01': VERIFICATION.bing } : undefined
  }
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Inline theme script runs BEFORE paint to prevent flash of wrong theme.
          It reads localStorage then prefers-color-scheme and sets the class.
          suppressHydrationWarning on <html> prevents React hydration mismatch.
        */}
        <Script id="theme-init" strategy="beforeInteractive">{`
(function(){try{var t=localStorage.getItem('cyc-theme');if(t==='dark'){document.documentElement.classList.add('dark')}else if(t==='light'){document.documentElement.classList.remove('dark')}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark')}}catch(e){}})();
        `}</Script>


        <meta name="google-site-verification" content="vjVmNeKdMsx_nA_TItPFT9QMjLkwzjbvpXpLR7mVUxQ" />

      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[var(--color-bg)] text-[var(--color-text-1)] transition-colors`}>
        {/* Skip link — first focusable element for keyboard/AT users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header />

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <Footer />

        {/* Service Worker registration (deferred, non-critical) */}
        <ServiceWorkerRegister />

        {/* Analytics (opt-in, only if env vars set) */}
        {GA4_ID && <Analytics />}
      </body>
    </html>
  );
}
