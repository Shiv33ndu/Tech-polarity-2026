
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CategoryNav } from '@/components/category-nav';
import { ArticleCard } from '@/components/article-card';
import { TrendingStories } from '@/components/trending-stories';
import { ARTICLES } from '@/lib/data';
import { TrendingStoriesBottom } from '@/components/trending-stories-bottom';
import { Separator } from '@/components/ui/separator';
import { BarometerSidebar } from '@/components/barometer-sidebar';

export default function Home() {
  const mainArticle = ARTICLES[0];
  const otherArticles = ARTICLES.slice(1, 4);
  const nextArticles = ARTICLES.slice(4, 6)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <h2 className="text-2xl font-bold mb-4 font-headline text-center">Trending</h2>
        <CategoryNav />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <ArticleCard article={mainArticle} isLarge />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
              {otherArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
             <Separator className="my-8" />
             <div className="space-y-8">
              {nextArticles.map((article) => (
                <ArticleCard key={article.id} article={article} layout="horizontal" />
              ))}
            </div>
          </div>
          {/* Trending sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <BarometerSidebar />
              <TrendingStories />
            </div>
          </aside>
        </div>
        <TrendingStoriesBottom />
      </main>
      <Footer />
    </div>
  );
}
