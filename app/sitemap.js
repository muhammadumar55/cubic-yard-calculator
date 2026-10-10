import { SITE_URL } from '../lib/site.js';
import {
  CALCULATOR_PAGES,
  SHAPE_PAGES,
  PROJECT_PAGES,
  CONVERTER_PAGES,
  GUIDE_PAGES,
  HUB_PAGES,
  STATIC_PAGES
} from '../data/pages.js';

export const dynamic = 'force-static';

export default function sitemap() {
  const allRoutes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    ...CALCULATOR_PAGES.map(p => ({ path: `/materials/${p.slug}/`, priority: p.priority || 0.9, changeFrequency: p.changeFrequency || 'monthly' })),
    ...SHAPE_PAGES.map(p => ({ path: `/shapes/${p.slug}/`, priority: p.priority || 0.8, changeFrequency: p.changeFrequency || 'monthly' })),
    ...PROJECT_PAGES.map(p => ({ path: `/projects/${p.slug}/`, priority: p.priority || 0.8, changeFrequency: p.changeFrequency || 'monthly' })),
    ...CONVERTER_PAGES.map(p => ({ path: `/converters/${p.slug}/`, priority: p.priority || 0.8, changeFrequency: p.changeFrequency || 'monthly' })),
    ...GUIDE_PAGES.map(p => ({ path: `/guides/${p.slug}/`, priority: p.priority || 0.7, changeFrequency: p.changeFrequency || 'monthly' })),
    ...HUB_PAGES.map(p => ({ path: p.path, priority: p.priority || 0.7, changeFrequency: 'weekly' })),
    ...STATIC_PAGES.map(p => ({ path: p.path, priority: p.priority || 0.3, changeFrequency: p.changeFrequency || 'yearly' }))
  ];

  const now = new Date();

  return allRoutes.map(route => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
