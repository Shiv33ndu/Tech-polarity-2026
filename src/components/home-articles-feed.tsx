import { ArticleCard } from '@/components/article-card';

type Article = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  imageCredit?: string;
  slug: string;
  domain_slug?: string;
  publishedAt?: string;
};

interface HomeArticlesFeedProps {
  initialArticles: Article[];
  mainSlug?: string;
}

export function HomeArticlesFeed({ initialArticles }: HomeArticlesFeedProps) {
  if (!initialArticles.length) return null;

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {initialArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
