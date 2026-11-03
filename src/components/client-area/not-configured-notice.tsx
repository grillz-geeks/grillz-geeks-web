/**
 * Aparece no lugar das telas da plataforma enquanto o Supabase não
 * tem as variáveis de ambiente configuradas. Evita erro feio antes do
 * Supabase existir. A plataforma é sempre em inglês (ver
 * CLAUDE.md), por isso este texto não usa next-intl.
 */
export function PlatformNotConfiguredNotice() {
  return (
    <div className="max-w-sm rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
      <p className="font-medium">Login not available yet</p>
      <p className="mt-1">
        This page needs Supabase to be configured (project URL and key) before
        it works.
      </p>
    </div>
  );
}
