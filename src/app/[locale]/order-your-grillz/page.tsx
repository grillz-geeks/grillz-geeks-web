import { getTranslations } from "next-intl/server";
import { ComingSoon } from "@/components/coming-soon";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export async function generateMetadata() {
  const t = await getTranslations("OrderYourGrillzPage");
  return { title: t("title") };
}

export default async function Page() {
  const t = await getTranslations("OrderYourGrillzPage");
  return (
    <ComingSoon tag={t("comingSoon")} title={t("title")} body={t("body")}>
      <Button
        variant="outline"
        size="lg"
        nativeButton={false}
        render={<Link href="/" />}
      >
        {t("backHome")}
      </Button>
    </ComingSoon>
  );
}
