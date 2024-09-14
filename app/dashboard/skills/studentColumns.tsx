// Define a function to get the text color based on the score
function getScoreColor(score: number): string {
    if (score === 0) return 'text-red-600';
    if (score === 1) return 'text-yellow-600';
    if (score >= 2) return 'text-green-600';
    return '';
  }
  
  // studentColumns.ts
  import React from "react";
  import { ColumnDef } from "@tanstack/react-table";
  import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
  import { Skill } from "@/types";
  
  // Column definitions for StudentSkillsClientPage
  export const studentColumns: ColumnDef<Skill>[] = [
    {
      accessorKey: "SkillName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Skill Name" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px] flex items-center justify-center text-center">{row.getValue("SkillName")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "SkillType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Skill Type" />
      ),
      cell: ({ row }) => (
        <div className="w-[80px]">{row.getValue("SkillType")}</div>
      ),
    },
    {
      accessorKey: "Score",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Score" />
      ),
      cell: ({ row }) => (
        <div className={`w-[80px] ${getScoreColor(row.getValue("Score"))}`}>
          {row.getValue("Score")}
        </div>
      ),
    },
  ];
  