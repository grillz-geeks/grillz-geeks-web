"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay: boolean },
          elementId: string,
        ) => unknown;
      };
    };
  }
}

/**
 * Carrega o widget do Google Tradutor uma vez, escondido (não mostra a
 * barrinha padrão deles no topo da página). Quem troca o idioma é o
 * LanguagePicker em /app/account, escrevendo um cookie que esse widget
 * lê. Isso é um serviço gratuito de terceiros — a tradução é
 * automática, não revisada por humano, e depende do Google continuar
 * oferecendo esse widget do jeito que é hoje.
 */
export function GoogleTranslateLoader() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element",
        );
      }
    };
  }, []);

  return (
    <>
      <div id="google_translate_element" className="hidden" />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
