"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { FormField } from "./form-field";
import { SubmitButton } from "./submit-button";

export function RegisterForm() {
  const t = useTranslations("Auth");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (password !== confirmPassword) {
      setError(t("Register.passwordMismatch"));
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: String(formData.get("email")),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm?next=/app/projects`,
      },
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
      <div className="rounded border border-neutral-200 bg-neutral-50 p-4 text-sm">
        <p className="font-medium">{t("Register.successTitle")}</p>
        <p className="mt-1 text-neutral-600">{t("Register.successBody")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField id="email" type="email" label={t("emailLabel")} required autoComplete="email" />
        <FormField
          id="password"
          type="password"
          label={t("passwordLabel")}
          required
          minLength={8}
          autoComplete="new-password"
        />
        <FormField
          id="confirmPassword"
          type="password"
          label={t("confirmPasswordLabel")}
          required
          minLength={8}
          autoComplete="new-password"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <SubmitButton disabled={loading}>
          {loading ? t("Register.submitting") : t("Register.submit")}
        </SubmitButton>
      </form>
      <p className="text-sm text-neutral-500">
        {t("Register.haveAccount")}{" "}
        <Link href="/login" className="font-medium text-neutral-900 hover:underline">
          {t("Register.signIn")}
        </Link>
      </p>
    </div>
  );
}
