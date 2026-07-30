import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TopAppBar from '@/components/layout/TopAppBar';
import Footer from '@/components/layout/Footer';
import ArticleBody from '@/components/blog/ArticleBody';
import { getAllPublishedStrategySlugs, getStrategyBySlug } from '@/lib/strategies';

interface StrategyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPublishedStrategySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: StrategyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const strategy = await getStrategyBySlug(slug);

  if (!strategy) {
    return { title: 'Strategy Not Found | TradeIQ' };
  }

  return {
    title: `${strategy.title} | TradeIQ Strategies`,
    description: strategy.excerpt,
  };
}

export default async function StrategyPage({ params }: StrategyPageProps) {
  const { slug } = await params;
  const strategy = await getStrategyBySlug(slug);

  if (!strategy) {
    notFound();
  }

  const publishedLabel = new Date(strategy.publishedAt)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase();

  return (
    <>
      <TopAppBar />
      <main className="w-full pt-24 pb-24 px-gutter-md">
        <div className="max-w-[708px] mx-auto mt-margin-lg">
          <Link
            href="/strategies"
            className="inline-flex items-center gap-1 text-secondary hover:text-primary font-body-sm transition-colors mb-10"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Strategies
          </Link>

          {strategy.coverImageUrl ? (
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl ring-1 ring-primary-fixed/20 border-4 border-white/10 mb-6">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${strategy.coverImageUrl}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                <span className="inline-block w-fit px-3 py-1 mb-3 bg-primary-fixed/20 border border-primary-fixed/30 text-primary-fixed font-label-caps text-[10px] rounded tracking-widest uppercase backdrop-blur-sm">
                  {strategy.category.name}
                </span>
                <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl text-white leading-tight">
                  {strategy.title}
                </h1>
              </div>
            </div>
          ) : (
            <>
              <div className="text-6xl mb-6" aria-hidden>
                {strategy.icon}
              </div>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl text-primary mb-6">
                {strategy.title}
              </h1>
            </>
          )}

          <div className="flex flex-wrap items-center gap-3 mb-8">
            {!strategy.coverImageUrl && (
              <span className="px-3 py-1.5 border border-outline-variant rounded font-label-caps text-label-caps text-secondary">
                {strategy.category.name.toUpperCase()}
              </span>
            )}
            <span className="px-3 py-1.5 border border-outline-variant rounded font-label-caps text-label-caps text-secondary">
              {strategy.fileType}
            </span>
            <span className="px-3 py-1.5 border border-outline-variant rounded font-label-caps text-label-caps text-secondary">
              {strategy.fileSizeLabel}
            </span>
            <span className="px-3 py-1.5 border border-outline-variant rounded font-label-caps text-label-caps text-secondary">
              {publishedLabel}
            </span>

            <a
              href={`/strategies/${strategy.fileName}`}
              download
              className="ml-auto inline-flex items-center gap-1.5 bg-primary text-on-primary font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-body-sm text-body-sm whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              Download
            </a>
          </div>

          <div className="border-t border-outline-variant mb-10" />

          <div className="bg-primary-container/40 border border-primary-container rounded-xl px-6 py-5 mb-10">
            <span className="block font-label-caps text-label-caps text-primary mb-2">
              Strategy Summary
            </span>
            <p className="font-body-md text-on-surface-variant leading-relaxed">{strategy.summary}</p>
          </div>

          <ArticleBody content={strategy.content} />
        </div>
      </main>
      <Footer />
    </>
  );
}
