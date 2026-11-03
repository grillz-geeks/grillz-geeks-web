"use client";

import { CheckCircle, CreditCard } from "@phosphor-icons/react";
import { useState } from "react";
import { PaymentStatusBadge } from "@/components/client-area/payment-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MockPayment } from "@/lib/mock/payments";

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "BRL" });
}

/**
 * Simulação local de pagamento (sem o Stripe de verdade ainda). Ao
 * clicar em "Pay", só muda o estado aqui na tela — nada é cobrado,
 * nada é salvo no banco.
 */
export function PaymentsTable({ payments: initialPayments }: { payments: MockPayment[] }) {
  const [payments, setPayments] = useState(initialPayments);
  const [payingId, setPayingId] = useState<string | null>(null);

  const totalDue = payments
    .filter((p) => p.status === "due" || p.status === "overdue")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  function handlePay(id: string) {
    setPayingId(id);
    setTimeout(() => {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, status: "paid" as const, paidAt: new Date().toISOString().slice(0, 10) }
            : p,
        ),
      );
      setPayingId(null);
    }, 1200);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Balance due
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatCurrency(totalDue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total paid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatCurrency(totalPaid)}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-2">Project</TableHead>
                <TableHead className="px-4 py-2">Amount</TableHead>
                <TableHead className="px-4 py-2">Status</TableHead>
                <TableHead className="px-4 py-2">Due date</TableHead>
                <TableHead className="px-4 py-2" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="px-4 py-2 font-medium">
                    {payment.projectName}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <PaymentStatusBadge status={payment.status} />
                  </TableCell>
                  <TableCell className="px-4 py-2 text-muted-foreground">
                    {payment.status === "paid" ? payment.paidAt : payment.dueDate}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-right">
                    {payment.status === "paid" ? (
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <CheckCircle className="size-4" />
                        Paid
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        disabled={payingId === payment.id}
                        onClick={() => handlePay(payment.id)}
                        className="gap-1.5"
                      >
                        <CreditCard className="size-4" />
                        {payingId === payment.id ? "Processing…" : "Pay"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Payments will be processed by Stripe. For now, this is just a
        simulation — nothing is actually charged.
      </p>
    </div>
  );
}
