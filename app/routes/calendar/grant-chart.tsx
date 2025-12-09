"use client";

import "@svar-ui/react-gantt/all.css";
import { Gantt, Willow, type ITask } from "@svar-ui/react-gantt";
import { useProjectList, type ProjectListRow } from "@/hooks/use-project-list";
import { DefaultHydrateFallback } from "@/components/default-hydrate-fallback";

export function GanttChart() {
  const { data: projectListData, isLoading } = useProjectList();
  if (isLoading) return <DefaultHydrateFallback />;
  if (!projectListData) return <div>No data</div>;

  const projects = projectListData.rows;
  //   const tasks: ITask[] = [
  //     {
  //       id: 20,
  //       text: "New Task",
  //       start: new Date(2024, 5, 11),
  //       end: new Date(2024, 6, 12),
  //       duration: 1,
  //       progress: 2,
  //       type: "task",
  //       lazy: false,
  //     },
  //     {
  //       id: 47,
  //       text: "[1] Master project",
  //       start: new Date(2024, 5, 12),
  //       end: new Date(2024, 7, 12),
  //       duration: 8,
  //       progress: 0,
  //       parent: 0,
  //       type: "summary",
  //     },
  //     {
  //       id: 22,
  //       text: "Task",
  //       start: new Date(2024, 7, 11),
  //       end: new Date(2024, 8, 12),
  //       duration: 8,
  //       progress: 0,
  //       parent: 47,
  //       type: "task",
  //     },
  //     {
  //       id: 21,
  //       text: "New Task 2",
  //       start: new Date(2024, 7, 10),
  //       end: new Date(2024, 8, 12),
  //       duration: 3,
  //       progress: 0,
  //       type: "task",
  //       lazy: false,
  //     },
  //   ];

  const tasks = projects.map((project: ProjectListRow) => ({
    id: project.id,
    text: project.name,
    start: new Date(project.startDate),
    end: new Date(project.endDate),
    duration: durationToDays(
      project.endDate
        ? new Date(project.endDate).getTime() -
            new Date(project.startDate).getTime()
        : 0
    ),
    progress: project.currentGateLevel
      ? project.currentGateLevel / (project.totalGate ?? 1)
      : 0,
    type: "task",
    lazy: true,
  }));

  const links = [{ id: 1, source: 20, target: 21, type: "e2e" }];

  const scales = [
    { unit: "month", step: 1, format: "MMMM yyy" },
    // { unit: "day", step: 1, format: "d" },
  ];

  return (
    <Willow>
      <Gantt
        tasks={tasks}
        links={links}
        scales={scales}
        columns={[
          {
            header: "Project Name",
            'id': 'text',
          },
          {
            header: "Start Date",
            'id': 'start',
          },
          {
            header: "End Date",
            'id': 'end',
          },
          {
            header: "Duration",
            'id': 'duration',
          }
        ]}
        readonly
      />
    </Willow>
  );
}

function durationToDays(duration: number) {
  return Math.ceil(duration / (1000 * 60 * 60 * 24));
}
