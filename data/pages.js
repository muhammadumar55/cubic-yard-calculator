/**
 * data/pages.js
 * Central registry of all public pages.
 * Used by: sitemap.js, sitemap validation script, and nav generation.
 *
 * priority: 1.0 = home, 0.9 = key calculators, 0.7 = guides/content, 0.3 = legal
 * changeFrequency: how often content meaningfully changes
 */

import { LAST_UPDATED } from '../lib/site.js';

// ---------------------------------------------------------------------------
// Calculator pages (material-specific)
// ---------------------------------------------------------------------------
export const CALCULATOR_PAGES = [
  {
    slug: 'concrete-calculator',
    title: 'Concrete Calculator',
    h1: 'Concrete Cubic Yard Calculator',
    description: 'Free concrete cubic yard calculator. Estimate concrete volume for slabs, footings, and columns. Includes bags needed and cost estimator.',
    primaryKeyword: 'concrete calculator cubic yards',
    materialKey: 'concrete',
    priority: 0.9,
    changeFrequency: 'monthly'
  },
  {
    slug: 'mulch-calculator',
    title: 'Mulch Calculator',
    h1: 'Mulch Cubic Yard Calculator',
    description: 'Free mulch cubic yard calculator. Find how much mulch you need for garden beds, landscaping, and playgrounds. Includes coverage chart.',
    primaryKeyword: 'mulch calculator cubic yards',
    materialKey: 'mulch',
    priority: 0.9,
    changeFrequency: 'monthly'
  },
  {
    slug: 'topsoil-calculator',
    title: 'Topsoil Calculator',
    h1: 'Topsoil Cubic Yard Calculator',
    description: 'Free topsoil cubic yard calculator. Estimate cubic yards of topsoil needed for lawns, raised beds, and grading projects.',
    primaryKeyword: 'topsoil calculator cubic yards',
    materialKey: 'topsoil',
    priority: 0.9,
    changeFrequency: 'monthly'
  },
  {
    slug: 'gravel-calculator',
    title: 'Gravel Calculator',
    h1: 'Gravel Cubic Yard Calculator',
    description: 'Free gravel cubic yard calculator. Calculate how many cubic yards of gravel, pea gravel, or crushed stone you need for driveways and paths.',
    primaryKeyword: 'gravel calculator cubic yards',
    materialKey: 'gravel',
    priority: 0.9,
    changeFrequency: 'monthly'
  },
  {
    slug: 'sand-calculator',
    title: 'Sand Calculator',
    h1: 'Sand Cubic Yard Calculator',
    description: 'Free sand cubic yard calculator. Calculate how many cubic yards of sand for patios, play areas, concrete mixing, and drainage projects.',
    primaryKeyword: 'sand calculator cubic yards',
    materialKey: 'sand',
    priority: 0.8,
    changeFrequency: 'monthly'
  },
  {
    slug: 'crushed-stone-calculator',
    title: 'Crushed Stone Calculator',
    h1: 'Crushed Stone Cubic Yard Calculator',
    description: 'Calculate cubic yards of crushed stone, crusher run, or limestone gravel for driveways, bases, and drainage.',
    primaryKeyword: 'crushed stone calculator cubic yards',
    materialKey: 'crushedstone',
    priority: 0.8,
    changeFrequency: 'monthly'
  },
  {
    slug: 'fill-dirt-calculator',
    title: 'Fill Dirt Calculator',
    h1: 'Fill Dirt Cubic Yard Calculator',
    description: 'Free fill dirt calculator. Estimate cubic yards of fill dirt for grading, backfill, raised areas, and pond leveling.',
    primaryKeyword: 'fill dirt calculator cubic yards',
    materialKey: 'filldirt',
    priority: 0.8,
    changeFrequency: 'monthly'
  },
  {
    slug: 'compost-calculator',
    title: 'Compost Calculator',
    h1: 'Compost Cubic Yard Calculator',
    description: 'Calculate how many cubic yards of compost you need for garden beds, lawn top-dressing, and vegetable gardens.',
    primaryKeyword: 'compost calculator cubic yards',
    materialKey: 'compost',
    priority: 0.8,
    changeFrequency: 'monthly'
  },
  {
    slug: 'asphalt-calculator',
    title: 'Asphalt Calculator',
    h1: 'Asphalt Cubic Yard Calculator',
    description: 'Calculate cubic yards (or tons) of asphalt for driveways, parking lots, and paths.',
    primaryKeyword: 'asphalt calculator cubic yards',
    materialKey: 'asphalt',
    priority: 0.7,
    changeFrequency: 'monthly'
  },
  {
    slug: 'pea-gravel-calculator',
    title: 'Pea Gravel Calculator',
    h1: 'Pea Gravel Cubic Yard Calculator',
    description: 'Calculate cubic yards of pea gravel for drainage, landscaping, dog runs, and pathways.',
    primaryKeyword: 'pea gravel calculator cubic yards',
    materialKey: 'peagravel',
    priority: 0.7,
    changeFrequency: 'monthly'
  },
  {
    slug: 'river-rock-calculator',
    title: 'River Rock Calculator',
    h1: 'River Rock Cubic Yard Calculator',
    description: 'Calculate cubic yards of river rock for landscaping, water features, and dry creek beds.',
    primaryKeyword: 'river rock calculator cubic yards',
    materialKey: 'riverrock',
    priority: 0.7,
    changeFrequency: 'monthly'
  },
  {
    slug: 'mulch-for-flower-beds-calculator',
    title: 'Mulch for Flower Beds Calculator',
    h1: 'Flower Bed Mulch Calculator',
    description: 'Calculate exactly how much mulch you need for flower beds. Enter your bed dimensions and target depth to get cubic yards.',
    primaryKeyword: 'mulch for flower beds calculator',
    materialKey: 'mulchflowerbeds',
    priority: 0.7,
    changeFrequency: 'monthly'
  }
];

