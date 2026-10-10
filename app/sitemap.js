const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export default function sitemap() {
  const now = new Date();
  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${siteUrl}/how-to-calculate-cubic-yards/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${siteUrl}/material-weight-per-cubic-yard/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${siteUrl}/faq/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7
    }
  ];
}
