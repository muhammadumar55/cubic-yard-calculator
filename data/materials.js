/**
 * data/materials.js
 * Material density data with sourced references and min/typical/max ranges.
 *
 * Sources / basis:
 *  - Concrete: Portland Cement Association (PCA). Normal-weight concrete ≈ 145–150 lb/ft³.
 *    150 lb/ft³ × 27 = 4,050 lb/yd³.
 *  - Gravel (crushed): USGS, typical bulk density 95–110 lb/ft³ loose.
 *    Using 103 lb/ft³ typical → 2,781 lb/yd³ ≈ 2,800.
 *  - Topsoil: typical loose bulk density 75–100 lb/ft³.
 *    Using 82 lb/ft³ → 2,214 lb/yd³ ≈ 2,200.
 *  - Mulch (wood chip, loose): 20–35 lb/ft³. Using 27 → 730 lb/yd³ ≈ 800 (range accounts for moisture).
 *  - Sand (dry): 90–110 lb/ft³. Using 100 → 2,700 lb/yd³.
 *  - Crushed stone (3/4" granite): 95–105 lb/ft³. Using 100 → 2,700 lb/yd³.
 *  - Asphalt: 145 lb/ft³ → 3,915 lb/yd³ ≈ 3,900.
 *  - Compost: 40–60 lb/ft³. Using 50 → 1,350 lb/yd³.
 *  - Fill dirt: 75–95 lb/ft³. Using 85 → 2,295 lb/yd³ ≈ 2,300.
 *  - River rock: 95–105 lb/ft³. Using 100 → 2,700.
 *  - Pea gravel: 90–100 lb/ft³. Using 95 → 2,565 ≈ 2,600.
 *
 * All values are APPROXIMATIONS. Actual weight varies with moisture, compaction,
 * gradation, and source. Always confirm with your supplier's delivery tickets.
 */

