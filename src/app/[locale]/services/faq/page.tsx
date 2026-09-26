import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export async function generateMetadata() {
  const t = await getTranslations("ServicesFaqPage");
  return { title: t("title") };
}

export default async function Page() {
  const t = await getTranslations("ServicesFaqPage");
  return <PlaceholderPage path="/services/faq" title={t("title")} />;
}
