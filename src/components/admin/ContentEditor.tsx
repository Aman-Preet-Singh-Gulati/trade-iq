"use client";

import { useState } from "react";
import ArticleBody from "@/components/blog/ArticleBody";
import RichTextEditor from "./editor/RichTextEditor";

interface ContentEditorProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

type Tab = "rich" | "markdown" | "preview";

const tabs: { id: Tab; label: string }[] = [
  { id: "rich", label: "Write" },
  { id: "markdown", label: "Markdown" },
  { id: "preview", label: "Preview" },
];

export default function ContentEditor({ value, onChange, rows = 24 }: ContentEditorProps) {
  // New content opens in the Medium-style Rich tab; existing hand-authored
  // content opens exactly as it always has (the raw Markdown tab), so
  // nothing gets silently reformatted until the author opts into Rich mode
  // for that document. Computed once from the initial value.
  const [tab, setTab] = useState<Tab>(() => (value.trim() === "" ? "rich" : "markdown"));

  return (
    <div className="border border-outline-variant rounded-lg overflow-hidden">
      <div className="flex border-b border-outline-variant bg-surface-container">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`px-4 py-2 font-label-caps text-label-caps transition-colors ${
              tab === id ? "text-primary border-b-2 border-primary" : "text-secondary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "rich" && <RichTextEditor value={value} onChange={onChange} />}

      {tab === "markdown" && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder="Markdown content…"
          className="w-full p-4 font-mono text-body-sm focus:outline-none resize-y bg-surface-container-lowest"
        />
      )}

      {tab === "preview" && (
        <div className="p-6 max-h-[600px] overflow-y-auto bg-surface-container-lowest">
          <ArticleBody content={value.trim() ? value : "*Nothing to preview yet.*"} />
        </div>
      )}
    </div>
  );
}
