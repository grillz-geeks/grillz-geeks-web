import { getLocale, getTranslations } from "next-intl/server";
import { NotConfiguredNotice } from "@/components/auth/not-configured-notice";
import { ClientAreaShell } from "@/components/client-area/shell";
import { redirect } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Layout da Área do cliente. Garante que só quem está logado acessa
 * qualquer página dentro de /app/... — ainda sem diferenciar perfil
 * de cliente e de time interno (decisão pendente).
 */
export default async function ClientAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    const t = await getTranslations("Auth");
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <NotConfiguredNotice />
        <p className="mt-4 text-sm text-muted-foreground">{t("notConfiguredBody")}</p>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const locale = await getLocale();
    return redirect({ href: "/login", locale });
  }

  return <ClientAreaShell email={user.email ?? ""}>{children}</ClientAreaShell>;
}
