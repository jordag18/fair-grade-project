"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
//import { Skill } from "@/types";
import ActionsCell from "@/components/Skills/SkillActionsCell";

export interface Skill {
  SkillID: string
  SkillName: string
  AddedBy: string
  SkillType: String
}

export const columns: ColumnDef<Skill>[] = [
  {
    accessorKey: "SkillName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skill Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("SkillName")}</div>
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
    accessorKey: "AddedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Added By" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("AddedBy")}</div>
    ),
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
