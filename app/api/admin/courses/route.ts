import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { CreateCourseInput, Course } from '@/types'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const courses = await prisma.courses.findMany({
      select: {
        CourseID: true,
        CourseName: true,
      },
    })
    return NextResponse.json(courses, { status: 200 })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { courseName }: CreateCourseInput = await req.json()

  try {
    const course = await prisma.courses.create({
      data: {
        CourseName: courseName,
      },
      select: {
        CourseID: true,
        CourseName: true,
      },
    })
    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error("Error adding course:", error)
    return NextResponse.json({ error: 'Failed to add course' }, { status: 500 })
  }
}
