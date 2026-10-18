import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { Poppins } from 'next/font/google';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL_LINKS } from '@/lib/site';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Technology News, Reviews & Insights`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} - Technology News, Reviews & Insights`,
    description: SITE_DESCRIPTION,
    images: [{ url: '/logo_main.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Technology News, Reviews & Insights`,
    description: SITE_DESCRIPTION,
    images: ['/logo_main.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'google-adsense-account': 'ca-pub-1071587412276448',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo_main.png`,
  sameAs: SOCIAL_LINKS,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1071587412276448"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <ScrollToTopButton />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-DD8NCEB0BG" />
        <Script id="gtag-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DD8NCEB0BG');
          `}
        </Script>
      </body>
    </html>
  );
}
