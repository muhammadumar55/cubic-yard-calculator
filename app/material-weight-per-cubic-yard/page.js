export const dynamic = 'force-static';

export const metadata = {
  title: 'Material Weight Variations Per Cubic Yard',
  alternates: { canonical: '/material-weight-per-cubic-yard/' }
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Material Weight Variations Per Cubic Yard</h2>
        <p className="mt-2 text-slate-700 text-sm">These are common planning averages used by contractors. Actual delivered weight varies by moisture content and compaction.</p>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-900">Material Type</th>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-900">Avg. Weight per Cubic Yard (lbs)</th>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-900">Avg. Weight per Cubic Yard (Tons)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-3">Concrete</td>
                <td className="px-4 py-3">4,050</td>
                <td className="px-4 py-3">2.03</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Topsoil</td>
                <td className="px-4 py-3">2,200</td>
                <td className="px-4 py-3">1.10</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Gravel</td>
                <td className="px-4 py-3">2,800</td>
                <td className="px-4 py-3">1.40</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Mulch</td>
                <td className="px-4 py-3">800</td>
                <td className="px-4 py-3">0.40</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Sand</td>
                <td className="px-4 py-3">2,700</td>
                <td className="px-4 py-3">1.35</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-slate-600">Note: moisture can increase weight significantly (especially sand/topsoil). Always verify supplier ticket weights for hauling limits.</p>
      </section>
    </main>
  );
}
