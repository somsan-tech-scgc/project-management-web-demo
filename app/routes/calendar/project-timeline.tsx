"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProjectList, type ProjectListRow } from "@/hooks/use-project-list";

type ProjectData = {
  projectName: string;
  comPhase: string;
  buName: string;
  pmName: string;
  timeline: Record<string, string>;
};

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

// Mock timeline data
const mockTimelines: Record<string, Record<string, string>> = {
  0: {
    "Mar 25\nW1-2": "G3",
    "Jul 25\nW1-2": "G4",
    "Oct 25\nW1-2": "G5",
    "Jan 26\nW1-2": "G6",
  },
  1: {
    "Jul 25\nW1-2": "G3",
    "Sep 25\nW3-4": "G4",
    "Dec 25\nW1-2": "G5",
    "Mar 26\nW1-2": "G6",
  },
  2: {
    "Aug 25\nW3-4": "G3",
    "Nov 25\nW1-2": "G4",
    "Jan 26\nW1-2": "G5",
    "Feb 26\nW3-4": "G6",
  },
  3: {
    "Jul 26\nW3-4": "G3",
    "Sep 25\nW1-2": "G4",
    "Nov 25\nW1-2": "G5",
    "Feb 26\nW1-2": "G6",
  },
  4: {
    "Sep 25\nW1-2": "G3",
    "Oct 25\nW1-2": "G4",
    "Dec 25\nW3-4": "G5",
    "Feb 26\nW3-4": "G6",
  },
  5: {
    "Aug 25\nW3-4": "G4",
    "Nov 25\nW1-2": "G5",
    "Feb 26\nW1-2": "G6",
  },
  6: {
    "Jul 25\nW1-2": "G3",
    "Oct 25\nW1-2": "G4",
    "Jan 26\nW1-2": "G5",
  },
  7: {
    "Sep 25\nW3-4": "G3",
    "Dec 25\nW1-2": "G4",
    "Feb 26\nW1-2": "G5",
    "Mar 26\nW1-2": "G6",
  },
};

const columns: ColumnDef<ProjectData>[] = [
  {
    accessorKey: "projectName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent"
      >
        Project Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("projectName")}</div>
    ),
  },
  {
    accessorKey: "comPhase",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent"
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {<Badge>{row.getValue("comPhase")}</Badge>}
      </div>
    ),
  },
  {
    accessorKey: "buName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent"
      >
        BU Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("buName")}</div>,
  },
  {
    accessorKey: "pmName",
    header: "PM Name",
    cell: ({ row }) => <div>{row.getValue("pmName")}</div>,
  },
  ...timelineHeaders.map((header) => ({
    id: header.replace(/\n/g, "_").replace(/\s/g, "_"),
    accessorFn: (row: ProjectData) => row.timeline[header] || "",
    header: () => (
      <div className="text-center text-xs whitespace-pre-line">{header}</div>
    ),
    cell: ({ row }: { row: { original: ProjectData } }) => {
      const value = row.original.timeline[header];
      return (
        <div
          className={`text-center font-medium ${
            value ? "bg-table-highlight rounded px-2 py-1" : ""
          }`}
        >
          {value || ""}
        </div>
      );
    },
  })),
];

export const ProjectTimeline = () => {
  const { data: projectListData } = useProjectList();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // Get stable reference to rows
  const rows = projectListData?.rows;

  // Create a stable key from row IDs to detect actual data changes
  const rowsKey = React.useMemo(
    () => rows?.map((r: ProjectListRow) => r.id).join(",") ?? "",
    [rows]
  );

  // Map real project data with mock timeline
  const projects: ProjectData[] = React.useMemo(
    () =>
      rows?.map((project: ProjectListRow, index: number) => ({
        projectName: project.name || "",
        comPhase: project.status || "",
        buName: project.department || "",
        pmName: "",
        timeline: mockTimelines[index] || {},
      })) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rowsKey]
  );

  const table = useReactTable({
    data: projects,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Project Timeline</h1>
        <p className="text-gray-600 mb-4">View the timeline of all projects.</p>
      </div>

      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Filter projects..."
          value={
            (table.getColumn("projectName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("projectName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div> */}

      <div className="rounded-md bg-white">
        <Table className="min-w-[1000px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-table-header">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border border-table-border px-4 py-3 text-sm text-table-header-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border border-table-border px-4 py-3 text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {projects.length}{" "}
          project(s)
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};
