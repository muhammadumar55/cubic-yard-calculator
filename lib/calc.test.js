/**
 * lib/calc.test.js
 * Vitest unit tests for lib/calc.js
 * Run with: npm run test
 */
import { describe, it, expect } from 'vitest';
import {
  safeNum, clampPositive, feetFromFtIn, toFeet,
  yd3FromFt3, ft3FromYd3, yd3FromIn3, in3FromYd3, yd3FromM3, m3FromYd3, galFromYd3,
  calcRectangle, calcCircle, calcTriangle, calcTrapezoid,
  convertToYd3, applyWaste, calcWeight, calcCost, bagsOfConcrete, truckLoads, sumAreas,
  FT3_PER_YD3, IN3_PER_YD3
} from './calc.js';

const EPSILON = 1e-9;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
describe('safeNum', () => {
  it('parses numbers', () => expect(safeNum('3.14')).toBe(3.14));
  it('returns 0 for empty string', () => expect(safeNum('')).toBe(0));
  it('returns 0 for NaN string', () => expect(safeNum('abc')).toBe(0));
  it('returns 0 for undefined', () => expect(safeNum(undefined)).toBe(0));
  it('returns 0 for Infinity', () => expect(safeNum(Infinity)).toBe(0));
});

describe('clampPositive', () => {
  it('clamps negatives to 0', () => expect(clampPositive(-5)).toBe(0));
  it('passes positive values', () => expect(clampPositive(3)).toBe(3));
  it('passes zero', () => expect(clampPositive(0)).toBe(0));
});

describe('feetFromFtIn', () => {
  it('converts 0 ft 6 in to 0.5 ft', () =>
    expect(feetFromFtIn(0, 6)).toBeCloseTo(0.5, 10));
  it('converts 1 ft 0 in to 1 ft', () =>
    expect(feetFromFtIn(1, 0)).toBe(1));
  it('converts 1 ft 6 in to 1.5 ft', () =>
    expect(feetFromFtIn(1, 6)).toBeCloseTo(1.5, 10));
  it('handles empty strings', () =>
    expect(feetFromFtIn('', '')).toBe(0));
  it('clamps negative values', () =>
    expect(feetFromFtIn(-2, -3)).toBe(0));
});

describe('toFeet', () => {
  it('ft is identity', () => expect(toFeet(1, 'ft')).toBe(1));
  it('12 in = 1 ft', () => expect(toFeet(12, 'in')).toBeCloseTo(1, 10));
  it('1 yd = 3 ft', () => expect(toFeet(1, 'yd')).toBe(3));
  it('100 cm ≈ 3.28 ft', () => expect(toFeet(100, 'cm')).toBeCloseTo(100 / 30.48, 6));
  it('1 m ≈ 3.28 ft', () => expect(toFeet(1, 'm')).toBeCloseTo(3.28084, 4));
});

// ---------------------------------------------------------------------------
// Volume conversions
// ---------------------------------------------------------------------------
describe('volume conversions', () => {
  it('yd3FromFt3: 27 cu ft = 1 cu yd', () =>
    expect(yd3FromFt3(27)).toBeCloseTo(1, 10));
  it('ft3FromYd3: 1 cu yd = 27 cu ft', () =>
    expect(ft3FromYd3(1)).toBe(27));
  it('yd3FromIn3: 46656 cu in = 1 cu yd', () =>
    expect(yd3FromIn3(IN3_PER_YD3)).toBeCloseTo(1, 10));
  it('in3FromYd3: 1 cu yd = 46656 cu in', () =>
    expect(in3FromYd3(1)).toBe(IN3_PER_YD3));
  it('yd3FromM3: 1 m3 ≈ 1.308 yd3', () =>
    expect(yd3FromM3(1)).toBeCloseTo(1.307950619314392, 6));
  it('m3FromYd3: 1 yd3 ≈ 0.765 m3', () =>
    expect(m3FromYd3(1)).toBeCloseTo(0.764554857984, 6));
  it('galFromYd3: 1 yd3 ≈ 201.97 gal', () =>
    expect(galFromYd3(1)).toBeCloseTo(201.97, 1));
  it('round trip ft3 → yd3 → ft3', () =>
    expect(ft3FromYd3(yd3FromFt3(54))).toBeCloseTo(54, 8));
});

