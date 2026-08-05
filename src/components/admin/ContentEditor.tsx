"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Loads a local .md file's raw text straight into the same `value` the
  // textarea/rich editor already share — never touches Convex or any
  // upload mutation. It's purely a local file read, exactly like pasting
  // the file's contents into the Markdown tab by hand.
  async function handleFilePicked(file: File) {
    if (value.trim() && !window.confirm(`Replace the current content with "${file.name}"?`)) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    const text = await file.text();
    onChange(text);
    setTab("markdown");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="border border-outline-variant rounded-lg overflow-hidden">
      <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container">
        <div className="flex">
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
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 font-label-caps text-label-caps text-secondary hover:text-primary transition-colors"
          title="Load a local .md file into the editor"
        >
          <Upload size={14} />
          Upload .md
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.markdown,text/markdown,text/plain"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFilePicked(file);
          }}
        />
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
