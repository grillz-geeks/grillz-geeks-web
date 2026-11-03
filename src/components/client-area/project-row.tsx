"use client";

import { CaretRight } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { ProjectStatusBadge } from "@/components/client-area/project-status-badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { MockProject } from "@/lib/mock/projects";

export function ProjectRow({ project }: { project: MockProject }) {
  const router = useRouter();

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => router.push(`/app/projects/${project.id}`)}
    >
      <TableCell className="px-4 py-2 font-medium">{project.name}</TableCell>
      <TableCell className="px-4 py-2">
        <ProjectStatusBadge status={project.status} />
      </TableCell>
      <TableCell className="px-4 py-2 text-muted-foreground">
        {project.updatedAt}
      </TableCell>
      <TableCell className="px-4 py-2 text-right">
        <CaretRight className="ml-auto size-4 text-muted-foreground" />
      </TableCell>
    </TableRow>
  );
}
