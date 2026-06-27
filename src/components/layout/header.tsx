"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, Menu } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tech-polarity-backend.onrender.com";

type Section = {
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

export function Header({ activeSection }: { activeSection?: string }) {
  const pathname = usePathname();
  const [sections, setSections] = useState<Section[]>([]);
  const [activeItem, setActiveItem] = useState<string | undefined>(activeSection);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/sections/main`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSections(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (activeSection) {
      setActiveItem(activeSection);
      return;
    }
    const pathParts = pathname.split('/');
    if (pathParts[1] === 'section' && pathParts[2]) {
      setActiveItem(pathParts[2]);
    }
  }, [activeSection, pathname]);

  const NavLinks = ({ inSheet }: { inSheet?: boolean }) => (
    <div
      ref={inSheet ? undefined : scrollContainerRef}
      className={cn(
        'flex items-center space-x-1 overflow-x-auto whitespace-nowrap no-scrollbar',
        inSheet && 'flex-col space-y-4 mt-8'
      )}
    >
      {sections.map((section) => (
        <Button
          asChild
          key={section.slug}
          variant="ghost"
          className={cn(
            'rounded-full font-bold shrink-0',
            activeItem === section.slug
              ? 'bg-[#EC1B25] text-white'
              : 'text-muted-foreground hover:text-[#EC1B25]'
          )}
          onClick={() => setActiveItem(section.slug)}
        >
          <Link href={`/section/${section.slug}`}>{section.name}</Link>
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

          {/* RIGHT — nav + search grouped together */}
          <div className="hidden md:flex ml-auto items-center gap-3">
            <NavLinks />
            <div className="relative shrink-0">
              <Input
                type="search"
                placeholder="Search"
                className="pl-10 pr-4 w-48 bg-secondary rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
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
