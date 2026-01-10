
"use client";

import { useState, useRef, useMemo } from 'react';
import { CATEGORIES, ARTICLES } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const randomArticleSlugs = useMemo(() => {
    if (ARTICLES.length === 0) return {};
    const slugs: { [key: string]: string } = {};
    CATEGORIES.forEach(category => {
      const randomArticle = ARTICLES[Math.floor(Math.random() * ARTICLES.length)];
      slugs[category] = randomArticle.slug;
    });
    return slugs;
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <nav className="border bg-secondary/50 rounded-full">
      <div className="container mx-auto px-0">
        <div className="relative flex items-center">
            <div 
              ref={scrollContainerRef}
              className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto whitespace-nowrap no-scrollbar pl-12 pr-12"
            >
            {CATEGORIES.map((category, index) => (
                <Button 
                  asChild 
                  variant="ghost" 
                  key={category} 
                  className={cn(
                    "rounded-full px-4 text-sm font-semibold transition-colors shrink-0",
                    activeCategory === category 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'text-muted-foreground hover:text-primary hover:bg-background/50',
                    index === CATEGORIES.length - 1 && 'mr-4'
                  )}
                  onClick={() => setActiveCategory(category)}
                >
                  <Link href={`/article/${randomArticleSlugs[category]}`}>{category}</Link>
                </Button>
            ))}
            </div>
            <div className="absolute left-0 top-0 bottom-0 flex items-center bg-gradient-to-r from-secondary/50 to-transparent pr-4 rounded-l-full">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full shadow-md ml-2" onClick={() => handleScroll('left')}>
                  <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 flex items-center bg-gradient-to-l from-secondary/50 to-transparent pl-4 rounded-r-full">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full shadow-md mr-2" onClick={() => handleScroll('right')}>
                  <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
        </div>
      </div>
    </nav>
  );
}
