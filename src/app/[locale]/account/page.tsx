import { getLocale, getTranslations } from "next-intl/server";
import { NotConfiguredNotice } from "@/components/auth/not-configured-notice";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { redirect } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function generateMetadata() {
  const t = await getTranslations("Auth");
  return { title: t("Account.title") };
}

/**
 * Página genérica de "área logada", só para provar que o login funciona.
 * Ainda não diferencia perfil de cliente e de time interno — isso é uma
 * decisão que a Thais quer pensar melhor antes.
 */
export default async function AccountPage() {
  const t = await getTranslations("Auth");

  if (!isSupabaseConfigured()) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <NotConfiguredNotice />
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

  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-4 p-8">
      <h1 className="text-2xl font-semibold">{t("Account.title")}</h1>
      <p className="text-sm text-neutral-600">
        {t("Account.loggedInAs")}: <span className="font-medium">{user.email}</span>
      </p>
      <SignOutButton />
    </main>
  );
}
