import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/lib/mock/projects";

const variantByStatus: Record<
  ProjectStatus,
  "default" | "secondary" | "outline"
> = {
  pending: "outline",
  awaitingApproval: "secondary",
  inProduction: "secondary",
  delivered: "default",
  archived: "outline",
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const t = useTranslations("ClientArea.Status");
  return <Badge variant={variantByStatus[status]}>{t(status)}</Badge>;
}
