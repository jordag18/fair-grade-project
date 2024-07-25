"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";

export interface StudentSkill {
  UserID: string;
  SkillID: string;
  Score: number;
}

export interface Skill {
  SkillID: string;
  SkillName: string;
  SkillType: string;
}

export interface User {
  id: string;
  name: string | null;
  skills: StudentSkill[];
}

export const columns = (skills: Skill[]): ColumnDef<User>[] => {
  // Base column for student names
  const baseColumns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Student Name" />
      ),
      cell: ({ row }) => <div className="w-[200px]">{row.getValue("name")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
  ];

  // Dynamic columns for each skill
  const skillColumns: ColumnDef<User>[] = skills.map((skill) => ({
    accessorKey: `skills.${skill.SkillID}.Score`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={skill.SkillName} />
    ),
    cell: ({ row }) => {
      const skillData = row.original.skills.find(s => s.SkillID === skill.SkillID);
      return <div className="w-[100px]">{skillData ? skillData.Score : 'N/A'}</div>;
    },
  }));

  // Combine base columns and skill columns
  return [...baseColumns, ...skillColumns];
};
