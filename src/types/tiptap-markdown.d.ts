// tiptap-markdown doesn't ship a @tiptap/core module augmentation for its
// own storage shape, so `editor.storage.markdown` is untyped by default.
import type { MarkdownStorage } from "tiptap-markdown";

declare module "@tiptap/core" {
  interface Storage {
    markdown: MarkdownStorage;
  }
}
