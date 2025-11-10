import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { format } from "date-fns";

interface ProjectDetailsSidebarProps {
  selectedMembers: {}[];
  dateRange: { from: Date; to: Date };
}

export const ProjectDetailsSidebar = ({
  selectedMembers,
  dateRange,
}: ProjectDetailsSidebarProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Project Details
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Project Name</span>
            <span className="text-sm font-medium text-foreground">
              Redwood Renovation
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Gate</span>
            <span className="text-sm font-medium text-foreground">
              Design Approval
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Proposed Period
            </span>
            <span className="text-sm font-medium text-foreground">
              {format(dateRange.from, "MMM d")} -{" "}
              {format(dateRange.to, "MMM d, yyyy")}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Selected Members ({selectedMembers.length})
        </h2>
        <div className="space-y-4">
          {selectedMembers.map((member) => (
            <div key={member.id} className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {member.department}
                </p>
              </div>
              <Badge
                variant={
                  member.availability === "Available"
                    ? "success"
                    : member.availability === "Busy"
                      ? "warning"
                      : "destructive"
                }
                className="text-xs"
              >
                {member.availability}
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          {/* <Button variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button className="flex-1">Confirm Assignment</Button> */}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSidebar;
