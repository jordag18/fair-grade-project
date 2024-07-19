import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const FormSchema = z.object({
  CourseID: z.string().min(1, "Course ID is required"),
  CourseName: z.string().min(1, "Course Name is required"),
  TimeRange: z.string().min(1, "Time Range is required"),
  Location: z.string().min(1, "Location is required"),
  Instructor: z.string().min(1, "Instructor is required"),
  DateRange: z.string().min(1, "Date Range is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = FormSchema.parse(body);

    // Split DateRange into start and end dates
    const [startDate, endDate] = data.DateRange.split(' - ');

    // Create a new course in the database
    await prisma.courses.create({
      data: {
        CourseID: data.CourseID,
        CourseName: data.CourseName,
        TimeRange: data.TimeRange,
        Location: data.Location,
        Instructor: data.Instructor,
        Date: new Date(startDate),
        EndDate: new Date(endDate),
      },
    });

    return NextResponse.json({ message: 'Course created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
