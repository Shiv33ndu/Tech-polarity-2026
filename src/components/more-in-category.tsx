"use client";

import { useState } from 'react';
import { ArticleCard } from '@/components/article-card';
import { Button } from '@/components/ui/button';

type Article = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  imageCredit?: string;
  slug: string;
  publishedAt?: string;
};

const INITIAL_VISIBLE = 10;
const LOAD_MORE_STEP = 10;

interface MoreInCategoryProps {
  articles: Article[];
}

export function MoreInCategory({ articles }: MoreInCategoryProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  if (!articles.length) return null;

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <>
      <div className="space-y-4">
        {visibleArticles.map((article) => (
          <ArticleCard key={article.id} article={article} layout="horizontal" compact />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
            variant="outline"
            className="rounded-full px-8"
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
}
