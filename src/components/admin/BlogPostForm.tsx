"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import SlugField from "./SlugField";
import CategoryCombobox from "./CategoryCombobox";
import ContentEditor from "./ContentEditor";
import FileUploadField from "./FileUploadField";
import {
  createBlogPostAction,
  updateBlogPostAction,
  type BlogPostFormInput,
} from "@/app/admin/(dashboard)/blog/actions";

type CoverImage = { kind: "external"; url: string } | { kind: "storage"; storageId: Id<"_storage"> };

interface BlogPostFormInitial {
  _id: Id<"blogPosts">;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: CoverImage;
  coverImageUrl: string;
  readTimeMinutes: number;
  publishedAt: number;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED";
}

function toDateInputValue(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

function estimateReadTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogPostForm({ mode, initial }: { mode: "create" | "edit"; initial?: BlogPostFormInitial }) {
  const router = useRouter();
  const all = useQuery(api.blogPosts.listAll);
  const categories = Array.from(new Set((all ?? []).map((p) => p.category))).sort();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(initial?.status ?? "DRAFT");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [publishedAt, setPublishedAt] = useState(toDateInputValue(initial?.publishedAt ?? Date.now()));
  const [readTimeMinutes, setReadTimeMinutes] = useState(initial?.readTimeMinutes ?? 1);
  const [readTimeTouched, setReadTimeTouched] = useState(Boolean(initial));

  const [coverImage, setCoverImage] = useState<CoverImage | undefined>(initial?.coverImage);
  const [coverExternalUrl, setCoverExternalUrl] = useState(
    initial?.coverImage?.kind === "external" ? initial.coverImage.url : ""
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleContentChange(next: string) {
    setContent(next);
    if (!readTimeTouched) {
      setReadTimeMinutes(estimateReadTime(next));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!coverImage) {
      setError("Please provide a cover image (external URL or upload).");
      return;
    }

    setSubmitting(true);
    const input: BlogPostFormInput = {
      slug,
      title,
      category,
      excerpt,
      content,
      coverImage,
      readTimeMinutes,
      publishedAt: new Date(publishedAt).getTime(),
      featured,
      status,
    };

    const result =
      mode === "create"
        ? await createBlogPostAction(input)
        : await updateBlogPostAction(initial!._id, initial!.slug, input);

    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-6 pb-4">
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-6">
        <h2 className="font-headline-lg-mobile text-lg font-bold text-primary">Details</h2>

        <label className="block">
          <span className="block font-label-caps text-label-caps text-secondary mb-1.5">Title</span>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </label>

        <SlugField title={title} value={slug} onChange={setSlug} />

        <CategoryCombobox value={category} onChange={setCategory} suggestions={categories} listId="blog-categories" />

        <label className="block">
          <span className="block font-label-caps text-label-caps text-secondary mb-1.5">Excerpt</span>
          <textarea
            required
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </label>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-3">
        <h2 className="font-headline-lg-mobile text-lg font-bold text-primary">Content</h2>
        <ContentEditor value={content} onChange={handleContentChange} />
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-3">
        <h2 className="font-headline-lg-mobile text-lg font-bold text-primary">Cover image (required)</h2>
        <div className="flex flex-col gap-3">
          <label className="block">
            <span className="block font-label-caps text-label-caps text-secondary mb-1.5">External URL</span>
            <input
              type="url"
              value={coverExternalUrl}
              onChange={(e) => {
                setCoverExternalUrl(e.target.value);
                setCoverImage(e.target.value ? { kind: "external", url: e.target.value } : undefined);
              }}
              placeholder="https://…"
              className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>
          <p className="text-center font-label-caps text-label-caps text-secondary">or</p>
          <FileUploadField
            label="Upload an image"
            accept="image/png,image/jpeg,image/webp"
            maxBytes={5 * 1024 * 1024}
            currentLabel={
              coverImage?.kind === "storage" ? "Uploaded image selected" : initial?.coverImageUrl ? "Current cover image" : undefined
            }
            onUploaded={(storageId) => {
              setCoverExternalUrl("");
              setCoverImage({ kind: "storage", storageId });
            }}
          />
        </div>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-6">
        <h2 className="font-headline-lg-mobile text-lg font-bold text-primary">Publishing</h2>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="block font-label-caps text-label-caps text-secondary mb-1.5">Published date</span>
            <input
              type="date"
              required
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>
          <label className="block">
            <span className="block font-label-caps text-label-caps text-secondary mb-1.5">Read time (min)</span>
            <input
              type="number"
              min={1}
              required
              value={readTimeMinutes}
              onChange={(e) => {
                setReadTimeTouched(true);
                setReadTimeMinutes(Number(e.target.value));
              }}
              className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 items-end">
          <label className="block">
            <span className="block font-label-caps text-label-caps text-secondary mb-1.5">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "DRAFT" | "PUBLISHED")}
              className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </label>
          <label className="flex items-center gap-2 pb-2.5">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4" />
            <span className="font-body-sm text-secondary">Featured (shows as the hero banner)</span>
          </label>
        </div>
      </section>

      {error && <p className="font-body-sm text-red-600">{error}</p>}

      <div className="flex gap-3 sticky bottom-0 bg-surface-container-lowest/95 backdrop-blur-sm border-t border-outline-variant py-4 -mx-6 px-6">
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary text-on-primary font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitting ? "Saving…" : mode === "create" ? "Create Post" : "Save Changes"}
        </button>
        <button type="button" onClick={() => router.push("/admin/blog")} className="font-body-sm text-secondary px-6 py-3">
          Cancel
        </button>
      </div>
    </form>
  );
}
