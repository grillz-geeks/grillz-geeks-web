import { PaymentsTable } from "@/components/client-area/payments-table";
import { mockPayments } from "@/lib/mock/payments";

export const metadata = { title: "Payments" };

export default function PaymentsPage() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Payments</h1>
        <p className="text-muted-foreground">
          Check your balance, payment history and what is due per project.
        </p>
      </div>
      <PaymentsTable payments={mockPayments} />
    </div>
  );
}
