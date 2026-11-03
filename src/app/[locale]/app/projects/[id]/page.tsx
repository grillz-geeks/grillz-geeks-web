import { ChevronLeft, Download } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProjectStatusBadge } from "@/components/client-area/project-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@/i18n/navigation";
import { getMockProject, mockProjects } from "@/lib/mock/projects";

export function generateStaticParams() {
  return mockProjects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getMockProject(id);
  return { title: project?.name ?? "Projeto" };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getMockProject(id);
  const t = await getTranslations("ClientArea.ProjectDetail");

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <Button
          nativeButton={false}
          variant="ghost"
          size="sm"
          className="-ml-2 gap-1"
          render={
            <Link href="/app/projects">
              <ChevronLeft className="size-4" />
              {t("backToList")}
            </Link>
          }
        />
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <ProjectStatusBadge status={project.status} />
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">{t("tabOverview")}</TabsTrigger>
          <TabsTrigger value="tasks">{t("tabTasks")}</TabsTrigger>
          <TabsTrigger value="documents">{t("tabDocuments")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("briefing")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{project.briefing}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("timeline")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {project.timeline.map((event, index) => (
                  <li key={event.date} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2 rounded-full bg-primary" />
                      {index < project.timeline.length - 1 && (
                        <div className="my-1 w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium">{event.label}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardContent className="pt-6">
              {project.tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("tasksEmpty")}</p>
              ) : (
                <ul className="space-y-3">
                  {project.tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-3"
                    >
                      <span className="text-sm">{task.label}</span>
                      <div className="flex gap-2">
                        <Button size="sm">{t("approve")}</Button>
                        <Button size="sm" variant="outline">
                          {t("requestChanges")}
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardContent className="pt-6">
              {project.documents.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("documentsEmpty")}</p>
              ) : (
                <ul className="divide-y">
                  {project.documents.map((doc, index) => (
                    <li key={doc.id}>
                      {index > 0 && <Separator />}
                      <div className="flex items-center justify-between py-3">
                        <span className="text-sm">{doc.name}</span>
                        <Button size="sm" variant="ghost" className="gap-1.5">
                          <Download className="size-4" />
                          {t("download")}
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
