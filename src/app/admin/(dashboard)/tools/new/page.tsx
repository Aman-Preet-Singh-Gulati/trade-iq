import ToolForm from "@/components/admin/ToolForm";

export default function NewToolPage() {
  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-primary mb-6">New Tool</h1>
      <ToolForm mode="create" />
    </div>
  );
}
