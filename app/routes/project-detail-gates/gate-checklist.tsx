import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const GateChecklist = ({ gateLevel }: { gateLevel: number }) => {
  const [checks, setChecks] = useState({
    documents: false,
    quality: false,
    complete: false,
  });

  const handleCheckChange = (key: keyof typeof checks) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4 text-foreground">
        Gate {gateLevel} Checklist
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="documents"
            checked={checks.documents}
            onCheckedChange={() => handleCheckChange("documents")}
          />
          <label
            htmlFor="documents"
            className="text-sm text-foreground cursor-pointer"
          >
            All required documents submitted
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="quality"
            checked={checks.quality}
            onCheckedChange={() => handleCheckChange("quality")}
          />
          <label
            htmlFor="quality"
            className="text-sm text-foreground cursor-pointer"
          >
            Documents meet quality standards
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="complete"
            checked={checks.complete}
            onCheckedChange={() => handleCheckChange("complete")}
          />
          <label
            htmlFor="complete"
            className="text-sm text-foreground cursor-pointer"
          >
            Documents are complete and accurate
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-foreground mb-2 block">
          Comments
        </label>
        <Textarea
          placeholder="Enter your comments here"
          className="min-h-[100px] resize-none"
        />
      </div>

      <div className="flex gap-3">
        <Button variant="outline">Save Draft</Button>
        <Button>Submit Review</Button>
      </div>
    </div>
  );
};

export default GateChecklist;
