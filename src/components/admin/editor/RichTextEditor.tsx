"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";
import { useMutation, useConvex } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link2,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  ImagePlus,
  Loader2,
  Check,
  X,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors ${
        active ? "bg-on-primary/25 text-on-primary" : "text-on-primary/80 hover:bg-on-primary/10 hover:text-on-primary"
      } disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const loadedMarkdownRef = useRef(value);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const convex = useConvex();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [linkPromptOpen, setLinkPromptOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true },
      }),
      Image,
      TableKit.configure({ table: { resizable: false } }),
      Placeholder.configure({ placeholder: "Tell your story…" }),
      Markdown.configure({ html: false, transformCopiedText: false }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "tiptap-editor-content focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.getMarkdown();
      loadedMarkdownRef.current = markdown;
      onChange(markdown);
    },
  });

  // Reparse `value` into the doc only when it diverges from what's already
  // loaded (e.g. switching back from the Markdown tab after a manual edit
  // there) — avoids clobbering the cursor on every unrelated re-render.
  useEffect(() => {
    if (!editor) return;
    if (value !== loadedMarkdownRef.current) {
      editor.commands.setContent(value);
      loadedMarkdownRef.current = value;
    }
  }, [value, editor]);

  async function handleImageFile(file: File) {
    setUploadError(null);
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setUploadError("Unsupported image type (PNG, JPEG, or WEBP only).");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setUploadError("Image is too large (max 5MB).");
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
      const { storageId } = (await res.json()) as { storageId: Id<"_storage"> };
      const url = await convex.query(api.files.getUrl, { storageId });
      if (!url) throw new Error("Could not resolve uploaded image URL");
      editor?.chain().focus().setImage({ src: url, alt: file.name.replace(/\.[^.]+$/, "") }).run();
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function openLinkPrompt() {
    if (!editor) return;
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    setLinkUrl("");
    setLinkPromptOpen(true);
  }

  function handleSetLink(e: React.FormEvent) {
    e.preventDefault();
    if (!editor) return;
    const url = linkUrl.trim();
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
    setLinkPromptOpen(false);
    setLinkUrl("");
  }

  return (
    <div className="relative">
      {editor && (
        <>
          <BubbleMenu
            editor={editor}
            className="flex items-center gap-0.5 bg-primary rounded-lg shadow-xl px-1 py-1"
          >
            {linkPromptOpen ? (
              <form onSubmit={handleSetLink} className="flex items-center gap-1 px-1">
                <input
                  autoFocus
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="Paste a link…"
                  className="bg-on-primary/10 placeholder:text-on-primary/60 text-on-primary text-xs px-2 py-1 rounded outline-none w-40"
                />
                <ToolbarButton onClick={() => handleSetLink({ preventDefault() {} } as React.FormEvent)} label="Confirm link">
                  <Check size={14} />
                </ToolbarButton>
                <ToolbarButton onClick={() => setLinkPromptOpen(false)} label="Cancel">
                  <X size={14} />
                </ToolbarButton>
              </form>
            ) : (
              <>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Bold">
                  <Bold size={14} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Italic">
                  <Italic size={14} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} label="Strikethrough">
                  <Strikethrough size={14} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} label="Inline code">
                  <Code size={14} />
                </ToolbarButton>
                <ToolbarButton onClick={openLinkPrompt} active={editor.isActive("link")} label="Link">
                  <Link2 size={14} />
                </ToolbarButton>
                <span className="w-px h-4 bg-on-primary/20 mx-0.5" />
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  active={editor.isActive("heading", { level: 2 })}
                  label="Heading 2"
                >
                  <Heading2 size={14} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  active={editor.isActive("heading", { level: 3 })}
                  label="Heading 3"
                >
                  <Heading3 size={14} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} label="Quote">
                  <Quote size={14} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="Bullet list">
                  <List size={14} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  active={editor.isActive("orderedList")}
                  label="Ordered list"
                >
                  <ListOrdered size={14} />
                </ToolbarButton>
              </>
            )}
          </BubbleMenu>

          <FloatingMenu editor={editor} options={{ placement: "left-start", offset: 8 }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-outline-variant bg-surface-container-lowest text-secondary hover:text-primary hover:border-primary transition-colors disabled:opacity-50"
              aria-label="Insert image"
              title="Insert image"
            >
              {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
            </button>
          </FloatingMenu>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageFile(file);
        }}
      />

      <div className="tiptap-editor pl-12 pr-4 py-4 md:pl-14 md:pr-6 md:py-6 bg-surface-container-lowest min-h-[320px]">
        <EditorContent editor={editor} />
      </div>

      {uploadError && <p className="px-4 md:px-6 pb-3 font-body-sm text-red-600">{uploadError}</p>}
    </div>
  );
}
