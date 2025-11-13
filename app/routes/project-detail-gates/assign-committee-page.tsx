import { useState } from "react";
import { CommitteeTable } from "./committee-table";
import { ProjectDetailsSidebar } from "./project-details-sidebar";
import { Link } from "react-router";
// import DateRangePicker from "@/components/DateRangePicker";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { useProjectDetail } from "@/hooks/use-project-detail";
import { requiredAuthLoader } from "@/loaders/required-auth-loader";

export const clientLoader = requiredAuthLoader;

export const HydrateFallback = () => {
  return <div>Loading...</div>;
};

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  department: string;
  availability: "Available" | "Busy" | "Conflicts";
}

export default function AssignCommitteePage() {
  const { id } = useParams();
  const projectQuery = useProjectDetail(id);
  const project = projectQuery.data;

  if (projectQuery.isLoading || !project) return <HydrateFallback />;

  if (projectQuery.isError)
    return <div>Error: {(projectQuery.error as Error).message}</div>;

  const [selectedMembers, setSelectedMembers] = useState<string[]>([
    "2",
    "4",
    "6",
  ]);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 6, 5),
    to: new Date(2024, 7, 7),
  });

  const committeeMembers: CommitteeMember[] = [
    {
      id: "1",
      name: "Dr. Eleanor Vance",
      role: "Committee Member",
      department: "Architecture",
      availability: "Available",
    },
    {
      id: "2",
      name: "Mr. Charles Bennett",
      role: "Committee Member",
      department: "Engineering",
      availability: "Available",
    },
    {
      id: "3",
      name: "Ms. Olivia Carter",
      role: "Committee Member",
      department: "Urban Planning",
      availability: "Busy",
    },
    {
      id: "4",
      name: "Mr. Ethan Davis",
      role: "Committee Member",
      department: "Sustainability",
      availability: "Available",
    },
    {
      id: "5",
      name: "Dr. Sophia Evans",
      role: "Committee Member",
      department: "Finance",
      availability: "Busy",
    },
    {
      id: "6",
      name: "Dr. Eleanor Vance",
      role: "Committee Member",
      department: "Architecture",
      availability: "Available",
    },
  ];

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const selected = committeeMembers.filter((m) =>
    selectedMembers.includes(m.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Assign Committee Members to Gate Review
          </h1>
          <p className="text-muted-foreground">
            Project: Redwood Renovation, Gate: Design Approval
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CommitteeTable
              members={committeeMembers}
              selectedIds={selectedMembers}
              onToggle={toggleMember}
            />

            {/* <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            /> */}

            {/* <div className="flex justify-end">
              <Link to={`/projects/${id}/schedule-meeting`} prefetch="viewport">
                <Button size="lg">Propose Review Slots</Button>
              </Link>
            </div> */}
          </div>

          <div>
            <ProjectDetailsSidebar
              selectedMembers={selected}
              dateRange={dateRange}
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6 justify-end">
          <Link to={`/projects/${id}/pre-review`} prefetch="viewport">
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Link to={`/notifications`} prefetch="viewport">
            <Button className="flex-1">Submit</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
