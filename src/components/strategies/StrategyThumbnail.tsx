function PatternPython() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path
        d="M20 60 L70 92 L120 48 L170 100 L220 54 L270 96 L320 42 L380 78"
        className="stroke-primary-fixed/30"
        fill="none"
        strokeWidth="1.5"
      />
      <g className="fill-primary-fixed/45">
        <circle cx="20" cy="60" r="4" />
        <circle cx="70" cy="92" r="4" />
        <circle cx="120" cy="48" r="4" />
        <circle cx="170" cy="100" r="4" />
        <circle cx="220" cy="54" r="4" />
        <circle cx="270" cy="96" r="4" />
        <circle cx="320" cy="42" r="4" />
        <circle cx="380" cy="78" r="4" />
      </g>
    </svg>
  );
}

function PatternOptions() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="stroke-primary-fixed/15" strokeWidth="1">
        <line x1="0" y1="40" x2="400" y2="40" />
        <line x1="0" y1="90" x2="400" y2="90" />
        <line x1="0" y1="140" x2="400" y2="140" />
      </g>
      <path
        d="M0 135 L150 135 L235 25 L400 25"
        className="stroke-primary-fixed/50"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PatternRisk() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="stroke-primary-fixed/30" fill="none" strokeWidth="1.5">
        <path d="M55 25 L95 40 L95 88 Q95 118 55 133 Q15 118 15 88 L15 40 Z" />
        <path
          d="M345 15 L385 30 L385 78 Q385 108 345 123 Q305 108 305 78 L305 30 Z"
          className="opacity-50"
        />
      </g>
    </svg>
  );
}

function PatternDefault() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="fill-primary-fixed/35">
        <rect x="30" y="110" width="18" height="50" rx="2" />
        <rect x="70" y="80" width="18" height="80" rx="2" />
        <rect x="110" y="60" width="18" height="100" rx="2" />
        <rect x="150" y="95" width="18" height="65" rx="2" />
        <rect x="190" y="40" width="18" height="120" rx="2" />
      </g>
    </svg>
  );
}

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
      <div className={`relative h-48 overflow-hidden bg-primary ${className ?? ''}`}>
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
    <div className={`relative h-48 overflow-hidden bg-primary ${className ?? ''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-primary" />
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-fixed/20 rounded-full blur-2xl" />
      <div className="absolute -left-6 -bottom-10 w-28 h-28 bg-primary-fixed/10 rounded-full blur-2xl" />
      {getPattern(categorySlug)}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-on-primary/15 backdrop-blur-sm ring-1 ring-on-primary/20 flex items-center justify-center shadow-lg">
          <span className="text-4xl drop-shadow-lg select-none">{icon}</span>
        </div>
      </div>
    </div>
  );
}
