import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export async function generateMetadata() {
  const t = await getTranslations("ServicesB2BHowItWorksPage");
  return { title: t("title") };
}

export default async function Page() {
  const t = await getTranslations("ServicesB2BHowItWorksPage");
  return <PlaceholderPage path="/services/b2b/how-it-works" title={t("title")} />;
}
