import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useProjectList,
  type ProjectListRow,
} from "@/hooks/use-project-list";

type ProjectData = {
  projectName: string;
  comPhase: string;
  buName: string;
  pmName: string;
  timeline: Record<string, string>;
};

export const ProjectTimeline = () => {
  const { data: projectListData } = useProjectList();

  const timelineHeaders = [
    "Mar 25\nW1-2",
    "Jul 25\nW1-2",
    "Jul 26\nW3-4",
    "Aug 25\nW3-4",
    "Sep 25\nW1-2",
    "Sep 25\nW3-4",
    "Oct 25\nW1-2",
    "Nov 25\nW1-2",
    "Dec 25\nW1-2",
    "Dec 25\nW3-4",
    "Jan 26\nW1-2",
    "Feb 26\nW1-2",
    "Feb 26\nW3-4",
    "Mar 26\nW1-2",
  ];

  // Mock timeline data - keep this for now
  const mockTimelines: Record<string, Record<string, string>> = {
    // Real projects from API
    "Project Eagle": {
      "Mar 25\nW1-2": "G3",
      "Jul 25\nW1-2": "G4",
      "Oct 25\nW1-2": "G5",
      "Jan 26\nW1-2": "G6",
    },
    "Project Titan": {
      "Jul 25\nW1-2": "G3",
      "Sep 25\nW3-4": "G4",
      "Dec 25\nW1-2": "G5",
      "Mar 26\nW1-2": "G6",
    },
    "Project Alpha": {
      "Aug 25\nW3-4": "G3",
      "Nov 25\nW1-2": "G4",
      "Jan 26\nW1-2": "G5",
      "Feb 26\nW3-4": "G6",
    },
    "Project Beta": {
      "Jul 26\nW3-4": "G3",
      "Sep 25\nW1-2": "G4",
      "Nov 25\nW1-2": "G5",
      "Feb 26\nW1-2": "G6",
    },
    "Project Gamma": {
      "Sep 25\nW1-2": "G3",
      "Oct 25\nW1-2": "G4",
      "Dec 25\nW3-4": "G5",
      "Feb 26\nW3-4": "G6",
    },
    "Project Delta": {
      "Aug 25\nW3-4": "G4",
      "Nov 25\nW1-2": "G5",
      "Feb 26\nW1-2": "G6",
    },
    "Project Sigma": {
      "Jul 25\nW1-2": "G3",
      "Oct 25\nW1-2": "G4",
      "Jan 26\nW1-2": "G5",
    },
    "Project Omega": {
      "Sep 25\nW3-4": "G3",
      "Dec 25\nW1-2": "G4",
      "Feb 26\nW1-2": "G5",
      "Mar 26\nW1-2": "G6",
    }
  };

  // Map real project data with mock timeline
  const projects: ProjectData[] =
    projectListData?.rows?.map((project: ProjectListRow) => ({
      projectName: project.name || "",
      comPhase: project.status || "",
      buName: project.department || "",
      pmName: "", // PM name not available in current API response
      timeline: mockTimelines[project.name || ""] || {},
    })) || [];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Project Timeline</h1>
        <p className="text-gray-600 mb-4">View the timeline of all projects.</p>
      </div>
      <Table className="border-collapse min-w-[1000px] bg-white">
        <TableHeader>
          <TableRow className="bg-table-header">
            <TableHead className="border border-table-border px-4 py-3 text-left text-sm font-semibold text-table-header-foreground whitespace-nowrap">
              Project Name
            </TableHead>
            <TableHead className="border border-table-border px-4 py-3 text-left text-sm font-semibold text-table-header-foreground whitespace-nowrap">
              Com Phase
            </TableHead>
            <TableHead className="border border-table-border px-4 py-3 text-left text-sm font-semibold text-table-header-foreground whitespace-nowrap">
              BUName
            </TableHead>
            <TableHead className="border border-table-border px-4 py-3 text-left text-sm font-semibold text-table-header-foreground whitespace-nowrap">
              PM Name
            </TableHead>
            {timelineHeaders.map((header, index) => (
              <TableHead
                key={index}
                className="border border-table-border px-3 py-3 text-center text-xs font-semibold text-table-header-foreground whitespace-pre-line"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-muted/30">
       
          </TableRow>
          {projects.map((project, projectIndex) => (
            <TableRow key={projectIndex} className="transition-colors">
              <TableCell className="border border-table-border px-4 py-3 text-sm">
                {project.projectName}
              </TableCell>
              <TableCell className="border border-table-border px-4 py-3 text-sm whitespace-nowrap">
                {project.comPhase}
              </TableCell>
              <TableCell className="border border-table-border px-4 py-3 text-sm">
                {project.buName}
              </TableCell>
              <TableCell className="border border-table-border px-4 py-3 text-sm">
                {project.pmName}
              </TableCell>
              {timelineHeaders.map((header, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className={`border border-table-border px-3 py-3 text-center text-sm font-medium ${
                    project.timeline[header] ? "bg-table-highlight" : ""
                  }`}
                >
                  {project.timeline[header] || ""}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
