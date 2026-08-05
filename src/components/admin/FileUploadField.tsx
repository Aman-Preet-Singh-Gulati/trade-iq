"use client";

import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

interface FileUploadFieldProps {
  label: string;
  accept: string;
  maxBytes: number;
  currentLabel?: string;
  onUploaded: (storageId: Id<"_storage">, file: File) => void;
}

// Shared by strategy downloads and cover images. Client-side checks here are
// UX only — the authoritative mime/size validation happens server-side in
// the create/update mutations (convex/lib/fileValidation.ts).
export default function FileUploadField({ label, accept, maxBytes, currentLabel, onUploaded }: FileUploadFieldProps) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    if (file.size > maxBytes) {
      setError(`File is too large (max ${Math.round(maxBytes / (1024 * 1024))}MB).`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!res.ok) throw new Error("Upload failed");
      const { storageId } = (await res.json()) as { storageId: string };
      onUploaded(storageId as Id<"_storage">, file);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <span className="block font-label-caps text-label-caps text-secondary mb-1.5">{label}</span>
      {currentLabel && <p className="font-body-sm text-secondary mb-2">Current: {currentLabel}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="block w-full font-body-sm text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-on-primary file:font-bold file:cursor-pointer disabled:opacity-50"
      />
      {uploading && <p className="font-body-sm text-secondary mt-1.5">Uploading…</p>}
      {error && <p className="font-body-sm text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}
