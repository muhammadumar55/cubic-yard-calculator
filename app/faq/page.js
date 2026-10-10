export const dynamic = 'force-static';

export const metadata = {
  title: 'Cubic Yard Calculator FAQ',
  alternates: { canonical: '/faq/' }
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Frequently Asked Questions (FAQ)</h2>

        <div className="mt-4 grid gap-3">
          <details className="rounded-2xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-semibold">What is a cubic yard?</summary>
            <p className="mt-2 text-sm text-slate-700">A cubic yard (yd³) is a unit of volume equal to <strong>27 cubic feet</strong>. Think of a box that’s <strong>3 ft × 3 ft × 3 ft</strong>. Bulk materials like mulch, gravel, topsoil, and concrete are commonly sold by the yard.</p>
          </details>

          <details className="rounded-2xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-semibold">How many bags of concrete make a cubic yard?</summary>
            <p className="mt-2 text-sm text-slate-700">One cubic yard is <strong>27 cu ft</strong>. Many 80-lb bags yield about <strong>0.60 cu ft</strong> each (≈ <strong>45 bags</strong> per yard), and many 60-lb bags yield about <strong>0.45 cu ft</strong> each (≈ <strong>60 bags</strong> per yard). Always confirm the yield printed on your bag.</p>
          </details>

          <details className="rounded-2xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-semibold">How much area does 1 cubic yard of mulch cover at a 3-inch depth?</summary>
            <p className="mt-2 text-sm text-slate-700">At <strong>3 inches</strong> (0.25 ft) deep, one cubic yard (27 cu ft) covers about <strong>108 sq ft</strong> (27 ÷ 0.25). A common landscaping rule of thumb is about <strong>~100 sq ft</strong> per yard at 3-inch depth.</p>
          </details>

          <details className="rounded-2xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-semibold">How do you convert cubic feet directly to cubic yards?</summary>
            <p className="mt-2 text-sm text-slate-700">Divide cubic feet by <strong>27</strong>. Example: <strong>54 cu ft ÷ 27 = 2 yd³</strong>.</p>
          </details>
        </div>
      </section>
    </main>
  );
}
