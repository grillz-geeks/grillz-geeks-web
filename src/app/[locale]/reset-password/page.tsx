import { getTranslations } from "next-intl/server";
import { AuthShell } from "@/components/auth/auth-shell";
import { NotConfiguredNotice } from "@/components/auth/not-configured-notice";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export async function generateMetadata() {
  const t = await getTranslations("Auth");
  return { title: t("ResetPassword.title") };
}

export default async function ResetPasswordPage() {
  const t = await getTranslations("Auth");

  return (
    <AuthShell title={t("ResetPassword.title")}>
      {isSupabaseConfigured() ? <ResetPasswordForm /> : <NotConfiguredNotice />}
    </AuthShell>
  );
}
