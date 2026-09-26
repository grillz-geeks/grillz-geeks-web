import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Versões de Link, redirect, usePathname e useRouter que já sabem lidar
 * com o idioma da URL (en sem prefixo, pt com /pt). Usar estas em vez das
 * versões padrão do Next.js em qualquer página/componente do site.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
