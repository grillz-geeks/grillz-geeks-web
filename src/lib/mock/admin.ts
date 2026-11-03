/**
 * Dados fictícios, só para dar vida às telas da Área administrativa
 * antes de existir integração de verdade com o banco de dados. Nada
 * aqui é real — substituir quando a Área administrativa for ligada ao
 * Supabase.
 */

export type OrderStage =
  | "newRequest"
  | "inDesign"
  | "awaitingApproval"
  | "needsRevision"
  | "delivered";

export const ORDER_STAGES: { value: OrderStage; label: string }[] = [
  { value: "newRequest", label: "New requests" },
  { value: "inDesign", label: "In design" },
  { value: "awaitingApproval", label: "Awaiting approval" },
  { value: "needsRevision", label: "Needs revision" },
  { value: "delivered", label: "Delivered" },
];

export type OrderPaymentStatus = "paid" | "pending" | "overdue";

export type MockOrderItem = {
  id: string;
  label: string;
  notes?: string;
};

export type MockOrder = {
  id: string;
  orderNumber: string;
  client: string;
  stage: OrderStage;
  priority: "urgent" | "normal";
  paymentStatus: OrderPaymentStatus;
  paymentAmount: number;
  receivedAt: string;
  dueDate: string;
  clientNote?: string;
  items: MockOrderItem[];
  timeline: { date: string; label: string }[];
};

export const mockOrders: MockOrder[] = [
  {
    id: "1234",
    orderNumber: "#1234",
    client: "Loja Exemplo",
    stage: "inDesign",
    priority: "urgent",
    paymentStatus: "paid",
    paymentAmount: 4200,
    receivedAt: "2026-10-05",
    dueDate: "2026-11-10",
    clientNote: "Cliente pediu para priorizar — lançamento de coleção em 10/11.",
    items: [
      { id: "1", label: "Topo — ouro 18k, acabamento liso" },
      { id: "2", label: "Fundo — ouro 18k, acabamento liso" },
    ],
    timeline: [
      { date: "2026-10-05", label: "Orçamento aprovado" },
      { date: "2026-10-10", label: "Produção iniciada" },
      { date: "2026-10-25", label: "Em design — segunda revisão" },
    ],
  },
  {
    id: "1235",
    orderNumber: "#1235",
    client: "Ana Infinito",
    stage: "awaitingApproval",
    priority: "normal",
    paymentStatus: "pending",
    paymentAmount: 850,
    receivedAt: "2026-10-18",
    dueDate: "2026-11-15",
    items: [{ id: "1", label: "Grillz completo — prata, acabamento espelhado" }],
    timeline: [
      { date: "2026-10-18", label: "Briefing recebido" },
      { date: "2026-10-22", label: "Primeiro sketch enviado" },
      { date: "2026-10-28", label: "Aguardando aprovação do cliente" },
    ],
  },
  {
    id: "1236",
    orderNumber: "#1236",
    client: "Marina Primeiro Contato",
    stage: "newRequest",
    priority: "normal",
    paymentStatus: "pending",
    paymentAmount: 0,
    receivedAt: "2026-10-30",
    dueDate: "—",
    clientNote: "Ainda sem briefing definido, só referências soltas.",
    items: [],
    timeline: [{ date: "2026-10-30", label: "Solicitação recebida" }],
  },
  {
    id: "1198",
    orderNumber: "#1198",
    client: "Grillz Aniversário — Pedro",
    stage: "delivered",
    priority: "normal",
    paymentStatus: "paid",
    paymentAmount: 1200,
    receivedAt: "2026-08-01",
    dueDate: "2026-09-12",
    items: [{ id: "1", label: "Peça única — ouro rosé, pedra central" }],
    timeline: [
      { date: "2026-08-01", label: "Orçamento aprovado" },
      { date: "2026-08-20", label: "Produção concluída" },
      { date: "2026-09-12", label: "Entregue" },
    ],
  },
  {
    id: "1220",
    orderNumber: "#1220",
    client: "Loja Exemplo",
    stage: "needsRevision",
    priority: "urgent",
    paymentStatus: "overdue",
    paymentAmount: 450,
    receivedAt: "2026-10-01",
    dueDate: "2026-10-15",
    clientNote: "Pediu para ajustar o acabamento do topo.",
    items: [{ id: "1", label: "Topo — ajuste de acabamento" }],
    timeline: [
      { date: "2026-10-01", label: "Orçamento aprovado" },
      { date: "2026-10-12", label: "Design enviado para aprovação" },
      { date: "2026-10-20", label: "Cliente solicitou revisão" },
    ],
  },
];

export function getMockOrder(id: string) {
  return mockOrders.find((order) => order.id === id);
}

export type MockBudgetRequest = {
  id: string;
  client: string;
  summary: string;
  value: number;
  receivedAt: string;
  source: "site" | "manual";
};

export const mockBudgetRequests: MockBudgetRequest[] = [
  {
    id: "1",
    client: "Carla Mendes",
    summary: "2 peças — topo e fundo, zircônias",
    value: 1800,
    receivedAt: "2026-11-02",
    source: "site",
  },
  {
    id: "2",
    client: "Studio B2B Example",
    summary: "Coleção de 4 peças para campanha",
    value: 6200,
    receivedAt: "2026-11-01",
    source: "manual",
  },
  {
    id: "3",
    client: "Rafael Souza",
    summary: "1 peça — topo, prata",
    value: 650,
    receivedAt: "2026-10-31",
    source: "site",
  },
];

export type MockActivity = {
  id: string;
  label: string;
  timestamp: string;
};

export const mockRecentActivity: MockActivity[] = [
  { id: "1", label: "Order #1220 — cliente solicitou revisão", timestamp: "2026-11-03 09:12" },
  { id: "2", label: "Order #1198 marcado como entregue", timestamp: "2026-11-02 16:40" },
  { id: "3", label: "Novo orçamento recebido pelo site — Carla Mendes", timestamp: "2026-11-02 11:05" },
  { id: "4", label: "Order #1234 — segunda revisão enviada ao cliente", timestamp: "2026-10-25 14:30" },
];
