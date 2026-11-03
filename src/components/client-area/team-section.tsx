"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Lista de time ainda só local (não salva em lugar nenhum) — serve pra
 * visualizar como a tela fica, até existir a tabela de verdade.
 */
export function TeamSection() {
  const t = useTranslations("ClientArea.Account");
  const [teammates, setTeammates] = useState<string[]>([]);
  const [email, setEmail] = useState("");

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setTeammates((prev) => [...prev, email.trim()]);
    setEmail("");
  }

  return (
    <div className="space-y-4">
      {teammates.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("teamEmpty")}</p>
      ) : (
        <ul className="space-y-2">
          {teammates.map((teammate) => (
            <li
              key={teammate}
              className="flex items-center gap-2 rounded-md border p-2 text-sm"
            >
              <Avatar className="size-7">
                <AvatarFallback className="text-xs">
                  {teammate.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {teammate}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleAdd} className="flex gap-2">
        <Input
          type="email"
          placeholder={t("teammateEmailPlaceholder")}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button type="submit" variant="outline">
          {t("addTeammate")}
        </Button>
      </form>
    </div>
  );
}
