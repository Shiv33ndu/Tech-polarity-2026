
'use client';

import { ARTICLES } from '@/lib/data';
import { ArticleCard } from './article-card';
import { Separator } from './ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface RelatedArticlesProps {
  category: string;
  currentArticleSlug: string;
}

export function RelatedArticles({ category, currentArticleSlug }: RelatedArticlesProps) {
  const relatedArticles = ARTICLES.filter(
    (article) => article.category === category && article.slug !== currentArticleSlug
  ).slice(0, 8);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <Separator />
      <div className='my-8'>
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">Related Articles</h2>
        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {relatedArticles.map((article) => (
              <CarouselItem key={article.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <ArticleCard article={article} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-black" />
          <CarouselNext className="text-black" />
        </Carousel>
      </div>
    </div>
  );
}
