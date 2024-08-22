"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { Assessment, CourseSkill } from "@/types";
import ActionsCell from "@/components/Assessments/AssessmentsActionsCell";
import { DataTableColumnHeaderAssessments } from "@/components/DataTable/DataTableColumnHeaderAssessments";

export const assessmentColumnsReversed: (props: {
  assessments: any[];
  courseSkills: CourseSkill[];
}) => ColumnDef<CourseSkill>[] = ({ assessments, courseSkills }) => {
  // Basic columns for each skill
  const basicColumns: ColumnDef<CourseSkill>[] = [
    {
      accessorKey: "SkillName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Skill" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px]">{row.getValue("SkillName")}</div>
      ),
    },
    {
      accessorKey: "SkillType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Skill Type" />
      ),
      cell: ({ row }) => (
        <div className="w-[150px]">{row.getValue("SkillType")}</div>
      ),
    },
  ];

  // Dynamically add columns for each assessment
  const assessmentColumns: ColumnDef<CourseSkill>[] = assessments.map((assessment) => ({
    accessorKey: `Assessment_${assessment.AssessmentID}`, // Unique key for each assessment
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={assessment.InstrumentName} />
    ),
    cell: ({ row }) => {
      // Find the score for this particular skill in this assessment
      const assessmentSkill = assessment.Skills.find(
        (s: any) => s.SkillID === row.original.SkillID
      );
      return (
        <div className="w-[100px]">
          {assessmentSkill ? assessmentSkill.Score : "-"}
        </div>
      );
    },
  }));

  return [...basicColumns, ...assessmentColumns];
};