// ---------------------------------------------------------------------------
// Shape calculations
// ---------------------------------------------------------------------------
describe('calcRectangle', () => {
  it('basic 10x12x4in', () => {
    // 10 ft * 12 ft * (4/12) ft / 27 = 10*12*0.3333.../27 ≈ 1.481 yd3
    const depth = toFeet(4, 'in');
    expect(calcRectangle(10, 12, depth)).toBeCloseTo(1.4815, 3);
  });
  it('returns 0 for zero dimensions', () =>
    expect(calcRectangle(0, 10, 0.25)).toBe(0));
  it('returns 0 for negative dimensions', () =>
    expect(calcRectangle(-5, 10, 0.25)).toBe(0));
  it('large rectangle', () => {
    // 100x50x1ft / 27 ≈ 185.19 yd3
    expect(calcRectangle(100, 50, 1)).toBeCloseTo(185.185, 2);
  });
  it('1x1x1ft = 1/27 yd3', () =>
    expect(calcRectangle(1, 1, 1)).toBeCloseTo(1 / 27, 10));
});

describe('calcCircle', () => {
  it('diameter 6ft depth 1ft', () => {
    // r=3, area=π*9, vol=π*9*1 ft3, /27 yd3
    expect(calcCircle(6, 1)).toBeCloseTo(Math.PI * 9 / 27, 6);
  });
  it('returns 0 for zero diameter', () =>
    expect(calcCircle(0, 1)).toBe(0));
  it('returns 0 for zero depth', () =>
    expect(calcCircle(10, 0)).toBe(0));
  it('matches formula: π*(d/2)² * depth / 27', () => {
    const d = 10, depth = 0.5;
    const expected = Math.PI * (d / 2) ** 2 * depth / 27;
    expect(calcCircle(d, depth)).toBeCloseTo(expected, 8);
  });
});

describe('calcTriangle', () => {
  it('base 8ft height 6ft depth 3in', () => {
    const depthFt = toFeet(3, 'in');
    const area = 0.5 * 8 * 6; // 24 sq ft
    expect(calcTriangle(8, 6, depthFt)).toBeCloseTo(yd3FromFt3(area * depthFt), 8);
  });
  it('returns 0 for zero base', () =>
    expect(calcTriangle(0, 6, 0.25)).toBe(0));
  it('returns 0 for zero depth', () =>
    expect(calcTriangle(8, 6, 0)).toBe(0));
  it('matches formula: 0.5*base*height*depth/27', () => {
    const b = 12, h = 8, D = 1;
    expect(calcTriangle(b, h, D)).toBeCloseTo(0.5 * b * h * D / 27, 8);
  });
});

describe('calcTrapezoid', () => {
  it('sides 8 and 12, height 5, depth 0.25', () => {
    const area = ((8 + 12) / 2) * 5; // 50 sq ft
    expect(calcTrapezoid(8, 12, 5, 0.25)).toBeCloseTo(yd3FromFt3(area * 0.25), 8);
  });
  it('returns 0 if both sides are 0', () =>
    expect(calcTrapezoid(0, 0, 5, 0.25)).toBe(0));
  it('degenerate to rectangle when sides equal', () => {
    // trapezoid with a=b=10, h=5, D=1 should equal rectangle 10x5x1
    expect(calcTrapezoid(10, 10, 5, 1)).toBeCloseTo(calcRectangle(10, 5, 1), 8);
  });
});

// ---------------------------------------------------------------------------
// convertToYd3
// ---------------------------------------------------------------------------
describe('convertToYd3', () => {
  it('yd3 identity', () => expect(convertToYd3(5, 'yd3')).toBe(5));
  it('54 ft3 = 2 yd3', () => expect(convertToYd3(54, 'ft3')).toBeCloseTo(2, 8));
  it('46656 in3 = 1 yd3', () => expect(convertToYd3(46656, 'in3')).toBeCloseTo(1, 8));
  it('1 m3 ≈ 1.308 yd3', () => expect(convertToYd3(1, 'm3')).toBeCloseTo(1.30795, 4));
  it('0 returns 0', () => expect(convertToYd3(0, 'ft3')).toBe(0));
  it('negative returns 0', () => expect(convertToYd3(-5, 'ft3')).toBe(0));
});

// ---------------------------------------------------------------------------
// Waste margin
// ---------------------------------------------------------------------------
describe('applyWaste', () => {
  it('10% waste on 1 yd3 = 1.1', () =>
    expect(applyWaste(1, 10)).toBeCloseTo(1.1, 10));
  it('0% waste is identity', () =>
    expect(applyWaste(2, 0)).toBe(2));
  it('100% waste doubles volume', () =>
    expect(applyWaste(3, 100)).toBeCloseTo(6, 10));
  it('negative waste treated as 0', () =>
    expect(applyWaste(1, -5)).toBe(1));
});

