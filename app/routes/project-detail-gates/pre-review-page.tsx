import { DocumentTable } from "./document-table";
import { GateChecklist } from "./gate-checklist";
import { GateDecision } from "./gate-decision";

export default function PrePreviewPage() {
  let gateNo = 3;
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Review Session: Gate {gateNo} - Document Submission
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
      </div>
    </div>
  );
}
