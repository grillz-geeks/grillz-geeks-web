"use client";

import { CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Button
      nativeButton={false}
      variant="ghost"
      size="sm"
      className="-ml-2 gap-1"
      render={
        <Link href={href}>
          <CaretLeft className="size-4" />
          {label}
        </Link>
      }
    />
  );
}
