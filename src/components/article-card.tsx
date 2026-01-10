import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  isLarge?: boolean;
  layout?: 'vertical' | 'horizontal';
}

export function ArticleCard({ article, isLarge = false, layout = 'vertical' }: ArticleCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === article.imageId);
  const imageUrl = image?.imageUrl || 'https://picsum.photos/seed/placeholder/800/600';
  const imageHint = image?.imageHint || 'tech abstract';
  const cardClasses = "overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl rounded-2xl";

  if (layout === 'horizontal') {
    return (
      <Link href={`/article/${article.slug}`} className="group block">
        <Card className={cn(cardClasses, "border p-4")}>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative aspect-[4/3] w-full sm:w-1/3">
              <div 
                className="text-white text-xs font-bold uppercase tracking-wider p-2 absolute top-2 left-2 z-10"
                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
              >
                About {article.category}
              </div>
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-md"
                data-ai-hint={imageHint}
              />
            </div>
            <CardContent className="p-0 flex-1">
              <h3 className="font-bold font-headline text-xl leading-tight group-hover:text-[#EC1B25] transition-colors">
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  const titleSize = isLarge ? 'text-2xl md:text-3xl' : 'text-lg';

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <Card className={cn(cardClasses, "border")}>
        <div className="relative aspect-[4/3] w-full">
           <div 
            className="text-white text-xs font-bold uppercase tracking-wider p-2 absolute top-2 left-2 z-10"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
           >
            About {article.category}
          </div>
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={imageHint}
          />
        </div>
        <CardContent className={`p-4 ${isLarge ? 'md:p-6' : ''}`}>
          <h3 className={`font-bold font-headline group-hover:text-[#EC1B25] transition-colors ${titleSize}`}>
            {article.title}
          </h3>
          <p className={`text-muted-foreground text-sm mt-2 ${isLarge ? '' : 'hidden md:block'}`}>
            Among the wide variety of styles of fonts available today, monospaced typefaces, also known as fixed-pitch, fixed-width, or non-proportional font and a font whose letters and characters each occupy the same amount of horizontal space. In most fonts, each character is allowed to occupy space only as much as is horizontal but in the case of monospaced, each character is allowed to occupy the same amount of space.
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
