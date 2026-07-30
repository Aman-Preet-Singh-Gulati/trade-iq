import type { Metadata } from 'next';
import TopAppBar from '@/components/layout/TopAppBar';
import Footer from '@/components/layout/Footer';
import CategoryFilter from '@/components/blog/CategoryFilter';
import StrategyGrid from '@/components/strategies/StrategyGrid';
import { getStrategies, getStrategyCategories } from '@/lib/strategies';

interface StrategiesPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export async function generateMetadata({ searchParams }: StrategiesPageProps): Promise<Metadata> {
  const { category } = await searchParams;
  const categories = await getStrategyCategories();
  const activeCategory = categories.find((c) => c.slug === category);

  return {
    title: activeCategory ? `${activeCategory.name} Strategies | TradeIQ` : 'Strategies | TradeIQ',
    description:
      'A curated library of institutional-grade trading methodologies, provided as free downloads for our community.',
  };
}

export default async function StrategiesPage({ searchParams }: StrategiesPageProps) {
  const { category, q } = await searchParams;

  const [categories, strategies] = await Promise.all([
    getStrategyCategories(),
    getStrategies({ categorySlug: category, q }),
  ]);

  return (
    <>
      <TopAppBar />
      <main className="w-full pt-24 max-w-container-max mx-auto px-gutter-md pb-margin-lg">
        <div className="max-w-3xl mt-margin-lg mb-12">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl text-primary mb-4">
            Strategies
          </h1>
          <p className="font-body-md text-body-md text-secondary">
            A curated library of institutional-grade trading methodologies. These resources are
            provided as free downloads for our community to aid in quantitative research and
            backtesting.
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          activeSlug={category}
          q={q}
          basePath="/strategies"
          variant="pills"
          allLabel="All Strategies"
        />

        <StrategyGrid strategies={strategies} />
      </main>
      <Footer />
    </>
  );
}
