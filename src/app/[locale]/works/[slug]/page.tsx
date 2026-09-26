import { getTranslations } from "next-intl/server";
import { PlaceholderPage } from "@/components/placeholder-page";

export async function generateMetadata() {
  const t = await getTranslations("WorkDetailPage");
  return { title: t("title") };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("WorkDetailPage");
  return <PlaceholderPage path={`/works/${slug}`} title={t("title")} />;
}
