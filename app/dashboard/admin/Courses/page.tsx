import { Columns } from "./columns";
import { DataTable } from "../../../../components/DataTable/DataTable";
import { CreateCourseDialog } from "@/components/Course/CreateCourseDialog";
import { Course } from "@/types";
import { fetchAllCourses } from "@/components/Course/CourseServerActions";

export default async function AdminCoursePage() {
  const data: Course[] = await fetchAllCourses();

  //console.log("Courses data:", JSON.stringify(data, null, 2)); //server debug log on retrieved course data

  return (
    <div className="flex mx-20 items-center content-center">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex justify-between">
          <div className="flex gap-x-2">
            <CreateCourseDialog />
            
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
