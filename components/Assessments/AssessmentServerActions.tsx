"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { FormSchemaType } from "./AssessmentForm";

export async function createAssessment(assessmentData: FormSchemaType) {
  try {
    const newAssessment = await prisma.assessments.create({
      data: {
        AssessorID: assessmentData.assessorID,
        AssessedUserID: assessmentData.assessedUserID,
        Title: assessmentData.assessmentTitle,
        CourseID: assessmentData.courseID,
        Comment: assessmentData.comment,
        InstrumentType: assessmentData.instrumentType,
        AssessmentDate: assessmentData.assessmentDate,
        InstrumentDescription: assessmentData.instrumentDescription,
      },
    });

    revalidatePath("/assessments");
    return { success: true, assessment: newAssessment };
  } catch (error) {
    console.error("Error creating assessment:", error);
    return { success: false, error: "Failed to create assessment" };
  }
}

export async function modifyAssessment(assessmentData: FormSchemaType) {
  try {
    const updatedAssessment = await prisma.assessments.update({
      where: { AssessmentID: assessmentData.assessmentID! },
      data: {
        AssessorID: assessmentData.assessorID,
        AssessedUserID: assessmentData.assessedUserID,
        CourseID: assessmentData.courseID,
        Comment: assessmentData.comment,
        InstrumentType: assessmentData.instrumentType,
        AssessmentDate: assessmentData.assessmentDate,
        InstrumentDescription: assessmentData.instrumentDescription,
      },
    });

    revalidatePath("/assessments");
    return { success: true, assessment: updatedAssessment };
  } catch (error) {
    console.error("Error modifying assessment:", error);
    return { success: false, error: "Failed to modify assessment" };
  }
}

export async function deleteAssessment(assessmentID: string) {
  try {
    await prisma.assessments.delete({
      where: { AssessmentID: assessmentID },
    });

    revalidatePath("/assessments");
    return { success: true };
  } catch (error) {
    console.error("Error deleting assessment:", error);
    return { success: false, error: "Failed to delete assessment" };
  }
}

export async function getAssessmentsByCourse(courseID: string) {
  try {
    const assessments = await prisma.assessments.findMany({
      where: {
        CourseID: courseID,
      },
      include: {
        Users_Assessments_AssessorIDToUsers: true,
        Users_Assessments_AssessedUserIDToUsers: true,
        AssessmentSkills: {
          include: {
            Skills: true,
          },
        },
      },
    });

    return assessments.map(assessment => ({
      AssessmentID: assessment.AssessmentID,
      Title: assessment.Title,
      AssessorID: assessment.Users_Assessments_AssessorIDToUsers.name,
      AssessedUserID: assessment.AssessedUserID,
      AssessedUserName: assessment.Users_Assessments_AssessedUserIDToUsers.name,
      CourseID: assessment.CourseID,
      Comment: assessment.Comment,
      InstrumentType: assessment.InstrumentType,
      AssessmentDate: assessment.AssessmentDate,
      InstrumentDescription: assessment.InstrumentDescription,
      AssessmentSkills: assessment.AssessmentSkills.map(skill => ({
        SkillID: skill.SkillID,
        SkillName: skill.Skills.SkillName,
        Score: skill.Score,
      })),
    }));
  } catch (error) {
    console.error("Error fetching assessments by course:", error);
    return [];
  }
}

export async function fetchUsersByCourseAndRole(courseID: string, role: string) {
    try {
      const users = await prisma.user.findMany({
        where: {
          UserCourse: {
            some: {
              CourseID: courseID,
              Role: role,
            },
          },
        },
        select: {
          id: true,
          name: true,
        },
      });
      return { success: true, users };
    } catch (error) {
      console.error("Error fetching users:", error);
      return { success: false, error: "Failed to fetch users" };
    }
  }