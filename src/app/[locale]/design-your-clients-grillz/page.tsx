import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export async function generateMetadata() {
  const t = await getTranslations("DesignYourClientsGrillzPage");
  return { title: t("title") };
}

export default async function Page() {
  const t = await getTranslations("DesignYourClientsGrillzPage");
  return <PlaceholderPage path="/design-your-clients-grillz" title={t("title")} />;
}
