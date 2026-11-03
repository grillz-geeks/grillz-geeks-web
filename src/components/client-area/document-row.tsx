"use client";

import { DownloadSimple, File, FileImage, FilePdf } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const ICON_BY_EXTENSION = {
  jpg: FileImage,
  jpeg: FileImage,
  png: FileImage,
  pdf: FilePdf,
} as const;

function extensionOf(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

export function DocumentRow({
  name,
  downloadLabel,
}: {
  name: string;
  downloadLabel: string;
}) {
  const Icon =
    ICON_BY_EXTENSION[extensionOf(name) as keyof typeof ICON_BY_EXTENSION] ??
    File;

  return (
    <li className="flex items-center gap-3 py-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="size-5 text-muted-foreground" />
      </div>
      <span className="flex-1 truncate text-sm">{name}</span>
      <Button size="sm" variant="ghost" className="gap-1.5">
        <DownloadSimple className="size-4" />
        {downloadLabel}
      </Button>
    </li>
  );
}
