"use server";

import prisma from "@/lib/prisma";
import { Assessment } from "@/types";

interface SelfAssessmentData {
  StudentID: string;
  InstrumentID: string;
  CourseID: string;
  Comment?: string;
  Skills: { SkillID: string; Score: number; Comment?: string }[];
}

export async function createSelfAssessment(data: SelfAssessmentData) {
  try {
    const selfAssessment = await prisma.selfAssessments.create({
      data: {
        StudentID: data.StudentID,
        InstrumentID: data.InstrumentID,
        CourseID: data.CourseID,
        Comment: data.Comment,
        SelfAssessmentSkills: {
          create: data.Skills.map(skill => ({
            SkillID: skill.SkillID,
            Score: skill.Score,
            Comment: skill.Comment,
          })),
        },
      },
    });

    return { success: true, selfAssessment };
  } catch (error) {
    console.error("Error creating self-assessment:", error);
    return { success: false, error: "Failed to create self-assessment" };
  }
}

// Function to fetch assessments by course ID
export async function getAssessmentsByCourse(courseID: string): Promise<any[]> {
  try {
    // Fetch assessments for the given course ID
    const assessments = await prisma.assessments.findMany({
      where: { CourseID: courseID },
      include: {
        Users_Assessments_AssessorIDToUsers: {
          select: {
            name: true,
          },
        },
        Users_Assessments_AssessedUserIDToUsers: {
          select: {
            name: true,
          },
        },
        Instruments_Assessments: {
          select: {
            Name: true,
          },
        },
        AssessmentSkills: {
          include: {
            Skills: true,
          },
        },
      },
    });

    // Map the fetched data to the Assessment type
    return assessments.map((assessment) => ({
      AssessmentID: assessment.AssessmentID,
      Assessor: assessment.Users_Assessments_AssessorIDToUsers?.name || "Unknown",
      AssessedUser: assessment.Users_Assessments_AssessedUserIDToUsers?.name || "Unknown",
      CourseID: assessment.CourseID,
      Instrument: assessment.Instruments_Assessments?.Name || "Unknown",
      Title: assessment.Title,
      Comment: assessment.Comment,
      AssessmentDate: assessment.AssessmentDate,
      InstrumentDescription: assessment.InstrumentDescription,
      Skills: assessment.AssessmentSkills.map((skill) => ({
        SkillID: skill.SkillID,
        SkillName: skill.Skills.SkillName,
        SkillType: skill.Skills.SkillType,
        Score: skill.Score,
        Approved: skill.Approved,
        Comment: skill.Comment,
      })),
    }));
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}

export async function fetchSelfAssessments(courseID: string, userID: string) {
  try {
    const selfAssessments = await prisma.selfAssessments.findMany({
      where: {
        CourseID: courseID,
        StudentID: userID,
      },
      include: {
        Instrument: true,
        Assessments: true,
        SelfAssessmentSkills: {
          include: {
            Skill: true,
          },
        },
      },
    });

    return selfAssessments.map(assessment => ({
      SelfAssessmentID: assessment.SelfAssessmentID,
      InstrumentID: assessment.InstrumentID,
      InstrumentName: assessment.Instrument.Name,
      assessmentDate: assessment.AssessmentDate,
      Assessment: assessment.Assessments,
      skills: assessment.SelfAssessmentSkills.map(skill => ({
        SelfAssessmentSkillID: skill.SelfAssessmentSkillID,
        skillName: skill.Skill.SkillName,
        score: skill.Score,
        comment: skill.Comment
      })),
      comments: assessment.Comment,
      hasAssessments: assessment.Assessments.length > 0,
    }));
  } catch (error) {
    console.error("Error fetching self-assessments:", error);
    throw new Error("Failed to fetch self-assessments");
  }
}