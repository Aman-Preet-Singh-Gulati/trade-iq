export default function StatusBadge({ status }: { status: "DRAFT" | "PUBLISHED" }) {
  const isPublished = status === "PUBLISHED";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-label-caps text-label-caps ${
        isPublished ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-surface-container text-secondary"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isPublished ? "bg-on-primary-fixed-variant" : "border border-secondary"
        }`}
      />
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}
