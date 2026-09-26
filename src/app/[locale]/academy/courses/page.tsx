import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export async function generateMetadata() {
  const t = await getTranslations("AcademyCoursesPage");
  return { title: t("title") };
}

export default async function Page() {
  const t = await getTranslations("AcademyCoursesPage");
  return <PlaceholderPage path="/academy/courses" title={t("title")} />;
}