/** @type {Record<string, import('./types').Material>} */
export const MATERIALS = {
  concrete: {
    slug: 'concrete',
    label: 'Concrete',
    description: 'Normal-weight ready-mix or site-mixed concrete.',
    lbsPerYd3Min: 3800,
    lbsPerYd3: 4050,
    lbsPerYd3Max: 4200,
    source: 'Portland Cement Association (PCA) — normal-weight concrete ~150 lb/ft³',
    defaultDepthIn: 4,
    bagYields: { 80: 0.60, 60: 0.45 }, // cu ft per bag
    color: '#94a3b8',
    icon: 'concrete'
  },
  gravel: {
    slug: 'gravel',
    label: 'Gravel',
    description: 'Washed pea gravel or crushed gravel, dry, loose.',
    lbsPerYd3Min: 2500,
    lbsPerYd3: 2800,
    lbsPerYd3Max: 3000,
    source: 'USGS — typical crushed gravel bulk density 95–110 lb/ft³',
    defaultDepthIn: 3,
    color: '#d1d5db',
    icon: 'gravel'
  },
  topsoil: {
    slug: 'topsoil',
    label: 'Topsoil',
    description: 'Loamy topsoil, loose to slightly compacted.',
    lbsPerYd3Min: 1700,
    lbsPerYd3: 2200,
    lbsPerYd3Max: 2700,
    source: 'Typical bulk density range 75–100 lb/ft³; varies greatly with moisture',
    defaultDepthIn: 6,
    color: '#78350f',
    icon: 'topsoil'
  },
  mulch: {
    slug: 'mulch',
    label: 'Wood Mulch',
    description: 'Shredded hardwood or bark mulch, loose.',
    lbsPerYd3Min: 400,
    lbsPerYd3: 800,
    lbsPerYd3Max: 1200,
    source: 'Hardwood mulch: 20–45 lb/ft³ depending on species and moisture',
    defaultDepthIn: 3,
    coverageSqFtPerYd3: { 2: 162, 3: 108, 4: 81 }, // at depth in inches
    color: '#713f12',
    icon: 'mulch'
  },
  sand: {
    slug: 'sand',
    label: 'Sand',
    description: 'Dry construction sand or masonry sand.',
    lbsPerYd3Min: 2400,
    lbsPerYd3: 2700,
    lbsPerYd3Max: 3000,
    source: 'Typical dry sand bulk density 90–110 lb/ft³',
    defaultDepthIn: 2,
    color: '#fef08a',
    icon: 'sand'
  },
  crushedstone: {
    slug: 'crushed-stone',
    label: 'Crushed Stone',
    description: 'Crushed granite, limestone, or trap rock.',
    lbsPerYd3Min: 2400,
    lbsPerYd3: 2700,
    lbsPerYd3Max: 2900,
    source: 'Typical crushed stone bulk density 95–105 lb/ft³',
    defaultDepthIn: 4,
    color: '#9ca3af',
    icon: 'crushedstone'
  },
  peagravel: {
    slug: 'pea-gravel',
    label: 'Pea Gravel',
    description: 'Small rounded pea gravel (3/8"), commonly used for drainage and landscaping.',
    lbsPerYd3Min: 2400,
    lbsPerYd3: 2600,
    lbsPerYd3Max: 2800,
    source: 'Pea gravel bulk density approx. 90–100 lb/ft³',
    defaultDepthIn: 2,
    color: '#e5e7eb',
    icon: 'peagravel'
  },
  compost: {
    slug: 'compost',
    label: 'Compost',
    description: 'Finished compost, mixed into garden beds or top-dressed.',
    lbsPerYd3Min: 1000,
    lbsPerYd3: 1350,
    lbsPerYd3Max: 1700,
    source: 'Bulk compost density varies: 40–60 lb/ft³ depending on moisture',
    defaultDepthIn: 3,
    color: '#4d7c0f',
    icon: 'compost'
  },
  asphalt: {
    slug: 'asphalt',
    label: 'Asphalt',
    description: 'Hot-mix asphalt (HMA) for driveways and roads.',
    lbsPerYd3Min: 3800,
    lbsPerYd3: 3900,
    lbsPerYd3Max: 4100,
    source: 'Asphalt bulk density ~145 lb/ft³ per NAPA standards',
    defaultDepthIn: 2,
    color: '#1c1917',
    icon: 'asphalt'
  },
  filldirt: {
    slug: 'fill-dirt',
    label: 'Fill Dirt',
    description: 'Subsoil fill, typically clay-heavy. Used for grading and backfill.',
    lbsPerYd3Min: 2000,
    lbsPerYd3: 2300,
    lbsPerYd3Max: 2700,
    source: 'Subsoil bulk density typically 75–95 lb/ft³; clay soils toward upper range',
    defaultDepthIn: 6,
    color: '#92400e',
    icon: 'filldirt'
  },
  riverrock: {
    slug: 'river-rock',
    label: 'River Rock',
    description: 'Smooth river rock, 1–3" diameter, used for landscaping and drainage.',
    lbsPerYd3Min: 2400,
    lbsPerYd3: 2700,
    lbsPerYd3Max: 2900,
    source: 'Similar to crushed stone; smooth rock packs slightly differently, ~95–105 lb/ft³',
    defaultDepthIn: 2,
    color: '#6b7280',
    icon: 'riverrock'
  },
  mulchflowerbeds: {
    slug: 'mulch-for-flower-beds',
    label: 'Mulch (Flower Beds)',
    description: 'Fine-textured decorative mulch used in flower beds.',
    lbsPerYd3Min: 400,
    lbsPerYd3: 700,
    lbsPerYd3Max: 1100,
    source: 'Fine bark or pine mulch, slightly denser than shredded hardwood',
    defaultDepthIn: 2,
    color: '#7c3aed',
    icon: 'mulch'
  }
};

/** Ordered list of material slugs for nav/dropdowns */
export const MATERIAL_SLUGS = Object.keys(MATERIALS);

/**
 * Get a material by calculator slug (e.g., "concrete-calculator" → concrete)
 * @param {string} calcSlug - e.g. "concrete-calculator"
 */
export function getMaterialByCalcSlug(calcSlug) {
  const materialSlug = calcSlug.replace('-calculator', '').replace(/-/g, '');
  // Try exact match first
  if (MATERIALS[materialSlug]) return MATERIALS[materialSlug];
  // Try with dashes normalized
  const entry = Object.values(MATERIALS).find(m => m.slug === calcSlug.replace('-calculator', ''));
  return entry || null;
}

export default MATERIALS;
