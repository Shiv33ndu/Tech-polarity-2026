"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getSections, getTrendingArticles, getArticlesBySection } from '@/lib/api';

type TrendingItem = {
  slug: string;
  title: string;
  domain_slug?: string;
  description?: string;
};

type Section = {
  name: string;
  slug: string;
  order: number;
  is_active: boolean;
};

interface TrendingStoriesProps {
  data?: TrendingItem[];
}

function TrendingBox({ title, items }: { title: string; items: TrendingItem[] }) {
  if (!items.length) return null;

  return (
    <Card className="bg-[#EC1B25] text-primary-foreground border-none rounded-3xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {items.map((article, index) => (
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
              {index < items.length - 1 && <Separator className="mt-4 bg-primary-foreground/20" />}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function TrendingStories({ data = [] }: TrendingStoriesProps) {
  const [sectionBoxes, setSectionBoxes] = useState<{ section: Section; items: TrendingItem[] }[]>([]);

  useEffect(() => {
    let cancelled = false;

    getSections()
      .then(async (sections: Section[]) => {
        if (!Array.isArray(sections) || cancelled) return;

        const results = await Promise.all(
          sections.map(async (section) => {
            const trending = await getTrendingArticles(section.slug);
            if (Array.isArray(trending) && trending.length > 0) {
              return { section, items: trending };
            }

            // Fall back to the section's latest articles so every
            // header section always gets its own box.
            const latest = await getArticlesBySection(section.slug, 1, 5);
            return { section, items: latest.items || [] };
          })
        );

        if (!cancelled) {
          setSectionBoxes(
            results.filter((r) => Array.isArray(r.items) && r.items.length > 0)
          );
        }
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, []);

  if (!data.length && sectionBoxes.length === 0) return null;

  return (
    <div className="space-y-8">
      <TrendingBox title="Trending Story" items={data} />

      {sectionBoxes.map(({ section, items }) => (
        <TrendingBox key={section.slug} title={`Trending Stories in ${section.name}`} items={items} />
      ))}
    </div>
  );
}
