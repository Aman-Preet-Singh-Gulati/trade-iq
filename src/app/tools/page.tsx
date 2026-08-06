import type { Metadata } from 'next';
import TopAppBar from '@/components/layout/TopAppBar';
import Footer from '@/components/layout/Footer';
import CategoryFilter from '@/components/blog/CategoryFilter';
import ToolSpotlight from '@/components/tools/ToolSpotlight';
import ToolGrid from '@/components/tools/ToolGrid';
import { getTools, getToolCategories, getFeaturedTool } from '@/lib/tools';

interface ToolsPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export async function generateMetadata({ searchParams }: ToolsPageProps): Promise<Metadata> {
  const { category } = await searchParams;
  const categories = await getToolCategories();
  const activeCategory = categories.find((c) => c.slug === category);

  return {
    title: activeCategory ? `${activeCategory.name} Tools | TradeIQ` : 'Tools | TradeIQ',
    description:
      'A hand-picked directory of the platforms, scanners, and data tools our team actually trades with.',
  };
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const { category, q } = await searchParams;
  const isFiltered = Boolean(category || q);

  const [categories, tools, featuredTool] = await Promise.all([
    getToolCategories(),
    getTools({ categorySlug: category, q }),
    getFeaturedTool(),
  ]);

  return (
    <>
      <TopAppBar />
      <main className="w-full pt-24 max-w-container-max mx-auto px-gutter-md pb-margin-lg">
        <div className="max-w-3xl mt-margin-lg mb-4">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl text-primary mb-4">
            Tools
          </h1>
          <p className="font-body-md text-body-md text-secondary">
            The platforms, scanners, and data tools our team actually trades with. Every entry is
            hand-picked — nothing paid for placement.
          </p>
        </div>

        {tools.length > 0 && (
          <p className="font-label-caps text-label-caps text-secondary mb-10">
            {tools.length} {tools.length === 1 ? 'tool' : 'tools'} across {categories.length}{' '}
            {categories.length === 1 ? 'category' : 'categories'}, hand-picked by the TradeIQ team
          </p>
        )}

        {featuredTool && !isFiltered && <ToolSpotlight tool={featuredTool} />}

        <CategoryFilter
          categories={categories}
          activeSlug={category}
          q={q}
          basePath="/tools"
          variant="pills"
          allLabel="All Tools"
        />

        <ToolGrid tools={tools} />
      </main>
      <Footer />
    </>
  );
}
