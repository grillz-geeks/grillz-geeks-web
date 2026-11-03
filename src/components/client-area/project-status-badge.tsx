import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/lib/mock/projects";

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  pending: { label: "Pending", variant: "outline" },
  awaitingApproval: { label: "Awaiting approval", variant: "secondary" },
  inProduction: { label: "In production", variant: "secondary" },
  delivered: { label: "Delivered", variant: "default" },
  archived: { label: "Archived", variant: "outline" },
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const { label, variant } = STATUS_CONFIG[status];
  return <Badge variant={variant}>{label}</Badge>;
}
