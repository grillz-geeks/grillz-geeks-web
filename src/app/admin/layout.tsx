import { AdminShell } from "@/components/admin/shell";
import { GoogleTranslateLoader } from "@/components/client-area/google-translate-loader";

/**
 * PRÉVIA sem login (NÃO MESCLAR) — versão desta branch que pula a
 * checagem de autenticação para dar uma olhada rápida na Área
 * administrativa sem precisar criar conta/logar. A branch real (PR)
 * continua com a trava de login normal.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GoogleTranslateLoader />
      <AdminShell email="previa@grillzgeeks.com">{children}</AdminShell>
    </>
  );
}
