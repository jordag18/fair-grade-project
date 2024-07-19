import prisma from "@/lib/prisma";

export async function deleteSelectedCourses(courseIDs: string[]) {
  try {
    await prisma.courses.deleteMany({
      where: {
        CourseID: {
          in: courseIDs,
        },
      },
    });
  } catch (error) {
    console.error("Error deleting selected courses:", error);
    throw error;
  }
}