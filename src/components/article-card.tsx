"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MiniAudioButton } from '@/components/mini-audio-button';

interface Article {
  id: string | number;
  title: string;
  description: string;
  image: string;
  imageCredit?: string;
  slug: string;
  publishedAt?: string;
}

interface ArticleCardProps {
  article: Article;
  isLarge?: boolean;
  layout?: 'vertical' | 'horizontal';
}

export function ArticleCard({
  article,
  isLarge = false,
  layout = 'vertical',
}: ArticleCardProps) {

  const initialImage =
    typeof article.image === "string" && article.image.trim() !== ""
      ? article.image
      : "/fallback.jpg";

  const [imgSrc, setImgSrc] = useState(initialImage);

  const cardClasses =
    'overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl rounded-2xl';

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  // =========================
  // 🔥 HORIZONTAL
  // =========================
  if (layout === 'horizontal') {
    return (
      <Link href={`/article/${article.slug}`} className="group block">
        <Card className={cn(cardClasses, 'border p-4')}>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative aspect-[4/3] w-full sm:w-1/3">
              <Image
                src={imgSrc}
                alt={article.title || 'Article Image'}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-md"
                onError={() => setImgSrc('/fallback.jpg')}
              />
              {article.imageCredit && (
                <span className="absolute bottom-1.5 right-2 text-[9px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm pointer-events-none leading-none">
                  © {article.imageCredit}
                </span>
              )}
            </div>

            <CardContent className="p-0 flex-1">
              <h3 className="font-bold font-headline text-xl leading-tight group-hover:text-[#EC1B25] transition-colors">
                {article.title || 'Untitled Article'}
              </h3>

              <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
                {article.description || 'No description available'}
              </p>

              {formattedDate && (
                <p className="text-xs text-gray-400 mt-2">
                  {formattedDate}
                </p>
              )}

              <MiniAudioButton
                id={article.id}
                text={`${article.title}. ${article.description}`}
              />
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  // =========================
  // 🔥 VERTICAL
  // =========================
  const titleSize = isLarge ? 'text-2xl md:text-3xl' : 'text-lg';

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <Card className={cn(cardClasses, 'border')}>
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={imgSrc}
            alt={article.title || 'Article Image'}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgSrc('/fallback.jpg')}
          />
          {article.imageCredit && (
            <span className="absolute bottom-1.5 right-2 text-[9px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm pointer-events-none leading-none">
              © {article.imageCredit}
            </span>
          )}
        </div>

        <CardContent className={`p-4 ${isLarge ? 'md:p-6' : ''}`}>
          <h3
            className={`font-bold font-headline group-hover:text-[#EC1B25] transition-colors ${titleSize}`}
          >
            {article.title || 'Untitled Article'}
          </h3>

          <p
            className={`text-muted-foreground text-sm mt-2 ${
              isLarge ? '' : 'hidden md:block'
            }`}
          >
            {article.description || 'No description available'}
          </p>

          {formattedDate && (
            <p className="text-xs text-gray-400 mt-2">
              {formattedDate}
            </p>
          )}

          <MiniAudioButton
            id={article.id}
            text={`${article.title}. ${article.description}`}
          />
        </CardContent>
      </Card>
    </Link>
  );
}