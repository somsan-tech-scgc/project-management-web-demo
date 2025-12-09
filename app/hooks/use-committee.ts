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
    enabled: false,
    initialData: {
      "code": "000",
      "description": "Success",
      "data": {
        "rows": [
          {
            "id": 1,
            "title": "Dr.",
            "firstName": "Sara",
            "lastName": "Chen",
            "department": "Engineering",
            "role": "Technical Lead"
          },
          {
            "id": 2,
            "title": "Mr.",
            "firstName": "James",
            "lastName": "Rodriguez",
            "department": "Finance",
            "role": "Senior Financial Analyst"
          },
          {
            "id": 3,
            "title": "Ms.",
            "firstName": "Priya",
            "lastName": "Sharma",
            "department": "Operations",
            "role": "Project Manager"
          },
          {
            "id": 4,
            "title": "Dr.",
            "firstName": "Michael",
            "lastName": "Thompson",
            "department": "Research & Development",
            "role": "R&D Director"
          },
          {
            "id": 5,
            "title": "Mrs.",
            "firstName": "Emily",
            "lastName": "Nakamura",
            "department": "Legal",
            "role": "Legal Counsel"
          },
          {
            "id": 6,
            "title": "Mr.",
            "firstName": "David",
            "lastName": "Okonkwo",
            "department": "Quality Assurance",
            "role": "QA Manager"
          },
          {
            "id": 7,
            "title": "Ms.",
            "firstName": "Anna",
            "lastName": "Bergström",
            "department": "Human Resources",
            "role": "HR Business Partner"
          },
          {
            "id": 8,
            "title": "Dr.",
            "firstName": "Rajesh",
            "lastName": "Patel",
            "department": "Engineering",
            "role": "Principal Engineer"
          }
        ]
      }
    },
    select(data: CommitteesResponse) {
      return data?.data?.rows;
    },
    
  });
  return {
    ...committeesQuery,
    data: committeesQuery.data as unknown as CommitteesResponse["data"]['rows'],
  };
}
