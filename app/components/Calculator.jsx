'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const MATERIALS = {
  concrete: { label: 'Concrete', lbsPerYd3: 4050 },
  gravel: { label: 'Gravel', lbsPerYd3: 2800 },
  topsoil: { label: 'Topsoil', lbsPerYd3: 2200 },
  mulch: { label: 'Mulch', lbsPerYd3: 800 },
  sand: { label: 'Sand', lbsPerYd3: 2700 },
  crushedstone: { label: 'Crushed Stone', lbsPerYd3: 2700 }
};

const STORAGE_KEY = 'cyc_next_state_v1';

function n(v) {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
}

function clampNonNegative(x) {
  return x < 0 ? 0 : x;
}

function feetFromFtIn(ft, inch) {
  return clampNonNegative(n(ft)) + clampNonNegative(n(inch)) / 12;
}

function depthFeet(value, unit) {
  const v = clampNonNegative(n(value));
  return unit === 'ft' ? v : v / 12;
}

function yd3FromFt3(ft3) { return ft3 / 27; }
function ft3FromYd3(yd3) { return yd3 * 27; }
function m3FromYd3(yd3) { return yd3 * 0.764554857984; }
function in3FromYd3(yd3) { return yd3 * 46656; }
function yd3FromIn3(in3) { return in3 / 46656; }
function yd3FromM3(m3) { return m3 * 1.307950619314392; }

function fmt(x, digits = 3) {
  if (!Number.isFinite(x) || x <= 0) return '—';
  return x.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: x < 1 ? Math.min(2, digits) : 0
  });
}

