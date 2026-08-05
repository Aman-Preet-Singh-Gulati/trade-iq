import Link from "next/link";
import StatusBadge from "./StatusBadge";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

interface StoryRow {
  _id: string;
  title: string;
  category: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: number;
  excerpt?: string;
  coverImageUrl?: string | null;
}

interface AdminStoryRowProps {
  row: StoryRow;
  basePath: string;
  onDelete: (id: string) => void | Promise<void>;
}

export default function AdminStoryRow({ row, basePath, onDelete }: AdminStoryRowProps) {
  const isDraft = row.status === "DRAFT";

  return (
    <div
      className={`group flex items-start gap-4 px-6 py-4 transition-colors hover:bg-surface-container-low ${
        isDraft ? "border-l-2 border-dashed border-outline-variant pl-[22px]" : ""
      }`}
    >
      <Link href={`${basePath}/${row._id}/edit`} className="flex items-start gap-4 flex-1 min-w-0">
        <div
          className={`shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-surface-container border flex items-center justify-center ${
            isDraft ? "border-dashed border-outline-variant opacity-70" : "border-outline-variant"
          }`}
        >
          {row.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={row.coverImageUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl text-secondary" aria-hidden>
              📄
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-center gap-2 mb-1 font-label-caps text-label-caps text-secondary">
            <span>{row.category}</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span>{new Date(row.publishedAt).toLocaleDateString()}</span>
          </div>
          <h3
            className={`font-headline-lg-mobile text-lg font-bold mb-1 truncate transition-colors ${
              isDraft ? "text-secondary group-hover:text-primary" : "text-primary"
            }`}
          >
            {row.title}
          </h3>
          {row.excerpt && <p className="font-body-sm text-secondary line-clamp-1">{row.excerpt}</p>}
        </div>
      </Link>

      <div className="flex items-center gap-3 shrink-0 pt-0.5">
        <StatusBadge status={row.status} />
        <DeleteConfirmDialog itemLabel={row.title} onConfirm={() => onDelete(row._id)} />
      </div>
    </div>
  );
}
