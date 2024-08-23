
import { Course, UserCourseRole } from "@/types";
import { fetchAllCourses, fetchUserCourses } from "@/components/Course/CourseServerActions";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";

import AdminCoursePageClient from "./AdminCoursePageClient";
import { useUserId } from "@/lib/auth/useUser";

export default async function AdminCoursePage() {
  const role: UserCourseRole = await getUserRole() as UserCourseRole;
  let courseData: Course[] = [];

  if (
    role === UserCourseRole.Admin ||
    role === UserCourseRole.Instructor ||
    role === UserCourseRole.IA ||
    role === UserCourseRole.TA
  ) {
    courseData = await fetchAllCourses();
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userId = await useUserId();
    courseData = await fetchUserCourses(userId as string);
  }

  return <AdminCoursePageClient role={role} courseData={courseData} />;
}
