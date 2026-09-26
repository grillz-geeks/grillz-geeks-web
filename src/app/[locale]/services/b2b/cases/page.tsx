import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export async function generateMetadata() {
  const t = await getTranslations("ServicesB2BCasesPage");
  return { title: t("title") };
}

export default async function Page() {
  const t = await getTranslations("ServicesB2BCasesPage");
  return <PlaceholderPage path="/services/b2b/cases" title={t("title")} />;
}
