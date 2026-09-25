import type { MetadataRoute } from 'next';
import { getCategories, getSections, getArticlesByCategory } from '@/lib/api';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

const STATIC_PATHS = ['', '/about', '/contact', '/privacy'];

// The backend has no "list all articles" endpoint, so we page through each
// category's article list (using the `total` it reports) until we've fetched
// everything, rather than only the first page — otherwise older articles
// beyond page 1 would never appear in the sitemap.
async function fetchAllArticlesForCategory(slug: string) {
  const limit = 100;
  const maxPages = 50; // safety cap against a runaway loop if `total` is wrong
  const items: any[] = [];

  for (let page = 1; page <= maxPages; page++) {
    const res = await getArticlesByCategory(slug, page, limit).catch(() => ({
      items: [],
      total: 0,
    }));
    const pageItems = res.items || [];
    items.push(...pageItems);

    if (pageItems.length === 0 || items.length >= (res.total || 0)) break;
  }

  return items;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, sections] = await Promise.all([
    getCategories().catch(() => []),
    getSections().catch(() => []),
  ]);

  const categoryList = Array.isArray(categories) ? categories : [];
  const sectionList = Array.isArray(sections) ? sections : [];

  // Static routes and taxonomy listing pages don't have a real "last modified"
  // timestamp available, so we omit the field rather than stamping every page
  // with the current build time on every revalidation.
  const staticRoutes: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categoryList
    .filter((c: any) => c.slug)
    .map((c: any) => ({
      url: `${SITE_URL}/category/${c.slug}`,
    }));

  const sectionRoutes: MetadataRoute.Sitemap = sectionList
    .filter((s: any) => s.slug)
    .map((s: any) => ({
      url: `${SITE_URL}/section/${s.slug}`,
    }));

  const articleLists = await Promise.all(
    categoryList.filter((c: any) => c.slug).map((c: any) => fetchAllArticlesForCategory(c.slug))
  );

  const seen = new Set<string>();
  const articleRoutes: MetadataRoute.Sitemap = [];
  for (const list of articleLists) {
    for (const item of list) {
      if (item.slug && !seen.has(item.slug)) {
        seen.add(item.slug);
        articleRoutes.push({
          url: `${SITE_URL}/article/${item.slug}`,
          lastModified: item.published_at ? new Date(item.published_at) : undefined,
        });
      }
    }
  }

  return [...staticRoutes, ...categoryRoutes, ...sectionRoutes, ...articleRoutes];
}
