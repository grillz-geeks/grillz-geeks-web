import Link from "next/link";
import { OrderPaymentStatusBadge } from "@/components/admin/order-payment-status-badge";
import { PriorityBadge } from "@/components/admin/priority-badge";
import { Card, CardContent } from "@/components/ui/card";
import { ORDER_STAGES, mockOrders } from "@/lib/mock/admin";

export const metadata = { title: "Production" };

export default function ProductionBoardPage() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Production</h1>
        <p className="text-muted-foreground">
          Orders currently in progress, grouped by stage.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {ORDER_STAGES.map((stage) => {
          const orders = mockOrders.filter((order) => order.stage === stage.value);
          return (
            <div key={stage.value} className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                {stage.label} <span className="text-foreground">({orders.length})</span>
              </p>
              <div className="space-y-3">
                {orders.map((order) => (
                  <Link key={order.id} href={`/admin/production/${order.id}`}>
                    <Card className="p-0 transition-colors hover:bg-muted/50">
                      <CardContent className="space-y-2 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium">{order.orderNumber}</span>
                          <PriorityBadge priority={order.priority} />
                        </div>
                        <p className="truncate text-sm text-muted-foreground">{order.client}</p>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs text-muted-foreground">
                            Due {order.dueDate}
                          </span>
                          <OrderPaymentStatusBadge status={order.paymentStatus} />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                {orders.length === 0 && (
                  <p className="text-xs text-muted-foreground">No orders here.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
