import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

type TrendingItem = {
  slug: string;
  title: string;
  domain_slug?: string;
  description?: string;
};

interface TrendingStoriesProps {
  data?: TrendingItem[];
}

export function TrendingStories({ data = [] }: TrendingStoriesProps) {
  if (!data.length) return null;

  return (
    <Card className="bg-[#EC1B25] text-primary-foreground border-none rounded-3xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-headline">Trending Story</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {data.map((article, index) => (
            <li key={article.slug}>
              <Link href={`/article/${article.slug}`} className="group block">
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs rounded-full bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 capitalize">
                    {article.domain_slug}
                  </Badge>
                  <h4 className="font-semibold group-hover:underline leading-snug">
                    {article.title}
                  </h4>
                  {article.description && (
                    <p className="text-sm text-primary-foreground/80 line-clamp-2">
                      {article.description}
                    </p>
                  )}
                </div>
              </Link>
              {index < data.length - 1 && <Separator className="mt-4 bg-primary-foreground/20" />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