function money(x) {
  if (!Number.isFinite(x) || x <= 0) return '—';
  return x.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

export default function Calculator() {
  const [mode, setMode] = useState('rect');

  // Shared
  const [material, setMaterial] = useState('');
  const [waste, setWaste] = useState(10);
  const [price, setPrice] = useState('');
  const [priceUnit, setPriceUnit] = useState('yd3');

  // Rect
  const [rect, setRect] = useState({ lengthFt: '', lengthIn: '', widthFt: '', widthIn: '', depth: '', depthUnit: 'in' });
  // Circ
  const [circ, setCirc] = useState({ diamFt: '', diamIn: '', depth: '', depthUnit: 'in' });
  // Tri
  const [tri, setTri] = useState({ baseFt: '', baseIn: '', heightFt: '', heightIn: '', depth: '', depthUnit: 'in' });
  // Conv
  const [conv, setConv] = useState({ value: '', unit: 'ft3' });

  const copyBtnRef = useRef(null);

  // Restore
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (!s || typeof s !== 'object') return;
      if (s.mode) setMode(s.mode);
      if (s.material !== undefined) setMaterial(s.material);
      if (s.waste !== undefined) setWaste(Number(s.waste));
      if (s.price !== undefined) setPrice(String(s.price));
      if (s.priceUnit) setPriceUnit(s.priceUnit);
      if (s.rect) setRect(s.rect);
      if (s.circ) setCirc(s.circ);
      if (s.tri) setTri(s.tri);
      if (s.conv) setConv(s.conv);
    } catch {
      // ignore
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, material, waste, price, priceUnit, rect, circ, tri, conv }));
    } catch {
      // ignore
    }
  }, [mode, material, waste, price, priceUnit, rect, circ, tri, conv]);

  const baseYd3 = useMemo(() => {
    if (mode === 'conv') {
      const value = clampNonNegative(n(conv.value));
      if (!value) return 0;
      if (conv.unit === 'yd3') return value;
      if (conv.unit === 'ft3') return value / 27;
      if (conv.unit === 'in3') return yd3FromIn3(value);
      if (conv.unit === 'm3') return yd3FromM3(value);
      return 0;
    }

    if (mode === 'rect') {
      const L = feetFromFtIn(rect.lengthFt, rect.lengthIn);
      const W = feetFromFtIn(rect.widthFt, rect.widthIn);
      const D = depthFeet(rect.depth, rect.depthUnit);
      if (!L || !W || !D) return 0;
      return yd3FromFt3(L * W * D);
    }

    if (mode === 'circ') {
      const diam = feetFromFtIn(circ.diamFt, circ.diamIn);
      const D = depthFeet(circ.depth, circ.depthUnit);
      if (!diam || !D) return 0;
      const r = diam / 2;
      const area = Math.PI * r * r;
      return yd3FromFt3(area * D);
    }

    if (mode === 'tri') {
      const base = feetFromFtIn(tri.baseFt, tri.baseIn);
      const height = feetFromFtIn(tri.heightFt, tri.heightIn);
      const D = depthFeet(tri.depth, tri.depthUnit);
      if (!base || !height || !D) return 0;
      const area = 0.5 * base * height;
      return yd3FromFt3(area * D);
    }

    return 0;
  }, [mode, rect, circ, tri, conv]);

  const wasteMultiplier = 1 + clampNonNegative(n(waste)) / 100;
  const adjustedYd3 = baseYd3 * wasteMultiplier;

  const ft3 = ft3FromYd3(baseYd3);
  const m3 = m3FromYd3(baseYd3);

  const weight = useMemo(() => {
    if (!material || adjustedYd3 <= 0) return { lbs: 0, tons: 0 };
    const lbs = adjustedYd3 * MATERIALS[material].lbsPerYd3;
    return { lbs, tons: lbs / 2000 };
  }, [material, adjustedYd3]);

  const cost = useMemo(() => {
    const p = clampNonNegative(n(price));
    if (!p || adjustedYd3 <= 0) return 0;
    if (priceUnit === 'yd3') return adjustedYd3 * p;
    if (priceUnit === 'ton') {
      if (!material || weight.tons <= 0) return 0;
      return weight.tons * p;
    }
    return 0;
  }, [price, priceUnit, adjustedYd3, material, weight.tons]);

  const convOut = useMemo(() => {
    const yd3 = baseYd3;
    return {
      yd3,
      ft3: ft3FromYd3(yd3),
      in3: in3FromYd3(yd3),
      m3: m3FromYd3(yd3)
    };
  }, [baseYd3]);

  async function onCopy() {
    const lines = [];
    lines.push(`Cubic yards (base): ${baseYd3 > 0 ? fmt(baseYd3, 3) + ' yd³' : '—'}`);
    lines.push(`Cubic yards (with waste): ${adjustedYd3 > 0 ? fmt(adjustedYd3, 3) + ' yd³' : '—'}`);

    if (material && adjustedYd3 > 0) {
      lines.push(`Material: ${MATERIALS[material].label}`);
      lines.push(`Estimated weight: ${fmt(weight.lbs, 0)} lbs (${fmt(weight.tons, 2)} tons)`);
    }

    const p = clampNonNegative(n(price));
    if (p && adjustedYd3 > 0) {
      lines.push(`Price: ${money(p)} ${priceUnit === 'ton' ? 'per ton' : 'per yd³'}`);
      lines.push(`Estimated cost: ${money(cost)}`);
    }

    const text = lines.join('\n');

    try {
      await navigator.clipboard.writeText(text);
      if (copyBtnRef.current) {
        copyBtnRef.current.textContent = 'Copied!';
        window.setTimeout(() => {
          if (copyBtnRef.current) copyBtnRef.current.textContent = 'Copy summary';
        }, 1200);
      }
    } catch {
      // no-op
    }
  }

  return (
    <section aria-label="Cubic yard calculator" className="mt-5 rounded-2xl bg-white/95 text-slate-900 shadow-lg ring-1 ring-white/15 backdrop-blur">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* Tabs */}
          <div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Calculation modes">
              {[
                { key: 'rect', label: 'Rectangular' },
                { key: 'circ', label: 'Circular' },
                { key: 'tri', label: 'Triangular' },
                { key: 'conv', label: 'Convert Volume' }
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={mode === t.key}
                  onClick={() => setMode(t.key)}
                  className={
                    'rounded-full px-3 py-2 text-sm font-medium transition-colors ' +
                    (mode === t.key
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200')
                  }
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-600">Tip: enter feet + inches for dimensions. Depth can be entered in inches or feet.</p>
          </div>

          {/* Panels */}
          <div className="grid gap-4">
            {mode === 'rect' && (
              <div role="tabpanel">
                <div className="grid gap-4 md:grid-cols-3">
                  <fieldset className="rounded-xl border border-slate-200 p-3">
                    <legend className="px-1 text-sm font-semibold text-slate-800">Length</legend>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="rect-length-ft">Feet</label>
                        <input id="rect-length-ft" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={rect.lengthFt} onChange={(e) => setRect({ ...rect, lengthFt: e.target.value })} placeholder="e.g., 12" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="rect-length-in">Inches</label>
                        <input id="rect-length-in" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={rect.lengthIn} onChange={(e) => setRect({ ...rect, lengthIn: e.target.value })} placeholder="e.g., 6" />
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="rounded-xl border border-slate-200 p-3">
                    <legend className="px-1 text-sm font-semibold text-slate-800">Width</legend>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="rect-width-ft">Feet</label>
                        <input id="rect-width-ft" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={rect.widthFt} onChange={(e) => setRect({ ...rect, widthFt: e.target.value })} placeholder="e.g., 10" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="rect-width-in">Inches</label>
                        <input id="rect-width-in" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={rect.widthIn} onChange={(e) => setRect({ ...rect, widthIn: e.target.value })} placeholder="e.g., 0" />
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="rounded-xl border border-slate-200 p-3">
                    <legend className="px-1 text-sm font-semibold text-slate-800">Depth</legend>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="text-xs text-slate-700" htmlFor="rect-depth">Depth</label>
                        <input id="rect-depth" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={rect.depth} onChange={(e) => setRect({ ...rect, depth: e.target.value })} placeholder="e.g., 4" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="rect-depth-unit">Unit</label>
                        <select id="rect-depth-unit" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={rect.depthUnit} onChange={(e) => setRect({ ...rect, depthUnit: e.target.value })}>
                          <option value="in">in</option>
                          <option value="ft">ft</option>
                        </select>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            )}

            {mode === 'circ' && (
              <div role="tabpanel">
                <div className="grid gap-4 md:grid-cols-2">
                  <fieldset className="rounded-xl border border-slate-200 p-3">
                    <legend className="px-1 text-sm font-semibold text-slate-800">Diameter</legend>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="circ-diam-ft">Feet</label>
                        <input id="circ-diam-ft" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={circ.diamFt} onChange={(e) => setCirc({ ...circ, diamFt: e.target.value })} placeholder="e.g., 3" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="circ-diam-in">Inches</label>
                        <input id="circ-diam-in" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={circ.diamIn} onChange={(e) => setCirc({ ...circ, diamIn: e.target.value })} placeholder="e.g., 0" />
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-600">Uses area = πr².</p>
                  </fieldset>

                  <fieldset className="rounded-xl border border-slate-200 p-3">
                    <legend className="px-1 text-sm font-semibold text-slate-800">Depth</legend>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="text-xs text-slate-700" htmlFor="circ-depth">Depth</label>
                        <input id="circ-depth" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={circ.depth} onChange={(e) => setCirc({ ...circ, depth: e.target.value })} placeholder="e.g., 24" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="circ-depth-unit">Unit</label>
                        <select id="circ-depth-unit" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={circ.depthUnit} onChange={(e) => setCirc({ ...circ, depthUnit: e.target.value })}>
                          <option value="in">in</option>
                          <option value="ft">ft</option>
                        </select>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            )}

            {mode === 'tri' && (
              <div role="tabpanel">
                <div className="grid gap-4 md:grid-cols-3">
                  <fieldset className="rounded-xl border border-slate-200 p-3">
                    <legend className="px-1 text-sm font-semibold text-slate-800">Base</legend>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="tri-base-ft">Feet</label>
                        <input id="tri-base-ft" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={tri.baseFt} onChange={(e) => setTri({ ...tri, baseFt: e.target.value })} placeholder="e.g., 8" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="tri-base-in">Inches</label>
                        <input id="tri-base-in" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={tri.baseIn} onChange={(e) => setTri({ ...tri, baseIn: e.target.value })} placeholder="e.g., 0" />
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="rounded-xl border border-slate-200 p-3">
                    <legend className="px-1 text-sm font-semibold text-slate-800">Height</legend>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="tri-height-ft">Feet</label>
                        <input id="tri-height-ft" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={tri.heightFt} onChange={(e) => setTri({ ...tri, heightFt: e.target.value })} placeholder="e.g., 6" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="tri-height-in">Inches</label>
                        <input id="tri-height-in" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={tri.heightIn} onChange={(e) => setTri({ ...tri, heightIn: e.target.value })} placeholder="e.g., 0" />
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-600">Uses area = ½ × base × height.</p>
                  </fieldset>

                  <fieldset className="rounded-xl border border-slate-200 p-3">
                    <legend className="px-1 text-sm font-semibold text-slate-800">Depth</legend>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="text-xs text-slate-700" htmlFor="tri-depth">Depth</label>
                        <input id="tri-depth" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={tri.depth} onChange={(e) => setTri({ ...tri, depth: e.target.value })} placeholder="e.g., 3" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="tri-depth-unit">Unit</label>
                        <select id="tri-depth-unit" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={tri.depthUnit} onChange={(e) => setTri({ ...tri, depthUnit: e.target.value })}>
                          <option value="in">in</option>
                          <option value="ft">ft</option>
                        </select>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            )}

            {mode === 'conv' && (
              <div role="tabpanel">
                <div className="grid gap-4 md:grid-cols-2">
                  <fieldset className="rounded-xl border border-slate-200 p-3">
                    <legend className="px-1 text-sm font-semibold text-slate-800">Convert to Cubic Yards</legend>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="text-xs text-slate-700" htmlFor="conv-value">Volume</label>
                        <input id="conv-value" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.0001" inputMode="decimal" value={conv.value} onChange={(e) => setConv({ ...conv, value: e.target.value })} placeholder="e.g., 54" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-700" htmlFor="conv-unit">Unit</label>
                        <select id="conv-unit" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={conv.unit} onChange={(e) => setConv({ ...conv, unit: e.target.value })}>
                          <option value="ft3">cu ft</option>
                          <option value="in3">cu in</option>
                          <option value="m3">cu m</option>
                          <option value="yd3">cu yd</option>
                        </select>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-600">Common conversion: cu ft ÷ 27 = cu yd.</p>
                  </fieldset>

                  <div className="rounded-xl border border-slate-200 p-3">
                    <h2 className="text-sm font-semibold text-slate-800">Quick conversions</h2>
                    <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <dt className="text-xs text-slate-600">Cubic yards</dt>
                        <dd className="font-semibold">{fmt(convOut.yd3, 4)} yd³</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-600">Cubic feet</dt>
                        <dd className="font-semibold">{fmt(convOut.ft3, 3)} ft³</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-600">Cubic inches</dt>
                        <dd className="font-semibold">{fmt(convOut.in3, 0)} in³</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-600">Cubic meters</dt>
                        <dd className="font-semibold">{fmt(convOut.m3, 4)} m³</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Estimators */}
          <div className="grid gap-4 md:grid-cols-3">
            <fieldset className="rounded-xl border border-slate-200 p-3">
              <legend className="px-1 text-sm font-semibold text-slate-800">Material (optional)</legend>
              <label className="text-xs text-slate-700" htmlFor="material">Material type</label>
              <select id="material" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={material} onChange={(e) => setMaterial(e.target.value)}>
                <option value="">No material selected</option>
                {Object.entries(MATERIALS).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
              <p className="mt-2 text-xs text-slate-600">
                {material ? `${MATERIALS[material].label} average: ${MATERIALS[material].lbsPerYd3.toLocaleString()} lbs per yd³ (approx.).` : 'Select a material to estimate weight (lbs & tons).'}
              </p>
            </fieldset>

            <fieldset className="rounded-xl border border-slate-200 p-3">
              <legend className="px-1 text-sm font-semibold text-slate-800">Waste margin</legend>
              <div className="flex items-center justify-between gap-3">
                <label className="text-xs text-slate-700" htmlFor="waste">Waste margin</label>
                <output className="text-xs font-semibold text-slate-900">{waste}%</output>
              </div>
              <input id="waste" className="mt-2 w-full" type="range" min="0" max="30" step="1" value={waste} onChange={(e) => setWaste(Number(e.target.value))} />
              <p className="mt-2 text-xs text-slate-600">Add extra volume for spillage, compaction, and uneven grades.</p>
            </fieldset>

            <fieldset className="rounded-xl border border-slate-200 p-3">
              <legend className="px-1 text-sm font-semibold text-slate-800">Cost estimator</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="text-xs text-slate-700" htmlFor="price">Price</label>
                  <input id="price" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" type="number" min="0" step="0.01" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 55" />
                </div>
                <div>
                  <label className="text-xs text-slate-700" htmlFor="price-unit">Unit</label>
                  <select id="price-unit" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={priceUnit} onChange={(e) => setPriceUnit(e.target.value)}>
                    <option value="yd3">per yd³</option>
                    <option value="ton">per ton</option>
                  </select>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-600">Choose per yd³ for most suppliers. Use per ton when pricing is weight-based (requires material selection).</p>
            </fieldset>
          </div>

          {/* Results */}
          <section className="rounded-2xl bg-slate-900 text-white p-4 sm:p-5" aria-label="Results">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-semibold">Results</h2>
                <p className="text-xs text-slate-300">Updates in real time as you type.</p>
              </div>
              <button ref={copyBtnRef} onClick={onCopy} className="rounded-lg bg-white/10 hover:bg-white/15 px-3 py-2 text-xs font-medium" type="button">Copy summary</button>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3" aria-live="polite">
              <div className="rounded-xl bg-white/10 p-3">
                <div className="text-xs text-slate-300">Cubic yards (yd³)</div>
                <div className="mt-1 text-2xl font-semibold">{fmt(baseYd3, 3)}</div>
                <div className="mt-1 text-xs text-slate-300">{baseYd3 > 0 ? 'Base volume (before waste).' : 'Enter dimensions to calculate.'}</div>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <div className="text-xs text-slate-300">With waste margin</div>
                <div className="mt-1 text-2xl font-semibold">{fmt(adjustedYd3, 3)}</div>
                <div className="mt-1 text-xs text-slate-300">Adjusted order quantity</div>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <div className="text-xs text-slate-300">Cubic feet (cu ft)</div>
                <div className="mt-1 text-2xl font-semibold">{fmt(ft3, 2)}</div>
                <div className="mt-1 text-xs text-slate-300">(yd³ × 27)</div>
              </div>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-white/10 p-3">
                <div className="text-xs text-slate-300">Estimated weight</div>
                <div className="mt-1 text-base font-semibold">
                  {material && adjustedYd3 > 0 ? `${fmt(weight.lbs, 0)} lbs (${fmt(weight.tons, 2)} tons)` : '—'}
                </div>
                <div className="mt-1 text-xs text-slate-300">
                  {material ? (adjustedYd3 > 0 ? `Based on ${MATERIALS[material].lbsPerYd3.toLocaleString()} lbs/yd³ and adjusted volume.` : 'Enter dimensions to estimate weight.') : 'Select a material to estimate weight.'}
                </div>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <div className="text-xs text-slate-300">Estimated cost</div>
                <div className="mt-1 text-base font-semibold">{money(cost)}</div>
                <div className="mt-1 text-xs text-slate-300">
                  {clampNonNegative(n(price)) > 0
                    ? (adjustedYd3 > 0
                      ? (priceUnit === 'ton' && !material ? 'Select a material to estimate tons for per-ton pricing.' : 'Based on your price and adjusted volume.')
                      : 'Enter dimensions to estimate cost.')
                    : 'Add price and unit to estimate cost.'}
                </div>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <div className="text-xs text-slate-300">Metric reference</div>
                <div className="mt-1 text-base font-semibold">{fmt(m3, 3)}</div>
                <div className="mt-1 text-xs text-slate-300">Cubic meters (m³)</div>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-300">Estimates vary with moisture content, compaction, and supplier specs. For engineered pours, consult project plans and local code requirements.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
