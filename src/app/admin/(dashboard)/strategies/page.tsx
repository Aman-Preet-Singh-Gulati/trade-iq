"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import AdminStoryList from "@/components/admin/AdminStoryList";
import { deleteStrategyAction } from "./actions";

export default function AdminStrategiesPage() {
  const strategies = useQuery(api.strategies.listAll);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline-lg text-headline-lg text-primary">Strategies</h1>
        <Link
          href="/admin/strategies/new"
          className="bg-primary text-on-primary font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          New Strategy
        </Link>
      </div>

      {strategies === undefined ? (
        <p className="font-body-sm text-secondary">Loading…</p>
      ) : (
        <AdminStoryList
          rows={strategies}
          basePath="/admin/strategies"
          onDelete={async (id) => {
            const strategy = strategies.find((s) => s._id === id);
            if (!strategy) return;
            await deleteStrategyAction(id as Id<"strategies">, strategy.slug);
          }}
        />
      )}
    </div>
  );
}
