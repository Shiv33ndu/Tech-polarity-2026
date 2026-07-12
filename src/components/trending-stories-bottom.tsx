"use client";

import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArticleCard } from "./article-card";

const AUTOPLAY_INTERVAL_MS = 3000;

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tech-polarity-backend.onrender.com";

type Article = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  imageCredit?: string;
  slug: string;
  publishedAt?: string;
};

export function TrendingStoriesBottom() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const isPausedRef = useRef(false);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        api.scrollNext();
      }
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/home/trending-global?limit=10`)
      .then((r) => r.json())
      .then(async (data) => {
        if (!Array.isArray(data)) return;

        const detailed = await Promise.all(
          data.map((item: any) =>
            fetch(`${BASE_URL}/api/v1/articles/${item.slug}`)
              .then((r) => r.ok ? r.json() : null)
              .catch(() => null)
          )
        );

        const mapped: Article[] = data.map((item: any, i: number) => ({
          id: item.slug || i,
          title: item.title,
          description: item.description || "",
          image: detailed[i]?.image?.url || "/fallback.jpg",
          imageCredit: detailed[i]?.image?.credit || '',
          slug: item.slug,
          publishedAt: detailed[i]?.published_at || item.published_at,
        }));
        setArticles(mapped);
      })
      .catch(() => {});
  }, []);

  if (!articles.length) return null;

  return (
    <div className="bg-[#EC1B25] text-primary-foreground p-8 mt-12 rounded-3xl">
      <h2 className="text-3xl font-bold mb-6 text-center font-headline">Trending Stories</h2>
      <Carousel
        opts={{ align: "start", loop: true }}
        setApi={setApi}
        onMouseEnter={() => { isPausedRef.current = true; }}
        onMouseLeave={() => { isPausedRef.current = false; }}
      >
        <CarouselContent className="items-stretch">
          {articles.map((article) => (
            <CarouselItem key={article.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full grid">
                <ArticleCard article={article} compact />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-black border-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" />
        <CarouselNext className="text-black border-primary-foreground hover:bg-primary/80 hover:text-primary-foreground" />
      </Carousel>
    </div>
  );
}
