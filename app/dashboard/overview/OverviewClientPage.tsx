"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { useCourse } from "@/context/CourseContext";
import { fetchCourseSkills, fetchUsersWithSkillsAndAssessments } from "@/components/Overview/OverviewServerActions";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Skill, StudentSkill } from "@/types";
import { DataTableColumnHeader } from "@/components/DataTable/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";

export interface User {
  id: string;
  name: string | null;
  skills: StudentSkill[];
}

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
          headerHeight="h-72"
          columnKey={"name"}
          placeholder="Filter Students..."
        />
      </div>
    </div>
  );
};

export default OverviewClientPage;