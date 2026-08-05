"use client";

import { useEffect, useRef, useState } from "react";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface SlugFieldProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
}

// Auto-derives from `title` until the user manually edits the slug once,
// matching the existing kebab-case rule enforced server-side.
export default function SlugField({ title, value, onChange }: SlugFieldProps) {
  const [touched, setTouched] = useState(false);
  const prevTitle = useRef(title);

  useEffect(() => {
    if (!touched && title !== prevTitle.current) {
      onChange(slugify(title));
    }
    prevTitle.current = title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, touched]);

  return (
    <label className="block">
      <span className="block font-label-caps text-label-caps text-secondary mb-1.5">Slug</span>
      <input
        type="text"
        required
        value={value}
        onChange={(e) => {
          setTouched(true);
          onChange(e.target.value);
        }}
        pattern="^[a-z0-9]+(-[a-z0-9]+)*$"
        title="Lowercase letters, numbers, and hyphens only."
        className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-mono text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </label>
  );
}
