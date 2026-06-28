"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tech-polarity-backend.onrender.com";

type Category = {
  name: string;
  slug: string;
  order: number;
  is_active: boolean;
};

export function CategoryNav() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/navigation/main`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
          setActiveSlug(data[0].slug);
        }
      })
      .catch(() => {});
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
          {/* Left: arrow button + fixed "Trending" label */}
          <div className="absolute left-0 top-0 bottom-0 flex items-center gap-2 pl-2 pr-4 bg-gradient-to-r from-secondary/80 via-secondary/60 to-transparent rounded-l-full z-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full shadow-md shrink-0"
              onClick={() => handleScroll('left')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm font-bold text-[#EC1B25] shrink-0">
              Trending
            </span>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto whitespace-nowrap no-scrollbar pl-36 pr-12"
          >
            {categories.map((cat, index) => (
              <Button
                asChild
                variant="ghost"
                key={cat.slug}
                className={cn(
                  "rounded-full px-4 text-sm font-semibold shrink-0 transition-colors",
                  activeSlug === cat.slug
                    ? "bg-black text-white hover:bg-black hover:text-white"
                    : "text-black hover:text-[#EC1B25] hover:bg-white",
                  index === categories.length - 1 && "mr-4"
                )}
                onClick={() => setActiveSlug(cat.slug)}
              >
                <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
              </Button>
            ))}
          </div>

          <div className="absolute right-0 top-0 bottom-0 flex items-center bg-gradient-to-l from-secondary/50 to-transparent pl-4 rounded-r-full">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full shadow-md mr-2"
              onClick={() => handleScroll('right')}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