// ---------------------------------------------------------------------------
// Weight
// ---------------------------------------------------------------------------
describe('calcWeight', () => {
  it('topsoil: 1 yd3 at 2200 lbs/yd3', () => {
    const w = calcWeight(1, 2200);
    expect(w.lbs).toBe(2200);
    expect(w.tons).toBe(1.1);
  });
  it('concrete: 2 yd3 at 4050 lbs/yd3', () => {
    const w = calcWeight(2, 4050);
    expect(w.lbs).toBe(8100);
    expect(w.tons).toBe(4.05);
  });
  it('returns 0 for zero volume', () => {
    const w = calcWeight(0, 2200);
    expect(w.lbs).toBe(0);
    expect(w.tons).toBe(0);
  });
  it('returns 0 for zero density', () => {
    const w = calcWeight(1, 0);
    expect(w.lbs).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Cost
// ---------------------------------------------------------------------------
describe('calcCost', () => {
  it('per yd3 pricing: 2 yd3 at $50/yd3 = $100', () => {
    const c = calcCost(2, 2200, 50, 'yd3');
    expect(c.subtotal).toBe(100);
    expect(c.total).toBe(100);
  });
  it('per ton pricing: 1 yd3 at 2000 lbs/yd3 at $30/ton = $30', () => {
    const c = calcCost(1, 2000, 30, 'ton');
    expect(c.subtotal).toBe(30);
  });
  it('includes delivery fee', () => {
    const c = calcCost(1, 2000, 50, 'yd3', 25, 0);
    expect(c.total).toBe(75);
  });
  it('includes tax', () => {
    const c = calcCost(1, 2000, 100, 'yd3', 0, 10);
    expect(c.subtotal).toBe(100);
    expect(c.tax).toBeCloseTo(10, 8);
    expect(c.total).toBeCloseTo(110, 8);
  });
  it('returns 0 when no price', () => {
    const c = calcCost(2, 2200, 0, 'yd3');
    expect(c.total).toBe(0);
  });
  it('delivery fee applies even with no material price', () => {
    const c = calcCost(0, 2200, 0, 'yd3', 50, 0);
    expect(c.delivery).toBe(50);
    expect(c.total).toBe(50);
  });
});

// ---------------------------------------------------------------------------
// Bags of concrete
// ---------------------------------------------------------------------------
describe('bagsOfConcrete', () => {
  it('1 yd3 needs ~45 80-lb bags', () => {
    // 27 ft3 / 0.60 ft3 per bag = 45
    expect(bagsOfConcrete(1, 80)).toBe(45);
  });
  it('1 yd3 needs ~60 60-lb bags', () => {
    // 27 ft3 / 0.45 ft3 per bag = 60
    expect(bagsOfConcrete(1, 60)).toBe(60);
  });
  it('returns 0 for 0 yd3', () => expect(bagsOfConcrete(0, 80)).toBe(0));
  it('rounds up (ceiling)', () => {
    // 0.5 yd3 = 13.5 ft3, / 0.60 = 22.5 → ceil = 23
    expect(bagsOfConcrete(0.5, 80)).toBe(23);
  });
});

// ---------------------------------------------------------------------------
// Truckloads
// ---------------------------------------------------------------------------
describe('truckLoads', () => {
  it('14 yd3 = 1 load at default capacity', () =>
    expect(truckLoads(14)).toBe(1));
  it('15 yd3 = 2 loads at default 14 yd3 capacity', () =>
    expect(truckLoads(15)).toBe(2));
  it('0 yd3 = 0 loads', () =>
    expect(truckLoads(0)).toBe(0));
  it('custom 10 yd3 capacity: 25 yd3 = 3 loads', () =>
    expect(truckLoads(25, 10)).toBe(3));
});

// ---------------------------------------------------------------------------
// sumAreas
// ---------------------------------------------------------------------------
describe('sumAreas', () => {
  it('sums multiple areas', () =>
    expect(sumAreas([1, 2, 3])).toBeCloseTo(6, 10));
  it('ignores negative values', () =>
    expect(sumAreas([1, -1, 2])).toBeCloseTo(3, 10));
  it('empty array returns 0', () =>
    expect(sumAreas([])).toBe(0));
  it('ignores NaN', () =>
    expect(sumAreas([1, NaN, 2])).toBeCloseTo(3, 10));
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------
describe('edge cases', () => {
  it('calcRectangle with decimal depth in inches: 10x12x4in', () => {
    const depthFt = 4 / 12;
    expect(calcRectangle(10, 12, depthFt)).toBeCloseTo(40 / 27, 6);
  });
  it('calcCircle with very small diameter', () => {
    expect(calcCircle(0.001, 1)).toBeGreaterThan(0);
  });
  it('huge rectangle does not overflow', () => {
    expect(calcRectangle(10000, 10000, 10)).toBeGreaterThan(0);
  });
  it('applyWaste with decimal percent', () =>
    expect(applyWaste(1, 7.5)).toBeCloseTo(1.075, 10));
  it('calcCost per ton with no material (density=0) returns 0 subtotal', () => {
    const c = calcCost(2, 0, 30, 'ton');
    expect(c.subtotal).toBe(0);
  });
});
