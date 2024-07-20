"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { FormSchemaType } from "./CourseForm";

export async function createCourse(courseData: FormSchemaType) {
  console.log("Creating course with data:", courseData);

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
      },
    });

    // Revalidate the path to update the UI
    revalidatePath("/courses");

    return { success: true, course: newCourse };
  } catch (error) {
    return { success: false, error: "Failed to create course" };
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
