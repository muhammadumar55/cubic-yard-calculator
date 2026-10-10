import Link from 'next/link';
import Calculator from './components/Calculator';

export const dynamic = 'force-static';

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
      <section id="calculator" className="-mt-10 pt-10">
        <Calculator />
      </section>

      <section className="mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Built for pros and homeowners</h2>
        <p className="mt-2 text-slate-700 text-sm sm:text-base">
          This tool is optimized for quick bulk-material ordering (mulch, gravel, topsoil, sand, concrete) and includes waste, weight, and cost estimators.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Link href="/how-to-calculate-cubic-yards/" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300">
            <h3 className="font-semibold">How to calculate cubic yards manually</h3>
            <p className="mt-1 text-sm text-slate-700">Formula, inch-to-foot conversions, and examples.</p>
          </Link>
          <Link href="/material-weight-per-cubic-yard/" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300">
            <h3 className="font-semibold">Material weight variations</h3>
            <p className="mt-1 text-sm text-slate-700">Average lbs/yd³ and tons/yd³ for common materials.</p>
          </Link>
          <Link href="/faq/" className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300">
            <h3 className="font-semibold">FAQ</h3>
            <p className="mt-1 text-sm text-slate-700">Bags per yard, mulch coverage, and conversions.</p>
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold tracking-tight">Professional notes</h2>
        <ul className="mt-2 text-sm text-slate-700 list-disc pl-5 space-y-1">
          <li><strong>Compaction:</strong> gravel and crushed stone often compact 10–15% depending on gradation.</li>
          <li><strong>Moisture:</strong> wet soil/sand can weigh significantly more than dry material.</li>
          <li><strong>Delivery:</strong> confirm maximum truck payload limits using the weight estimator.</li>
        </ul>
      </section>
    </main>
  );
}
