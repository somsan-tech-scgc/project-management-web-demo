import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

type DecisionType = "approve" | "reject" | "conditional";

export const GateDecision = () => {
  const [decision, setDecision] = useState<DecisionType>("approve");

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4 text-foreground">
        Gate Decision
      </h2>

      <RadioGroup
        value={decision}
        onValueChange={(value) => setDecision(value as DecisionType)}
      >
        <div className="space-y-3">
          <div
            className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors ${
              decision === "approve"
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
          >
            <RadioGroupItem value="approve" id="approve" className="mt-0.5" />
            <div className="flex-1">
              <Label
                htmlFor="approve"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Approve Gate
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                All criteria met, proceed to next gate
              </p>
            </div>
          </div>

          <div
            className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors ${
              decision === "reject"
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
          >
            <RadioGroupItem value="reject" id="reject" className="mt-0.5" />
            <div className="flex-1">
              <Label
                htmlFor="reject"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Reject Gate
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Criteria not met, revisions required
              </p>
            </div>
          </div>

          <div
            className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors ${
              decision === "conditional"
                ? "border-primary bg-primary/5"
                : "border-border"
            }`}
          >
            <RadioGroupItem
              value="conditional"
              id="conditional"
              className="mt-0.5"
            />
            <div className="flex-1">
              <Label
                htmlFor="conditional"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Conditional Approval
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Proceed with conditions, follow-up required
              </p>
            </div>
          </div>
        </div>
      </RadioGroup>

      {decision === "conditional" && (
        <div className="mt-6">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Conditions (if applicable)
          </label>
          <Textarea
            placeholder="Specify conditions for approval"
            className="min-h-[80px] resize-none"
          />
        </div>
      )}

     
    </div>
  );
};

export default GateDecision;
