import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export async function generateMetadata() {
  const t = await getTranslations("CustomGrillzPage");
  return { title: t("title") };
}

export default async function Page() {
  const t = await getTranslations("CustomGrillzPage");
  return <PlaceholderPage path="/custom-grillz" title={t("title")} />;
}
