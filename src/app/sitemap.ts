import type { MetadataRoute } from 'next';
import { getCategories, getSections, getArticlesByCategory } from '@/lib/api';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

const STATIC_PATHS = ['', '/about', '/contact', '/privacy'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, sections] = await Promise.all([
    getCategories().catch(() => []),
    getSections().catch(() => []),
  ]);

  const categoryList = Array.isArray(categories) ? categories : [];
  const sectionList = Array.isArray(sections) ? sections : [];

  const staticRoutes: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categoryList
    .filter((c: any) => c.slug)
    .map((c: any) => ({
      url: `${SITE_URL}/category/${c.slug}`,
      lastModified: new Date(),
    }));

  const sectionRoutes: MetadataRoute.Sitemap = sectionList
    .filter((s: any) => s.slug)
    .map((s: any) => ({
      url: `${SITE_URL}/section/${s.slug}`,
      lastModified: new Date(),
    }));

  // Best-effort article coverage: the backend has no "list all articles"
  // endpoint, so pull the latest page from each category and dedupe by slug.
  const articleLists = await Promise.all(
    categoryList
      .filter((c: any) => c.slug)
      .map((c: any) => getArticlesByCategory(c.slug, 1, 50).catch(() => ({ items: [] })))
  );

  const seen = new Set<string>();
  const articleRoutes: MetadataRoute.Sitemap = [];
  for (const list of articleLists) {
    for (const item of list.items || []) {
      if (item.slug && !seen.has(item.slug)) {
        seen.add(item.slug);
        articleRoutes.push({
          url: `${SITE_URL}/article/${item.slug}`,
          lastModified: item.published_at ? new Date(item.published_at) : new Date(),
        });
      }
    }
  }

  return [...staticRoutes, ...categoryRoutes, ...sectionRoutes, ...articleRoutes];
}
