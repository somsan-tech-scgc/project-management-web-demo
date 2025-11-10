import { $api } from "@/api/client";

export type CommitteesResponse = {
  readonly code: string;
  readonly description: string;
  readonly data: {
    readonly rows: {
      readonly id: number;
      readonly title: string;
      readonly firstName: string;
      readonly lastName: string;
      readonly department: string;
      readonly role: string;
    }[];
  };
}

export function useCommittees() {
  const committeesQuery = $api.useQuery("get", "/committee-workflow/user/committees", {}, {
    select(data: CommitteesResponse) {
      return data?.data?.rows;
    },
    
  });
  return {
    ...committeesQuery,
    data: committeesQuery.data as unknown as CommitteesResponse["data"]['rows'],
  };
}
