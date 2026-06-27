
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-4 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8 -ml-4 rounded-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
              </Link>
            </Button>
            <div className="bg-card p-4 sm:p-6 md:p-12 rounded-3xl shadow-lg">
              <article>
                <header className="mb-8 text-center">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline mb-4 leading-tight">
                    About TechPolarity
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    A Technology-Related Blog.
                  </p>
                </header>

                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-8">
                  <Image
                    src="/About Techpolarity.png"
                    alt="About TechPolarity"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="prose prose-base sm:prose-lg max-w-none mx-auto text-foreground/90">
                  <p>
                    Tech Polarity exists to decode technology and to make it usable for all. Be it a casual reader, techie, or budding professional, Tech Polarity was founded to keep you informed, inspired, and always ahead.
                  </p>
                  <p>
                    Since 2026, our blog has existed with the sole purpose of breaking down the fast-paced world of technology. From smartphone reviews to discussions of AI, gaming, and futuristic gadgets — you name it — we keep it entertaining yet precise enough.
                  </p>
                  <h3 className="font-headline font-bold text-2xl sm:text-3xl !mt-12 !mb-4 text-foreground">What makes us different?</h3>
                  <ul>
                    <li>Crystal clear reviews</li>
                    <li>Thorough comparisons</li>
                    <li>Honest opinions</li>
                    <li>Understandable language</li>
                  </ul>
                  <p>
                    Add to this advisory content, how-to's, and buying suggestions to help you improve your tech skills. No theories. Just reality. Stay with us as we explore the frontiers of innovation.
                  </p>
                  <p>
                    Let's do tech together — real, simple, and useful!
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
