"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { FormSchemaType } from "./CourseForm";
import { Course } from "@/types";
import { generateShortUUID } from "@/lib/generateuuid";

export async function createCourse(courseData: FormSchemaType) {
  console.log("Creating course with data:", courseData);
  const uniqueCode = generateShortUUID(8);

  try {
    const newCourse = await prisma.courses.create({
      data: {
        CourseTag: courseData.courseTag,
        CourseName: courseData.courseName,
        StartDate: courseData.date.from,
        EndDate: courseData.date.to,
        TimeRange: courseData.timeRange,
        Location: courseData.location,
        Instructor: courseData.instructor,
        uniqueCode: uniqueCode,
      },
    });

    // Revalidate the path to update the UI
    revalidatePath("/courses");

    return { success: true, course: newCourse };
  } catch (error) {
    return { success: false, error: "Failed to create course" };
  }
}

export async function fetchAllCourses(): Promise<Course[]> {
  try {
    const courses = await prisma.courses.findMany({
      where: {
        CourseName: {
          not: "No Courses",
        },
      },
      include: {
        CourseSkills: true,
        UserCourse: {
          include: {
            Users: true,
          },
        },
        Assessments: {
          include: {
            AssessmentSkills: true,
          },
        },
        StudentSkills: {
          include: {
            Skills: true,
            User: true,
          },
        },
      },
    });
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("Failed to fetch courses");
  }
}

export async function fetchUserCourses(userID: string): Promise<Course[]> {
  try {
    const courses = await prisma.courses.findMany({
      where: {
        UserCourse: {
          some: {
            UserID: userID,
          },
        },
        CourseName: {
          not: "No Courses",
        },
      },
      include: {
        CourseSkills: true,
        UserCourse: {
          include: {
            Users: true,
          },
        },
        Assessments: {
          include: {
            AssessmentSkills: true,
          },
        },
        StudentSkills: {
          include: {
            Skills: true,
            User: true,
          },
        },
      },
    });
    return courses;
  } catch (error) {
    console.error("Error fetching courses for user:", error);
    throw new Error("Failed to fetch courses for user");
  }
}

export async function modifyCourse(courseData: FormSchemaType) {
  try {
    const updatedCourse = await prisma.courses.update({
      where: { CourseID: courseData.courseID! },
      data: {
        CourseTag: courseData.courseTag,
        CourseName: courseData.courseName,
        StartDate: courseData.date.from,
        EndDate: courseData.date.to,
        TimeRange: courseData.timeRange,
        Location: courseData.location,
        Instructor: courseData.instructor,
      },
    });

    // Revalidate the path to update the UI
    revalidatePath("/courses");

    return { success: true, course: updatedCourse };
  } catch (error) {
    console.error("Error modifying course:", error);
    return { success: false, error: "Failed to modify course" };
  }
}

export async function deleteSelectedCourse(courseID: string) {
  try {
    await prisma.courses.delete({
      where: {
        CourseID: courseID,
      },
    });
    revalidatePath("/courses");
    return { success: true };
  } catch (error) {
    console.error("Error deleting selected course:", error);
    throw error;
  }
}

export async function checkCourseCode(courseCode: string) {
  try {
    const course = await prisma.courses.findUnique({
      where: { uniqueCode: courseCode },
    });

    if (course) {
      return { success: true, course };
    } else {
      return { success: false, error: "Invalid course code." };
    }
  } catch (error) {
    console.error("Error checking course code:", error);
    return {
      success: false,
      error: "An error occurred while checking the course code.",
    };
  }
}

export async function enrollInCourse(
  inviteCode: string,
  userId: string | undefined
) {
  if (!userId) {
    return { success: false, error: "User not authenticated" };
  }

  try {
    const course = await prisma.courses.findUnique({
      where: { uniqueCode: inviteCode },
    });

    if (!course) {
      return { success: false, error: "Invalid invite code" };
    }

    await prisma.userCourse.create({
      data: {
        CourseID: course.CourseID,
        UserID: userId,
        Role: "Student",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return { success: false, error: "Failed to enroll in course" };
  }
}
