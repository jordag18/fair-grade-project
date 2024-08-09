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
    accessorKey: "assessmentTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assessment Title" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("assessmentTitle")}</div>
    ),
  },
  {
    accessorKey: "assessmentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assessment Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("assessmentDate")}</div>
    ),
  },
  {
    accessorKey: "assessorName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assessor Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("assessorName")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} refreshAssessments={refreshAssessments} />,
  },
];
