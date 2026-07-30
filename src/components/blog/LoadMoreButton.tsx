"use client";

import { useState } from 'react';
import PostCard from '@/components/blog/PostCard';
import type { PostCardDTO } from '@/lib/blog-format';

interface LoadMoreButtonProps {
  category?: string;
  q?: string;
  limit: number;
  initialHasMore: boolean;
}

export default function LoadMoreButton({ category, q, limit, initialHasMore }: LoadMoreButtonProps) {
  const [posts, setPosts] = useState<PostCardDTO[]>([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoadMore = async () => {
    setIsLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (q) params.set('q', q);
      params.set('page', String(page));
      params.set('limit', String(limit));

      const res = await fetch(`/api/posts?${params.toString()}`);
      if (!res.ok) {
        throw new Error('Failed to load more articles. Please try again.');
      }

      const data = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setHasMore(data.hasMore);
      setPage((p) => p + 1);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-10 mt-10">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {error && <p className="text-error font-body-sm text-center mt-6">{error}</p>}

      {hasMore && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="border border-outline-variant text-primary px-10 py-3 rounded-lg font-bold hover:bg-surface-variant transition-colors disabled:opacity-60"
          >
            {isLoading ? 'Loading...' : 'Load More Insights'}
          </button>
        </div>
      )}
    </>
  );
}
