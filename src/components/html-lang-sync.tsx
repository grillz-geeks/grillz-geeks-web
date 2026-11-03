"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/**
 * O <html lang="..."> agora mora no layout raiz (fora do [locale]),
 * então esse componente ajusta o atributo lang no navegador conforme
 * o idioma da página pública atual (en/pt). Não afeta a plataforma
 * (/app/...), que não passa por aqui.
 */
export function HtmlLangSync() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
