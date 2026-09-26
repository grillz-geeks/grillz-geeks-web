import { useTranslations } from "next-intl";

/**
 * Aparece no lugar do formulário de login/cadastro/recuperação enquanto o
 * Supabase não tem as variáveis de ambiente configuradas. Evita que essas
 * páginas quebrem com um erro feio antes do Supabase existir.
 */
export function NotConfiguredNotice() {
  const t = useTranslations("Auth");

  return (
    <div className="max-w-sm rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
      <p className="font-medium">{t("notConfiguredTitle")}</p>
      <p className="mt-1">{t("notConfiguredBody")}</p>
    </div>
  );
}
