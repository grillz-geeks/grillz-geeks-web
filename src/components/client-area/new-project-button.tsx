"use client";

import { Plus } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NewProjectButton({ label }: { label: string }) {
  return (
    <Button
      nativeButton={false}
      render={
        <Link href="/app/projects/new">
          <Plus className="size-4" />
          {label}
        </Link>
      }
    />
  );
}
