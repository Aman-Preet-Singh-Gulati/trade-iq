import StrategyForm from "@/components/admin/StrategyForm";

export default function NewStrategyPage() {
  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-primary mb-6">New Strategy</h1>
      <StrategyForm mode="create" />
    </div>
  );
}
