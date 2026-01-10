
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Youtube, Instagram, Mail, Info, Shield, Send, Facebook, X } from 'lucide-react';

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 24"
    fill="none"
  >
    <g clipPath="url(#clip0_1_2)">
      <rect width="48" height="24" fill="none"/>
      <circle cx="12" cy="12" r="11" fill="hsl(var(--primary))"/>
      <path d="M7 12H17" stroke="hsl(var(--primary-foreground))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 7V17" stroke="hsl(var(--primary-foreground))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="36" cy="12" r="11" fill="hsl(var(--primary))"/>
      <path d="M31 12H41" stroke="hsl(var(--primary-foreground))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_1_2">
        <rect width="48" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const LogoText = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 200 24" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="19" fontFamily="Poppins, sans-serif" fontSize="24" fontWeight="900" fill="hsl(var(--foreground))" letterSpacing="-0.5">
            TECHPOLARITY
        </text>
    </svg>
);

export function Footer() {
  return (
    <footer className="bg-background mt-12 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
                <Link href="/" className="flex items-center gap-2 justify-center md:justify-start">
                    <div className="flex items-center justify-center">
                      <LogoIcon className="w-10 h-5" />
                    </div>
                    <LogoText className="h-5 -ml-2" />
                </Link>
                <p className="text-muted-foreground mt-2">Technology is best when it <br/> brings people together</p>
            </div>
            <div className="my-8 md:my-0 relative w-full max-w-sm flex items-center justify-center">
                <svg viewBox="0 0 300 10" width="100%" height="10" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-0 w-full -translate-y-1/2">
                    <path d="M0 5 L300 5" stroke="hsl(var(--border))" stroke-width="1" stroke-dasharray="2 4" stroke-linecap="round"/>
                </svg>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 bg-primary p-2 rounded-full">
                   <Send className="w-4 h-4 text-primary-foreground" />
                </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
                <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href="#" aria-label="Facebook">
                        <Facebook className="h-6 w-6" />
                    </a>
                </Button>
                <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href="#" aria-label="Youtube">
                        <Youtube className="h-6 w-6" />
                    </a>
                </Button>
                 <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href="#" aria-label="Instagram">
                        <Instagram className="h-6 w-6" />
                    </a>
                </Button>
                 <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href="#" aria-label="X (formerly Twitter)">
                        <X className="h-6 w-6" />
                    </a>
                </Button>
                <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href="mailto:techpolarity@gmail.com" aria-label="Email">
                        <Mail className="h-6 w-6" />
                    </a>
                </Button>
            </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col items-center text-muted-foreground">
          <div className="flex items-center justify-center space-x-6">
            <Link href="/about" className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary transition-colors">
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                <Info className="h-5 w-5" />
              </Button>
              <span className="text-sm font-medium">About</span>
            </Link>
            <Link href="/privacy" className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary transition-colors">
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                <Shield className="h-5 w-5" />
              </Button>
              <span className="text-sm font-medium">Privacy</span>
            </Link>
            <Link href="/contact" className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary transition-colors">
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                <Mail className="h-5 w-5" />
              </Button>
              <span className="text-sm font-medium">Contact</span>
            </Link>
          </div>
          <p className="mt-6">&copy; TechPolarity {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
