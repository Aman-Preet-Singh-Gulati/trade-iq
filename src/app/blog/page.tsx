import type { Metadata } from 'next';
import BlogTopBar from '@/components/blog/BlogTopBar';
import BlogFooter from '@/components/blog/BlogFooter';
import BlogHero from '@/components/blog/BlogHero';
import CategoryFilter from '@/components/blog/CategoryFilter';
import PostGrid from '@/components/blog/PostGrid';
import LoadMoreButton from '@/components/blog/LoadMoreButton';
import Sidebar from '@/components/blog/Sidebar';
import {
  DEFAULT_PAGE_SIZE,
  getCategories,
  getFeaturedPost,
  getPublishedPostsPage,
  getTrendingPosts,
} from '@/lib/posts';

interface BlogPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const { category, q } = await searchParams;
  const categories = await getCategories();
  const activeCategory = categories.find((c) => c.slug === category);

  const title = activeCategory
    ? `${activeCategory.name} | TradeIQ Blog`
    : q
      ? `Search: ${q} | TradeIQ Blog`
      : 'TradeIQ Blog | Market Insights & Professional Trading Education';

  return {
    title,
    description:
      'Institutional-grade market analysis, risk management frameworks, and trading psychology insights from the TradeIQ team.',
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category, q } = await searchParams;

  const [featuredPost, categories, { posts, hasMore }, trending] = await Promise.all([
    getFeaturedPost(),
    getCategories(),
    getPublishedPostsPage({ categorySlug: category, q, page: 1, limit: DEFAULT_PAGE_SIZE }),
    getTrendingPosts(3),
  ]);

  return (
    <>
      <BlogTopBar />
      <main className="w-full pt-24 max-w-container-max mx-auto px-gutter-md">
        {featuredPost && <BlogHero post={featuredPost} query={q} activeCategory={category} />}

        <div className="flex flex-col lg:flex-row gap-12 mb-margin-lg">
          <div className="flex-1">
            <CategoryFilter categories={categories} activeSlug={category} q={q} />

            <PostGrid posts={posts} />

            <LoadMoreButton
              key={`${category ?? ''}::${q ?? ''}`}
              category={category}
              q={q}
              limit={DEFAULT_PAGE_SIZE}
              initialHasMore={hasMore}
            />
          </div>

          <Sidebar categories={categories} trending={trending} activeSlug={category} />
        </div>
      </main>
      <BlogFooter />
    </>
  );
}
