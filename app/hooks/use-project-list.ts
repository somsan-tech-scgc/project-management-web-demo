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
