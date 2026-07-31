import Link from 'next/link';
import type { PostCardDTO } from '@/lib/blog-format';
import { formatReadCount } from '@/lib/blog-format';

export default function TrendingList({ posts }: { posts: PostCardDTO[] }) {
  if (posts.length === 0) return null;

  return (
    <div>
      <h4 className="font-headline-lg font-bold text-primary mb-6 text-xl border-b border-outline-variant pb-2">
        Trending Now
      </h4>
      <ul className="space-y-6">
        {posts.map((post, index) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`} className="flex gap-4 group cursor-pointer">
              <span className="text-headline-lg text-surface-variant font-bold leading-none">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h5 className="font-bold text-primary group-hover:text-primary-container transition-colors overflow-hidden max-h-[2lh]">
                  {post.title}
                </h5>
                <span className="text-[10px] text-secondary font-label-caps uppercase">
                  {formatReadCount(post.readCount)}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
