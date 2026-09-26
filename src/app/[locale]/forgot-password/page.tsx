import { getTranslations } from "next-intl/server";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { NotConfiguredNotice } from "@/components/auth/not-configured-notice";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function generateMetadata() {
  const t = await getTranslations("Auth");
  return { title: t("ForgotPassword.title") };
}

export default async function ForgotPasswordPage() {
  const t = await getTranslations("Auth");

  return (
    <AuthShell title={t("ForgotPassword.title")}>
      {isSupabaseConfigured() ? <ForgotPasswordForm /> : <NotConfiguredNotice />}
    </AuthShell>
  );
}
