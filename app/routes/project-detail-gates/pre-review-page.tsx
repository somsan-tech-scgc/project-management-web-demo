import { Link, useParams } from "react-router";
import { DocumentTable } from "./document-table";
import { GateChecklist } from "./gate-checklist";
import { GateDecision } from "./gate-decision";
import { useProjectDetail } from "@/hooks/use-project-detail";
import { Button } from "@/components/ui/button";
import { requiredAuthLoader } from "@/loaders/required-auth-loader";
import { buildToastLocationState } from "@/lib/utils";
import { DefaultHydrateFallback } from "@/components/default-hydrate-fallback";

export const clientLoader = requiredAuthLoader;

export const HydrateFallback = DefaultHydrateFallback;

export default function PrePreviewPage() {
  const { id } = useParams();
  const projectQuery = useProjectDetail(id);
  const project = projectQuery.data;
  let gateNo = project?.projectDetail.gateLevel;

  if (projectQuery.isLoading || !project) return <HydrateFallback />;

  if (projectQuery.isError)
    return <div>Error: {(projectQuery.error as Error).message}</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Review Session: Gate {project.projectDetail.gateLevel} -{" "}
          {project.gateSteps[gateNo].name}
        </h1>
        <p className="text-muted-foreground">
          Review the submitted documents and complete the checklist to make a
          gate decision.
        </p>
      </div>
      <div className="space-y-6">
        <DocumentTable />
        <GateChecklist />
        <GateDecision />

        <div className="flex gap-3 mt-6 justify-end">
          <Link to={`/projects/${id}`} prefetch="viewport">
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Link
            to={`/projects/${id}`}
            state={buildToastLocationState("Gate submitted successfully", "success")}
            prefetch="viewport"
          >
            <Button className="flex-1">Submit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
