import { getTranslations } from "next-intl/server";
import { AuthShell } from "@/components/auth/auth-shell";
import { NotConfiguredNotice } from "@/components/auth/not-configured-notice";
import { RegisterForm } from "@/components/auth/register-form";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function generateMetadata() {
  const t = await getTranslations("Auth");
  return { title: t("Register.title") };
}

export default async function RegisterPage() {
  const t = await getTranslations("Auth");

  return (
    <AuthShell title={t("Register.title")}>
      {isSupabaseConfigured() ? <RegisterForm /> : <NotConfiguredNotice />}
    </AuthShell>
  );
}
