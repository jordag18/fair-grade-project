"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { FormSchemaType } from "./SkillForm";

export async function createSkill(skillData: FormSchemaType) {
  console.log("Creating skill with data:", skillData);

  try {
    const newSkill = await prisma.skills.create({
      data: {
        SkillName: skillData.skillName,
        AddedBy: skillData.addedBy,
        SkillType: skillData.skillType,
      },
    });

    // Revalidate the path to update the UI
    revalidatePath("/skills");

    return { success: true, skill: newSkill };
  } catch (error) {
    return { success: false, error: "Failed to create skill" };
  }
}

export async function modifySkill(skillData: FormSchemaType) {
  try {
    const updatedSkill = await prisma.skills.update({
      where: { skillID: skillData.skillID! },
      data: {
        SkillName: skillData.skillName,
        AddedBy: skillData.addedBy,
        SkillType: skillData.skillType,
      },
    });

    // Revalidate the path to update the UI
    revalidatePath("/skills");

    return { success: true, skill: updatedSkill };
  } catch (error) {
    console.error("Error modifying skill:", error);
    return { success: false, error: "Failed to modify skill" };
  }
}


//TODO: Modify to delete skill from selectedCourse
export async function deleteSelectedSkill(skillID: string) {
  try {
    await prisma.skills.delete({
      where: {
        SkillID: skillID,
      },
    });
    revalidatePath("/skills");
    return { success: true };
  } catch (error) {
    console.error("Error deleting selected skill:", error);
    throw error;
  }
}
