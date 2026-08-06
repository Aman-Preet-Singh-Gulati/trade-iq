"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import ToolForm from "@/components/admin/ToolForm";

export default function EditToolPage() {
  const params = useParams<{ id: string }>();
  const tool = useQuery(api.tools.getById, { id: params.id as Id<"tools"> });

  if (tool === undefined) {
    return <p className="font-body-sm text-secondary">Loading…</p>;
  }
  if (tool === null) {
    return <p className="font-body-sm text-red-600">Tool not found.</p>;
  }

  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-primary mb-6">Edit Tool</h1>
      <ToolForm mode="edit" initial={tool} />
    </div>
  );
}