// ---------------------------------------------------------------------------
// Shape pages
// ---------------------------------------------------------------------------
export const SHAPE_PAGES = [
  {
    slug: 'rectangle',
    title: 'Rectangular Area Calculator',
    h1: 'Cubic Yards for Rectangular Areas',
    description: 'Calculate cubic yards for rectangular or square areas. Enter length, width, and depth to get your volume instantly.',
    primaryKeyword: 'cubic yards rectangle calculator',
    priority: 0.8,
    changeFrequency: 'monthly'
  },
  {
    slug: 'circle',
    title: 'Circular Area Calculator',
    h1: 'Cubic Yards for Circular Areas',
    description: 'Calculate cubic yards for circular or cylindrical areas. Uses the formula π × r² × depth.',
    primaryKeyword: 'cubic yards circle calculator',
    priority: 0.8,
    changeFrequency: 'monthly'
  },
  {
    slug: 'triangle',
    title: 'Triangular Area Calculator',
    h1: 'Cubic Yards for Triangular Areas',
    description: 'Calculate cubic yards for triangular areas using base, height, and depth dimensions.',
    primaryKeyword: 'cubic yards triangle calculator',
    priority: 0.7,
    changeFrequency: 'monthly'
  },
  {
    slug: 'trapezoid',
    title: 'Trapezoid Area Calculator',
    h1: 'Cubic Yards for Trapezoid Areas',
    description: 'Calculate cubic yards for trapezoid-shaped areas. Enter both parallel sides, height, and depth.',
    primaryKeyword: 'cubic yards trapezoid calculator',
    priority: 0.7,
    changeFrequency: 'monthly'
  }
];

// ---------------------------------------------------------------------------
// Project pages
// ---------------------------------------------------------------------------
export const PROJECT_PAGES = [
  {
    slug: 'driveway',
    title: 'Driveway Material Calculator',
    h1: 'Driveway Cubic Yard Calculator',
    description: 'Calculate cubic yards of gravel, crushed stone, or asphalt for a driveway. Includes standard driveway size examples.',
    primaryKeyword: 'cubic yards for driveway',
    priority: 0.8,
    changeFrequency: 'monthly'
  },
  {
    slug: 'patio',
    title: 'Patio Material Calculator',
    h1: 'Patio Cubic Yard Calculator',
    description: 'Calculate cubic yards of concrete, gravel base, or sand for a patio project.',
    primaryKeyword: 'cubic yards for patio',
    priority: 0.8,
    changeFrequency: 'monthly'
  },
  {
    slug: 'slab',
    title: 'Concrete Slab Calculator',
    h1: 'Concrete Slab Cubic Yard Calculator',
    description: 'Calculate cubic yards of concrete for slabs, floors, and pads. Includes thickness recommendations.',
    primaryKeyword: 'concrete slab cubic yard calculator',
    priority: 0.9,
    changeFrequency: 'monthly'
  },
  {
    slug: 'garden-bed',
    title: 'Garden Bed Material Calculator',
    h1: 'Garden Bed Cubic Yard Calculator',
    description: 'Calculate cubic yards of topsoil, compost, or mulch needed for garden beds.',
    primaryKeyword: 'garden bed cubic yard calculator',
    priority: 0.8,
    changeFrequency: 'monthly'
  },
  {
    slug: 'raised-bed',
    title: 'Raised Garden Bed Calculator',
    h1: 'Raised Bed Soil Calculator',
    description: 'Calculate how many cubic yards of soil mix for raised garden beds. Includes recommended soil mixes.',
    primaryKeyword: 'raised garden bed soil calculator cubic yards',
    priority: 0.8,
    changeFrequency: 'monthly'
  },
  {
    slug: 'trench',
    title: 'Trench Fill Calculator',
    h1: 'Trench Cubic Yard Calculator',
    description: 'Calculate cubic yards to fill a trench for pipes, footings, or drainage.',
    primaryKeyword: 'trench cubic yard calculator',
    priority: 0.7,
    changeFrequency: 'monthly'
  }
];

