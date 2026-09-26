import { defineRouting } from "next-intl/routing";

/**
 * Idiomas do site.
 *
 * - "en" (inglês) é o idioma padrão: aparece na URL sem prefixo
 *   (ex: grillzgeeks.com/services).
 * - "pt" (português) é o idioma alternativo: aparece com prefixo
 *   (ex: grillzgeeks.com/pt/services).
 */
export const routing = defineRouting({
  locales: ["en", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
