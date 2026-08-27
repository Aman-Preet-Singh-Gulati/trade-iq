import { PatternPython, PatternOptions, PatternRisk, PatternDefault } from "@/components/shared/PatternArt";

function getPattern(categorySlug: string) {
  switch (categorySlug) {
    case 'python':
      return <PatternPython />;
    case 'options':
      return <PatternOptions />;
    case 'risk-management':
      return <PatternRisk />;
    // Breakout-style methodologies: a flat consolidation snapping into a sharp move.
    case 'breakout-trading':
    case 'momentum-swing-trading':
      return <PatternOptions />;
    // Oscillation-based methodologies: price zigzagging between reference levels.
    case 'mean-reversion':
      return <PatternPython />;
    // Two related shapes, one diverging from the other.
    case 'divergence-trading':
      return <PatternRisk />;
    // Nodes feeding a shared line: several signals resolving into one decision.
    case 'trading-system-architecture':
      return <PatternPython />;
    // Ascending progression: a stock's growth trajectory through stages.
    case 'growth-stock-investing':
      return <PatternDefault />;
    default:
      return <PatternDefault />;
  }
}

interface StrategyThumbnailProps {
  icon: string;
  categorySlug: string;
  coverImageUrl?: string;
  title: string;
  className?: string;
}

export default function StrategyThumbnail({
  icon,
  categorySlug,
  coverImageUrl,
  title,
  className,
}: StrategyThumbnailProps) {
  if (coverImageUrl) {
    return (
      <div className={`relative h-48 overflow-hidden bg-surface-container ${className ?? ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`relative h-48 overflow-hidden bg-surface-container ${className ?? ''}`}>
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
