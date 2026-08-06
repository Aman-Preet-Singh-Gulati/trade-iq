"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import AdminStoryList from "@/components/admin/AdminStoryList";
import { deleteToolAction } from "./actions";

export default function AdminToolsPage() {
  const tools = useQuery(api.tools.listAll);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline-lg text-headline-lg text-primary">Tools</h1>
        <Link
          href="/admin/tools/new"
          className="bg-primary text-on-primary font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          New Tool
        </Link>
      </div>

      {tools === undefined ? (
        <p className="font-body-sm text-secondary">Loading…</p>
      ) : (
        <AdminStoryList
          rows={tools.map((tool) => ({ ...tool, excerpt: tool.description }))}
          basePath="/admin/tools"
          onDelete={async (id) => {
            await deleteToolAction(id as Id<"tools">);
          }}
        />
      )}
    </div>
  );
}
