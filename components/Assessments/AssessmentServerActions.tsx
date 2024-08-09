"use server";

import prisma from "@/lib/prisma";
import { Assessment, SelfAssessment } from '@/types';
import { AssessmentFormSchemaType } from "./AssessmentForm";

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
        Users_Assessments_AssessorIDToUsers: true,
        Users_Assessments_AssessedUserIDToUsers: true,
        Instruments_Assessments: true,
        SelfAssessment_Assessments: true,
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
      SelfAssessmentDate: assessment.SelfAssessment_Assessments?.AssessmentDate,
      Instrument_Assessment: assessment.Instruments_Assessments,
      InstrumentName: assessment.Instruments_Assessments.Name,
      SelfAssessment_Assessment: assessment.SelfAssessment_Assessments,

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

export async function fetchSelfAssessmentSkills(instrumentID: string, assessedUserID: string) {
  try {
    // Fetch skills and initial scores for the given instrument and student
    const selfAssessments = await prisma.selfAssessments.findMany({
      where: {
        InstrumentID: instrumentID,
        StudentID: assessedUserID,
      },
      include: {
        SelfAssessmentSkills: {
          include: {
            Skill: {
              select: {
                SkillID: true,
                SkillName: true,
              },
            },
          },
        },
      },
    });

    const assessmentSkills = selfAssessments.flatMap(selfAssessment =>
      selfAssessment.SelfAssessmentSkills.map(sas => ({
        SkillID: sas.Skill.SkillID,
        SkillName: sas.Skill.SkillName,
        initialScore: sas.Score,
        adjustedScore: sas.Score, 
        approved: false,
      }))
    );

    return assessmentSkills;
  } catch (error) {
    console.error("Error fetching self-assessment skills:", error);
    throw new Error("Failed to fetch self-assessment skills");
  }
}

export async function fetchStudentsWithSelfAssessment(courseID: string, instrumentID: string) {
  try {
    // Fetch students who have completed a self-assessment for the given instrument in the course
    const students = await prisma.user.findMany({
      where: {
        SelfAssessments: {
          some: {
            CourseID: courseID,
            InstrumentID: instrumentID,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return students;
  } catch (error) {
    console.error("Error fetching students with self-assessment:", error);
    throw new Error("Failed to fetch students with self-assessment");
  }
}

export async function createInstructorAssessment(data: AssessmentFormSchemaType) {
  try {
    const { selfAssessmentID, assessorID, instrumentID, assessedUserID, assessmentSkills, comment } = data;

    // Fetch Instrument Description
    const instrument = await prisma.instrument.findUnique({
      where: { InstrumentID: instrumentID },
    });

    if (!instrument) {
      throw new Error("Instrument not found");
    }


    await prisma.$transaction(async (prisma) => {
      // Create a new assessment review
      const newAssessment = await prisma.assessments.create({
        data: {
          InstrumentID: instrumentID,
          AssessedUserID: assessedUserID as string,
          AssessorID: assessorID as string,
          CourseID: instrument.CourseID!,
          Title: `Assessment Review - ${new Date().toLocaleDateString()}`,
          Comment: comment || "",
          AssessmentDate: new Date(),
          InstrumentDescription: "Temp",
          SelfAssessmentID: selfAssessmentID,
        },
      });

      // Handle each assessment skill
      for (const skill of assessmentSkills || []) {
        // Add skill to AssessmentSkills
        await prisma.assessmentSkills.create({
          data: {
            AssessmentID: newAssessment.AssessmentID,
            SkillID: skill.SkillID,
            Score: skill.adjustedScore,
            Approved: skill.approved,
          },
        });

        // If approved, update StudentSkills
        if (skill.approved) {
          await prisma.studentSkills.upsert({
            where: {
              UserID_CourseID_SkillID: {
                UserID: assessedUserID as string,
                CourseID: newAssessment.CourseID,
                SkillID: skill.SkillID,
              },
            },
            update: {
              Score: skill.adjustedScore,
            },
            create: {
              UserID: assessedUserID as string,
              CourseID: newAssessment.CourseID,
              SkillID: skill.SkillID,
              Score: skill.adjustedScore,
            },
          });
        }
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating instructor assessment:", error);
    return { success: false, error: "Failed to create instructor assessment" };
  }
}

export async function fetchSelfAssessmentID({
  instrumentID,
  studentID,
  courseID,
}: {
  instrumentID: string;
  studentID: string;
  courseID: string;
}): Promise<string | null> {
  try {
    const selfAssessment = await prisma.selfAssessments.findFirst({
      where: {
        InstrumentID: instrumentID,
        StudentID: studentID,
        CourseID: courseID,
      },
      select: {
        SelfAssessmentID: true,
      },
    });

    return selfAssessment?.SelfAssessmentID || null;
  } catch (error) {
    console.error("Error fetching SelfAssessmentID:", error);
    return null;
  }
}


export async function deleteAssessment(assessmentID: string) {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.assessmentSkills.deleteMany({
        where: { AssessmentID: assessmentID },
      });

      await prisma.assessments.delete({
        where: { AssessmentID: assessmentID },
      });
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting assessment:", error);
    return { success: false, error: "Failed to delete assessment" };
  }
}