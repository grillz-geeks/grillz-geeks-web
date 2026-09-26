import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export async function generateMetadata() {
  const t = await getTranslations("AcademyEnrollPage");
  return { title: t("title") };
}

export default async function Page() {
  const t = await getTranslations("AcademyEnrollPage");
  return <PlaceholderPage path="/academy/enroll" title={t("title")} />;
}
