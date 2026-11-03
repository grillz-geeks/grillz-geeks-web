import { GoogleTranslateLoader } from "@/components/client-area/google-translate-loader";
import { ClientAreaShell } from "@/components/client-area/shell";

/**
 * ⚠️ VERSÃO SÓ DE PRÉVIA — NÃO É PARA SER MESCLADA.
 *
 * Esta branch existe só para a Thais conseguir navegar pela Área do
 * cliente no navegador sem precisar fazer login nem configurar o
 * Supabase. A trava de login de verdade está no PR #5 (branch
 * thais/area-do-cliente) e continua funcionando lá normalmente.
 */
export default function ClientAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GoogleTranslateLoader />
      <ClientAreaShell email="previa@grillzgeeks.com">{children}</ClientAreaShell>
    </>
  );
}
