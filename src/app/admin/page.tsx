import Link from "next/link";
import { OrderStageBadge } from "@/components/admin/order-stage-badge";
import { PriorityBadge } from "@/components/admin/priority-badge";
import { ProductionBoard } from "@/components/admin/production-board";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBudgetRequests, mockOrders, mockRecentActivity } from "@/lib/mock/admin";

export const metadata = { title: "Dashboard" };

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "BRL" }).format(value);
}

export default function AdminDashboardPage() {
  const inProduction = mockOrders.filter(
    (order) => order.stage !== "newRequest" && order.stage !== "delivered",
  ).length;
  const awaitingApproval = mockOrders.filter((order) => order.stage === "awaitingApproval").length;
  const overdue = mockOrders.filter((order) => order.paymentStatus === "overdue").length;
  const revenueThisMonth = mockOrders
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + order.paymentAmount, 0);

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">General overview and pending requests.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orders in production
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{inProduction}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Awaiting approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{awaitingApproval}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenue this month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatCurrency(revenueThisMonth)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overdue payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{overdue}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-0">
          <CardHeader className="pt-4">
            <CardTitle className="text-base">Budget requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-4">
            {mockBudgetRequests.map((request) => (
              <div
                key={request.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{request.client}</p>
                  <p className="text-xs text-muted-foreground">{request.summary}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">
                    {request.source === "site" ? "From site" : "Manual"}
                  </Badge>
                  <span className="text-sm font-medium">{formatCurrency(request.value)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="pt-4">
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-4">
            {mockRecentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start justify-between gap-3 text-sm">
                <p>{activity.label}</p>
                <p className="shrink-0 text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Production</h2>
            <p className="text-sm text-muted-foreground">
              Orders currently in progress, grouped by stage.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            nativeButton={false}
            render={<Link href="/admin/production/delivered">Delivered projects</Link>}
          />
        </div>
        <ProductionBoard orders={mockOrders} />
      </div>

      <Card className="p-0">
        <CardHeader className="pt-4">
          <CardTitle className="text-base">Urgent orders</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          {mockOrders.filter((order) => order.priority === "urgent").length === 0 ? (
            <p className="text-sm text-muted-foreground">No urgent orders right now.</p>
          ) : (
            <ul className="divide-y">
              {mockOrders
                .filter((order) => order.priority === "urgent")
                .map((order) => (
                  <li key={order.id} className="flex items-center justify-between gap-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{order.orderNumber}</span>
                      <span className="text-sm text-muted-foreground">{order.client}</span>
                      <PriorityBadge priority={order.priority} />
                    </div>
                    <OrderStageBadge stage={order.stage} />
                  </li>
                ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
