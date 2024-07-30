"use client";

import React, { useEffect, useCallback } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable/DataTable";
import { CreateSkillDialog } from "@/components/Skills/CreateSkillDialog";
import { useCourse } from "@/context/CourseContext";
import { getCourseSkills } from "@/components/Skills/SkillServerActions";
import displayIfRole from "@/components/DisplayIfRole";
import { useUserRole } from "@/context/UserRoleContext";

const AdminSkillClientPage = () => {
  const { selectedCourse, courseSkills, setCourseSkills } = useCourse();
  const { role } = useUserRole();
  

  const refreshSkills = useCallback(async () => {
    if (selectedCourse) {
      const skills = await getCourseSkills(selectedCourse.CourseID);
      setCourseSkills(skills);
    }
  }, [selectedCourse, setCourseSkills]);

  useEffect(() => {
    refreshSkills();
  }, [selectedCourse, refreshSkills]);

  if (!selectedCourse) {
    return <div>Please select a course to view its skills.</div>;
  }

  return (
    <div className="flex mx-20 items-center content-center">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex justify-between">
          <div className="flex gap-x-2">
            {displayIfRole(role, <CreateSkillDialog onSkillCreated={refreshSkills} />)}
          </div>
        </div>
        <div className="overflow-auto max-h-screen">
          <DataTable
            columns={columns({ refreshSkills })}
            data={courseSkills?.map((cs) => cs.Skills) || []}
            columnKey={"SkillName"}
            placeholder="Filter Skill..."
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSkillClientPage;