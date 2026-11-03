"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * Formulário ainda não ligado ao banco de dados — por enquanto só
 * mostra uma confirmação local ao enviar, sem salvar nada de verdade.
 */
export function NewProjectForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-xl rounded-lg border bg-card p-6 text-sm">
        <p className="font-medium">Request submitted ✓</p>
        <p className="mt-1 text-muted-foreground">
          We will prepare a budget and get back to you soon.
        </p>
        <Button
          nativeButton={false}
          className="mt-4"
          render={<Link href="/app/projects">Back to my projects</Link>}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="briefing">Briefing</Label>
        <Textarea
          id="briefing"
          name="briefing"
          rows={6}
          placeholder="Describe what you have in mind: style, material, deadline, references…"
        />
      </div>

      <div className="space-y-1.5">
        <Label>References</Label>
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          Upload reference images or files (coming soon).
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit">Submit request</Button>
        <Button
          nativeButton={false}
          type="button"
          variant="outline"
          render={<Link href="/app/projects">Cancel</Link>}
        />
      </div>
    </form>
  );
}
