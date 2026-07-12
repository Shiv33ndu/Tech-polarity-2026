"use client";

import { useEffect, useState } from 'react';
import { ArticleCard } from '@/components/article-card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { getSections, getArticlesBySection } from '@/lib/api';

type Article = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  imageCredit?: string;
  slug: string;
  publishedAt?: string;
};

type Section = {
  name: string;
  slug: string;
  order: number;
  is_active: boolean;
};

const PAGE_SIZE_PER_SECTION = 3;

export function MoreArticlesFeed() {
  const [sections, setSections] = useState<Section[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [seenSlugs, setSeenSlugs] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);
  const [totals, setTotals] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getSections()
      .then((res: Section[]) => {
        if (!cancelled && Array.isArray(res)) setSections(res);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (sections.length && page === 0) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  const hasMore = sections.some((section) => {
    const total = totals[section.slug];
    return total === undefined || page * PAGE_SIZE_PER_SECTION < total;
  });

  const loadMore = async () => {
    if (loading || !sections.length) return;
    setLoading(true);
    const nextPage = page + 1;

    try {
      const results = await Promise.all(
        sections.map((section) =>
          getArticlesBySection(section.slug, nextPage, PAGE_SIZE_PER_SECTION)
        )
      );

      const newTotals: Record<string, number> = {};
      const newArticles: Article[] = [];
      const seen = new Set(seenSlugs);

      results.forEach((res, index) => {
        const section = sections[index];
        newTotals[section.slug] = res.total || 0;

        (res.items || []).forEach((item: any) => {
          if (!item.slug || seen.has(item.slug)) return;
          seen.add(item.slug);
          newArticles.push({
            id: item.slug,
            title: item.title,
            description: item.description || '',
            image: item.image?.url || '/fallback.jpg',
            imageCredit: item.image?.credit || '',
            slug: item.slug,
            publishedAt: item.published_at,
          });
        });
      });

      setArticles((prev) => [...prev, ...newArticles]);
      setSeenSlugs(seen);
      setTotals((prev) => ({ ...prev, ...newTotals }));
      setPage(nextPage);
    } catch {
      // leave state as-is; user can retry via the button
    } finally {
      setLoading(false);
    }
  };

  if (sections.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl sm:text-3xl font-bold font-headline mb-6 text-center text-[#EC1B25]">More Articles</h2>

      {articles.length > 0 && (
        <div className="space-y-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} layout="horizontal" compact />
          ))}
        </div>
      )}

      {(hasMore || loading) && (
        <div className="flex justify-center mt-10">
          <Button
            onClick={loadMore}
            disabled={loading}
            variant="outline"
            className="rounded-full px-8"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
