import Link from 'next/link';
import { SITE_URL } from '../../lib/site.js';

/**
 * Breadcrumbs component.
 * Renders both visible UI breadcrumbs AND BreadcrumbList JSON-LD.
 *
 * @param {Array<{label: string, href?: string}>} items
 *   First item should be Home. Last item is the current page (no href).
 *   Example: [{ label: 'Home', href: '/' }, { label: 'Guides' }, { label: 'How to Calculate Cubic Yards' }]
 */
export default function Breadcrumbs({ items }) {
  if (!items || items.length < 2) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {})
    }))
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />

      {/* Visible breadcrumb nav */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol
          role="list"
          className="flex flex-wrap items-center gap-1 text-sm"
        >
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && (
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" aria-hidden="true"
                    className="text-slate-400 flex-shrink-0"
                  >
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-slate-500 dark:text-slate-400 truncate max-w-[200px]"
                    title={item.label}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
