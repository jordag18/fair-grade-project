import { Columns } from "./columns";
import { DataTable } from "../../../../components/DataTable/DataTable";
import { CreateCourseDialog } from "@/components/Course/CreateCourseDialog";
import prisma from "@/lib/prisma";

export default async function AdminCoursePage() {

  const data = await prisma.courses.findMany();

  return (
    <div className="flex mx-20 items-center content-center">
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <div className="flex gap-x-2">
            <CreateCourseDialog />
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
