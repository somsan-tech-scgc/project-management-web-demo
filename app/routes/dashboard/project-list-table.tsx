import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProjectListRow } from "@/hooks/use-project-list";
import { Link } from "react-router";
import { formatCurrency, formatDate, shouldShowNextReview } from "@/lib/utils";

export type ProjectListTableProps = {
  projects: ProjectListRow[];
};

export function ProjectListTable({ projects }: ProjectListTableProps) {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-white">
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Timeline</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Next Review</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                {project.code} - {project.name}
              </TableCell>
              <TableCell>{formatCurrency(project.budget ?? 0)}</TableCell>
              <TableCell>
                <time dateTime={project.startDate}>
                  {formatDate(new Date(project.startDate ?? ""))}
                </time>
                {" - "}
                <time dateTime={project.endDate}>
                  {formatDate(new Date(project.endDate ?? ""))}
                </time>
              </TableCell>
              <TableCell>{project.currentGateLevel}/{project.totalGate}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>
                {shouldShowNextReview(project.currentGateLevel)
                  ? formatDate(new Date((project as any).nextReviewDate ?? ""))
                  : "-"}
              </TableCell>
              <TableCell>
                <Link to={`/projects/${project.id}`}>
                  <Button>View</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
