import ToolCard from "@/components/tools/ToolCard";
import type { ToolCardDTO } from "@/lib/tools";

export default function ToolGrid({ tools }: { tools: ToolCardDTO[] }) {
  if (tools.length === 0) {
    return (
      <p className="text-secondary font-body-sm py-12 text-center">
        No tools found. Try a different category.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
