"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { useCourse } from "@/context/CourseContext";
import { fetchCourseSkills, fetchUsersWithSkillsAndAssessments } from "@/components/Overview/OverviewServerActions";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Skill, StudentSkill } from "@/types";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";

export interface User {
  id: string;
  name: string | null;
  skills: StudentSkill[];
}

export type RowData = User | {
  id: string;
  name: string;
  skills: { SkillID: string; Score: number; UserID: string; }[];
};


export const columns: (skills: Skill[]) => ColumnDef<RowData>[] = (skills) => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("name")}</div>
    ),
  },
  ...skills.map(skill => ({
    accessorKey: `skills.${skill.SkillID}`,
    header: ({ column }: { column: Column<RowData, unknown> }) => (
      <DataTableColumnHeader column={column} title={skill.SkillName} />
    ),
    cell: ({ row }: { row: { original: RowData } }) => {
      const userSkills = (row.original as User).skills || [];
      const skillData = userSkills.find(s => s.SkillID === skill.SkillID);
      return <div className="w-[50px] text-center">{skillData ? skillData.Score : '-'}</div>;
    },
  })),
];

const OverviewClientPage = () => {
  const { selectedCourse } = useCourse();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCourse) {
        const courseSkills = await fetchCourseSkills(selectedCourse.CourseID);
        const usersData = await fetchUsersWithSkillsAndAssessments(selectedCourse.CourseID);

        const mappedUsers = usersData.map((user) => ({
          ...user,
          skills: user.skills.map((skill) => ({
            ...skill,
            UserID: user.id, // Ensure UserID is included in each skill
          })),
        }));

        setSkills(courseSkills as any);
        setUsers(mappedUsers as any);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCourse]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedCourse) {
    return <div>Please select a course to view the overview.</div>;
  }

  const dynamicColumns = columns(skills);

  return (
    <div className="flex mx-20 items-center content-center w-full">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex overflow-auto max-h-screen">
        <DataTable
          columns={Array.isArray(dynamicColumns) ? dynamicColumns : []}
          data={users} 
          columnKey={"name"}
          placeholder="Filter Students..."
        />
      </div>
    </div>
  );
};

export default OverviewClientPage;