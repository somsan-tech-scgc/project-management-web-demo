import { useState } from "react";
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
import { Link } from "react-router";
import { $api, type Schema } from "@/api/client";


const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const projectListQuery = $api.useQuery(
    "post",
    "/committee-workflow/project/list",
    {
      body: {
        pageIndex: 1,
        pageSize: 10,
        searchFilter: "",
        statusFilter: [],
      },
    },
    {
      select(data): {
        total: number;
        rows: Schema["CreateProjectRequest"][];
      } {
        return (
          data?.data ?? {
            total: 0,
            rows: [],
          }
        );
      },
    }
  );


  // $api.useQuery('get', '/committee-workflow/tag/list')
  // $api.useQuery('get', '/committee-workflow/category/list')

  

  const projects = projectListQuery.data?.rows ?? [];

  console.log(projects);

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
          {projects?.map((project) => (
            <Link
              key={project.code}
              to={`/projects/${project.id}`}
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
