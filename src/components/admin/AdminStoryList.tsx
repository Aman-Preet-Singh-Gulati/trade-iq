"use client";

import { useMemo, useState } from "react";
import AdminStoryRow from "./AdminStoryRow";

interface StoryRow {
  _id: string;
  title: string;
  category: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: number;
  excerpt?: string;
  coverImageUrl?: string | null;
}

interface AdminStoryListProps {
  rows: StoryRow[];
  basePath: string; // e.g. "/admin/strategies"
  onDelete: (id: string) => void | Promise<void>;
}

type Filter = "all" | "draft" | "published";

export default function AdminStoryList({ rows, basePath, onDelete }: AdminStoryListProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(
    () => ({
      all: rows.length,
      draft: rows.filter((r) => r.status === "DRAFT").length,
      published: rows.filter((r) => r.status === "PUBLISHED").length,
    }),
    [rows]
  );

  if (rows.length === 0) {
    return <p className="font-body-sm text-secondary">Nothing here yet.</p>;
  }

  const filtered = rows.filter((row) => {
    if (filter === "draft") return row.status === "DRAFT";
    if (filter === "published") return row.status === "PUBLISHED";
    return true;
  });

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: `All (${counts.all})` },
    { id: "draft", label: `Drafts (${counts.draft})` },
    { id: "published", label: `Published (${counts.published})` },
  ];

  return (
    <div>
      <div className="flex items-center gap-1 mb-4">
        {filters.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={`px-3 py-1.5 rounded-full font-label-caps text-label-caps transition-colors ${
              filter === id ? "bg-primary text-on-primary" : "text-secondary hover:bg-surface-container"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="font-body-sm text-secondary px-2 py-6">No items in this view.</p>
      ) : (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant overflow-hidden">
          {filtered.map((row) => (
            <AdminStoryRow key={row._id} row={row} basePath={basePath} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
