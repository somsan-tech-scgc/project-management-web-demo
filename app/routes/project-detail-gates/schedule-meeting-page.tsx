import { useState } from "react";
import { ChevronRight, Bell, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { AttendeeCard } from "./attendee-card";
import { useNavigate } from "react-router";
import { buildToastLocationState } from "@/lib/utils";
import type { Route } from "../../+types/root";
import { useCommittees } from "@/hooks/use-committee";
import { Spinner } from "@/components/ui/spinner";
import { requiredAuthLoader } from "@/loaders/required-auth-loader";
import { useProjectList } from "@/hooks/use-project-list";
import { DefaultHydrateFallback } from "@/components/default-hydrate-fallback";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Schedule Meeting" },
  ];
};

export const clientLoader = requiredAuthLoader;

export const HydrateFallback = DefaultHydrateFallback;

export default function ScheduleMeetingPage() {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [project, setProject] = useState("");
  const [gate, setGate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCommittees, setSelectedCommittees] = useState<any[]>([]);
  const [addedCommittees, setAddedCommittees] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { data: committees, isLoading: isLoadingCommittees } = useCommittees();
  const { data: projectsQuery, isLoading: isLoadingProjects } = useProjectList();
  const projects = projectsQuery?.rows ?? [];
  const navigate = useNavigate();

  const toggleCommitteeSelection = (committee: any) => {
    setSelectedCommittees((prev) => {
      const isSelected = prev.some((c) => c.id === committee.id);
      if (isSelected) {
        return prev.filter((c) => c.id !== committee.id);
      }
      return [...prev, committee];
    });
  };

  const handleConfirmSelection = () => {
    setAddedCommittees(selectedCommittees);
    setIsDialogOpen(false);
  };

  const handleScheduleMeeting = () => {
    console.log("Scheduling meeting:", {
      meetingTitle,
      project,
      gate,
      startTime,
      endTime,
      location,
    });
    navigate(`/notifications`, {
      state: buildToastLocationState("Meeting scheduled successfully", "success")
    });
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      

      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Schedule Review Meeting
        </h2>
        <p className="text-muted-foreground">
          Define the meeting details for Project.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Meeting Title */}
        <div className="space-y-2">
          <Label htmlFor="meeting-title">Meeting Title</Label>
          <Input
            id="meeting-title"
            placeholder="e.g., Final Design Review"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            className="bg-card"
          />
        </div>

        {/* Project and Gate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select value={project} onValueChange={setProject} required>
              <SelectTrigger id="project" className="bg-card">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects?.map((project: any) => (
                  <SelectItem key={project.id} value={String(project.id)}>{project.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gate">Gate</Label>
            <Select value={gate} onValueChange={setGate}>
              <SelectTrigger id="gate" className="bg-card">
                <SelectValue placeholder="Gate 1 Review" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gate1">Gate 1 Review</SelectItem>
                <SelectItem value="gate2">Gate 2 Review</SelectItem>
                <SelectItem value="gate3">Gate 3 Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Start and End Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="start-time">Start Time</Label>
            <Input
              id="start-time"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="bg-card"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-time">End Time</Label>
            <Input
              id="end-time"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="bg-card"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location / Virtual Meeting Link</Label>
          <Input
            id="location"
            placeholder="e.g., https://meet.example.com/xyz-abc"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-card"
            type="url"
          />
        </div>

        {/* Attendees */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Committees</h3>
            <Dialog 
              open={isDialogOpen} 
              onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (open) {
                  setSelectedCommittees([...addedCommittees]);
                }
              }}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Manage Committees
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Select Committee Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pt-4">
                  {isLoadingCommittees ? (
                    <Spinner />
                  ) : committees?.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No committees found
                    </div>
                  ) : (
                    committees?.map((committee) => (
                      <AttendeeCard
                        key={committee.id}
                        name={`${committee.firstName} ${committee.lastName}`}
                        role={committee.role || committee.title}
                        type="committee"
                        selected={selectedCommittees.some(c => c.id === committee.id)}
                        onClick={() => toggleCommitteeSelection(committee)}
                      />
                    ))
                  )}
                </div>
                <DialogFooter>
                  <Button 
                    onClick={handleConfirmSelection}
                  >
                    Confirm Selection
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-3">
            {addedCommittees.map((committee, index) => (
               <AttendeeCard
                key={`added-${index}`}
                name={`${committee.firstName} ${committee.lastName}`}
                role={committee.role || committee.title}
                type="committee"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button onClick={handleScheduleMeeting} className="px-8" size="lg">
            Schedule
          </Button>
        </div>
      </div>
    </main>
  );
}
