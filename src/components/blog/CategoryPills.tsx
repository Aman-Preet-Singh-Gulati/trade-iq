import Link from 'next/link';
import type { Category } from '@/lib/posts';

interface CategoryPillsProps {
  categories: Category[];
  activeSlug?: string;
}

export default function CategoryPills({ categories, activeSlug }: CategoryPillsProps) {
  return (
    <div>
      <h4 className="font-headline-lg font-bold text-primary mb-4 text-xl">Top Categories</h4>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/blog?category=${category.slug}`}
            className={`px-4 py-2 border rounded-full text-body-sm transition-colors ${
              activeSlug === category.slug
                ? 'bg-primary-fixed text-on-primary-fixed border-primary-fixed'
                : 'bg-surface-container border-outline-variant text-secondary hover:bg-primary-fixed hover:text-on-primary-fixed'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
