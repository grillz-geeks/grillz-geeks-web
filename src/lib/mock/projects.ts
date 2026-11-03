/**
 * Dados fictícios, só para dar vida às telas da Área do cliente antes
 * de existir conteúdo e integração de verdade com o banco de dados.
 * Nada aqui é real — substituir quando a Área do cliente for ligada
 * ao Supabase.
 */

export type ProjectStatus =
  | "pending"
  | "awaitingApproval"
  | "inProduction"
  | "delivered"
  | "archived";

export type MockProject = {
  id: string;
  name: string;
  status: ProjectStatus;
  updatedAt: string;
  briefing: string;
  timeline: { date: string; label: string }[];
  tasks: { id: string; label: string }[];
  documents: { id: string; name: string }[];
};

export const mockProjects: MockProject[] = [
  {
    id: "anel-infinity",
    name: "Grillz infinito — topo e fundo",
    status: "awaitingApproval",
    updatedAt: "2026-10-28",
    briefing:
      "Grillz completo (topo e fundo) em prata com acabamento espelhado, estilo minimalista.",
    timeline: [
      { date: "2026-10-18", label: "Briefing recebido" },
      { date: "2026-10-22", label: "Primeiro sketch enviado" },
      { date: "2026-10-28", label: "Aguardando aprovação do design" },
    ],
    tasks: [{ id: "1", label: "Aprovar design enviado em 28/10" }],
    documents: [{ id: "1", name: "sketch-v1.pdf" }],
  },
  {
    id: "loja-exemplo-colecao",
    name: "Loja Exemplo — coleção cápsula",
    status: "inProduction",
    updatedAt: "2026-10-25",
    briefing: "Coleção de 6 peças para lançamento de marca, ouro 18k.",
    timeline: [
      { date: "2026-09-30", label: "Orçamento aprovado" },
      { date: "2026-10-10", label: "Produção iniciada" },
      { date: "2026-10-25", label: "Em produção — etapa de acabamento" },
    ],
    tasks: [],
    documents: [{ id: "1", name: "briefing-colecao.pdf" }],
  },
  {
    id: "grillz-aniversario",
    name: "Grillz de aniversário",
    status: "delivered",
    updatedAt: "2026-09-12",
    briefing: "Peça única em ouro rosé com uma pedra central.",
    timeline: [
      { date: "2026-08-01", label: "Orçamento aprovado" },
      { date: "2026-08-20", label: "Produção concluída" },
      { date: "2026-09-12", label: "Entregue" },
    ],
    tasks: [],
    documents: [
      { id: "1", name: "foto-final.jpg" },
      { id: "2", name: "nota-fiscal.pdf" },
    ],
  },
  {
    id: "primeiro-contato",
    name: "Primeiro contato — a definir estilo",
    status: "pending",
    updatedAt: "2026-10-30",
    briefing: "Ainda sem briefing definido, cliente enviou só referências soltas.",
    timeline: [{ date: "2026-10-30", label: "Solicitação recebida" }],
    tasks: [],
    documents: [],
  },
];

export function getMockProject(id: string) {
  return mockProjects.find((project) => project.id === id);
}
