import { useState } from "react";

import {
  ArrowLeft,
  Bell,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Upload,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { $api, type Schema } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";

type Project = Schema['UpdateProjectRequest'];

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const projectQuery = $api.useQuery(
    "get",
    "/committee-workflow/project/{projectId}",
    {
      params: {
        path: {
          // @ts-expect-error
          projectId: id,
        },
      },
    },
    {
      select(data) {
        // @ts-expect-error
        return data?.data! as Project
      },
    }
  );

  const project = projectQuery.data! as Project;

  const getStatusIcon = (status: string) => {
    if (status === "Completed")
      return <CheckCircle2 className="h-5 w-5 text-status-green" />;
    if (status === "In Progress")
      return <Clock className="h-5 w-5 text-primary" />;
    return <Circle className="h-5 w-5 text-muted-foreground" />;
  };

  const getStatusBadge = (status: string) => {
    if (status === "Approved")
      return (
        <Badge className="bg-status-green-foreground text-status-green border-0">
          Approved
        </Badge>
      );
    if (status === "Pending")
      return (
        <Badge className="bg-status-amber-foreground text-status-amber border-0">
          Pending
        </Badge>
      );
    return <Badge variant="secondary">{status}</Badge>;
  };

  if (projectQuery.isLoading) return <div>Loading...</div>;

  if (projectQuery.isError) return <div>Error: {(projectQuery.error as Error).message}</div>;

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
                {/* @ts-expect-error */}
                Project: {project?.projectDetail?.stageGateName}
              </h1>
              <p className="text-sm text-muted-foreground">
                Managed by: {project?.ownerUserId} · Last updated:{" "}
                {formatDate(new Date())}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload documents
              </Button>
              <Button className="gap-2">
                <Calendar className="h-4 w-4" />
                Schedule review
              </Button>
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
                      {50}% Complete
                    </span>
                  </div>
                  {/* @ts-expect-error */}
                  <Progress value={project?.projectDetail?.gateLevel ?? 1} className="h-2" />
                </div>

                <h3 className="font-semibold mb-4">Gates</h3>
                <div className="space-y-4">
                  {project?.gates?.map((gate) => (
                    <div key={gate.id} className="flex items-start gap-3">
                      {getStatusIcon(gate.status)}
                      <div>
                        <p className="font-medium">{gate.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {gate.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gate Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Gate 2: Planning</h2>
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

            {/* Activity Feed */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
                <div className="space-y-4">
                  {project?.activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {activity.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviewer Decisions */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Reviewer Decisions
                </h2>
                <div className="space-y-4">
                  {project?.reviewers?.map((reviewer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {reviewer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{reviewer.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {reviewer.role}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(reviewer.decision)}
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
                          <p className="text-sm font-medium">
                          {doc.name}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {doc.checkListText}
                          </span>
                        </TableCell>
                        
                        <TableCell>{getStatusBadge(doc.status)}</TableCell>
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
                  {project?.checklist?.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <Checkbox
                        id={`task-${item.id}`}
                        checked={item.completed}
                      />
                      <label
                        htmlFor={`task-${item.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.task}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
