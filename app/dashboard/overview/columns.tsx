"use client";

import React from "react";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { DataTableColumnHeaderRotated } from "@/components/DataTable/DataTableColumnHeaderRotated";
import { CustomColumnDef } from "@/components/DataTable/DataTable";
import { Skill, StudentSkill } from "@/types";

export interface User {
  id: string;
  name: string | null;
  skills: StudentSkill[];
}

export type RowData =
  | User
  | {
      id: string;
      name: string;
      skills: { SkillID: string; Score: number; UserID: string }[];
    };

// Define the column for the name field
export const nameColumns: CustomColumnDef<RowData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="w-[150px]">{row.getValue("name")}</div>,
  },
];

// Define the columns for the skills dynamically
export const skillsColumns: (skills: Skill[]) => CustomColumnDef<RowData>[] = (
  skills
) =>
  skills.map((skill) => ({
    accessorKey: `skills.${skill.SkillID}`,
    header: ({ column }) => (
      <DataTableColumnHeaderRotated column={column} title={skill.SkillName} />
    ),
    headerAlign: "top",
    cell: ({ row }: { row: { original: RowData } }) => {
      const userSkills = (row.original as User).skills || [];
      const skillData = userSkills.find((s) => s.SkillID === skill.SkillID);
      return (
        <div className="text-center flex items-center justify-center">
          {skillData ? skillData.Score : "-"}
        </div>
      );
    },
  }));

// Combine name and skills columns
export const columns: (skills: Skill[]) => CustomColumnDef<RowData>[] = (
  skills
) => [
  ...nameColumns,
  ...skillsColumns(skills),
];
