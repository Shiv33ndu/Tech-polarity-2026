import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /search is intentionally left crawlable (not disallowed) so Googlebot
        // can see the page's own `noindex` meta tag and drop it from the index —
        // blocking it here would prevent Google from ever reading that tag.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
