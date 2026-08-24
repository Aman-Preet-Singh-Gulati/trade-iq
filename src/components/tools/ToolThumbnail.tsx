import { PatternPython, PatternOptions, PatternRisk, PatternDefault } from "@/components/shared/PatternArt";

function getPattern(categorySlug: string) {
  switch (categorySlug) {
    // Charting/analysis tools: a price-line-and-marker motif.
    case "charting":
    case "technical-analysis":
      return <PatternPython />;
    // Screening/backtesting tools: a level-and-breakout motif.
    case "screening":
    case "backtesting":
      return <PatternOptions />;
    // Brokers/execution and journaling: a paired-shield motif (capital, discipline).
    case "brokers":
    case "execution":
    case "journaling":
      return <PatternRisk />;
    default:
      return <PatternDefault />;
  }
}

interface ToolThumbnailProps {
  icon: string;
  categorySlug: string;
  coverImageUrl?: string;
  title: string;
  className?: string;
  heightClassName?: string;
}

export default function ToolThumbnail({
  icon,
  categorySlug,
  coverImageUrl,
  title,
  className,
  heightClassName = "h-48",
}: ToolThumbnailProps) {
  if (coverImageUrl) {
    return (
      <div className={`relative ${heightClassName} overflow-hidden bg-surface-container ${className ?? ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverImageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`relative ${heightClassName} overflow-hidden bg-surface-container ${className ?? ""}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-tertiary-container" />
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-fixed/20 rounded-full blur-2xl" />
      <div className="absolute -left-6 -bottom-10 w-28 h-28 bg-primary-fixed/10 rounded-full blur-2xl" />
      {getPattern(categorySlug)}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/20 flex items-center justify-center shadow-lg">
          <span className="text-4xl drop-shadow-lg select-none">{icon}</span>
        </div>
      </div>
    </div>
  );
}
