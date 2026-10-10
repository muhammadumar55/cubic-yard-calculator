/**
 * lib/site.js
 * Single source of truth for all site-wide constants.
 * Replace NEXT_PUBLIC_SITE_URL with your real domain before launch.
 * Every place that would reference the domain reads from here.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.example.com';

export const SITE_NAME = 'Cubic Yard Calculator';
export const SITE_TAGLINE = 'Fast Dirt, Mulch & Concrete Estimator';
export const SITE_DESCRIPTION =
  'Free online cubic yard calculator. Instantly calculate the exact volume of mulch, gravel, topsoil, concrete, or sand needed for your project. Includes waste margin, weight in lbs/tons, and a cost estimator.';

/** ISO date string — update whenever you make significant content changes */
export const LAST_UPDATED = '2024-10-10';

/** Author / reviewer — replace with real names for E-E-A-T */
export const AUTHOR = {
  name: 'Editorial Team',
  url: `${SITE_URL}/about/`,
  // Replace with a real LinkedIn / professional profile URL
  sameAs: []
};

export const PUBLISHER = {
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-192.png`
};

/**
 * Social links — set to empty string '' to hide from footer.
 * Only renders if value is non-empty.
 */
export const SOCIAL = {
  twitter: '',
  facebook: '',
  youtube: '',
  instagram: '',
  pinterest: ''
};

/**
 * Webmaster verification — add your verification codes here.
 * REPLACE THESE WITH YOUR REAL VERIFICATION CODES.
 */
export const VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  bing: process.env.NEXT_PUBLIC_BING_VERIFICATION || ''
};

/**
 * Analytics — set env vars to enable.
 * GA4: NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
 * Plausible: NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
 */
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || '';
export const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '';

/**
 * Main navigation structure.
 * Each top-level item may have children (dropdown).
 */
export const NAV_ITEMS = [
  {
    label: 'Calculators',
    href: '/calculators/',
    children: [
      { label: 'Concrete Calculator', href: '/calculators/concrete-calculator/' },
      { label: 'Mulch Calculator', href: '/calculators/mulch-calculator/' },
      { label: 'Topsoil Calculator', href: '/calculators/topsoil-calculator/' },
      { label: 'Gravel Calculator', href: '/calculators/gravel-calculator/' },
      { label: 'Sand Calculator', href: '/calculators/sand-calculator/' },
      { label: 'Crushed Stone Calculator', href: '/calculators/crushed-stone-calculator/' },
      { label: 'Fill Dirt Calculator', href: '/calculators/fill-dirt-calculator/' },
      { label: 'Compost Calculator', href: '/calculators/compost-calculator/' },
      { label: 'View All', href: '/calculators/' }
    ]
  },
  {
    label: 'By Shape',
    href: '/shapes/',
    children: [
      { label: 'Rectangle / Square', href: '/shapes/rectangle/' },
      { label: 'Circle / Cylinder', href: '/shapes/circle/' },
      { label: 'Triangle', href: '/shapes/triangle/' },
      { label: 'Trapezoid', href: '/shapes/trapezoid/' }
    ]
  },
  {
    label: 'By Project',
    href: '/projects/',
    children: [
      { label: 'Driveway', href: '/projects/driveway/' },
      { label: 'Patio', href: '/projects/patio/' },
      { label: 'Concrete Slab', href: '/projects/slab/' },
      { label: 'Garden Bed', href: '/projects/garden-bed/' },
      { label: 'Raised Bed', href: '/projects/raised-bed/' },
      { label: 'Trench', href: '/projects/trench/' }
    ]
  },
  {
    label: 'Converters',
    href: '/converters/',
    children: [
      { label: 'Cubic Feet to Cubic Yards', href: '/converters/cubic-feet-to-cubic-yards/' },
      { label: 'Cubic Inches to Cubic Yards', href: '/converters/cubic-inches-to-cubic-yards/' },
      { label: 'Cubic Meters to Cubic Yards', href: '/converters/cubic-meters-to-cubic-yards/' },
      { label: 'Cubic Yards to Tons', href: '/converters/cubic-yards-to-tons/' },
      { label: 'Tons to Cubic Yards', href: '/converters/tons-to-cubic-yards/' },
      { label: 'View All', href: '/converters/' }
    ]
  },
  {
    label: 'Guides',
    href: '/guides/',
    children: [
      { label: 'How to Calculate Cubic Yards', href: '/guides/how-to-calculate-cubic-yards/' },
      { label: 'How Many Yards in a Dump Truck', href: '/guides/how-many-cubic-yards-in-a-dump-truck/' },
      { label: 'How Much Does a Cubic Yard Weigh', href: '/guides/how-much-does-a-cubic-yard-weigh/' },
      { label: 'Bags of Concrete per Cubic Yard', href: '/guides/bags-of-concrete-per-cubic-yard/' },
      { label: 'Mulch Coverage Chart', href: '/guides/mulch-coverage-per-cubic-yard/' },
      { label: 'View All', href: '/guides/' }
    ]
  }
];

/**
 * Footer link columns for rich internal linking.
 */
export const FOOTER_COLUMNS = [
  {
    title: 'Calculators',
    links: [
      { label: 'Concrete Calculator', href: '/calculators/concrete-calculator/' },
      { label: 'Mulch Calculator', href: '/calculators/mulch-calculator/' },
      { label: 'Topsoil Calculator', href: '/calculators/topsoil-calculator/' },
      { label: 'Gravel Calculator', href: '/calculators/gravel-calculator/' },
      { label: 'Sand Calculator', href: '/calculators/sand-calculator/' },
      { label: 'Fill Dirt Calculator', href: '/calculators/fill-dirt-calculator/' },
      { label: 'All Calculators', href: '/calculators/' }
    ]
  },
  {
    title: 'Converters',
    links: [
      { label: 'Cu Ft to Cu Yd', href: '/converters/cubic-feet-to-cubic-yards/' },
      { label: 'Cu In to Cu Yd', href: '/converters/cubic-inches-to-cubic-yards/' },
      { label: 'Cu Yd to Tons', href: '/converters/cubic-yards-to-tons/' },
      { label: 'Tons to Cu Yd', href: '/converters/tons-to-cubic-yards/' },
      { label: 'Cu Meters to Cu Yd', href: '/converters/cubic-meters-to-cubic-yards/' },
      { label: 'All Converters', href: '/converters/' }
    ]
  },
  {
    title: 'Guides',
    links: [
      { label: 'How to Calculate Cubic Yards', href: '/guides/how-to-calculate-cubic-yards/' },
      { label: 'Cubic Yards in a Dump Truck', href: '/guides/how-many-cubic-yards-in-a-dump-truck/' },
      { label: 'Bags of Concrete per Yard', href: '/guides/bags-of-concrete-per-cubic-yard/' },
      { label: 'Mulch Coverage Chart', href: '/guides/mulch-coverage-per-cubic-yard/' },
      { label: 'Material Weight Guide', href: '/guides/how-much-does-a-cubic-yard-weigh/' },
      { label: 'All Guides', href: '/guides/' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Privacy Policy', href: '/privacy-policy/' },
      { label: 'Terms of Use', href: '/terms/' },
      { label: 'Disclaimer', href: '/disclaimer/' },
      { label: 'Editorial Policy', href: '/editorial-policy/' }
    ]
  }
];
