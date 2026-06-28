import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';
import sanitizeHtml from 'sanitize-html';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { RelatedArticles } from '@/components/related-articles';
import { TrendingStories } from '@/components/trending-stories';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import {
  getArticleBySlug,
  getArticleTrending,
  getArticleRelated,
} from '@/lib/api';
import { ArticleAudioPlayer } from '@/components/article-audio-player';

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  let article: any = null;
  let trending: any[] = [];
  let related: any[] = [];

  try {
    const [articleRes, trendingRes, relatedRes] = await Promise.all([
      getArticleBySlug(params.slug),
      getArticleTrending(params.slug),
      getArticleRelated(params.slug),
    ]);

    if (!articleRes) throw new Error("Article not found");

    article = {
      id: articleRes.slug,
      title: articleRes.title,
      description: articleRes.description,
      image: articleRes.image?.url || '/fallback.jpg',
      slug: articleRes.slug,
      category: articleRes.domain_slug || 'Tech',
      publishedAt: articleRes.published_at,
      tags: articleRes.tags || [],
      content: articleRes.content || '',
    };

    const trendingData = Array.isArray(trendingRes) ? trendingRes : [];
    trending = trendingData.filter((item: any) => item.slug);

    const relatedData = Array.isArray(relatedRes) ? relatedRes : [];
    related = relatedData.map((item: any, index: number) => ({
      id: item.slug || index,
      title: item.title,
      description: item.description || '',
      image: item.image?.url || '/fallback.jpg',
      slug: item.slug,
      publishedAt: item.published_at,
    }));

  } catch (error) {
    console.error('❌ API Error:', error);
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold mb-4">Article not found</h1>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back home
          </Link>
        </Button>
      </div>
    );
  }

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const sanitizedContent = article.content
    ? sanitizeHtml(article.content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h2', 'h3']),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ['src', 'alt'],
        },
      })
    : '';

  const plainTextContent = article.content
    ? article.content.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim()
    : '';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-4 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            <Button asChild variant="ghost" className="mb-8 -ml-4 rounded-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to all articles
              </Link>
            </Button>

            <div className="bg-card p-4 sm:p-6 md:p-12 rounded-3xl shadow-lg">
              <article>

                <header className="mb-8 text-center">
                  <Badge className="mb-4 border-[#EC1B25] text-white px-6 py-2 text-base sm:px-10 sm:py-3 sm:text-xl capitalize">
                    {article.category}
                  </Badge>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline mb-4 leading-tight">
                    {article.title}
                  </h1>

                  <p className="text-base sm:text-lg text-muted-foreground">
                    Published on {formattedDate}
                  </p>
                </header>

                <div className="mb-8">
                  <ArticleAudioPlayer
                    text={`${article.title}. ${article.description}. ${plainTextContent}`}
                  />
                </div>

                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-8">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                <div className="prose prose-base sm:prose-lg max-w-none mx-auto text-foreground/90 mt-8">
                  <p className="text-xl font-medium leading-relaxed">{article.description}</p>
                  {sanitizedContent && (
                    <div
                      className="mt-6 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                  )}
                </div>

                {article.tags.length > 0 && (
                  <div className="mt-12">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      <h4 className="text-lg font-semibold text-muted-foreground">
                        Related Tags
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              <RelatedArticles data={related} />

              {trending.length > 0 && (
                <div className="max-w-4xl mx-auto mt-16">
                  <Separator />
                  <div className="my-8">
                    <h2 className="text-3xl font-bold font-headline mb-8 text-center">
                      More in {article.category}
                    </h2>
                    <TrendingStories data={trending} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
