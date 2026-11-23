import { getTranslations } from "next-intl/server";
import { ComingSoon } from "@/components/coming-soon";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export async function generateMetadata() {
  const t = await getTranslations("HomePage");
  return { title: "Grillz Geeks", description: t("body") };
}

export default async function Page() {
  const t = await getTranslations("HomePage");
  return (
    <ComingSoon tag={t("comingSoon")} title="Grillz Geeks" body={t("body")}>
      <Button
        size="lg"
        nativeButton={false}
        render={<Link href="/order-your-grillz" />}
      >
        {t("orderCta")}
      </Button>
    </ComingSoon>
  );
}
