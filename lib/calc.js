/**
 * lib/calc.js
 * Pure, documented calculation functions for the Cubic Yard Calculator.
 * No React, no DOM, no side effects — fully testable.
 *
 * Formulas:
 *   Cubic yards = (L_ft × W_ft × D_ft) / 27
 *   Circle area = π × r²  where r = diameter / 2
 *   Triangle area = (base × height) / 2
 *   Trapezoid area = ((a + b) / 2) × height
 *   1 cubic foot  = 0.037037037... cubic yards  (= 1/27)
 *   1 cubic meter = 1.307950619314392 cubic yards
 *   1 cubic inch  = 1/46656 cubic yards
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const FT3_PER_YD3 = 27;
export const IN3_PER_YD3 = 46656; // 27 * 12^3
export const M3_PER_YD3 = 0.764554857984; // 1 yd3 in m3
export const YD3_PER_M3 = 1.307950619314392;
export const GAL_PER_YD3 = 201.97402597402597; // 27 * 7.48052
export const LBS_PER_TON = 2000;

// ---------------------------------------------------------------------------
// Unit helpers
// ---------------------------------------------------------------------------

/** Clamp to non-negative. */
export function clampPositive(x) {
  return x < 0 ? 0 : x;
}

/** Safely parse to finite number, returning 0 for invalid values. */
export function safeNum(v) {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
}

/** Convert feet + inches to feet. */
export function feetFromFtIn(ft, inches) {
  return clampPositive(safeNum(ft)) + clampPositive(safeNum(inches)) / 12;
}

/**
 * Convert a dimension to feet based on unit string.
 * @param {number|string} value
 * @param {'ft'|'in'|'yd'|'cm'|'m'} unit
 */
export function toFeet(value, unit) {
  const v = clampPositive(safeNum(value));
  switch (unit) {
    case 'ft': return v;
    case 'in': return v / 12;
    case 'yd': return v * 3;
    case 'cm': return v / 30.48;
    case 'm':  return v * 3.28084;
    default:   return v;
  }
}

// ---------------------------------------------------------------------------
// Volume conversions
// ---------------------------------------------------------------------------

export function yd3FromFt3(ft3)  { return safeNum(ft3) / FT3_PER_YD3; }
export function ft3FromYd3(yd3)  { return safeNum(yd3) * FT3_PER_YD3; }
export function yd3FromIn3(in3)  { return safeNum(in3) / IN3_PER_YD3; }
export function in3FromYd3(yd3)  { return safeNum(yd3) * IN3_PER_YD3; }
export function yd3FromM3(m3)    { return safeNum(m3) * YD3_PER_M3; }
export function m3FromYd3(yd3)   { return safeNum(yd3) * M3_PER_YD3; }
export function galFromYd3(yd3)  { return safeNum(yd3) * GAL_PER_YD3; }

// ---------------------------------------------------------------------------
// Shape calculations (all return cubic yards)
// ---------------------------------------------------------------------------

/**
 * Rectangle / square slab.
 * @param {number} lengthFt
 * @param {number} widthFt
 * @param {number} depthFt
 * @returns {number} cubic yards
 */
export function calcRectangle(lengthFt, widthFt, depthFt) {
  const L = clampPositive(safeNum(lengthFt));
  const W = clampPositive(safeNum(widthFt));
  const D = clampPositive(safeNum(depthFt));
  if (!L || !W || !D) return 0;
  return yd3FromFt3(L * W * D);
}

/**
 * Circle / cylinder.
 * @param {number} diameterFt
 * @param {number} depthFt
 * @returns {number} cubic yards
 */
export function calcCircle(diameterFt, depthFt) {
  const d = clampPositive(safeNum(diameterFt));
  const D = clampPositive(safeNum(depthFt));
  if (!d || !D) return 0;
  const r = d / 2;
  const area = Math.PI * r * r;
  return yd3FromFt3(area * D);
}

/**
 * Triangle (right or any — uses ½ base × height formula).
 * @param {number} baseFt
 * @param {number} heightFt
 * @param {number} depthFt
 * @returns {number} cubic yards
 */
export function calcTriangle(baseFt, heightFt, depthFt) {
  const b = clampPositive(safeNum(baseFt));
  const h = clampPositive(safeNum(heightFt));
  const D = clampPositive(safeNum(depthFt));
  if (!b || !h || !D) return 0;
  const area = 0.5 * b * h;
  return yd3FromFt3(area * D);
}

/**
 * Trapezoid — parallel sides a and b, height h, depth D.
 * @param {number} sideAFt
 * @param {number} sideBFt
 * @param {number} heightFt
 * @param {number} depthFt
 * @returns {number} cubic yards
 */
export function calcTrapezoid(sideAFt, sideBFt, heightFt, depthFt) {
  const a = clampPositive(safeNum(sideAFt));
  const b = clampPositive(safeNum(sideBFt));
  const h = clampPositive(safeNum(heightFt));
  const D = clampPositive(safeNum(depthFt));
  if ((!a && !b) || !h || !D) return 0;
  const area = ((a + b) / 2) * h;
  return yd3FromFt3(area * D);
}

