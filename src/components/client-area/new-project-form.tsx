"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/i18n/navigation";

/**
 * Formulário ainda não ligado ao banco de dados — por enquanto só
 * mostra uma confirmação local ao enviar, sem salvar nada de verdade.
 */
export function NewProjectForm() {
  const t = useTranslations("ClientArea.ProjectNew");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-xl rounded-lg border bg-card p-6 text-sm">
        <p className="font-medium">{t("submit")} ✓</p>
        <p className="mt-1 text-muted-foreground">
          {t("subtitle")}
        </p>
        <Button
          nativeButton={false}
          className="mt-4"
          render={<Link href="/app/projects">{t("cancel")}</Link>}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="project-type">{t("projectTypeLabel")}</Label>
        <Select name="projectType">
          <SelectTrigger id="project-type" className="w-full">
            <SelectValue placeholder={t("projectTypePlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="b2b">{t("projectTypeB2B")}</SelectItem>
            <SelectItem value="b2c">{t("projectTypeB2C")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="briefing">{t("briefingLabel")}</Label>
        <Textarea
          id="briefing"
          name="briefing"
          rows={6}
          placeholder={t("briefingPlaceholder")}
        />
      </div>

      <div className="space-y-1.5">
        <Label>{t("referencesLabel")}</Label>
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          {t("referencesHint")}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit">{t("submit")}</Button>
        <Button
          nativeButton={false}
          type="button"
          variant="outline"
          render={<Link href="/app/projects">{t("cancel")}</Link>}
        />
      </div>
    </form>
  );
}
