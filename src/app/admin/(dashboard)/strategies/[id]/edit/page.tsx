"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import StrategyForm from "@/components/admin/StrategyForm";

export default function EditStrategyPage() {
  const params = useParams<{ id: string }>();
  const strategy = useQuery(api.strategies.getById, { id: params.id as Id<"strategies"> });

  if (strategy === undefined) {
    return <p className="font-body-sm text-secondary">Loading…</p>;
  }
  if (strategy === null) {
    return <p className="font-body-sm text-red-600">Strategy not found.</p>;
  }

  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-primary mb-6">Edit Strategy</h1>
      <StrategyForm mode="edit" initial={strategy} />
    </div>
  );
}
