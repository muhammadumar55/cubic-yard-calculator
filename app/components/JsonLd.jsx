/**
 * JsonLd — safe server component for injecting JSON-LD structured data.
 * Escapes < and > to prevent XSS even though dangerouslySetInnerHTML is used.
 *
 * Usage:
 *   <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', ... }} />
 *   <JsonLd data={[{ '@type': 'WebSite', ... }, { '@type': 'FAQPage', ... }]} />
 */
export default function JsonLd({ data }) {
  const json = JSON.stringify(
    Array.isArray(data)
      ? { '@context': 'https://schema.org', '@graph': data }
      : data
  )
    // Escape < to prevent inline script injection
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
