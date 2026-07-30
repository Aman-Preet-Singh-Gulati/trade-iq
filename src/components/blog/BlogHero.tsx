import Link from 'next/link';
import type { PostCardDTO } from '@/lib/posts';
import SearchBar from '@/components/blog/SearchBar';

interface BlogHeroProps {
  post: PostCardDTO;
  query?: string;
  activeCategory?: string;
}

export default function BlogHero({ post, query, activeCategory }: BlogHeroProps) {
  return (
    <>
      {/* Mobile-only hero: no cover image, compact colored block */}
      <section className="md:hidden -mx-gutter-md px-gutter-md py-margin-lg bg-surface-container-low overflow-hidden relative">
        <div className="flex flex-col gap-6 relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant w-fit">
            <span className="font-label-caps text-label-caps uppercase tracking-widest">{post.category.name}</span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">{post.title}</h1>
          <p className="font-body-md text-secondary max-w-lg">{post.excerpt}</p>
          <Link
            href={`/blog/${post.slug}`}
            className="bg-primary text-on-primary py-4 px-8 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity w-fit mt-2"
          >
            Read Article
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
          <div id="blog-search" className="scroll-mt-24">
            <SearchBar initialQuery={query} activeCategory={activeCategory} />
          </div>
        </div>
      </section>

      {/* Desktop hero: full cover image with gradient overlay */}
      <section className="hidden md:block mt-8 mb-16 relative">
        <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden group shadow-2xl ring-1 ring-primary-fixed/20 border-4 border-white/10">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${post.coverImageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:px-12 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-primary-fixed/20 border border-primary-fixed/30 text-primary-fixed font-label-caps text-[10px] rounded tracking-widest uppercase backdrop-blur-sm">
                {post.category.name}
              </span>
              <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded backdrop-blur-md border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse" />
                <span className="text-[9px] text-white font-label-caps tracking-wider">NEW</span>
              </div>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-white mb-6 leading-tight">{post.title}</h1>
            <p className="text-white/80 font-body-md mb-8 line-clamp-3">{post.excerpt}</p>
            <div>
              <Link
                href={`/blog/${post.slug}`}
                className="bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-lg font-bold hover:bg-white transition-all flex items-center gap-2 group/btn shadow-lg hover:-translate-y-0.5 w-fit"
              >
                Read Article
                <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-fixed/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      </section>
    </>
  );
}
