import { NewProjectButton } from "@/components/client-area/new-project-button";
import { ProjectRow } from "@/components/client-area/project-row";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockProjects } from "@/lib/mock/projects";

export const metadata = { title: "My projects" };

export default function ClientProjectsPage() {
  return (
    <div className="space-y-6 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">My projects</h1>
          <p className="text-muted-foreground">
            Track your budget requests and projects in progress.
          </p>
        </div>
        <NewProjectButton label="New project" />
      </div>

      <Card className="p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-2">Project</TableHead>
                <TableHead className="px-4 py-2">Status</TableHead>
                <TableHead className="px-4 py-2">Last update</TableHead>
                <TableHead className="px-4 py-2" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProjects.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
