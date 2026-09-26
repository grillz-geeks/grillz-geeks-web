import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export async function generateMetadata() {
  const t = await getTranslations("ServicesB2CPage");
  return { title: t("title") };
}

export default async function Page() {
  const t = await getTranslations("ServicesB2CPage");
  return <PlaceholderPage path="/services/b2c" title={t("title")} />;
}
