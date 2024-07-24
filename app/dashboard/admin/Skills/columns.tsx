"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import ActionsCell from "@/components/Skills/SkillActionsCell";
import { getUserById } from "@/lib/auth/getUserNameByIdServerAction";

export interface Skill {
  SkillID: string;
  SkillName: string;
  AddedBy: string;
  SkillType: String;
}

export const columns: (props: {
  refreshSkills: () => void;
}) => ColumnDef<Skill>[] = ({ refreshSkills }) => [
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
    cell: ({ row }) => {
      const userId = row.getValue("AddedBy");
      const [userName, setUserName] = useState("Loading...");
      useEffect(() => {
        async function fetchUserName() {
          const name = await getUserById(userId as string);
          setUserName(name);
        }
        fetchUserName();
      }, [userId]);

      return <div className="w-[80px]">{userName}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} refreshSkills={refreshSkills} />,
  },
];
