export const dynamic = 'force-static';

export const metadata = {
  title: 'How to Calculate Cubic Yards (Manual Formula)',
  alternates: { canonical: '/how-to-calculate-cubic-yards/' }
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">How to Calculate Cubic Yards manually</h2>
        <div className="mt-3 text-slate-800 leading-relaxed">
          <p className="text-sm sm:text-base">If you want to double-check your order without a tool, the core formula is:</p>
          <p className="mt-2 font-semibold">(Length in Feet × Width in Feet × Depth in Feet) ÷ 27 = Cubic Yards</p>

          <h3 className="mt-5 text-base sm:text-lg font-semibold">Step-by-step</h3>
          <ol className="mt-2 list-decimal pl-5 space-y-2 text-sm sm:text-base">
            <li>Measure <strong>length</strong> and <strong>width</strong> in feet.</li>
            <li>Measure <strong>depth</strong>. If you measured depth in inches, convert to feet: <strong>depth (ft) = depth (in) ÷ 12</strong>.</li>
            <li>Multiply to get cubic feet: <strong>ft³ = L × W × D</strong>.</li>
            <li>Convert cubic feet to cubic yards by dividing by 27: <strong>yd³ = ft³ ÷ 27</strong>.</li>
          </ol>

          <p className="mt-3 text-sm text-slate-700">Example: 12 ft × 10 ft × 4 in deep → depth = 4/12 = 0.333 ft → ft³ = 12×10×0.333 ≈ 40 → yd³ = 40/27 ≈ 1.48 yd³.</p>
        </div>
      </article>
    </main>
  );
}
