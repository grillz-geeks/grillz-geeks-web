import { Badge } from "@/components/ui/badge";

export function PriorityBadge({ priority }: { priority: "urgent" | "normal" }) {
  if (priority === "normal") return null;
  return <Badge variant="destructive">Urgent</Badge>;
}
