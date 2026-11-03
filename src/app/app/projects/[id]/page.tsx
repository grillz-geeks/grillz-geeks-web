import { notFound } from "next/navigation";
import { BackToProjectsLink } from "@/components/client-area/back-to-projects-link";
import { DocumentRow } from "@/components/client-area/document-row";
import { ProjectStatusBadge } from "@/components/client-area/project-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  return { title: project?.name ?? "Project" };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getMockProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <BackToProjectsLink label="Back to my projects" />
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <ProjectStatusBadge status={project.status} />
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Briefing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{project.briefing}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Timeline</CardTitle>
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

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              {project.tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No pending tasks for this project right now.
                </p>
              ) : (
                <ul className="space-y-3">
                  {project.tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-3"
                    >
                      <span className="text-sm">{task.label}</span>
                      <div className="flex gap-2">
                        <Button size="sm">Approve</Button>
                        <Button size="sm" variant="outline">
                          Request changes
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
                <p className="text-sm text-muted-foreground">
                  No documents released for download yet.
                </p>
              ) : (
                <ul className="divide-y">
                  {project.documents.map((doc) => (
                    <DocumentRow key={doc.id} name={doc.name} downloadLabel="Download" />
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
