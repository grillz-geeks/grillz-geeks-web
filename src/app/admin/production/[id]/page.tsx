import { notFound } from "next/navigation";
import { BackLink } from "@/components/admin/back-link";
import { OrderActionsMenu } from "@/components/admin/order-actions-menu";
import { OrderPaymentStatusBadge } from "@/components/admin/order-payment-status-badge";
import { OrderStageBadge } from "@/components/admin/order-stage-badge";
import { PriorityBadge } from "@/components/admin/priority-badge";
import { TimelineImageSlot } from "@/components/admin/timeline-image-slot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMockOrder, mockOrders } from "@/lib/mock/admin";

export function generateStaticParams() {
  return mockOrders.map((order) => ({ id: order.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getMockOrder(id);
  return { title: order ? `Order ${order.orderNumber}` : "Order" };
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "BRL" }).format(value);
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getMockOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <BackLink href="/admin/production" label="Back to production" />
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold">Order {order.orderNumber}</h1>
          <OrderStageBadge stage={order.stage} />
          <PriorityBadge priority={order.priority} />
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-muted-foreground">{order.client}</p>
          <OrderActionsMenu />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Order details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">Payment status</dt>
              <dd className="mt-1">
                <OrderPaymentStatusBadge status={order.paymentStatus} />
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Amount</dt>
              <dd className="mt-1 text-sm font-medium">{formatCurrency(order.paymentAmount)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Received</dt>
              <dd className="mt-1 text-sm">{order.receivedAt}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Due date</dt>
              <dd className="mt-1 text-sm">{order.dueDate}</dd>
            </div>
            {order.clientNote && (
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground">Client note</dt>
                <dd className="mt-1 text-sm">{order.clientNote}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Items</CardTitle>
        </CardHeader>
        <CardContent>
          {order.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No items on this order yet.</p>
          ) : (
            <ul className="divide-y">
              {order.items.map((item) => (
                <li key={item.id} className="py-2">
                  <p className="text-sm">{item.label}</p>
                  {item.notes && <p className="text-xs text-muted-foreground">{item.notes}</p>}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {order.timeline.map((event, index) => (
              <li key={event.date} className="flex items-start gap-3">
                <div className="flex flex-col items-center self-stretch">
                  <div className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                  {index < order.timeline.length - 1 && (
                    <div className="my-1 w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="flex flex-1 items-start justify-between gap-3 pb-4">
                  <div>
                    <p className="text-sm font-medium">{event.label}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <TimelineImageSlot />
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
