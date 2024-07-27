"use server";
import prisma from "@/lib/prisma";
import { Skill, User } from "@/types";

export async function fetchCourseSkills(courseID: string) {
  try {
    const skills = await prisma.courseSkills.findMany({
      where: { CourseID: courseID },
      include: {
        Skills: true,
      },
    });

    return skills.map(skill => ({
      SkillID: skill.SkillID,
      SkillName: skill.Skills.SkillName,
      SkillType: skill.Skills.SkillType,
    }));
  } catch (error) {
    console.error("Error fetching course skills:", error);
    return [];
  }
}

export async function fetchUsersWithSkillsAndAssessments(courseID: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        UserCourse: {
          some: {
            CourseID: courseID,
            Role: 'Student',
          },
        },
      },
      include: {
        StudentSkills: {
          where: {
            CourseID: courseID,
          },
          include: {
            Skills: true,
          },
        },
      },
    });

    return users.map(user => ({
      id: user.id,
      name: user.name,
      skills: user.StudentSkills.map(skill => ({
        SkillID: skill.SkillID,
        Score: skill.Score,
      })),
    }));
  } catch (error) {
    console.error("Error fetching users with skills and assessments:", error);
    return [];
  }
}


