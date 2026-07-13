"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MiniAudioButton } from '@/components/mini-audio-button';
import { ShareButton } from '@/components/share-button';

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
  compact?: boolean;
}

const COMPACT_DESCRIPTION_LIMIT = 80;

export function ArticleCard({
  article,
  isLarge = false,
  layout = 'vertical',
  compact = false,
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

  const descriptionLimit = layout === 'horizontal' ? 160 : COMPACT_DESCRIPTION_LIMIT;
  const fullDescription = article.description || 'No description available';
  const isDescriptionLong = compact && fullDescription.length > descriptionLimit;
  const displayDescription = isDescriptionLong
    ? `${fullDescription.slice(0, descriptionLimit).trimEnd()}…`
    : fullDescription;

  // =========================
  // 🔥 HORIZONTAL
  // =========================
  if (layout === 'horizontal') {
    return (
      <Link href={`/article/${article.slug}`} className="group block h-full">
        <Card className={cn(cardClasses, compact ? 'border p-3' : 'border p-4', compact && 'shadow-[0_8px_20px_rgba(0,0,0,0.1)]')}>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className={`relative w-full sm:w-1/3 ${compact ? 'aspect-[40/21]' : 'aspect-[4/3]'}`}>
              <Image
                src={imgSrc}
                alt={article.title || 'Article Image'}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`object-cover ${compact ? 'object-top' : ''} transition-transform duration-300 group-hover:scale-105 rounded-md`}
                onError={() => setImgSrc('/fallback.jpg')}
              />
              {article.imageCredit && (
                <span className="absolute bottom-1.5 right-2 text-[9px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm pointer-events-none leading-none">
                  © {article.imageCredit}
                </span>
              )}
            </div>

            <CardContent className="p-0 flex-1">
              <h3 className={`font-bold font-headline text-xl leading-tight group-hover:text-[#EC1B25] transition-colors ${compact ? 'line-clamp-2' : ''}`}>
                {article.title || 'Untitled Article'}
              </h3>

              <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
                {displayDescription}
                {isDescriptionLong && (
                  <span className="text-[#EC1B25] font-semibold ml-1 whitespace-nowrap">
                    Read more
                  </span>
                )}
              </p>

              {formattedDate && (
                <p className="text-xs text-gray-400 mt-2">
                  {formattedDate}
                </p>
              )}

              <div className="flex items-center gap-2 flex-wrap mt-2">
                <MiniAudioButton
                  id={article.id}
                  text={`${article.title}. ${article.description}`}
                />
                <ShareButton
                  title={article.title}
                  path={`/article/${article.slug}`}
                  iconOnly
                />
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  // =========================
  // 🔥 VERTICAL
  // =========================
  const titleSize = isLarge ? 'text-2xl md:text-3xl' : compact ? 'text-base' : 'text-lg';

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <Card className={cn(cardClasses, 'border', compact && 'shadow-[0_8px_20px_rgba(0,0,0,0.1)]')}>
        <div className={`relative w-full ${compact ? 'aspect-[45/22]' : 'aspect-[4/3]'}`}>
          <Image
            src={imgSrc}
            alt={article.title || 'Article Image'}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover ${compact ? 'object-top' : ''} transition-transform duration-300 group-hover:scale-105`}
            onError={() => setImgSrc('/fallback.jpg')}
          />
          {article.imageCredit && (
            <span className="absolute bottom-1.5 right-2 text-[9px] text-white/80 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm pointer-events-none leading-none">
              © {article.imageCredit}
            </span>
          )}
        </div>

        <CardContent className={`${compact ? 'p-3' : 'p-4'} ${isLarge ? 'md:p-6' : ''}`}>
          <h3
            className={`font-bold font-headline group-hover:text-[#EC1B25] transition-colors ${titleSize}`}
          >
            {article.title || 'Untitled Article'}
          </h3>

          <p
            className={`text-muted-foreground text-sm mt-2 ${
              isLarge || compact ? '' : 'hidden md:block'
            }`}
          >
            {displayDescription}
            {isDescriptionLong && (
              <span className="text-[#EC1B25] font-semibold ml-1 whitespace-nowrap">
                Read more
              </span>
            )}
          </p>

          {formattedDate && (
            <p className="text-xs text-gray-400 mt-2">
              {formattedDate}
            </p>
          )}

          <div className="flex items-center gap-2 flex-wrap mt-2">
            <MiniAudioButton
              id={article.id}
              text={`${article.title}. ${article.description}`}
            />
            <ShareButton
              title={article.title}
              path={`/article/${article.slug}`}
              iconOnly
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}