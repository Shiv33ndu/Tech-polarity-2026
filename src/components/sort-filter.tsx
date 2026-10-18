import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SORT_OPTIONS, type SortValue } from '@/lib/sort';

export function SortFilter({
  basePath,
  active,
}: {
  basePath: string;
  active: SortValue;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {SORT_OPTIONS.map((o) => (
        <Link
          key={o.value}
          href={`${basePath}?sort=${o.value}`}
          className={cn(
            'px-3 py-1.5 rounded-full text-sm border transition-colors',
            o.value === active
              ? 'bg-[#EC1B25] border-[#EC1B25] text-white'
              : 'hover:bg-secondary'
          )}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}
