'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCourse(data: {
  courseTag: string;
  courseName: string;
  startDate: Date;
  endDate: Date;
  timeRange: string;
  location: string;
  instructor: string;
}) {
  try {
    const newCourse = await prisma.courses.create({
      data: {
        CourseTag: data.courseTag,
        CourseName: data.courseName,
        StartDate: data.startDate,
        EndDate: data.endDate,
        TimeRange: data.timeRange,
        Location: data.location,
        Instructor: data.instructor,
      },
    });
    revalidatePath("/Courses");
    return newCourse;
  } catch (error) {
    console.error('Error creating course', error);
    throw new Error('Failed to create course');
  }
}