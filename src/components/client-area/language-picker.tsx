"use client";

import { useSyncExternalStore } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GOOGLE_TRANSLATE_LANGUAGES,
  getCurrentGoogleTranslateLanguage,
  setGoogleTranslateLanguage,
} from "@/lib/google-translate";

const LANGUAGE_NAME_BY_CODE = Object.fromEntries(
  GOOGLE_TRANSLATE_LANGUAGES.map((language) => [language.code, language.name]),
);

// O cookie não muda sozinho enquanto a página está aberta (a gente
// recarrega a página ao trocar), então não precisa de inscrição real.
function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return "en";
}

export function LanguagePicker() {
  const value = useSyncExternalStore(
    subscribe,
    getCurrentGoogleTranslateLanguage,
    getServerSnapshot,
  );

  return (
    <Select
      value={value}
      onValueChange={(code) => code && setGoogleTranslateLanguage(code)}
    >
      <SelectTrigger className="w-full sm:w-72">
        <SelectValue>
          {(code: string) => LANGUAGE_NAME_BY_CODE[code] ?? code}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {GOOGLE_TRANSLATE_LANGUAGES.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
