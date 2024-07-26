"use server";

import prisma from "@/lib/prisma";
import { FormSchemaType } from "./SkillForm";
import { Skill } from "@/types";

export const getSkillData = (skills: any[]): Skill[] => {
  return skills.map(skill => ({
    SkillID: skill.SkillID,
    SkillName: skill.SkillName,
    AddedBy: skill.AddedBy,
    SkillType: skill.SkillType,
  }));
};

export async function createSkill(skillData: FormSchemaType, courseID: string) {
  try {
    if (!skillData.addedBy) {
      throw new Error("AddedBy is required");
    }
    const newSkill = await prisma.skills.create({
      data: {
        SkillName: skillData.skillName,
        AddedBy: skillData.addedBy,  // Ensuring addedBy is not undefined
        SkillType: skillData.skillType,
      },
    });

    await prisma.courseSkills.create({
      data: {
        CourseID: courseID,
        SkillID: newSkill.SkillID,
      },
    });

    return { success: true, skill: newSkill };
  } catch (error) {
    console.error("Error creating skill:", error);
    return { success: false, error: "Failed to create skill" };
  }
}

export async function modifySkill(skillData: FormSchemaType) {
  try {
    if (!skillData.addedBy) {
      throw new Error("AddedBy is required");
    }
    const updatedSkill = await prisma.skills.update({
      where: { SkillID: skillData.skillID! },
      data: {
        SkillName: skillData.skillName,
        AddedBy: skillData.addedBy,  // Ensuring addedBy is not undefined
        SkillType: skillData.skillType,
      },
    });

    return { success: true, skill: updatedSkill };
  } catch (error) {
    console.error("Error modifying skill:", error);
    return { success: false, error: "Failed to modify skill" };
  }
}

export async function deleteSelectedSkill(skillID: string) {
  try {
    await prisma.skills.delete({
      where: {
        SkillID: skillID,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting selected skill:", error);
    throw error;
  }
}

export async function getCourseSkills(courseID: string) {
  try {
    const courseSkills = await prisma.courseSkills.findMany({
      where: {
        CourseID: courseID,
      },
      include: {
        Skills: true,
      },
    });
    return courseSkills;
  } catch (error) {
    console.error('Error fetching course skills:', error);
    throw error;
  }
}

(async () => {
  const courseID = 'your-course-id-here';
  const skills = await getCourseSkills(courseID);
  console.log('Course skills:', skills);
})();
