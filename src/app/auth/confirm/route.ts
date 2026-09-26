import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Página "invisível" para onde os links de email do Supabase apontam
 * (confirmação de cadastro e recuperação de senha). Ela confere o link e
 * manda a pessoa para o próximo passo.
 *
 * OBS: por enquanto sempre manda para o inglês (sem prefixo /pt), já que
 * o link de email não carrega a informação de idioma. Ajustar depois se
 * fizer falta.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      redirect(`${origin}${next}`);
    }
  }

  redirect(`${origin}/login`);
}
