"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ARTICLES } from '@/lib/data';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import logo_main from '/public/logo_main.png';

const LogoText = ({ className = "" }: { className?: string }) => (
  <img
    src="/logo_main.png"
    alt="TechPolarit Logo"
    className={`h-20 w-auto object-contain ${className}`}
    draggable={false}
  />
);

export default LogoText;

const navItems = ['AI', 'Gaming', 'Mobile', 'Software', 'Hardware', 'Science', 'Startups', 'Apple', 'Google'];

export function Header({ activeCategory }: { activeCategory?: string }) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(getActiveItem());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function getActiveItem() {
    if (activeCategory) return activeCategory;

    const path = pathname.split('/')[1];
    const slug = pathname.split('/article/')[1];

    if (path === 'article' && slug) {
      const article = ARTICLES.find(a => a.slug === slug);
      if (article) {
        const navItemMatch = navItems.find(item =>
          article.category.toLowerCase().includes(item.toLowerCase())
        );
        return navItemMatch || undefined;
      }
    }
    return navItems.find(item => item.toLowerCase() === path);
  }

  useEffect(() => {
    setActiveItem(getActiveItem());
  }, [activeCategory, pathname]);

  /* 🔒 HYDRATION SAFE RANDOM SLUGS */
  const [randomArticleSlugs, setRandomArticleSlugs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!ARTICLES.length) return;

    const slugs: { [key: string]: string } = {};
    navItems.forEach(item => {
      const articlesInCat = ARTICLES.filter(a => a.category.includes(item));
      const randomArticle =
        articlesInCat.length > 0
          ? articlesInCat[Math.floor(Math.random() * articlesInCat.length)]
          : ARTICLES[Math.floor(Math.random() * ARTICLES.length)];

      slugs[item] = randomArticle.slug;
    });

    setRandomArticleSlugs(slugs);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    scrollContainerRef.current?.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth',
    });
  };

  const NavLinks = ({ inSheet }: { inSheet?: boolean }) => {
    const navLinkItems = navItems.map(item => {
      const link = (
        <Button
          asChild
          variant="ghost"
          key={item}
          className={cn(
            'rounded-full font-bold',
            inSheet ? 'w-full text-lg py-6' : 'shrink-0',
            activeItem === item
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'text-muted-foreground hover:text-primary hover:bg-accent',
          )}
        >
          <Link
            href={randomArticleSlugs[item] ? `/article/${randomArticleSlugs[item]}` : '#'}
            onClick={() => setActiveItem(item)}
          >
            {item}
          </Link>
        </Button>
      );

      return inSheet ? (
        <SheetClose asChild key={item}>{link}</SheetClose>
      ) : (
        link
      );
    });

    return inSheet ? (
      <nav className="flex flex-col space-y-4 mt-8">{navLinkItems}</nav>
    ) : (
      <div
        ref={scrollContainerRef}
        className="flex items-center space-x-1 overflow-x-auto whitespace-nowrap no-scrollbar"
      >
        {navLinkItems}
      </div>
    );
  };

  return (
    <header className="bg-background border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <LogoText className="h-9 w-auto" />

          </Link>

          <div className="hidden md:flex items-center justify-center flex-1 space-x-2">
            <div className="flex items-center space-x-2 flex-1 max-w-2xl">
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

            <div className="relative left-18">
  <Input
    type="search"
    placeholder="Search"
    onFocus={(e) => (e.target.placeholder = '')}
    onBlur={(e) => (e.target.placeholder = 'Search')}
    className="pl-10 pr-4 w-50 bg-secondary rounded-full"
  />
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
</div>

          </div>

          <div className="md:hidden flex items-center gap-2">
            <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <Input type="search" placeholder="Search..." />
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
