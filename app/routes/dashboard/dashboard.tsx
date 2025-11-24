import { useState, Activity } from "react";
import { useQueryStates, parseAsStringEnum, parseAsStringLiteral } from "nuqs";
import { Search, Filter, Grid3x3, LayoutList } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "./header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./project-card";
import { useProjectList, type ProjectListRow } from "@/hooks/use-project-list";
import { requiredAuthLoader } from "@/loaders/required-auth-loader";
import { ProjectListTable } from "./project-list-table";
import { Spinner } from "@/components/ui/spinner";
import { DefaultHydrateFallback } from "@/components/default-hydrate-fallback";

export function meta() {
  return [{ title: "Dashboard" }];
}

const VIEW_MODE = ["grid", "list"] as const;

export const clientLoader = requiredAuthLoader;

export const HydrateFallback = DefaultHydrateFallback;

const Index = () => {
  const projectList = useProjectList();

  const [queryStates, setQueryStates] = useQueryStates({
    viewMode: parseAsStringLiteral(VIEW_MODE).withDefault(VIEW_MODE[0]),
  }, { shallow: true });


  // $api.useQuery('get', '/committee-workflow/tag/list')
  // $api.useQuery('get', '/committee-workflow/category/list')

  const projects = projectList.data?.rows ?? [];

  return (
    <div className="min-h-screen">
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
              variant={queryStates.viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setQueryStates({ viewMode: "grid" })}
              className="h-8 w-8"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={queryStates.viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setQueryStates({ viewMode: "list" })}
              className="h-8 w-8"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Activity mode={queryStates.viewMode === "grid" ? "visible" : "hidden"}>
          <ProjectGridView projects={projects} />
        </Activity>
        <Activity mode={queryStates.viewMode === "list" ? "visible" : "hidden"}>
          <ProjectListTable projects={projects} />
        </Activity>
      </main>
    </div>
  );
};

type ProjectGridViewProps = {
  projects: ProjectListRow[];
};

function ProjectGridView({ projects }: ProjectGridViewProps) {
  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
      {projects?.map((project) => (
        <ProjectCard
          key={project.code}
          {...project}
          href={`/projects/${project.id}`}
        />
      ))}
    </div>
  );
}

export default Index;
