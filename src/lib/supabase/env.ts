/**
 * Enquanto o Supabase não está configurado (faltam as variáveis de
 * ambiente), as páginas de login/criar conta/recuperar senha mostram um
 * aviso simples em vez de dar erro. Assim que as variáveis existirem
 * (localmente no .env.local, ou na Vercel em produção), tudo passa a
 * funcionar normalmente, sem precisar mudar nenhum código.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
