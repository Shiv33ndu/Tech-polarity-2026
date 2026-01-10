
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';
import { ARTICLES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { QuickOverview } from '@/components/quick-overview';
import { RelatedArticles } from '@/components/related-articles';
import { TrendingStories } from '@/components/trending-stories';
import { Separator } from '@/components/ui/separator';

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug:string } }) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  
  if (!article) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">Article not found</h1>
            <Button asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Go back home
                </Link>
            </Button>
        </div>
    );
  }

  const image = PlaceHolderImages.find((img) => img.id === article.imageId);
  const imageUrl = image?.imageUrl || 'https://picsum.photos/seed/placeholder/1200/600';
  const imageHint = image?.imageHint || 'tech abstract';

  return (
    <div className="flex flex-col min-h-screen">
        <Header activeCategory={article.category} />
        <main className="flex-grow py-4 sm:py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                <Button asChild variant="ghost" className="mb-8 -ml-4 rounded-full">
                    <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to all articles
                    </Link>
                </Button>

                <div className="bg-card p-4 sm:p-6 md:p-12 rounded-3xl shadow-lg">
                  <article>
                      <header className="mb-8 text-center">
                      <Badge variant="outline" className="mb-4 border-[#EC1B25] text-[#EC1B25] px-6 py-2 text-base sm:px-10 sm:py-3 sm:text-xl">{article.category}</Badge>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline mb-4 leading-tight">
                          {article.title}
                      </h1>
                      <p className="text-base sm:text-lg text-muted-foreground">
                          By {article.author} on {article.date}
                      </p>
                      </header>
                      
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-8">
                          <Image
                              src={imageUrl}
                              alt={article.title}
                              fill
                              className="object-cover"
                              data-ai-hint={imageHint}
                          />
                      </div>
                      <div className="text-center -mt-4 mb-8">
                        <span className="inline-block bg-secondary text-secondary-foreground/80 text-xs px-3 py-1 rounded-full">
                          Image Credit: Unsplash
                        </span>
                      </div>
                      
                      <QuickOverview />

                      <div className="prose prose-base sm:prose-lg max-w-none mx-auto text-foreground/90 mt-8">
                          <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </p>
                          <p>
                              Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.
                          </p>
                          <h3 className="font-headline font-bold text-2xl sm:text-3xl !mt-12 !mb-4 text-foreground">A Deeper Dive</h3>
                          <p>
                              Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi. Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.
                          </p>
                          <p>
                              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam ac elit vel nulla commodo tristique. Fusce euismod, mi ut dignissim pharetra, est eros egestas libero, nec consequat urna ipsum vitae nisl.
                          </p>
                      </div>

                      {article.tags && article.tags.length > 0 && (
                        <div className="mt-12">
                          <div className="flex items-center gap-2 mb-4">
                            <Tag className="h-5 w-5 text-muted-foreground" />
                            <h4 className="text-lg font-semibold text-muted-foreground">Related Tags</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                  </article>
                  <div className="max-w-4xl mx-auto">
                    <RelatedArticles category={article.category} currentArticleSlug={article.slug} />
                  </div>
                  <div className="max-w-4xl mx-auto mt-16">
                    <Separator />
                    <div className='my-8'>
                        <h2 className="text-3xl font-bold font-headline mb-8 text-center">Related Stories</h2>
                        <div className="max-w-4xl mx-auto">
                            <TrendingStories />
                        </div>
                    </div>
                  </div>
                </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
  );
}
