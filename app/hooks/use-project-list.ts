import { $api } from "@/api/client";
import { shouldShowNextReview } from "@/lib/utils";
import { PROJECT_STATUS } from "@/constants/common";

export type ProjectListResponse = {
  readonly code: string;
  readonly description: string;
  readonly data: {
    readonly total?: number;
    readonly rows?: ProjectListRow[];
  };
};

export type ProjectListRow = {
  readonly id?: number;
  readonly code?: string;
  readonly name?: string;
  readonly department?: string;
  readonly budget?: number;
  readonly dueDate?: Date;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly gateGroupId?: number;
  readonly currentGateLevel?: number;
  readonly status?: number;
  readonly ownerUserId?: number;
  readonly totalGate?: number;
};

export function useProjectList() {
  const projectListQuery = $api.useQuery(
    "post",
    "/committee-workflow/project/list",
    {
      body: {
        pageIndex: 1,
        pageSize: 10,
        searchFilter: "",
        statusFilter: [],
      },
    },
    {
      enabled: false,
      initialData: {
        code: "000",
        description: "Success",
        data: {
          total: 3,
          rows: [
            {
              id: 14,
              code: "ALP-014",
              name: "Project 14",
              department: "Engineer",
              budget: 10000000.0,
              dueDate: "2026-04-30",
              startDate: "2025-05-01",
              endDate: "2026-04-30",
              gateGroupId: 1,
              currentGateLevel: 3,
              status: 1,
              ownerUserId: 1,
              totalGate: 6,
            },
            {
              id: 13,
              code: "ALP-013",
              name: "Project 13",
              department: "Engineer",
              budget: 15000000.0,
              dueDate: "2026-04-30",
              startDate: "2025-05-01",
              endDate: "2026-04-30",
              gateGroupId: 1,
              currentGateLevel: 2,
              status: 1,
              ownerUserId: 1,
              totalGate: 6,
            },
            {
              id: 12,
              code: "ALP-012",
              name: "Project 12",
              department: "Engineer",
              budget: 4000000.0,
              dueDate: "2026-04-30",
              startDate: "2025-05-01",
              endDate: "2026-04-30",
              gateGroupId: 1,
              currentGateLevel: 4,
              status: 1,
              ownerUserId: 1,
              totalGate: 6,
            },
            {
              id: 11,
              code: "ALP-011",
              name: "Project 11",
              department: "Engineer",
              budget: 5000000.0,
              dueDate: "2026-04-30",
              startDate: "2025-05-01",
              endDate: "2026-04-30",
              gateGroupId: 1,
              currentGateLevel: 5,
              status: 1,
              ownerUserId: 1,
              totalGate: 6,
            },
            {
              id: 10,
              code: "ALP-005",
              name: "Project 5",
              department: "Engineer",
              budget: 6000000.0,
              dueDate: "2026-04-30",
              startDate: "2025-05-01",
              endDate: "2026-04-30",
              gateGroupId: 1,
              currentGateLevel: 6,
              status: 1,
              ownerUserId: 1,
              totalGate: 6,
            },
            {
              id: 9,
              code: "ALP-004",
              name: "Project 4",
              department: "Engineer",
              budget: 7000000.0,
              dueDate: "2026-04-30",
              startDate: "2025-05-01",
              endDate: "2026-04-30",
              gateGroupId: 1,
              currentGateLevel: 6,
              status: 1,
              ownerUserId: 1,
              totalGate: 6,
            },
            {
              id: 8,
              code: "ALP-003",
              name: "Project 3",
              department: "Engineer",
              budget: 8000000.0,
              dueDate: "2026-04-30",
              startDate: "2025-05-01",
              endDate: "2026-04-30",
              gateGroupId: 1,
              currentGateLevel: 3,
              status: 1,
              ownerUserId: 1,
              totalGate: 6,
            },
            {
              id: 7,
              code: "ALP-002",
              name: "Project 2",
              department: "Engineer",
              budget: 9000000.0,
              dueDate: "2026-04-30",
              startDate: "2025-05-01",
              endDate: "2026-04-30",
              gateGroupId: 1,
              currentGateLevel: 1,
              status: 0,
              ownerUserId: 1,
              totalGate: 6,
            },
            {
              id: 6,
              code: "ALP-001",
              name: "Project 1",
              department: "Engineer",
              budget: 3000000.0,
              dueDate: "2026-04-30",
              startDate: "2025-05-01",
              endDate: "2026-04-30",
              gateGroupId: 1,
              currentGateLevel:2,
              status: 1,
              ownerUserId: 1,
              totalGate: 6,
            },
          ],
        },
      },
      // @ts-expect-error
      select(data: ProjectListResponse) {
        return data?.data;
      },
    }
  );

  const { data, ...rest } = projectListQuery;

  const rows = data?.rows ?? [];

  return {
    ...rest,
    data: {
      ...data,
      rows: rows.map((datum: ProjectListRow) => {
        const now = new Date();
        const nextReviewDate = shouldShowNextReview(datum.currentGateLevel)
          ? now.setMonth(now.getMonth() + 1)
          : null;

        return {
          ...datum,
          status: PROJECT_STATUS[datum.status],
          nextReviewDate,
        };
      }) as unknown as ProjectListResponse["data"],
    },
  };
}
