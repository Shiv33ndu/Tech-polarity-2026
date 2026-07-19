import Link from 'next/link';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ArticleCard } from '@/components/article-card';
import { Button } from '@/components/ui/button';
import { getArticlesByCategory, getCategories } from '@/lib/api';

type Article = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  imageCredit?: string;
  slug: string;
  publishedAt?: string;
};

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 12;

  const [categoriesRes, data] = await Promise.all([
    getCategories(),
    getArticlesByCategory(params.slug, page, limit),
  ]);

  const category = categoriesRes.find((c: any) => c.slug === params.slug);
  const categoryName = category?.name || params.slug;

  const items: Article[] = (data.items || []).map((item: any, index: number) => ({
    id: item.slug || index,
    title: item.title,
    description: item.description || '',
    image: item.image?.url || '/fallback.jpg',
    imageCredit: item.image?.credit || '',
    slug: item.slug,
    publishedAt: item.published_at,
  }));

  const totalPages = Math.ceil((data.total || 0) / limit);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline capitalize">
            {categoryName}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl font-semibold text-muted-foreground">
              No articles found in this category yet.
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                {page > 1 && (
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href={`/category/${params.slug}?page=${page - 1}`}>
                      Previous
                    </Link>
                  </Button>
                )}

                <span className="text-muted-foreground text-sm">
                  Page {page} of {totalPages}
                </span>

                {page < totalPages && (
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href={`/category/${params.slug}?page=${page + 1}`}>
                      Next
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
