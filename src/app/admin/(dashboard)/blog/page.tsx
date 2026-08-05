"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import AdminStoryList from "@/components/admin/AdminStoryList";
import { deleteBlogPostAction } from "./actions";

export default function AdminBlogPage() {
  const posts = useQuery(api.blogPosts.listAll);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline-lg text-headline-lg text-primary">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="bg-primary text-on-primary font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          New Post
        </Link>
      </div>

      {posts === undefined ? (
        <p className="font-body-sm text-secondary">Loading…</p>
      ) : (
        <AdminStoryList
          rows={posts}
          basePath="/admin/blog"
          onDelete={async (id) => {
            const post = posts.find((p) => p._id === id);
            if (!post) return;
            await deleteBlogPostAction(id as Id<"blogPosts">, post.slug);
          }}
        />
      )}
    </div>
  );
}
