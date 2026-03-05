// frontend/app/sitemap.ts
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.riah-aljalid.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // صفحاتك الأساسية
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
    '/maintenance',
  ];

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));
}