// ---------------------------------------------------------------------------
// Converter pages
// ---------------------------------------------------------------------------
export const CONVERTER_PAGES = [
  {
    slug: 'cubic-feet-to-cubic-yards',
    title: 'Cubic Feet to Cubic Yards Converter',
    h1: 'Convert Cubic Feet to Cubic Yards',
    description: 'Free converter: divide cubic feet by 27 to get cubic yards. Instant results with formula and examples.',
    primaryKeyword: 'cubic feet to cubic yards',
    fromUnit: 'ft3', toUnit: 'yd3',
    priority: 0.9,
    changeFrequency: 'yearly'
  },
  {
    slug: 'cubic-inches-to-cubic-yards',
    title: 'Cubic Inches to Cubic Yards Converter',
    h1: 'Convert Cubic Inches to Cubic Yards',
    description: 'Convert cubic inches to cubic yards. Divide by 46,656. Instant converter with formula.',
    primaryKeyword: 'cubic inches to cubic yards',
    fromUnit: 'in3', toUnit: 'yd3',
    priority: 0.8,
    changeFrequency: 'yearly'
  },
  {
    slug: 'cubic-meters-to-cubic-yards',
    title: 'Cubic Meters to Cubic Yards Converter',
    h1: 'Convert Cubic Meters to Cubic Yards',
    description: 'Convert cubic meters to cubic yards. Multiply m³ by 1.30795. Instant converter.',
    primaryKeyword: 'cubic meters to cubic yards',
    fromUnit: 'm3', toUnit: 'yd3',
    priority: 0.8,
    changeFrequency: 'yearly'
  },
  {
    slug: 'cubic-yards-to-cubic-feet',
    title: 'Cubic Yards to Cubic Feet Converter',
    h1: 'Convert Cubic Yards to Cubic Feet',
    description: 'Convert cubic yards to cubic feet. Multiply yd³ by 27. Free instant converter.',
    primaryKeyword: 'cubic yards to cubic feet',
    fromUnit: 'yd3', toUnit: 'ft3',
    priority: 0.9,
    changeFrequency: 'yearly'
  },
  {
    slug: 'cubic-yards-to-tons',
    title: 'Cubic Yards to Tons Converter',
    h1: 'Convert Cubic Yards to Tons',
    description: 'Convert cubic yards to tons by material. Weight depends on material density. Includes gravel, topsoil, sand, and more.',
    primaryKeyword: 'cubic yards to tons',
    fromUnit: 'yd3', toUnit: 'tons',
    priority: 0.9,
    changeFrequency: 'yearly'
  },
  {
    slug: 'tons-to-cubic-yards',
    title: 'Tons to Cubic Yards Converter',
    h1: 'Convert Tons to Cubic Yards',
    description: 'Convert tons to cubic yards by material type. Enter weight in tons and select material.',
    primaryKeyword: 'tons to cubic yards',
    fromUnit: 'tons', toUnit: 'yd3',
    priority: 0.8,
    changeFrequency: 'yearly'
  },
  {
    slug: 'cubic-yards-to-cubic-meters',
    title: 'Cubic Yards to Cubic Meters Converter',
    h1: 'Convert Cubic Yards to Cubic Meters',
    description: 'Convert cubic yards to cubic meters. Multiply yd³ by 0.764555.',
    primaryKeyword: 'cubic yards to cubic meters',
    fromUnit: 'yd3', toUnit: 'm3',
    priority: 0.7,
    changeFrequency: 'yearly'
  },
  {
    slug: 'cubic-yards-to-gallons',
    title: 'Cubic Yards to Gallons Converter',
    h1: 'Convert Cubic Yards to Gallons',
    description: 'Convert cubic yards to gallons (US liquid). 1 cubic yard ≈ 201.97 gallons.',
    primaryKeyword: 'cubic yards to gallons',
    fromUnit: 'yd3', toUnit: 'gal',
    priority: 0.7,
    changeFrequency: 'yearly'
  }
];

