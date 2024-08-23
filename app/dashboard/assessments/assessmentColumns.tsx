"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { Assessment, CourseSkill } from "@/types";
import ActionsCell from "@/components/Assessments/AssessmentsActionsCell";
import { DataTableColumnHeaderAssessments } from "@/components/DataTable/DataTableColumnHeaderAssessments";
import { CustomColumnDef } from "@/components/DataTable/DataTable";

export const assessmentColumns: (props: {
  refreshAssessments: () => void;
  courseSkills: any[]; 
}) => CustomColumnDef<Assessment>[] = ({ refreshAssessments, courseSkills }) => {
  // Basic columns for instrument, assessment date, etc.
  const basicColumns: CustomColumnDef<Assessment>[] = [
    {
      accessorKey: "InstrumentName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Instrument Name" className="text-center flex items-center justify-center"/>
      ),
      headerAlign: "center",
      cell: ({ row }) => (
        <div className="w-[150px]">{row.getValue("InstrumentName")}</div>
      ),
    },
    {
      accessorKey: "AssessmentDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assessment Date" className="text-center flex items-center justify-center"/>
      ),
      cell: ({ row }) => (
        <div className="w-[150px]">
          {new Date(row.getValue("AssessmentDate")).toLocaleString()}
        </div>
      ),
    },
    /*
    {
      accessorKey: "SelfAssessmentDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Student Assessment Date" className="text-center flex items-center justify-center"/>
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
        <DataTableColumnHeader column={column} title="Coach" className="text-center flex items-center justify-center" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px]">{row.getValue("Assessor")}</div>
      ),
    },
    {
      accessorKey: "AssessedUser",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Student" className="text-center flex items-center justify-center"/>
      ),
      cell: ({ row }) => (
        <div className="w-[150px]">{row.getValue("AssessedUser")}</div>
      ),
    },
    */
  ];

  // Dynamically add columns for each skill
  const skillColumns: CustomColumnDef<Assessment>[] = courseSkills.map((skill) => ({
    accessorKey: `Skill_${skill.SkillID}`, // Unique key for each skill
    header: ({ column }) => (
      <DataTableColumnHeaderAssessments column={column} title={skill.SkillName}/>
    ),
    headerAlign: "top",
    cell: ({ row }) => {
      // Find the skill score for this particular skill
      const assessmentSkill = row.original.Skills.find(
        (s) => s.SkillID === skill.SkillID
      );
      return (
        <div className="text-center flex items-center justify-center">
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
