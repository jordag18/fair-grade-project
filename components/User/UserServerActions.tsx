"use server";

import prisma from "@/lib/prisma";
import { User, UserCourseRole } from "@/types";



export async function modifyUser(userData: User) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userData.id! },
      data: {
        name: userData.name,
        email: userData.email,
      },
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error modifying user:", error);
    return { success: false, error: "Failed to modify user" };
  }
}

export async function deleteUser(userID: string) {
  try {
    await prisma.user.delete({
      where: { id: userID },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

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

