export const SORT_OPTIONS = [
  { value: 'old', label: 'Old to new' },
  { value: 'new', label: 'New to old' },
  { value: 'popular', label: 'Popular' },
  { value: 'updated', label: 'Recently Updated' },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]['value'];

export const DEFAULT_SORT: SortValue = 'new';

// Sorting spans all articles in a section/category, so list pages fetch up to
// this many in one request and paginate locally.
export const SORT_FETCH_LIMIT = 100;

export function parseSort(value?: string): SortValue {
  return SORT_OPTIONS.find((o) => o.value === value)?.value ?? DEFAULT_SORT;
}

const time = (d?: string) => (d ? new Date(d).getTime() : 0);

const SORTERS: Record<SortValue, (a: any, b: any) => number> = {
  new: (a, b) => time(b.published_at) - time(a.published_at),
  old: (a, b) => time(a.published_at) - time(b.published_at),
  updated: (a, b) =>
    time(b.updated_at || b.published_at) - time(a.updated_at || a.published_at),
  // The backend has no view counts, so "popular" = trending first, then newest.
  popular: (a, b) =>
    Number(!!b.is_trending) - Number(!!a.is_trending) ||
    time(b.published_at) - time(a.published_at),
};

export function sortArticles<T>(items: T[], sort: SortValue): T[] {
  return [...items].sort(SORTERS[sort]);
}
