"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { Assessment } from "@/types";
import ActionsCell from "@/components/Assessments/AssessmentsActionsCell";

export const assessmentColumns: (props: {
  refreshAssessments: () => void;
}) => ColumnDef<Assessment>[] = ({ refreshAssessments }) => [
  {
    accessorKey: "InstrumentName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instrument Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("InstrumentName")}</div>
    ),
  },
  {
    accessorKey: "AssessmentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assessment Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{new Date(row.getValue("AssessmentDate")).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "SelfAssessmentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student Assessment Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{new Date(row.getValue("SelfAssessmentDate")).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "Assessor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coach" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("Assessor")}</div>
    ),
  },
  {
    accessorKey: "AssessedUser",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("AssessedUser")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} refreshAssessments={refreshAssessments} />,
  },
];
