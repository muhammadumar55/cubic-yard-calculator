'use client';

import { useEffect } from 'react';
import { GA4_ID, PLAUSIBLE_DOMAIN } from '../../lib/site.js';

/**
 * Analytics component — loads GA4 and/or Plausible only if configured.
 * Strategy: afterInteractive (loads after page becomes interactive).
 * No cookies for Plausible. GA4 requires consent banner if serving EU users.
 */
export default function Analytics() {
  // Note: In a Server Component context, use next/script instead.
  // This is client-only because it uses useEffect for deferred loading.
  useEffect(() => {
    // Only run in production or when env vars are explicitly set
    if (typeof window === 'undefined') return;

    // Plausible (privacy-friendly, no cookies by default)
    if (PLAUSIBLE_DOMAIN) {
      const s = document.createElement('script');
      s.defer = true;
      s.dataset.domain = PLAUSIBLE_DOMAIN;
      s.src = 'https://plausible.io/js/plausible.js';
      document.head.appendChild(s);
    }

    // GA4 — only load if user has consented (no consent management implemented here)
    // IMPORTANT: If serving EU users (GDPR), implement a proper consent banner
    // before enabling GA4. The commented code below shows the pattern.
    /*
    if (GA4_ID) {
      const s1 = document.createElement('script');
      s1.async = true;
      s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
      document.head.appendChild(s1);

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA4_ID, { anonymize_ip: true });
    }
    */
  }, []);

  return null;
}
