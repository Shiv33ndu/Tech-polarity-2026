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

const LogoText = ({ className = "" }: { className?: string }) => (
  <img
    src="/logo_main.png"
    alt="TechPolarit Logo"
    className={`h-20 w-auto object-contain ${className}`}
    draggable={false}
  />
);

export default LogoText;

const navItems = ['AI', 'Gaming', 'Mobile', 'Software', 'Hardware', 'Science', 'Startups', 'Apple', 'Google', 'Microsoft', 'Meta', 'Amazon',  'Cybersecurity', 'Programming', 'Gadgets', 'Reviews', 'Virtual Reality', 'Augmented Reality'];

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
        return navItems.find(item =>
          article.category.toLowerCase().includes(item.toLowerCase())
        );
      }
    }
    return navItems.find(item => item.toLowerCase() === path);
  }

  useEffect(() => {
    setActiveItem(getActiveItem());
  }, [activeCategory, pathname]);

  const [randomArticleSlugs, setRandomArticleSlugs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!ARTICLES.length) return;
    const slugs: { [key: string]: string } = {};
    navItems.forEach(item => {
      const list = ARTICLES.filter(a => a.category.includes(item));
      const random = list.length
        ? list[Math.floor(Math.random() * list.length)]
        : ARTICLES[Math.floor(Math.random() * ARTICLES.length)];
      slugs[item] = random.slug;
    });
    setRandomArticleSlugs(slugs);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    scrollContainerRef.current?.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth',
    });
  };

  const NavLinks = ({ inSheet }: { inSheet?: boolean }) => (
    <div
      ref={scrollContainerRef}
      className={cn(
        'flex items-center space-x-1 overflow-x-auto whitespace-nowrap no-scrollbar',
        inSheet && 'flex-col space-y-4 mt-8'
      )}
    >
      {navItems.map(item => (
        <Button
          asChild
          key={item}
          variant="ghost"
          className={cn(
            'rounded-full font-bold shrink-0',
            activeItem === item
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-[#EC1B25] '
          )}
        >
          <Link href={randomArticleSlugs[item] ? `/article/${randomArticleSlugs[item]}` : '#'}>
            {item}
          </Link>
        </Button>
      ))}
    </div>
  );

  return (
    <header className="bg-background border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <LogoText className="h-9 w-auto" />
          </Link>

         {/* Center nav */}
<div className="hidden md:flex flex-1 justify-center px-6">
  <div className="flex items-center max-w-5xl w-full">
    <Button variant="ghost" size="icon" onClick={() => handleScroll('left')}>
      <ChevronLeft className="h-5 w-5" />
    </Button>

    <div className="flex-1 overflow-hidden">
      <NavLinks />
    </div>

    <Button
      variant="ghost"
      size="icon"
      onClick={() => handleScroll('right')}
      className="ml-auto"
    >
      <ChevronRight className="h-5 w-5" />
    </Button>
  </div>
</div>



          {/* Search – TRUE right aligned */}
          <div className="hidden md:flex shrink-0">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search"
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = 'Search')}
                className="pl-10 pr-4 w-56 bg-secondary rounded-full"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden ml-auto flex items-center gap-2">
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
