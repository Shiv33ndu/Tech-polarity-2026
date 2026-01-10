import Link from 'next/link';
import { TRENDING_ARTICLES } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export function TrendingStories() {
  return (
    <Card className="bg-primary text-primary-foreground border-none rounded-3xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-headline">Trending Story</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {TRENDING_ARTICLES.map((article, index) => (
            <li key={article.id}>
              <Link href={`/article/${article.slug}`} className="group block">
                <div className="space-y-2">
                   <Badge variant="secondary" className="text-xs rounded-full bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
                    {article.category}
                  </Badge>
                  <h4 className="font-semibold group-hover:underline leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-sm text-primary-foreground/80">{article.date}</p>
                </div>
              </Link>
              {index < TRENDING_ARTICLES.length - 1 && <Separator className="mt-4 bg-primary-foreground/20" />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
