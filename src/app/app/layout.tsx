import { redirect } from "next/navigation";
import { GoogleTranslateLoader } from "@/components/client-area/google-translate-loader";
import { PlatformNotConfiguredNotice } from "@/components/client-area/not-configured-notice";
import { ClientAreaShell } from "@/components/client-area/shell";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Layout da Área do cliente. Garante que só quem está logado acessa
 * qualquer página dentro de /app/... — ainda sem diferenciar perfil
 * de cliente e de time interno (decisão pendente).
 *
 * A plataforma inteira (tudo dentro de /app/...) fica fora do
 * sistema de idioma do site público (next-intl): o texto é sempre
 * escrito em inglês, e o idioma de leitura é trocado pela pessoa
 * via o Google Tradutor, em Dados da conta (ver
 * src/components/client-area/language-picker.tsx).
 */
export default async function ClientAreaLayout({
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
      <ClientAreaShell email={user.email ?? ""}>{children}</ClientAreaShell>
    </>
  );
}
