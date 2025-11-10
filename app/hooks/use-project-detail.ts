import { $api } from "@/api/client";

export type ProjectDetailResponse = {
  readonly code: string;
  readonly description: string;
  readonly data: {
    readonly projectDetail: {
      readonly projectID: number;
      readonly stageGateName: string;
      readonly status: number;
      readonly gateLevel: number;
    };

    readonly gateSteps: {
      readonly id: number;
      readonly name: string;
      readonly status: number;
    }[];
    readonly documents: Document[];
    readonly activities: any[];
    readonly committee: any[];
  };
};

export type Document = {
  readonly id: number;
  readonly name: string;
  readonly status: number;
  readonly submittedAt: Date;
  readonly checkListText: string;
  readonly updatedAt: Date;
};

export function useProjectDetail(projectId?: number | string) {
  const projectDetailQuery = $api.useQuery(
    "get",
    "/committee-workflow/project/{projectId}",
    {
      params: {
        path: {
          // @ts-expect-error
          projectId: projectId!,
        },
      },
    },
    {
      enabled: !!projectId,
      select(data): ProjectDetailResponse["data"] {
        // @ts-expect-error
        return data?.data as unknown as ProjectDetailResponse["data"];
      },
    }
  );

  return {
    ...projectDetailQuery,
    data: projectDetailQuery.data as unknown as ProjectDetailResponse["data"],
  };
}
