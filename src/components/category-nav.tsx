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
        <div className="flex items-center">
          {/* Left: "Trending" label + left arrow — in flow, never overlaps */}
          <div className="flex items-center gap-2 pl-4 pr-2 shrink-0">
            <span className="text-sm font-bold text-[#EC1B25] shrink-0">
              Trending
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full shadow-md shrink-0"
              onClick={() => handleScroll('left')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Scrollable categories — takes remaining space, clips at edges */}
          <div
            ref={scrollContainerRef}
            className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto whitespace-nowrap no-scrollbar flex-1 min-w-0"
          >
            {categories.map((cat) => (
              <Button
                asChild
                variant="ghost"
                key={cat.slug}
                className={cn(
                  "rounded-full px-4 text-sm font-semibold shrink-0 transition-colors",
                  activeSlug === cat.slug
                    ? "bg-black text-white hover:bg-black hover:text-white"
                    : "text-black hover:text-[#EC1B25] hover:bg-white"
                )}
                onClick={() => setActiveSlug(cat.slug)}
              >
                <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
              </Button>
            ))}
          </div>

          {/* Right arrow — in flow, always visible */}
          <div className="flex items-center pl-2 pr-2 shrink-0">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full shadow-md"
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
