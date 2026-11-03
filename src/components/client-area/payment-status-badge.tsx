import { Badge } from "@/components/ui/badge";
import type { PaymentStatus } from "@/lib/mock/payments";

const STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  paid: { label: "Paid", variant: "default" },
  due: { label: "Due", variant: "secondary" },
  overdue: { label: "Overdue", variant: "outline" },
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const { label, variant } = STATUS_CONFIG[status];
  return (
    <Badge
      variant={variant}
      className={status === "overdue" ? "border-destructive/40 text-destructive" : undefined}
    >
      {label}
    </Badge>
  );
}
