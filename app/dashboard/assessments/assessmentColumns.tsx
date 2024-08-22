"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { Assessment, CourseSkill } from "@/types";
import ActionsCell from "@/components/Assessments/AssessmentsActionsCell";
import { DataTableColumnHeaderAssessments } from "@/components/DataTable/DataTableColumnHeaderAssessments";

export const assessmentColumns: (props: {
  refreshAssessments: () => void;
  courseSkills: CourseSkill[]; 
}) => ColumnDef<Assessment>[] = ({ refreshAssessments, courseSkills }) => {
  // Basic columns for instrument, assessment date, etc.
  const basicColumns: ColumnDef<Assessment>[] = [
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
        <div className="w-[150px]">
          {new Date(row.getValue("AssessmentDate")).toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "SelfAssessmentDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Student Assessment Date" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px]">
          {new Date(row.getValue("SelfAssessmentDate")).toLocaleString()}
        </div>
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
  ];

  // Dynamically add columns for each skill
  const skillColumns: ColumnDef<Assessment>[] = courseSkills.map((skill) => ({
    accessorKey: `Skill_${skill.SkillID}`, // Unique key for each skill
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={skill.Skills.SkillName} />
    ),
    cell: ({ row }) => {
      // Find the skill score for this particular skill
      const assessmentSkill = row.original.Skills.find(
        (s) => s.SkillID === skill.SkillID
      );
      return (
        <div className="w-[100px]">
          {assessmentSkill ? assessmentSkill.Score : "-"}
        </div>
      );
    },
  }));

  const actionsColumn: ColumnDef<Assessment> = {
    id: "actions",
    cell: ({ row }) => (
      <ActionsCell row={row} refreshAssessments={refreshAssessments} />
    ),
  };

  return [...basicColumns, ...skillColumns, actionsColumn];
};
