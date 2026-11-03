import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ProjectStatusBadge } from "@/components/client-area/project-status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@/i18n/navigation";
import { mockProjects } from "@/lib/mock/projects";

export async function generateMetadata() {
  const t = await getTranslations("ClientArea.Projects");
  return { title: t("title") };
}

export default async function ClientProjectsPage() {
  const t = await getTranslations("ClientArea.Projects");

  return (
    <div className="space-y-6 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button
          nativeButton={false}
          render={
            <Link href="/app/projects/new">
              <Plus className="size-4" />
              {t("newProject")}
            </Link>
          }
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("tableProject")}</TableHead>
                <TableHead>{t("tableStatus")}</TableHead>
                <TableHead>{t("tableUpdated")}</TableHead>
                <TableHead className="text-right">{t("viewDetails")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <ProjectStatusBadge status={project.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.updatedAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      nativeButton={false}
                      variant="ghost"
                      size="sm"
                      render={
                        <Link href={`/app/projects/${project.id}`}>
                          {t("viewDetails")}
                        </Link>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
