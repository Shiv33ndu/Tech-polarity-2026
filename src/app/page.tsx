import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CategoryNav } from '@/components/category-nav';
import { ArticleCard } from '@/components/article-card';
import { TrendingStories } from '@/components/trending-stories';
import { TrendingStoriesBottom } from '@/components/trending-stories-bottom';
import { Separator } from '@/components/ui/separator';
import { BarometerSidebar } from '@/components/barometer-sidebar';

import {
  getMainArticle,
  getRelatedArticles,
  getGlobalTrending,
} from '@/lib/api';

type Article = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  slug: string;
  domain_slug?: string;
  publishedAt?: string;
};

export default async function Home() {
  let mainArticle: Article | null = null;
  let relatedArticles: Article[] = [];
  let trending: Article[] = [];

  try {
    // ✅ FETCH MAIN ARTICLE
    const main = await getMainArticle();
    console.log("🔥 MAIN:", main);

    if (main) {
      mainArticle = {
        id: main.slug,
        title: main.title,
        description: main.description,
        image: main.image?.url || "/fallback.jpg",
        slug: main.slug,
        publishedAt: main.published_at,
      };
    }

    // ✅ ONLY FETCH RELATED IF MAIN EXISTS
    const relatedRes = main?.slug
      ? await getRelatedArticles(main.slug)
      : [];

    const trendingRes = await getGlobalTrending(6);

    const relatedData = Array.isArray(relatedRes) ? relatedRes : [];

    relatedArticles = relatedData.map((item: any, index: number) => ({
      id: item.slug || index,
      title: item.title,
      description: item.description,
      image: item.image?.url || "/fallback.jpg",
      slug: item.slug,
      publishedAt: item.published_at,
    }));

    const trendingData = Array.isArray(trendingRes) ? trendingRes : [];

    trending = trendingData
      .filter((item: any) => item.slug)
      .map((item: any) => ({
        id: item.slug,
        title: item.title,
        description: item.description,
        image: item.image?.url || "/fallback.jpg",
        slug: item.slug,
        domain_slug: item.domain_slug,
      }));

  } catch (error) {
    console.error("❌ API ERROR:", error);
  }

  // ✅ UI slicing
  const otherArticles = relatedArticles.slice(0, 4);
  const nextArticles = relatedArticles.slice(4, 6);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <p className="text-center text-muted-foreground text-sm font-medium tracking-widest uppercase mb-4">
          Tech that matters
        </p>

        <CategoryNav />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2">

            {/* ✅ MAIN ARTICLE */}
            {mainArticle ? (
              <ArticleCard article={mainArticle} isLarge />
            ) : (
              <p className="text-center text-gray-500">
                No main article available
              </p>
            )}

            {/* ✅ RELATED GRID */}
            {otherArticles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                {otherArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            <Separator className="my-8" />

            {/* ✅ HORIZONTAL LIST */}
            {nextArticles.length > 0 && (
              <div className="space-y-8">
                {nextArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    layout="horizontal"
                  />
                ))}
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <BarometerSidebar />

              {/* ✅ ONLY ONE */}
              <TrendingStories data={trending} />
            </div>
          </aside>
        </div>

        <TrendingStoriesBottom />
      </main>

      <Footer />
    </div>
  );
}