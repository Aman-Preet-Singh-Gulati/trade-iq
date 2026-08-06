import type { ToolCardDTO } from "@/lib/tools";
import ToolThumbnail from "@/components/tools/ToolThumbnail";

const PRICING_LABEL: Record<NonNullable<ToolCardDTO["pricing"]>, string> = {
  FREE: "Free",
  FREEMIUM: "Freemium",
  PAID: "Paid",
};

export default function ToolCard({ tool }: { tool: ToolCardDTO }) {
  return (
    <a
      href={tool.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all duration-300 hover:border-primary-container hover:-translate-y-1 hover:shadow-lg"
    >
      <ToolThumbnail
        icon={tool.icon}
        categorySlug={tool.category.slug}
        coverImageUrl={tool.coverImageUrl}
        title={tool.title}
        className="group-hover:scale-105 transition-transform duration-500"
      />
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4 gap-2">
          <span className="font-label-caps text-label-caps text-on-primary-fixed-variant bg-primary-fixed px-2 py-0.5 w-fit rounded">
            {tool.category.name.toUpperCase()}
          </span>
          {tool.pricing && (
            <span className="font-label-caps text-label-caps text-secondary bg-surface-container-low px-2 py-0.5 w-fit rounded shrink-0">
              {PRICING_LABEL[tool.pricing]}
            </span>
          )}
        </div>
        <h3 className="font-headline-lg text-headline-lg text-primary mb-3 leading-tight overflow-hidden max-h-[2lh]">
          {tool.title}
        </h3>
        <p className="font-body-sm text-body-sm text-secondary overflow-hidden max-h-[3lh] mb-6 flex-1">
          {tool.description}
        </p>
        <div className="mt-auto flex items-center text-primary font-bold text-body-sm">
          <span>Visit Tool</span>
          <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">
            open_in_new
          </span>
        </div>
      </div>
    </a>
  );
}
