
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ArticleCard } from "./article-card";
import { ARTICLES } from "@/lib/data";

export function TrendingStoriesBottom() {
    const trendingArticles = ARTICLES.slice(0, 5);
  return (
    <div className="bg-primary text-primary-foreground p-8 mt-12 rounded-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center font-headline">Trending Story</h2>
        <Carousel opts={{
            align: "start",
            loop: true,
        }}>
            <CarouselContent>
                {trendingArticles.map((article) => (
                    <CarouselItem key={article.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <ArticleCard article={article} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="text-black border-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" />
            <CarouselNext className="text-black border-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" />
        </Carousel>
    </div>
  )
}
