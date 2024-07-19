//import { Course } from "@/types";
import { Course, Columns } from "./columns";
import { DataTable } from "../../../../components/DataTable/DataTable";
import { CreateCourseDialog } from "@/components/Course/CreateCourseDialog";
import { ModifyCourseDialog } from "@/components/Course/ModifyCourseDialog";
import { DeleteCourseAlertDialog } from "@/components/Course/DeleteCourseAlertDialog";
import prisma from "@/lib/prisma";

export default async function AdminCoursePage() {
  //fix data to be reloaded on submission of new data
  const data = await prisma.courses.findMany();

  return (
    <div className="flex mx-20 items-center content-center">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <DeleteCourseAlertDialog />
          <div className="flex gap-x-2">
            <CreateCourseDialog />
            <ModifyCourseDialog />
          </div>
        </div>
        <DataTable
          columns={Columns}
          data={data}
          columnKey={"CourseName"}
          placeholder="Filter Course Name..."
        />
      </div>
    </div>
  );
}
