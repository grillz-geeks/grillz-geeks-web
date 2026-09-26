"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { FormField } from "./form-field";
import { SubmitButton } from "./submit-button";

export function ForgotPasswordForm() {
  const t = useTranslations("Auth");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(String(formData.get("email")), {
      redirectTo: `${window.location.origin}/auth/confirm?next=/reset-password`,
    });

    setLoading(false);
    // Mostramos a mesma mensagem de sucesso mesmo se o email não existir
    // na base, para não revelar quais emails têm conta cadastrada.
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="rounded border border-neutral-200 bg-neutral-50 p-4 text-sm">
        <p className="font-medium">{t("ForgotPassword.successTitle")}</p>
        <p className="mt-1 text-neutral-600">{t("ForgotPassword.successBody")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField id="email" type="email" label={t("emailLabel")} required autoComplete="email" />
        <SubmitButton disabled={loading}>
          {loading ? t("ForgotPassword.submitting") : t("ForgotPassword.submit")}
        </SubmitButton>
      </form>
      <p className="text-sm text-neutral-500">
        <Link href="/login" className="font-medium text-neutral-900 hover:underline">
          {t("ForgotPassword.backToLogin")}
        </Link>
      </p>
    </div>
  );
}
