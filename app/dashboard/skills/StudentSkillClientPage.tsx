"use client";

import React, { useEffect, useCallback, useState } from "react";
import { studentColumns } from "./studentColumns";
import { DataTable } from "@/components/DataTable/DataTable";
import { useCourse } from "@/context/CourseContext";
import { getStudentSkillsByUser } from "@/components/Skills/SkillServerActions";
import { useUserId } from "@/lib/auth/useUser";

const StudentSkillClientPage = () => {
  const { selectedCourse, setCourseSkills } = useCourse();
  const [studentSkills, setStudentSkills] = useState([]);
  const refreshSkills = useCallback(async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userId = await useUserId();
    if (selectedCourse && userId) {
      const skills = await getStudentSkillsByUser(selectedCourse.CourseID, userId);
      setStudentSkills(skills);
    }
  }, [selectedCourse, setStudentSkills]);

  useEffect(() => {
    refreshSkills();
  }, [selectedCourse, refreshSkills]);

  if (!selectedCourse) {
    return <div>Please select a course to view your skills.</div>;
  }

  return (
    <div className="flex mx-20 items-center content-center">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="overflow-auto max-h-screen">
          <DataTable
            columns={studentColumns}
            data={studentSkills}
            columnKey={"SkillName"}
            placeholder="Filter Skill..."
          />
        </div>
      </div>
    </div>
  );
};

export default StudentSkillClientPage;

