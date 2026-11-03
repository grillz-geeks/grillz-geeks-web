"use client";

import { CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BackToProjectsLink({ label }: { label: string }) {
  return (
    <Button
      nativeButton={false}
      variant="ghost"
      size="sm"
      className="-ml-2 gap-1"
      render={
        <Link href="/app/projects">
          <CaretLeft className="size-4" />
          {label}
        </Link>
      }
    />
  );
}
