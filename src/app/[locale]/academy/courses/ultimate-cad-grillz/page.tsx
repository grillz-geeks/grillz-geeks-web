import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export async function generateMetadata() {
  const t = await getTranslations("AcademyCourseUltimateCadPage");
  return { title: t("title") };
}

export default async function Page() {
  const t = await getTranslations("AcademyCourseUltimateCadPage");
  return <PlaceholderPage path="/academy/courses/ultimate-cad-grillz" title={t("title")} />;
}
