'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        size="icon"
        className={cn(
          'h-14 w-14 rounded-full shadow-lg transition-opacity',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" strokeWidth={2.5} />
      </Button>
    </div>
  );
}
