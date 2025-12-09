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
      // enabled: !!projectId,
      enabled: false,
      initialData: {
        "code": "000",
        "description": "Success",
        "data": {
          "projectDetail": {
            "projectId": projectId,
            "stageGateName": "Project Alpha",
            "status": 1,
            "gateLevel": 1
          },
          "gateSteps": [
            {
              "id": 1,
              "projectDetailId": 3,
              "name": "Inquiry/Project Screening",
              "status": 3,
              "updatedAt": "2025-10-08T06:59:03"
            },
            {
              "id": 2,
              "projectDetailId": 3,
              "name": "Proposal, Estimation & Planning",
              "status": 2,
              "updatedAt": "2025-10-08T06:59:03"
            },
            {
              "id": 3,
              "projectDetailId": 3,
              "name": "Contract/Commercial Review",
              "status": 1,
              "updatedAt": "2025-10-08T06:59:03"
            },
            {
              "id": 4,
              "projectDetailId": 3,
              "name": "Project Initiation/Startup/Planning",
              "status": 1,
              "updatedAt": "2025-10-08T06:59:03"
            },
            {
              "id": 5,
              "projectDetailId": 3,
              "name": "EPC Execution",
              "status": 1,
              "updatedAt": "2025-10-08T06:59:03"
            },
            {
              "id": 6,
              "projectDetailId": 3,
              "name": "Project Closing",
              "status": 1,
              "updatedAt": "2025-10-08T06:59:03"
            }
          ],
          "documents": [
            {
              "id": 1,
              "name": "Progress reports, Gantt charts",
              "status": 2,
              "submittedAt": "2024-01-15",
              "updatedAt": "2025-10-07T16:20:55"
            },
            {
              "id": 2,
              "name": "QAVQC audit reports",
              "status": 2,
              "submittedAt": "2024-01-15",
              "updatedAt": "2025-10-07T16:21:44"
            },
            {
              "id": 3,
              "name": "QAVQC audit reports",
              "status": 2,
              "submittedAt": "2024-01-15",
              "updatedAt": "2025-10-07T16:21:44"
            },
            {
              "id": 4,
              "name": "Financial performance report",
              "status": 1,
              "submittedAt": "2024-01-15",
              "updatedAt": "2025-10-07T16:21:44"
            }
          ],
          "activities": [
            {
              "id": 1,
              "projectDetailId": 3,
              "detail": "Document Submitted",
              "createdDate": "2024-01-15T00:00:00"
            },
            {
              "id": 2,
              "projectDetailId": 3,
              "detail": "Pre-Review Started",
              "createdDate": "2024-01-16T00:00:00"
            },
            {
              "id": 3,
              "projectDetailId": 3,
              "detail": "Checklist Updated",
              "createdDate": "2024-01-16T00:00:00"
            }
          ],
          "committee": [
            {
              "id": 2,
              "projectDetailId": 3,
              "userId": 1,
              "fullName": "Sarun Maksuanpan",
              "status": 1,
              "updatedAt": "2025-10-08T07:25:02"
            }
          ]
        }
      },
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
