import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CategoryNav } from '@/components/category-nav';
import { ArticleCard } from '@/components/article-card';
import { HomeArticlesFeed } from '@/components/home-articles-feed';
import { TrendingStories } from '@/components/trending-stories';
import { TrendingStoriesBottom } from '@/components/trending-stories-bottom';
import { MoreArticlesFeed } from '@/components/more-articles-feed';
import { Separator } from '@/components/ui/separator';
import { BarometerSidebar } from '@/components/barometer-sidebar';

import {
  getMainArticle,
  getRelatedArticles,
} from '@/lib/api';

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

export default async function Home() {
  let mainArticle: Article | null = null;
  let relatedArticles: Article[] = [];

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
        imageCredit: main.image?.credit || '',
        slug: main.slug,
        publishedAt: main.published_at,
      };
    }

    // ✅ ONLY FETCH RELATED IF MAIN EXISTS
    const relatedRes = main?.slug
      ? await getRelatedArticles(main.slug)
      : [];

    const relatedData = Array.isArray(relatedRes) ? relatedRes : [];

    relatedArticles = relatedData.map((item: any, index: number) => ({
      id: item.slug || index,
      title: item.title,
      description: item.description,
      image: item.image?.url || "/fallback.jpg",
      imageCredit: item.image?.credit || '',
      slug: item.slug,
      publishedAt: item.published_at,
    }));

  } catch (error) {
    console.error("❌ API ERROR:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="relative w-full max-w-2xl mx-auto mb-10 sm:mb-16 aspect-[839/158]">
          <Image
            src="/header.png"
            alt="Tech Polarity"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 672px"
          />
        </div>

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

            {/* ✅ ALL ARTICLES + LOAD MORE */}
            {relatedArticles.length > 0 && (
              <>
                <Separator className="my-8" />
                <HomeArticlesFeed
                  initialArticles={relatedArticles}
                  mainSlug={mainArticle?.slug}
                />
              </>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <BarometerSidebar />

              <TrendingStories />
            </div>
          </aside>
        </div>

        <TrendingStoriesBottom />

        <MoreArticlesFeed />
      </main>

      <Footer />
    </div>
  );
}