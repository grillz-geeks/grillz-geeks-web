import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export async function generateMetadata() {
  const t = await getTranslations("ServicesB2BCadPage");
  return { title: t("title") };
}

export default async function Page() {
  const t = await getTranslations("ServicesB2BCadPage");
  return <PlaceholderPage path="/services/b2b/cad" title={t("title")} />;
}
