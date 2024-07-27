"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { useCourse } from "@/context/CourseContext";
import { fetchCourseSkills, fetchUsersWithSkillsAndAssessments } from "@/components/Overview/OverviewServerActions";
import { columns, User } from "./columns";
import { Skill } from "@/types";

function calculateSkillPercentages(users: User[], skills: Skill[]): Record<string, number> {
  const skillScores: Record<string, { total: number, count: number }> = {};

  // Initialize the skillScores object with skills
  skills.forEach(skill => {
    skillScores[skill.SkillID] = { total: 0, count: 0 };
  });

  // Calculate total scores and counts for each skill
  users.forEach(user => {
    user.skills.forEach(userSkill => {
      if (skillScores[userSkill.SkillID]) {
        skillScores[userSkill.SkillID].total += userSkill.Score;
        skillScores[userSkill.SkillID].count += 1;
      }
    });
  });

  // Calculate the average percentage for each skill and format it to 2 decimal places
  const skillPercentages: Record<string, number> = {};
  Object.keys(skillScores).forEach(skillID => {
    const { total, count } = skillScores[skillID];
    skillPercentages[skillID] = count ? parseFloat(((total / (count * 3)) * 100).toFixed(2)) : 0;
  });

  return skillPercentages;
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

        setSkills(courseSkills);
        setUsers(mappedUsers);
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

  // Calculate skill percentages
  const skillPercentages = calculateSkillPercentages(users, skills);
  const percentageRow = {
    id: 'percentage-row',
    name: 'Skill Averages (%)',
    skills: skills.map(skill => ({
      SkillID: skill.SkillID,
      Score: skillPercentages[skill.SkillID] || 0,
      UserID: 'percentage-row'
    }))
  };

  const dataWithPercentageRow = [...users, percentageRow];
  const dynamicColumns = columns(skills);

  return (
    <div className="flex mx-20 items-center content-center">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex overflow-auto max-h-screen">
        <DataTable
          columns={Array.isArray(dynamicColumns) ? dynamicColumns : []}
          data={dataWithPercentageRow}
          columnKey={"name"}
          placeholder="Filter Students..."
        />
      </div>
    </div>
  );
};

export default OverviewClientPage;
