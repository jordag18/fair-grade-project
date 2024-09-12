"use server";

import prisma from "@/lib/prisma";
import { Assessment, SelfAssessment } from "@/types";
import { AssessmentFormSchemaType } from "./AssessmentForm";
import { AssessmentType } from "@/app/dashboard/assessments/AssessmentClientPage copy";

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
          create: data.Skills.map((skill) => ({
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

// Function to fetch assessments by course ID where the user is either the assessor or the assessed user
export async function getUserAssessmentsByCourse(
  courseID: string,
  userID: string
): Promise<any[]> {
  try {
    // Fetch assessments where the user is either the assessor or the assessed user
    const assessments = await prisma.assessments.findMany({
      where: {
        CourseID: courseID,
        OR: [
          { AssessorID: userID }, // Match AssessorID with the given userID
          { AssessedUserID: userID }, // Match AssessedUserID with the given userID
        ],
      },
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
      AssessorID: assessment.AssessorID,
      Assessor:
        assessment.Users_Assessments_AssessorIDToUsers?.name || "Unknown",
      AssessedUserID: assessment.AssessedUserID,
      AssessedUser:
        assessment.Users_Assessments_AssessedUserIDToUsers?.name || "Unknown",
      CourseID: assessment.CourseID,
      InstrumentID: assessment.InstrumentID,
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
    console.error("Error fetching user assessments:", error);
    throw new Error("Failed to fetch user assessments");
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
      AssessorID: assessment.AssessorID,
      Assessor:
        assessment.Users_Assessments_AssessorIDToUsers?.name || "Unknown",
      AssessedUserID: assessment.AssessedUserID,
      AssessedUser:
        assessment.Users_Assessments_AssessedUserIDToUsers?.name || "Unknown",
      CourseID: assessment.CourseID,
      InstrumentID: assessment.InstrumentID,
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

    return selfAssessments.map((assessment) => ({
      SelfAssessmentID: assessment.SelfAssessmentID,
      InstrumentID: assessment.InstrumentID,
      InstrumentName: assessment.Instrument.Name,
      assessmentDate: assessment.AssessmentDate,
      Assessment: assessment.Assessments,
      skills: assessment.SelfAssessmentSkills.map((skill) => ({
        SelfAssessmentSkillID: skill.SelfAssessmentSkillID,
        skillName: skill.Skill.SkillName,
        score: skill.Score,
        comment: skill.Comment,
      })),
      comments: assessment.Comment,
      hasAssessments: assessment.Assessments.length > 0,
    }));
  } catch (error) {
    console.error("Error fetching self-assessments:", error);
    throw new Error("Failed to fetch self-assessments");
  }
}

export async function fetchAssessmentInstrumentSkills(
  instrumentID: string,
  assessedUserID: string
) {
  try {
    // Fetch skills associated with the given instrument
    const instrumentSkills = await prisma.instrumentSkills.findMany({
      where: {
        InstrumentID: instrumentID,
      },
      include: {
        Skills: {
          select: {
            SkillID: true,
            SkillName: true,
          },
        },
      },
    });

    // Fetch the user's skills and their scores
    const userSkills = await prisma.studentSkills.findMany({
      where: {
        UserID: assessedUserID,
        SkillID: {
          in: instrumentSkills.map((is) => is.Skills.SkillID),
        },
      },
      select: {
        SkillID: true,
        Score: true,
      },
    });

    // Create a map of SkillID to Score for quick lookup
    const userSkillsMap = new Map(
      userSkills.map((us) => [us.SkillID, us.Score])
    );

    // Map the fetched instrument skills to include the user's score or default to 0
    const assessmentSkills = instrumentSkills.map((is) => ({
      SkillID: is.Skills.SkillID,
      SkillName: is.Skills.SkillName,
      initialScore: userSkillsMap.get(is.Skills.SkillID) || 0, // Use user's score or default to 0
      adjustedScore: userSkillsMap.get(is.Skills.SkillID) || 0,
      approved: false,
    }));

    return assessmentSkills;
  } catch (error) {
    console.error("Error fetching instrument skills:", error);
    throw new Error("Failed to fetch instrument skills");
  }
}

export async function fetchSelfAssessmentSkills(
  instrumentID: string,
  assessedUserID: string
) {
  try {
    // Fetch the most recent self-assessment for the given instrument and student
    const selfAssessment = await prisma.selfAssessments.findFirst({
      where: {
        InstrumentID: instrumentID,
        StudentID: assessedUserID,
      },
      orderBy: {
        AssessmentDate: "desc",
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

    if (!selfAssessment) {
      // Return an empty array if no self-assessment is found
      return [];
    }

    const assessmentSkills = selfAssessment.SelfAssessmentSkills.map((sas) => ({
      SkillID: sas.Skill.SkillID,
      SkillName: sas.Skill.SkillName,
      initialScore: sas.Score,
      adjustedScore: sas.Score,
      approved: false,
    }));

    return assessmentSkills;
  } catch (error) {
    console.error("Error fetching self-assessment skills:", error);
    throw new Error("Failed to fetch self-assessment skills");
  }
}

export async function fetchStudentsWithSelfAssessmentStatus(
  courseID: string,
  instrumentID: string
) {
  try {
    // Fetch all students enrolled in the specified course
    const allStudents = await prisma.user.findMany({
      where: {
        UserCourse: {
          some: {
            CourseID: courseID,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    // Fetch students who have completed a self-assessment for the given instrument
    const studentsWithSelfAssessment = await prisma.user.findMany({
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
      },
    });

    // Create a Set of student IDs who have completed the self-assessment
    const selfAssessmentStudentIds = new Set(
      studentsWithSelfAssessment.map((student) => student.id)
    );

    // Combine the results and add the `hasSelfAssessment` field
    const studentsWithStatus = allStudents.map((student) => ({
      ...student,
      hasSelfAssessment: selfAssessmentStudentIds.has(student.id),
    }));

    return studentsWithStatus;
  } catch (error) {
    console.error(
      "Error fetching students with self-assessment status:",
      error
    );
    throw new Error("Failed to fetch students with self-assessment status");
  }
}

export async function fetchStudentsWithSelfAssessment(
  courseID: string,
  instrumentID: string
) {
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

export async function fetchStudents(courseID: string) {
  try {
    // Fetch users who are enrolled in the specified course
    const students = await prisma.user.findMany({
      where: {
        UserCourse: {
          some: {
            CourseID: courseID,
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
    console.error("Error fetching students for course:", error);
    throw new Error("Failed to fetch students for course");
  }
}

export async function CreateOrUpdateAssessment(data: AssessmentType) {
  try {
    const {
      AssessorID,
      AssessedUserID,
      AssessmentID,
      CourseID,
      InstrumentID,
      Comment,
      Skills,
      Title,
    } = data;

    console.log("Assessment Data Sent",data)

    // Fetch Instrument Description
    const instrument = await prisma.instrument.findUnique({
      where: { InstrumentID },
    });

    if (!instrument) {
      throw new Error("Instrument not found");
    }

    await prisma.$transaction(async (prisma) => {
      // Check if the assessment already exists
      const existingAssessment = await prisma.assessments.findUnique({
        where: { AssessmentID },
      });

      let newAssessment;

      if (existingAssessment) {
        // Update the existing assessment
        newAssessment = await prisma.assessments.update({
          where: { AssessmentID },
          data: {
            InstrumentID: InstrumentID as string,
            AssessedUserID: AssessedUserID as string,
            AssessorID: AssessorID as string,
            CourseID: CourseID as string,
            Title: `Assessment - ${new Date().toLocaleDateString()}`,
            Comment: Comment || "",
            AssessmentDate: new Date(),
            InstrumentDescription: data.InstrumentDescription,
          },
        });

        // Optional: Remove or update existing skills if needed
        await prisma.assessmentSkills.deleteMany({
          where: { AssessmentID },
        });

      } else {
        // Create a new assessment
        newAssessment = await prisma.assessments.create({
          data: {
            AssessmentID,
            InstrumentID: InstrumentID as string,
            AssessedUserID: AssessedUserID as string,
            AssessorID: AssessorID as string,
            CourseID: CourseID as string,
            Title: `Assessment - ${new Date().toLocaleDateString()}`,
            Comment: Comment || "",
            AssessmentDate: new Date(),
            InstrumentDescription: instrument.Name || "Unknown Instrument",
          },
        });
      }

      // Handle each assessment skill
      for (const skill of Skills || []) {
        // Add skill to AssessmentSkills
        await prisma.assessmentSkills.create({
          data: {
            AssessmentID: newAssessment.AssessmentID,
            SkillID: skill.SkillID,
            Score: skill.Score,
            Approved: skill.approved,
          },
        });

        // If approved, update StudentSkills
        if (skill.approved) {
          await prisma.studentSkills.upsert({
            where: {
              UserID_CourseID_SkillID: {
                UserID: AssessedUserID as string,
                CourseID: newAssessment.CourseID,
                SkillID: skill.SkillID,
              },
            },
            update: {
              Score: skill.Score,
            },
            create: {
              UserID: AssessedUserID as string,
              CourseID: newAssessment.CourseID,
              SkillID: skill.SkillID,
              Score: skill.Score,
            },
          });
        }
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating or updating assessment:", error);
    return { success: false, error: "Failed to create or update assessment" };
  }
}


export async function createInstructorAssessment(
  data: AssessmentFormSchemaType
) {
  try {
    const {
      selfAssessmentID,
      assessorID,
      instrumentID,
      assessedUserID,
      assessmentSkills,
      comment,
    } = data;

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
      orderBy: {
        AssessmentDate: "desc",
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
