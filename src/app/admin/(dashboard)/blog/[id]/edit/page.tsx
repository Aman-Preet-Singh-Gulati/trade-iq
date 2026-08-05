"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default function EditBlogPostPage() {
  const params = useParams<{ id: string }>();
  const post = useQuery(api.blogPosts.getById, { id: params.id as Id<"blogPosts"> });

  if (post === undefined) {
    return <p className="font-body-sm text-secondary">Loading…</p>;
  }
  if (post === null) {
    return <p className="font-body-sm text-red-600">Post not found.</p>;
  }

  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-primary mb-6">Edit Blog Post</h1>
      <BlogPostForm mode="edit" initial={post} />
    </div>
  );
}