// ---------------------------------------------------------------------------
// Guide pages
// ---------------------------------------------------------------------------
export const GUIDE_PAGES = [
  {
    slug: 'how-to-calculate-cubic-yards',
    title: 'How to Calculate Cubic Yards (Step-by-Step Guide)',
    h1: 'How to Calculate Cubic Yards',
    description: 'Step-by-step guide to calculating cubic yards manually. Includes the formula, inch-to-foot conversion, worked examples, and common mistakes.',
    primaryKeyword: 'how to calculate cubic yards',
    priority: 0.9,
    changeFrequency: 'yearly'
  },
  {
    slug: 'how-many-cubic-yards-in-a-dump-truck',
    title: 'How Many Cubic Yards in a Dump Truck?',
    h1: 'How Many Cubic Yards Does a Dump Truck Hold?',
    description: 'Dump truck cubic yard capacity varies by type. A standard tandem holds 10–14 yards; a full-size tri-axle holds 14–16 yards. Learn all types and how to estimate loads.',
    primaryKeyword: 'how many cubic yards in a dump truck',
    priority: 0.9,
    changeFrequency: 'yearly'
  },
  {
    slug: 'how-much-does-a-cubic-yard-weigh',
    title: 'How Much Does a Cubic Yard Weigh?',
    h1: 'How Much Does a Cubic Yard of Material Weigh?',
    description: 'Weight of a cubic yard depends on material. Concrete weighs ~4,050 lbs, topsoil ~2,200 lbs, mulch ~800 lbs. Full weight table with ranges.',
    primaryKeyword: 'how much does a cubic yard weigh',
    priority: 0.9,
    changeFrequency: 'yearly'
  },
  {
    slug: 'bags-of-concrete-per-cubic-yard',
    title: 'How Many Bags of Concrete in a Cubic Yard?',
    h1: 'How Many Bags of Concrete Make a Cubic Yard?',
    description: 'A cubic yard requires approximately 45 × 80-lb bags or 60 × 60-lb bags of concrete. Includes calculator and table.',
    primaryKeyword: 'how many bags of concrete in a cubic yard',
    priority: 0.9,
    changeFrequency: 'yearly'
  },
  {
    slug: 'mulch-coverage-per-cubic-yard',
    title: 'Mulch Coverage per Cubic Yard (Chart)',
    h1: 'How Much Area Does 1 Cubic Yard of Mulch Cover?',
    description: 'Coverage chart: 1 cubic yard of mulch covers 162 sq ft at 2 inches, 108 sq ft at 3 inches, 81 sq ft at 4 inches. Full depth chart included.',
    primaryKeyword: 'mulch coverage per cubic yard',
    priority: 0.8,
    changeFrequency: 'yearly'
  },
  {
    slug: 'how-much-topsoil-do-i-need',
    title: 'How Much Topsoil Do I Need?',
    h1: 'How Much Topsoil Do You Need?',
    description: 'Calculate how many cubic yards of topsoil you need for lawns, garden beds, and grading. Includes rule-of-thumb tables.',
    primaryKeyword: 'how much topsoil do i need',
    priority: 0.8,
    changeFrequency: 'yearly'
  }
];

// ---------------------------------------------------------------------------
// Hub pages
// ---------------------------------------------------------------------------
export const HUB_PAGES = [
  {
    path: '/calculators/',
    title: 'All Material Calculators',
    description: 'Browse all cubic yard calculators by material type: concrete, mulch, topsoil, gravel, sand, and more.',
    priority: 0.8
  },
  {
    path: '/shapes/',
    title: 'Calculators by Shape',
    description: 'Cubic yard calculators organized by shape: rectangle, circle, triangle, trapezoid.',
    priority: 0.7
  },
  {
    path: '/projects/',
    title: 'Calculators by Project',
    description: 'Cubic yard calculators for specific projects: driveway, patio, slab, garden bed, raised bed, trench.',
    priority: 0.7
  },
  {
    path: '/converters/',
    title: 'Volume Unit Converters',
    description: 'Free volume unit converters: cubic feet to yards, cubic meters, tons, gallons, and more.',
    priority: 0.8
  },
  {
    path: '/guides/',
    title: 'How-To Guides',
    description: 'In-depth guides on calculating cubic yards, dump truck capacities, material weights, and more.',
    priority: 0.7
  }
];

// ---------------------------------------------------------------------------
// Static pages
// ---------------------------------------------------------------------------
export const STATIC_PAGES = [
  { path: '/about/', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/contact/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/privacy-policy/', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms/', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/disclaimer/', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/editorial-policy/', priority: 0.3, changeFrequency: 'yearly' }
];

// Legacy redirected pages (for sitemap — keep them mapped to new URLs)
export const LEGACY_REDIRECTS = {
  '/how-to-calculate-cubic-yards/': '/guides/how-to-calculate-cubic-yards/',
  '/material-weight-per-cubic-yard/': '/guides/how-much-does-a-cubic-yard-weigh/',
  '/faq/': '/'
};

export default {
  CALCULATOR_PAGES,
  SHAPE_PAGES,
  PROJECT_PAGES,
  CONVERTER_PAGES,
  GUIDE_PAGES,
  HUB_PAGES,
  STATIC_PAGES
};
