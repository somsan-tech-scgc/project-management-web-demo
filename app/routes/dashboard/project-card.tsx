import { Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { Schema } from "@/api/client";
import { PROJECT_STATUS } from "@/constants/common";

type ProjectCardProps = Schema["CreateProjectRequest"] & {
  progress: number;
  currentStep: number;
  totalSteps: number;
  nextReview: string;
  onClick: () => void; // Add onClick pro
  gateStatus: string;
};

export function ProjectCard({
  code,
  name,
  budget,
  progress,
  currentStep,
  totalSteps,
  startDate,
  endDate,
  nextReview,
  gateStatus,
  onClick,
  status,
}: ProjectCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' ฿';
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{code}</p>
            <h3 className="text-lg font-semibold mt-1">{name}</h3>
          </div>
          <Badge
            variant="default"
            
          >
            {PROJECT_STATUS[status]}
          </Badge>
        </div>

        <div>
          <p className="text-2xl font-bold">{formatCurrency(budget ?? 0)}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              Step {currentStep}/{totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {startDate} - {endDate}
          </span>
        </div>

        {/* <div className="pt-2 border-t">
          <p className="text-sm">
            <span className="text-muted-foreground">Next Review: </span>
            <span className="font-medium text-foreground">{nextReview}</span>
          </p>
        </div> */}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button variant="outline" className="w-full gap-2" onClick={onClick}>
          <Eye className="h-4 w-4" />
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
