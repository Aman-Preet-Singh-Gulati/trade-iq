import type { Category, PostCardDTO } from '@/lib/posts';
import TrendingList from '@/components/blog/TrendingList';
import CategoryPills from '@/components/blog/CategoryPills';
import NewsletterForm from '@/components/shared/NewsletterForm';

interface SidebarProps {
  categories: Category[];
  trending: PostCardDTO[];
  activeSlug?: string;
}

export default function Sidebar({ categories, trending, activeSlug }: SidebarProps) {
  return (
    <aside className="w-full lg:w-80">
      {/* Mobile: full-bleed colored section, borderless newsletter */}
      <div className="md:hidden -mx-gutter-md px-gutter-md py-margin-lg bg-surface-container-highest space-y-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">The Weekly Edge</h3>
            <p className="font-body-sm text-on-surface-variant">
              Institutional-grade market intelligence, delivered directly to your inbox every Sunday evening.
            </p>
          </div>
          <NewsletterForm
            layout="stacked"
            inputClassName="w-full bg-background border border-outline px-4 py-4 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md"
            buttonClassName="w-full bg-primary text-on-primary py-4 px-8 rounded-lg font-bold transition-opacity hover:opacity-90"
            placeholder="Professional Email Address"
            buttonLabel="Subscribe Now"
            buttonPendingLabel="Subscribing..."
          />
          <p className="text-[10px] text-outline font-label-caps uppercase text-center">
            No spam. Institutional updates only.
          </p>
        </div>

        <TrendingList posts={trending} />

        <CategoryPills categories={categories} activeSlug={activeSlug} />
      </div>

      {/* Desktop: boxed sidebar column */}
      <div className="hidden md:block space-y-12">
        <div
          id="blog-newsletter"
          className="bg-primary-container text-on-primary-container p-8 rounded-xl shadow-lg border border-primary/20 relative overflow-hidden scroll-mt-24"
        >
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/30 rounded-full blur-2xl" />
          <h4 className="font-headline-lg font-bold text-white mb-3 text-2xl relative z-10">The Weekly Edge</h4>
          <p className="text-on-primary-container/80 font-body-sm mb-6 relative z-10">
            Join 45,000+ traders receiving our institutional-grade market analysis and strategy updates every Sunday.
          </p>
          <div className="relative z-10">
            <NewsletterForm layout="stacked" />
          </div>
          <p className="text-[10px] text-on-primary-container/60 mt-4 text-center relative z-10 font-label-caps uppercase tracking-wider">
            Unsubscribe anytime. Institutional privacy applies.
          </p>
        </div>

        <TrendingList posts={trending} />

        <CategoryPills categories={categories} activeSlug={activeSlug} />
      </div>
    </aside>
  );
}
