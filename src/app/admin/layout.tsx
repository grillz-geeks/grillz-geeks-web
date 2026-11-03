import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/shell";
import { GoogleTranslateLoader } from "@/components/client-area/google-translate-loader";
import { PlatformNotConfiguredNotice } from "@/components/client-area/not-configured-notice";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Layout da Área administrativa. Por enquanto exige só estar logado —
 * igual à Área do cliente — porque ainda não existe diferença entre
 * perfil de cliente e de time interno (decisão pendente, ver
 * CLAUDE.md). Quando essa diferenciação existir, aqui é o lugar para
 * checar o perfil além da sessão.
 *
 * Assim como /app, fica fora do sistema de idioma do site público
 * (next-intl): texto sempre em inglês, com o Google Tradutor
 * disponível para outros idiomas.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <PlatformNotConfiguredNotice />
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <GoogleTranslateLoader />
      <AdminShell email={user.email ?? ""}>{children}</AdminShell>
    </>
  );
}
