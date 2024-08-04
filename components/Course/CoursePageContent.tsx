import { DataTable } from "@/components/DataTable/DataTable";
import { CreateCourseDialog } from "@/components/Course/CreateCourseDialog";
import { JoinCourseDialog } from "@/components/Course/JoinCourseDialog";
import displayIfRole from "@/components/DisplayIfRole";
import { Course, UserCourseRole } from "@/types";

interface CoursePageProps {
  data: Course[];
  role: UserCourseRole;
  columns: any;
}

const CoursePageContent: React.FC<CoursePageProps> = ({ data, role, columns }) => {
  return (
    <div className="flex mx-20 items-center content-center">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex justify-between">
          <div className="flex gap-x-2 justify-between">
            {displayIfRole(role, <CreateCourseDialog />)}
            <JoinCourseDialog />
          </div>
        </div>
        <div className="overflow-auto max-h-screen">
          <DataTable
            columns={columns}
            data={data}
            columnKey={"CourseName"}
            placeholder="Filter Course Name..."
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePageContent;
