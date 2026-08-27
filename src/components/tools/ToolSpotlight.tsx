import type { ToolCardDTO } from "@/lib/tools";
import { PatternPython, PatternOptions, PatternRisk, PatternDefault } from "@/components/shared/PatternArt";

const PRICING_LABEL: Record<NonNullable<ToolCardDTO["pricing"]>, string> = {
  FREE: "Free",
  FREEMIUM: "Freemium",
  PAID: "Paid",
};

function getPattern(categorySlug: string) {
  switch (categorySlug) {
    case "charting":
    case "technical-analysis":
      return <PatternPython />;
    case "screening":
    case "backtesting":
      return <PatternOptions />;
    case "brokers":
    case "execution":
    case "journaling":
      return <PatternRisk />;
    default:
      return <PatternDefault />;
  }
}

export default function ToolSpotlight({ tool }: { tool: ToolCardDTO }) {
  return (
    <>
      {/* Mobile-only spotlight: compact colored block, no cover image */}
      <section className="md:hidden -mx-gutter-md px-gutter-md py-margin-lg bg-surface-container-low overflow-hidden relative">
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant w-fit">
              <span className="font-label-caps text-label-caps uppercase tracking-widest">{tool.category.name}</span>
            </div>
            {tool.pricing && (
              <span className="font-label-caps text-label-caps text-secondary">{PRICING_LABEL[tool.pricing]}</span>
            )}
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">{tool.title}</h2>
          <p className="font-body-md text-secondary max-w-lg">{tool.description}</p>
          <a
            href={tool.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-on-primary py-4 px-8 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity w-fit mt-2"
          >
            Visit Tool
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </section>

      {/* Desktop spotlight: cover image if available, otherwise generated art */}
      <section className="hidden md:block mt-8 mb-16 relative">
        <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden group shadow-2xl ring-1 ring-primary-fixed/20 border-4 border-white/10">
          {tool.coverImageUrl ? (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${tool.coverImageUrl}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-tertiary-container" />
              <div className="absolute -right-8 -top-8 w-56 h-56 bg-primary-fixed/20 rounded-full blur-3xl" />
              <div className="absolute -left-10 -bottom-16 w-56 h-56 bg-primary-fixed/10 rounded-full blur-3xl" />
              {getPattern(tool.category.slug)}
            </>
          )}
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:px-12 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-primary-fixed/20 border border-primary-fixed/30 text-primary-fixed font-label-caps text-[10px] rounded tracking-widest uppercase backdrop-blur-sm">
                {tool.category.name}
              </span>
              <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded backdrop-blur-md border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse" />
                <span className="text-[9px] text-white font-label-caps tracking-wider">FEATURED</span>
              </div>
              {tool.pricing && (
                <span className="text-[9px] text-white/80 font-label-caps tracking-wider bg-black/40 px-2 py-1 rounded backdrop-blur-md border border-white/10">
                  {PRICING_LABEL[tool.pricing].toUpperCase()}
                </span>
              )}
            </div>
            <h2 className="font-headline-xl text-headline-xl text-white mb-6 leading-tight">{tool.title}</h2>
            <p className="text-white/80 font-body-md mb-8 overflow-hidden max-h-[3lh] shrink-0">{tool.description}</p>
            <div>
              <a
                href={tool.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-lg font-bold hover:bg-white transition-all flex items-center gap-2 group/btn shadow-lg hover:-translate-y-0.5 w-fit"
              >
                Visit Tool
                <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-fixed/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      </section>
    </>
  );
}
