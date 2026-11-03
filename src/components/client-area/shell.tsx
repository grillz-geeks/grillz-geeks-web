"use client";

import { CreditCard, Folder, Gear } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/client-area/sign-out-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/**
 * Ainda não temos um campo de "nome" de verdade salvo (ver /app/account).
 * Por enquanto, mostramos um nome derivado do email só para a tela não
 * ficar vazia — trocar quando o perfil estiver ligado ao banco de dados.
 */
function displayNameFromEmail(email: string) {
  const [localPart] = email.split("@");
  if (!localPart) return email;
  return localPart
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

const NAV_ITEMS = [
  { href: "/app/projects", label: "My projects", icon: Folder },
  { href: "/app/payments", label: "Payments", icon: CreditCard },
  { href: "/app/account", label: "Account", icon: Gear },
];

export function ClientAreaShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      <aside className="flex w-56 shrink-0 flex-col overflow-y-auto border-r bg-sidebar p-4">
        <div className="flex flex-col items-center gap-2 px-2 py-3 text-center">
          <Image src="/brand/logo-mark.svg" alt="Grillz Geeks" width={96} height={78} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">
              {displayNameFromEmail(email)}
            </p>
            <p className="truncate text-xs text-muted-foreground leading-tight">{email}</p>
          </div>
        </div>

        <Separator className="my-3" />

        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-2">
          <SignOutButton variant="ghost" className="w-full justify-start" />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
