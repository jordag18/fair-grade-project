"use server";

import prisma from "@/lib/prisma";
import { User, UserCourseRole } from "@/types";


export async function fetchUsersByCourseAndRole(courseID: string, role: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        UserCourse: {
          some: {
            CourseID: courseID,
            Role: role as UserCourseRole,
          },
        },
      },
      include: {
        UserCourse: {
          include: {
            Courses: true,
          },
        },
      },
    });

    const formattedUsers = users.map(user => ({
      ...user,
      courses: user.UserCourse.map(uc => uc.Courses.CourseName),
      role: user.UserCourse.find(uc => uc.CourseID === courseID)?.Role,
    }));

    return { success: true, users: formattedUsers };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}

