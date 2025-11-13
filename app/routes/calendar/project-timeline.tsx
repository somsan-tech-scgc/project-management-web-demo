import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <ScrollArea className="w-full">
      <div className="min-w-[1400px]">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-table-header">
              <th className="border border-table-border px-4 py-3 text-left text-sm font-semibold text-table-header-foreground whitespace-nowrap">
                Project Name
              </th>
              <th className="border border-table-border px-4 py-3 text-left text-sm font-semibold text-table-header-foreground whitespace-nowrap">
                Com Phase
              </th>
              <th className="border border-table-border px-4 py-3 text-left text-sm font-semibold text-table-header-foreground whitespace-nowrap">
                BUName
              </th>
              <th className="border border-table-border px-4 py-3 text-left text-sm font-semibold text-table-header-foreground whitespace-nowrap">
                PM Name
              </th>
              {timelineHeaders.map((header, index) => (
                <th
                  key={index}
                  className="border border-table-border px-3 py-3 text-center text-xs font-semibold text-table-header-foreground whitespace-pre-line"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-muted/30">
              
              {timelineHeaders.map((_, index) => (
                <td
                  key={index}
                  className="border border-table-border bg-muted/30"
                ></td>
              ))}
            </tr>
            {projects.map((project, projectIndex) => (
              <tr
                key={projectIndex}
                className="hover:bg-muted/50 transition-colors"
              >
                <td className="border border-table-border px-4 py-3 text-sm">
                  {project.projectName}
                </td>
                <td className="border border-table-border px-4 py-3 text-sm whitespace-nowrap">
                  {project.comPhase}
                </td>
                <td className="border border-table-border px-4 py-3 text-sm">
                  {project.buName}
                </td>
                <td className="border border-table-border px-4 py-3 text-sm">
                  {project.pmName}
                </td>
                {timelineHeaders.map((header, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`border border-table-border px-3 py-3 text-center text-sm font-medium ${
                      project.timeline[header] ? "bg-table-highlight" : ""
                    }`}
                  >
                    {project.timeline[header] || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  );
};
