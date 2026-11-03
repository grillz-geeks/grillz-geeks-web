"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" className="w-full justify-between sm:w-72">
            {LANGUAGE_NAME_BY_CODE[value] ?? value}
            <CaretDown className="size-4 text-muted-foreground" />
          </Button>
        }
      />
      <PopoverContent className="w-full p-0 sm:w-72">
        <Command>
          <CommandInput placeholder="Search language…" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {GOOGLE_TRANSLATE_LANGUAGES.map((language) => (
                <CommandItem
                  key={language.code}
                  value={language.name}
                  data-checked={language.code === value}
                  onSelect={() => {
                    setGoogleTranslateLanguage(language.code);
                    setOpen(false);
                  }}
                >
                  {language.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
