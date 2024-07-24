"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { format } from "date-fns";
import { Assessment } from "@/types";
import ActionsCell from "@/components/Assessments/AssessmentsActionsCell";

export const columns: (props: {
  refreshAssessments: () => void;
}) => ColumnDef<Assessment>[] = ({ refreshAssessments }) => [
  {
    accessorKey: "Title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("Title")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "AssessorID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coach" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("AssessorID")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Comment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comment" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("Comment")}</div>
    ),
  },
  {
    accessorKey: "InstrumentType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instrument" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("InstrumentType")}</div>
    ),
  },
  {
    accessorKey: "InstrumentDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instrument Description" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("InstrumentDescription")}</div>
    ),
  },
  {
    accessorKey: "AssessmentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const date: Date = row.getValue("AssessmentDate");
      const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
      return <div className="w-[120px]">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} refreshAssessments={refreshAssessments} />,
  },
];
