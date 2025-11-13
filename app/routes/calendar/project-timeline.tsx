import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ProjectData = {
  projectName: string;
  comPhase: string;
  buName: string;
  pmName: string;
  timeline: Record<string, string>;
};

export const ProjectTimeline = () => {
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

  const projects: ProjectData[] = [
    {
      projectName: "TPC_VCM2_Change material DA1201 to Ti",
      comPhase: "71 Close-out",
      buName: "Vinyl & MRR Plant Improvement and Modification",
      pmName: "Santipong",
      timeline: { "Aug 25\nW3-4": "G6" },
    },
    {
      projectName: "TPC_VCM2_Fabrication New Design EA1605A&B",
      comPhase: "71 Close-out",
      buName: "Vinyl & MRR Plant Improvement and Modification",
      pmName: "Santipong",
      timeline: { "Aug 25\nW3-4": "G6" },
    },
    {
      projectName: "MTT_Spill Protection for TK401C",
      comPhase: "31 Execution",
      buName: "Vinyl & MRR Plant Improvement and Modification",
      pmName: "Thana",
      timeline: {
        "Mar 25\nW1-2": "G4",
        "Aug 25\nW3-4": "G6",
        "Sep 25\nW1-2": "G5",
      },
    },
    {
      projectName:
        "TPC_BTF_Install Interlock Valve Overfill Protection EDC Tank",
      comPhase: "31 Execution",
      buName: "Vinyl & MRR Plant Improvement and Modification",
      pmName: "Santipong",
      timeline: {
        "Sep 25\nW1-2": "G4",
        "Nov 25\nW1-2": "G5",
        "Mar 26\nW1-2": "G6",
      },
    },
    {
      projectName: "TPC_BTF_Install N2 and vent line to Gas Sampling",
      comPhase: "31 Execution",
      buName: "Vinyl & MRR Plant Improvement and Modification",
      pmName: "Santipong",
      timeline: {
        "Sep 25\nW1-2": "G4",
        "Nov 25\nW1-2": "G5",
        "Mar 26\nW1-2": "G6",
      },
    },
    {
      projectName: "TPC_BTF_Resizing VOC Compressor GBB31B",
      comPhase: "31 Execution",
      buName: "Vinyl & MRR Plant Improvement and Modification",
      pmName: "Santipong",
      timeline: {
        "Sep 25\nW1-2": "G4",
        "Nov 25\nW1-2": "G5",
        "Mar 26\nW1-2": "G6",
      },
    },
    {
      projectName: "TPC_Level ATG EDC Tank at BTF",
      comPhase: "31 Execution",
      buName: "Vinyl & MRR Plant Improvement and Modification",
      pmName: "Santipong",
      timeline: {
        "Sep 25\nW1-2": "G4",
        "Nov 25\nW1-2": "G5",
        "Mar 26\nW1-2": "G6",
      },
    },
    {
      projectName: "TPC_VCM Tank Overfill Protection at BTF",
      comPhase: "31 Execution",
      buName: "Vinyl & MRR Plant Improvement and Modification",
      pmName: "Santipong",
      timeline: {
        "Sep 25\nW1-2": "G4",
        "Nov 25\nW1-2": "G5",
        "Mar 26\nW1-2": "G6",
      },
    },
    {
      projectName: "MTT_HAZOP Improvement Project Phase#1",
      comPhase: "31 Execution",
      buName: "Vinyl & MRR Plant Improvement and Modification",
      pmName: "Wanlop",
      timeline: {
        "Jul 25\nW1-2": "G3",
        "Sep 25\nW3-4": "G4",
        "Dec 25\nW1-2": "G5",
        "Feb 26\nW1-2": "G6",
      },
    },
    {
      projectName: "AGC_RCA-5 Pipeline",
      comPhase: "31 Execution",
      buName: "Vinyl & MRR Project Management",
      pmName: "Santipong",
      timeline: {},
    },
    {
      projectName: "C1 E-2763 Switching HS to LS (Execute)",
      comPhase: "31 Execution",
      buName: "Polyolefins Plant Improvement and Modification",
      pmName: "",
      timeline: {},
    },
  ];

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
            {timelineHeaders.map((_, index) => (
              <TableCell
                key={index}
                className="border border-table-border bg-muted/30"
              ></TableCell>
            ))}
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