// ---------------------------------------------------------------------------
// Volume unit conversion (for the "Convert Volume" tab)
// ---------------------------------------------------------------------------

/**
 * Convert from a given unit to cubic yards.
 * @param {number} value
 * @param {'yd3'|'ft3'|'in3'|'m3'} unit
 * @returns {number} cubic yards
 */
export function convertToYd3(value, unit) {
  const v = clampPositive(safeNum(value));
  if (!v) return 0;
  switch (unit) {
    case 'yd3': return v;
    case 'ft3': return yd3FromFt3(v);
    case 'in3': return yd3FromIn3(v);
    case 'm3':  return yd3FromM3(v);
    default:    return 0;
  }
}

// ---------------------------------------------------------------------------
// Waste margin
// ---------------------------------------------------------------------------

/**
 * Apply a waste margin percentage.
 * @param {number} yd3
 * @param {number} wastePercent — e.g. 10 for 10%
 * @returns {number}
 */
export function applyWaste(yd3, wastePercent) {
  const pct = clampPositive(safeNum(wastePercent));
  return safeNum(yd3) * (1 + pct / 100);
}

// ---------------------------------------------------------------------------
// Weight
// ---------------------------------------------------------------------------

/**
 * Calculate weight from cubic yards and density.
 * @param {number} yd3
 * @param {number} lbsPerYd3
 * @returns {{ lbs: number, tons: number }}
 */
export function calcWeight(yd3, lbsPerYd3) {
  const v = clampPositive(safeNum(yd3));
  const d = clampPositive(safeNum(lbsPerYd3));
  if (!v || !d) return { lbs: 0, tons: 0 };
  const lbs = v * d;
  return { lbs, tons: lbs / LBS_PER_TON };
}

// ---------------------------------------------------------------------------
// Cost
// ---------------------------------------------------------------------------

/**
 * Calculate estimated cost.
 * @param {number} yd3 - adjusted volume (with waste)
 * @param {number} lbsPerYd3 - material density (used for per-ton pricing)
 * @param {number} priceAmount
 * @param {'yd3'|'ton'} priceUnit
 * @param {number} deliveryFee
 * @param {number} taxPercent
 * @returns {{ subtotal: number, tax: number, delivery: number, total: number }}
 */
export function calcCost(yd3, lbsPerYd3, priceAmount, priceUnit, deliveryFee = 0, taxPercent = 0) {
  const v = clampPositive(safeNum(yd3));
  const p = clampPositive(safeNum(priceAmount));
  const d = clampPositive(safeNum(deliveryFee));
  const t = clampPositive(safeNum(taxPercent));

  if (!p || !v) return { subtotal: 0, tax: 0, delivery: d, total: d };

  let subtotal = 0;
  if (priceUnit === 'yd3') {
    subtotal = v * p;
  } else if (priceUnit === 'ton') {
    const { tons } = calcWeight(v, lbsPerYd3);
    subtotal = tons * p;
  }

  const tax = subtotal * (t / 100);
  const total = subtotal + tax + d;
  return { subtotal, tax, delivery: d, total };
}

// ---------------------------------------------------------------------------
// Bags of material
// ---------------------------------------------------------------------------

/**
 * Calculate number of bags of concrete needed.
 * @param {number} yd3 - required volume in cubic yards
 * @param {number} bagWeightLbs - 60 or 80
 * @returns {number} bags (rounded up)
 */
export function bagsOfConcrete(yd3, bagWeightLbs) {
  const v = clampPositive(safeNum(yd3));
  if (!v) return 0;
  // Typical yields: 80 lb bag ≈ 0.60 cu ft, 60 lb bag ≈ 0.45 cu ft
  const yieldFt3 = bagWeightLbs >= 80 ? 0.60 : 0.45;
  const ft3Needed = ft3FromYd3(v);
  return Math.ceil(ft3Needed / yieldFt3);
}

// ---------------------------------------------------------------------------
// Truckloads
// ---------------------------------------------------------------------------

/**
 * Estimate number of standard dump truck loads.
 * A standard tandem dump truck carries ~10–14 cubic yards.
 * @param {number} yd3
 * @param {number} truckCapacityYd3 - default 14 (tandem)
 * @returns {number} loads (rounded up)
 */
export function truckLoads(yd3, truckCapacityYd3 = 14) {
  const v = clampPositive(safeNum(yd3));
  const cap = clampPositive(safeNum(truckCapacityYd3));
  if (!v || !cap) return 0;
  return Math.ceil(v / cap);
}

// ---------------------------------------------------------------------------
// Multiple areas helper
// ---------------------------------------------------------------------------

/**
 * Sum an array of volumes (cubic yards).
 * @param {number[]} areas
 * @returns {number}
 */
export function sumAreas(areas) {
  return areas.reduce((acc, a) => acc + clampPositive(safeNum(a)), 0);
}
