import Link from 'next/link';
import type { Category } from '@/lib/posts';

interface CategoryFilterProps {
  categories: Category[];
  activeSlug?: string;
  q?: string;
  basePath?: string;
  variant?: 'tabs' | 'pills';
  allLabel?: string;
}

export default function CategoryFilter({
  categories,
  activeSlug,
  q,
  basePath = '/blog',
  variant = 'tabs',
  allLabel = 'All Articles',
}: CategoryFilterProps) {
  const buildHref = (slug?: string) => {
    const params = new URLSearchParams();
    if (slug) params.set('category', slug);
    if (q) params.set('q', q);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  if (variant === 'pills') {
    const pillClass = (isActive: boolean) =>
      isActive
        ? 'px-5 py-2 bg-primary text-on-primary rounded-full font-label-caps text-label-caps whitespace-nowrap transition-all'
        : 'px-5 py-2 border border-outline-variant text-secondary rounded-full font-label-caps text-label-caps whitespace-nowrap hover:bg-surface-container-low transition-all';

    return (
      <div className="mb-10 flex flex-wrap gap-3 overflow-x-auto pb-1 scrollbar-hide">
        <Link href={buildHref(undefined)} className={pillClass(!activeSlug)}>
          {allLabel}
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={buildHref(category.slug)}
            className={pillClass(activeSlug === category.slug)}
          >
            {category.name}
          </Link>
        ))}
      </div>
    );
  }

  const tabClass = (isActive: boolean) =>
    isActive
      ? 'text-primary font-bold border-b-2 border-primary pb-4 whitespace-nowrap'
      : 'text-secondary hover:text-primary pb-4 whitespace-nowrap transition-colors';

  return (
    <div className="mb-8 sticky top-24 z-40 bg-background -mx-gutter-md px-gutter-md py-4 border-b border-outline-variant md:static md:top-auto md:z-auto md:mx-0 md:px-0 md:py-0 md:pb-4">
      <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
        <Link href={buildHref(undefined)} className={tabClass(!activeSlug)}>
          {allLabel}
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={buildHref(category.slug)}
            className={tabClass(activeSlug === category.slug)}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
