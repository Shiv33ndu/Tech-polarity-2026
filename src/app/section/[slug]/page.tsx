import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ArticleCard } from '@/components/article-card';
import { Button } from '@/components/ui/button';
import { getArticlesBySection, getSections } from '@/lib/api';
import { SITE_URL } from '@/lib/site';

type Article = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  imageCredit?: string;
  slug: string;
  publishedAt?: string;
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const sections = await getSections();
  const section = (Array.isArray(sections) ? sections : []).find(
    (s: any) => s.slug === slug
  );
  const name = section?.name || slug.replace(/-/g, ' ');
  const page = parseInt(pageParam || '1', 10);
  const title = `${name}${page > 1 ? ` – Page ${page}` : ''}`;
  const description = `Latest ${name} news, articles, and updates from TechPolarity.`;
  const canonicalPath = `/section/${slug}${page > 1 ? `?page=${page}` : ''}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: { title, description, url: `${SITE_URL}${canonicalPath}` },
  };
}

export default async function SectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || '1', 10);
  const limit = 12;

  const [sectionsRes, data] = await Promise.all([
    getSections(),
    getArticlesBySection(slug, page, limit),
  ]);

  const sections = Array.isArray(sectionsRes) ? sectionsRes : [];
  const section = sections.find((s: any) => s.slug === slug);

  // Only 404 when the sections list loaded successfully and the slug truly
  // isn't one of them — an empty list usually means the sections fetch failed.
  if (sections.length > 0 && !section) {
    notFound();
  }

  const sectionName = section?.name || slug;

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
      <Header activeSection={slug} />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-headline capitalize">
              {sectionName}
            </h1>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl font-semibold text-muted-foreground">
              No articles found in this section yet.
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
                    <Link href={`/section/${slug}?page=${page - 1}`}>
                      Previous
                    </Link>
                  </Button>
                )}

                <span className="text-muted-foreground text-sm">
                  Page {page} of {totalPages}
                </span>

                {page < totalPages && (
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href={`/section/${slug}?page=${page + 1}`}>
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
