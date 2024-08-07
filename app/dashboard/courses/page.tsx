
import { Course, UserCourseRole } from "@/types";
import { fetchAllCourses } from "@/components/Course/CourseServerActions";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";

import AdminCoursePageClient from "./AdminCoursePageClient";

export default async function AdminCoursePage() {
  const role: any = await getUserRole();

  let courseData: Course[] = await fetchAllCourses();
  /*
  if (role === UserCourseRole.Admin) {
    data = await fetchAllCourses();
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userId = await useUserId();
    data = await fetchUserCourses(userId as string);
  }

  console.log("Course Data: ", data)
  */

  return (
    <AdminCoursePageClient role={role} courseData={courseData} />
  );
}
