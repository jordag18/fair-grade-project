"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import ActionsCell from "@/components/Skills/SkillActionsCell";
import { getUserById } from "@/lib/auth/getUserNameByIdServerAction";
import { Skill } from "@/types";

//array of column definitions of type Skill, determines how each column and cell in the table should be rendered and what data from the DataTable data to be displayed.
export const columns: (props: {
  refreshSkills: () => void;
}) => ColumnDef<Skill>[] = ({ refreshSkills }) => [
  {
    accessorKey: "SkillName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skill Name" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("SkillName")}</div>
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
      <div>{row.getValue("SkillType")}</div>
    ),
  },
  {
    accessorKey: "UserName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Added By" />
    ),
    cell: ({ row }) => <div>{row.getValue("UserName")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} refreshSkills={refreshSkills} />,
  },
];