import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { courseID, courseName, startDate, endDate, timeRange, location, instructor } = await request.json();

    const newCourse = await prisma.courses.create({
      data: {
        CourseID: courseID,
        CourseName: courseName,
        StartDate: new Date(startDate),
        EndDate: new Date(endDate),
        TimeRange: timeRange,
        Location: location,
        Instructor: instructor,
      },
    });

    return NextResponse.json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
