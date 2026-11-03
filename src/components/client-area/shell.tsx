"use client";

import { FolderKanban, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

function initialsFromEmail(email: string) {
  return email.slice(0, 2).toUpperCase();
}

export function ClientAreaShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const t = useTranslations("ClientArea");
  const pathname = usePathname();

  const navItems = [
    { href: "/app/projects", label: t("nav.projects"), icon: FolderKanban },
    { href: "/app/account", label: t("nav.account"), icon: Settings },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 shrink-0 flex-col border-r bg-sidebar p-4">
        <div className="flex items-center gap-2 px-2 py-3">
          <Image src="/brand/logo-mark.svg" alt="Grillz Geeks" width={40} height={32} />
          <div>
            <p className="text-sm font-semibold leading-tight">Grillz Geeks</p>
            <p className="text-xs text-muted-foreground leading-tight">{t("title")}</p>
          </div>
        </div>

        <Separator className="my-3" />

        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => {
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

        <Separator className="my-3" />

        <div className="flex items-center gap-2 px-2 py-1">
          <Avatar className="size-8">
            <AvatarFallback>{initialsFromEmail(email)}</AvatarFallback>
          </Avatar>
          <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{email}</p>
        </div>
        <div className="px-2 pt-2">
          <SignOutButton variant="ghost" className="w-full justify-start" />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
