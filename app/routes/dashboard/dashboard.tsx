import { useState } from "react";
import { Search, Filter, Grid3x3, LayoutList } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Header } from "./header";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ProjectCard } from "./project-card";
import { Link } from "react-router";

const projects = [
  {
    code: "ALP-001",
    name: "Project Alpha",
    budget: 85000000,
    progress: 40,
    currentStep: 4,
    totalSteps: 10,
    startDate: "May 01, 2025",
    endDate: "Apr 30, 2026",
    nextReview: "Oct 10, 2025",
    gateStatus: "Gate 4 - Development",
  },
  {
    code: "BET-002",
    name: "Project Beta",
    budget: 812000000,
    progress: 25,
    currentStep: 2,
    totalSteps: 8,
    startDate: "Jul 01, 2025",
    endDate: "Dec 31, 2026",
    nextReview: "Sep 30, 2025",
    gateStatus: "Gate 2 - Feasibility",
  },
  {
    code: "GAM-003",
    name: "Project Gamma",
    budget: 82500000,
    progress: 78,
    currentStep: 7,
    totalSteps: 9,
    startDate: "Mar 15, 2025",
    endDate: "Dec 31, 2025",
    nextReview: "Oct 05, 2025",
    gateStatus: "Gate 7 - Post-Implementation",
  },
  {
    code: "DEL-004",
    name: "Project Delta",
    budget: 87500000,
    progress: 8,
    currentStep: 1,
    totalSteps: 12,
    startDate: "Aug 01, 2025",
    endDate: "Jan 31, 2027",
    nextReview: "Oct 01, 2025",
    gateStatus: "Gate 1 - Concept",
  },
  {
    code: "OME-005",
    name: "Project Omega",
    budget: 830000000,
    progress: 100,
    currentStep: 10,
    totalSteps: 10,
    startDate: "Nov 01, 2024",
    endDate: "Oct 31, 2026",
    nextReview: "Oct 01, 2025",
    gateStatus: "Gate 7 - Post-Implementation",
  },
  {
    code: "SIG-006",
    name: "Project Sigma",
    budget: 8980000,
    progress: 50,
    currentStep: 3,
    totalSteps: 6,
    startDate: "Feb 01, 2025",
    endDate: "Oct 30, 2025",
    nextReview: "Sep 28, 2025",
    gateStatus: "Gate 3 - Design",
  },
];

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-1">Portfolio Dashboard</h2>
            <p className="text-muted-foreground">Welcome back,</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-10" />
          </div>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>

          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="concept">Concept</SelectItem>
              <SelectItem value="feasibility">Feasibility</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="post-implementation">
                Post-Implementation
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-8 w-8"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {projects.map((project) => (
            <Link
              key={project.code}
              to={`/projects/${project.code}`}
              style={{ textDecoration: "none" }}
            >
              <ProjectCard {...project} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
