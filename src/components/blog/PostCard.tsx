import Link from 'next/link';
import type { PostCardDTO } from '@/lib/blog-format';
import { formatArticleDate } from '@/lib/blog-format';

export default function PostCard({ post }: { post: PostCardDTO }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group cursor-pointer flex flex-col h-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-lg md:hover:shadow-xl hover:border-primary"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-container border-b border-outline-variant/30">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={post.title}
          src={post.coverImageUrl}
        />
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-label-caps tracking-widest text-primary border border-outline-variant/50">
          {post.category.name}
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2.5 text-secondary text-xs mb-3.5 font-label-caps tracking-wider">
          <span>{formatArticleDate(post.publishedAt)}</span>
          <span className="w-1 h-1 rounded-full bg-outline-variant" />
          <span>{post.readTimeMinutes} MIN READ</span>
        </div>
        <h3 className="font-headline-lg-mobile md:font-headline-lg font-bold text-primary mb-3 leading-snug overflow-hidden max-h-[2lh] group-hover:text-surface-tint transition-colors md:text-2xl">
          {post.title}
        </h3>
        <p className="text-secondary font-body-sm leading-relaxed overflow-hidden max-h-[3lh] mb-5 flex-1">{post.excerpt}</p>
        <div className="flex items-center text-primary-fixed-dim group-hover:text-primary text-sm font-bold mt-auto pt-4 border-t border-outline-variant/40 transition-colors">
          Read Full Story
          <span className="material-symbols-outlined text-base ml-1 group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </div>
      </div>
    </Link>
  );
}
