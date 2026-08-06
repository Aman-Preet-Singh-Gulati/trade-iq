// Shared line-art motifs used as fallback thumbnail backgrounds whenever a
// content item (strategy, tool) has no cover image. Extracted from
// StrategyThumbnail so ToolThumbnail can reuse the exact same visual
// language without duplicating ~90 lines of SVG.

export function PatternPython() {
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

export function PatternOptions() {
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

export function PatternRisk() {
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

export function PatternDefault() {
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
