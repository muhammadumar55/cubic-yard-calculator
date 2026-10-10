import Link from 'next/link';
import { SITE_NAME, FOOTER_COLUMNS, SOCIAL, SITE_URL, LAST_UPDATED } from '../../lib/site.js';

const BUILD_YEAR = new Date(LAST_UPDATED).getFullYear();

function SocialLink({ href, label, icon }) {
  if (!href) return null;
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={label}
      className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
    >
      {icon}
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 mt-20">
      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        {/* Brand + columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600 flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M11 2L20 7V15L11 20L2 15V7L11 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M11 2V20" stroke="white" strokeWidth="1.5"/>
                  <path d="M2 7L11 12L20 7" stroke="white" strokeWidth="1.5"/>
                </svg>
              </span>
              <span className="font-bold text-white text-sm">{SITE_NAME}</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Free, fast, and accurate. Calculate cubic yards for any bulk material project — no account required, works offline.
            </p>
            {/* Trust signals */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['Free forever', 'No sign-up', 'Works offline'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 rounded-full px-2.5 py-1">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                    <path d="M10 3L5 8.5 2 5.5l-1 1L5 10.5 11 4l-1-1z"/>
                  </svg>
                  {t}
                </span>
              ))}
            </div>
            {/* Social links */}
            <div className="mt-4 flex gap-1">
              <SocialLink
                href={SOCIAL.twitter} label="Twitter"
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
              />
              <SocialLink
                href={SOCIAL.facebook} label="Facebook"
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
              />
              <SocialLink
                href={SOCIAL.pinterest} label="Pinterest"
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>}
              />
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                {col.title}
              </h3>
              <nav aria-label={`${col.title} links`}>
                <ul role="list" className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 rounded-xl bg-slate-800/50 border border-slate-700 px-5 py-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Disclaimer:</strong> All calculations are estimates based on typical material densities and standard measurement conversions. Actual quantities will vary based on moisture content, compaction, material gradation, site conditions, and supplier specifications. Always confirm your order quantity with your supplier before purchase. Results are provided for planning purposes only.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {SITE_NAME}. All rights reserved.
            {' '}Last updated: <time dateTime={LAST_UPDATED}>{new Date(LAST_UPDATED + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>.
          </p>
          <p className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            Calculations run entirely in your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
