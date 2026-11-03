"use client";

import { ImageSquare, PencilSimple, Trash } from "@phosphor-icons/react";

/**
 * Espaço para foto de referência de um evento da timeline. Por
 * enquanto é só um placeholder visual (sem upload de verdade) — os
 * botões de editar/apagar ainda não fazem nada.
 */
export function TimelineImageSlot() {
  return (
    <div className="group/image relative size-[100px] shrink-0 overflow-hidden rounded-md border border-dashed bg-muted/50">
      <div className="flex size-full items-center justify-center text-muted-foreground">
        <ImageSquare className="size-6" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-background/80 p-1 opacity-0 transition-opacity group-hover/image:opacity-100">
        <button
          type="button"
          aria-label="Edit image"
          className="rounded bg-background p-1 text-muted-foreground hover:text-foreground"
        >
          <PencilSimple className="size-3.5" />
        </button>
        <button
          type="button"
          aria-label="Delete image"
          className="rounded bg-background p-1 text-muted-foreground hover:text-destructive"
        >
          <Trash className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
