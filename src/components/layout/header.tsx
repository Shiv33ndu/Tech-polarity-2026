"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Menu, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

type SearchResultItem = {
  title: string;
  slug: string;
  description: string;
  domain_slug: string;
  tags?: string[];
  image?: { url: string };
  published_at?: string;
};

const LogoText = ({ className = "" }: { className?: string }) => (
  <img
    src="/logo_main.png"
    alt="TechPolarity Logo"
    className={`h-7 w-auto object-contain ${className}`}
    draggable={false}
  />
);

function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced live search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setShowDropdown(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ q: trimmed, page: '1', limit: '5' });
        const res = await fetch(`${BASE_URL}/api/v1/articles/search?${params}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.items || []);
          setShowDropdown(true);
        }
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigateToSearch = useCallback(() => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setShowDropdown(false);
    setActiveIndex(-1);
  }, [query, router]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Escape':
        setShowDropdown(false);
        setActiveIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!showDropdown && results.length > 0) { setShowDropdown(true); break; }
        setActiveIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && results[activeIndex]) {
          router.push(`/article/${results[activeIndex].slug}`);
          setShowDropdown(false);
          setQuery('');
        } else {
          navigateToSearch();
        }
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn("relative shrink-0", className)}>
      <div className="relative">
        {isLoading ? (
          <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}
        <Input
          type="search"
          placeholder="Search articles..."
          className="pl-10 pr-4 w-48 bg-secondary rounded-full"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActiveIndex(-1); }}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (results.length > 0) setShowDropdown(true); }}
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-background border rounded-xl shadow-xl z-50 overflow-hidden">
          {results.length > 0 ? (
            <>
              <ul>
                {results.map((item, i) => (
                  <li key={item.slug}>
                    <button
                      className={cn(
                        "w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-secondary transition-colors",
                        activeIndex === i && "bg-secondary"
                      )}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        router.push(`/article/${item.slug}`);
                        setShowDropdown(false);
                        setQuery('');
                      }}
                    >
                      {item.image?.url && (
                        <img
                          src={item.image.url}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-secondary"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold leading-tight line-clamp-1">{item.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{item.description}</p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex gap-1 mt-1.5 flex-wrap">
                            {item.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded-full border"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t px-4 py-2.5 bg-secondary/40">
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={navigateToSearch}
                  className="text-sm text-[#EC1B25] hover:underline font-medium"
                >
                  View all results for "{query.trim()}" →
                </button>
              </div>
            </>
          ) : (
            !isLoading && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                No results found for "{query.trim()}"
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

function MobileSearch({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ q: trimmed, page: '1', limit: '5' });
        const res = await fetch(`${BASE_URL}/api/v1/articles/search?${params}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.items || []);
        }
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  const navigateToSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    onClose();
  };

  return (
    <div>
      <div className="relative mb-4">
        {isLoading ? (
          <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}
        <Input
          className="w-full rounded-full pl-10 pr-12"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') navigateToSearch(); }}
          autoFocus
        />
        <button
          onClick={onClose}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-1">
          {results.map((item) => (
            <button
              key={item.slug}
              className="w-full flex items-start gap-3 px-2 py-2.5 rounded-xl hover:bg-secondary text-left transition-colors"
              onClick={() => {
                router.push(`/article/${item.slug}`);
                onClose();
              }}
            >
              {item.image?.url && (
                <img
                  src={item.image.url}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-secondary"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold line-clamp-1">{item.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{item.description}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded-full border">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          ))}
          <button
            onClick={navigateToSearch}
            className="w-full text-sm text-[#EC1B25] hover:underline font-medium text-center py-2"
          >
            View all results →
          </button>
        </div>
      )}

      {query.trim().length >= 2 && !isLoading && results.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-4">
          No results found for "{query.trim()}"
        </p>
      )}
    </div>
  );
}

export function Header({ activeSection }: { activeSection?: string }) {
  const pathname = usePathname();
  const [sections, setSections] = useState<Section[]>([]);
  const [activeItem, setActiveItem] = useState<string | undefined>(activeSection);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

          {/* RIGHT — nav + search */}
          <div className="hidden md:flex ml-auto items-center gap-3">
            <NavLinks />
            <SearchBar />
          </div>

          {/* MOBILE */}
          <div className="md:hidden ml-auto flex items-center gap-2">
            <Sheet open={isSearchOpen} onOpenChange={(open) => {
              setIsSearchOpen(open);
            }}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="pt-6 [&>button]:hidden">
                <MobileSearch onClose={() => setIsSearchOpen(false)} />
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
