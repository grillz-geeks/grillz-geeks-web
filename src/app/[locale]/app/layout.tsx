import { ClientAreaShell } from "@/components/client-area/shell";

/**
 * ⚠️ VERSÃO SÓ DE PRÉVIA — NÃO É PARA SER MESCLADA.
 *
 * Esta branch existe só para a Thais conseguir navegar pela Área do
 * cliente no navegador sem precisar fazer login de verdade. A trava de
 * login de verdade está no PR #5 (branch thais/area-do-cliente) e
 * continua funcionando lá normalmente.
 */
export default async function ClientAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientAreaShell email="previa@grillzgeeks.com">{children}</ClientAreaShell>
  );
}
