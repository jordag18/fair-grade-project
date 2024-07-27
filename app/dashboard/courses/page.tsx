import { Columns } from "./columns";
import { DataTable } from "@/components/DataTable/DataTable";
import { CreateCourseDialog } from "@/components/Course/CreateCourseDialog";
import { Course, UserCourseRole } from "@/types";
import { fetchAllCourses } from "@/components/Course/CourseServerActions";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";
import displayIfRole from "@/components/DisplayIfRole";

export default async function AdminCoursePage() {
  const data: Course[] = await fetchAllCourses();
  const role: any = await getUserRole();

  return (
    <div className="flex mx-20 items-center content-center">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex justify-between">
          <div className="flex gap-x-2">
            {displayIfRole(role, <CreateCourseDialog/>)}
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
