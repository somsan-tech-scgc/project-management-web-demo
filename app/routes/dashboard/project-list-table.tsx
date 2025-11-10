import { Button } from "@/components/ui/button";
import type { ProjectListRow } from "@/hooks/use-project-list";
import { Link } from "react-router";
import { formatCurrency, formatDate, shouldShowNextReview } from "@/lib/utils";

export type ProjectListTableProps = {
  projects: ProjectListRow[];
};

export function ProjectListTable({ projects }: ProjectListTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Project</th>
          <th>Value</th>
          <th>Timeline</th>
          <th>Progress</th>
          <th>Status</th>
          <th>Next Review</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>
              {project.code} - {project.name}
            </td>
            <td>{formatCurrency(project.budget ?? 0)}</td>
            <td>
              <time dateTime={project.startDate}>
                {formatDate(new Date(project.startDate ?? ""))}
              </time>
              -
              <time dateTime={project.endDate}>
                {formatDate(new Date(project.endDate ?? ""))}
              </time>
            </td>
            <td>{project.currentGateLevel}/{project.totalGate}</td>
            <td>{project.status}</td>
            <td>
              {shouldShowNextReview(project.currentGateLevel)
                ? formatDate(new Date(project.nextReview ?? ""))
                : "-"}
            </td>
            <td>
              <Link to={`/projects/${project.id}`}>
                <Button>View</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
