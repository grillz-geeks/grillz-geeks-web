import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { HtmlLangSync } from "@/components/html-lang-sync";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Grillz Geeks",
  description: "Grillz Geeks",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <HtmlLangSync />
      {children}
    </NextIntlClientProvider>
  );
}
