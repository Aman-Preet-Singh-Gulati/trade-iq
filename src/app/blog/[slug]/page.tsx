import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogTopBar from '@/components/blog/BlogTopBar';
import BlogFooter from '@/components/blog/BlogFooter';
import ArticleBody from '@/components/blog/ArticleBody';
import Sidebar from '@/components/blog/Sidebar';
import {
  getAllPublishedSlugs,
  getCategories,
  getPublishedPostBySlug,
  getTrendingPosts,
  formatArticleDate,
} from '@/lib/posts';
import ViewTracker from './ViewTracker';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// A slug published after the last deploy still renders correctly on first
// request instead of 404ing — generateStaticParams below only prewarms
// slugs known at build time.
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPublishedSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    // Never fail the build if Convex is unreachable at build time.
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return { title: 'Article Not Found | TradeIQ Blog' };
  }

  return {
    title: `${post.title} | TradeIQ Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImageUrl],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [categories, trending] = await Promise.all([getCategories(), getTrendingPosts(3)]);

  return (
    <>
      <ViewTracker slug={slug} />
      <BlogTopBar />
      <main className="w-full pt-24 max-w-container-max mx-auto px-gutter-md">
        <div className="mt-8 mb-10">
          <Link href="/blog" className="inline-flex items-center gap-1 text-secondary hover:text-primary font-body-sm transition-colors mb-6">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to Blog
          </Link>

          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl ring-1 ring-primary-fixed/20 border-4 border-white/10">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${post.coverImageUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <span className="inline-block w-fit px-3 py-1 mb-4 bg-primary-fixed/20 border border-primary-fixed/30 text-primary-fixed font-label-caps text-[10px] rounded tracking-widest uppercase backdrop-blur-sm">
                {post.category.name}
              </span>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl text-white leading-tight max-w-3xl">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-secondary text-xs mt-6 font-label-caps tracking-wider">
            <span>{formatArticleDate(post.publishedAt)}</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span>{post.readTimeMinutes} MIN READ</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-margin-lg">
          <article className="flex-1 min-w-0">
            <ArticleBody content={post.content} />
          </article>

          <Sidebar categories={categories} trending={trending} />
        </div>
      </main>
      <BlogFooter />
    </>
  );
}
