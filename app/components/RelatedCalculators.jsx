import Link from 'next/link';

/**
 * RelatedCalculators — renders a grid of related page cards.
 * Pass an array of { label, href, description } objects.
 */
export default function RelatedCalculators({ title = 'Related Calculators', items = [] }) {
  if (!items.length) return null;

  return (
    <section className="mt-12" aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-xl font-bold text-slate-900 dark:text-white mb-5">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card group block p-5 hover:border-primary-300 dark:hover:border-primary-700 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/60 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {item.label}
                </p>
                {item.description && (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
                className="flex-shrink-0 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
