import { GoogleTranslateLoader } from "@/components/client-area/google-translate-loader";
import { ClientAreaShell } from "@/components/client-area/shell";

/**
 * PRÉVIA sem login (NÃO MESCLAR) — versão desta branch que pula a
 * checagem de autenticação para dar uma olhada rápida na Área do
 * cliente sem precisar criar conta/logar. A branch real (PR) continua
 * com a trava de login normal.
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
