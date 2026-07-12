import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'TechPolarity',
  description: 'Technology is best when it brings people together.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DD8NCEB0BG"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DD8NCEB0BG');
        `}} />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
