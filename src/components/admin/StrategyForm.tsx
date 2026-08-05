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
  createStrategyAction,
  updateStrategyAction,
  type StrategyFormInput,
} from "@/app/admin/(dashboard)/strategies/actions";

type CoverImage = { kind: "external"; url: string } | { kind: "storage"; storageId: Id<"_storage"> };

interface StrategyFormInitial {
  _id: Id<"strategies">;
  slug: string;
  title: string;
  category: string;
  icon: string;
  coverImage?: CoverImage;
  coverImageUrl: string | null;
  fileStorageId: Id<"_storage">;
  fileName: string;
  fileUrl: string | null;
  excerpt: string;
  summary: string;
  content: string;
  publishedAt: number;
  status: "DRAFT" | "PUBLISHED";
}

function toDateInputValue(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

export default function StrategyForm({ mode, initial }: { mode: "create" | "edit"; initial?: StrategyFormInitial }) {
  const router = useRouter();
  const all = useQuery(api.strategies.listAll);
  const categories = Array.from(new Set((all ?? []).map((s) => s.category))).sort();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(initial?.status ?? "DRAFT");
  const [publishedAt, setPublishedAt] = useState(toDateInputValue(initial?.publishedAt ?? Date.now()));

  const [coverImage, setCoverImage] = useState<CoverImage | undefined>(initial?.coverImage);
  const [coverExternalUrl, setCoverExternalUrl] = useState(
    initial?.coverImage?.kind === "external" ? initial.coverImage.url : ""
  );

  const [fileStorageId, setFileStorageId] = useState<Id<"_storage"> | undefined>(initial?.fileStorageId);
  const [fileName, setFileName] = useState(initial?.fileName ?? "");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fileStorageId) {
      setError("Please upload a strategy file (.pdf or .docx).");
      return;
    }

    setSubmitting(true);
    const input: StrategyFormInput = {
      slug,
      title,
      category,
      icon,
      coverImage,
      fileStorageId,
      fileName,
      excerpt,
      summary,
      content,
      publishedAt: new Date(publishedAt).getTime(),
      status,
    };

    const result =
      mode === "create"
        ? await createStrategyAction(input)
        : await updateStrategyAction(initial!._id, initial!.slug, input);

    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
    }
    // On success the action redirects, so no further handling needed here.
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-4">
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-6">
        <h2 className="font-headline-lg-mobile text-lg font-bold text-primary">Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6">
          <label className="block sm:col-span-2">
            <span className="block font-label-caps text-label-caps text-secondary mb-1.5">Title</span>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>

          <label className="block sm:col-span-1">
            <span className="block font-label-caps text-label-caps text-secondary mb-1.5">Icon (emoji)</span>
            <input
              type="text"
              required
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              maxLength={8}
              className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>

          <div className="sm:col-span-2">
            <SlugField title={title} value={slug} onChange={setSlug} />
          </div>

          <div className="sm:col-span-1">
            <CategoryCombobox value={category} onChange={setCategory} suggestions={categories} listId="strategy-categories" />
          </div>

          <label className="block sm:col-span-3">
            <span className="block font-label-caps text-label-caps text-secondary mb-1.5">Excerpt (card summary)</span>
            <textarea
              required
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>

          <label className="block sm:col-span-3">
            <span className="block font-label-caps text-label-caps text-secondary mb-1.5">Summary (detail page callout)</span>
            <textarea
              required
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>
        </div>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-3">
        <h2 className="font-headline-lg-mobile text-lg font-bold text-primary">Content</h2>
        <ContentEditor value={content} onChange={setContent} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-3">
          <h2 className="font-headline-lg-mobile text-lg font-bold text-primary">Cover image (optional)</h2>
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
              currentLabel={coverImage?.kind === "storage" ? "Uploaded image selected" : initial?.coverImageUrl ? "Current cover image" : undefined}
              onUploaded={(storageId) => {
                setCoverExternalUrl("");
                setCoverImage({ kind: "storage", storageId });
              }}
            />
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-6">
          <h2 className="font-headline-lg-mobile text-lg font-bold text-primary">Publishing</h2>

          <FileUploadField
            label="Downloadable file (.pdf or .docx)"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            maxBytes={20 * 1024 * 1024}
            currentLabel={fileName || undefined}
            onUploaded={(storageId, file) => {
              setFileStorageId(storageId);
              setFileName(file.name);
            }}
          />

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
          </div>
        </section>
      </div>

      {error && <p className="font-body-sm text-red-600">{error}</p>}

      <div className="flex gap-3 sticky bottom-0 bg-surface-container-lowest/95 backdrop-blur-sm border-t border-outline-variant py-4 -mx-6 px-6">
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary text-on-primary font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitting ? "Saving…" : mode === "create" ? "Create Strategy" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/strategies")}
          className="font-body-sm text-secondary px-6 py-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
