import { Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { $api, type Schema } from "@/api/client";
import { PROJECT_STATUS } from "@/constants/common";
import { formatCurrency, formatDate, shouldShowNextReview } from "@/lib/utils";
import {
  useProjectDetail,
  type ProjectDetailResponse,
} from "@/hooks/use-project-detail";
import { Link } from "react-router";
import type { ProjectListRow } from "@/hooks/use-project-list";

type Additional = {
  progress: number;
  currentStep: number;
  totalSteps: number;
  nextReview: string;
  onClick: () => void; // Add onClick pro
  gateStatus: string;
  href: string;
};

export type ProjectCardProps = ProjectListRow & Additional;

export function ProjectCard({
  id,
  code,
  name,
  budget,
  startDate,
  endDate,
  nextReview = new Date().toISOString(),
  department,
  currentGateLevel = 1,
  totalGate = 1,
  href
}: ProjectCardProps) {

  const progressPercentage =
    ((currentGateLevel ?? 0) / (totalGate ?? 0)) * 100 ?? 0;

  const projectDetailQuery = useProjectDetail(id);
  const projectDetail =
    projectDetailQuery.data as unknown as ProjectDetailResponse["data"];

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{code}</p>
            <h3 className="text-lg font-semibold mt-1">{name}</h3>
            <p className="text-xs text-muted-foreground">
              Department: {department}
            </p>
          </div>
          <Badge variant="default">
            Gate {currentGateLevel ?? ""} -{" "}
            {projectDetail?.gateSteps?.[currentGateLevel-1!]?.name ?? ""}
            {/* {PROJECT_STATUS[status]} */}
          </Badge>
        </div>

        <div>
          <p className="text-2xl font-bold">{formatCurrency(budget ?? 0)}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              Step {currentGateLevel}/{totalGate}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {formatDate(new Date(startDate ?? ""))} -{" "}
            {formatDate(new Date(endDate ?? ""))}
          </span>
        </div>

        {shouldShowNextReview(currentGateLevel) ? (
          <div className="pt-2 border-t">
            <p className="text-sm">
              <span className="text-muted-foreground">Next Review: </span>
              <span className="font-medium text-foreground">
                {formatDate(new Date(nextReview ?? ""))}
              </span>
            </p>
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link to={href} prefetch="viewport" className="w-full">
        <Button variant="outline" className="w-full gap-2">
          <Eye className="h-4 w-4" />
          View
        </Button>
        </Link>

      </CardFooter>
    </Card>
  );
}
