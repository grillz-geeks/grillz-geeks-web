import { Badge } from "@/components/ui/badge";
import { ORDER_STAGES, type OrderStage } from "@/lib/mock/admin";

const VARIANT_BY_STAGE: Record<OrderStage, "default" | "secondary" | "outline" | "destructive"> =
  {
    newRequest: "outline",
    inDesign: "secondary",
    awaitingApproval: "secondary",
    needsRevision: "destructive",
    delivered: "default",
  };

const LABEL_BY_STAGE = Object.fromEntries(
  ORDER_STAGES.map((stage) => [stage.value, stage.label]),
) as Record<OrderStage, string>;

export function OrderStageBadge({ stage }: { stage: OrderStage }) {
  return <Badge variant={VARIANT_BY_STAGE[stage]}>{LABEL_BY_STAGE[stage]}</Badge>;
}
