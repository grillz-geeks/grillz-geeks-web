import Link from "next/link";
import { BackLink } from "@/components/admin/back-link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockOrders } from "@/lib/mock/admin";

export const metadata = { title: "Delivered projects" };

export default function DeliveredProjectsPage() {
  const deliveredOrders = mockOrders.filter((order) => order.stage === "delivered");

  return (
    <div className="space-y-6 p-8">
      <div>
        <BackLink href="/admin" label="Back to dashboard" />
        <h1 className="mt-2 text-2xl font-semibold">Delivered projects</h1>
        <p className="text-muted-foreground">Orders that have already been delivered.</p>
      </div>

      <Card className="p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-2">Client</TableHead>
                <TableHead className="px-4 py-2">Project</TableHead>
                <TableHead className="px-4 py-2">#</TableHead>
                <TableHead className="px-4 py-2"># of items</TableHead>
                <TableHead className="px-4 py-2" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-4 py-2 font-medium">{order.client}</TableCell>
                  <TableCell className="px-4 py-2">{order.project}</TableCell>
                  <TableCell className="px-4 py-2 text-muted-foreground">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-muted-foreground">
                    {order.items.length}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-right">
                    <Link
                      href={`/admin/production/${order.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
