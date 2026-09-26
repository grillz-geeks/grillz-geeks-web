import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Roda em todas as rotas, exceto arquivos internos do Next.js,
  // arquivos estáticos (public/) e a pasta de API (quando existir).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
