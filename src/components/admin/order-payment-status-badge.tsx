import { Badge } from "@/components/ui/badge";
import type { OrderPaymentStatus } from "@/lib/mock/admin";

const STATUS_CONFIG: Record<
  OrderPaymentStatus,
  { label: string; variant: "default" | "secondary" | "destructive" }
> = {
  paid: { label: "Paid", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  overdue: { label: "Overdue", variant: "destructive" },
};

export function OrderPaymentStatusBadge({ status }: { status: OrderPaymentStatus }) {
  const { label, variant } = STATUS_CONFIG[status];
  return <Badge variant={variant}>{label}</Badge>;
}
