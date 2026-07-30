import StrategyCard from '@/components/strategies/StrategyCard';
import type { StrategyCardDTO } from '@/lib/strategies';

export default function StrategyGrid({ strategies }: { strategies: StrategyCardDTO[] }) {
  if (strategies.length === 0) {
    return (
      <p className="text-secondary font-body-sm py-12 text-center">
        No strategies found. Try a different category.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {strategies.map((strategy) => (
        <StrategyCard key={strategy.id} strategy={strategy} />
      ))}
    </div>
  );
}
