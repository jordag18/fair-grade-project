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

export async function fetchUsersByCourse(courseID: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        UserCourse: {
          some: {
            CourseID: courseID,  // Ensure that users are found based on the courseID
          },
        },
      },
      include: {
        UserCourse: {
          include: {
            Courses: true,  // Include related course information
          },
        },
      },
    });

    const formattedUsers = users.map(user => ({
      ...user,
      courses: user.UserCourse
        .map(uc => uc.Courses.CourseName)
        .filter(courseName => courseName !== "No Courses"),  // Filter out any courses with the name "No Courses"
      role: user.UserCourse.find(uc => uc.CourseID === courseID)?.Role,  // Get the role for the given courseID
    }));

    return { success: true, users: formattedUsers };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}


export async function updateUserRole(userId: string, courseID: string, newRole: any) {
  try {
    await prisma.userCourse.update({
      where: {
        UserID_CourseID: {
          UserID: userId,
          CourseID: courseID,
        },
      },
      data: {
        Role: newRole,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: "Failed to update user role" };
  }
}