import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export async function generateMetadata() {
  const t = await getTranslations("HomePage");
  return { title: t("title") };
}

export default async function Page() {
  const t = await getTranslations("HomePage");
  return <PlaceholderPage path="/" title={t("title")} />;
}
