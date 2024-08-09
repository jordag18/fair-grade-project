"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import SelfAssessmentActionsCell from "@/components/Assessments/SelfAssessmentActionCell";
import { SelfAssessment } from "@/types";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";

export const selfAssessmentColumns: (props: {
  refreshSelfAssessments: () => void;
}) => ColumnDef<SelfAssessment>[] = ({ refreshSelfAssessments }) => [
  {
    accessorKey: "InstrumentName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assessed Instrument" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("InstrumentName")}</div>
    ),
  },
  {
    accessorKey: "assessmentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assessment Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{new Date(row.getValue("assessmentDate")).toLocaleString()}</div>
    ),
  },
  {
    accessorKey: "hasAssessments",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assessment Status" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center h-full">
        {row.getValue("hasAssessments") ? (
          <CheckCircleIcon className="w-6 h-6 text-green-500" />
        ) : (
          <XCircleIcon className="w-6 h-6 text-red-500" />
        )}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <SelfAssessmentActionsCell row={row} refreshSelfAssessments={refreshSelfAssessments} />,
  },
];
