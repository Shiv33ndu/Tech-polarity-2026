import Link from 'next/link';
import { Search } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { searchArticles } from '@/lib/api';
import { cn } from '@/lib/utils';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" – Search – TechPolarity` : 'Search – TechPolarity',
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q: query = '', page: pageStr = '1' } = await searchParams;
  const page = Math.max(1, parseInt(pageStr, 10) || 1);
  const limit = 12;

  let results: { items: any[]; total: number; page: number; limit: number } = {
    items: [],
    total: 0,
    page,
    limit,
  };

  if (query.trim().length >= 2) {
    results = await searchArticles(query.trim(), page, limit);
  }

  const totalPages = Math.ceil(results.total / limit);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        {/* Page header */}
        <div className="mb-8 border-b pb-6">
          {query ? (
            <>
              <h1 className="text-2xl font-bold">
                Results for{' '}
                <span className="text-[#EC1B25]">"{query}"</span>
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                {results.total > 0
                  ? `${results.total} article${results.total !== 1 ? 's' : ''} found`
                  : 'No articles found'}
              </p>
            </>
          ) : (
            <h1 className="text-2xl font-bold">Search</h1>
          )}
        </div>

        {/* Results grid */}
        {results.items.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.items.map((article: any) => (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="group block bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {article.image?.url && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
                      <img
                        src={article.image.url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {article.image?.credit && (
                        <span className="absolute bottom-1.5 right-2 text-[9px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm pointer-events-none leading-none">
                          © {article.image.credit}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-xs font-semibold text-[#EC1B25] uppercase tracking-wide mb-1">
                      {article.domain_slug?.replace(/-/g, ' ')}
                    </p>
                    <h2 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-[#EC1B25] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                      {article.description}
                    </p>
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {article.tags.slice(0, 4).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {article.published_at && (
                      <p className="text-xs text-muted-foreground mt-3">
                        {new Date(article.published_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                {page > 1 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}&page=${page - 1}`}
                    className="px-4 py-2 rounded-lg border hover:bg-secondary transition-colors text-sm"
                  >
                    ← Prev
                  </Link>
                )}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                  const p = start + i;
                  if (p > totalPages) return null;
                  return (
                    <Link
                      key={p}
                      href={`/search?q=${encodeURIComponent(query)}&page=${p}`}
                      className={cn(
                        'w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
                        p === page
                          ? 'bg-[#EC1B25] text-white'
                          : 'border hover:bg-secondary'
                      )}
                    >
                      {p}
                    </Link>
                  );
                })}
                {page < totalPages && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
                    className="px-4 py-2 rounded-lg border hover:bg-secondary transition-colors text-sm"
                  >
                    Next →
                  </Link>
                )}
              </div>
            )}
          </>
        ) : query.trim().length >= 2 ? (
          <div className="text-center py-20">
            <Search className="mx-auto h-16 w-16 text-muted-foreground/20 mb-4" />
            <h2 className="text-xl font-semibold">No results found</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto text-sm">
              No articles matched "{query}". Try different keywords or browse our sections.
            </p>
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="mx-auto h-16 w-16 text-muted-foreground/20 mb-4" />
            <h2 className="text-xl font-semibold">Search TechPolarity</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Use the search bar above to find articles by title, tags, or topic.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
