import Link from 'next/link';
import type { StrategyCardDTO } from '@/lib/strategies';
import StrategyThumbnail from '@/components/strategies/StrategyThumbnail';

export default function StrategyCard({ strategy }: { strategy: StrategyCardDTO }) {
  return (
    <Link
      href={`/strategy/${strategy.slug}`}
      className="group flex flex-col bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all duration-300 hover:border-primary-container hover:-translate-y-1 hover:shadow-lg"
    >
      <StrategyThumbnail
        icon={strategy.icon}
        categorySlug={strategy.category.slug}
        coverImageUrl={strategy.coverImageUrl}
        title={strategy.title}
        className="group-hover:scale-105 transition-transform duration-500"
      />
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="font-label-caps text-label-caps text-on-primary-fixed-variant bg-primary-fixed px-2 py-0.5 w-fit rounded">
            {strategy.category.name.toUpperCase()}
          </span>
          <span className="font-label-caps text-label-caps text-secondary">{strategy.fileType}</span>
        </div>
        <h3 className="font-headline-lg text-headline-lg text-primary mb-3 leading-tight line-clamp-2">
          {strategy.title}
        </h3>
        <p className="font-body-sm text-body-sm text-secondary line-clamp-3 mb-6 flex-1">
          {strategy.excerpt}
        </p>
        <div className="mt-auto flex items-center text-primary font-bold text-body-sm">
          <span>Download Template</span>
          <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </div>
      </div>
    </Link>
  );
}
