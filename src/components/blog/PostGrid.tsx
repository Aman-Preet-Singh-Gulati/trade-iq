import PostCard from '@/components/blog/PostCard';
import type { PostCardDTO } from '@/lib/posts';

export default function PostGrid({ posts }: { posts: PostCardDTO[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-secondary font-body-sm py-12 text-center">
        No articles found. Try a different category or search term.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-10">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
