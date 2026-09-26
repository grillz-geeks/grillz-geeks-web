import type { ReactNode } from "react";

/**
 * Layout simples e neutro (sem identidade visual definitiva) para as
 * páginas de login, criar conta e recuperação de senha.
 */
export function AuthShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {children}
      </div>
    </main>
  );
}
