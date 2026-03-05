// frontend/app/robots.ts
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.riah-aljalid.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/',
          '/admin/*',
          '/api',
          '/api/',
          '/api/*',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}