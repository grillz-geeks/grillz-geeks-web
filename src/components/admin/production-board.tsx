"use client";

import { CalendarBlank, DotsThree, Package } from "@phosphor-icons/react";
import Link from "next/link";
import { OrderPaymentStatusBadge } from "@/components/admin/order-payment-status-badge";
import { PriorityBadge } from "@/components/admin/priority-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ORDER_STAGES, type MockOrder, type OrderStage } from "@/lib/mock/admin";
import { cn } from "@/lib/utils";

const DOT_CLASS_BY_STAGE: Record<OrderStage, string> = {
  newRequest: "bg-border",
  inDesign: "bg-primary/50",
  awaitingApproval: "bg-primary/75",
  needsRevision: "bg-destructive",
  delivered: "bg-primary",
};

export function ProductionBoard({ orders }: { orders: MockOrder[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {ORDER_STAGES.map((stage) => {
        const stageOrders = orders.filter((order) => order.stage === stage.value);
        return (
          <div key={stage.value} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={cn("size-2 rounded-full", DOT_CLASS_BY_STAGE[stage.value])} />
              <p className="text-sm font-medium">{stage.label}</p>
              <Badge variant="secondary" className="rounded-full">
                {stageOrders.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {stageOrders.map((order) => (
                <Link key={order.id} href={`/admin/production/${order.id}`}>
                  <Card className="p-0 transition-colors hover:bg-muted/50">
                    <CardContent className="space-y-2 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium">{order.orderNumber}</span>
                        <DotsThree className="size-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="truncate text-sm">{order.client}</p>
                        {order.clientNote && (
                          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                            {order.clientNote}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <CalendarBlank className="size-3.5" />
                          {order.dueDate}
                        </span>
                        <PriorityBadge priority={order.priority} />
                      </div>
                      <div className="flex items-center justify-between gap-2 border-t pt-2">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Package className="size-3.5" />
                          {order.items.length} items
                        </span>
                        <OrderPaymentStatusBadge status={order.paymentStatus} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {stageOrders.length === 0 && (
                <p className="text-xs text-muted-foreground">No orders here.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
