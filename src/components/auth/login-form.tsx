"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { FormField } from "./form-field";
import { SubmitButton } from "./submit-button";

export function LoginForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });

    setLoading(false);

    if (error) {
      setError(error.message || t("genericError"));
      return;
    }

    router.push("/account");
    router.refresh();
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
          autoComplete="current-password"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <SubmitButton disabled={loading}>
          {loading ? t("Login.submitting") : t("Login.submit")}
        </SubmitButton>
      </form>
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <Link href="/forgot-password" className="hover:underline">
          {t("Login.forgotPassword")}
        </Link>
        <span>
          {t("Login.noAccount")}{" "}
          <Link href="/register" className="font-medium text-neutral-900 hover:underline">
            {t("Login.createAccount")}
          </Link>
        </span>
      </div>
    </div>
  );
}
