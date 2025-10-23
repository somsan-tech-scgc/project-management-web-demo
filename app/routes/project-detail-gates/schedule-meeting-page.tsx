import { useState } from "react";
import { ChevronRight, Bell, Settings } from "lucide-react";
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
import { AttendeeCard } from "./attendee-card";
import { useNavigate } from "react-router";

export default function ScheduleMeetingPage() {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [project, setProject] = useState("");
  const [gate, setGate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const handleScheduleMeeting = () => {
    console.log("Scheduling meeting:", {
      meetingTitle,
      project,
      gate,
      startTime,
      endTime,
      location,
    });
    navigate(`/notifications`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <div className="h-5 w-5 bg-card rounded-full" />
            </div>
            <h1 className="text-xl font-bold text-foreground">ReviewFlow</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Reviews
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Reports
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              People
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <a href="#" className="hover:text-foreground transition-colors">
            Projects
          </a>
          <ChevronRight className="h-4 w-4" />
          <a href="#" className="hover:text-foreground transition-colors">
            Project Alpha
          </a>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Gate 1 Review</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Schedule Review Meeting
          </h2>
          <p className="text-muted-foreground">
            Define the meeting details for the Gate 1 review of Project Alpha.
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
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger id="project" className="bg-card">
                  <SelectValue placeholder="Project Alpha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alpha">Project Alpha</SelectItem>
                  <SelectItem value="beta">Project Beta</SelectItem>
                  <SelectItem value="gamma">Project Gamma</SelectItem>
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
            />
          </div>

          {/* Attendees */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Attendees</h3>
            <div className="space-y-3">
              <AttendeeCard
                name="Review Committee A"
                role="Committee"
                type="committee"
              />
              <AttendeeCard
                name="Ethan Carter"
                role="Project Manager"
                type="manager"
              />
              <AttendeeCard name="Vendor X" role="Vendor" type="vendor" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleScheduleMeeting} className="px-8" size="lg">
              Schedule Meeting
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
