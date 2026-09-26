import { getTranslations } from "next-intl/server";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { NotConfiguredNotice } from "@/components/auth/not-configured-notice";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function generateMetadata() {
  const t = await getTranslations("Auth");
  return { title: t("Login.title") };
}

export default async function LoginPage() {
  const t = await getTranslations("Auth");

  return (
    <AuthShell title={t("Login.title")}>
      {isSupabaseConfigured() ? <LoginForm /> : <NotConfiguredNotice />}
    </AuthShell>
  );
}
