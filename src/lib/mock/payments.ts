/**
 * Dados fictícios de pagamentos, só para visualizar a tela de
 * Pagamentos. Nada aqui é real — substituir quando a integração com
 * o Stripe existir de verdade.
 */

export type PaymentStatus = "paid" | "due" | "overdue";

export type MockPayment = {
  id: string;
  projectId: string;
  projectName: string;
  amount: number;
  currency: "BRL";
  status: PaymentStatus;
  dueDate: string;
  paidAt?: string;
};

export const mockPayments: MockPayment[] = [
  {
    id: "1",
    projectId: "anel-infinity",
    projectName: "Grillz infinito — topo e fundo",
    amount: 850,
    currency: "BRL",
    status: "due",
    dueDate: "2026-11-10",
  },
  {
    id: "2",
    projectId: "primeiro-contato",
    projectName: "Primeiro contato — a definir estilo",
    amount: 450,
    currency: "BRL",
    status: "overdue",
    dueDate: "2026-10-15",
  },
  {
    id: "3",
    projectId: "loja-exemplo-colecao",
    projectName: "Loja Exemplo — coleção cápsula",
    amount: 4200,
    currency: "BRL",
    status: "paid",
    dueDate: "2026-10-05",
    paidAt: "2026-10-05",
  },
  {
    id: "4",
    projectId: "grillz-aniversario",
    projectName: "Grillz de aniversário",
    amount: 1200,
    currency: "BRL",
    status: "paid",
    dueDate: "2026-08-20",
    paidAt: "2026-08-18",
  },
];
