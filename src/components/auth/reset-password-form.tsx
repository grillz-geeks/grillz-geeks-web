"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { FormField } from "./form-field";
import { SubmitButton } from "./submit-button";

export function ResetPasswordForm() {
  const t = useTranslations("Auth");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: String(formData.get("newPassword")),
    });

    setLoading(false);

    if (error) {
      setError(error.message || t("genericError"));
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="space-y-4 rounded border border-neutral-200 bg-neutral-50 p-4 text-sm">
        <div>
          <p className="font-medium">{t("ResetPassword.successTitle")}</p>
          <p className="mt-1 text-neutral-600">{t("ResetPassword.successBody")}</p>
        </div>
        <Link href="/login" className="font-medium text-neutral-900 hover:underline">
          {t("ResetPassword.goToLogin")}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        id="newPassword"
        type="password"
        label={t("ResetPassword.newPasswordLabel")}
        required
        minLength={8}
        autoComplete="new-password"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <SubmitButton disabled={loading}>
        {loading ? t("ResetPassword.submitting") : t("ResetPassword.submit")}
      </SubmitButton>
    </form>
  );
}
