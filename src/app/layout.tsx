import { Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Layout raiz de verdade — é ele quem define <html>/<body>, porque
 * agora o site tem duas áreas com regras de idioma diferentes:
 *
 * - src/app/[locale]/...  → site público, inglês/português feitos à
 *   mão com next-intl (ver src/i18n/).
 * - src/app/app/...       → plataforma logada (Área do cliente/
 *   administrativa), sempre em inglês, com o idioma trocável via
 *   Google Tradutor em Dados da conta (ver src/lib/google-translate.ts).
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
