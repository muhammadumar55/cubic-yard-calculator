import './globals.css';
import Link from 'next/link';
import ServiceWorkerRegister from './components/ServiceWorkerRegister';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Cubic Yard Calculator',
  title: {
    default: 'Cubic Yard Calculator | Fast Dirt, Mulch & Concrete Estimator',
    template: '%s | Cubic Yard Calculator'
  },
  description: 'Free online cubic yard calculator. Quickly calculate the exact volume of mulch, gravel, topsoil, or concrete needed for your project in cubic yards. Includes weight and cost estimators.',
  alternates: {
    canonical: '/'
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Cubic Yard Calculator'
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Cubic Yard Calculator | Fast Dirt, Mulch & Concrete Estimator',
    description: 'Free online cubic yard calculator. Quickly calculate the exact volume of mulch, gravel, topsoil, or concrete needed for your project in cubic yards. Includes weight and cost estimators.',
    images: [{ url: '/icon.svg' }]
  },
  twitter: {
    card: 'summary',
    title: 'Cubic Yard Calculator | Fast Dirt, Mulch & Concrete Estimator',
    description: 'Free online cubic yard calculator. Quickly calculate the exact volume of mulch, gravel, topsoil, or concrete needed for your project in cubic yards. Includes weight and cost estimators.',
    images: ['/icon.svg']
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport = {
  themeColor: '#0f172a'
};

function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Cubic Yard Calculator',
        url: siteUrl + '/',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Works in modern browsers.',
        description: 'Calculate cubic yards for concrete, gravel, topsoil, mulch, sand, and other bulk materials. Includes waste margin, weight, and cost estimators.',
        featureList: [
          'Rectangular slab cubic yard calculator',
          'Circular area cubic yard calculator',
          'Triangular area cubic yard calculator',
          'Cubic feet/inches/meters to cubic yards conversion',
          'Material weight estimates (lbs and tons)',
          'Cost estimator per cubic yard or per ton',
          'Waste margin buffer'
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a cubic yard?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A cubic yard (yd³) is a unit of volume equal to a cube that is 3 feet long × 3 feet wide × 3 feet tall. It equals 27 cubic feet. Bulk materials like mulch, gravel, topsoil, and concrete are commonly sold by the cubic yard.'
            }
          },
          {
            '@type': 'Question',
            name: 'How many bags of concrete make a cubic yard?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'One cubic yard is 27 cubic feet. A typical 80-lb bag yields about 0.60 cu ft (about 45 bags per yard), and a typical 60-lb bag yields about 0.45 cu ft (about 60 bags per yard). Check your bag’s yield label for the most accurate estimate.'
            }
          },
          {
            '@type': 'Question',
            name: 'How much area does 1 cubic yard of mulch cover at a 3-inch depth?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'At 3 inches deep (0.25 ft), 1 cubic yard (27 cu ft) covers about 108 square feet (27 ÷ 0.25). Many landscapers use a quick rule of thumb of about 100 square feet per yard at 3 inches.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do you convert cubic feet directly to cubic yards?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Divide cubic feet by 27. Example: 54 cu ft ÷ 27 = 2 yd³.'
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <ServiceWorkerRegister />
        <JsonLd />

        <a
          href="#calculator"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 bg-white shadow px-3 py-2 rounded"
        >
          Skip to calculator
        </a>

        <header className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          <div className="mx-auto max-w-5xl px-4 pt-5 pb-6 sm:pt-7 sm:pb-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Cubic Yard Calculator</h1>
              <p className="text-slate-200 text-sm sm:text-base max-w-3xl">
                Instantly calculate cubic yards for concrete, gravel, topsoil, mulch, sand, and more. Includes waste margin, weight in tons/lbs, and a cost estimator.
              </p>
            </div>

            <nav className="mt-4 flex flex-wrap gap-3 text-sm text-slate-200">
              <Link className="underline underline-offset-4 hover:text-white" href="/">Calculator</Link>
              <Link className="underline underline-offset-4 hover:text-white" href="/how-to-calculate-cubic-yards/">How to calculate</Link>
              <Link className="underline underline-offset-4 hover:text-white" href="/material-weight-per-cubic-yard/">Material weights</Link>
              <Link className="underline underline-offset-4 hover:text-white" href="/faq/">FAQ</Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-slate-600">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p><strong>Cubic Yard Calculator</strong> — lightweight, static Next.js export.</p>
              <p className="text-xs">© {new Date().getFullYear()} • Built for fast field estimates</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
