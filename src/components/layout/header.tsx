"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tech-polarity-backend.onrender.com";

type Category = {
  name: string;
  slug: string;
  order: number;
  is_active: boolean;
};

const LogoText = ({ className = "" }: { className?: string }) => (
  <img
    src="/logo_main.png"
    alt="TechPolarity Logo"
    className={`h-9 w-auto object-contain ${className}`}
    draggable={false}
  />
);

export function Header({ activeCategory }: { activeCategory?: string }) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeItem, setActiveItem] = useState<string | undefined>(activeCategory);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/navigation/main`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (activeCategory) {
      setActiveItem(activeCategory);
      return;
    }
    const pathParts = pathname.split('/');
    if (pathParts[1] === 'category' && pathParts[2]) {
      setActiveItem(pathParts[2]);
    }
  }, [activeCategory, pathname]);

  const handleScroll = (dir: 'left' | 'right') => {
    scrollContainerRef.current?.scrollBy({
      left: dir === 'left' ? -200 : 200,
      behavior: 'smooth',
    });
  };

  const NavLinks = ({ inSheet }: { inSheet?: boolean }) => (
    <div
      ref={inSheet ? undefined : scrollContainerRef}
      className={cn(
        'flex items-center space-x-1 overflow-x-auto whitespace-nowrap no-scrollbar',
        inSheet && 'flex-col space-y-4 mt-8'
      )}
    >
      {categories.map((cat) => (
        <Button
          asChild
          key={cat.slug}
          variant="ghost"
          className={cn(
            'rounded-full font-bold shrink-0',
            activeItem === cat.slug
              ? 'bg-[#EC1B25] text-white'
              : 'text-muted-foreground hover:text-[#EC1B25]'
          )}
          onClick={() => setActiveItem(cat.slug)}
        >
          <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
        </Button>
      ))}
    </div>
  );

  return (
    <header className="bg-background border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">

          {/* LEFT */}
          <div className="w-[220px] flex items-center">
            <Link href="/" className="flex items-center">
              <LogoText />
            </Link>
          </div>

          {/* CENTER */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="flex items-center max-w-5xl w-full">
              <Button variant="ghost" size="icon" onClick={() => handleScroll('left')}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1 overflow-hidden">
                <NavLinks />
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleScroll('right')}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex w-[220px] justify-end">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search"
                className="pl-10 pr-4 w-56 bg-secondary rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden ml-auto flex items-center gap-2">
            <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="pt-6 [&>button]:hidden">
                <div className="relative">
                  <Input className="w-full rounded-full pr-12" placeholder="Search..." />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    ✕
                  </button>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <NavLinks inSheet />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
