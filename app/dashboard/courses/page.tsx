import { Columns } from "./columns";
import { DataTable } from "@/components/DataTable/DataTable";
import { CreateCourseDialog } from "@/components/Course/CreateCourseDialog";
import { Course, UserCourseRole } from "@/types";
import { fetchAllCourses } from "@/components/Course/CourseServerActions";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";
import displayIfRole from "@/components/DisplayIfRole";
import { JoinCourseDialog } from "@/components/Course/JoinCourseDialog";
import { fetchUserCourses } from "@/components/Course/CourseServerActions";
import { useUserId } from "@/lib/auth/useUser";

export default async function AdminCoursePage() {
  const role: any = await getUserRole();
  let data: Course[];
  data = await fetchAllCourses(); //temp fix 
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
    <div className="flex mx-20 items-center content-center">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex justify-between">
          <div className="flex gap-x-2 justify-between">
            {displayIfRole(role, <CreateCourseDialog/>)}
            <JoinCourseDialog />
          </div>
        </div>
        <div className="overflow-auto max-h-screen">
          <DataTable
            columns={Columns}
            data={data}
            columnKey={"CourseName"}
            placeholder="Filter Course Name..."
          />
        </div>
      </div>
    </div>
  );
}
