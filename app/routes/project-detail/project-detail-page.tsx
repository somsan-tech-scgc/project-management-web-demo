import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useParams } from "react-router";
import { cn, formatDateTime, getProjectProgressPercentage } from "@/lib/utils";
import { GATE_STATUS } from "@/constants/common";
import { Timeline } from "./timeline";
import {
  useProjectDetail,
  type ProjectDetailResponse,
} from "@/hooks/use-project-detail";
import { useCommittees } from "@/hooks/use-committee";
import { requiredAuthLoader } from "@/loaders/required-auth-loader";
import type { Route } from "../../+types/root";
import { Spinner } from "@/components/ui/spinner";
import { DefaultHydrateFallback } from "@/components/default-hydrate-fallback";


export const meta: Route.MetaFunction = () => {
  return [
    { title: "Project Detail" },
  ];
};

export const clientLoader = requiredAuthLoader;

export const HydrateFallback = DefaultHydrateFallback;

export default function ProjectDetailPage() {
  const { id } = useParams();
  // const [activeTab, setActiveTab] = useState("overview");

  const projectQuery = useProjectDetail(id);

  const project =
    projectQuery.data! as unknown as ProjectDetailResponse["data"];

  const committeesQuery = useCommittees();
  const committees = committeesQuery.data! ?? [];

  const getStatusIcon = (status: string) => {
    if (status === "Completed")
      return <CheckCircle2 className="h-5 w-5 text-status-green" />;
    if (status === "In Progress")
      return <Clock className="h-5 w-5 text-primary" />;
    return <Circle className="h-5 w-5 text-muted-foreground" />;
  };

  const getStatusBadge = (status: keyof typeof GATE_STATUS) => {
    const statusValue = GATE_STATUS[status];
    return (
      <Badge
        className={cn({
          "bg-green-500 text-white border-0": statusValue === "Approved",
          "bg-amber-500 text-white border-0": statusValue === "Pending",
          "bg-gray-500 text-white border-0": statusValue === "In Progress",
        })}
      >
        {statusValue}
      </Badge>
    );
  };

  if (projectQuery.isLoading) return <Spinner />;

  if (projectQuery.isError)
    return <div>Error: {(projectQuery.error as Error).message}</div>;

  const progressPercentage =
    getProjectProgressPercentage(project?.gateSteps ?? []) ?? 0;

  const gateSteps = project?.gateSteps ?? [];
  const currentGateLevel = project?.projectDetail?.gateLevel;

  const currentGate = gateSteps[currentGateLevel];

  const lastUpdated = project?.activities?.at(-1)?.createdDate
    ? formatDateTime(new Date(project.activities.at(-1)?.createdDate))
    : "-";

  const mockCommittees = [
    {
      id: 1,
      title: "Mr.",
      firstName: "Sara",
      lastName: "Chen",
      role: "Engineer Manager",
    },
    {
      id: 1,
      title: "Mr.",
      firstName: "David",
      lastName: "Lee",
      role: "Engineer Manager",
    },
  ];
  return (
    <div>
      {/* Project Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {project?.projectDetail?.stageGateName}
              </h1>
              <p className="text-sm text-muted-foreground">
                Managed by: {committees?.[0]?.title}{" "}
                {committees?.[0]?.firstName} {committees?.[0]?.lastName} · Last
                updated: <span className="font-medium">{lastUpdated}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <Link to={`/projects/${id}/pre-review`}>
                <Button className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Review Gate
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          {/* <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>
          </Tabs> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Progress */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Project Progress</h2>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Timeline</span>
                    <span className="font-medium">
                      {progressPercentage}% Complete
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                <h3 className="font-semibold mb-4">Gates</h3>
                <div className="space-y-4">
                  {/* {gateSteps?.map((gate) => (
                    <div key={gate.id} className="flex items-start gap-3">
                      {getStatusIcon(gate.status)}
                      <div>
                        <p className="font-medium">{gate.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {GATE_STATUS[gate.status]}
                        </p>
                      </div>
                    </div>
                  ))} */}
                  <Timeline roadmapItems={gateSteps} />
                </div>
              </CardContent>
            </Card>

            {/* Gate Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Gate {currentGate?.id}: {currentGate?.name}
                </h2>
                <div className="space-y-4">
                  {project?.steps?.map((step) => (
                    <div key={step.id} className="flex items-start gap-3">
                      {getStatusIcon(step.status)}
                      <div>
                        <p className="font-medium">{step.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {step.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Documents */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Documents</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {project?.documents.map((doc, index) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">
                          {doc.name}
                        </TableCell>

                        <TableCell>
                          {getStatusBadge(doc.status as 1 | 2 | 3)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Checklist */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Checklist</h2>
                <div className="space-y-3">
                  {project?.documents?.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-3">
                      <Checkbox
                        id={`task-${doc.id}`}
                        // checked={item.completed}
                      />
                      <label
                        htmlFor={`task-${doc.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {doc.checkListText ?? doc.name}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
          {/* Activity Feed */}
          <Card className="col-span-1">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
              <div className="space-y-4">
                {project?.activities.map((activity, index) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {index + 1}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        {/* <span className="font-medium">{activity.user}</span>{" "} */}
                        {activity.detail}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(new Date(activity.createdDate))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviewer Decisions */}
          <Card className="flex-1 w-full">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Reviewer Decisions</h2>
              <div className="space-y-4">
                {mockCommittees?.map((committee, index) => (
                  <div
                    key={committee.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {committee.firstName}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {committee.title} {committee.firstName}{" "}
                          {committee.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {committee.role}
                        </p>
                      </div>
                    </div>
                    {index === 0 && getStatusBadge(3)}
                    {index === 1 && getStatusBadge(1)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
