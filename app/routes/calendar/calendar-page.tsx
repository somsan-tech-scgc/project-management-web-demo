"use client";

import { Activity } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseAsStringLiteral, useQueryStates } from "nuqs";
import { ReviewCalendar } from "./review-calendar";
import { ProjectTimeline } from "./project-timeline";

const TAB_MODES = ["project-timeline", "review-calendar"] as const;
const TAB_MODE_LABELS = {
  [TAB_MODES[0]]: "Project Timeline",
  [TAB_MODES[1]]: "Review Calendar",
} as const;

const DEFAULT_VIEW_MODE = TAB_MODES[0];

export default function CalendarPage() {
  const [queryStates, setQueryStates] = useQueryStates(
    {
      mode: parseAsStringLiteral(TAB_MODES).withDefault(DEFAULT_VIEW_MODE),
    },
    { shallow: true }
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Tabs
        className="pb-3"
        defaultValue={queryStates.mode}
        onValueChange={(value) =>
          setQueryStates({ mode: value as (typeof TAB_MODES)[number] })
        }
      >
        <TabsList>
          {TAB_MODES.map((mode) => (
            <TabsTrigger key={mode} value={mode}>
              {TAB_MODE_LABELS[mode]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Activity mode={queryStates.mode === TAB_MODES[0] ? "visible" : "hidden"}>
        <ProjectTimeline />
      </Activity>
      <Activity mode={queryStates.mode === TAB_MODES[1] ? "visible" : "hidden"}>
        <ReviewCalendar />
      </Activity>
    </div>
  );
}
