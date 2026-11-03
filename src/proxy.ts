import { createServerClient } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { isSupabaseConfigured } from "./lib/supabase/env";

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // A plataforma (/app/... e /admin/...) não faz parte do site com
  // idioma en/pt — ela é sempre em inglês, e troca de idioma é feita
  // pelo Google Tradutor (ver src/lib/google-translate.ts), não por
  // URL. Por isso pulamos a lógica de idioma do next-intl aqui.
  const isPlatformRoute =
    request.nextUrl.pathname.startsWith("/app") ||
    request.nextUrl.pathname.startsWith("/admin");
  const response = isPlatformRoute
    ? NextResponse.next()
    : handleI18nRouting(request);

  // Enquanto o Supabase não estiver configurado, o site continua
  // funcionando normalmente — só não renova sessão de login nenhuma.
  if (!isSupabaseConfigured()) {
    return response;
  }

  // Mantém a sessão de quem está logado sempre atualizada (renovando o
  // login automaticamente nos bastidores, sem a pessoa perceber).
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  // Roda em todas as rotas, exceto arquivos internos do Next.js,
  // arquivos estáticos (public/), a pasta de API (quando existir) e
  // /auth/confirm (link de email do Supabase, fica fora do [locale] de propósito).
  // /app continua passando por aqui (precisa da renovação de sessão),
  // só não passa pela parte de idioma — ver isPlatformRoute acima.
  matcher: ["/((?!api|auth|_next|.*\\..*).*)"],
};
