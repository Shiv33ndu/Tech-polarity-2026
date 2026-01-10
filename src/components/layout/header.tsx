
"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ARTICLES } from '@/lib/data';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import logo_main from '/public/logo_main.png';



const LogoText = ({ className }: { className?: string }) => (
  <img
    src="/logo_main.png"
    alt="TechPolarit Logo"
    className={className}
    draggable={false}
  />
);


const navItems = ['AI', 'Gaming', 'Mobile', 'Software', 'Hardware', 'Science', 'Startups', 'Apple', 'Google'];

export function Header({ activeCategory }: { activeCategory?: string }) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(getActiveItem());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function getActiveItem() {
    if (activeCategory) {
      return activeCategory;
    }
    const path = pathname.split('/')[1];
    const slug = pathname.split('/article/')[1];

    if (path === 'article' && slug) {
      const article = ARTICLES.find(a => a.slug === slug);
      if (article) {
        const navItemMatch = navItems.find(item => article.category.toLowerCase().includes(item.toLowerCase()));
        return navItemMatch || undefined;
      }
    }
    return navItems.find(item => item.toLowerCase() === path);
  }

  useEffect(() => {
    setActiveItem(getActiveItem());
  }, [activeCategory, pathname]);
  
  const randomArticleSlugs = useMemo(() => {
    if (ARTICLES.length === 0) return {};
    const slugs: { [key: string]: string } = {};
    navItems.forEach(item => {
      const articlesInCat = ARTICLES.filter(a => a.category.includes(item));
      const randomArticle = articlesInCat.length > 0 
        ? articlesInCat[Math.floor(Math.random() * articlesInCat.length)]
        : ARTICLES[Math.floor(Math.random() * ARTICLES.length)];
      slugs[item] = randomArticle.slug;
    });
    return slugs;
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
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
          <Link href={`/article/${randomArticleSlugs[item]}`} onClick={() => setActiveItem(item)}>{item}</Link>
        </Button>
      );
      if (inSheet) {
        return <SheetClose asChild key={item}>{link}</SheetClose>;
      }
      return link;
    });

    return inSheet ? 
      <nav className="flex flex-col space-y-4 mt-8">{navLinkItems}</nav> : 
      <div 
        ref={scrollContainerRef}
        className="flex items-center space-x-1 overflow-x-auto whitespace-nowrap no-scrollbar"
      >
        {navLinkItems}
      </div>;
  };

  return (
    <header className="bg-background border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center">
             
            </div>
             <LogoText className="h-6 w-auto -ml-2" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-2">
            <div className="flex items-center space-x-2 flex-1 max-w-2xl">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleScroll('left')}>
                  <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1 overflow-hidden">
              <NavLinks />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleScroll('right')}>
                  <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search"
                className="pl-10 pr-4 w-32 bg-secondary rounded-full border-transparent focus-visible:ring-primary focus-visible:ring-2 focus-visible:bg-white focus:w-48 transition-all"
                aria-label="Search articles"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-6 w-6" />
                  <span className="sr-only">Open search</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="p-4">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10 pr-4 w-full bg-secondary rounded-full border-transparent focus-visible:ring-primary focus-visible:ring-2 focus-visible:bg-white"
                    aria-label="Search articles"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] max-w-sm">
                <div className="p-4">
                  <NavLinks inSheet />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
