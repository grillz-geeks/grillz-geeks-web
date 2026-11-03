import { getTranslations } from "next-intl/server";
import { NewProjectForm } from "@/components/client-area/new-project-form";

export async function generateMetadata() {
  const t = await getTranslations("ClientArea.ProjectNew");
  return { title: t("title") };
}

export default async function NewProjectPage() {
  const t = await getTranslations("ClientArea.ProjectNew");

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>
      <NewProjectForm />
    </div>
  );
}
