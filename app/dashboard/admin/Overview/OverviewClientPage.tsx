"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "../../../../components/DataTable/DataTable";
import { useCourse } from "@/context/CourseContext";
import { fetchCourseSkills, fetchUsersWithSkillsAndAssessments } from "@/components/Overview/OverviewServerActions";
import { columns, Skill, User } from "./columns";

const OverviewClientPage = () => {
    const { selectedCourse } = useCourse();
    const [skills, setSkills] = useState<Skill[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        console.log("Overview columns: ", columns(skills))
      const fetchData = async () => {
        if (selectedCourse) {
          const courseSkills = await fetchCourseSkills(selectedCourse.CourseID);
          const usersData = await fetchUsersWithSkillsAndAssessments(selectedCourse.CourseID);
          setSkills(courseSkills);
          setUsers(usersData);
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
      <div className="flex mx-20 items-center content-center">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex overflow-auto max-h-screen">
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